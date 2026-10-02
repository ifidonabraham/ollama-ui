import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { resolveOllamaHost, isCloudConfigured } from "@/lib/ollama";

const execAsync = promisify(exec);

// ── Model capability helpers ───────────────────────────────────────────────

const VISION_PREFIXES  = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];
const CODER_KEYWORDS   = ["coder", "code", "deepseek", "starcoder", "codellama"];
const VISION_ONLY      = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];

function isVision(m: string)    { return VISION_PREFIXES.some(p => m.toLowerCase().startsWith(p)); }
function isVisionOnly(m: string){ return VISION_ONLY.some(p => m.toLowerCase().startsWith(p)); }
function isCoder(m: string)     { return CODER_KEYWORDS.some(k => m.toLowerCase().includes(k)); }

async function getAvailableModels(base: string): Promise<string[]> {
  try {
    const res = await fetch(`${base}/api/tags`, { cache: "no-store" });
    const data = await res.json();
    return (data.models ?? []).map((m: { name: string }) => m.name);
  } catch { return []; }
}

/**
 * Pick the best model for a given role, from the available list.
 * Falls back gracefully if a specialized model isn't available.
 */
function pickModel(
  role: "vision" | "coder" | "general",
  requested: string,
  all: string[]
): string {
  if (role === "vision") {
    // Prefer explicitly requested if it's a vision model
    if (isVision(requested)) return requested;
    return all.find(m => isVision(m)) ?? requested;
  }
  if (role === "coder") {
    if (!isVisionOnly(requested)) return requested; // use what user picked
    // If user is on a vision-only model, swap to best coder
    return (
      all.find(m => isCoder(m) && !isVisionOnly(m)) ??
      all.find(m => !isVisionOnly(m)) ??
      requested
    );
  }
  // general — avoid vision-only
  if (!isVisionOnly(requested)) return requested;
  return all.find(m => !isVisionOnly(m)) ?? requested;
}

// ── RAM management ─────────────────────────────────────────────────────────

async function unloadModel(model: string, base: string) {
  try {
    await fetch(`${base}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, keep_alive: 0 }),
    });
  } catch { /* non-fatal */ }
}

async function getLoadedModels(base: string): Promise<string[]> {
  try {
    const res = await fetch(`${base}/api/ps`, { cache: "no-store" });
    const data = await res.json();
    return (data.models ?? []).map((m: { name: string }) => m.name);
  } catch { return []; }
}

async function swapModel(from: string | null, to: string, base: string) {
  if (from && from !== to) await unloadModel(from, base);
  // no need to explicitly load — first inference call does it
}

// ── Git helpers ────────────────────────────────────────────────────────────

async function isGitRepo(dir: string): Promise<boolean> {
  try { await execAsync("git rev-parse --is-inside-work-tree", { cwd: dir, shell: "powershell.exe" }); return true; }
  catch { return false; }
}

async function autoCommit(filePath: string, description: string, cwd: string): Promise<string> {
  try {
    if (!await isGitRepo(cwd)) return "";
    const rel = path.relative(cwd, filePath).replace(/\\/g, "/");
    await execAsync(`git add "${rel}"`, { cwd, shell: "powershell.exe" });
    const { stdout } = await execAsync(`git commit -m "ai: ${description.replace(/"/g, "'").slice(0, 72)}"`, { cwd, shell: "powershell.exe" });
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
      try { return `\n\n# Project Instructions (from ${path.basename(p)})\n${fs.readFileSync(p, "utf-8").slice(0, 4000)}`; }
      catch { /* skip */ }
    }
  }
  return "";
}

// ── Diff utility ───────────────────────────────────────────────────────────

function computeDiff(before: string, after: string): string {
  const bL = before.split("\n"), aL = after.split("\n");
  const lines: string[] = [];
  for (let i = 0; i < Math.max(bL.length, aL.length); i++) {
    const b = bL[i], a = aL[i];
    if (b === a) lines.push(`  ${b ?? ""}`);
    else if (b == null) lines.push(`+ ${a}`);
    else if (a == null) lines.push(`- ${b}`);
    else { lines.push(`- ${b}`); lines.push(`+ ${a}`); }
  }
  return lines.join("\n");
}

