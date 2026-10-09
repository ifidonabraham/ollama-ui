import { NextRequest, NextResponse } from "next/server";
import os from "os";
import fs from "fs";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { isReachable, listLoadedModels, releaseLoadedModels, resolveOllamaHost, isCloudConfigured, waitForModelServer, withOllamaModelLock } from "@/lib/ollama";
import { codingUsesBrain, encodeModelChoice, fallbackChoices, fallbackReason, nextModelAfterStall, pickBrainModel, pickFallbackCoder, pickHandsModel, pickStrongCoder, pickVisionModel } from "@/lib/modelRelay";
import { awayWorkNote, machineRestCommand, personIsSteppingAway } from "@/lib/awayIntent";
import { buildClarification, intentForMode, needsUnderstanding, parseModeProposal, understandInstruction, type ModeProposal } from "@/lib/intentAsk";
import { connectionBlock, connectionStartedNote, connectionStance, matchConnection } from "@/lib/appConnections";
import { readFoniaSettings } from "@/lib/foniaSettings";

import { estimateModelMb, inferenceBudgetMs, nextWait, sameModel } from "@/lib/inferenceBudget";
import { adjusterInstruction, parseAdjusterKind, type AdjusterKind } from "@/lib/promptAdjust";
import { parseAppRequest, readDocumentFile, readDocxFile, readPptxFile, resolveInstalledApp, runBlenderScene, videoIntervalFromText, videoPathFromText } from "@/lib/mediaTasks";
import { blenderNeedsShape, isBlenderShape, parseBlenderScene, type BlenderShape } from "@/lib/blenderScene";
import { extractVideoFrames, toolEnv } from "@/lib/videoFrames";
import { releaseExtraApps, runComputerAction } from "@/lib/computerActions";
import { answerRequiresEvidence, classifyIntent, imageStaysWithVision, refersToPriorAction } from "@/lib/intent";
import { createJob, isJobCancelled, takeSteerNotes, updateJob } from "@/lib/jobs";
import { addMessage, getAgentState, getSession, updateAgentState } from "@/lib/db";
import { extractToolCalls, type ToolCall } from "@/lib/toolCalls";
import {
  answerFromPriorAction,
  answerFromSessionReport,
  collectProjectFacts,
  isUngroundedRefusal,
  pathMentioned,
  questionNeedsProjectFacts,
  renderProjectFacts,
  sessionReportNote,
  stripUngroundedSentences,
  workspaceForRequest,
  type ProjectFacts,
} from "@/lib/projectFacts";
import { devResourceNote } from "@/lib/devResources";
import { casualSystemPrompt, conversationSystemPrompt, evidenceSystemPrompt, solverNote, toolCapabilityNote } from "@/lib/prompts";
import { FILES_ANSWER, SERVER_ANSWER, SESSION_LOG_ANSWER, modelsThatAnswered, type AnswerModel } from "@/lib/answerModels";
import { directUserAction, TEXT_TOOL_INSTRUCTION } from "@/lib/directAction";
import { understandCommand } from "@/lib/commandUnderstand";
import { explainPcReport, reportNeedsVoice } from "@/lib/reportVoice";
import { presentComputerResult } from "@/lib/plainResult";
import { runCommandBounded } from "@/lib/commandRun";
import { textForModel } from "@/lib/secretRedact";
import { ocrPdfFile } from "@/lib/windowsOcr";
import { compactOldToolResults } from "@/lib/compact";
import { commandFailed, commandsForGoal, failureKey, nextGoalStep, shouldLook } from "@/lib/goalRun";
import { lookAtRunningApp } from "@/lib/appLook";
import { prepareWebFetch } from "@/lib/webAccess";
import { encodeWebAsk } from "@/lib/webAsk";
import { randomUUID } from "crypto";

const execAsync = promisify(exec);

// ── Model capability helpers ───────────────────────────────────────────────

const VISION_PREFIXES  = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];
const CODER_KEYWORDS   = ["coder", "code", "deepseek", "starcoder", "codellama"];
const VISION_ONLY      = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];

function isVision(m: string)    { return VISION_PREFIXES.some(p => m.toLowerCase().startsWith(p)); }
function isVisionOnly(m: string){ return VISION_ONLY.some(p => m.toLowerCase().startsWith(p)); }
function isCoder(m: string)     { return CODER_KEYWORDS.some(k => m.toLowerCase().includes(k)); }

function pickPlannerModel(all: string[]): string | null {
  return all.find((model) => model.toLowerCase().startsWith("qwen3"))
    ?? all.find((model) => !isCoder(model) && !isVisionOnly(model))
    ?? null;
}

function pickCoderModel(requested: string, all: string[]): string {
  if (isCoder(requested) && !isVisionOnly(requested)) return requested;
  return all.find((model) => isCoder(model) && !isVisionOnly(model))
    ?? all.find((model) => !isVisionOnly(model))
    ?? requested;
}

/** File and terminal work prefers the 7B coder. The 14B quant is not an automatic choice. */
function pickToolCoder(requested: string, all: string[]): string {
  if (isCoder(requested) && !isVisionOnly(requested) && !/1\.5b/i.test(requested) && !/14b/i.test(requested)) return requested;
  return pickHandsModel(all) ?? pickCoderModel(requested, all);
}

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
  // If exact match exists, use it
  if (all.includes(requested)) return requested;

  // If partial match exists (e.g. requested="qwen2.5-coder", actual="qwen2.5-coder:7b"), use the actual
  const partialMatch = all.find(m => m.startsWith(requested + ":") || m.split(":")[0] === requested);
  if (partialMatch && role !== "vision") return partialMatch;

  if (role === "vision") {
    if (isVision(requested) && partialMatch) return partialMatch;
    return all.find(m => isVision(m)) ?? (partialMatch || requested);
  }
  if (role === "coder") {
    if (!isVisionOnly(requested)) return partialMatch ?? requested;
    // User is on vision-only model, swap to best coder
    return (
      all.find(m => isCoder(m) && !isVisionOnly(m)) ??
      all.find(m => !isVisionOnly(m)) ??
      requested
    );
  }
  // general — avoid vision-only
  if (!isVisionOnly(requested)) return partialMatch ?? requested;
  return all.find(m => !isVisionOnly(m)) ?? requested;
}

interface ChatResult {
  ok: boolean;
  status: number;
  statusText: string;
  data?: { message?: { content?: string; tool_calls?: ToolCall[] } };
  errorText?: string;
}

type LoopOutcome =
  | { kind: "text"; text: string }
  | { kind: "no_tool_call"; raw: string }
  | { kind: "tools_unsupported"; raw: string }
  | { kind: "web_ask"; url: string };

function readableModelError(message: string): string {
  let text = message;
  for (let pass = 0; pass < 3; pass += 1) {
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end <= start) break;
    try {
      const parsed = JSON.parse(text.slice(start, end + 1)) as { error?: string | { message?: string } };
      const inner = typeof parsed.error === "string" ? parsed.error : parsed.error?.message;
      if (!inner || inner === text) break;
      text = inner;
    } catch {
      break;
    }
  }
  if (/multimodal/i.test(text)) return "This model cannot read a picture. Choose the vision model.";
  return text.replace(/\s+/g, " ").trim();
}

function isUserCancel(error: unknown): boolean {
  return error instanceof Error && /cancel/i.test(error.message);
}

function plainFailureReason(model: string, message: string): string {
  const waited = message.match(/(\d+) second/i);
  if (/timeout/i.test(message)) return fallbackReason(model, "timeout", waited ? Number(waited[1]) : undefined);
  if (/not found/i.test(message)) return `${model} is not installed. Retry it after installing it, or choose a different model.`;
  const detail = readableModelError(message)
    .replace(/Cannot reach Ollama:\s*/gi, "")
    .replace(/Ollama error:\s*/gi, "")
    .slice(0, 240);
  return `${model} stopped: ${detail} Retry it, or choose a different model.`;
}

function framePathsFromToolResult(result: string): string[] {
  return result
    .split("\n")
    .map((line) => line.trim().replace(/^Screenshot:\s*/i, ""))
    .filter((line) => /\.jpe?g$/i.test(line));
}

/** LLaVA describes frames that ffmpeg already wrote. The coder is not loaded during this call. */
async function describeVideoFrames(
  ollamaBase: string,
  visionModel: string,
  frames: string[],
  request: string,
  lead = "These images are frames from one video, in time order. Describe what is visible and what changes.",
  shouldStop?: () => boolean
): Promise<string> {
  const images: string[] = [];
  for (const frame of frames.slice(0, 4)) {
    try {
      if (fs.statSync(frame).size > 4 * 1024 * 1024) continue;
      images.push(fs.readFileSync(frame).toString("base64"));
    } catch { /* skip a frame the vision model cannot open */ }
  }
  if (!images.length) return "The frames could not be read for the vision model.";
  try {
    const result = await chatWithSingleLoadedModel(ollamaBase, visionModel, {
      model: visionModel,
      messages: [{
        role: "user",
        content: `${lead} The user asked: ${request.slice(0, 1000)}`,
        images,
      }],
      stream: false,
      keep_alive: 0,
    }, undefined, undefined, shouldStop);
    if (!result.ok) return `The vision model could not describe the frames. ${result.errorText || result.statusText}`;
    return result.data?.message?.content?.trim() || "The vision model returned no description.";
  } catch (error: unknown) {
    if (error instanceof Error && /cancel/i.test(error.message)) throw error;
    return `The vision model could not describe the frames. ${error instanceof Error ? error.message : String(error)}`;
  }
}

