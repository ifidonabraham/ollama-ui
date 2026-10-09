import fs from "fs";
import path from "path";
import { APP_CONNECTIONS, knownExePaths, type ConnectionId } from "./appConnections";

export interface InstalledConnection {
  id: ConnectionId;
  label: string;
  found: boolean;
  path: string;
  note: string;
}

function blenderExe(): string | null {
  const root = "C:\\Program Files\\Blender Foundation";
  if (!fs.existsSync(root)) return null;
  const direct = path.join(root, "blender.exe");
  if (fs.existsSync(direct)) return direct;
  const versions = fs.readdirSync(root)
    .filter((entry) => entry.toLowerCase().startsWith("blender"))
    .sort()
    .reverse();
  for (const version of versions) {
    const exe = path.join(root, version, "blender.exe");
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

function firstExisting(paths: string[]): string {
  return paths.find((candidate) => candidate && fs.existsSync(candidate)) ?? "";
}

function noteFor(id: ConnectionId, found: boolean, appPath: string): string {
  if (id === "blender") {
    return found
      ? "Blender can open, and it can build one shape with bpy."
      : "Blender was not in C:\\Program Files\\Blender Foundation.";
  }
  if (id === "metatrader") {
    return found
      ? "MetaTrader 5 can open. A launch does not place a trade."
      : "terminal64.exe was not in C:\\Program Files\\MetaTrader 5.";
  }
  if (id === "vm") {
    return found
      ? `The virtual machine program is ${appPath}. Opening it does not power on a guest.`
      : "VirtualBox and VMware were not in their usual Program Files folders.";
  }
  if (id === "androidstudio") {
    return found
      ? "Android Studio can open."
      : "studio64.exe was not in the usual Android Studio folders.";
  }
  const suite = "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7";
  if (found) return "CorelDRAW can open. Fonia does not draw inside the window.";
  if (fs.existsSync(suite)) {
    return "CorelDRAW Graphics Suite X7 is on this PC, and CorelDRW.exe was not in the usual folder. The installer is not started.";
  }
  return "CorelDRW.exe was not in the usual Corel folders.";
}

export function inspectConnections(): InstalledConnection[] {
  return APP_CONNECTIONS.map((rule) => {
    const appPath = rule.id === "blender" ? blenderExe() ?? "" : firstExisting(knownExePaths(rule.id));
    return {
      id: rule.id,
      label: rule.label,
      found: Boolean(appPath),
      path: appPath,
      note: noteFor(rule.id, Boolean(appPath), appPath),
    };
  });
}
