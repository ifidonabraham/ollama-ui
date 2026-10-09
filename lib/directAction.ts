import { matchConnection } from "./appConnections";
import { parseComputerAction } from "./computerActionParse";
import type { ToolCall } from "./toolCalls";

export const TEXT_TOOL_INSTRUCTION = [
  "Reply with one JSON object only and no other text.",
  "Use the keys name and arguments.",
  "name must be read_file, write_file, patch_file, list_dir, run_command, delete_file, search_in_files, read_document, sample_video, launch_app, or computer_action.",
].join(" ");

/** A single command the user already stated. Open-ended edits stay with the model. */
export function directUserAction(content: string): ToolCall | null {
  const text = content.trim();
  if (!text || text.includes("\n") || text.length > 400) return null;
  if (/\b(and|then)\b/i.test(text)) return null;

  const computer = parseComputerAction(text);
  if (computer) return { function: { name: "computer_action", arguments: { action: computer.action, target: computer.target } } };

  const run = text.match(/^(?:please\s+)?(?:run|execute)(?:\s+(?:the\s+)?command)?\s*:?\s+(.+)$/i);
  if (run) {
    const command = run[1].trim().replace(/^["']|["']$/g, "");
    if (!command || /^(a|the|this|command|something)\b/i.test(command)) return null;
    return { function: { name: "run_command", arguments: { command } } };
  }

  const read = text.match(/^(?:please\s+)?read(?:\s+(?:the\s+)?file)?\s+(.+)$/i);
  if (read) {
    const filePath = read[1].trim().replace(/^["']|["']$/g, "");
    if (!filePath || /\s/.test(filePath)) return null;
    const tool = /\.(pdf|docx|pptx)$/i.test(filePath) ? "read_document" : "read_file";
    return { function: { name: tool, arguments: { path: filePath } } };
  }

  const open = text.match(/^(?:please\s+)?(?:open|launch|start)\s+(.+)$/i);
  if (open) {
    const name = open[1].trim().replace(/^["']|["']$/g, "");
    const known = Boolean(matchConnection(name));
    if (name && (known || !/\s/.test(name)) && !/[;&|<>`$]/.test(name) && !/shutdown|format|Remove-Item|Restart-Computer/i.test(name)) {
      return { function: { name: "launch_app", arguments: { name } } };
    }
  }

  if (/^(?:please\s+)?(?:list|ls)(?:\s+(?:me\s+)?)?(?:this\s+|the\s+)?(?:dir|directory|folder|files)?\s*$/i.test(text)) {
    return { function: { name: "list_dir", arguments: { path: "." } } };
  }

  const listed = text.match(/^(?:please\s+)?(?:list|ls)(?:\s+(?:directory|dir|folder))?\s+(\S+)$/i);
  if (listed) {
    return { function: { name: "list_dir", arguments: { path: listed[1] } } };
  }

  return null;
}