async function chatWithSingleLoadedModel(
  base: string,
  model: string,
  body: object,
  onProgress?: (text: string) => void,
  maxMs?: number,
  shouldStop?: () => boolean
): Promise<ChatResult> {
  return withOllamaModelLock(async () => {
    const loaded = await listLoadedModels(base);
    const freeMb = Math.round(os.freemem() / 1024 / 1024);
    const budget = inferenceBudgetMs({ model, loaded: loaded.some((name) => sameModel(name, model)), freeMb });
    const firstWait = maxMs && maxMs > 0 ? Math.min(maxMs, budget.ms) : budget.ms;
    onProgress?.(maxMs ? `${model} is labeling this request. This step can use ${Math.round(firstWait / 1000)} seconds.` : budget.note);
    const controller = new AbortController();
    const started = Date.now();
    let extensions = 0;
    let stoppedByUser = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const stopForUser = () => {
      if (!shouldStop?.()) return false;
      stoppedByUser = true;
      controller.abort();
      return true;
    };
    const review = async () => {
      if (stopForUser()) return;
      const nowLoaded = await listLoadedModels(base);
      const serverUp = nowLoaded.length > 0 || await isReachable(base, 2000);
      const decision = nextWait({
        elapsedMs: Date.now() - started,
        budgetMs: firstWait,
        extensions,
        serverUp,
        hot: nowLoaded.some((name) => sameModel(name, model)),
      });
      if (decision.action === "wait") {
        extensions += 1;
        onProgress?.(decision.note);
        timer = setTimeout(() => { void review(); }, decision.extraMs);
        return;
      }
      onProgress?.(decision.note);
      controller.abort();
    };
    timer = setTimeout(() => { void review(); }, firstWait);
    const cancelWatch = setInterval(() => { stopForUser(); }, 1000);
    try {
      const response = await fetch(`${base}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      if (!response.ok) {
        return {
          ok: false,
          status: response.status,
          statusText: response.statusText,
          errorText: await response.text().catch(() => ""),
        };
      }
      return { ok: true, status: response.status, statusText: response.statusText, data: await response.json() };
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") {
        if (stoppedByUser || shouldStop?.()) throw new Error("Job cancelled by user.");
        const seconds = Math.max(1, Math.round((Date.now() - started) / 1000));
        throw new Error(`Model ${model} exceeded the ${seconds} second load/inference timeout.`);
      }
      throw error;
    } finally {
      clearInterval(cancelWatch);
      if (timer) clearTimeout(timer);
    }
  }, base, model);
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

interface VerificationResult {
  command: string;
  ok: boolean;
  output: string;
}

async function runWorkspaceVerification(
  cwd: string,
  send: (event: string, data: object) => void
): Promise<VerificationResult[]> {
  const packagePath = path.join(cwd, "package.json");
  if (!fs.existsSync(packagePath)) return [];

  let scripts: Record<string, string> = {};
  try {
    scripts = JSON.parse(fs.readFileSync(packagePath, "utf-8")).scripts ?? {};
  } catch {
    return [];
  }

  const commands = scripts.test ? ["npm test"] : scripts.lint ? ["npm run lint"] : [];
  const results: VerificationResult[] = [];
  for (const command of commands) {
    send("verification", { command, status: "running" });
    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd,
        timeout: 120_000,
        maxBuffer: 1024 * 1024,
        shell: "powershell.exe",
      });
      const output = [stdout?.trim(), stderr?.trim()].filter(Boolean).join("\n").slice(-6000);
      results.push({ command, ok: true, output });
      send("verification", { command, status: "passed", output });
    } catch (error: unknown) {
      const result = error as { stdout?: string; stderr?: string; message?: string };
      const output = [result.stdout?.trim(), result.stderr?.trim(), result.message].filter(Boolean).join("\n").slice(-6000);
      results.push({ command, ok: false, output });
      send("verification", { command, status: "failed", output });
    }
  }
  return results;
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

const READ_ONLY_TOOLS = new Set(["read_file", "list_dir", "search_in_files", "read_document", "sample_video"]);

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
      description: "Run a PowerShell command on the user's computer. Use for creating directories, running builds, git operations, installing packages, etc. A command that prints nothing for 30 seconds is stopped, and the result says to try a different command. Do not run that same command again. A command that keeps printing may run for up to 3 minutes.",
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
  {
    type: "function",
    function: {
      name: "read_document",
      description: "Read a document the user named: txt, md, pdf, or docx. PDF text is extracted on the server before a model sees it.",
      parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
    },
  },
  {
    type: "function",
    function: {
      name: "sample_video",
      description: "Split a video into frames with ffmpeg, then a vision model can describe those frames. Set interval_seconds to how far apart the frames should be.",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string" },
          interval_seconds: { type: "number", description: "Seconds between frames. The model chooses this. Default 1." },
        },
        required: ["path"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "web_fetch",
      description: "Read one public web page. This works only when the computer has a real internet connection. The first call asks the user before the page is opened. Do not use it for files on this PC.",
      parameters: {
        type: "object",
        properties: {
          url: { type: "string", description: "A public http or https address." },
        },
        required: ["url"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "launch_app",
      description: "Open an application already installed on this computer. Blender, MetaTrader 5, VirtualBox, CorelDRAW, and Android Studio start only when that connection is on in Settings. Opening them does not build a mesh, place a trade, power on a virtual machine, or draw. A Blender shape is a separate bpy save, not this tool.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          args: { type: "string", description: "Optional arguments for the program." },
        },
        required: ["name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "computer_action",
      description: "Check or change this PC. components_status covers the OS, CPU, memory, battery, GPU, disks, display, audio, network, Bluetooth, printers, cameras, and power. Also battery, cpu, gpu, display, audio, volume, brightness, theme, default apps, Windows Update, clipboard, printers, camera, devices, startup apps, installed programs, bluetooth, firewall, a named process or service, disk, memory, wifi, screenshot, speak, listen, and transcribe. eject_drive safely removes one removable flash drive. target may be a drive letter. It never touches a fixed disk. If the request is a new kind of idea, think about which one action does it. ui_type and ui_click target a window with a pipe, such as notepad|hello. sleep, restart, and shutdown run only when the user asked. process_stop, service_start, service_stop, device_enable, and device_disable take a named target. Leave the keyboard, mouse, and display enabled. Do not type into the Windows sign-in screen. microphone_off mutes the microphone and blocks apps in this Windows account. It does not remove the device. microphone_on turns that back on. device_disable on a microphone uses that same mute. If the result says Generic failure, the device is still as it was. Listening uses Windows speech, then records the microphone and transcribes it with the installed whisper model when that recognizer fails. Transcribing a file uses that same whisper model. A PDF with no text layer is read with Windows OCR.",
      parameters: {
        type: "object",
        properties: {
          action: { type: "string" },
          target: { type: "string", description: "Process name, service name, words to speak, or an audio file." },
        },
        required: ["action"],
      },
    },
  },
];

// ── Safety ─────────────────────────────────────────────────────────────────

const BLOCKED = [
  /rm\s+-rf\s+\//i, /format\s+[a-z]:/i, /Format-Volume/i, /Clear-Disk/i, /Initialize-Disk/i,
  /Remove-Item.*-Recurse.*-Force.*[Cc]:\\/i,
  /del\s+\/[sqa]/i, /shutdown/i, /Restart-Computer/i, /Stop-Computer/i,
];

function resolveFilePath(filePath: string, cwd: string): string {
  return path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath);
}

function limitToolOutput(output: string, maxLength = 40_000): string {
  if (output.length <= maxLength) return output;
  const headLength = Math.floor(maxLength * 0.75);
  const tailLength = maxLength - headLength;
  return `${output.slice(0, headLength)}\n\n... output truncated ...\n\n${output.slice(-tailLength)}`;
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
        if (/\.(pdf|docx|pptx)$/i.test(r)) return executeTool("read_document", args, cwd, send);
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
        const run = await runCommandBounded(cmd, { cwd: runCwd, env: toolEnv(), idleMs: 30_000, totalMs: 180_000, maxBytes: 512 * 1024 });
        return limitToolOutput(run.output);
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

      case "read_document": {
        const target = resolveFilePath(args.path, cwd);
        if (!fs.existsSync(target)) return `Error: File not found: ${target}`;
        const lowerTarget = target.toLowerCase();
        if (lowerTarget.endsWith(".docx") || lowerTarget.endsWith(".pptx")) {
          try {
            const text = lowerTarget.endsWith(".pptx") ? await readPptxFile(target) : await readDocxFile(target);
            return text ? limitToolOutput(text) : `Error: No text found in ${target}`;
          } catch (error: unknown) {
            return `Error: Could not read the document. ${error instanceof Error ? error.message : String(error)}`;
          }
        }
        const extracted = readDocumentFile(target);
        if (lowerTarget.endsWith(".pdf") && !extracted.trim()) {
          const ocr = await ocrPdfFile(target);
          if (!ocr.startsWith("Error:") && ocr !== "OCR: no text") return limitToolOutput(ocr);
          if (ocr === "OCR: no text") return "No words were found in that PDF.";
          return limitToolOutput(ocr);
        }
        return limitToolOutput(extracted);
      }

      case "sample_video": {
        const target = resolveFilePath(args.path, cwd);
        const sampled = await extractVideoFrames(target, Number(args.interval_seconds ?? 1));
        if (!sampled.frames.length) return sampled.note;
        return `${sampled.note}\n${sampled.frames.join("\n")}`;
      }

      case "computer_action": {
        const action = args.action ?? "";
        const target = args.target ?? "";
        const result = await runComputerAction(action, target);
        return presentComputerResult(action, target, result);
      }

      case "launch_app": {
        const request = parseAppRequest(args.name ?? "");
        if (!request.ok) return `Error: ${request.reason}`;
        const blockedConnection = connectionBlock(readFoniaSettings(), request.target);
        if (blockedConnection) return blockedConnection;
        const appPath = resolveInstalledApp(request.target);
        const named = matchConnection(request.target);
        if (named && !fs.existsSync(appPath)) {
          return `${named.label} is on in Settings, and the program was not in the usual install folder. Nothing was started.`;
        }
        const extra = (args.args ?? "").trim();
        if (extra && /[;&|<>`$]/.test(extra)) return "Error: Arguments cannot include a shell command.";
        const argumentList = extra ? ` -ArgumentList '${extra.replace(/'/g, "''")}'` : "";
        try {
          await execAsync(
            `Start-Process -FilePath '${appPath.replace(/'/g, "''")}'${argumentList}`,
            { cwd, shell: "powershell.exe", timeout: 20_000 }
          );
          return connectionStartedNote(request.target, appPath);
        } catch (error: unknown) {
          return `Error: Could not start ${request.target}. ${error instanceof Error ? error.message : String(error)}`;
        }
      }

      default:
        return `Error: Unknown tool: ${name}`;
    }
  } catch (err: unknown) {
    return `Error: ${err instanceof Error ? err.message : String(err)}`;
  }
}

// ── Single model agent loop ────────────────────────────────────────────────

