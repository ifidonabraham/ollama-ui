import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { resolveOllamaHost, isCloudConfigured } from "@/lib/ollama";

const execAsync = promisify(exec);

// ── Vision / model helpers ─────────────────────────────────────────────────

const VISION_ONLY_PREFIXES = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];
function isVisionOnly(model: string) {
  return VISION_ONLY_PREFIXES.some((p) => model.toLowerCase().startsWith(p));
}

async function getAvailableModels(ollamaBase: string): Promise<string[]> {
  try {
    const res = await fetch(`${ollamaBase}/api/tags`, { cache: "no-store" });
    const data = await res.json();
    return (data.models ?? []).map((m: { name: string }) => m.name);
  } catch { return []; }
}

async function unloadModel(model: string, ollamaBase: string): Promise<void> {
  try {
    await fetch(`${ollamaBase}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, keep_alive: 0 }),
    });
  } catch { /* non-fatal */ }
}

async function getLoadedModels(ollamaBase: string): Promise<string[]> {
  try {
    const res = await fetch(`${ollamaBase}/api/ps`, { cache: "no-store" });
    const data = await res.json();
    return (data.models ?? []).map((m: { name: string }) => m.name);
  } catch { return []; }
}

async function unloadOthers(keepModel: string, ollamaBase: string): Promise<void> {
  const loaded = await getLoadedModels(ollamaBase);
  await Promise.all(
    loaded
      .filter((m) => m !== keepModel)
      .map((m) => unloadModel(m, ollamaBase))
  );
}

function pickAgentModel(requested: string, allModels: string[]): string {
  if (requested.includes("14b")) {
    const faster =
      allModels.find((m) => m.includes("qwen3") && !isVisionOnly(m)) ??
      allModels.find((m) => m.toLowerCase().includes("coder") && m.includes("7b") && !isVisionOnly(m));
    if (faster) return faster;
  }
  return requested;
}

// ── Diff utility ───────────────────────────────────────────────────────────

function computeDiff(before: string, after: string): string {
  const beforeLines = before.split("\n");
  const afterLines  = after.split("\n");
  const lines: string[] = [];
  const maxLen = Math.max(beforeLines.length, afterLines.length);
  for (let i = 0; i < maxLen; i++) {
    const b = beforeLines[i];
    const a = afterLines[i];
    if (b === a)        lines.push(`  ${b ?? ""}`);
    else if (b == null) lines.push(`+ ${a}`);
    else if (a == null) lines.push(`- ${b}`);
    else { lines.push(`- ${b}`); lines.push(`+ ${a}`); }
  }
  return lines.join("\n");
}

// ── Git helpers ────────────────────────────────────────────────────────────

async function isGitRepo(dir: string): Promise<boolean> {
  try {
    await execAsync("git rev-parse --is-inside-work-tree", { cwd: dir, shell: "powershell.exe" });
    return true;
  } catch { return false; }
}

async function autoCommit(filePath: string, description: string, cwd: string): Promise<string> {
  try {
    if (!await isGitRepo(cwd)) return "";
    const rel = path.relative(cwd, filePath).replace(/\\/g, "/");
    await execAsync(`git add "${rel}"`, { cwd, shell: "powershell.exe" });
    const { stdout } = await execAsync(
      `git commit -m "ai: ${description.replace(/"/g, "'").slice(0, 72)}"`,
      { cwd, shell: "powershell.exe" }
    );
    const sha = stdout.match(/\[[\w\s]+([a-f0-9]{7})\]/)?.[1] ?? "";
    return sha ? `git: committed ${sha}` : "";
  } catch { return ""; }
}

// ── Project instructions ────────────────────────────────────────────────────

function loadProjectInstructions(workspacePath?: string): string {
  if (!workspacePath) return "";
  const candidates = [
    path.join(workspacePath, "CLAUDE.md"),
    path.join(workspacePath, "AGENTS.md"),
    path.join(workspacePath, ".ollama-ui", "instructions.md"),
    path.join(workspacePath, ".cursorrules"),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      try {
        const content = fs.readFileSync(p, "utf-8").slice(0, 4000);
        return `\n\n# Project Instructions (from ${path.basename(p)})\n${content}`;
      } catch { /* skip */ }
    }
  }
  return "";
}

