import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { extractPdfText, readDocxFile, readPptxFile } from "@/lib/mediaTasks";
import { ocrPdfFile } from "@/lib/windowsOcr";
import os from "os";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_DOC_SIZE = 500 * 1024; // 500 KB
const MAX_OFFICE_SIZE = 20 * 1024 * 1024;
const MAX_VIDEO_SIZE = 200 * 1024 * 1024;
const VIDEO_EXTS = new Set([".mp4", ".webm", ".mov", ".mkv"]);
const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime", "video/x-matroska"]);

function saveUpload(buffer: Buffer, ext: string): string {
  const dir = path.join(process.cwd(), ".data", "uploads");
  fs.mkdirSync(dir, { recursive: true });
  const safeExt = /^\.[a-z0-9]+$/i.test(ext) ? ext.toLowerCase() : ".bin";
  const dest = path.join(dir, `${Date.now()}-${Math.random().toString(16).slice(2)}${safeExt}`);
  fs.writeFileSync(dest, buffer);
  return dest;
}

const IMAGE_TYPES = new Set(["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp"]);
const DOC_TEXT_TYPES = new Set([
  "text/plain", "text/markdown", "text/csv",
  "application/json", "application/xml", "text/html",
]);

// Text-extractable extensions (fallback when MIME is octet-stream)
const TEXT_EXTS = new Set([
  ".txt", ".md", ".mdx", ".json", ".csv", ".xml", ".html",
  ".ts", ".tsx", ".js", ".jsx", ".py", ".rs", ".go",
  ".css", ".scss", ".yaml", ".yml", ".toml", ".sh", ".sql",
]);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const mimeType = file.type || "application/octet-stream";
    const fileName = file.name || "unknown";
    const ext = ("." + fileName.split(".").pop()).toLowerCase();

    // ── Image ──────────────────────────────────────────────────────────────
    if (IMAGE_TYPES.has(mimeType)) {
      if (file.size > MAX_IMAGE_SIZE) {
        return NextResponse.json({ error: "Image too large (max 10 MB)" }, { status: 413 });
      }
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");
      // Return pure base64 (no data URI) — Ollama expects plain base64
      return NextResponse.json({
        type: "image",
        name: fileName,
        mimeType,
        base64,
        // Also provide data URI for preview in UI
        dataUrl: `data:${mimeType};base64,${base64}`,
      });
    }

    const bytes = async () => Buffer.from(await file.arrayBuffer());

    if (VIDEO_EXTS.has(ext) || VIDEO_TYPES.has(mimeType)) {
      if (file.size > MAX_VIDEO_SIZE) {
        return NextResponse.json({ error: "Video too large (max 200 MB)" }, { status: 413 });
      }
      const saved = saveUpload(await bytes(), VIDEO_EXTS.has(ext) ? ext : ".mp4");
      return NextResponse.json({ type: "video", name: fileName, ext: ext || ".mp4", path: saved });
    }

    if (ext === ".pdf" || mimeType === "application/pdf") {
      if (file.size > MAX_OFFICE_SIZE) {
        return NextResponse.json({ error: "PDF too large (max 20 MB)" }, { status: 413 });
      }
      const raw = await bytes();
      const text = extractPdfText(raw);
      let content = text;
      if (!text.trim()) {
        const saved = path.join(os.tmpdir(), `fonia-scan-${Date.now()}.pdf`);
        fs.writeFileSync(saved, raw);
        try {
          const ocr = await ocrPdfFile(saved);
          content = !ocr.startsWith("Error:") && ocr !== "OCR: no text"
            ? ocr
            : ocr === "OCR: no text"
              ? `No words were found in ${fileName}.`
              : ocr;
        } finally {
          try { fs.unlinkSync(saved); } catch { /* temp pdf already removed */ }
        }
      }
      return NextResponse.json({
        type: "document",
        name: fileName,
        ext: ".pdf",
        content,
      });
    }

    if (ext === ".pptx" || mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
      if (file.size > MAX_OFFICE_SIZE) {
        return NextResponse.json({ error: "Presentation too large (max 20 MB)" }, { status: 413 });
      }
      const saved = saveUpload(await bytes(), ".pptx");
      try {
        const text = await readPptxFile(saved);
        return NextResponse.json({
          type: "document",
          name: fileName,
          ext: ".pptx",
          content: text || `No text found in ${fileName}.`,
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
          type: "document",
          name: fileName,
          ext: ".pptx",
          content: `Could not read ${fileName}. ${message}`,
        });
      }
    }

    if (ext === ".docx" || mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      if (file.size > MAX_OFFICE_SIZE) {
        return NextResponse.json({ error: "Document too large (max 20 MB)" }, { status: 413 });
      }
      const saved = saveUpload(await bytes(), ".docx");
      try {
        const text = await readDocxFile(saved);
        return NextResponse.json({
          type: "document",
          name: fileName,
          ext: ".docx",
          content: text || `No text found in ${fileName}.`,
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        return NextResponse.json({
          type: "document",
          name: fileName,
          ext: ".docx",
          content: `Could not read ${fileName}. ${message}`,
        });
      }
    }

    // ── Document / text file ───────────────────────────────────────────────
    const isTextMime = DOC_TEXT_TYPES.has(mimeType);
    const isTextExt = TEXT_EXTS.has(ext);

    if (isTextMime || isTextExt || mimeType === "application/octet-stream") {
      if (file.size > MAX_DOC_SIZE) {
        return NextResponse.json({ error: "Document too large (max 500 KB)" }, { status: 413 });
      }
      try {
        const text = await file.text();
        return NextResponse.json({
          type: "document",
          name: fileName,
          ext,
          content: text,
        });
      } catch {
        return NextResponse.json(
          { error: "Could not read file as text" },
          { status: 415 }
        );
      }
    }

    return NextResponse.json(
      { error: `Unsupported file type: ${mimeType}` },
      { status: 415 }
    );
  } catch (err) {
    console.error("[upload]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
