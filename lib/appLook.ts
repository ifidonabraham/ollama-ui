import { execFile } from "child_process";
import { promisify } from "util";
import { runComputerAction } from "./computerActions";
import { resolveInstalledApp } from "./mediaTasks";

const execFileAsync = promisify(execFile);

/** Read the app that is already serving this PC. This does not start a second dev server. */
export async function readLocalPage(port = 3000): Promise<{ ok: boolean; detail: string }> {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(4000), cache: "no-store" });
    const html = (await response.text()).slice(0, 8000);
    const title = html.match(/<title>([^<]{0,120})/i)?.[1]?.trim() ?? "";
    return { ok: response.ok, detail: `Local page ${response.status}. Title: ${title || "(none)"}` };
  } catch {
    return { ok: false, detail: "The local app is not answering on port 3000." };
  }
}

async function openLocalPage(port: number): Promise<string> {
  for (const name of ["msedge", "chrome"]) {
    const appPath = resolveInstalledApp(name);
    if (!appPath || appPath === name) continue;
    try {
      await execFileAsync("powershell.exe", [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        `Start-Process -FilePath '${appPath.replace(/'/g, "''")}' -ArgumentList 'http://127.0.0.1:${port}/'`,
      ], { timeout: 15_000 });
      return `Opened ${appPath} on http://127.0.0.1:${port}/`;
    } catch {
      /* try the next browser */
    }
  }
  try {
    await execFileAsync("powershell.exe", [
      "-NoProfile",
      "-NonInteractive",
      "-Command",
      `Start-Process 'http://127.0.0.1:${port}/'`,
    ], { timeout: 15_000 });
    return `Opened the default browser on http://127.0.0.1:${port}/`;
  } catch {
    return `The local page answered on port ${port}.`;
  }
}

/** Open the running app, then capture the desktop for the vision model. */
export async function lookAtRunningApp(port = 3000): Promise<{ detail: string; screenshotPath: string }> {
  const page = await readLocalPage(port);
  if (!page.ok) return { detail: page.detail, screenshotPath: "" };
  const opened = await openLocalPage(port);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  const shot = await runComputerAction("screenshot", "");
  const pathMatch = shot.match(/Screenshot:\s*(\S+)/);
  const screenshotPath = pathMatch?.[1] ?? "";
  const shotNote = screenshotPath ? `Screenshot: ${screenshotPath}` : shot;
  return { detail: `${page.detail}\n${opened}\n${shotNote}`, screenshotPath };
}
