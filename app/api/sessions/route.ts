import { NextRequest, NextResponse } from "next/server";
import { listSessions, createSession } from "@/lib/db";
import { randomUUID } from "crypto";

export async function GET() {
  try {
    const sessions = listSessions();
    return NextResponse.json({ sessions });
  } catch (err) {
    console.error("[sessions GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { model, title, system_prompt } = body as {
      model: string;
      title?: string;
      system_prompt?: string;
    };

    if (!model) {
      return NextResponse.json(
        { error: "model is required" },
        { status: 400 }
      );
    }

    const id = randomUUID();
    const session = createSession(id, model, title ?? "New Chat", system_prompt ?? "");
    return NextResponse.json({ session }, { status: 201 });
  } catch (err) {
    console.error("[sessions POST]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
