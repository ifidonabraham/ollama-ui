import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import os from "os";
import path from "path";
import { frameIntervalSeconds } from "./mediaTasks";

const execFileAsync = promisify(execFile);

function ffmpegInTree(dir: string, depth: number): string | null {
  const candidates = [path.join(dir, "bin", "ffmpeg.exe"), path.join(dir, "ffmpeg.exe")];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  if (depth <= 0) return null;
  let entries: fs.Dirent[] = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return null; }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const found = ffmpegInTree(path.join(dir, entry.name), depth - 1);
    if (found) return found;
  }
  return null;
}

/** Locate ffmpeg.exe on PATH or in the user winget folder. Does not scan the whole disk. */
export function findFfmpeg(): string | null {
  const dirs = [
    ...(process.env.PATH ?? "").split(";"),
    path.join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Links"),
    "C:\\ffmpeg\\bin",
    path.join(process.env.ProgramFiles ?? "C:\\Program Files", "ffmpeg", "bin"),
  ];
  for (const dir of dirs) {
    const trimmed = dir.trim();
    if (!trimmed) continue;
    const exe = path.join(trimmed, "ffmpeg.exe");
    if (fs.existsSync(exe)) return exe;
  }
  const packages = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
  if (!fs.existsSync(packages)) return null;
  let names: string[] = [];
  try { names = fs.readdirSync(packages); } catch { return null; }
  for (const name of names) {
    if (!/ffmpeg/i.test(name)) continue;
    const found = ffmpegInTree(path.join(packages, name), 3);
    if (found) return found;
  }
  return null;
}

/** Commands started by the agent can see ffmpeg even when this process has an old PATH. */
export function toolEnv(): NodeJS.ProcessEnv {
  const ffmpeg = findFfmpeg();
  if (!ffmpeg) return process.env;
  const bin = path.dirname(ffmpeg);
  const current = process.env.PATH ?? "";
  const already = current.split(";").some((dir) => dir.trim().toLowerCase() === bin.toLowerCase());
  if (already) return process.env;
  return { ...process.env, PATH: `${bin};${current}` };
}

/** Split a video into a few frames with ffmpeg. No model is involved. */
export async function extractVideoFrames(videoPath: string, intervalSeconds: number): Promise<{ frames: string[]; note: string }> {
  const interval = frameIntervalSeconds(intervalSeconds, 1);
  if (!fs.existsSync(videoPath)) return { frames: [], note: `Error: Video not found: ${videoPath}` };
  const ffmpeg = findFfmpeg();
  if (!ffmpeg) return { frames: [], note: "Error: ffmpeg is not installed, so the video cannot be split into frames yet." };
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ollama-ui-frames-"));
  const pattern = path.join(dir, "frame-%03d.jpg");
  try {
    await execFileAsync(ffmpeg, [
      "-y", "-i", videoPath,
      "-vf", `fps=1/${interval}`,
      "-frames:v", "6",
      pattern,
    ], { timeout: 60_000 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    if (/ENOENT|not recognized|not found/i.test(message)) {
      return { frames: [], note: "Error: ffmpeg is not installed, so the video cannot be split into frames yet." };
    }
    return { frames: [], note: `Error: Could not split the video. ${message.slice(0, 300)}` };
  }
  const frames = fs.readdirSync(dir)
    .filter((name) => name.endsWith(".jpg"))
    .sort()
    .map((name) => path.join(dir, name));
  return {
    frames,
    note: frames.length
      ? `Split ${videoPath} into ${frames.length} frame(s) every ${interval} second(s), without using a model.`
      : "Error: ffmpeg produced no frames.",
  };
}
