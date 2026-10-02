import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IGNORED_DIRS = new Set([
  "node_modules", ".git", ".next", "dist", "build", "out",
  ".cache", "target", "__pycache__", ".venv", "venv", ".DS_Store",
]);

const TEXT_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx", ".txt",
  ".css", ".scss", ".html", ".xml", ".yaml", ".yml", ".toml",
  ".py", ".rs", ".go", ".java", ".c", ".cpp", ".h", ".sh",
  ".bat", ".ps1", ".sql", ".prisma", ".graphql", ".env.example",
  ".gitignore", ".editorconfig",
]);

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "dir";
  ext?: string;
  children?: FileNode[];
}

function buildTree(dirPath: string, depth = 0): FileNode[] {
  if (depth > 6) return [];
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const nodes: FileNode[] = [];

    for (const e of entries) {
      if (e.name.startsWith(".") && e.name !== ".env.example") continue;
      if (IGNORED_DIRS.has(e.name)) continue;

      const fullPath = path.join(dirPath, e.name);

      if (e.isDirectory()) {
        nodes.push({
          name: e.name,
          path: fullPath,
          type: "dir",
          children: buildTree(fullPath, depth + 1),
        });
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (!TEXT_EXTS.has(ext) && !TEXT_EXTS.has(e.name)) continue;
        nodes.push({ name: e.name, path: fullPath, type: "file", ext });
      }
    }

    return nodes.sort((a, b) => {
      if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  } catch {
    return [];
  }
}

// GET /api/workspace?path=C:\...  — returns file tree
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const folderPath = searchParams.get("path");

  if (!folderPath) {
    return NextResponse.json({ error: "path is required" }, { status: 400 });
  }

  try {
    const resolved = path.resolve(folderPath);
    if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
      return NextResponse.json({ error: "Not a valid directory" }, { status: 400 });
    }

    const tree = buildTree(resolved);
    return NextResponse.json({ path: resolved, name: path.basename(resolved), tree });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// POST /api/workspace — read multiple files and return their content as context
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { files: filePaths } = body as { files: string[] };

    if (!Array.isArray(filePaths) || filePaths.length === 0) {
      return NextResponse.json({ error: "files array required" }, { status: 400 });
    }

    const MAX_PER_FILE = 100 * 1024; // 100 KB per file
    const MAX_TOTAL = 400 * 1024;    // 400 KB total
    let totalSize = 0;
    const results: { path: string; content: string; error?: string }[] = [];

    for (const p of filePaths.slice(0, 20)) {
      try {
        const resolved = path.resolve(p);
        const stat = fs.statSync(resolved);
        if (stat.isDirectory()) continue;
        if (stat.size > MAX_PER_FILE) {
          results.push({ path: p, content: "", error: "File too large" });
          continue;
        }
        if (totalSize + stat.size > MAX_TOTAL) {
          results.push({ path: p, content: "", error: "Total context limit reached" });
          continue;
        }
        const content = fs.readFileSync(resolved, "utf-8");
        totalSize += stat.size;
        results.push({ path: p, content });
      } catch {
        results.push({ path: p, content: "", error: "Could not read file" });
      }
    }

    return NextResponse.json({ files: results, totalBytes: totalSize });
  } catch (err) {
    console.error("[workspace POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
