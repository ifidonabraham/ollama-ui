import { NextRequest, NextResponse } from "next/server";
import { runCommandBounded } from "@/lib/commandRun";

// Commands that are too dangerous to allow
const BLOCKED_PATTERNS = [
  /rm\s+-rf\s+\//i,
  /format\s+[a-z]:/i,
  /del\s+\/[sqa]/i,
  /Remove-Item.*-Recurse.*-Force.*[Cc]:/i,
  /dd\s+if=/i,
];

function isBlocked(cmd: string): boolean {
  return BLOCKED_PATTERNS.some((p) => p.test(cmd));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { command, cwd } = body as { command: string; cwd?: string };

    if (!command || typeof command !== "string") {
      return NextResponse.json({ error: "command is required" }, { status: 400 });
    }

    if (isBlocked(command)) {
      return NextResponse.json(
        { error: "Command blocked for safety reasons." },
        { status: 403 }
      );
    }

    const workingDir = cwd && cwd.trim() ? cwd.trim() : process.env.HOME ?? "C:\\Users\\PC";
    const run = await runCommandBounded(command, {
      cwd: workingDir,
      idleMs: 15_000,
      totalMs: 15_000,
      maxBytes: 512 * 1024,
    });

    return NextResponse.json({
      stdout: run.output,
      stderr: "",
      cwd: workingDir,
      error: run.stopped !== "" || (run.code !== null && run.code !== 0),
    });
  } catch (err) {
    console.error("[terminal]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