// ── Tool definitions ───────────────────────────────────────────────────────

const TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read the full contents of a file. Use this to understand existing code before editing it.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Absolute or relative file path." },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "write_file",
      description: "Create a NEW file or completely replace an existing file.",
      parameters: {
        type: "object",
        properties: {
          path:        { type: "string", description: "File path to write." },
          content:     { type: "string", description: "Complete file content." },
          description: { type: "string", description: "Short description for the git commit message." },
        },
        required: ["path", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "patch_file",
      description: "Edit an existing file by replacing a specific block of text. Prefer this over write_file for small changes.",
      parameters: {
        type: "object",
        properties: {
          path:        { type: "string", description: "File path to edit." },
          search:      { type: "string", description: "Exact text to find in the file (must match exactly, including whitespace)." },
          replace:     { type: "string", description: "Text to replace it with." },
          description: { type: "string", description: "Short description for the git commit message." },
        },
        required: ["path", "search", "replace"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_dir",
      description: "List files and folders at a path.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Directory path." },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "run_command",
      description: "Run a PowerShell command. Use for: creating directories, installing packages, running tests/lint, git operations.",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string", description: "PowerShell command to execute." },
          cwd:     { type: "string", description: "Working directory (optional, defaults to workspace)." },
        },
        required: ["command"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "delete_file",
      description: "Delete a file.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string", description: "Path of file to delete." },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_in_files",
      description: "Search for a text pattern across all files in a directory.",
      parameters: {
        type: "object",
        properties: {
          pattern:   { type: "string", description: "Text or regex pattern to search for." },
          directory: { type: "string", description: "Directory to search in." },
          extension: { type: "string", description: "File extension filter e.g. .ts, .py (optional)." },
        },
        required: ["pattern", "directory"],
      },
    },
  },
];

// ── Safety ─────────────────────────────────────────────────────────────────

const BLOCKED = [
  /rm\s+-rf\s+\//i, /format\s+[a-z]:/i,
  /Remove-Item.*-Recurse.*-Force.*[Cc]:\\/i,
  /del\s+\/[sqa]/i, /shutdown/i, /Restart-Computer/i,
];

// ── Resolve file path ──────────────────────────────────────────────────────
// When the agent gives a relative path, resolve it against the workspace.
// If it gives an absolute path, use it as-is.

function resolveFilePath(filePath: string, workspacePath: string): string {
  if (path.isAbsolute(filePath)) {
    return filePath;
  }
  return path.resolve(workspacePath, filePath);
}

// ── Tool execution ─────────────────────────────────────────────────────────

