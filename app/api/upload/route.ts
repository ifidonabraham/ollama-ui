import { NextRequest, NextResponse } from "next/server";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_DOC_SIZE = 500 * 1024; // 500 KB

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

    // ── PDF — basic text extraction (read as binary, return placeholder) ──
    if (mimeType === "application/pdf") {
      return NextResponse.json({
        type: "document",
        name: fileName,
        ext: ".pdf",
        content: `[PDF attached: ${fileName} — PDF text extraction not yet supported. Share the text content directly if needed.]`,
      });
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
