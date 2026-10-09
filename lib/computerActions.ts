import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import os from "os";
import path from "path";
import { findFfmpeg, toolEnv } from "./videoFrames";

import { brightnessScript, clipboardScript, defaultsScript, themeScript, uiScript, updatesScript } from "./systemControls";
import { appsToClose, type RunningApp } from "./awayIntent";
import { applyMicMode } from "./foniaMic";
import { readFoniaSettings, writeFoniaSettings } from "./foniaSettings";

const execFileAsync = promisify(execFile);

const PROTECTED_PROCESSES = new Set(["system", "idle", "csrss", "wininit", "winlogon", "lsass", "services", "smss", "svchost", "registry"]);
const PROTECTED_SERVICES = new Set(["rpcss", "dcomlaunch", "samss", "lsm", "power", "plugplay", "winmgmt"]);

const ACTIONS = new Set([
  "bluetooth_status",
  "bluetooth_on",
  "bluetooth_off",
  "firewall_status",
  "firewall_on",
  "firewall_off",
  "process_status",
  "service_status",
  "disk_space",
  "eject_drive",
  "memory_status",
  "wifi_status",
  "network_status",
  "components_status",
  "battery_status",
  "cpu_status",
  "gpu_status",
  "display_status",
  "audio_status",
  "volume_status",
  "volume_set",
  "volume_mute",
  "volume_unmute",
  "shutdown",
  "restart",
  "sleep",
  "process_stop",
  "service_start",
  "service_stop",
  "device_enable",
  "device_disable",
  "microphone_off",
  "microphone_on",
  "printers_status",
  "camera_status",
  "power_status",
  "startup_status",
  "programs_status",
  "devices_status",
  "screenshot",
  "speak",
  "listen",
  "transcribe",
  "brightness_status",
  "brightness_up",
  "brightness_down",
  "brightness_set",
  "theme_status",
  "theme_dark",
  "theme_light",
  "defaults_status",
  "defaults_open",
  "windows_update_status",
  "windows_update_scan",
  "windows_update_install",
  "clipboard_read",
  "ui_type",
  "ui_click",
]);