async function executeTool(
  name: string,
  args: Record<string, string>,
  workspacePath: string,
  send: (event: string, data: object) => void
): Promise<string> {
  // cwd defaults to workspacePath — this is the key fix for tool execution
  const cwd = workspacePath || "C:\\Users\\PC";

  try {
    switch (name) {

      case "read_file": {
        const resolved = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(resolved)) return `Error: File not found: ${resolved}`;
        const stat = fs.statSync(resolved);
        if (stat.size > 200 * 1024) return `Error: File too large (${Math.round(stat.size / 1024)}KB). Max 200KB.`;
        return fs.readFileSync(resolved, "utf-8");
      }

      case "write_file": {
        const resolved = resolveFilePath(args.path, cwd);
        const before = fs.existsSync(resolved) ? fs.readFileSync(resolved, "utf-8") : null;
        const after  = args.content;

        if (before !== null) {
          const diff = computeDiff(before, after);
          send("file_diff", { path: resolved, before, after, diff });
        }

        fs.mkdirSync(path.dirname(resolved), { recursive: true });
        fs.writeFileSync(resolved, after, "utf-8");

        let lintResult = "";
        const ext = path.extname(resolved).toLowerCase();
        if ([".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
          try {
            const { stdout, stderr } = await execAsync(
              `npx eslint "${resolved}" --fix --max-warnings=0 2>&1`,
              { cwd, timeout: 15000, shell: "powershell.exe" }
            );
            const out = (stdout + stderr).trim();
            if (out) lintResult = `\nLint: ${out.slice(0, 300)}`;
          } catch { /* lint failure is non-fatal */ }
        }

        const desc = args.description || `update ${path.basename(resolved)}`;
        const sha = await autoCommit(resolved, desc, cwd);
        return `Written: ${resolved}${sha ? `\n${sha}` : ""}${lintResult}`;
      }

      case "patch_file": {
        const resolved = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(resolved)) return `Error: File not found: ${resolved}`;

        const before = fs.readFileSync(resolved, "utf-8");
        let after: string;

        if (before.includes(args.search)) {
          after = before.replace(args.search, args.replace);
        } else {
          // Try normalising line endings
          const normalised = before.replace(/\r\n/g, "\n");
          const searchNorm = args.search.replace(/\r\n/g, "\n");
          if (!normalised.includes(searchNorm)) {
            return `Error: Search text not found in ${resolved}. Make sure it matches exactly including whitespace.`;
          }
          after = normalised.replace(searchNorm, args.replace);
        }

        send("file_diff", { path: resolved, before, after, diff: computeDiff(before, after) });
        fs.writeFileSync(resolved, after, "utf-8");

        const desc = args.description || `patch ${path.basename(resolved)}`;
        const sha = await autoCommit(resolved, desc, cwd);
        return `Patched: ${resolved}${sha ? `\n${sha}` : ""}`;
      }

      case "list_dir": {
        // Allow listing the workspace root if path is "." or empty
        const targetPath = args.path === "." || !args.path ? cwd : resolveFilePath(args.path, cwd);
        if (!fs.existsSync(targetPath)) return `Error: Path not found: ${targetPath}`;
        const entries = fs.readdirSync(targetPath, { withFileTypes: true });
        const ignored = new Set(["node_modules", ".git", ".next", "dist", "build"]);
        return entries
          .filter((e) => !ignored.has(e.name))
          .map((e) => `${e.isDirectory() ? "📁" : "📄"} ${e.name}`)
          .join("\n") || "(empty)";
      }

      case "run_command": {
        const cmd = args.command?.trim();
        if (!cmd) return "Error: No command provided";
        if (BLOCKED.some((p) => p.test(cmd))) return "Error: Command blocked for safety.";
        const runCwd = args.cwd?.trim() || cwd;
        try {
          const { stdout, stderr } = await execAsync(cmd, {
            cwd: runCwd, timeout: 30_000, maxBuffer: 512 * 1024, shell: "powershell.exe",
          });
          return [stdout?.trim(), stderr?.trim()].filter(Boolean).join("\n") || "(no output)";
        } catch (e: unknown) {
          const err = e as { stdout?: string; stderr?: string; message?: string };
          return [err.stdout?.trim(), err.stderr?.trim() || err.message].filter(Boolean).join("\n") || "Command failed";
        }
      }

      case "delete_file": {
        const resolved = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(resolved)) return `Error: Not found: ${resolved}`;
        fs.rmSync(resolved, { recursive: false });
        return `Deleted: ${resolved}`;
      }

      case "search_in_files": {
        // If directory is relative or ".", resolve against workspace
        const dir = args.directory === "." || !path.isAbsolute(args.directory)
          ? path.resolve(cwd, args.directory || ".")
          : path.resolve(args.directory);

        if (!fs.existsSync(dir)) return `Error: Directory not found: ${dir}`;
        const ext = args.extension ?? "";
        const pattern = args.pattern;
        const results: string[] = [];

        function walk(d: string, depth = 0) {
          if (depth > 5) return;
          const ignored = new Set(["node_modules", ".git", ".next", "dist", "build"]);
          try {
            for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
              if (ignored.has(entry.name)) continue;
              const full = path.join(d, entry.name);
              if (entry.isDirectory()) { walk(full, depth + 1); continue; }
              if (ext && !entry.name.endsWith(ext)) continue;
              try {
                const content = fs.readFileSync(full, "utf-8");
                const lines = content.split("\n");
                lines.forEach((line, i) => {
                  if (line.toLowerCase().includes(pattern.toLowerCase())) {
                    results.push(`${path.relative(dir, full)}:${i + 1}: ${line.trim()}`);
                  }
                });
              } catch { /* skip binary */ }
            }
          } catch { /* skip unreadable */ }
        }

        walk(dir);
        if (results.length === 0) return `No matches for "${pattern}" in ${dir}`;
        return results.slice(0, 50).join("\n") + (results.length > 50 ? `\n…and ${results.length - 50} more` : "");
      }

      default:
        return `Error: Unknown tool: ${name}`;
    }
  } catch (err: unknown) {
    return `Error: ${err instanceof Error ? err.message : String(err)}`;
  }
}

