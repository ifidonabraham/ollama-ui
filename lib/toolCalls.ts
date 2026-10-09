export interface ToolCall {
  function: { name: string; arguments: Record<string, string> };
}

export const TOOL_NAMES = [
  "read_file",
  "write_file",
  "patch_file",
  "list_dir",
  "run_command",
  "delete_file",
  "search_in_files",
  "read_document",
  "sample_video",
  "launch_app",
  "computer_action",
] as const;

const ALLOWED = new Set<string>(TOOL_NAMES);

export function extractJsonValues(content: string): unknown[] {
  const values: unknown[] = [];

  for (let start = 0; start < content.length; start++) {
    if (content[start] !== "{" && content[start] !== "[") continue;

    const opening = content[start];
    const closing = opening === "{" ? "}" : "]";
    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let end = start; end < content.length; end++) {
      const character = content[end];
      if (inString) {
        if (escaped) escaped = false;
        else if (character === "\\") escaped = true;
        else if (character === "\"") inString = false;
        continue;
      }
      if (character === "\"") {
        inString = true;
        continue;
      }
      if (character === opening) depth++;
      else if (character === closing) depth--;
      if (depth === 0) {
        try { values.push(JSON.parse(content.slice(start, end + 1))); }
        catch { /* try the next possible JSON value */ }
        break;
      }
    }
  }

  return values;
}

function asToolCall(item: unknown): ToolCall | null {
  if (!item || typeof item !== "object" || !("name" in item)) return null;
  const tool = item as { name?: unknown; arguments?: Record<string, string>; parameters?: Record<string, string> };
  if (typeof tool.name !== "string" || !ALLOWED.has(tool.name)) return null;
  return { function: { name: tool.name, arguments: tool.arguments ?? tool.parameters ?? {} } };
}

/** Accept structured tool calls or JSON that names a supported tool. Prose and package.json objects are not tool calls. */
export function extractToolCalls(message: { tool_calls?: ToolCall[]; content?: string }): ToolCall[] {
  const structured = (message.tool_calls ?? []).filter((call) => ALLOWED.has(call.function?.name));
  if (message.tool_calls && message.tool_calls.length > 0) return structured;

  const content = message.content ?? "";
  if (!content.trim()) return [];

  const found: ToolCall[] = [];
  for (const value of extractJsonValues(content)) {
    const items = Array.isArray(value) ? value : [value];
    for (const item of items) {
      const call = asToolCall(item);
      if (call) found.push(call);
    }
  }
  return found;
}