async function runAgentLoop(
  ollamaBase: string,
  model: string,
  messages: { role: string; content: string; images?: string[] }[],
  cwd: string,
  withTools: boolean,
  send: (event: string, data: object) => void,
  maxRounds = 10,
  recordToolResult?: (tool: string, args: Record<string, string>, result: string) => void,
  jobId?: string,
  mustCallTool = false,
  readOnly = false,
  afterTool?: (toolName: string, result: string) => Promise<string>,
  shouldStop?: () => boolean,
  allowWeb = false,
): Promise<LoopOutcome> {
  const loopMessages = [...messages];
  let lastText = "";
  let toolsRan = 0;
  let toolsEnabled = withTools;
  let textProtocolTried = false;
  const tools = readOnly ? TOOLS.filter((tool) => READ_ONLY_TOOLS.has(tool.function.name)) : TOOLS;

  for (let round = 0; round < maxRounds; round++) {
    if (isJobCancelled(jobId)) throw new Error("Job cancelled by user.");
    const steered = takeSteerNotes(jobId);
    if (steered.length) {
      loopMessages.push({
        role: "user",
        content: `The user added this while the run is still open. Follow it and keep the same goal:\n${steered.join("\n")}`,
      });
      send("status", { text: "A steer message is in this run. The same goal continues until the check passes, the work is blocked, or you press Stop." });
    }
    if (round > 0) {
      const compacted = compactOldToolResults(loopMessages);
      loopMessages.splice(0, loopMessages.length, ...compacted);
    }
    let result: ChatResult;
    try {
      const body = toolsEnabled
        ? { model, messages: loopMessages, tools, stream: false, keep_alive: "30s" }
        : { model, messages: loopMessages, stream: false, keep_alive: "30s" };
      result = await chatWithSingleLoadedModel(ollamaBase, model, body, (text) => send("status", { text }), undefined, shouldStop);
    } catch (e) {
      throw new Error(`Cannot reach Ollama: ${(e as Error).message}`);
    }

    if (!result.ok) {
      const errText = result.errorText ?? "";
      const toolsNotSupported = errText.toLowerCase().includes("does not support tools");
      if (toolsNotSupported && toolsEnabled && !textProtocolTried) {
        toolsEnabled = false;
        textProtocolTried = true;
        send("thinking", { text: `${model} cannot use the tools API. Asking for one JSON action instead.` });
        loopMessages.push({ role: "user", content: TEXT_TOOL_INSTRUCTION });
        continue;
      }
      if (toolsNotSupported) {
        send("thinking", { text: `${model} cannot call tools. Its text will not be shown as a file result.` });
        return { kind: "tools_unsupported", raw: errText };
      }
      throw new Error(`Ollama error: ${errText || result.statusText}`);
    }

    const data = result.data ?? {};
    const message = data.message;

    let content = message?.content ?? "";
    const thinkMatch = content.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
    if (thinkMatch) {
      if (thinkMatch[1].trim()) send("thinking", { text: thinkMatch[1].trim() });
      content = thinkMatch[2].trim();
    }

    const toolCalls = extractToolCalls({ tool_calls: message?.tool_calls, content });

    if (toolCalls.length > 0) {
      send("thinking", { text: `Running ${toolCalls.length} action(s)…` });
      loopMessages.push({ role: "assistant", content });

      for (const tc of toolCalls) {
        if (isJobCancelled(jobId)) throw new Error("Job cancelled by user.");
        const toolName = tc.function?.name;
        const rawArgs = tc.function?.arguments ?? {};
        const args = typeof rawArgs === "string" ? JSON.parse(rawArgs) : rawArgs;

        send("tool_call", { tool: toolName, args });
        if (toolName === "web_fetch" && !readOnly) {
          if (!readFoniaSettings().internetAccess) {
            const note = "Internet access is off in Settings. The page was not opened.";
            send("tool_result", { tool: toolName, result: note });
            recordToolResult?.(toolName, args, note);
            loopMessages.push({ role: "tool", content: note });
            toolsRan += 1;
            continue;
          }
          const decision = await prepareWebFetch(String(args.url ?? ""), allowWeb);
          if (decision.kind === "ask") {
            send("tool_result", { tool: toolName, result: decision.note });
            recordToolResult?.(toolName, args, decision.note);
            return { kind: "web_ask", url: decision.url };
          }
          const webResult = decision.kind === "page" ? decision.text : decision.note;
          recordToolResult?.(toolName, args, webResult);
          send("tool_result", { tool: toolName, result: webResult });
          loopMessages.push({ role: "tool", content: webResult });
          toolsRan += 1;
          continue;
        }
        const executed = readOnly && !READ_ONLY_TOOLS.has(toolName)
          ? "Error: this turn can only read files."
          : await executeTool(toolName, args, cwd, send);
        const toolResult = afterTool ? await afterTool(toolName, executed) : executed;
        recordToolResult?.(toolName, args, toolResult);
        send("tool_result", { tool: toolName, result: toolResult });
        loopMessages.push({ role: "tool", content: toolResult });
        toolsRan += 1;
      }
      continue;
    }

    lastText = content;
    const pendingSteer = takeSteerNotes(jobId);
    if (pendingSteer.length && round < maxRounds - 1) {
      loopMessages.push({ role: "assistant", content });
      loopMessages.push({
        role: "user",
        content: `The user added this while the run is still open. Follow it and keep the same goal:\n${pendingSteer.join("\n")}`,
      });
      send("status", { text: "A steer message is in this run. The same goal continues until the check passes, the work is blocked, or you press Stop." });
      continue;
    }
    break;
  }

  if (mustCallTool && toolsRan === 0) {
    return { kind: "no_tool_call", raw: lastText };
  }
  return { kind: "text", text: lastText };
}