// ── Tool definitions ───────────────────────────────────────────────────────

const TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read the full contents of a file.",
      parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
    },
  },
  {
    type: "function",
    function: {
      name: "write_file",
      description: "Create or fully replace a file.",
      parameters: {
        type: "object",
        properties: {
          path:        { type: "string" },
          content:     { type: "string" },
          description: { type: "string" },
        },
        required: ["path", "content"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "patch_file",
      description: "Edit a file by replacing a specific block of text. Prefer over write_file for small changes.",
      parameters: {
        type: "object",
        properties: {
          path:        { type: "string" },
          search:      { type: "string", description: "Exact text to find (must match exactly including whitespace)." },
          replace:     { type: "string" },
          description: { type: "string" },
        },
        required: ["path", "search", "replace"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_dir",
      description: "List files and folders in a directory.",
      parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
    },
  },
  {
    type: "function",
    function: {
      name: "run_command",
      description: "Run a PowerShell command on the user's computer. Use for creating directories, running builds, git operations, installing packages, etc.",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
          cwd:     { type: "string", description: "Working directory (optional)." },
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
      parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
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
          pattern:   { type: "string" },
          directory: { type: "string" },
          extension: { type: "string", description: "File extension filter e.g. .ts (optional)." },
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

function resolveFilePath(filePath: string, cwd: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath);
}

// ── Tool execution ─────────────────────────────────────────────────────────

async function executeTool(
  name: string,
  args: Record<string, string>,
  cwd: string,
  send: (event: string, data: object) => void
): Promise<string> {
  try {
    switch (name) {

      case "read_file": {
        const r = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(r)) return `Error: File not found: ${r}`;
        const stat = fs.statSync(r);
        if (stat.size > 200 * 1024) return `Error: File too large (${Math.round(stat.size / 1024)}KB). Max 200KB.`;
        return fs.readFileSync(r, "utf-8");
      }

      case "write_file": {
        const r = resolveFilePath(args.path, cwd);
        const before = fs.existsSync(r) ? fs.readFileSync(r, "utf-8") : null;
        if (before !== null) send("file_diff", { path: r, before, after: args.content, diff: computeDiff(before, args.content) });
        fs.mkdirSync(path.dirname(r), { recursive: true });
        fs.writeFileSync(r, args.content, "utf-8");
        // Auto-lint TS/JS files
        const ext = path.extname(r).toLowerCase();
        if ([".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
          try {
            await execAsync(`npx eslint "${r}" --fix --max-warnings=0 2>&1`, { cwd, timeout: 15000, shell: "powershell.exe" });
          } catch { /* lint failure non-fatal */ }
        }
        const sha = await autoCommit(r, args.description || `update ${path.basename(r)}`, cwd);
        return `Written: ${r}${sha ? `\n${sha}` : ""}`;
      }

      case "patch_file": {
        const r = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(r)) return `Error: File not found: ${r}`;
        let before = fs.readFileSync(r, "utf-8");
        let after: string;
        if (before.includes(args.search)) {
          after = before.replace(args.search, args.replace);
        } else {
          const norm = before.replace(/\r\n/g, "\n");
          const sn   = args.search.replace(/\r\n/g, "\n");
          if (!norm.includes(sn)) return `Error: Search text not found in ${r}. Make sure it matches exactly including whitespace.`;
          before = norm;
          after  = norm.replace(sn, args.replace);
        }
        send("file_diff", { path: r, before, after, diff: computeDiff(before, after) });
        fs.writeFileSync(r, after, "utf-8");
        const sha = await autoCommit(r, args.description || `patch ${path.basename(r)}`, cwd);
        return `Patched: ${r}${sha ? `\n${sha}` : ""}`;
      }

      case "list_dir": {
        const target = (!args.path || args.path === ".") ? cwd : resolveFilePath(args.path, cwd);
        if (!fs.existsSync(target)) return `Error: Path not found: ${target}`;
        const ignored = new Set(["node_modules", ".git", ".next", "dist", "build"]);
        return fs.readdirSync(target, { withFileTypes: true })
          .filter(e => !ignored.has(e.name))
          .map(e => `${e.isDirectory() ? "📁" : "📄"} ${e.name}`)
          .join("\n") || "(empty)";
      }

      case "run_command": {
        const cmd = args.command?.trim();
        if (!cmd) return "Error: No command provided";
        if (BLOCKED.some(p => p.test(cmd))) return "Error: Command blocked for safety.";
        const runCwd = args.cwd?.trim() || cwd;
        try {
          const { stdout, stderr } = await execAsync(cmd, { cwd: runCwd, timeout: 30_000, maxBuffer: 512 * 1024, shell: "powershell.exe" });
          return [stdout?.trim(), stderr?.trim()].filter(Boolean).join("\n") || "(no output)";
        } catch (e: unknown) {
          const err = e as { stdout?: string; stderr?: string; message?: string };
          return [err.stdout?.trim(), err.stderr?.trim() || err.message].filter(Boolean).join("\n") || "Command failed";
        }
      }

      case "delete_file": {
        const r = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(r)) return `Error: Not found: ${r}`;
        fs.rmSync(r, { recursive: false });
        return `Deleted: ${r}`;
      }

      case "search_in_files": {
        const dir = (!args.directory || args.directory === ".") ? cwd : (path.isAbsolute(args.directory) ? args.directory : path.resolve(cwd, args.directory));
        if (!fs.existsSync(dir)) return `Error: Directory not found: ${dir}`;
        const ext = args.extension ?? "";
        const results: string[] = [];
        function walk(d: string, depth = 0) {
          if (depth > 5) return;
          const ignored = new Set(["node_modules", ".git", ".next", "dist", "build"]);
          try {
            for (const e of fs.readdirSync(d, { withFileTypes: true })) {
              if (ignored.has(e.name)) continue;
              const full = path.join(d, e.name);
              if (e.isDirectory()) { walk(full, depth + 1); continue; }
              if (ext && !e.name.endsWith(ext)) continue;
              try {
                fs.readFileSync(full, "utf-8").split("\n").forEach((line, i) => {
                  if (line.toLowerCase().includes(args.pattern.toLowerCase()))
                    results.push(`${path.relative(dir, full)}:${i + 1}: ${line.trim()}`);
                });
              } catch { /* skip binary */ }
            }
          } catch { /* skip unreadable */ }
        }
        walk(dir);
        if (!results.length) return `No matches for "${args.pattern}" in ${dir}`;
        return results.slice(0, 50).join("\n") + (results.length > 50 ? `\n…and ${results.length - 50} more` : "");
      }

      default:
        return `Error: Unknown tool: ${name}`;
    }
  } catch (err: unknown) {
    return `Error: ${err instanceof Error ? err.message : String(err)}`;
  }
}

// ── Parse tool calls from model response ───────────────────────────────────
// Some models (qwen2.5-coder, older llava) return tool calls as JSON text
// in message.content instead of structured tool_calls array.

interface ToolCall {
  function: { name: string; arguments: Record<string, string> };
}

function extractToolCalls(message: { tool_calls?: ToolCall[]; content?: string }): ToolCall[] {
  // Standard format
  if (message.tool_calls && message.tool_calls.length > 0) return message.tool_calls;

  const content = message.content ?? "";
  if (!content.trim()) return [];

  // Try single object: {"name":"tool","arguments":{...}}
  const singleMatch = content.match(/\{[\s\S]*?"name"\s*:\s*"(\w+)"[\s\S]*?\}/);
  if (singleMatch) {
    try {
      const p = JSON.parse(singleMatch[0]);
      if (p.name) return [{ function: { name: p.name, arguments: p.arguments ?? p.parameters ?? {} } }];
    } catch { /* not JSON */ }
  }

  // Try array: [{"name":"tool","arguments":{...}}]
  const arrayMatch = content.match(/\[[\s\S]*?\]/);
  if (arrayMatch) {
    try {
      const p = JSON.parse(arrayMatch[0]);
      if (Array.isArray(p) && p[0]?.name) {
        return p.map((t: { name: string; arguments?: Record<string, string>; parameters?: Record<string, string> }) => ({
          function: { name: t.name, arguments: t.arguments ?? t.parameters ?? {} }
        }));
      }
    } catch { /* not JSON */ }
  }

  return [];
}

// ── Single model agent loop ────────────────────────────────────────────────

async function runAgentLoop(
  ollamaBase: string,
  model: string,
  messages: { role: string; content: string; images?: string[] }[],
  cwd: string,
  withTools: boolean,
  send: (event: string, data: object) => void,
  maxRounds = 10
): Promise<string> {
  let loopMessages = [...messages];
  let lastText = "";

  for (let round = 0; round < maxRounds; round++) {
    // Swap to this model (unload others to save RAM on Azure)
    const loaded = await getLoadedModels(ollamaBase);
    const others = loaded.filter(m => m !== model);
    await Promise.all(others.map(m => unloadModel(m, ollamaBase)));

    let res: Response;
    try {
      const body = withTools
        ? { model, messages: loopMessages, tools: TOOLS, stream: false }
        : { model, messages: loopMessages, stream: false };
      res = await fetch(`${ollamaBase}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (e) {
      throw new Error(`Cannot reach Ollama: ${(e as Error).message}`);
    }

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      const toolsNotSupported = errText.toLowerCase().includes("does not support tools");
      if (toolsNotSupported && withTools) {
        // Retry without tools — model will explain what to do in text
        send("thinking", { text: `${model} doesn't support structured tools — using plain chat mode` });
        return runAgentLoop(ollamaBase, model, messages, cwd, false, send, maxRounds);
      }
      throw new Error(`Ollama error: ${errText || res.statusText}`);
    }

    const data = await res.json();
    const message = data.message;

    // Strip <think> blocks
    let content = message?.content ?? "";
    const thinkMatch = content.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
    if (thinkMatch) {
      if (thinkMatch[1].trim()) send("thinking", { text: thinkMatch[1].trim() });
      content = thinkMatch[2].trim();
    }

    // Extract tool calls (handles both structured and text-embedded formats)
    const toolCalls = extractToolCalls({ tool_calls: message?.tool_calls, content });

    if (toolCalls.length > 0) {
      send("thinking", { text: `Running ${toolCalls.length} action(s)…` });
      loopMessages.push({ role: "assistant", content });

      for (const tc of toolCalls) {
        const toolName = tc.function?.name;
        const rawArgs  = tc.function?.arguments ?? {};
        const args = typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;

        send("tool_call", { tool: toolName, args });
        const result = await executeTool(toolName, args, cwd, send);
        send("tool_result", { tool: toolName, result });
        loopMessages.push({ role: "tool", content: result });
      }
      continue; // loop back for model to process tool results
    }

    // No tool calls — this is the final text response
    lastText = content;
    break;
  }

  return lastText;
}

// ── Main route ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, model, system_prompt, workspace_path, images } = body as {
      messages: { role: string; content: string }[];
      model: string;
      system_prompt?: string;
      workspace_path?: string;
      images?: string[];  // base64 images from user message
    };

    if (!model || !messages?.length) {
      return NextResponse.json({ error: "model and messages required" }, { status: 400 });
    }

    let ollamaBase: string;
    try {
      ollamaBase = await resolveOllamaHost();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Cannot reach Ollama";
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event: "error", message: msg })}\n\n`));
          controller.close();
        },
      });
      return new Response(readable, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" },
      });
    }

    const allModels = await getAvailableModels(ollamaBase);
    const effectiveWorkspace = workspace_path || "C:\\Users\\PC";
    const projectInstructions = loadProjectInstructions(workspace_path);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        function send(event: string, data: object) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event, ...data })}\n\n`));
        }

        if (isCloudConfigured()) {
          send("thinking", { text: "Connected to Azure Ollama" });
        }

        try {
          const userMessage = messages[messages.length - 1];
          const hasImages   = images && images.length > 0;

          // ── PHASE 1: Vision analysis (if images attached) ──────────────
          let visionContext = "";
          if (hasImages) {
            const visionModel = pickModel("vision", model, allModels);
            const hasVision   = isVision(visionModel);

            if (!hasVision) {
              send("thinking", { text: `⚠️ No vision model available yet (llava is downloading). Proceeding without image analysis.` });
            } else {
              send("thinking", { text: `👁 Analyzing image with ${visionModel}…` });
              await swapModel(null, visionModel, ollamaBase);

              // Call vision model with images
              let visionRes: Response;
              try {
                visionRes = await fetch(`${ollamaBase}/api/chat`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    model: visionModel,
                    messages: [
                      {
                        role: "user",
                        content: `You are a visual analysis assistant. Analyze this image in detail. Describe:
1. What UI/design elements are present (components, layout, colors, typography)
2. Where exactly elements are positioned
3. Any text content visible
4. The overall purpose/context of what is shown
5. Specific details a developer would need to replicate or modify this UI

User's request: ${userMessage.content}`,
                        images,
                      }
                    ],
                    stream: false,
                  }),
                });
                const visionData = await visionRes.json();
                visionContext = visionData.message?.content ?? "";
                send("thinking", { text: `👁 Vision analysis complete:\n${visionContext.slice(0, 300)}…` });
              } catch (e) {
                send("thinking", { text: `Vision analysis failed: ${(e as Error).message}` });
              }
            }
          }

          // ── PHASE 2: Coder/agent loop ──────────────────────────────────
          // Pick a non-vision model for code editing
          const coderModel = pickModel("coder", model, allModels);
          if (coderModel !== model) {
            send("thinking", { text: `Using ${coderModel} for code editing` });
          }

          const systemPrompt =
            (system_prompt ? system_prompt + "\n\n" : "") +
            `You are an expert AI coding assistant with direct access to the user's filesystem and terminal.

RULES:
- When asked to create, edit, fix, or delete files — USE THE TOOLS. Do not just explain.
- For editing existing files: use patch_file (search/replace) — more precise than write_file.
- For new files: use write_file.
- Always read a file with read_file before editing it.
- After file changes, briefly explain what you did and why.
- If a command fails, read the error and retry with a fix.
- Use search_in_files to understand the codebase before making changes.
- Relative paths resolve against the workspace directory.
- To create a folder: run_command with New-Item -ItemType Directory -Path "folder" -Force

Current workspace: ${effectiveWorkspace}
${projectInstructions}` +
            (visionContext ? `\n\n# Image Analysis Results\nThe user attached an image. Here is the visual analysis:\n\n${visionContext}\n\nUse this analysis to inform your code changes.` : "");

          await swapModel(null, coderModel, ollamaBase);

          const agentMessages: { role: string; content: string; images?: string[] }[] = [
            { role: "system", content: systemPrompt },
            ...messages.slice(0, -1),
            // Last user message — include images only if no vision model handled them
            // (if vision model already analyzed, pass the text + analysis context instead)
            hasImages && !visionContext
              ? { role: "user", content: userMessage.content, images }
              : { role: "user", content: userMessage.content },
          ];

          const finalText = await runAgentLoop(
            ollamaBase,
            coderModel,
            agentMessages,
            effectiveWorkspace,
            !isVision(coderModel), // don't send tools to vision-only models
            send
          );

          // Stream final response word by word
          if (finalText) {
            const words = finalText.split(" ");
            let accumulated = "";
            for (const word of words) {
              accumulated += (accumulated ? " " : "") + word;
              send("delta", { text: word + " " });
              await new Promise(r => setTimeout(r, 8));
            }
            send("done", { fullText: accumulated });
          } else {
            send("done", { fullText: "" });
          }

        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("[agent]", msg);
          send("error", { message: msg });
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
