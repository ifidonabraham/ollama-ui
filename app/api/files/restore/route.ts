import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const BLOCKED_ROOT = /^[a-z]:\\(?:windows|program files|program files \(x86\))\\/i;

/** Put a file back to the text from before this chat wrote it. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { path?: string; content?: string };
  const target = typeof body.path === "string" ? body.path.trim() : "";
  const content = typeof body.content === "string" ? body.content : null;
  if (!target || content === null) return NextResponse.json({ error: "A path and the previous text are required." }, { status: 400 });
  if (content.length > 1_000_000) return NextResponse.json({ error: "That previous copy is too large to restore." }, { status: 400 });
  const resolved = path.resolve(target);
  if (BLOCKED_ROOT.test(resolved)) return NextResponse.json({ error: "That folder is not restored from chat." }, { status: 400 });
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) {
    return NextResponse.json({ error: "The file is no longer there, so it was not restored." }, { status: 404 });
  }
  fs.writeFileSync(resolved, content, "utf-8");
  return NextResponse.json({ ok: true, path: resolved });
}
