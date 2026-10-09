import fs from "fs";
import path from "path";
import { textForModel } from "./secretRedact";

const SKIP = new Set(["node_modules", ".git", ".next", "dist", "build"]);
const OLD_OLLAMA_UI = path.normalize("C:\\Users\\PC\\ollama-ui").toLowerCase();

export interface WorkspaceResolution {
  path: string;
  missing: boolean;
  redirectedFrom?: string;
}

export interface ProjectFacts {
  workspace: string;
  requested: string;
  redirectedFrom?: string;
  entries: string[];
  filesRead: string[];
  packageSummary: string;
  readmeExcerpt: string;
  evidenceText: string;
}

export interface ToolLogItem {
  tool: string;
  summary: string;
}

export function pathMentioned(content: string): string | undefined {
  const match = content.match(/[A-Za-z]:\\(?:[^\\\r\n"]+\\)*[^\\\r\n"]*/);
  return match?.[0].replace(/[.,;:]+$/, "");
}

export function questionNeedsProjectFacts(content: string): boolean {
  return /\b(project|folder|directory|codebase|code base|package\.json|repository|repo|platform)\b/i.test(content)
    || (/\b(scan|brief|inspect)\b/i.test(content) && /\b(folder|directory|project|code|path|[a-zA-Z]:[\\/])\b/i.test(content))
    || (/\bwhat are (?:you|we)\b/i.test(content) && /\b(coding|building|working on|making)\b/i.test(content));
}

/** A named file, such as a video or a PDF, stays a file. The workspace stays a folder. */
export function workspaceForRequest(content: string, workspacePath: string | undefined, appRoot: string): WorkspaceResolution {
  const mentioned = pathMentioned(content);
  if (!mentioned) return resolveWorkspace(workspacePath, appRoot);
  if (fs.existsSync(mentioned)) {
    try {
      if (fs.statSync(mentioned).isFile()) return resolveWorkspace(path.dirname(mentioned), appRoot);
    } catch { /* use the path as given */ }
    return resolveWorkspace(mentioned, appRoot);
  }
  if (path.extname(mentioned)) return resolveWorkspace(workspacePath, appRoot);
  return resolveWorkspace(mentioned, appRoot);
}

export function resolveWorkspace(requested: string | undefined, appRoot: string, oldPath = "C:\\Users\\PC\\ollama-ui"): WorkspaceResolution {
  const app = path.resolve(appRoot);
  const raw = requested?.trim();
  if (!raw) {
    return { path: app, missing: !fs.existsSync(app) };
  }
  const requestedPath = path.resolve(raw);
  if (fs.existsSync(requestedPath)) {
    return { path: requestedPath, missing: false };
  }
  const formerPath = path.normalize(oldPath).toLowerCase();
  const isOldCopy = path.normalize(requestedPath).toLowerCase() === formerPath || path.normalize(requestedPath).toLowerCase() === OLD_OLLAMA_UI;
  if (isOldCopy && fs.existsSync(path.join(app, "package.json"))) {
    return { path: app, missing: false, redirectedFrom: requestedPath };
  }
  return { path: requestedPath, missing: true };
}

export function collectProjectFacts(workspace: string, redirectedFrom?: string): ProjectFacts {
  const entries = fs.existsSync(workspace)
    ? fs.readdirSync(workspace, { withFileTypes: true })
      .filter((entry) => !SKIP.has(entry.name))
      .map((entry) => `${entry.isDirectory() ? "dir" : "file"} ${entry.name}`)
    : [];

  const filesRead = [workspace];
  let packageSummary = "No package.json in this folder.";
  const packagePath = path.join(workspace, "package.json");
  if (fs.existsSync(packagePath)) {
    filesRead.push(packagePath);
    try {
      const pkg = JSON.parse(fs.readFileSync(packagePath, "utf-8")) as {
        name?: string;
        description?: string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
      const deps = Object.keys(pkg.dependencies ?? {});
      const dev = Object.keys(pkg.devDependencies ?? {});
      const scripts = Object.keys(pkg.scripts ?? {});
      packageSummary = [
        `name: ${pkg.name ?? "(none)"}`,
        pkg.description ? `description: ${pkg.description}` : "",
        `scripts: ${scripts.join(", ") || "(none)"}`,
        `dependencies: ${deps.join(", ") || "(none)"}`,
        `devDependencies: ${dev.join(", ") || "(none)"}`,
      ].filter(Boolean).join("\n");
    } catch {
      packageSummary = "package.json could not be parsed.";
    }
  }

  let readmeExcerpt = "";
  const readmePath = path.join(workspace, "README.md");
  if (fs.existsSync(readmePath)) {
    filesRead.push(readmePath);
    readmeExcerpt = fs.readFileSync(readmePath, "utf-8").slice(0, 2500);
  }

  const evidenceText = [
    `workspace: ${workspace}`,
    redirectedFrom ? `requested missing path: ${redirectedFrom}` : "",
    `entries: ${entries.join(", ")}`,
    packageSummary,
    readmeExcerpt,
  ].filter(Boolean).join("\n");

  return {
    workspace,
    requested: redirectedFrom ?? workspace,
    redirectedFrom,
    entries,
    filesRead,
    packageSummary,
    readmeExcerpt,
    evidenceText,
  };
}

export function renderProjectFacts(facts: ProjectFacts): string {
  const where = facts.redirectedFrom
    ? `The path ${facts.redirectedFrom} does not exist. The project on disk is ${facts.workspace}.`
    : `Workspace: ${facts.workspace}`;
  return [
    where,
    `Files read: ${facts.filesRead.join(", ")}`,
    `Top level:\n${facts.entries.join("\n") || "(empty)"}`,
    facts.packageSummary,
    facts.readmeExcerpt ? `README excerpt:\n${facts.readmeExcerpt.slice(0, 700)}` : "",
  ].filter(Boolean).join("\n\n");
}

const UNGROUNDED_CLAIMS = [
  "rollup",
  "webpack",
  "vite",
  "jest",
  "axios",
  "lodash",
  "node-sass",
  "@ollama/core",
  "@ollama/server",
  "mit license",
  "apache license",
  "vue",
  "angular",
  "express",
];

export function isUngroundedRefusal(text: string): boolean {
  return /do not have access|cannot physically|as an ai language model|please provide(?: me)? with the command|i cannot (?:physically |actually )?(?:search|scan|read|access)/i.test(text);
}

export function stripUngroundedSentences(answer: string, evidence: string): string {
  const evidenceLower = evidence.toLowerCase();
  const sentences = answer.split(/(?<=[.!?])\s+|\n+/);
  const kept = sentences.filter((sentence) => {
    const lower = sentence.toLowerCase();
    if (isUngroundedRefusal(sentence)) return false;
    return !UNGROUNDED_CLAIMS.some((claim) => lower.includes(claim) && !evidenceLower.includes(claim));
  });
  return kept.join(" ").trim();
}

function writtenPath(summary: string): string | null {
  const match = summary.match(/(?:Written|Patched|Deleted): ([^\n]+)/);
  return match ? match[1].trim() : null;
}

export function describeFileAt(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    return `A change was recorded for ${filePath}, but that file is not on disk now.`;
  }
  const ext = path.extname(filePath);
  const kind = ext ? `a ${ext} file` : "a file with no extension";
  let text = false;
  try {
    const sample = fs.readFileSync(filePath);
    text = !sample.subarray(0, 512).includes(0);
  } catch {
    text = false;
  }
  return `The file is ${filePath}. It is ${kind}${text ? ", and the bytes are text" : ""}.`;
}

const REPORT_TOPICS: { ask: RegExp; line: RegExp; name: string }[] = [
  { ask: /\bbatter/, line: /battery/i, name: "battery" },
  { ask: /\bclipboard|copied|paste\b/i, line: /clipboard/i, name: "clipboard" },
  { ask: /\b(disk|storage)\b/i, line: /disk|storage|volume/i, name: "disk" },
  { ask: /\b(memory|ram)\b/i, line: /memory|ram/i, name: "memory" },
  { ask: /\b(cpu|processor)\b/i, line: /cpu|processor/i, name: "cpu" },
  { ask: /\b(wifi|wi-fi|network)\b/i, line: /wi-?fi|network/i, name: "network" },
  { ask: /\bfirewall\b/i, line: /firewall/i, name: "firewall" },
  { ask: /\bbluetooth\b/i, line: /bluetooth/i, name: "bluetooth" },
  { ask: /\b(brightness|theme|volume|camera|printer|display|gpu|power)\b/i, line: /brightness|theme|volume|camera|printer|display|gpu|power/i, name: "pc" },
];

/** The last computer reports in this session, short enough to put in a prompt. */
export function sessionReportNote(tools: ToolLogItem[], online = false): string {
  const reports = tools.filter((item) => item.tool === "computer_action").slice(-6);
  if (!reports.length) return "";
  const lines = reports.map((item, index) => {
    const text = textForModel(item.summary, online);
    return `${index + 1}. ${text.slice(0, 500)}`;
  });
  return `Computer reports already taken in this session:\n${lines.join("\n").slice(0, 2400)}`;
}

/** Repeat a stored computer report. A fresh "check the battery" is not this. */
export function answerFromSessionReport(content: string, tools: ToolLogItem[]): string | null {
  const aboutPast = /\b(last|previous|earlier)\b|\bwhat was\b|\bwhat were\b|\byou reported\b|\bthat report\b|\bthe report\b|\bin this session\b|\bcomputer report\b/i.test(content);
  if (!aboutPast) return null;
  const reports = tools.filter((item) => item.tool === "computer_action");
  const topic = REPORT_TOPICS.find((item) => item.ask.test(content));
  const matches = topic ? reports.filter((item) => topic.line.test(item.summary)) : reports;
  if (!matches.length) {
    return topic
      ? `This session has no ${topic.name} report yet.`
      : "This session has no computer report yet.";
  }
  return `From this session, with no new model call:\n${matches[matches.length - 1].summary.slice(0, 1200)}`;
}

/** Answer create/scan follow-ups from the session tool log. Returns null when this message is not that kind of follow-up. */
export function answerFromPriorAction(content: string, tools: ToolLogItem[]): string | null {
  const asksType = /\bwhat type of file\b/i.test(content);
  const asksScan = /\bscan|read|inspected\b/i.test(content) && !asksType;
  const asksCreate = /\bcreate|created|creat\b/i.test(content) || asksType;
  if (!asksType && !asksScan && !asksCreate) return null;

  const writes = tools.filter((item) =>
    (item.tool === "write_file" || item.tool === "patch_file") && !item.summary.startsWith("Error:")
  );
  const scans = tools.filter((item) =>
    item.tool === "list_dir" || item.tool === "read_file" || item.tool === "search_in_files"
  );

  if (asksScan && !asksCreate) {
    if (scans.length === 0) return "I have not scanned a folder in this session.";
    const last = scans[scans.length - 1];
    return `I did read the workspace in this session. Last result from ${last.tool}:\n${last.summary.slice(0, 800)}`;
  }

  if (writes.length === 0) return "I have not created a file in this session.";
  const last = writes[writes.length - 1];
  const filePath = writtenPath(last.summary);
  if (asksType && filePath) return describeFileAt(filePath);
  if (filePath && fs.existsSync(filePath)) return `Yes. The file is on disk: ${filePath}`;
  if (filePath) return `A write was recorded for ${filePath}, but that file is not on disk now.`;
  return `The last file change in this session was:\n${last.summary.slice(0, 500)}`;
}
