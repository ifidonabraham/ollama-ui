import { NextResponse } from "next/server";
import { ollamaFetch, getPrimaryHost, isCloudConfigured } from "@/lib/ollama";

export async function GET() {
  try {
    const res = await ollamaFetch("/api/tags", { cache: "no-store" });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Ollama error: ${res.statusText}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    const models = (data.models ?? []).map(
      (m: { name: string; size: number; modified_at: string }) => ({
        name: m.name,
        size: m.size,
        modified_at: m.modified_at,
      })
    );

    return NextResponse.json({
      models,
      source: isCloudConfigured() ? "cloud" : "local",
      host: getPrimaryHost(),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[models]", msg);
    return NextResponse.json(
      {
        error: msg,
        models: [],
        source: "offline",
        hint: isCloudConfigured()
          ? "Your Azure Ollama instance is unreachable. Check if the container is running."
          : "Ollama is not running. Start it with: ollama serve",
      },
      { status: 503 }
    );
  }
}
