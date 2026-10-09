import fs from "fs";
import path from "path";

export type MicMode = "push" | "open" | "wake";

export interface FoniaSettings {
  micMode: MicMode;
  /** The 1.5B matches a muddy sentence to a system mode, then unloads. */
  understandFirst: boolean;
  /** Overnight work, sleep, and an unsure match wait for a click. */
  askBeforeConsequential: boolean;
  /** After a file change, keep the check going until it passes, blocks, or Stop. */
  holdGoal: boolean;
  /** After a page change, look at the local app when RAM can hold a vision model. */
  lookAfterUiEdit: boolean;
  /** When at least 7200 MB is free, the 8B plans and then the 7B edits. */
  brainWhenRamFits: boolean;
  /** An overnight run may close up to four other heavy apps. */
  closeExtraApps: boolean;
  /** An overnight run uses the strongest coder that fits. */
  strongCoderOvernight: boolean;
  /** If Windows speech fails, record the microphone and use the local whisper model. */
  whisperFallback: boolean;
  /** Tool steps start open instead of one summary line. */
  showSteps: boolean;
  /** Off refuses every web fetch. On still asks before each public page. */
  internetAccess: boolean;
  /** Off refuses every program launch. On allows Notepad and the apps below. */
  connectExternalTools: boolean;
  /** Blender may open, and bpy may build one named shape. */
  connectBlender: boolean;
  /** MetaTrader 5 may open. A launch does not place a trade. */
  connectMetatrader: boolean;
  /** VirtualBox may open. A guest machine is not powered on. */
  connectVm: boolean;
  /** CorelDRAW may open when CorelDRW.exe is in the usual folder. */
  connectCorel: boolean;
  /** Android Studio may open. */
  connectAndroidStudio: boolean;
}

const FILE = path.join(process.cwd(), ".data", "fonia-settings.json");

const BOOL_KEYS = [
  "understandFirst",
  "askBeforeConsequential",
  "holdGoal",
  "lookAfterUiEdit",
  "brainWhenRamFits",
  "closeExtraApps",
  "strongCoderOvernight",
  "whisperFallback",
  "showSteps",
  "internetAccess",
  "connectExternalTools",
  "connectBlender",
  "connectMetatrader",
  "connectVm",
  "connectCorel",
  "connectAndroidStudio",
] as const;

export const DEFAULT_FONIA_SETTINGS: FoniaSettings = {
  micMode: "push",
  understandFirst: true,
  askBeforeConsequential: true,
  holdGoal: true,
  lookAfterUiEdit: true,
  brainWhenRamFits: true,
  closeExtraApps: true,
  strongCoderOvernight: true,
  whisperFallback: true,
  showSteps: false,
  internetAccess: true,
  connectExternalTools: true,
  connectBlender: true,
  connectMetatrader: false,
  connectVm: false,
  connectCorel: false,
  connectAndroidStudio: false,
};

function clean(value: Partial<FoniaSettings> | null | undefined): Partial<FoniaSettings> {
  if (!value) return {};
  const next: Partial<FoniaSettings> = {};
  if (value.micMode === "open" || value.micMode === "wake" || value.micMode === "push") next.micMode = value.micMode;
  for (const key of BOOL_KEYS) {
    if (typeof value[key] === "boolean") next[key] = value[key];
  }
  return next;
}

export function mergeFoniaSettings(current: Partial<FoniaSettings> | null, patch: Partial<FoniaSettings>): FoniaSettings {
  return { ...DEFAULT_FONIA_SETTINGS, ...clean(current), ...clean(patch) };
}

export function readFoniaSettings(): FoniaSettings {
  try {
    const parsed = JSON.parse(fs.readFileSync(FILE, "utf8")) as Partial<FoniaSettings>;
    return mergeFoniaSettings(parsed, {});
  } catch {
    return { ...DEFAULT_FONIA_SETTINGS };
  }
}

export function writeFoniaSettings(patch: Partial<FoniaSettings>): FoniaSettings {
  const settings = mergeFoniaSettings(readFoniaSettings(), patch);
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(settings, null, 2));
  return settings;
}
