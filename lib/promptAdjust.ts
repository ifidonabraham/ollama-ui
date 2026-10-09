/** The 1.5B may label a message. It does not rewrite the message into a command. */

export const ADJUSTER_KINDS = ["chat", "project", "computer", "code", "vision"] as const;
export type AdjusterKind = (typeof ADJUSTER_KINDS)[number];

export function adjusterInstruction(): string {
  return [
    "Label the user message with one word and no other text.",
    "chat = a question about this conversation.",
    "project = what the open folder or project is.",
    "computer = a PC status or a Windows setting.",
    "code = create, edit, or fix files.",
    "vision = the user is asking about a picture.",
  ].join(" ");
}

export function parseAdjusterKind(text: string): AdjusterKind | null {
  const match = text.trim().toLowerCase().match(/\b(chat|project|computer|code|vision)\b/);
  const kind = match?.[1];
  if (kind === "chat" || kind === "project" || kind === "computer" || kind === "code" || kind === "vision") return kind;
  return null;
}
