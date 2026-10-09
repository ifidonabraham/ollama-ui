import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import os from "os";
import path from "path";
import { knownExePaths, matchConnection } from "./appConnections";
import { blenderPython, type BlenderShape } from "./blenderScene";
import zlib from "zlib";

const execFileAsync = promisify(execFile);

export function frameIntervalSeconds(requested: unknown, fallback = 1): number {
  const value = typeof requested === "number" ? requested : Number.parseFloat(String(requested ?? ""));
  if (!Number.isFinite(value)) return fallback;
  return Math.min(10, Math.max(0.5, value));
}

export function videoIntervalFromText(text: string): number {
  const match = text.match(/every\s+(\d+(?:\.\d+)?)\s*(?:s|sec|secs|second|seconds)\b/i);
  return frameIntervalSeconds(match?.[1], 1);
}

export function videoPathFromText(text: string): string | null {
  const labeled = text.match(/Video:\s*([^\r\n]+?\.(?:mp4|webm|mov|mkv))/i);
  const bare = text.match(/(?:[A-Za-z]:\\|\\\\|\.{1,2}[\\/])[^\r\n"<>|]+?\.(?:mp4|webm|mov|mkv)/i);
  const match = labeled?.[1] ?? bare?.[0];
  if (!match) return null;
  return match.trim().replace(/^["']|["']$/g, "");
}

function decodePdfLiteral(inner: string): string {
  return inner
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\([()\\])/g, "$1")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ")
    .trim();
}

function textFromPdfChunk(raw: string): string {
  const pieces: string[] = [];
  const literals = /\((?:\\\)|\\.|[^)]){1,}\)/g;
  for (const match of raw.match(/\((?:\\\)|\\.|[^)]){1,}\)\s*Tj/g) ?? []) {
    const text = decodePdfLiteral(match.slice(1, match.lastIndexOf(")")));
    if (text) pieces.push(text);
  }
  for (const match of raw.match(/\[([\s\S]*?)\]\s*TJ/g) ?? []) {
    const words: string[] = [];
    for (const part of match.match(literals) ?? []) {
      const text = decodePdfLiteral(part.slice(1, -1));
      if (text) words.push(text);
    }
    if (words.length) pieces.push(words.join(" "));
  }
  return pieces.join(" ");
}

/** Pull readable text from a PDF buffer. Compressed text streams are inflated first. Scanned pages return little or nothing. */
export function extractPdfText(buffer: Buffer): string {
  const raw = buffer.toString("latin1");
  const parts = [textFromPdfChunk(raw)];
  for (const match of raw.match(/stream\r?\n([\s\S]*?)endstream/g) ?? []) {
    const body = match.replace(/^stream\r?\n/, "").replace(/endstream$/, "").replace(/[\r\n]+$/, "");
    const data = Buffer.from(body, "latin1");
    if (!data.length || data.length > 2_000_000) continue;
    for (const inflate of [zlib.inflateSync, zlib.inflateRawSync] as const) {
      try {
        parts.push(textFromPdfChunk(inflate(data).toString("latin1")));
        break;
      } catch { /* this stream is not Flate-compressed */ }
    }
  }
  return parts.filter(Boolean).join(" ").replace(/[ \t]{2,}/g, " ").trim();
}

