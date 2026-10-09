import { NextResponse } from "next/server";
import os from "os";
import { getOllamaSchedulerStatus, ollamaFetch, getPrimaryHost, isCloudConfigured } from "@/lib/ollama";

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
      models: models.map((model: { name: string; size: number; modified_at: string }) => ({
        ...model,
        estimated_load_mb: Math.round(model.size / 1024 / 1024),
      })),
      free_memory_mb: Math.round(os.freemem() / 1024 / 1024),
      total_memory_mb: Math.round(os.totalmem() / 1024 / 1024),
      scheduler: await getOllamaSchedulerStatus(getPrimaryHost()),
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
        free_memory_mb: Math.round(os.freemem() / 1024 / 1024),
        total_memory_mb: Math.round(os.totalmem() / 1024 / 1024),
        scheduler: { queued_operations: 0, active_model: null, loaded_models: [] },
        source: "offline",
        hint: isCloudConfigured()
          ? "Your Azure Ollama instance is unreachable. Check if the container is running."
          : "Ollama is not running. Start it with: ollama serve",
      },
      { status: 503 }
    );
  }
}
