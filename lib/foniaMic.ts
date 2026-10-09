import { spawn, type ChildProcess } from "child_process";
import fs from "fs";
import os from "os";
import path from "path";
import type { MicMode } from "./foniaSettings";

let child: ChildProcess | null = null;
let mode: MicMode = "push";
let scriptPath = "";
const heard: string[] = [];

export function micStatus(): { mode: MicMode; running: boolean } {
  return { mode, running: Boolean(child && child.exitCode === null && !child.killed) };
}

export function stopMic(): void {
  if (child && child.exitCode === null) child.kill();
  child = null;
  if (scriptPath) fs.rmSync(scriptPath, { force: true });
  scriptPath = "";
}

export function takeHeard(): string[] {
  const lines = heard.splice(0, heard.length).map((line) => line.trim()).filter(Boolean);
  return lines.slice(-1);
}

/** Push-to-listen leaves the microphone off. Wake and open start Windows speech. */
export function applyMicMode(next: MicMode): void {
  if (next === mode && (next === "push" || micStatus().running)) return;
  stopMic();
  mode = next;
  if (next === "push") return;
  scriptPath = path.join(os.tmpdir(), `fonia-mic-${Date.now()}.ps1`);
  fs.writeFileSync(scriptPath, next === "wake" ? wakeScript() : openScript(), "utf8");
  child = spawn(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", scriptPath],
    { stdio: ["ignore", "pipe", "pipe"], windowsHide: true }
  );
  let buffer = "";
  child.stdout?.setEncoding("utf8");
  child.stdout?.on("data", (chunk: string) => {
    buffer += chunk;
    const lines = buffer.split(/\r?\n/);
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const text = line.trim();
      if (text.startsWith("Heard:")) heard.push(text.slice("Heard:".length).trim());
    }
  });
  child.on("exit", () => {
    child = null;
  });
}

function openScript(): string {
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.Speech",
    "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
    "$engine.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))",
    "$engine.SetInputToDefaultAudioDevice()",
    "$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(8)",
    "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(1)",
    "while ($true) {",
    "  $result = $engine.Recognize()",
    "  if ($result -and -not [string]::IsNullOrWhiteSpace($result.Text)) { \"Heard: $($result.Text)\" }",
    "}",
  ].join("\n");
}

function wakeScript(): string {
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.Speech",
    "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
    "$engine.SetInputToDefaultAudioDevice()",
    "$wakeChoices = New-Object System.Speech.Recognition.Choices",
    "$wakeChoices.Add('fonia')",
    "$wake = New-Object System.Speech.Recognition.Grammar((New-Object System.Speech.Recognition.GrammarBuilder($wakeChoices)))",
    "$dictation = New-Object System.Speech.Recognition.DictationGrammar",
    "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(1)",
    "$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(12)",
    "while ($true) {",
    "  $engine.UnloadAllGrammars()",
    "  $engine.LoadGrammar($wake)",
    "  $spotted = $engine.Recognize()",
    "  if (-not $spotted -or $spotted.Text -notmatch 'fonia') { continue }",
    "  $engine.UnloadAllGrammars()",
    "  $engine.LoadGrammar($dictation)",
    "  $command = $engine.Recognize()",
    "  if ($command -and -not [string]::IsNullOrWhiteSpace($command.Text)) { \"Heard: $($command.Text)\" }",
    "}",
  ].join("\n");
}
