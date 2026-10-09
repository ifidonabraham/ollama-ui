import { NextRequest, NextResponse } from "next/server";
import { addMessage, getMessages, getSession } from "@/lib/db";
import type { AnswerModel } from "@/lib/answerModels";
import { acquireOllamaModel, resolveOllamaHost } from "@/lib/ollama";
import { randomUUID } from "crypto";

// Models known to support vision — checked by name prefix
const VISION_PREFIXES = ["llava", "moondream", "minicpm-v", "llava-llama3", "llava-phi3", "bakllava", "cogvlm"];

export function isVisionModel(model: string): boolean {
  const lower = model.toLowerCase();
  return VISION_PREFIXES.some((p) => lower.startsWith(p));
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      session_id,
      content,
      model: modelOverride,
      images,
    } = body as {
      session_id: string;
      content: string;
      model?: string;
      images?: string[];
    };

    if (!session_id || !content) {
      return NextResponse.json(
        { error: "session_id and content are required" },
        { status: 400 }
      );
    }

    const session = getSession(session_id);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const model = modelOverride ?? session.model;

    // Persist user message
    const userMsgId = randomUUID();
    const userContent =
      images && images.length > 0
        ? `${content}\n<!-- images:${images.length} -->`
        : content;
    addMessage(userMsgId, session_id, "user", userContent);

    // Build Ollama message history
    const history = getMessages(session_id, "chat");
    const ollamaMessages: { role: string; content: string; images?: string[] }[] = [];

    if (session.system_prompt) {
      ollamaMessages.push({ role: "system", content: session.system_prompt });
    }

    for (const m of history) {
      const cleanContent = m.content.replace(/\n<!-- images:\d+ -->$/, "");
      ollamaMessages.push({ role: m.role, content: cleanContent });
    }

    if (images && images.length > 0) {
      const last = ollamaMessages[ollamaMessages.length - 1];
      if (last && last.role === "user") {
        last.images = images;
      }
    }

    let ollamaRes: Response;
    let releaseModel: (() => void) | null = null;
    try {
      const ollamaHost = await resolveOllamaHost();
      releaseModel = await acquireOllamaModel(ollamaHost, model);
      ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, messages: ollamaMessages, stream: true, keep_alive: "30s" }),
      });
    } catch (err: unknown) {
      releaseModel?.();
      const msg = err instanceof Error ? err.message : "Cannot reach Ollama";
      return NextResponse.json({ error: msg }, { status: 503 });
    }

    if (!ollamaRes.ok || !ollamaRes.body) {
      releaseModel?.();
      const errText = await ollamaRes.text().catch(() => ollamaRes.statusText);
      return NextResponse.json(
        { error: `Ollama error: ${errText}` },
        { status: 502 }
      );
    }

    const assistantMsgId = randomUUID();
    let fullContent = "";

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        const reader = ollamaRes.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter(Boolean);

            for (const line of lines) {
              try {
                const data = JSON.parse(line);
                if (data.message?.content) {
                  fullContent += data.message.content;
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ delta: data.message.content })}\n\n`
                    )
                  );
                }
                if (data.done) {
                  const models: AnswerModel[] = [{ name: model, role: "chat" }];
                  addMessage(assistantMsgId, session_id, "assistant", fullContent, "chat", models);
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ done: true, id: assistantMsgId, models })}\n\n`
                    )
                  );
                }
              } catch {
                // skip malformed JSON
              }
            }
          }
        } finally {
          releaseModel?.();
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("[chat]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
