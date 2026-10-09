export interface RunningApp {
  name: string;
  pid: number;
  memMB: number;
}

/** Processes the night run still needs, plus Windows itself. */
const KEEP_RUNNING = new Set([
  "system", "idle", "registry", "smss", "csrss", "wininit", "winlogon", "services", "lsass",
  "svchost", "dwm", "explorer", "sihost", "ctfmon", "fontdrvhost", "conhost", "dllhost",
  "runtimebroker", "taskhostw", "searchhost", "startmenuexperiencehost", "shellexperiencehost",
  "textinputhost", "applicationframehost", "securityhealthservice", "securityhealthsystray",
  "msmpeng", "nissrv", "node", "ollama", "llama-server", "powershell", "cmd", "windowsterminal",
  "code", "cursor", "devenv", "chrome", "msedge", "firefox", "brave", "whisper-cli",
  "searchindexer", "lockapp",
]);

const QUESTION = /^(?:how|what|why|when|where|who|is|are|do|does|can|could)\b/i;

/** A command aimed at the machine, such as "put the computer to sleep". */
export function machineRestCommand(text: string): boolean {
  const normalized = text.trim().toLowerCase().replace(/[.!?]+$/g, "");
  return /^(?:please\s+)?(?:sleep|suspend)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(normalized)
    || /\bput\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\s+to\s+sleep\b/.test(normalized)
    || normalized === "go to sleep";
}

/**
 * The person is leaving the computer and the project should continue.
 * A command to suspend the machine is not this.
 */
export function personIsSteppingAway(text: string): boolean {
  const normalized = text.trim().toLowerCase();
  if (!normalized || QUESTION.test(normalized) || machineRestCommand(normalized)) return false;
  const aboutTheMachine = /\b(computer|pc|laptop|machine|windows)\b/.test(normalized)
    && /\b(sleep|suspend|shut|restart|reboot|hibernate)\b/.test(normalized);
  if (aboutTheMachine) return false;
  const aboutMe = /\b(i'm|i am|i will|i'll|im)\b/.test(normalized);
  const awayForAWhile = /\b(bed|asleep|overnight|through the night|tonight|heading out|leaving|be away|be out|be gone|call it a night|turning in|don't wait|do not wait|unattended|in the morning)\b/.test(normalized);
  const personalRest = /\b(?:i'm|i am|i will|i'll|im)\b[\s\S]{0,48}\b(?:sleep|bed|asleep)\b/.test(normalized);
  const unattended = /\b(overnight|through the night|while i(?:'m| am) (?:out|gone|away|asleep)|don't wait for me|do not wait for me|leave (?:this|it) running)\b/.test(normalized);
  return (aboutMe && (awayForAWhile || personalRest)) || unattended;
}

export function awayWorkNote(closed: string): string {
  return [
    "The person is away from this PC. Continue the open project.",
    "Do not suspend, shut down, or restart the computer, and do not close applications yourself.",
    closed,
    "Keep this goal until the check passes, the work is blocked, or the user presses Stop.",
  ].join(" ");
}

/** Large user applications that the night run does not need. At most four. */
export function appsToClose(apps: RunningApp[], selfPid: number): RunningApp[] {
  return apps
    .filter((app) => app.pid !== selfPid && app.pid > 4 && app.memMB >= 180 && !KEEP_RUNNING.has(app.name.toLowerCase()))
    .sort((a, b) => b.memMB - a.memMB)
    .slice(0, 4);
}