// ── Main route ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, model, system_prompt, workspace_path, images, session_id, job_id, model_locked, adjust_prompt, allow_web, confirmed_mode, confirmed_text } = body as {
      messages: { role: string; content: string }[];
      model: string;
      system_prompt?: string;
      workspace_path?: string;
      images?: string[];  // base64 images from user message
      session_id?: string;
      job_id?: string;
      model_locked?: boolean;
      adjust_prompt?: boolean;
      allow_web?: boolean;
      confirmed_mode?: string;
      confirmed_text?: string;
    };
    const modelLocked = Boolean(model_locked);
    const adjustPrompt = Boolean(adjust_prompt);
    const allowWeb = Boolean(allow_web);

    if (!model || !messages?.length) {
      return NextResponse.json({ error: "model and messages required" }, { status: 400 });
    }

    const jobId = job_id ?? randomUUID();
    createJob(jobId, session_id);

    let ollamaBase = "";
    let ollamaError = "";
    try {
      ollamaBase = await resolveOllamaHost();
    } catch (err: unknown) {
      ollamaError = err instanceof Error ? err.message : "Cannot reach Ollama";
    }

    const allModels = ollamaBase ? await getAvailableModels(ollamaBase) : [];
    const savedAgentState = session_id && getSession(session_id) ? getAgentState(session_id) : null;

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        function send(event: string, data: object) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ event, ...data })}\n\n`));
        }

        const attempted: AnswerModel[] = [];
        function markAttempt(name: string, role: string) {
          if (!name) return;
          if (!attempted.some((item) => item.name === name && item.role === role)) {
            attempted.push({ name, role });
          }
          send("model", { model: name, role });
        }
        function errorModels(): AnswerModel[] {
          return attempted.length ? attempted : [{ name: "", role: "no model" }];
        }

        updateJob(jobId, { status: "running", phase: "routing", model, role: "router" });
        send("job", { job_id: jobId });
        const stopThisRun = () => req.signal.aborted || isJobCancelled(jobId);

        if (isCloudConfigured()) {
          send("thinking", { text: "Connected to Azure Ollama" });
        }

        try {
          const userMessage = messages[messages.length - 1];
          const confirmedText = typeof confirmed_text === "string" ? confirmed_text.trim() : "";
          if (confirmedText) userMessage.content = confirmedText;
          const hasImages   = images && images.length > 0;
          const settings = readFoniaSettings();
          const confirmedMode = typeof confirmed_mode === "string" ? confirmed_mode : "";
          let steppingAway = false;
          let intentDecision = classifyIntent(userMessage.content, !!hasImages);
          let withTools = intentDecision.needsTools;
          if (session_id && getSession(session_id)) {
            updateAgentState(session_id, { phase: "routing", model, model_role: "router" });
          }

          const evidenceNeeded = answerRequiresEvidence(userMessage.content, !!hasImages);
          const mentionedPath = pathMentioned(userMessage.content);
          const mentionedIsFile = Boolean(mentionedPath && path.extname(mentionedPath));
          const workspace = workspaceForRequest(userMessage.content, workspace_path, process.cwd());
          const toolCwd = workspace.missing ? process.cwd() : workspace.path;
          const projectInstructions = workspace.missing ? "" : loadProjectInstructions(workspace.path);

          async function emitText(text: string, models: AnswerModel[]) {
            send("delta", { text });
            if (session_id && getSession(session_id)) {
              addMessage(randomUUID(), session_id, "user", userMessage.content, "agent");
              const assistantId = randomUUID();
              addMessage(assistantId, session_id, "assistant", text, "agent", models);
              send("done", { fullText: text, id: assistantId, models });
            } else {
              send("done", { fullText: text, models });
            }
          }

          const shapeChoice = confirmedMode.startsWith("shape:") ? confirmedMode.slice(6) : "";
          const namedScene = !hasImages ? parseBlenderScene(userMessage.content) : null;
          async function finishBlender(shape: BlenderShape) {
            if (!settings.connectExternalTools || !settings.connectBlender) {
              await emitText("Blender is off in Settings. Turn the Blender connection on, then ask again. Nothing was created.", [{ name: "rules", role: "understand" }]);
              updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
              return;
            }
            send("status", { text: `Blender is building a ${shape} with bpy. The small context model stays for a sentence that does not already name the action.` });
            const result = await runBlenderScene(shape, path.join(toolCwd, "fonia-blender"));
            await emitText(result, [{ name: "blender", role: "blender" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "blender" });
          }
          if (!hasImages && (namedScene || isBlenderShape(shapeChoice))) {
            await finishBlender(isBlenderShape(shapeChoice) ? shapeChoice : namedScene!.shape);
            return;
          }
          if (!hasImages && (confirmedMode === "blender" || blenderNeedsShape(userMessage.content))) {
            if (!settings.connectExternalTools || !settings.connectBlender) {
              await emitText("Blender is off in Settings. Turn the Blender connection on, then ask again. Nothing was created.", [{ name: "rules", role: "understand" }]);
              updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
              return;
            }
            const shapes = ["cube", "sphere", "cylinder", "cone", "plane", "monkey"].map((shape) => ({
              id: `shape:${shape}`,
              label: shape === "monkey" ? "Monkey" : shape.slice(0, 1).toUpperCase() + shape.slice(1),
              detail: `Blender builds a ${shape} with bpy and saves a .blend file.`,
            }));
            send("clarify", { question: "Which shape should Blender build?", options: shapes, original: userMessage.content });
            await emitText("Which shape should Blender build?", [{ name: "rules", role: "understand" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
            return;
          }

          if (confirmedMode === "sleep") {
            const slept = await runComputerAction("sleep", "");
            await emitText(slept, [{ name: "server", role: "server" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "server" });
            return;
          }
          if (confirmedMode === "overnight") {
            steppingAway = true;
          } else if (confirmedMode === "vision" && !hasImages) {
            await emitText("That request is about a picture. Attach the picture and it will go to the vision model.", [{ name: model, role: "understand" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model, role: "understand" });
            return;
          } else if (confirmedMode) {
            const chosen = intentForMode(confirmedMode);
            if (chosen) intentDecision = chosen;
          } else if (!hasImages && !machineRestCommand(userMessage.content) && !directUserAction(userMessage.content)) {
            let proposal: ModeProposal | null = null;
            const muddy = settings.understandFirst && needsUnderstanding(userMessage.content);
            if (muddy && ollamaBase) {
              const smallModel = allModels.find((name) => /1\.5b/i.test(name));
              const freeForSmall = Math.round(os.freemem() / 1024 / 1024);
              if (smallModel && freeForSmall >= estimateModelMb(smallModel)) {
                send("status", { text: `${smallModel} is matching this sentence to a system action. It unloads when it finishes.` });
                try {
                  const matched = await chatWithSingleLoadedModel(ollamaBase, smallModel, {
                    model: smallModel,
                    stream: false,
                    keep_alive: 0,
                    options: { num_ctx: 1024, temperature: 0 },
                    messages: [
                      { role: "system", content: understandInstruction() },
                      { role: "user", content: userMessage.content.slice(0, 800) },
                    ],
                  }, (text) => send("status", { text }), 60_000, stopThisRun);
                  proposal = matched.ok ? parseModeProposal(matched.data?.message?.content ?? "") : null;
                  if (proposal) send("status", { text: `${smallModel} matched this to ${proposal.mode}.` });
                } catch (error: unknown) {
                  if (isUserCancel(error)) throw error;
                  send("status", { text: "The small model did not answer. The usual reading of the sentence continues." });
                }
              } else if (smallModel) {
                send("status", { text: `${smallModel} needs about ${estimateModelMb(smallModel)} MB free and this PC has ${freeForSmall} MB, so the usual reading of the sentence continues.` });
              }
            }
            const ask = buildClarification(userMessage.content, proposal, settings.askBeforeConsequential);
            if (ask) {
              send("clarify", { question: ask.question, options: ask.options, original: userMessage.content });
              await emitText(ask.question, [{ name: proposal ? "qwen2.5-coder:1.5b" : "rules", role: "understand" }]);
              updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
              return;
            }
            if (proposal && !proposal.ask) {
              if (proposal.mode === "blender") {
                if (!settings.connectExternalTools || !settings.connectBlender) {
                  await emitText("Blender is off in Settings. Turn the Blender connection on, then ask again. Nothing was created.", [{ name: "qwen2.5-coder:1.5b", role: "understand" }]);
                  updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
                  return;
                }
                const shapes = ["cube", "sphere", "cylinder", "cone", "plane", "monkey"].map((shape) => ({
                  id: `shape:${shape}`,
                  label: shape === "monkey" ? "Monkey" : shape.slice(0, 1).toUpperCase() + shape.slice(1),
                  detail: `Blender builds a ${shape} with bpy and saves a .blend file.`,
                }));
                send("clarify", { question: "The small model matched this to Blender. Which shape should it build?", options: shapes, original: userMessage.content });
                await emitText("The small model matched this to Blender. Which shape should it build?", [{ name: "qwen2.5-coder:1.5b", role: "understand" }]);
                updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
                return;
              }
              if (proposal.mode === "overnight") steppingAway = true;
              else if (proposal.mode === "sleep") {
                await emitText("Suspending the PC stays on a direct sentence such as put the computer to sleep, or on the choice when asking is on.", [{ name: "qwen2.5-coder:1.5b", role: "understand" }]);
                updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
                return;
              } else {
                const chosen = intentForMode(proposal.mode);
                if (chosen) intentDecision = chosen;
              }
              if (proposal.mode === "vision" && !hasImages) {
                await emitText("That request is about a picture. Attach the picture and it will go to the vision model.", [{ name: "qwen2.5-coder:1.5b", role: "understand" }]);
                updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "understand" });
                return;
              }
            } else if (!settings.askBeforeConsequential && personIsSteppingAway(userMessage.content)) {
              steppingAway = true;
            }
          } else if (!settings.askBeforeConsequential && !hasImages && personIsSteppingAway(userMessage.content)) {
            steppingAway = true;
          }

          if (steppingAway) {
            let closed = "No extra applications were closed. The browser, the editor, Fonia, and Ollama stay running.";
            if (settings.closeExtraApps) {
              send("status", { text: "You are stepping away. Extra applications that the night run does not need will be closed. The browser, the editor, Fonia, and Ollama stay." });
              closed = await releaseExtraApps();
              send("status", { text: closed });
            } else {
              send("status", { text: "You are stepping away. Extra applications stay open because that switch is off." });
            }
            userMessage.content = `${userMessage.content}\n\n${awayWorkNote(closed)}`;
            intentDecision = { intent: "code", needsTools: true, needsWriteAccess: true };
          }
          withTools = intentDecision.needsTools;
          updateJob(jobId, { phase: "routing", model, role: intentDecision.intent });
          send("intent", { intent: intentDecision.intent, tools: withTools ? "enabled" : "disabled" });
          if (session_id && getSession(session_id)) {
            updateAgentState(session_id, { phase: "routing", model, model_role: "router" });
          }

          if (refersToPriorAction(userMessage.content)) {
            const reply = answerFromPriorAction(userMessage.content, savedAgentState?.tool_results ?? []);
            if (reply) {
              await emitText(reply, SESSION_LOG_ANSWER);
              updateJob(jobId, { status: "completed", phase: "complete", model, role: "evidence" });
              return;
            }
          }

          const rememberedReport = answerFromSessionReport(userMessage.content, savedAgentState?.tool_results ?? []);
          if (rememberedReport) {
            await emitText(rememberedReport, SESSION_LOG_ANSWER);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "evidence" });
            return;
          }

          function rememberTool(name: string, args: Record<string, string>, result: string) {
            if (!session_id || !getSession(session_id)) return;
            const currentState = getAgentState(session_id);
            const inspectedPath = args.path;
            updateAgentState(session_id, {
              inspected_files: inspectedPath
                ? [...new Set([...currentState.inspected_files, inspectedPath])]
                : currentState.inspected_files,
              tool_results: [
                ...currentState.tool_results,
                { tool: name, summary: result.slice(0, 1000), created_at: Math.floor(Date.now() / 1000) },
              ],
            });
          }

          async function finishReport(label: string, report: string, explain: boolean) {
            const covered = report.includes("\nComputer reading:\n");
            let models: AnswerModel[] = covered
              ? [{ name: "", role: "plain language" }, { name: "", role: "server" }]
              : [...SERVER_ANSWER];
            let body = report;
            if (!covered && explain && ollamaBase) {
              const onlineModel = isCloudConfigured();
              const modelReport = textForModel(report, onlineModel);
              const voiced = await explainPcReport({
                base: ollamaBase,
                requested: model,
                installed: allModels,
                freeMb: Math.round(os.freemem() / 1024 / 1024),
                report: modelReport,
                question: userMessage.content,
              });
              if (voiced.model) {
                markAttempt(voiced.model, "report");
                models = [{ name: voiced.model, role: "report" }, { name: "", role: "server" }];
              }
              body = `${report}\n\n${voiced.note ? `${voiced.note}\n\n` : ""}${voiced.text}`;
            }
            await emitText(`${label}\n\n${body}`, models);
            const jobRole = models.some((item) => item.role === "report") ? "report" : covered ? "plain language" : "server";
            updateJob(jobId, { status: "completed", phase: "complete", model: models[0]?.name ?? "", role: jobRole });
          }

          const direct = steppingAway ? null : directUserAction(userMessage.content);
          if (direct) {
            if (workspace.missing && direct.function.name !== "computer_action") {
              const message = `That folder does not exist: ${workspace.path}`;
              send("error", { message, models: errorModels() });
              updateJob(jobId, { status: "failed", phase: "failed", error: message });
              return;
            }
            send("intent", { intent: "code", tools: "enabled" });
            send("tool_call", { tool: direct.function.name, args: direct.function.arguments });
            const directResult = await executeTool(direct.function.name, direct.function.arguments, toolCwd, send);
            send("tool_result", { tool: direct.function.name, result: directResult });
            rememberTool(direct.function.name, direct.function.arguments, directResult);
            const label = direct.function.name === "run_command"
              ? `Command: ${direct.function.arguments.command}`
              : direct.function.name === "computer_action"
                ? `Computer: ${direct.function.arguments.action}${direct.function.arguments.target ? ` ${direct.function.arguments.target}` : ""}`
                : direct.function.name;
            const explain = direct.function.name === "computer_action" && reportNeedsVoice(direct.function.arguments.action ?? "");
            await finishReport(label, directResult, explain);
            return;
          }

          const plan = steppingAway ? null : understandCommand(userMessage.content);
          if (plan && !plan.safeToRun) {
            await emitText("That request includes a destructive command, so nothing was run.", SERVER_ANSWER);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: "server" });
            return;
          }
          if (plan?.safeToRun) {
            const needsFolder = plan.steps.some((step) => step.call.function.name !== "computer_action");
            if (workspace.missing && needsFolder) {
              const message = `That folder does not exist: ${workspace.path}`;
              send("error", { message, models: errorModels() });
              updateJob(jobId, { status: "failed", phase: "failed", error: message });
              return;
            }
            send("intent", { intent: "code", tools: "enabled" });
            const parts: string[] = [];
            for (const step of plan.steps) {
              send("tool_call", { tool: step.call.function.name, args: step.call.function.arguments });
              const result = await executeTool(step.call.function.name, step.call.function.arguments, toolCwd, send);
              send("tool_result", { tool: step.call.function.name, result });
              rememberTool(step.call.function.name, step.call.function.arguments, result);
              const action = step.call.function.arguments.action;
              const title = step.call.function.name === "computer_action" ? `Computer: ${action}` : step.call.function.name;
              parts.push(`${title}\n${result}`);
            }
            const skipped = plan.leftover.length ? `\n\nNot a PC command, so it was not run: ${plan.leftover.join("; ")}` : "";
            const explain = plan.steps.some((step) => step.call.function.name === "computer_action" && reportNeedsVoice(step.call.function.arguments.action ?? ""));
            await finishReport("Computer", `${parts.join("\n\n")}${skipped}`, explain);
            return;
          }

          let facts: ProjectFacts | null = null;
          if (evidenceNeeded && questionNeedsProjectFacts(userMessage.content)) {
            if (workspace.missing) {
              const message = `That folder does not exist: ${workspace.path}`;
              send("error", { message, models: errorModels() });
              updateJob(jobId, { status: "failed", phase: "failed", error: message });
              return;
            }
            facts = collectProjectFacts(workspace.path, workspace.redirectedFrom);
            send("tool_call", { tool: "list_dir", args: { path: workspace.path } });
            send("tool_result", { tool: "list_dir", result: facts.entries.join("\n") || "(empty)" });
            send("tool_call", { tool: "read_file", args: { path: path.join(workspace.path, "package.json") } });
            send("tool_result", { tool: "read_file", result: facts.packageSummary });
            if (workspace.redirectedFrom) {
              send("thinking", { text: `${workspace.redirectedFrom} does not exist. Using ${workspace.path}.` });
            }
            if (session_id && getSession(session_id)) {
              const currentState = getAgentState(session_id);
              const now = Math.floor(Date.now() / 1000);
              updateAgentState(session_id, {
                inspected_files: [...new Set([...currentState.inspected_files, ...facts.filesRead])],
                tool_results: [
                  ...currentState.tool_results,
                  { tool: "list_dir", summary: facts.entries.join("\n").slice(0, 1000), created_at: now },
                  { tool: "read_file", summary: facts.packageSummary.slice(0, 1000), created_at: now },
                ],
              });
            }
          } else if (evidenceNeeded && workspace.missing && mentionedPath && !mentionedIsFile) {
            const message = `That folder does not exist: ${workspace.path}`;
            send("error", { message, models: errorModels() });
            updateJob(jobId, { status: "failed", phase: "failed", error: message });
            return;
          }

          if (!ollamaBase) {
            send("status", { text: "Waiting for the model server. Your message is kept, and a reply is coming." });
            const host = await waitForModelServer({
              isCancelled: () => isJobCancelled(jobId),
              onWait: (attempt) => send("status", { text: `Model server is not answering yet (${attempt}). Still waiting. A reply is coming.` }),
            });
            if (host) {
              ollamaBase = host;
              allModels.splice(0, allModels.length, ...(await getAvailableModels(host)));
              send("status", { text: "Model server is running. A reply is coming." });
            }
          } else {
            send("status", { text: "Model server is running. A reply is coming." });
          }

          if (!ollamaBase) {
            const waitingReply = facts
              ? renderProjectFacts(facts)
              : `The model server has not started yet. Your message was not dropped.\n\n${userMessage.content}`;
            await emitText(waitingReply, facts ? FILES_ANSWER : [{ name: "", role: "waiting for the model server" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: "", role: facts ? "evidence" : "waiting" });
            return;
          }

          // ── PHASE 1: Vision analysis (if images attached) ──────────────
          let visionContext = "";
          let visionModelName = "";
          let visionWorked = false;
          const videoPathRaw = videoPathFromText(userMessage.content);
          if (videoPathRaw) {
            const videoPath = path.isAbsolute(videoPathRaw) ? videoPathRaw : path.resolve(toolCwd, videoPathRaw);
            const interval = videoIntervalFromText(userMessage.content);
            send("status", { text: "Splitting the video into frames. No model is loaded for this step." });
            send("tool_call", { tool: "sample_video", args: { path: videoPath, interval_seconds: interval } });
            const sampled = await extractVideoFrames(videoPath, interval);
            const sampledText = sampled.frames.length ? `${sampled.note}\n${sampled.frames.join("\n")}` : sampled.note;
            send("tool_result", { tool: "sample_video", result: sampledText });
            const freeForFrames = Math.round(os.freemem() / 1024 / 1024);
            const visionModel = pickVisionModel(model, allModels, freeForFrames);
            if (sampled.frames.length && visionModel && freeForFrames >= estimateModelMb(visionModel)) {
              visionModelName = visionModel;
              markAttempt(visionModel, "vision");
              send("status", { text: `Model server is running. ${visionModel} is describing the frames. A reply is coming.` });
              const description = await describeVideoFrames(ollamaBase, visionModel, sampled.frames, userMessage.content, undefined, stopThisRun);
              visionWorked = !description.startsWith("The vision model could not") && !description.startsWith("The frames could not");
              visionContext = `${sampled.note}\n\n${description}\n\nCall sample_video with a different interval_seconds if these frames are too far apart or too close.`;
              send("thinking", { text: `Vision:\n${description.slice(0, 500)}` });
            } else if (sampled.frames.length) {
              visionContext = `${sampledText}\n\nNo vision model is installed, so the frames were not described.`;
            } else {
              visionContext = sampledText;
            }
          }
          if (hasImages) {
            const freeForVision = Math.round(os.freemem() / 1024 / 1024);
            const visionModel = pickVisionModel(model, allModels, freeForVision);
            if (!visionModel) {
              await emitText(`No vision model is installed. The picture was not sent to ${model}.`, [{ name: model, role: "needs a choice" }]);
              updateJob(jobId, { status: "completed", phase: "complete", model, role: "choice" });
              return;
            }
            const visionNeed = estimateModelMb(visionModel);
            if (freeForVision < visionNeed) {
              await askForModelChoice(`${visionModel} needs about ${visionNeed} MB free and this PC has ${freeForVision} MB, so the picture was not sent to a text model. Unload another model, then retry ${visionModel}.`, visionModel);
              return;
            }
            visionModelName = visionModel;
            markAttempt(visionModel, "vision");
            send("status", { text: `${visionModel} is reading the picture. A text model is not loaded for this step.` });
            try {
              const visionResult = await chatWithSingleLoadedModel(ollamaBase, visionModel, {
                model: visionModel,
                messages: [
                  {
                    role: "user",
                    content: `Describe this picture. Include the visible text, the layout, and what the user asked: ${userMessage.content}`,
                    images,
                  },
                ],
                stream: false,
                keep_alive: 0,
              }, (text) => send("status", { text }), undefined, stopThisRun);
              if (!visionResult.ok) throw new Error(visionResult.errorText || visionResult.statusText);
              const imageText = visionResult.data?.message?.content?.trim() ?? "";
              if (imageText) {
                visionContext = [visionContext, imageText].filter(Boolean).join("\n\n");
                visionWorked = true;
              }
              send("thinking", { text: `Vision:\n${imageText.slice(0, 300)}` });
            } catch (error: unknown) {
              if (isUserCancel(error)) throw error;
              const message = error instanceof Error ? error.message : String(error);
              await askForModelChoice(plainFailureReason(visionModel, message), visionModel);
              return;
            }
            if (imageStaysWithVision(userMessage.content)) {
              const reply = visionContext.trim() || "The vision model returned no description.";
              await emitText(reply, [{ name: visionModel, role: "vision" }]);
              updateJob(jobId, { status: "completed", phase: "complete", model: visionModel, role: "vision" });
              return;
            }
          }

          if (adjustPrompt && !modelLocked && !hasImages && intentDecision.intent === "explain" && !intentDecision.needsTools) {
            const smallModel = allModels.find((name) => /1\.5b/i.test(name));
            if (smallModel) {
              send("status", { text: `${smallModel} is labeling the request. It does not replace your words with a command.` });
              try {
                const labeled = await chatWithSingleLoadedModel(ollamaBase, smallModel, {
                  model: smallModel,
                  stream: false,
                  keep_alive: 0,
                  options: { num_ctx: 1024 },
                  messages: [
                    { role: "system", content: adjusterInstruction() },
                    { role: "user", content: userMessage.content.slice(0, 800) },
                  ],
                }, (text) => send("status", { text }), 90_000, stopThisRun);
                const kind: AdjusterKind | null = labeled.ok ? parseAdjusterKind(labeled.data?.message?.content ?? "") : null;
                if (kind === "project") intentDecision = { intent: "explain", needsTools: true, needsWriteAccess: false };
                else if (kind === "chat") intentDecision = { intent: "explain", needsTools: false, needsWriteAccess: false };
                else if (kind === "computer") send("status", { text: "The label was a PC command, but the words did not match one, so no setting was changed." });
                else if (kind === "vision") {
                  await emitText("That request is about a picture. Attach the picture and it will go to the vision model.", [{ name: smallModel, role: "adjuster" }]);
                  updateJob(jobId, { status: "completed", phase: "complete", model: smallModel, role: "adjuster" });
                  return;
                }
                if (kind) {
                  withTools = intentDecision.needsTools;
                  send("status", { text: `${smallModel} labeled this request as ${kind}.` });
                }
              } catch (error: unknown) {
                if (isUserCancel(error)) throw error;
                send("status", { text: "The prompt label was skipped. The request continues with the normal rules." });
              }
            }
          }
          if (intentDecision.intent === "explain" && intentDecision.needsTools && !facts && questionNeedsProjectFacts(userMessage.content)) {
            facts = collectProjectFacts(workspace.path, workspace.redirectedFrom);
            send("tool_call", { tool: "list_dir", args: { path: workspace.path } });
            send("tool_result", { tool: "list_dir", result: facts.entries.join("\n") || "(empty)" });
            send("tool_call", { tool: "read_file", args: { path: path.join(workspace.path, "package.json") } });
            send("tool_result", { tool: "read_file", result: facts.packageSummary });
          }

          // ── PHASE 2: Coder/agent loop ──────────────────────────────────
          // Pick a non-vision model for code editing
          const freeMemoryMb = Math.round(os.freemem() / 1024 / 1024);
          const preferredCoder = modelLocked
            ? model
            : intentDecision.needsTools
              ? pickToolCoder(model, allModels)
              : pickCoderModel(model, allModels);
          let coderModel = preferredCoder;
          if (steppingAway && settings.strongCoderOvernight && !modelLocked) {
            const strong = pickStrongCoder(allModels, freeMemoryMb);
            if (strong) {
              coderModel = strong;
              send("status", { text: `${strong} is the strongest coder that fits in ${freeMemoryMb} MB free. The run continues until the check passes, the work is blocked, or you press Stop.` });
            }
          } else if (!modelLocked && !isVisionOnly(preferredCoder) && freeMemoryMb < estimateModelMb(preferredCoder)) {
            const fallbackCoder = pickFallbackCoder(allModels, freeMemoryMb, intentDecision.needsWriteAccess);
            if (fallbackCoder) {
              coderModel = fallbackCoder;
              send("status", { text: `${preferredCoder} needs about ${estimateModelMb(preferredCoder)} MB free and this PC has ${freeMemoryMb} MB, so ${fallbackCoder} will take the task.` });
            }
          }
          let executorModel = coderModel;
          let executorRole = withTools ? (/:3b\b/i.test(coderModel) ? "solver" : "coding") : "response";
          let planningContext = "";
          let plannerModelUsed: string | null = null;
          let plannerWorked = false;
          const changedFiles = new Set<string>();
          const executionNotes: string[] = [];

          async function askForModelChoice(reason: string, failedModel: string) {
            const choices = fallbackChoices(allModels, failedModel);
            const seen = visionContext.trim()
              ? `\n\nAlready done before this choice:\n${visionContext.trim().slice(0, 1200)}`
              : "";
            send("fallback", { reason, failedModel, choices });
            send("status", { text: `${failedModel} stopped. Choose Retry or another model. Your request is kept.` });
            await emitText(`${reason}${seen}${encodeModelChoice({ failedModel, choices })}`, [{ name: failedModel, role: "needs a choice" }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: failedModel, role: "choice" });
          }

          const brainModel = pickBrainModel(allModels);
          const handsModel = pickHandsModel(allModels);
          const useBrain = settings.brainWhenRamFits && !modelLocked
            && codingUsesBrain(intentDecision.intent, intentDecision.needsWriteAccess)
            && Boolean(brainModel)
            && Boolean(handsModel)
            && freeMemoryMb >= 7200
            && brainModel !== handsModel;

          if (useBrain && brainModel) {
            plannerModelUsed = brainModel;
            updateJob(jobId, { phase: "planning", model: brainModel, role: "brain" });
            if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "planning", model: brainModel, model_role: "brain" });
            markAttempt(brainModel, "brain");
            send("status", { text: `Model server is running. ${brainModel} is reading your request and preparing the coder. A reply is coming.` });
            try {
              const planningResult = await chatWithSingleLoadedModel(ollamaBase, brainModel, {
                model: brainModel,
                messages: [
                  {
                    role: "system",
                    content: "You are the planning model. Do not edit files or run commands. Write a short handoff for the coding model: the goal, the files to touch, the ordered steps, what to leave alone, and how to check the result. Stay under 1500 characters.",
                  },
                  {
                    role: "user",
                    content: `Request:\n${userMessage.content}\n\nWorkspace:\n${toolCwd}\n\n${facts ? facts.evidenceText.slice(0, 2500) : ""}`,
                  },
                ],
                stream: false,
                keep_alive: 0,
              }, undefined, undefined, stopThisRun);
              if (planningResult.ok) {
                planningContext = (planningResult.data?.message?.content?.trim() ?? "").slice(0, 1500);
                if (!planningContext) {
                  await askForModelChoice(fallbackReason(brainModel, "planner"), brainModel);
                  return;
                }
                plannerWorked = Boolean(planningContext);
                const plannerModels: AnswerModel[] = plannerWorked ? [{ name: brainModel, role: "brain" }] : [];
                if (planningContext && session_id && getSession(session_id)) {
                  addMessage(randomUUID(), session_id, "assistant", `Planner handoff:\n${planningContext}`, "agent", plannerModels);
                  updateAgentState(session_id, {
                    decisions: [...(savedAgentState?.decisions ?? []), planningContext.slice(0, 4000)],
                  });
                }
                if (planningContext) send("plan", { content: planningContext, models: plannerModels });
                send("status", { text: `Plan ready. ${handsModel} will make the edits. A reply is coming.` });
              } else {
                await askForModelChoice(fallbackReason(brainModel, "planner"), brainModel);
                return;
              }
            } catch (error: unknown) {
              if (isUserCancel(error)) throw error;
              await askForModelChoice(fallbackReason(brainModel, "planner"), brainModel);
              return;
            }
            executorModel = handsModel ?? executorModel;
            executorRole = "coding";
          } else if (!modelLocked && codingUsesBrain(intentDecision.intent, intentDecision.needsWriteAccess) && freeMemoryMb < 7200) {
            send("status", { text: `The 8B planner and the 7B coder run one after another only when at least 7200 MB is free. This PC has ${freeMemoryMb} MB free, so that pair is not starting.` });
          } else if (intentDecision.intent === "deep") {
            const plannerModel = pickPlannerModel(allModels);
            if (plannerModel && plannerModel !== coderModel && freeMemoryMb >= 8192) {
              plannerModelUsed = plannerModel;
              updateJob(jobId, { phase: "planning", model: plannerModel, role: "planner" });
              if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "planning", model: plannerModel, model_role: "planner" });
              markAttempt(plannerModel, "planner");
              send("thinking", { text: `Planning the deep task with ${plannerModel} before coding…` });
              try {
                const planningResult = await chatWithSingleLoadedModel(ollamaBase, plannerModel, {
                  model: plannerModel,
                  messages: [
                    {
                      role: "system",
                      content: "You are the planning and review model. Do not edit files or run commands. Produce a concise implementation plan for the coding model: requirements, affected areas, ordered steps, risks, and verification commands. Do not scan files unless the user explicitly supplied their contents or named a specific file.",
                    },
                    {
                      role: "user",
                      content: `Recent conversation context:\n${messages.slice(-6).map((message) => `${message.role}: ${message.content}`).join("\n\n").slice(0, 8000)}\n\nCurrent request:\n${userMessage.content}`,
                    },
                  ],
                  stream: false,
                  keep_alive: 0,
                }, undefined, undefined, stopThisRun);
                if (planningResult.ok) {
                  planningContext = planningResult.data?.message?.content?.trim() ?? "";
                  if (!planningContext) {
                    await askForModelChoice(fallbackReason(plannerModel, "planner"), plannerModel);
                    return;
                  }
                  plannerWorked = Boolean(planningContext);
                  const plannerModels: AnswerModel[] = plannerWorked ? [{ name: plannerModel, role: "planner" }] : [];
                  if (planningContext && session_id && getSession(session_id)) {
                    addMessage(randomUUID(), session_id, "assistant", `Planner handoff:\n${planningContext}`, "agent", plannerModels);
                    updateAgentState(session_id, {
                      decisions: [...(savedAgentState?.decisions ?? []), planningContext.slice(0, 4000)],
                    });
                  }
                  if (planningContext) send("plan", { content: planningContext, models: plannerModels });
                  send("thinking", { text: `Planning complete. Passing the plan to ${coderModel}.` });
                } else {
                  await askForModelChoice(fallbackReason(plannerModel, "planner"), plannerModel);
                  return;
                }
              } catch (error: unknown) {
                if (isUserCancel(error)) throw error;
                await askForModelChoice(fallbackReason(plannerModel, "planner"), plannerModel);
                return;
              }
            } else if (freeMemoryMb < 8192) {
              send("thinking", { text: `Skipping planner because only ${freeMemoryMb} MB RAM is free; continuing with ${coderModel}.` });
            }
          }

          if (intentDecision.needsWriteAccess && freeMemoryMb < estimateModelMb(executorModel)) {
            await askForModelChoice(`${executorModel} needs about ${estimateModelMb(executorModel)} MB free and this PC has ${freeMemoryMb} MB, so it was not started. Unload a loaded model, or choose a smaller one.`, executorModel);
            return;
          }

          markAttempt(executorModel, executorRole);
          updateJob(jobId, { phase: "executing", model: executorModel, role: withTools ? "executor" : "responder" });
          if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "executing", model: executorModel, model_role: withTools ? "executor" : "responder" });
          if (coderModel !== model) {
            send("thinking", { text: `Using ${coderModel} for code editing` });
          }

          const reportNote = sessionReportNote(savedAgentState?.tool_results ?? [], isCloudConfigured());
          const mustCallTool = intentDecision.needsWriteAccess || (evidenceNeeded && !facts);
          const capability = (withTools || mustCallTool || Boolean(videoPathRaw)) ? `\n\n${toolCapabilityNote()}` : "";
          const resources = (withTools || facts) ? `\n\n${devResourceNote()}` : "";
          const systemPrompt = (( !withTools && !evidenceNeeded && !videoPathRaw)
            ? `${casualSystemPrompt(system_prompt)}${reportNote ? `\n\nThe computer reports below were already taken in this session. Use them when the user asks about them.\n${reportNote}` : ""}`
            : facts
              ? evidenceSystemPrompt({
                  userSystem: system_prompt,
                  workspace: toolCwd,
                  evidence: `${facts.evidenceText}${projectInstructions}`,
                  sessionNote: [
                    reportNote,
                    planningContext ? `Plan:\n${planningContext}` : "",
                    visionContext ? `What the vision model saw:\n${visionContext}` : "",
                  ].filter(Boolean).join("\n\n"),
                })
              : `${conversationSystemPrompt(system_prompt)}