export function extractDocxXml(xml: string): string {
  return xml
    .replace(/<w:p[^>]*>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Slide text lives in a:t nodes. Tags are removed on the server, before a model sees the file. */
export function extractPptxXml(xml: string): string {
  return extractDocxXml(xml.replace(/<\/a:p>/g, "\n"));
}

export function parseAppRequest(name: string): { ok: true; target: string } | { ok: false; reason: string } {
  const target = name.trim().replace(/^["']|["']$/g, "");
  if (!target) return { ok: false, reason: "No application was named." };
  if (/[;&|<>`$]/.test(target)) return { ok: false, reason: "The application name cannot include a shell command." };
  if (/shutdown|format|Remove-Item|Restart-Computer/i.test(target)) return { ok: false, reason: "That action is blocked." };
  return { ok: true, target };
}

function firstExisting(candidates: string[]): string | null {
  return candidates.find((candidate) => candidate && fs.existsSync(candidate)) ?? null;
}

function blenderExe(): string | null {
  const root = "C:\\Program Files\\Blender Foundation";
  if (!fs.existsSync(root)) return null;
  const direct = path.join(root, "blender.exe");
  if (fs.existsSync(direct)) return direct;
  const versions = fs.readdirSync(root)
    .filter((entry) => entry.toLowerCase().startsWith("blender"))
    .sort()
    .reverse();
  for (const version of versions) {
    const exe = path.join(root, version, "blender.exe");
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

/** Resolve a known install folder. This checks a few fixed locations, not the whole disk. */
export function resolveInstalledApp(name: string): string {
  const target = name.trim().replace(/^["']|["']$/g, "");
  if (/[\\/]/.test(target)) return target;
  const key = target.toLowerCase().replace(/\.exe$/i, "");
  const local = process.env.LOCALAPPDATA ?? "";
  const known: Record<string, string[]> = {
    blender: [],
    code: [path.join(local, "Programs", "Microsoft VS Code", "Code.exe")],
    vscode: [path.join(local, "Programs", "Microsoft VS Code", "Code.exe")],
    chrome: [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    ],
    msedge: [
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    ],
    edge: [
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    ],
  };
  if (key === "blender") return blenderExe() ?? target;
  const connected = matchConnection(target);
  if (connected && connected.id !== "blender") return firstExisting(knownExePaths(connected.id)) ?? target;
  return firstExisting(known[key] ?? []) ?? target;
}

/** Blender itself builds the mesh. Fonia does not click inside the Blender window. */
export async function runBlenderScene(shape: BlenderShape, directory: string): Promise<string> {
  const exe = blenderExe();
  if (!exe) return "Blender is not installed in C:\\Program Files\\Blender Foundation, so nothing was created.";
  fs.mkdirSync(directory, { recursive: true });
  let filePath = path.join(directory, `${shape}.blend`);
  for (let n = 2; fs.existsSync(filePath) && n < 50; n += 1) filePath = path.join(directory, `${shape}-${n}.blend`);
  const scriptPath = path.join(os.tmpdir(), `fonia-blender-${Date.now()}.py`);
  fs.writeFileSync(scriptPath, blenderPython(shape, filePath), "utf8");
  try {
    await execFileAsync(exe, ["--background", "--python", scriptPath], { timeout: 120_000, windowsHide: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return `Blender did not finish the ${shape}. ${message}`;
  } finally {
    fs.rmSync(scriptPath, { force: true });
  }
  if (!fs.existsSync(filePath)) return `Blender ran and did not write ${filePath}.`;
  return `Blender built a ${shape} with bpy and saved ${filePath}.`;
}

async function readZipEntries(filePath: string, entryMatch: string): Promise<string> {
  const safe = filePath.replace(/'/g, "''");
  const command = [
    "Add-Type -AssemblyName System.IO.Compression.FileSystem",
    `$zip=[System.IO.Compression.ZipFile]::OpenRead('${safe}')`,
    `$entries=$zip.Entries | Where-Object { $_.FullName -like '${entryMatch}' } | Sort-Object FullName`,
    "$parts=New-Object System.Collections.Generic.List[string]",
    "foreach ($entry in $entries) {",
    "  $reader=New-Object System.IO.StreamReader($entry.Open())",
    "  $parts.Add($reader.ReadToEnd())",
    "  $reader.Close()",
    "}",
    "$zip.Dispose()",
    "$parts -join [char]10",
  ].join("; ");
  const { stdout } = await execFileAsync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", command], { maxBuffer: 2_000_000 });
  return stdout || "";
}

export async function readDocxFile(filePath: string): Promise<string> {
  return extractDocxXml(await readZipEntries(filePath, "word/document.xml"));
}

export async function readPptxFile(filePath: string): Promise<string> {
  return extractPptxXml(await readZipEntries(filePath, "ppt/slides/slide*.xml"));
}

export function readDocumentFile(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (!fs.existsSync(filePath)) return `Error: File not found: ${filePath}`;
  if (lower.endsWith(".pdf")) {
    const text = extractPdfText(fs.readFileSync(filePath));
    return text;
  }
  if (lower.endsWith(".docx") || lower.endsWith(".pptx")) return "";
  return fs.readFileSync(filePath, "utf-8").slice(0, 20_000);
}
