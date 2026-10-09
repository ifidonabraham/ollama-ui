import { isComputerControlTask } from "./computerActionParse";
import { personIsSteppingAway } from "./awayIntent";

export type TaskIntent = "casual" | "explain" | "code" | "deep" | "image";

export interface IntentDecision {
  intent: TaskIntent;
  needsTools: boolean;
  needsWriteAccess: boolean;
}

const SIMPLE_ACTION = /^\s*(create|make|touch|delete|remove|rename|move|list|show|read|run)\b(?!.*\b(app|application|system|website|project|architecture|database|from scratch)\b).{0,180}$/i;

const CASUAL_GREETINGS = /^(hi|hello|hey|yo|greetings|howdy|sup|good\s+(morning|afternoon|evening)|who\s+are\s+you|what\s+can\s+you\s+do|thanks|thank\s+you|bye|goodbye)[\s!.]*$/i;

const CODE_WORDS = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create|file|folder|project|repository|repo|script|compile|deploy|import|export|interface|type|enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/i;
const ACTION_WORDS = /\b(create|edit|update|change|delete|remove|add|write|implement|run|test|debug|rename|replace|patch|move|fix|refactor|execute)\b/i;
const INSPECT_WORDS = /\b(scan|inspect|examine|explore|read|review|summarize|search|find|list|look at|go through|check|browse)\b/i;
const EXPLAIN_WORDS = /\b(explain|what is|what are|why|how does|how do|summarize|compare|recommend|suggest|describe)\b/i;
const DEEP_WORDS = /\b(architecture|full (page|app|website|system|backend|frontend|api)|scaffold|entire|whole project|from scratch|multi.?file|design system|database schema|migrate|migration|complex)\b/i;
const SYSTEM_OR_FILE_TARGET = /\b(file|folder|dir|directory|project|repository|repo|workspace|code|source|terminal|powershell|bash|command|cmd|[a-zA-Z]:[\\/]|(?:\.{1,2}[\\/]))\b/i;

const LOCAL_MEDIA = /\b(pdf|docx|pptx|video|mp4|webm|mov|mkv)\b|Video:\s*\S/i;
const LOCAL_APP = /\b(open|launch|start)\b[\s\S]{0,80}\b(blender|notepad|explorer|calc|paint|app|application|program)\b/i;
const LOCAL_SETUP = /^(?:please\s+)?(?:can you\s+)?(?:install|uninstall|set up|setup)\b/i;

/** A request to open an installed app, read a document, or look at a video. */
export function isLocalComputerTask(content: string): boolean {
  return LOCAL_MEDIA.test(content) || LOCAL_APP.test(content) || LOCAL_SETUP.test(content) || isComputerControlTask(content);
}

/** A follow-up about something the agent claims it already did. A new command that starts with a verb is not one of these. */
export function refersToPriorAction(content: string): boolean {
  const normalized = content.trim();
  if (/^(create|make|write|delete|run|read|scan|list|show)\b/i.test(normalized)) return false;
  return /\bwhat type of file\b/i.test(normalized)
    || /\bdid you\b[\s\S]{0,40}\b(create|created|write|wrote|make|made|change|changed|edit|edited|delete|deleted|run|scan|read|save|saved)\b/i.test(normalized)
    || /\bhave you\b[\s\S]{0,40}\b(create|created|write|wrote|make|made|change|changed|edit|edited|delete|deleted|run|scan|read|save|saved)\b/i.test(normalized)
    || /\bsucce(?:s|ss)ful(?:ly|y) create/i.test(normalized);
}

/** A picture question stays with the vision model. A request to change code from that picture does not. */
export function imageStaysWithVision(content: string): boolean {
  return !ACTION_WORDS.test(content) && !/\b(file|folder|code|css|html|component|implement)\b/i.test(content);
}

export function answerRequiresEvidence(content: string, hasImages = false): boolean {
  if (hasImages) return true;
  if (refersToPriorAction(content)) return true;
  const decision = classifyIntent(content, hasImages);
  if (decision.intent === "casual") return false;
  if (decision.intent === "explain" && !decision.needsTools) return false;
  return decision.needsTools;
}

