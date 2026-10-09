import { execFile } from "child_process";
import { strict as assert } from "node:assert";
import fs from "fs";
import os from "os";
import path from "path";
import { promisify } from "util";
import zlib from "zlib";
import { test } from "node:test";
import { extractDocxXml, extractPdfText, extractPptxXml, frameIntervalSeconds, parseAppRequest, readDocxFile, readPptxFile, resolveInstalledApp, videoIntervalFromText, videoPathFromText } from "../lib/mediaTasks";

const execFileAsync = promisify(execFile);

test("a video interval stays between half a second and ten seconds", () => {
  assert.equal(frameIntervalSeconds("2"), 2);
  assert.equal(frameIntervalSeconds(0.1), 0.5);
  assert.equal(frameIntervalSeconds(40), 10);
  assert.equal(frameIntervalSeconds("nope", 1), 1);
  assert.equal(videoIntervalFromText("look at every 3 seconds"), 3);
});

test("a video path is read from the attachment line", () => {
  assert.equal(videoPathFromText("please watch\nVideo: C:\\clips\\demo.mp4"), "C:\\clips\\demo.mp4");
  assert.equal(videoPathFromText("describe C:\\clips\\demo.mp4 for me"), "C:\\clips\\demo.mp4");
});

test("documents and app names are checked before a model sees them", () => {
  assert.equal(extractDocxXml("<w:p><w:t>Hello</w:t></w:p><w:p><w:t>there</w:t></w:p>"), "Hello\nthere");
  assert.match(extractPptxXml("<a:p><a:t>Slide</a:t></a:p>"), /Slide/);
  const pdf = Buffer.from("BT (Hello project) Tj ET", "latin1");
  assert.match(extractPdfText(pdf), /Hello project/);
  const compressed = zlib.deflateSync(Buffer.from("BT (Inflated page) Tj ET", "latin1"));
  const wrapped = Buffer.concat([
    Buffer.from("stream\n", "latin1"),
    compressed,
    Buffer.from("\nendstream", "latin1"),
  ]);
  assert.match(extractPdfText(wrapped), /Inflated page/);
  assert.equal(parseAppRequest("blender").ok, true);
  assert.equal(parseAppRequest("notepad & shutdown").ok, false);
  assert.equal(resolveInstalledApp("notepad"), "notepad");
  const blender = resolveInstalledApp("blender");
  assert.equal(blender === "blender" || blender.toLowerCase().endsWith("blender.exe"), true);
});

test("docx and pptx text is read from the office zip", async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ollama-ui-office-"));
  const docx = path.join(dir, "note.docx");
  const pptx = path.join(dir, "deck.pptx");
  const script = `
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
function Write-Zip($dest, $entryName, $xml) {
  $fs = [System.IO.File]::Open($dest, 'Create')
  $zip = New-Object System.IO.Compression.ZipArchive($fs, [System.IO.Compression.ZipArchiveMode]::Create)
  $entry = $zip.CreateEntry($entryName)
  $writer = New-Object System.IO.StreamWriter($entry.Open())
  $writer.Write($xml)
  $writer.Dispose()
  $zip.Dispose()
  $fs.Dispose()
}
Write-Zip '${docx.replace(/'/g, "''")}' 'word/document.xml' '<w:document><w:p><w:t>Hello doc</w:t></w:p></w:document>'
Write-Zip '${pptx.replace(/'/g, "''")}' 'ppt/slides/slide1.xml' '<p:sld><a:p><a:t>Hello slide</a:t></a:p></p:sld>'
`;
  await execFileAsync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", script]);
  assert.match(await readDocxFile(docx), /Hello doc/);
  assert.match(await readPptxFile(pptx), /Hello slide/);
  fs.rmSync(dir, { recursive: true, force: true });
});
