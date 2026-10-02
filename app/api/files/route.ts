import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ALLOWED_TEXT_EXTENSIONS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx", ".txt",
  ".css", ".scss", ".html", ".xml", ".yaml", ".yml", ".toml", ".env",
  ".py", ".rs", ".go", ".java", ".c", ".cpp", ".h", ".hpp", ".sh",
  ".bat", ".ps1", ".sql", ".prisma", ".graphql",
]);

const MAX_FILE_SIZE = 500 * 1024; // 500 KB read limit

function safePath(requested: string): string | null {
  // Resolve and ensure it doesn't escape to obviously dangerous places
  try {
    const resolved = path.resolve(requested);
    // Disallow obvious secret files
    const base = path.basename(resolved).toLowerCase();
    if (base === ".env" || base.startsWith(".env.")) return null;
    return resolved;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dirParam = searchParams.get("path") ?? process.env.HOME ?? "C:\\Users";
  const action = searchParams.get("action") ?? "list"; // list | read

  const resolved = safePath(dirParam);
  if (!resolved) {
    return NextResponse.json({ error: "Invalid path" }, { status: 400 });
  }

  try {
    if (action === "read") {
      const stat = fs.statSync(resolved);
      if (stat.isDirectory()) {
        return NextResponse.json({ error: "Path is a directory" }, { status: 400 });
      }
      if (stat.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File too large (${Math.round(stat.size / 1024)} KB). Max 500 KB.` },
          { status: 413 }
        );
      }
      const ext = path.extname(resolved).toLowerCase();
      if (!ALLOWED_TEXT_EXTENSIONS.has(ext)) {
        return NextResponse.json(
          { error: "Binary or unsupported file type" },
          { status: 415 }
        );
      }
      const content = fs.readFileSync(resolved, "utf-8");
      return NextResponse.json({ path: resolved, content });
    }

    // Default: list directory
    const stat = fs.statSync(resolved);
    if (!stat.isDirectory()) {
      return NextResponse.json({ error: "Not a directory" }, { status: 400 });
    }

    const entries = fs.readdirSync(resolved, { withFileTypes: true });
    const items = entries
      .map((e) => {
        try {
          const fullPath = path.join(resolved, e.name);
          const s = fs.statSync(fullPath);
          return {
            name: e.name,
            path: fullPath,
            isDir: e.isDirectory(),
            size: e.isDirectory() ? null : s.size,
            ext: e.isDirectory() ? null : path.extname(e.name).toLowerCase(),
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (a!.isDir !== b!.isDir) return a!.isDir ? -1 : 1;
        return a!.name.localeCompare(b!.name);
      });

    const parent = path.dirname(resolved);
    return NextResponse.json({
      path: resolved,
      parent: parent !== resolved ? parent : null,
      items,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
