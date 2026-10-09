/** Named programs Fonia may start itself. Paths are usual install folders, not a disk scan. */

export type ConnectionId = "blender" | "metatrader" | "vm" | "corel" | "androidstudio";

export type ConnectionSetting =
  | "connectBlender"
  | "connectMetatrader"
  | "connectVm"
  | "connectCorel"
  | "connectAndroidStudio";

export interface ConnectionRule {
  id: ConnectionId;
  setting: ConnectionSetting;
  label: string;
  defaultOn: boolean;
  aliases: string[];
}

export const APP_CONNECTIONS: ConnectionRule[] = [
  {
    id: "blender",
    setting: "connectBlender",
    label: "Blender",
    defaultOn: true,
    aliases: ["blender"],
  },
  {
    id: "metatrader",
    setting: "connectMetatrader",
    label: "MetaTrader 5",
    defaultOn: false,
    aliases: ["metatrader", "metatrader 5", "mt5", "terminal64"],
  },
  {
    id: "vm",
    setting: "connectVm",
    label: "Virtual machine",
    defaultOn: false,
    aliases: ["virtualbox", "vbox", "vmware", "hyper-v", "hyperv", "virtual machine"],
  },
  {
    id: "corel",
    setting: "connectCorel",
    label: "CorelDRAW",
    defaultOn: false,
    aliases: ["corel", "coreldraw", "corel draw", "coreldrw"],
  },
  {
    id: "androidstudio",
    setting: "connectAndroidStudio",
    label: "Android Studio",
    defaultOn: false,
    aliases: ["android studio", "studio64"],
  },
];

const EXE_PATHS: Record<ConnectionId, string[]> = {
  blender: ["C:\\Program Files\\Blender Foundation\\Blender 5.1\\blender.exe"],
  metatrader: [
    "C:\\Program Files\\MetaTrader 5\\terminal64.exe",
    "C:\\Program Files (x86)\\MetaTrader 5\\terminal64.exe",
  ],
  vm: [
    "C:\\Program Files\\Oracle\\VirtualBox\\VirtualBox.exe",
    "C:\\Program Files\\VMware\\VMware Workstation\\vmware.exe",
    "C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmware.exe",
  ],
  corel: [
    "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7\\Draw\\CorelDRW.exe",
    "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7\\Programs\\CorelDRW.exe",
    "C:\\Program Files\\Corel\\CorelDRAW Graphics Suite\\Programs64\\CorelDRW.exe",
  ],
  androidstudio: [
    "C:\\Program Files\\Android\\Android Studio\\bin\\studio64.exe",
    "C:\\Program Files\\Android\\Android Studio1\\bin\\studio64.exe",
  ],
};

export function knownExePaths(id: ConnectionId): string[] {
  return EXE_PATHS[id];
}

function normalizeAppName(name: string): string {
  return name
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\.exe$/i, "")
    .replace(/[_]+/g, " ")
    .toLowerCase();
}

export function matchConnection(name: string): ConnectionRule | null {
  const key = normalizeAppName(name);
  if (!key) return null;
  const base = key.split(/[\\/]/).pop() ?? key;
  for (const rule of APP_CONNECTIONS) {
    if (rule.aliases.some((alias) => base === alias || key === alias)) return rule;
  }
  if (key.includes("terminal64")) return APP_CONNECTIONS.find((rule) => rule.id === "metatrader") ?? null;
  if (key.includes("virtualbox") || key.includes("vmware")) return APP_CONNECTIONS.find((rule) => rule.id === "vm") ?? null;
  if (key.includes("coreldrw") || key.includes("coreldraw")) return APP_CONNECTIONS.find((rule) => rule.id === "corel") ?? null;
  if (key.includes("studio64") || key.includes("android studio")) return APP_CONNECTIONS.find((rule) => rule.id === "androidstudio") ?? null;
  if (base === "blender" || key.endsWith("blender")) return APP_CONNECTIONS.find((rule) => rule.id === "blender") ?? null;
  return null;
}

export interface ConnectionFlags {
  connectExternalTools: boolean;
  connectBlender: boolean;
  connectMetatrader: boolean;
  connectVm: boolean;
  connectCorel: boolean;
  connectAndroidStudio: boolean;
}

/** Empty string means the launch may continue. A sentence means Settings refused it. */
export function connectionBlock(settings: ConnectionFlags, name: string): string {
  const rule = matchConnection(name);
  if (!settings.connectExternalTools) {
    return rule
      ? `${rule.label} stays closed. External tool connections are off in Settings.`
      : "External tool connections are off in Settings, so the program was not started.";
  }
  if (!rule) return "";
  if (!settings[rule.setting]) {
    return `${rule.label} is off in Settings. Turn that connection on, then ask again. Nothing was started.`;
  }
  return "";
}

export function connectionStartedNote(name: string, appPath: string): string {
  const rule = matchConnection(name);
  if (rule?.id === "vm") return `Started: ${appPath}. VirtualBox is open. A virtual machine was not powered on.`;
  if (rule?.id === "metatrader") return `Started: ${appPath}. MetaTrader 5 is open. No trade was placed.`;
  if (rule?.id === "corel") return `Started: ${appPath}. CorelDRAW is open. Fonia does not draw inside that window.`;
  if (rule?.id === "androidstudio") return `Started: ${appPath}. Android Studio is open.`;
  if (rule?.id === "blender") return `Started: ${appPath}. Opening Blender does not build a mesh. Ask for a shape when you want a .blend file.`;
  return `Started: ${appPath}`;
}

/** What this PC can do for the model. Short, because a small model has to use it. */
export function connectionStance(settings: ConnectionFlags): string {
  if (!settings.connectExternalTools) {
    return "You are Fonia on this PC, in the open project. External programs are off. Your advantage is the project files and PowerShell. You are not a public web chatbot.";
  }
  const on: string[] = [];
  if (settings.connectBlender) on.push("Blender can open and can build one named shape into a .blend file");
  if (settings.connectMetatrader) on.push("MetaTrader 5 can open and a launch does not place a trade");
  if (settings.connectVm) on.push("VirtualBox can open and a guest is not powered on");
  if (settings.connectCorel) on.push("CorelDRAW can open when its program file is present");
  if (settings.connectAndroidStudio) on.push("Android Studio can open");
  const connected = on.length ? on.join(". ") + "." : "No named program is switched on.";
  return `You are Fonia on this PC, in the open project. You are not a public web chatbot. Connected: ${connected} Your advantage is the project files, PowerShell, and those connected programs. Leave a program that is off unstarted.`;
}
