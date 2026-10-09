export interface PromptMessage {
  role: string;
  content: string;
  images?: string[];
}

/** Shrink tool results older than the last `keep` so the next model call stays small. */
export function compactOldToolResults(messages: PromptMessage[], keep = 2): PromptMessage[] {
  const toolIndexes = messages.flatMap((message, index) => message.role === "tool" ? [index] : []);
  const stale = new Set(toolIndexes.slice(0, Math.max(0, toolIndexes.length - keep)));
  return messages.map((message, index) => {
    if (!stale.has(index)) return message;
    const firstLine = message.content.split("\n").map((line) => line.trim()).find(Boolean) ?? "";
    const pathMatch = message.content.match(/(?:[A-Za-z]:\\[^\s]+|[\w./\\-]+\.[A-Za-z0-9]+)/);
    const label = pathMatch?.[0] ?? "earlier step";
    return { ...message, content: `${label}: ${firstLine.slice(0, 160)}` };
  });
}
