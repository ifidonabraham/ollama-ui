/** Decide whether a coding goal continues. No files, no network, no model. */

const UI_FILE = /\.(html?|css|scss|tsx|jsx|vue|svelte)$/i;

export function isUiFile(filePath: string): boolean {
  return UI_FILE.test(filePath);
}

export function commandsForGoal(scripts: Record<string, string | undefined>, changedFiles: string[]): string[] {
  if (scripts.test) return ["npm test"];
  if (changedFiles.some(isUiFile)) return [];
  if (scripts.lint) return ["npm run lint"];
  return [];
}

export function shouldLook(content: string, changedFiles: string[]): boolean {
  if (changedFiles.some(isUiFile)) return true;
  return /\b(preview|interface|website|webpage|screenshot)\b|\bhow it looks\b|\blook at\b|\brun the app\b/i.test(content);
}

export function failureTouches(output: string, files: string[]): boolean {
  const lower = output.toLowerCase();
  return files.some((filePath) => {
    const name = filePath.split(/[\\/]/).pop()?.toLowerCase() ?? "";
    return Boolean(name) && lower.includes(name);
  });
}

/** A test failure always continues the goal. A lint failure continues only when it names a file from this goal. */
export function commandFailed(command: string, ok: boolean, output: string, files: string[]): boolean {
  if (ok) return false;
  if (/\blint\b/i.test(command)) return failureTouches(output, files);
  return true;
}

export function failureKey(parts: string[]): string {
  return parts.join("\n").replace(/\s+/g, " ").trim().slice(0, 500);
}

export function nextGoalStep(input: { attempt: number; maxAttempts: number; failureKey: string; previousKey: string }): "done" | "retry" | "blocked" {
  if (!input.failureKey) return "done";
  if (input.previousKey && input.failureKey === input.previousKey) return "blocked";
  if (input.attempt >= input.maxAttempts) return "blocked";
  return "retry";
}
