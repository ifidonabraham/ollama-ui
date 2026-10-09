import { directUserAction } from "./directAction";
import type { ToolCall } from "./toolCalls";

export interface CommandStep {
  call: ToolCall;
  source: string;
}

export interface CommandPlan {
  steps: CommandStep[];
  leftover: string[];
  safeToRun: boolean;
}

const SPLIT = /\s*(?:;|\bthen\b|\band then\b|\balso\b|\bplus\b|\bafter that\b|\band\b)\s*/i;
const DANGEROUS = /\b(format|wipe|erase)\b|\bdelete\b.{0,40}\b(everything|all|disk|drive|files)\b|\bremove-item\b|\brm\s+-rf\b/i;
const CARRY = /^(check|show|turn off|turn on|enable|disable|start|stop)\b/i;

/** Split one sentence into the PC commands inside it. A clause that is not a command is leftover. */
export function understandCommand(content: string): CommandPlan | null {
  const text = content.trim();
  if (!text || text.includes("\n") || text.length > 800) return null;
  const clauses = text.split(SPLIT).map((part) => part.trim()).filter(Boolean);
  if (clauses.length === 0) return null;

  let carry = "";
  const steps: CommandStep[] = [];
  const leftover: string[] = [];
  for (const clause of clauses) {
    if (DANGEROUS.test(clause)) {
      leftover.push(clause);
      continue;
    }
    const carried = carry && !DANGEROUS.test(`${carry} ${clause}`) ? readClause(`${carry} ${clause}`) : null;
    const parsed = readClause(clause) ?? carried;
    if (parsed) {
      steps.push({ call: parsed, source: clause });
      const lead = clause.match(CARRY);
      if (lead) carry = lead[1].toLowerCase();
    } else {
      leftover.push(clause);
    }
  }
  if (steps.length === 0) {
    if (DANGEROUS.test(text)) return { steps, leftover: clauses, safeToRun: false };
    return null;
  }
  return {
    steps,
    leftover,
    safeToRun: !DANGEROUS.test(text) && !leftover.some((part) => DANGEROUS.test(part)),
  };
}

function readClause(clause: string): ToolCall | null {
  const direct = directUserAction(clause);
  if (!direct) return null;
  const name = direct.function.name;
  if (name === "run_command" || name === "launch_app" || name === "delete_file" || name === "write_file" || name === "patch_file") {
    return null;
  }
  return direct;
}