export function classifyIntent(content: string, hasImages = false): IntentDecision {
  const normalized = content.trim();
  const wordCount = normalized ? normalized.split(/\s+/).length : 0;

  if (hasImages) {
    return { intent: "image", needsTools: true, needsWriteAccess: ACTION_WORDS.test(normalized) };
  }

  // Always keep purely conversational greetings casual (no tools, zero RAM wasted on scanning)
  if (CASUAL_GREETINGS.test(normalized)) {
    return { intent: "casual", needsTools: false, needsWriteAccess: false };
  }

  if (personIsSteppingAway(normalized)) {
    return { intent: "code", needsTools: true, needsWriteAccess: true };
  }

  if (refersToPriorAction(normalized)) {
    return { intent: "explain", needsTools: true, needsWriteAccess: false };
  }

  if (isLocalComputerTask(normalized)) {
    return { intent: "code", needsTools: true, needsWriteAccess: ACTION_WORDS.test(normalized) };
  }

  if (/\bbrief\b/i.test(normalized) && SYSTEM_OR_FILE_TARGET.test(normalized)) {
    return { intent: "explain", needsTools: true, needsWriteAccess: false };
  }

  if (DEEP_WORDS.test(normalized) && (wordCount >= 4 || /architecture|from scratch|multi.?file|database schema/i.test(normalized))) {
    return { intent: "deep", needsTools: true, needsWriteAccess: ACTION_WORDS.test(normalized) };
  }

  // Explicit inspection/scan requests on files, folders, paths, or terminal commands
  if (INSPECT_WORDS.test(normalized) && SYSTEM_OR_FILE_TARGET.test(normalized)) {
    const isWrite = ACTION_WORDS.test(normalized) && !/^(scan|inspect|examine|read|look at|check|list)\b/i.test(normalized);
    return { intent: "code", needsTools: true, needsWriteAccess: isWrite };
  }

  // Explicit questions about the workspace, repository, or current project
  if (SYSTEM_OR_FILE_TARGET.test(normalized) && (EXPLAIN_WORDS.test(normalized) || /\b(about|what is|tell me)\b/i.test(normalized))) {
    return { intent: "explain", needsTools: true, needsWriteAccess: false };
  }

  if (/\bwhat are (?:you|we)\b/i.test(normalized) && /\b(coding|building|working on|making)\b/i.test(normalized)) {
    return { intent: "explain", needsTools: true, needsWriteAccess: false };
  }

  if (ACTION_WORDS.test(normalized) || (CODE_WORDS.test(normalized) && !EXPLAIN_WORDS.test(normalized))) {
    return { intent: "code", needsTools: true, needsWriteAccess: ACTION_WORDS.test(normalized) };
  }

  if (EXPLAIN_WORDS.test(normalized) || INSPECT_WORDS.test(normalized)) {
    const needsTools = SYSTEM_OR_FILE_TARGET.test(normalized);
    return { intent: "explain", needsTools, needsWriteAccess: false };
  }

  // A short new request, such as ejecting a drive, is a task. A greeting already returned above.
  if (/\b(eject|unplug|remove|empty|recycle|flash|usb|thumb|stick|install|uninstall|connect|disconnect|mount|unmount|hide|extract|zip|print|scan|rename|lock|unlock|minimize|maximize|pair|calibrate|rotate)\b/i.test(normalized)
    && !/^(what|who|why|how|when|where|is|are)\b/i.test(normalized)) {
    return { intent: "code", needsTools: true, needsWriteAccess: false };
  }

  if (wordCount <= 6) {
    return { intent: "casual", needsTools: false, needsWriteAccess: false };
  }

  return { intent: "explain", needsTools: false, needsWriteAccess: false };
}

export function isSimpleAction(content: string, hasImages = false): boolean {
  if (hasImages) return false;
  const normalized = content.trim();
  return normalized.split(/\s+/).length <= 14 && SIMPLE_ACTION.test(normalized);
}
