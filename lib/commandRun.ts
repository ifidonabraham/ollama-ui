import { execFileSync, spawn, type ChildProcess } from "child_process";

export interface CommandRunResult {
  output: string;
  stopped: "" | "idle" | "total";
  code: number | null;
}

function duration(ms: number): string {
  const seconds = Math.max(1, Math.round(ms / 1000));
  return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
}

export function silenceNote(idleMs: number): string {
  return `No output for ${duration(idleMs)}, so this was stopped. Try a different command. Do not run this same command again.`;
}

export function totalNote(totalMs: number): string {
  return `Stopped after ${duration(totalMs)}. The command was still running. Try a smaller command.`;
}

function killTree(child: ChildProcess): void {
  const pid = child.pid;
  if (!pid) return;
  try {
    execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], { windowsHide: true, stdio: "ignore" });
  } catch {
    try { child.kill(); } catch { /* already gone */ }
  }
}

/** A test runner's channel makes a child Node process wait instead of running. */
function childEnv(base?: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const env = { ...(base ?? process.env) };
  delete env.NODE_CHANNEL_FD;
  delete env.NODE_TEST_CONTEXT;
  return env;
}

/** Stop a process that prints nothing for idleMs, or that is still running at totalMs. */
export function runProcessBounded(
  file: string,
  args: string[],
  options: { cwd?: string; env?: NodeJS.ProcessEnv; idleMs: number; totalMs: number; maxBytes?: number }
): Promise<CommandRunResult> {
  const idleMs = options.idleMs;
  const totalMs = options.totalMs;
  const maxBytes = options.maxBytes ?? 512 * 1024;
  return new Promise((resolve) => {
    const child = spawn(file, args, {
      cwd: options.cwd,
      env: childEnv(options.env),
      windowsHide: true,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    let settled = false;
    let code: number | null = null;
    const started = Date.now();
    let lastOutput = started;

    function push(chunk: Buffer | string) {
      lastOutput = Date.now();
      output += typeof chunk === "string" ? chunk : chunk.toString("utf8");
      if (output.length > maxBytes) output = output.slice(-maxBytes);
    }
    child.stdout?.on("data", push);
    child.stderr?.on("data", push);

    function textFor(reason: "" | "idle" | "total"): string {
      const trimmed = output.trim();
      if (reason === "idle") return [trimmed, silenceNote(idleMs)].filter(Boolean).join("\n");
      if (reason === "total") return [trimmed, totalNote(totalMs)].filter(Boolean).join("\n");
      if (trimmed) return trimmed;
      return code === 0 || code === null ? "(no output)" : "Command failed";
    }

    function finish(reason: "" | "idle" | "total") {
      if (settled) return;
      settled = true;
      clearInterval(timer);
      if (reason) killTree(child);
      const send = () => resolve({ output: textFor(reason), stopped: reason, code });
      if (!reason || child.exitCode !== null) {
        send();
        return;
      }
      const force = setTimeout(send, 1000);
      child.once("exit", (exitCode) => {
        code = exitCode;
        clearTimeout(force);
        send();
      });
    }

    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastOutput >= idleMs) finish("idle");
      else if (now - started >= totalMs) finish("total");
    }, 100);

    child.on("error", (error) => {
      output += `\n${error.message}`;
      finish("");
    });
    child.on("exit", (exitCode) => {
      code = exitCode;
      setTimeout(() => finish(""), 40);
    });
  });
}

export function runCommandBounded(
  command: string,
  options: { cwd?: string; env?: NodeJS.ProcessEnv; idleMs?: number; totalMs?: number; maxBytes?: number } = {}
): Promise<CommandRunResult> {
  return runProcessBounded(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", command],
    {
      cwd: options.cwd,
      env: options.env,
      idleMs: options.idleMs ?? 30_000,
      totalMs: options.totalMs ?? 180_000,
      maxBytes: options.maxBytes ?? 512 * 1024,
    }
  );
}
