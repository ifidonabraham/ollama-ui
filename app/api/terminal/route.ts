import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

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

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: workingDir,
        timeout: 15000, // 15s timeout
        maxBuffer: 1024 * 512, // 512 KB output limit
        shell: "powershell.exe",
      });

      return NextResponse.json({
        stdout: stdout ?? "",
        stderr: stderr ?? "",
        cwd: workingDir,
      });
    } catch (execErr: unknown) {
      const e = execErr as { stdout?: string; stderr?: string; message?: string };
      return NextResponse.json({
        stdout: e.stdout ?? "",
        stderr: e.stderr ?? e.message ?? "Command failed",
        cwd: workingDir,
        error: true,
      });
    }
  } catch (err) {
    console.error("[terminal]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
