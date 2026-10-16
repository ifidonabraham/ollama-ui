import { estimateModelMb } from "./inferenceBudget";

/** The 7B coder edits. The 14B quant stays out of the automatic pick. */
export function pickHandsModel(models: string[]): string | null {
  const hands = models.filter((name) => /coder|code/i.test(name) && !/1\.5b/i.test(name) && !/14b/i.test(name));
  return hands.find((name) => /7b/i.test(name)) ?? hands[0] ?? null;
}

/** Qwen3 is the brain: it plans the edit and writes the reply. */
export function pickBrainModel(models: string[]): string | null {
  return models.find((name) => name.toLowerCase().startsWith("qwen3")) ?? null;
}

export function codingUsesBrain(intent: string, needsWriteAccess: boolean): boolean {
  return needsWriteAccess && (intent === "code" || intent === "deep");
}

export interface FallbackChoice {
  name: string;
  role: string;
}

export function modelRole(name: string): string {
  const lower = name.toLowerCase();
  if (lower.startsWith("qwen3")) return "brain";
  if (/llava|vision|moondream/i.test(lower)) return "vision";
  if (/1\.5b/i.test(lower)) return "small coder";
  if (/:3b\b/i.test(lower)) return "solver";
  if (/14b/i.test(lower)) return "large coder";
  if (/coder|code/i.test(lower)) return "coder";
  return "general";
}

/**
 * After a model stalls, continue with one that fits and has not already stalled.
 * The 7B coder wins when it fits. Otherwise the closest lighter coder is used.
 * The 14B, vision models, and the 8B planner stay out. The 1.5B does not take a file write.
 */
export function nextModelAfterStall(options: {
  models: string[];
  failed: string[];
  freeMb: number;
  needsWrite: boolean;
}): string | null {
  const skipped = new Set(options.failed.map((name) => name.toLowerCase()));
  const usable = options.models.filter((name) => {
    const lower = name.toLowerCase();
    if (!name || skipped.has(lower)) return false;
    if (/14b|llava|moondream|minicpm|bakllava|cogvlm/i.test(lower)) return false;
    if (/^qwen3/i.test(lower)) return false;
    if (options.needsWrite && /1\.5b/i.test(lower)) return false;
    if (!/coder|code/i.test(lower)) return false;
    return options.freeMb >= estimateModelMb(name);
  });
  const hands = usable.find((name) => /7b/i.test(name));
  if (hands) return hands;
  return [...usable].sort((left, right) => estimateModelMb(right) - estimateModelMb(left))[0] ?? null;
}

/** Every other installed model the user may pick. Nothing is selected for them. */
export function fallbackChoices(models: string[], failedModel: string): FallbackChoice[] {
  return models
    .filter((name) => name && name !== failedModel)
    .map((name) => ({ name, role: modelRole(name) }));
}

export interface ModelChoice {
  failedModel: string;
  choices: FallbackChoice[];
}

const MODEL_CHOICE_MARKER = /<!--model-choice:([\s\S]*?)-->/;

/** Stored on the reply so Retry and the other models survive a reload. */
export function encodeModelChoice(choice: ModelChoice): string {
  return `\n\n<!--model-choice:${JSON.stringify(choice)}-->`;
}

export function decodeModelChoice(content: string): { text: string; choice: ModelChoice | null } {
  const match = content.match(MODEL_CHOICE_MARKER);
  const text = content.replace(MODEL_CHOICE_MARKER, "").trim();
  if (!match) return { text, choice: null };
  try {
    const parsed = JSON.parse(match[1]) as ModelChoice;
    if (!parsed || typeof parsed.failedModel !== "string" || !Array.isArray(parsed.choices)) {
      return { text, choice: null };
    }
    const choices = parsed.choices.filter((item) => item && typeof item.name === "string" && typeof item.role === "string");
    return { text, choice: { failedModel: parsed.failedModel, choices } };
  } catch {
    return { text, choice: null };
  }
}

export function pickVisionModel(requested: string, models: string[], freeMb?: number): string | null {
  const vision = (name: string) => /^(llava|moondream|minicpm-v|bakllava|cogvlm)/i.test(name);
  const found = models.filter(vision);
  if (!found.length) return null;
  const fitting = typeof freeMb === "number" ? found.filter((name) => freeMb >= estimateModelMb(name)) : found;
  const pool = fitting.length ? fitting : found;
  if (vision(requested) && pool.includes(requested)) return requested;
  return pool.find((name) => /^llava/i.test(name)) ?? pool.find((name) => /^moondream/i.test(name)) ?? pool[0];
}

/** The strongest coder that fits. The 14B quant stays a manual choice. */
export function pickStrongCoder(models: string[], freeMb: number): string | null {
  const hands = pickHandsModel(models);
  if (hands && freeMb >= estimateModelMb(hands)) return hands;
  return pickFallbackCoder(models, freeMb, true);
}

/** When the 7B does not fit, the 3B solver is next. A non-write can still use the 1.5B. */
export function pickFallbackCoder(models: string[], freeMb: number, needsWrite: boolean): string | null {
  const mid = models.find((name) => /coder|code/i.test(name) && /:3b\b/i.test(name));
  if (mid && freeMb >= estimateModelMb(mid)) return mid;
  if (needsWrite) return null;
  const small = models.find((name) => /1\.5b/i.test(name));
  if (small && freeMb >= estimateModelMb(small)) return small;
  return null;
}

/** A missing runner is not a missing model. Only a model-not-found error means it is not installed. */
export function describeModelFailure(model: string, message: string): string | null {
  if (/llama-server/i.test(message) && /not found/i.test(message)) {
    return `${model} is installed. Ollama could not start it because llama-server.exe is missing from the Ollama folder. This PC is using the local server.`;
  }
  if (/model ['"][^'"]+['"] not found/i.test(message) || (/\bmodel\b/i.test(message) && /not found/i.test(message) && !/llama-server/i.test(message))) {
    return `${model} is not installed. Retry it after installing it, or choose a different model.`;
  }
  return null;
}

export function fallbackReason(model: string, kind: "timeout" | "tools" | "no_tool" | "planner", waitedSeconds?: number): string {
  if (kind === "timeout") {
    const seconds = waitedSeconds && waitedSeconds > 0 ? waitedSeconds : 120;
    return `${model} did not answer within ${seconds} seconds. The model server was checked before this stop. Retry ${model}, or choose a different model.`;
  }
  if (kind === "tools") {
    return `${model} cannot use tools, so it cannot edit files or run commands. Retry it only for a plain answer, or choose a coder model.`;
  }
  if (kind === "planner") {
    return `${model} did not produce a plan. Retry ${model}, or choose the model that should take the task.`;
  }
  return `${model} answered without using a tool, so no file or command was run. Retry ${model}, or choose a different model.`;
}
