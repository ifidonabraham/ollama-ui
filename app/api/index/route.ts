import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IGNORED = new Set(["node_modules", ".git", ".next", "dist", "build", "out", ".cache", "target", "__pycache__", ".venv"]);
const INDEXABLE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".py", ".go", ".rs", ".java", ".cs", ".md", ".json", ".css", ".scss", ".html"]);
const MAX_FILE_SIZE = 150 * 1024; // 150 KB
const MAX_FILES = 300;

interface FileSymbol {
  file: string;        // relative path
  symbols: string[];   // function/class/export names
  lines: number;
  summary: string;     // first meaningful comment or first non-empty line
}

// Extract top-level symbols from source code using simple regex
function extractSymbols(content: string, ext: string): string[] {
  const symbols: string[] = [];
  const lines = content.split("\n");

  if ([".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
    for (const line of lines) {
      const m =
        line.match(/^export\s+(?:default\s+)?(?:async\s+)?function\s+(\w+)/) ||
        line.match(/^export\s+(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/) ||
        line.match(/^(?:export\s+)?(?:abstract\s+)?class\s+(\w+)/) ||
        line.match(/^export\s+(?:type|interface|enum)\s+(\w+)/) ||
        line.match(/^(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s*)?\(/);
      if (m?.[1]) symbols.push(m[1]);
    }
  } else if (ext === ".py") {
    for (const line of lines) {
      const m = line.match(/^(?:async\s+)?def\s+(\w+)/) || line.match(/^class\s+(\w+)/);
      if (m?.[1]) symbols.push(m[1]);
    }
  } else if (ext === ".go") {
    for (const line of lines) {
      const m = line.match(/^func\s+(?:\(\w+\s+\*?\w+\)\s+)?(\w+)/) || line.match(/^type\s+(\w+)/);
      if (m?.[1]) symbols.push(m[1]);
    }
  }

  return [...new Set(symbols)].slice(0, 20);
}

function getSummary(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    const t = line.trim();
    if (t && !t.startsWith("//") && !t.startsWith("*") && !t.startsWith("#") && !t.startsWith("import") && !t.startsWith("use ") && t.length > 5) {
      return t.slice(0, 100);
    }
  }
  return "";
}

function walkDir(dir: string, rootDir: string, results: FileSymbol[], count: { n: number }) {
  if (count.n >= MAX_FILES) return;
  let entries: fs.Dirent[];
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return; }

  for (const e of entries) {
    if (count.n >= MAX_FILES) break;
    if (IGNORED.has(e.name)) continue;

    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walkDir(full, rootDir, results, count);
      continue;
    }

    const ext = path.extname(e.name).toLowerCase();
    if (!INDEXABLE_EXTS.has(ext)) continue;

    try {
      const stat = fs.statSync(full);
      if (stat.size > MAX_FILE_SIZE) continue;
      const content = fs.readFileSync(full, "utf-8");
      const symbols = extractSymbols(content, ext);
      const lines = content.split("\n").length;
      const summary = getSummary(content);
      results.push({
        file: path.relative(rootDir, full).replace(/\\/g, "/"),
        symbols,
        lines,
        summary,
      });
      count.n++;
    } catch { /* skip unreadable */ }
  }
}

// Score a file's relevance to a query
function scoreRelevance(file: FileSymbol, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  let score = 0;

  for (const word of words) {
    if (file.file.toLowerCase().includes(word)) score += 3;
    if (file.symbols.some((s) => s.toLowerCase().includes(word))) score += 2;
    if (file.summary.toLowerCase().includes(word)) score += 1;
  }

  // Boost common entry points
  if (/index\.(ts|tsx|js|jsx)$/.test(file.file)) score += 0.5;
  if (/\.(tsx|jsx)$/.test(file.file)) score += 0.3; // components are often relevant

  return score;
}

// GET /api/index?path=...&query=...  — returns repo map or scored relevant files
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dirPath = searchParams.get("path");
  const query   = searchParams.get("query") ?? "";

  if (!dirPath) return NextResponse.json({ error: "path required" }, { status: 400 });

  const resolved = path.resolve(dirPath);
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
    return NextResponse.json({ error: "Not a valid directory" }, { status: 400 });
  }

  const results: FileSymbol[] = [];
  walkDir(resolved, resolved, results, { n: 0 });

  if (query) {
    // Return top relevant files scored against the query
    const scored = results
      .map((f) => ({ ...f, score: scoreRelevance(f, query) }))
      .filter((f) => f.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ query, results: scored, total: results.length });
  }

  // Return full repo map summary
  const map = results.map((f) => {
    const syms = f.symbols.length > 0 ? ` [${f.symbols.slice(0, 5).join(", ")}]` : "";
    return `${f.file} (${f.lines}L)${syms}`;
  });

  return NextResponse.json({ total: results.length, map, files: results });
}