Workspace: ${toolCwd}
${withTools || videoPathRaw ? "When a file, document, video, or program is involved, call a tool. A sentence that names a tool is not a tool call." : ""}
${projectInstructions}
${reportNote ? `\n${reportNote}` : ""}
${planningContext ? `\nPlan:\n${planningContext}` : ""}
${visionContext ? `\nWhat the vision model saw:\n${visionContext}` : ""}`) + capability + resources + (executorRole === "solver" ? `\n\n${solverNote()}` : "") + `\n\n${connectionStance(settings)}`;

          const historyBeforeRequest = messages.slice(0, -1);
          const requestMessage = { role: "user", content: userMessage.content };
          const seededSteps = facts
            ? [{
                role: "user",
                content: [
                  "Steps already completed in this turn:",
                  `list_dir ${facts.workspace}`,
                  facts.entries.join("\n") || "(empty)",
                  facts.packageSummary,
                  facts.readmeExcerpt ? `README\n${facts.readmeExcerpt.slice(0, 1500)}` : "",
                  "Read another file inside the workspace if the answer still needs it, then answer from these results.",
                ].filter(Boolean).join("\n\n"),
              }]
            : [];
          const agentMessages: { role: string; content: string; images?: string[] }[] = [
            { role: "system", content: systemPrompt },
            ...historyBeforeRequest,
            ...seededSteps,
            requestMessage,
          ];

          const recordTool = session_id && getSession(session_id)
            ? (tool: string, args: Record<string, string>, result: string) => {
                const currentState = getAgentState(session_id);
                const inspectedPath = args.path ?? args.directory;
                const inspected = ["read_file", "list_dir", "search_in_files"].includes(tool) && inspectedPath
                  ? [...currentState.inspected_files, inspectedPath]
                  : currentState.inspected_files;
                const command = args.command ?? "";
                const isVerification = tool === "run_command" && /\b(test|lint|build|check|typecheck|compile)\b/i.test(command);
                if (["write_file", "patch_file", "delete_file"].includes(tool) && args.path) changedFiles.add(args.path);
                if (result.startsWith("Error:")) executionNotes.push(`${tool}: ${result.slice(0, 500)}`);
                updateAgentState(session_id, {
                  inspected_files: [...new Set(inspected)],
                  tool_results: [...currentState.tool_results, { tool, summary: result.slice(0, 1000), created_at: Math.floor(Date.now() / 1000) }],
                  tests_run: isVerification
                    ? [...currentState.tests_run, { command, result: result.slice(0, 1000), created_at: Math.floor(Date.now() / 1000) }]
                    : currentState.tests_run,
                });
              }
            : undefined;

          const explainTurn = intentDecision.intent === "explain" && !intentDecision.needsWriteAccess;
          const runOnce = (activeModel: string, extraNote = "") => runAgentLoop(
            ollamaBase,
            activeModel,
            extraNote ? [...agentMessages, { role: "user", content: extraNote }] : agentMessages,
            toolCwd,
            withTools || mustCallTool,
            send,
            explainTurn ? 6 : 10,
            recordTool,
            jobId,
            mustCallTool,
            explainTurn,
            async (toolName, toolResult) => {
              const isScreen = toolName === "computer_action" && /Screenshot:/i.test(toolResult);
              if (toolName !== "sample_video" && !isScreen) return toolResult;
              const frames = framePathsFromToolResult(toolResult).filter((frame) => fs.existsSync(frame));
              if (!frames.length) return toolResult;
              const freeForFrames = Math.round(os.freemem() / 1024 / 1024);
              const visionModel = pickVisionModel(model, allModels, freeForFrames);
              if (!visionModel) return `${toolResult}\n\nNo vision model is installed, so the frames were not described.`;
              if (freeForFrames < estimateModelMb(visionModel)) return `${toolResult}\n\n${visionModel} needs about ${estimateModelMb(visionModel)} MB free and this PC has ${freeForFrames} MB, so the frames were not described.`;
              visionModelName = visionModel;
              markAttempt(visionModel, "vision");
              send("status", { text: `Frames are split. ${visionModel} is describing them. A reply is coming.` });
              const description = await describeVideoFrames(
                ollamaBase,
                visionModel,
                frames,
                userMessage.content,
                isScreen ? "This image is one screenshot of the desktop. Describe what is visible." : undefined,
                stopThisRun
              );
              if (!description.startsWith("The vision model could not") && !description.startsWith("The frames could not")) visionWorked = true;
              return `${toolResult}\n\nVision:\n${description}`;
            },
            stopThisRun,
            allowWeb
          );

          send("status", {
            text: intentDecision.needsWriteAccess
              ? `Model server is running. ${executorModel} is holding this goal. The run continues until the check passes, the work is blocked, or you press Stop.`
              : `Model server is running. ${executorModel} is working. A reply is coming.`,
          });

          const triedModels = [executorModel];
          const continueNote = intentDecision.needsWriteAccess
            ? "The previous model did not finish. Continue the same request. Begin the work with the tools. Do not ask the user to choose a model."
            : "The previous model did not finish. Continue the same request and answer it. Do not ask the user to choose a model. Do not create a file unless the request asked for one.";
          async function takeOverFromStall(): Promise<string | null> {
            if (triedModels.length >= 3) return null;
            const freed = await releaseLoadedModels(ollamaBase);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            const freeNow = Math.round(os.freemem() / 1024 / 1024);
            const next = nextModelAfterStall({
              models: allModels,
              failed: triedModels,
              freeMb: freeNow,
              needsWrite: intentDecision.needsWriteAccess,
            });
            if (!next) {
              send("status", {
                text: `${executorModel} stopped. ${freed.length ? `Unloaded ${freed.join(", ")}.` : "No model was loaded to unload."} ${freeNow} MB is free, and no closer model fits.`,
              });
              return null;
            }
            send("status", {
              text: `${executorModel} stopped. Unloaded ${freed.length ? freed.join(", ") : "the stuck model"}. ${next} is continuing the same request. ${freeNow} MB is free.`,
            });
            triedModels.push(next);
            executorRole = /1\.5b/i.test(next) ? "response" : /:3b\b/i.test(next) ? "solver" : "coding";
            markAttempt(next, executorRole);
            updateJob(jobId, { phase: "executing", model: next, role: withTools ? "executor" : "responder" });
            return next;
          }

          let outcome: LoopOutcome | undefined;
          for (let attempt = 0; attempt < 3; attempt += 1) {
            try {
              outcome = await runOnce(executorModel, attempt === 0 ? "" : continueNote);
            } catch (error: unknown) {
              if (isUserCancel(error)) throw error;
              const message = error instanceof Error ? error.message : String(error);
              if (!/timeout/i.test(message)) {
                await askForModelChoice(plainFailureReason(executorModel, message), executorModel);
                return;
              }
              const next = await takeOverFromStall();
              if (!next) {
                await askForModelChoice(plainFailureReason(executorModel, message), executorModel);
                return;
              }
              executorModel = next;
              continue;
            }
            if (!outcome) break;
            if (outcome.kind === "web_ask") {
              await emitText(`The goal is waiting on one web page.${encodeWebAsk(outcome.url)}`, [{ name: executorModel, role: executorRole }]);
              updateJob(jobId, { status: "completed", phase: "complete", model: executorModel, role: "web" });
              return;
            }
            if (outcome.kind === "tools_unsupported" || (outcome.kind === "no_tool_call" && mustCallTool)) {
              const next = await takeOverFromStall();
              if (!next) {
                await askForModelChoice(
                  fallbackReason(executorModel, outcome.kind === "tools_unsupported" ? "tools" : "no_tool"),
                  executorModel
                );
                return;
              }
              executorModel = next;
              continue;
            }
            break;
          }

          if (!outcome || outcome.kind === "tools_unsupported" || (outcome.kind === "no_tool_call" && mustCallTool)) {
            await askForModelChoice(
              fallbackReason(executorModel, !outcome || outcome.kind === "no_tool_call" ? "no_tool" : "tools"),
              executorModel
            );
            return;
          }

          let finalText = "";
          if (outcome.kind === "text") {
            finalText = facts ? stripUngroundedSentences(outcome.text, facts.evidenceText) : outcome.text;
            const packageName = facts?.packageSummary.match(/name: (\S+)/)?.[1];
            const missesPackage = Boolean(packageName && packageName !== "(none)" && finalText && !finalText.includes(packageName));
            if (facts && (!finalText || isUngroundedRefusal(finalText) || missesPackage)) finalText = renderProjectFacts(facts);
          } else if (facts) {
            finalText = intentDecision.needsWriteAccess && changedFiles.size === 0
              ? `No file was changed.\n\n${renderProjectFacts(facts)}`
              : renderProjectFacts(facts);
            if (visionContext.trim()) finalText = `${visionContext.trim()}\n\n${finalText}`;
          } else if (visionContext.trim()) {
            finalText = visionContext.trim();
          } else {
            const message = intentDecision.needsWriteAccess
              ? "No file was changed, so I will not claim it was created."
              : "No files were read, so I will not describe the project.";
            await emitText(`${message}\n\nYour request is still here:\n${userMessage.content}`, errorModels());
            updateJob(jobId, { status: "completed", phase: "complete", model: executorModel, role: "reply" });
            return;
          }

          let verificationResults: VerificationResult[] = [];
          const goalNotes: string[] = [];
          if (settings.holdGoal && intentDecision.needsWriteAccess && changedFiles.size > 0 && outcome.kind === "text") {
            if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "verifying", model: executorModel, model_role: "verifier" });
            updateJob(jobId, { phase: "verifying", model: executorModel, role: "verifier" });
            let previousKey = "";
            let usedVisualRetry = false;
            const maxAttempts = 3;
            for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
              if (stopThisRun()) throw new Error("Job cancelled by user.");
              const packagePath = path.join(toolCwd, "package.json");
              let scripts: Record<string, string> = {};
              if (fs.existsSync(packagePath)) {
                try { scripts = JSON.parse(fs.readFileSync(packagePath, "utf-8")).scripts ?? {}; } catch { scripts = {}; }
              }
              const files = [...changedFiles];
              const failures: string[] = [];
              for (const command of commandsForGoal(scripts, files)) {
                send("status", { text: `The goal is still running. ${command}` });
                send("verification", { command, status: "running" });
                let ok = false;
                let output = "";
                const run = await runCommandBounded(command, { cwd: toolCwd, idleMs: 30_000, totalMs: 120_000, maxBytes: 1024 * 1024 });
                output = run.output.slice(-4000);
                ok = run.stopped === "" && run.code === 0;
                send("verification", { command, status: ok ? "passed" : "failed", output });
                verificationResults.push({ command, ok, output });
                if (commandFailed(command, ok, output, files)) failures.push(`${command} failed:\n${output.slice(0, 1200)}`);
              }
              if (failures.length === 0 && settings.lookAfterUiEdit && shouldLook(userMessage.content, files)) {
                send("status", { text: "The goal is still running. Opening the app and looking at it." });
                const look = await lookAtRunningApp(3000);
                let lookDetail = look.detail;
                if (look.screenshotPath && fs.existsSync(look.screenshotPath)) {
                  const freeForLook = Math.round(os.freemem() / 1024 / 1024);
                  const visionModel = pickVisionModel(executorModel, allModels, freeForLook);
                  if (visionModel && freeForLook >= estimateModelMb(visionModel)) {
                    visionModelName = visionModel;
                    markAttempt(visionModel, "vision");
                    send("status", { text: `${visionModel} is looking at the app. The goal stays open.` });
                    const description = await describeVideoFrames(
                      ollamaBase,
                      visionModel,
                      [look.screenshotPath],
                      userMessage.content,
                      "This image is the desktop after the local app was opened. Describe what is visible.",
                      stopThisRun
                    );
                    lookDetail = `${look.detail}\n\nVision:\n${description}`;
                    if (!description.startsWith("The vision model could not")) visionWorked = true;
                  } else if (visionModel) {
                    lookDetail = `${look.detail}\n\n${visionModel} needs about ${estimateModelMb(visionModel)} MB free and this PC has ${freeForLook} MB, so the picture was not described.`;
                  }
                }
                if (/not answering/i.test(look.detail)) failures.push(lookDetail);
                else if (/Vision:\n/.test(lookDetail) && !usedVisualRetry) {
                  usedVisualRetry = true;
                  failures.push(`Here is what the screen shows. Fix the page if it does not match the request. If it matches, leave the files and say the goal is complete.\n${lookDetail}`);
                } else {
                  goalNotes.push(`The app was opened.\n${lookDetail}`);
                }
              }
              const step = nextGoalStep({ attempt, maxAttempts, failureKey: failureKey(failures), previousKey });
              if (step === "done") {
                if (!goalNotes.length) {
                  goalNotes.push(commandsForGoal(scripts, files).length || shouldLook(userMessage.content, files)
                    ? "Check passed. The goal for this run is complete."
                    : "The files are written. This project has no test script for these files, so the goal is complete.");
                }
                break;
              }
              const note = step === "blocked"
                ? `The same check is still failing, so this run is blocked.\n${failures.join("\n\n").slice(0, 2000)}\nSay continue when you want this goal picked up again.`
                : `The check failed. The same goal continues.\n${failures.join("\n\n").slice(0, 2000)}`;
              goalNotes.push(note);
              if (step === "blocked") break;
              previousKey = failureKey(failures);
              send("status", { text: "The check failed. The same goal continues, and the coder is fixing it." });
              try {
                outcome = await runOnce(executorModel, note);
              } catch (error: unknown) {
                if (isUserCancel(error)) throw error;
                goalNotes.push(error instanceof Error ? error.message : String(error));
                break;
              }
              if (outcome.kind === "web_ask") break;
              if (outcome.kind === "text" && outcome.text.trim()) finalText = outcome.text.trim();
            }
            if (session_id && getSession(session_id)) {
              const currentState = getAgentState(session_id);
              updateAgentState(session_id, {
                tests_run: [
                  ...currentState.tests_run,
                  ...verificationResults.map((result) => ({ command: result.command, result: result.output, created_at: Math.floor(Date.now() / 1000) })),
                ],
                decisions: [...currentState.decisions, ...goalNotes].slice(-50),
              });
            }
          } else if (withTools && changedFiles.size > 0) {
            if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "verifying", model: executorModel, model_role: "verifier" });
            updateJob(jobId, { phase: "verifying", model: executorModel, role: "verifier" });
            verificationResults = await runWorkspaceVerification(toolCwd, send);
            if (session_id && getSession(session_id)) {
              const currentState = getAgentState(session_id);
              updateAgentState(session_id, {
                tests_run: [
                  ...currentState.tests_run,
                  ...verificationResults.map((result) => ({ command: result.command, result: result.output, created_at: Math.floor(Date.now() / 1000) })),
                ],
                decisions: [...currentState.decisions, ...executionNotes].slice(-50),
              });
            }
          }

          if (plannerModelUsed && finalText) {
            if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "reviewing", model: plannerModelUsed, model_role: useBrain ? "brain" : "reviewer" });
            updateJob(jobId, { phase: "reviewing", model: plannerModelUsed, role: useBrain ? "brain" : "reviewer" });
            if (useBrain) send("status", { text: `${plannerModelUsed} is checking the work and writing your reply.` });
            markAttempt(plannerModelUsed, useBrain ? "brain" : "reviewer");
            let reviewResult: ChatResult | null = null;
            try {
              reviewResult = await chatWithSingleLoadedModel(ollamaBase, plannerModelUsed, {
                model: plannerModelUsed,
                messages: [
                  {
                    role: "system",
                    content: useBrain
                      ? "You are the voice the user hears. Do not edit files or run commands. Explain what the coder did, what is still missing, and the result. If no file changed, say that plainly."
                      : "Review the completed coding task. Do not edit files or run commands. Return concise review notes: what is complete, risks or warnings, and whether verification passed.",
                  },
                  {
                    role: "user",
                    content: `Request: ${userMessage.content}\n\nExecutor response:\n${finalText.slice(0, 6000)}\n\nChanged files:\n${[...changedFiles].join("\n") || "none"}\n\nVerification:\n${verificationResults.map((result) => `${result.command}: ${result.ok ? "passed" : "failed"}`).join("\n") || "not run"}\n\nExecutor warnings:\n${executionNotes.join("\n") || "none"}`,
                  },
                ],
                stream: false,
                keep_alive: 0,
              }, undefined, undefined, stopThisRun);
            } catch (error: unknown) {
              if (isUserCancel(error)) throw error;
              const message = error instanceof Error ? error.message : String(error);
              const reason = fallbackReason(plannerModelUsed, /timeout/i.test(message) ? "timeout" : "planner");
              const choices = fallbackChoices(allModels, plannerModelUsed);
              send("fallback", { reason, failedModel: plannerModelUsed, choices });
              send("status", { text: `${plannerModelUsed} did not finish the review. Choose Retry or another model. The work already done is kept.` });
              finalText = `${finalText}\n\n${reason}${encodeModelChoice({ failedModel: plannerModelUsed, choices })}`;
            }
            if (reviewResult?.ok) {
              const reviewText = reviewResult.data?.message?.content?.trim() ?? "";
              if (reviewText && useBrain) {
                finalText = reviewText;
              } else if (reviewText) {
                const reviewerModels: AnswerModel[] = [{ name: plannerModelUsed, role: "reviewer" }];
                send("review", { content: reviewText, models: reviewerModels });
                if (session_id && getSession(session_id)) {
                  addMessage(randomUUID(), session_id, "assistant", `Reviewer notes:\n${reviewText}`, "agent", reviewerModels);
                  const currentState = getAgentState(session_id);
                  updateAgentState(session_id, { decisions: [...currentState.decisions, reviewText].slice(-50) });
                }
              }
            }
          }

          if (outcome.kind === "web_ask") {
            await emitText(`The goal is waiting on one web page.${encodeWebAsk(outcome.url)}`, [{ name: executorModel, role: executorRole }]);
            updateJob(jobId, { status: "completed", phase: "complete", model: executorModel, role: "web" });
            return;
          }
          if (goalNotes.length) finalText = `${finalText}\n\n${goalNotes[goalNotes.length - 1]}`.trim();

          if (session_id && getSession(session_id)) updateAgentState(session_id, { phase: "complete", model: executorModel, model_role: withTools ? "executor" : "responder" });
          updateJob(jobId, { status: "completed", phase: "complete", model: executorModel, role: withTools ? "executor" : "responder" });

          const fileAnswer = facts ? renderProjectFacts(facts) : "";
          const fromFiles = Boolean(fileAnswer && (finalText === fileAnswer || finalText === `No file was changed.\n\n${fileAnswer}`));
          const answerModels = modelsThatAnswered({
            visionModel: visionModelName,
            visionWorked,
            plannerModel: plannerModelUsed ?? undefined,
            plannerRole: useBrain ? "brain" : "planner",
            plannerWorked,
            executorModel,
            executorRole,
            executorWorked: !fromFiles && Boolean(finalText),
            fromFiles,
          });

          if (finalText) {
            send("delta", { text: finalText });
            if (session_id && getSession(session_id)) {
              const lastUserMsg = messages[messages.length - 1];
              if (lastUserMsg) {
                addMessage(randomUUID(), session_id, "user", lastUserMsg.content, "agent");
              }
              const assistantId = randomUUID();
              addMessage(assistantId, session_id, "assistant", finalText, "agent", answerModels);
              send("done", { fullText: finalText, id: assistantId, models: answerModels });
            } else {
              send("done", { fullText: finalText, models: answerModels });
            }
          } else {
            send("done", { fullText: "", models: answerModels });
          }

        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          const cancelled = msg.toLowerCase().includes("cancel");
          updateJob(jobId, { status: cancelled ? "cancelled" : "failed", phase: "failed", error: msg });
          console.error("[agent]", msg);
          if (cancelled) {
            send("error", { message: msg, models: errorModels() });
          } else {
            const choices = fallbackChoices(allModels, model);
            const reason = plainFailureReason(model, msg);
            send("fallback", { reason, failedModel: model, choices });
            send("status", { text: "The model server had a problem. Choose Retry or another model. Your message was not dropped." });
            const reply = `${reason}${encodeModelChoice({ failedModel: model, choices })}`;
            send("delta", { text: reply });
            send("done", { fullText: reply, models: errorModels() });
          }
        } finally {
          try { controller.close(); } catch { /* the stream is already closed */ }
        }
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
