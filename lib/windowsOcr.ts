import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs";
import os from "os";
import path from "path";

const execFileAsync = promisify(execFile);

function powershell(script: string, timeout: number): Promise<string> {
  const file = path.join(os.tmpdir(), `fonia-ocr-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);
  fs.writeFileSync(file, `$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)\n${script}`, "utf8");
  return execFileAsync("powershell.exe", ["-NoProfile", "-STA", "-NonInteractive", "-ExecutionPolicy", "Bypass", "-File", file], {
    timeout,
    maxBuffer: 2_000_000,
  }).then(({ stdout, stderr }) => [stdout, stderr].map((part) => part?.trim()).filter(Boolean).join("\n") || "(no output)")
    .catch((error: { stdout?: string; stderr?: string; message?: string }) => {
      const detail = [error.stdout, error.stderr].map((part) => part?.trim()).filter(Boolean).join("\n");
      return `Error: ${detail || error.message || "Windows OCR failed"}`.slice(0, 800);
    })
    .finally(() => {
      try { fs.unlinkSync(file); } catch { /* the temp script is already gone */ }
    });
}

function ocrSetup(targetPath: string): string[] {
  const safe = targetPath.replace(/'/g, "''");
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName System.Runtime.WindowsRuntime",
    "$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]",
    "function Await($Operation, $Type) { $task = $asTask.MakeGenericMethod($Type).Invoke($null, @($Operation)); $task.Wait(-1) | Out-Null; if ($task.IsFaulted) { throw $task.Exception.InnerException }; $task.Result }",
    "$null = [Windows.Storage.StorageFile,Windows.Storage,ContentType=WindowsRuntime]",
    "$null = [Windows.Graphics.Imaging.BitmapDecoder,Windows.Graphics.Imaging,ContentType=WindowsRuntime]",
    "$null = [Windows.Media.Ocr.OcrEngine,Windows.Foundation,ContentType=WindowsRuntime]",
    "$null = [Windows.Graphics.Imaging.SoftwareBitmap,Windows.Foundation,ContentType=WindowsRuntime]",
    `$path = '${safe}'`,
    "$file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])",
  ];
}

function recognizeImage(variable: string): string[] {
  return [
    `$stream = Await (${variable}.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])`,
    "$decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])",
    "$bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])",
    "$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()",
    "if ($null -eq $engine) { 'Error: Windows OCR has no language pack installed.'; exit 0 }",
    "$recognized = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])",
    "if ([string]::IsNullOrWhiteSpace($recognized.Text)) { 'OCR: no text' } else { $recognized.Text }",
  ];
}

/** Read words from a picture with the Windows OCR engine. */
export function ocrImageFile(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) return Promise.resolve(`Error: File not found: ${filePath}`);
  const script = [...ocrSetup(filePath), ...recognizeImage("$file")].join("\n");
  return powershell(script, 40_000);
}

/** Render up to three PDF pages with the built-in Windows PDF reader, then OCR them. */
export function ocrPdfFile(filePath: string): Promise<string> {
  if (!fs.existsSync(filePath)) return Promise.resolve(`Error: File not found: ${filePath}`);
  const script = [
    ...ocrSetup(filePath),
    "$null = [Windows.Data.Pdf.PdfDocument,Windows.Data.Pdf,ContentType=WindowsRuntime]",
    "$null = [Windows.Storage.Streams.InMemoryRandomAccessStream,Windows.Storage.Streams,ContentType=WindowsRuntime]",
    "$asAction = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and -not $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' })[0]",
    "function AwaitAction($Operation) { $task = $asAction.Invoke($null, @($Operation)); $task.Wait(-1) | Out-Null; if ($task.IsFaulted) { throw $task.Exception.InnerException } }",
    "$pdf = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])",
    "$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()",
    "if ($null -eq $engine) { 'Error: Windows OCR has no language pack installed.'; exit 0 }",
    "$pages = [Math]::Min(3, [int]$pdf.PageCount)",
    "$texts = @()",
    "for ($index = 0; $index -lt $pages; $index++) {",
    "  $page = $pdf.GetPage($index)",
    "  $memory = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream",
    "  AwaitAction ($page.RenderToStreamAsync($memory))",
    "  $memory.Seek(0)",
    "  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($memory)) ([Windows.Graphics.Imaging.BitmapDecoder])",
    "  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])",
    "  $recognized = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])",
    "  if (-not [string]::IsNullOrWhiteSpace($recognized.Text)) { $texts += $recognized.Text }",
    "}",
    "if ($texts.Count -eq 0) { 'OCR: no text' } else { $texts -join \"`n\" }",
  ].join("\n");
  return powershell(script, 60_000);
}