// ── Main route ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, model, system_prompt, workspace_path } = body as {
      messages: { role: string; content: string }[];
      model: string;
      system_prompt?: string;
      workspace_path?: string;
    };

    if (!model || !messages?.length) {
      return NextResponse.json({ error: "model and messages required" }, { status: 400 });
    }

    // ── Resolve Ollama host (with Azure fallback) ──────────────────────────
    let ollamaBase: string;
    try {
      ollamaBase = await resolveOllamaHost();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cannot reach Ollama";
      // Return a proper SSE error so the UI shows a clear message
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                event: "error",
                message: msg,
                hint: isCloudConfigured()
                  ? "Your Azure Ollama instance is unreachable. Check that the container is running."
                  : "Ollama is not running. Start it with: ollama serve — or set OLLAMA_HOST to point to an Azure instance.",
              })}\n\n`
            )
          );
          controller.close();
        },
      });
      return new Response(readable, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
      });
    }

    const allModels  = await getAvailableModels(ollamaBase);
    const agentModel = pickAgentModel(model, allModels);
    const projectInstructions = loadProjectInstructions(workspace_path);

    // Workspace path for tool execution — default to user's home
    const effectiveWorkspace = workspace_path || "C:\\Users\\PC";

    const agentSystemPrompt =
      (system_prompt ? system_prompt + "\n\n" : "") +
      `You are an expert AI coding assistant with direct access to the user's local filesystem and terminal via tools.

RULES:
- When asked to create, edit, fix, or delete files — USE THE TOOLS. Do not just explain.
- For editing existing files: use patch_file (search/replace) — more efficient than rewriting the whole file.
- For new files: use write_file.
- After file changes, briefly explain what you did and why.
- If a command fails, read the error, diagnose, and retry with a fix.
- Use search_in_files to understand the codebase before making changes.
- Always read a file with read_file before editing it unless you just created it.
- You can use relative paths — they resolve against the workspace directory.
- To create a folder use run_command with: New-Item -ItemType Directory -Path "folder_name" -Force

