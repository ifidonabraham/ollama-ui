import { NextRequest, NextResponse } from "next/server";
import { ollamaFetch } from "@/lib/ollama";

// POST /api/unload  { model?: string }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { model } = body as { model?: string };

    let psData: { models?: { name: string }[] };
    try {
      const psRes = await ollamaFetch("/api/ps", { cache: "no-store" });
      if (!psRes.ok) return NextResponse.json({ error: "Cannot reach Ollama", unloaded: [], total: 0 }, { status: 502 });
      psData = await psRes.json();
    } catch {
      // Ollama offline — nothing to unload, not an error
      return NextResponse.json({ unloaded: [], total: 0, offline: true });
    }

    const loaded: string[] = (psData.models ?? []).map((m) => m.name);
    const toUnload = model ? loaded.filter((m) => m === model) : loaded;
    const results: { model: string; ok: boolean }[] = [];

    for (const m of toUnload) {
      try {
        await ollamaFetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: m, keep_alive: 0 }),
        });
        results.push({ model: m, ok: true });
      } catch {
        results.push({ model: m, ok: false });
      }
    }

    return NextResponse.json({ unloaded: results, total: results.length });
  } catch (err) {
    console.error("[unload]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/unload — list currently loaded models
export async function GET() {
  try {
    const res = await ollamaFetch("/api/ps", { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ models: [] });
    const data = await res.json();
    const models = (data.models ?? []).map((m: { name: string; size: number }) => ({
      name: m.name,
      sizeMB: Math.round((m.size ?? 0) / 1024 / 1024),
    }));
    return NextResponse.json({ models });
  } catch {
    return NextResponse.json({ models: [] });
  }
}