function safeName(value: string): string | null {
  const name = value.trim().replace(/^["']|["']$/g, "");
  return /^[A-Za-z0-9._-]{1,40}$/.test(name) ? name : null;
}

async function runPowerShell(script: string, timeout = 25_000, sta = false): Promise<string> {
  const file = path.join(os.tmpdir(), `ollama-ui-ps-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);
  const body = [
    "$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)",
    script,
  ].join("\n");
  fs.writeFileSync(file, body, "utf8");
  try {
    const { stdout, stderr } = await execFileAsync(
      "powershell.exe",
      sta
        ? ["-NoProfile", "-STA", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", file]
        : ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", file],
      { timeout, maxBuffer: 1_000_000, env: toolEnv() }
    );
    return [stdout, stderr].map((part) => part?.trim()).filter(Boolean).join("\n") || "(no output)";
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string; message?: string; killed?: boolean };
    const detail = [err.stdout, err.stderr].map((part) => part?.trim()).filter(Boolean).join("\n");
    const text = detail || (err.message ?? "PowerShell failed");
    if (/Access is denied|requires elevation|0x8007|UnauthorizedAccess/i.test(text)) {
      return `Error: This needs an Administrator terminal. ${text.slice(0, 300)}`;
    }
    if (err.killed || /TIMEOUT|timed out/i.test(err.message ?? "")) {
      return `Error: The PC check timed out. ${detail.slice(0, 300)}`;
    }
    return `Error: ${text.slice(0, 500)}`;
  } finally {
    fs.rmSync(file, { force: true });
  }
}

function bluetoothScript(mode: "status" | "on" | "off"): string {
  const change = mode === "status"
    ? ""
    : `$desired = [Windows.Devices.Radios.RadioState]::${mode === "on" ? "On" : "Off"}; $access = Await-WinRt ($radio.SetStateAsync($desired)) ([Windows.Devices.Radios.RadioAccessStatus]); "access=$access";`;
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.Runtime.WindowsRuntime",
    "$null = [Windows.Devices.Radios.Radio,Windows.Devices.Radios,ContentType=WindowsRuntime]",
    "$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]",
    "function Await-WinRt($op, $type) { $task = $asTask.MakeGenericMethod($type).Invoke($null, @($op)); $task.Wait() | Out-Null; if ($task.IsFaulted) { throw $task.Exception.GetBaseException() }; $task.Result }",
    "$radios = Await-WinRt ([Windows.Devices.Radios.Radio]::GetRadiosAsync()) ([System.Collections.Generic.IReadOnlyList[Windows.Devices.Radios.Radio]])",
    "$radio = $radios | Where-Object { $_.Kind -eq [Windows.Devices.Radios.RadioKind]::Bluetooth } | Select-Object -First 1",
    "if (-not $radio) { 'No Bluetooth radio found'; exit 0 }",
    change,
    "\"name=$($radio.Name) state=$($radio.State)\"",
  ].filter(Boolean).join("; ");
}

function whisperInTree(dir: string, depth: number, names = ["whisper-cli.exe", "whisper.exe"]): string | null {
  for (const name of names) {
    const candidate = path.join(dir, name);
    if (fs.existsSync(candidate)) return candidate;
  }
  if (depth <= 0) return null;
  let entries: fs.Dirent[] = [];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return null; }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const found = whisperInTree(path.join(dir, entry.name), depth - 1);
    if (found) return found;
  }
  return null;
}

export function findWhisper(): { command: string; model: string } | null {
  const names = ["whisper-cli.exe", "whisper.exe"];
  let command = "";
  const foniaDir = path.join(process.env.LOCALAPPDATA ?? "", "Fonia", "whisper");
  if (fs.existsSync(foniaDir)) {
    const found = whisperInTree(foniaDir, 3, ["whisper-cli.exe", "whisper.exe", "main.exe"]);
    if (found) command = found;
  }
  for (const dir of command ? [] : (process.env.PATH ?? "").split(";")) {
    const trimmed = dir.trim();
    if (!trimmed) continue;
    for (const name of names) {
      const candidate = path.join(trimmed, name);
      if (fs.existsSync(candidate)) {
        command = candidate;
        break;
      }
    }
    if (command) break;
  }
  const packages = path.join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
  if (!command && fs.existsSync(packages)) {
    for (const entry of fs.readdirSync(packages)) {
      if (!/whisper/i.test(entry)) continue;
      const found = whisperInTree(path.join(packages, entry), 3);
      if (found) {
        command = found;
        break;
      }
    }
  }
  if (!command) return null;
  const roots = [path.dirname(command), path.join(path.dirname(command), "models"), foniaDir];
  for (const root of roots) {
    if (!fs.existsSync(root)) continue;
    const model = fs.readdirSync(root).find((name) => /^ggml-.*\.bin$/i.test(name));
    if (model) return { command, model: path.join(root, model) };
  }
  return { command, model: "" };
}

/** Windows speech failed in a way the installed whisper model can still hear. A timeout is not retried. */
export function speechEngineFailed(text: string): boolean {
  if (!text.startsWith("Error:")) return false;
  if (/timed out|TIMEOUT/i.test(text)) return false;
  return /recognizer|speech|audio device|microphone|language|dictation/i.test(text);
}

/** Prefer a microphone over a loopback device such as Stereo Mix. */
export function pickAudioDevice(names: string[]): string {
  return names.find((name) => /microphone|mic\b|headset|array/i.test(name)) ?? names[0] ?? "";
}

/** Drop whisper.cpp progress lines and keep the spoken words. */
export function cleanTranscript(raw: string): string {
  const lines = raw.split(/\r?\n/).map((line) => line.trim()).filter((line) => {
    if (!line) return false;
    if (/^(whisper_|ggml_|system_info|main:)/i.test(line)) return false;
    if (/\b(load time|mel time|encode time|decode time|total time)\b/i.test(line)) return false;
    return true;
  });
  return lines.join(" ").replace(/\s+/g, " ").trim();
}

function heardLine(raw: string): string {
  if (raw.startsWith("Error:")) return raw;
  if (/returned no words/i.test(raw)) return "No speech recognized.";
  const text = cleanTranscript(raw);
  if (!text) return "No speech recognized.";
  return text.startsWith("Heard:") ? text : `Heard: ${text}`;
}

async function audioDeviceNames(ffmpeg: string): Promise<string[]> {
  let dump = "";
  try {
    const { stdout, stderr } = await execFileAsync(
      ffmpeg,
      ["-hide_banner", "-list_devices", "true", "-f", "dshow", "-i", "dummy"],
      { timeout: 12_000, env: toolEnv() },
    );
    dump = `${stdout ?? ""}\n${stderr ?? ""}`;
  } catch (error: unknown) {
    const err = error as { stdout?: string; stderr?: string };
    dump = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
  }
  return [...dump.matchAll(/"([^"\r\n]+)"\s+\(audio\)/gi)].map((match) => match[1]);
}

/** Record the microphone and transcribe it with the installed whisper model. */
async function captureMicrophone(seconds: number): Promise<string> {
  const ffmpeg = findFfmpeg();
  if (!ffmpeg) return "Error: The microphone could not be recorded.";
  const device = pickAudioDevice(await audioDeviceNames(ffmpeg));
  if (!device) return "Error: No microphone was found.";
  const dest = path.join(os.tmpdir(), `fonia-mic-${Date.now()}.wav`);
  try {
    await execFileAsync(ffmpeg, [
      "-y", "-f", "dshow", "-i", `audio=${device}`,
      "-t", String(seconds),
      "-ac", "1", "-ar", "16000",
      dest,
    ], { timeout: (seconds + 15) * 1000, env: toolEnv() });
    if (!fs.existsSync(dest) || fs.statSync(dest).size < 1000) return "Error: The microphone recording was empty.";
    return heardLine(await transcribeFile(dest));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return `Error: The microphone could not be recorded. ${message.slice(0, 240)}`;
  } finally {
    fs.rmSync(dest, { force: true });
  }
}

async function transcribeFile(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) return `Error: Audio file not found: ${filePath}`;
  const whisper = findWhisper();
  if (!whisper?.command || !whisper.model) {
    return "Error: The speech model is not in the Fonia whisper folder, so the audio was not transcribed.";
  }
  try {
    const { stdout, stderr } = await execFileAsync(whisper.command, ["-m", whisper.model, "-f", filePath, "-nt", "-l", "en"], {
      timeout: 120_000,
      maxBuffer: 1_000_000,
      env: toolEnv(),
    });
    const text = cleanTranscript([stdout, stderr].map((part) => part?.trim()).filter(Boolean).join("\n"));
    return text || "The speech model returned no words.";
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return `Error: The speech model could not transcribe that file. ${message.slice(0, 300)}`;
  }
}

/** A drive letter D–Z, empty when the only removable drive should be used, or REFUSE. */
function ejectLetter(target: string): "" | "REFUSE" | string {
  const trimmed = target.trim().toLowerCase();
  if (!trimmed || /^(?:the\s+)?(?:usb|flash|thumb|pen|stick|drive|removable)(?:\s+drive)?$/.test(trimmed)) return "";
  if (/^(?:c:?|c\s+drive)$/.test(trimmed) || /\b(format|wipe|erase|delete|shutdown)\b/.test(trimmed)) return "REFUSE";
  const match = trimmed.match(/^([d-z]):?$/) || trimmed.match(/^drive\s+([d-z]):?$/) || trimmed.match(/^([d-z])\s+drive$/);
  return match ? match[1].toUpperCase() : "REFUSE";
}

/** Eject one DriveType 2 disk. Fixed disks, including C:, are never selected. */
function ejectScript(letter: string): string {
  const wanted = /^[D-Z]$/.test(letter) ? `'${letter}:'` : "''";
  return [
    "$ErrorActionPreference = 'Stop'",
    `$wanted = ${wanted}`,
    "$disks = @(Get-CimInstance Win32_LogicalDisk -Filter \"DriveType=2\" | Where-Object { $_.DeviceID -match '^[D-Z]:$' })",
    "if ($wanted) {",
    "  $chosen = @($disks | Where-Object { $_.DeviceID -eq $wanted })",
    "  if ($chosen.Count -eq 0) { Write-Output \"Error: $wanted is not a removable flash drive, so nothing was ejected.\"; return }",
    "} else {",
    "  if ($disks.Count -eq 0) { Write-Output 'No flash drive is mounted.'; return }",
    "  if ($disks.Count -gt 1) {",
    "    $names = ($disks | ForEach-Object { $_.DeviceID }) -join ', '",
    "    Write-Output \"More than one flash drive is mounted ($names). Name the letter, for example eject E:.\"",
    "    return",
    "  }",
    "  $chosen = $disks",
    "}",
    "$id = [string]$chosen[0].DeviceID",
    "if ($id -notmatch '^[D-Z]:$') { Write-Output 'Error: Only a removable flash drive can be ejected. A fixed disk was left alone.'; return }",
    "$shell = New-Object -ComObject Shell.Application",
    "$item = $shell.NameSpace(17).ParseName($id + [char]92)",
    "if (-not $item) { Write-Output \"Error: Windows could not find $id to eject.\"; return }",
    "$item.InvokeVerb('Eject')",
    "Write-Output \"Ejected $id.\"",
  ].join("\n");
}

/** Close up to four large user applications. The browser, editor, Fonia, and Ollama stay. */
export async function releaseExtraApps(): Promise<string> {
  const listed = await runPowerShell(
    "Get-Process | ForEach-Object { \"{0}|{1}|{2}\" -f $_.ProcessName, $_.Id, [math]::Round($_.WorkingSet64/1MB,0) }",
    20_000,
  );
  if (listed.startsWith("Error:")) return listed;
  const apps: RunningApp[] = [];
  for (const line of listed.split(/\r?\n/)) {
    const [name, pidText, memText] = line.split("|");
    const pid = Number(pidText);
    const memMB = Number(memText);
    if (!name || !Number.isFinite(pid) || !Number.isFinite(memMB)) continue;
    apps.push({ name: name.trim(), pid, memMB });
  }
  const chosen = appsToClose(apps, process.pid);
  if (!chosen.length) {
    return "No extra application was large enough to close. The browser, the editor, Fonia, and Ollama stay running.";
  }
  const ids = chosen.map((app) => app.pid).join(",");
  const stopped = await runPowerShell(
    `$ids = @(${ids}); foreach ($id in $ids) { $proc = Get-Process -Id $id -ErrorAction SilentlyContinue; if ($proc) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue; \"Closed: $($proc.ProcessName) pid=$id\" } }`,
    20_000,
  );
  const kept = "The browser, the editor, Fonia, and Ollama were left running.";
  return stopped.startsWith("Error:") ? `${stopped}\n${kept}` : `${stopped}\n${kept}`;
}

/** Run one PC action. The caller decides whether the user asked for it. */
export async function runComputerAction(action: string, target = ""): Promise<string> {
  if (!ACTIONS.has(action)) return `Error: Unknown computer action: ${action}`;
  if (action === "bluetooth_status" || action === "bluetooth_on" || action === "bluetooth_off") {
    const mode = action === "bluetooth_on" ? "on" : action === "bluetooth_off" ? "off" : "status";
    const result = await runPowerShell(bluetoothScript(mode));
    if (mode === "status" && result.startsWith("Error:")) {
      const devices = await runPowerShell("Get-PnpDevice -Class Bluetooth -ErrorAction SilentlyContinue | ForEach-Object { \"$($_.Status) $($_.FriendlyName)\" }");
      if (!devices.startsWith("Error:") && devices !== "(no output)") return `Bluetooth devices:\n${devices}`;
    }
    return result;
  }
  if (action === "firewall_status") {
    return runPowerShell("Get-NetFirewallProfile | ForEach-Object { \"$($_.Name)=$($_.Enabled)\" }");
  }
  if (action === "firewall_on" || action === "firewall_off") {
    const enabled = action === "firewall_on" ? "True" : "False";
    const changed = await runPowerShell(`Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled ${enabled}; Get-NetFirewallProfile | ForEach-Object { \"$($_.Name)=$($_.Enabled)\" }`);
    return changed.startsWith("Error:") ? changed : `Firewall profiles:\n${changed}`;
  }
  if (action === "process_status" || action === "service_status") {
    const name = safeName(target);
    if (!name) return "Error: Name the process or service with letters, numbers, dots, or dashes only.";
    if (action === "service_status") {
      return runPowerShell(`$svc = Get-Service -Name '${name}' -ErrorAction SilentlyContinue; if (-not $svc) { "Not found: ${name}" } else { "$($svc.Name) $($svc.Status)" }`);
    }
    return runPowerShell(`$procs = @(Get-Process -Name '${name}' -ErrorAction SilentlyContinue); if ($procs.Count -eq 0) { "Not running: ${name}" } else { $procs | ForEach-Object { "$($_.ProcessName) pid=$($_.Id) memMB=$([math]::Round($_.WorkingSet64/1MB,1))" } }`);
  }
  if (action === "disk_space") {
    return runPowerShell("Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | ForEach-Object { $free=[math]::Round($_.FreeSpace/1GB,1); $size=[math]::Round($_.Size/1GB,1); \"$($_.DeviceID) free ${free}GB of ${size}GB\" }");
  }
  if (action === "eject_drive") {
    const letter = ejectLetter(target);
    if (letter === "REFUSE") return "Error: Only a removable flash drive can be ejected. A fixed disk was left alone.";
    return runPowerShell(ejectScript(letter), 20_000, true);
  }
  if (action === "memory_status") {
    return runPowerShell("$os = Get-CimInstance Win32_OperatingSystem; $free=[math]::Round($os.FreePhysicalMemory/1MB,1); $total=[math]::Round($os.TotalVisibleMemorySize/1MB,1); \"Free ${free}GB of ${total}GB\"");
  }
  if (action === "wifi_status") {
    return runPowerShell("netsh wlan show interfaces");
  }
  if (action === "network_status") return runPowerShell(componentScript("network"), 40_000);
  if (action === "components_status") return runPowerShell(componentScript("all"), 45_000);
  if (action === "battery_status") return runPowerShell(componentScript("battery"), 30_000);
  if (action === "cpu_status") return runPowerShell(componentScript("cpu"), 30_000);
  if (action === "gpu_status") return runPowerShell(componentScript("gpu"), 30_000);
  if (action === "display_status") return runPowerShell(componentScript("display"), 30_000);
  if (action === "audio_status") return runPowerShell(componentScript("audio"), 30_000);
  if (action === "printers_status") return runPowerShell(componentScript("printers"), 30_000);
  if (action === "camera_status") return runPowerShell(componentScript("camera"), 30_000);
  if (action === "power_status") return runPowerShell(componentScript("power"), 30_000);
  if (action === "startup_status") return runPowerShell(componentScript("startup"), 30_000);
  if (action === "programs_status") return runPowerShell(componentScript("programs", target), 40_000);
  if (action === "devices_status") return runPowerShell(componentScript("devices"), 40_000);
  if (action === "volume_status" || action === "volume_set" || action === "volume_mute" || action === "volume_unmute") {
    return runPowerShell(volumeScript(action, target), 20_000);
  }
  if (action === "sleep") {
    return runPowerShell("Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class FoniaPower { [DllImport(\"PowrProf.dll\")] public static extern bool SetSuspendState(bool hibernate, bool forceCritical, bool disableWakeEvent); }'; [FoniaPower]::SetSuspendState($false, $false, $false) | Out-Null; 'Sleep requested.'");
  }
  if (action === "restart") {
    return runPowerShell("shutdown.exe /r /t 5 /c \"Fonia is restarting this PC because you asked.\"; 'Restart starts in 5 seconds. Cancel it with: shutdown /a'");
  }
  if (action === "shutdown") {
    return runPowerShell("shutdown.exe /s /t 5 /c \"Fonia is shutting down this PC because you asked.\"; 'Shutdown starts in 5 seconds. Cancel it with: shutdown /a'");
  }
  if (action === "process_stop") {
    const name = safeName(target);
    if (!name) return "Error: Name the process with letters, numbers, dots, or dashes only.";
    if (PROTECTED_PROCESSES.has(name.toLowerCase())) return `Error: ${name} stays running so Windows can keep working.`;
    return runPowerShell(`$procs = @(Get-Process -Name '${name}' -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne ${process.pid} }); if ($procs.Count -eq 0) { "Not running: ${name}" } else { $procs | Stop-Process -Force; "Stopped: ${name} count=$($procs.Count)" }`);
  }
  if (action === "service_start" || action === "service_stop") {
    const name = safeName(target);
    if (!name) return "Error: Name the service with letters, numbers, dots, or dashes only.";
    if (PROTECTED_SERVICES.has(name.toLowerCase())) return `Error: ${name} stays as it is so Windows can keep working.`;
    const verb = action === "service_start" ? "Start-Service" : "Stop-Service";
    return runPowerShell(`try { ${verb} -Name '${name}' -ErrorAction Stop; $svc = Get-Service -Name '${name}'; "$($svc.Name) $($svc.Status)" } catch { throw }`);
  }
  if (action === "microphone_off" || (action === "device_disable" && isMicrophoneTarget(target))) {
    return setMicrophone(true);
  }
  if (action === "microphone_on" || (action === "device_enable" && isMicrophoneTarget(target))) {
    return setMicrophone(false);
  }
  if (action === "device_enable" || action === "device_disable") {
    if (/^(keyboard|mouse|display|monitor|screen|disk|drive)$/i.test(target.trim())) {
      return `Error: ${target.trim()} stays available so this PC can still be used.`;
    }
    return runPowerShell(deviceScript(action === "device_enable", target), 40_000);
  }
  if (action === "screenshot") {
    const ffmpeg = findFfmpeg();
    if (!ffmpeg) return "Error: ffmpeg is not installed, so the screen cannot be captured.";
    const dest = path.join(os.tmpdir(), `ollama-ui-shot-${Date.now()}.jpg`);
    try {
      await execFileAsync(ffmpeg, ["-y", "-f", "gdigrab", "-framerate", "1", "-i", "desktop", "-frames:v", "1", "-vf", "scale=1280:-1", dest], {
        timeout: 20_000,
        env: toolEnv(),
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return `Error: Could not capture the screen. ${message.slice(0, 300)}`;
    }
    if (!fs.existsSync(dest)) return "Error: The screenshot file was not created.";
    return `Screenshot: ${dest}`;
  }
  if (action === "speak") {
    const spoken = target.replace(/[^\x20-\x7E]/g, " ").trim().slice(0, 300);
    if (!spoken) return "Error: There is nothing to say.";
    const safe = spoken.replace(/'/g, "''");
    const result = await runPowerShell(`Add-Type -AssemblyName System.Speech; $voice = New-Object System.Speech.Synthesis.SpeechSynthesizer; $voice.Speak('${safe}'); 'Spoke.'`);
    return result.startsWith("Error:") ? result : "Spoke.";
  }
  if (action === "brightness_status" || action === "brightness_up" || action === "brightness_down" || action === "brightness_set") {
    const mode = action === "brightness_status" ? "status" : action.replace("brightness_", "");
    return runPowerShell(brightnessScript(mode, target), 25_000);
  }
  if (action === "theme_status" || action === "theme_dark" || action === "theme_light") {
    const mode = action === "theme_dark" ? "dark" : action === "theme_light" ? "light" : "status";
    return runPowerShell(themeScript(mode));
  }
  if (action === "defaults_status" || action === "defaults_open") {
    return runPowerShell(defaultsScript(action === "defaults_open"));
  }
  if (action === "windows_update_status" || action === "windows_update_scan" || action === "windows_update_install") {
    const mode = action === "windows_update_scan" ? "scan" : action === "windows_update_install" ? "install" : "status";
    const timeout = mode === "status" ? 30_000 : 120_000;
    return runPowerShell(updatesScript(mode), timeout);
  }
  if (action === "clipboard_read") {
    const raw = await runPowerShell(clipboardScript(), 15_000, true);
    if (raw === "Clipboard: empty" || raw.startsWith("Error:")) return raw;
    const clipped = raw.slice(0, 2000);
    const shortened = raw.length > 2000 ? "\nClipboard text was shortened." : "";
    return `Clipboard:\n${clipped}${shortened}`;
  }
  if (action === "ui_type" || action === "ui_click") {
    return runPowerShell(uiScript(action === "ui_type" ? "type" : "click", target), 20_000, true);
  }
  if (action === "listen") {
    const seconds = Math.min(30, Math.max(6, Number(target) || 12));
    const heard = await runPowerShell(listenScript(seconds), (seconds + 25) * 1000);
    if (speechEngineFailed(heard)) {
      if (!readFoniaSettings().whisperFallback) return "The speech recognizer failed. Whisper fallback is off in Settings.";
      return captureMicrophone(Math.min(seconds, 10));
    }
    return heard;
  }
  return transcribeFile(target.trim().replace(/^["']|["']$/g, ""));
}

function componentScript(section: string, filter = ""): string {
  const allowed = new Set(["all", "os", "cpu", "battery", "gpu", "display", "audio", "network", "printers", "camera", "power", "startup", "programs", "devices"]);
  const want = allowed.has(section) ? section : "all";
  const safeFilter = filter.replace(/[^A-Za-z0-9 ._-]/g, "").slice(0, 40);
  return [
    "$ErrorActionPreference = 'Continue'",
    `$want = '${want}'`,
    `$filter = '${safeFilter.replace(/'/g, "")}'`,
    "function Keep($name) { $want -eq 'all' -or $want -eq $name }",
    "if (Keep 'os') { $os = Get-CimInstance Win32_OperatingSystem; $cs = Get-CimInstance Win32_ComputerSystem; \"OS: $($os.Caption) $($os.Version)\"; \"PC: $($cs.Manufacturer) $($cs.Model)\"; \"UptimeHours: $([math]::Round(((Get-Date) - $os.LastBootUpTime).TotalHours, 1))\" }",
    "if (Keep 'cpu') { $cpu = Get-CimInstance Win32_Processor | Select-Object -First 1; \"CPU: $($cpu.Name) cores=$($cpu.NumberOfCores) load=$($cpu.LoadPercentage)%\" }",
    "if (Keep 'os' -or (Keep 'battery') -or $want -eq 'all') { if ($want -eq 'all' -or $want -eq 'os') { $mem = Get-CimInstance Win32_OperatingSystem; $free=[math]::Round($mem.FreePhysicalMemory/1MB,1); $total=[math]::Round($mem.TotalVisibleMemorySize/1MB,1); \"Memory: free $($free)GB of $($total)GB\" } }",
    "if (Keep 'battery') { $batts = @(Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue); $chargeWords = @{1='discharging';2='on AC';3='fully charged';4='low';5='critical';6='charging'}; if ($batts.Count -eq 0) { 'Battery: no battery reported' } else { $batts | ForEach-Object { $word = $chargeWords[[int]$_.BatteryStatus]; if (-not $word) { $word = $_.BatteryStatus }; \"Battery: charge=$($_.EstimatedChargeRemaining)% $word\" } } }",
    "if ((Keep 'gpu') -or (Keep 'display')) { Get-CimInstance Win32_VideoController | ForEach-Object { \"GPU: $($_.Name) screen=$($_.CurrentHorizontalResolution)x$($_.CurrentVerticalResolution)\" } }",
    "if ($want -eq 'all') { Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | ForEach-Object { $freeD=[math]::Round($_.FreeSpace/1GB,1); $sizeD=[math]::Round($_.Size/1GB,1); \"Disk: $($_.DeviceID) free $($freeD)GB of $($sizeD)GB\" } }",
    "if (Keep 'audio') { Get-CimInstance Win32_SoundDevice | Select-Object -First 6 | ForEach-Object { \"Audio: $($_.Status) $($_.Name)\" } }",
    "if (Keep 'network') { $names = @{0='disconnected';1='connecting';2='connected';3='disconnecting';4='hardware missing';5='hardware disabled';6='hardware problem';7='media disconnected'}; Get-CimInstance Win32_NetworkAdapter -Filter 'PhysicalAdapter=True' | Where-Object { $null -ne $_.NetConnectionStatus } | Select-Object -First 8 | ForEach-Object { $label = $names[[int]$_.NetConnectionStatus]; if (-not $label) { $label = $_.NetConnectionStatus }; \"Network: $($_.Name) $label\" } }",
    "if (Keep 'printers') { $printers = @(Get-CimInstance Win32_Printer -ErrorAction SilentlyContinue | Select-Object -First 8); if ($printers.Count -eq 0) { 'Printers: none' } else { $printers | ForEach-Object { \"Printer: $($_.Name) default=$($_.Default)\" } } }",
    "if (Keep 'camera') { $cams = @(Get-PnpDevice -Class Camera -ErrorAction SilentlyContinue | Select-Object -First 6); if ($cams.Count -eq 0) { 'Camera: none reported' } else { $cams | ForEach-Object { \"Camera: $($_.Status) $($_.FriendlyName)\" } } }",
    "if (Keep 'power') { $scheme = (powercfg /getactivescheme) -join ' '; \"Power: $scheme\" }",
    "if ($want -eq 'all') { Get-PnpDevice -Class Bluetooth -ErrorAction SilentlyContinue | Select-Object -First 5 | ForEach-Object { \"BluetoothDevice: $($_.Status) $($_.FriendlyName)\" } }",
    "if (Keep 'startup') { Get-CimInstance Win32_StartupCommand -ErrorAction SilentlyContinue | Select-Object -First 15 | ForEach-Object { \"Startup: $($_.Name) :: $($_.Command)\" } }",
    "if (Keep 'programs') { $roots = 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'; $apps = Get-ItemProperty $roots -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -and (-not $filter -or $_.DisplayName -like \"*$filter*\") } | Select-Object -First 25 DisplayName, DisplayVersion; if (-not $apps) { 'Programs: none matched' } else { $apps | ForEach-Object { \"Program: $($_.DisplayName) $($_.DisplayVersion)\" } } }",
    "if (Keep 'devices') { foreach ($class in @('Keyboard','Mouse','Camera','Media','USB','Display')) { $rows = @(Get-PnpDevice -Class $class -ErrorAction SilentlyContinue | Where-Object { $_.Status -match 'OK|Unknown|Error|Degraded' }); $sample = ($rows | Select-Object -First 2 | ForEach-Object { \"$($_.Status) $($_.FriendlyName)\" }) -join ', '; \"DeviceClass: $class count=$($rows.Count) sample=$sample\" } }",
  ].join("\n");
}

function volumeScript(action: string, target: string): string {
  const level = Math.min(100, Math.max(0, Number(target) || 0));
  const mode = action === "volume_set" ? "set" : action === "volume_mute" ? "mute" : action === "volume_unmute" ? "unmute" : "status";
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -TypeDefinition @'",
    "using System;",
    "using System.Runtime.InteropServices;",
    "[Guid(\"5CDF2C82-841E-4546-9722-0CF74078229A\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IAudioEndpointVolume {",
    "  int RegisterControlChangeNotify(IntPtr client);",
    "  int UnregisterControlChangeNotify(IntPtr client);",
    "  int GetChannelCount(out uint count);",
    "  int SetMasterVolumeLevel(float level, Guid ctx);",
    "  int SetMasterVolumeLevelScalar(float level, Guid ctx);",
    "  int GetMasterVolumeLevel(out float level);",
    "  int GetMasterVolumeLevelScalar(out float level);",
    "  int SetChannelVolumeLevel(uint channel, float level, Guid ctx);",
    "  int SetChannelVolumeLevelScalar(uint channel, float level, Guid ctx);",
    "  int GetChannelVolumeLevel(uint channel, out float level);",
    "  int GetChannelVolumeLevelScalar(uint channel, out float level);",
    "  int SetMute([MarshalAs(UnmanagedType.Bool)] bool mute, Guid ctx);",
    "  int GetMute(out bool mute);",
    "}",
    "[Guid(\"D666063F-1587-4E43-81F1-B948E807363F\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IMMDevice { int Activate(ref Guid id, int clsCtx, IntPtr activationParams, [MarshalAs(UnmanagedType.IUnknown)] out object pointer); }",
    "[Guid(\"A95664D2-9614-4F35-A746-DE8DB63617E6\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IMMDeviceEnumerator { int EnumAudioEndpoints(int dataFlow, int stateMask, out IntPtr devices); int GetDefaultAudioEndpoint(int dataFlow, int role, out IMMDevice endpoint); }",
    "[ComImport, Guid(\"BCDE0395-E52F-467C-8E3D-C4579291692E\")] class MMDeviceEnumeratorComObject { }",
    "public class Speaker {",
    "  static IAudioEndpointVolume Volume() {",
    "    var enumerator = (IMMDeviceEnumerator)new MMDeviceEnumeratorComObject();",
    "    IMMDevice device; enumerator.GetDefaultAudioEndpoint(0, 1, out device);",
    "    var iid = typeof(IAudioEndpointVolume).GUID; object pointer;",
    "    device.Activate(ref iid, 23, IntPtr.Zero, out pointer);",
    "    return (IAudioEndpointVolume)pointer;",
    "  }",
    "  public static string Read() { float level; bool mute; var v = Volume(); v.GetMasterVolumeLevelScalar(out level); v.GetMute(out mute); return \"volume=\" + Math.Round(level * 100) + \" mute=\" + mute; }",
    `  public static string Apply(string mode, int level) { var v = Volume(); var ctx = Guid.Empty; if (mode == "mute") v.SetMute(true, ctx); else if (mode == "unmute") v.SetMute(false, ctx); else if (mode == "set") v.SetMasterVolumeLevelScalar(level / 100f, ctx); return Read(); }`,
    "}",
    "'@",
    `[Speaker]::Apply('${mode}', ${level})`,
  ].join("\n");
}

function isMicrophoneTarget(target: string): boolean {
  return /^(microphone|mic)$/i.test(target.trim());
}

function quietFoniaMic(): void {
  try {
    writeFoniaSettings({ micMode: "push" });
    applyMicMode("push");
  } catch {
    // The Windows mute still runs when the settings file cannot be saved.
  }
}

async function setMicrophone(off: boolean): Promise<string> {
  if (off) quietFoniaMic();
  return runPowerShell(microphoneScript(off), 25_000);
}

function microphoneScript(off: boolean): string {
  const mode = off ? "mute" : "unmute";
  const consent = off ? "Deny" : "Allow";
  const applyLine = "    try { $parts += [MicCapture]::Apply('" + mode + "', $role) } catch { $parts += ('role' + $role + '=' + $_.Exception.Message) }";
  return [
    "$ErrorActionPreference = 'Continue'",
    "$consent = '" + consent + "'",
    "$roots = @(",
    "  'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone',",
    "  'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\CapabilityAccessManager\\ConsentStore\\microphone\\NonPackaged'",
    ")",
    "foreach ($root in $roots) {",
    "  if (-not (Test-Path -LiteralPath $root)) { New-Item -Path $root -Force | Out-Null }",
    "  New-ItemProperty -LiteralPath $root -Name Value -Value $consent -PropertyType String -Force | Out-Null",
    "}",
    "$consentNow = (Get-ItemProperty -LiteralPath $roots[0] -Name Value -ErrorAction SilentlyContinue).Value",
    "$parts = @()",
    "try {",
    "  Add-Type -TypeDefinition @'",
    "using System;",
    "using System.Runtime.InteropServices;",
    "[Guid(\"5CDF2C82-841E-4546-9722-0CF74078229A\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IAudioEndpointVolume {",
    "  int RegisterControlChangeNotify(IntPtr client);",
    "  int UnregisterControlChangeNotify(IntPtr client);",
    "  int GetChannelCount(out uint count);",
    "  int SetMasterVolumeLevel(float level, Guid ctx);",
    "  int SetMasterVolumeLevelScalar(float level, Guid ctx);",
    "  int GetMasterVolumeLevel(out float level);",
    "  int GetMasterVolumeLevelScalar(out float level);",
    "  int SetChannelVolumeLevel(uint channel, float level, Guid ctx);",
    "  int SetChannelVolumeLevelScalar(uint channel, float level, Guid ctx);",
    "  int GetChannelVolumeLevel(uint channel, out float level);",
    "  int GetChannelVolumeLevelScalar(uint channel, out float level);",
    "  int SetMute([MarshalAs(UnmanagedType.Bool)] bool mute, Guid ctx);",
    "  int GetMute(out bool mute);",
    "}",
    "[Guid(\"D666063F-1587-4E43-81F1-B948E807363F\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IMMDevice { int Activate(ref Guid id, int clsCtx, IntPtr activationParams, [MarshalAs(UnmanagedType.IUnknown)] out object pointer); }",
    "[Guid(\"A95664D2-9614-4F35-A746-DE8DB63617E6\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
    "interface IMMDeviceEnumerator { int EnumAudioEndpoints(int dataFlow, int stateMask, out IntPtr devices); int GetDefaultAudioEndpoint(int dataFlow, int role, out IMMDevice endpoint); }",
    "[ComImport, Guid(\"BCDE0395-E52F-467C-8E3D-C4579291692E\")] class MMDeviceEnumeratorComObject { }",
    "public class MicCapture {",
    "  static IAudioEndpointVolume Volume(int role) {",
    "    var enumerator = (IMMDeviceEnumerator)new MMDeviceEnumeratorComObject();",
    "    IMMDevice device; enumerator.GetDefaultAudioEndpoint(1, role, out device);",
    "    var iid = typeof(IAudioEndpointVolume).GUID; object pointer;",
    "    device.Activate(ref iid, 23, IntPtr.Zero, out pointer);",
    "    return (IAudioEndpointVolume)pointer;",
    "  }",
    "  static string Read(IAudioEndpointVolume v) { float level; bool mute; v.GetMasterVolumeLevelScalar(out level); v.GetMute(out mute); return \"muted=\" + mute + \" level=\" + Math.Round(level * 100); }",
    "  public static string Apply(string mode, int role) { var v = Volume(role); var ctx = Guid.Empty; if (mode == \"mute\") { v.SetMute(true, ctx); v.SetMasterVolumeLevelScalar(0f, ctx); } else if (mode == \"unmute\") { v.SetMute(false, ctx); } return Read(v); }",
    "}",
    "'@",
    "} catch {",
    "  $parts += ('Error: capture endpoint ' + $_.Exception.Message)",
    "}",
    "if ($parts.Count -eq 0) {",
    "  foreach ($role in 1,2) {",
    applyLine,
    "  }",
    "}",
    "$capture = $parts -join ' | '",
    "Write-Output ('Microphone: ' + $capture + ' consent=' + $consentNow)",
    "exit 0",
  ].join("\n");
}

function deviceScript(enable: boolean, query: string): string {
  const safe = query.replace(/[^A-Za-z0-9 ._()/-]/g, "").trim().slice(0, 80);
  if (!safe) return "Write-Output 'Error: Name the device.'";
  const verb = enable ? "Enable-PnpDevice" : "Disable-PnpDevice";
  const done = enable ? "Enabled" : "Disabled";
  return [
    "$ErrorActionPreference = 'Continue'",
    `$q = '${safe.replace(/'/g, "")}'`,
    "$blocked = @('Keyboard','Mouse','Display','Computer','DiskDrive','HDC','SCSIAdapter','System')",
    "$found = @(Get-PnpDevice -ErrorAction SilentlyContinue | Where-Object { $_.FriendlyName -and ($_.FriendlyName -like \"*$q*\" -or $_.Class -eq $q) })",
    "if ($found.Count -eq 0) { \"No device matched: $q\"; exit 0 }",
    "$bad = @($found | Where-Object { $blocked -contains $_.Class })",
    "if ($bad.Count -gt 0) { \"Refused: $($bad[0].FriendlyName) is a $($bad[0].Class) device and stays available.\"; exit 0 }",
    "if ($found.Count -gt 3) { $list = ($found | Select-Object -First 8 | ForEach-Object { $_.FriendlyName }) -join ', '; \"Too many devices. Name one of: $list\"; exit 0 }",
    `foreach ($device in $found) { try { ${verb} -InstanceId $device.InstanceId -Confirm:$false -ErrorAction Stop; "${done}: $($device.FriendlyName)" } catch { "Error: $($device.FriendlyName) $($_.Exception.Message)" } }`,
  ].join("\n");
}

function listenScript(seconds: number): string {
  const initial = Math.min(30, Math.max(6, Math.round(seconds)));
  const babble = initial >= 12 ? 8 : 3;
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.Speech",
    "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
    "$engine.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))",
    "$engine.SetInputToDefaultAudioDevice()",
    `$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(${initial})`,
    `$engine.BabbleTimeout = [TimeSpan]::FromSeconds(${babble})`,
    "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(2)",
    "$result = $engine.Recognize()",
    "if ($null -eq $result -or [string]::IsNullOrWhiteSpace($result.Text)) { 'No speech recognized.' } else { \"Heard: $($result.Text)\" }",
    "$engine.Dispose()",
  ].join("; ");
}