Current workspace directory: ${effectiveWorkspace}
${projectInstructions}`;

    const ollamaMessages: { role: string; content: string }[] = [
      { role: "system", content: agentSystemPrompt },
      ...messages,
    ];

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        function send(event: string, data: object) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event, ...data })}\n\n`));
        }

        if (agentModel !== model) {
          send("thinking", { text: `Using ${agentModel} (${model} is too slow for agent mode)` });
        }

        if (isCloudConfigured()) {
          send("thinking", { text: `Connected to cloud Ollama` });
        }

        await unloadOthers(agentModel, ollamaBase);

        let loopMessages = [...ollamaMessages];

        async function callOllama(mdl: string, withTools = true): Promise<Response> {
          const timeoutMs = mdl.includes("14b") ? 10_000 : 60_000;
          const ctrl = new AbortController();
          const timer = setTimeout(() => ctrl.abort(), timeoutMs);
          try {
            const body = withTools
              ? { model: mdl, messages: loopMessages, tools: TOOLS, stream: false }
              : { model: mdl, messages: loopMessages, stream: false };
            const r = await fetch(`${ollamaBase}/api/chat`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
              signal: ctrl.signal,
            });
            clearTimeout(timer);
            return r;
          } catch (e) {
            clearTimeout(timer);
            throw e;
          }
        }

        for (let round = 0; round < 10; round++) {
          let ollamaRes: Response;

          try {
            ollamaRes = await callOllama(agentModel);
          } catch (e: unknown) {
            const isTimeout = (e as Error)?.name === "AbortError";
            if (isTimeout && agentModel.includes("14b")) {
              const allMdls = await getAvailableModels(ollamaBase);
              const fallback =
                allMdls.find((m) => m.includes("qwen3") && !isVisionOnly(m)) ??
                allMdls.find((m) => m.toLowerCase().includes("coder") && m.includes("7b") && !isVisionOnly(m));
              if (fallback) {
                send("thinking", { text: `14b timed out — switching to ${fallback}` });
                await unloadModel(agentModel, ollamaBase);
                try {
                  ollamaRes = await callOllama(fallback);
                } catch {
                  send("error", { message: "Model timed out and fallback also failed" });
                  break;
                }
              } else {
                send("error", { message: "14b model timed out. No fallback model available." });
                break;
              }
            } else {
              const errMsg = (e as Error)?.message ?? "Unknown error";
              send("error", { message: `Cannot reach Ollama: ${errMsg}` });
              break;
            }
          }

          if (!ollamaRes!.ok) {
            const errText = await ollamaRes!.text().catch(() => "");
            const isToolsUnsupported =
              errText.toLowerCase().includes("does not support tools") ||
              (errText.toLowerCase().includes("tool") && errText.toLowerCase().includes("not support"));

            if (isToolsUnsupported) {
              send("thinking", { text: `${agentModel} doesn't support tools — switching to plain chat mode` });
              try {
                ollamaRes = await callOllama(agentModel, false);
              } catch {
                send("error", { message: "Cannot reach Ollama" });
                break;
              }
              if (!ollamaRes.ok) {
                send("error", { message: `Ollama error: ${await ollamaRes.text().catch(() => ollamaRes!.statusText)}` });
                break;
              }
            } else {
              send("error", { message: `Ollama error: ${errText || ollamaRes!.statusText}` });
              break;
            }
          }

          const data = await ollamaRes!.json();
          const message = data.message;

          let messageContent = message?.content ?? "";
          const thinkMatch = messageContent.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
          if (thinkMatch) {
            const thinkText = thinkMatch[1].trim();
            messageContent = thinkMatch[2].trim();
            if (thinkText) send("thinking", { text: thinkText });
          }

          if (message?.tool_calls && message.tool_calls.length > 0) {
            send("thinking", { text: `Running ${message.tool_calls.length} action(s)…` });
            loopMessages.push({ role: "assistant", content: messageContent });

            for (const tc of message.tool_calls) {
              const toolName = tc.function?.name ?? tc.name;
              const toolArgs = tc.function?.arguments ?? tc.arguments ?? {};
              const parsedArgs = typeof toolArgs === "string" ? JSON.parse(toolArgs) : toolArgs;

              send("tool_call", { tool: toolName, args: parsedArgs });
              const result = await executeTool(toolName, parsedArgs, effectiveWorkspace, send);
              send("tool_result", { tool: toolName, result });

              loopMessages.push({ role: "tool", content: result });
            }
            continue;
          }

          // Final text response — stream word by word
          const finalText = messageContent;
          if (finalText) {
            const words = finalText.split(" ");
            let accumulated = "";
            for (const word of words) {
              accumulated += (accumulated ? " " : "") + word;
              send("delta", { text: word + " " });
              await new Promise((r) => setTimeout(r, 8));
            }
            send("done", { fullText: accumulated });
          } else {
            send("done", { fullText: "" });
          }
          break;
        }

        controller.close();
      },
    });

    return new Response(readable, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
    });
  } catch (err) {
    console.error("[agent]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
