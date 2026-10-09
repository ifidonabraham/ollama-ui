import { personIsSteppingAway, machineRestCommand } from "./awayIntent";
import { parseBlenderScene } from "./blenderScene";
import { classifyIntent, type IntentDecision } from "./intent";

export const INTENT_MODES = ["overnight", "sleep", "code", "explain", "computer", "chat", "vision", "blender", "custom"] as const;
export type IntentMode = (typeof INTENT_MODES)[number];

export interface IntentOption {
  id: IntentMode;
  label: string;
  detail: string;
}

export interface Clarification {
  question: string;
  options: IntentOption[];
}

export interface ModeProposal {
  mode: Exclude<IntentMode, "custom">;
  ask: boolean;
  question: string;
  options: IntentMode[];
}

const CHOICES: Record<IntentMode, IntentOption> = {
  overnight: {
    id: "overnight",
    label: "Work overnight",
    detail: "Keep this project going. Extra heavy apps can close. The browser, editor, Fonia, and Ollama stay.",
  },
  sleep: {
    id: "sleep",
    label: "Suspend the computer",
    detail: "Put this PC to sleep.",
  },
  code: {
    id: "code",
    label: "Edit the project",
    detail: "Change files and keep the goal until the check passes.",
  },
  explain: {
    id: "explain",
    label: "Explain it",
    detail: "Read the project and answer. Do not change files.",
  },
  computer: {
    id: "computer",
    label: "Check this computer",
    detail: "Read a status, or change a setting you named.",
  },
  chat: {
    id: "chat",
    label: "Just talk",
    detail: "Answer in the chat. Do not touch files or the PC.",
  },
  vision: {
    id: "vision",
    label: "Look at a picture",
    detail: "Use a vision model. Attach the picture if it is not here.",
  },
  blender: {
    id: "blender",
    label: "Build it in Blender",
    detail: "Blender runs a bpy script and saves a .blend file. Fonia does not click inside the Blender window.",
  },
  custom: {
    id: "custom",
    label: "I will type what I mean",
    detail: "Nothing runs.",
  },
};

function asMode(value: unknown): IntentMode | null {
  const text = String(value ?? "").trim().toLowerCase();
  return (INTENT_MODES as readonly string[]).includes(text) ? text as IntentMode : null;
}

export function understandInstruction(): string {
  return [
    "Match the person's sentence to the system action they mean.",
    "Reply with one JSON object and no other text.",
    "mode is overnight, sleep, code, explain, computer, chat, vision, or blender.",
    "overnight means the person is leaving and the project should continue.",
    "sleep means suspend this computer.",
    "blender means build a 3D object in Blender. A website section that is 3D is code, using three.js, not blender.",
    "ask is also true when the sentence could be a Blender file or a three.js section.",
    "ask is true when two modes fit, or the mode is overnight or sleep.",
    "question is one short question. options lists the close modes.",
    "Do not invent a shell command.",
  ].join(" ");
}

export function parseModeProposal(text: string): ModeProposal | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const parsed = JSON.parse(text.slice(start, end + 1)) as {
      mode?: unknown;
      ask?: unknown;
      question?: unknown;
      options?: unknown;
    };
    const mode = asMode(parsed.mode);
    if (!mode || mode === "custom") return null;
    const options = Array.isArray(parsed.options)
      ? parsed.options.map(asMode).filter((item): item is IntentMode => Boolean(item))
      : [];
    return {
      mode,
      ask: Boolean(parsed.ask),
      question: typeof parsed.question === "string" ? parsed.question.slice(0, 240) : "",
      options,
    };
  } catch {
    return null;
  }
}

function defaultQuestion(mode: string): string {
  if (mode === "overnight" || mode === "sleep") return "You sound like you are leaving. What should happen on this computer?";
  if (mode === "code") return "Do you want me to edit the project?";
  if (mode === "explain") return "Do you want me to explain the project?";
  if (mode === "computer") return "Do you want me to check this computer?";
  if (mode === "vision") return "Do you want me to look at a picture?";
  if (mode === "blender") return "Do you want Blender to build this object?";
  return "Which of these matches what you mean?";
}

function unique(ids: string[]): IntentMode[] {
  const seen = new Set<string>();
  const out: IntentMode[] = [];
  for (const id of ids) {
    const mode = asMode(id);
    if (!mode || seen.has(mode)) continue;
    seen.add(mode);
    out.push(mode);
  }
  return out;
}

function optionsFor(ids: string[]): IntentOption[] {
  return unique(ids).map((id) => CHOICES[id]);
}

/**
 * A click is required before a consequential or unsure match.
 * An explicit machine command such as "go to sleep" is not a question.
 */
export function buildClarification(text: string, proposal: ModeProposal | null, askBefore: boolean): Clarification | null {
  if (!askBefore || machineRestCommand(text)) return null;
  if (personIsSteppingAway(text) && !proposal) {
    const ids = ["overnight", "sleep"];
    if (/\b(header|bug|fix|edit|build|implement)\b/i.test(text)) ids.push("code");
    ids.push("chat", "custom");
    return { question: defaultQuestion("overnight"), options: optionsFor(ids) };
  }
  if (!proposal) return null;
  const consequential = proposal.mode === "overnight" || proposal.mode === "sleep";
  if (!proposal.ask && !consequential) return null;
  const ids = [proposal.mode, ...proposal.options, "custom"];
  if (proposal.mode === "overnight") ids.push("sleep", "chat");
  if (proposal.mode === "sleep") ids.push("overnight", "chat");
  return {
    question: proposal.question || defaultQuestion(proposal.mode),
    options: optionsFor(ids),
  };
}

/** Muddy sentences go to the small model. Clear ones keep the fast path. */
export function needsUnderstanding(text: string): boolean {
  if (!text.trim() || machineRestCommand(text) || personIsSteppingAway(text) || parseBlenderScene(text)) return false;
  const decision = classifyIntent(text, false);
  if (decision.intent === "casual" || decision.intent === "image") return false;
  if (decision.intent === "code" && /\b(fix|edit|create|add|change|update|bug|implement|write)\b/i.test(text)) return false;
  if (decision.intent === "explain" && /\b(what|explain|how|why|describe|project)\b/i.test(text)) return false;
  return true;
}

export function intentForMode(mode: string): IntentDecision | null {
  if (mode === "overnight" || mode === "code") return { intent: "code", needsTools: true, needsWriteAccess: true };
  if (mode === "explain") return { intent: "explain", needsTools: true, needsWriteAccess: false };
  if (mode === "computer") return { intent: "code", needsTools: true, needsWriteAccess: false };
  if (mode === "chat") return { intent: "casual", needsTools: false, needsWriteAccess: false };
  if (mode === "vision") return { intent: "image", needsTools: true, needsWriteAccess: false };
  return null;
}
