import { NextRequest, NextResponse } from "next/server";
import {
  getSession,
  getMessages,
  updateSession,
  deleteSession,
  clearMessages,
  getAgentState,
  listAgentJobs,
} from "@/lib/db";

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const session = getSession(id);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    const messages = getMessages(id, "chat");
    const agent_messages = getMessages(id, "agent");
    return NextResponse.json({ session, messages, agent_messages, agent_state: getAgentState(id), agent_jobs: listAgentJobs(id) });
  } catch (err) {
    console.error("[session GET]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, model, system_prompt } = body as {
      title?: string;
      model?: string;
      system_prompt?: string;
    };
    const session = updateSession(id, { title, model, system_prompt });
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    return NextResponse.json({ session });
  } catch (err) {
    console.error("[session PATCH]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    if (!getSession(id)) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    deleteSession(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[session DELETE]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/sessions/[id]/messages → clear history
export async function PUT(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    if (!getSession(id)) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }
    clearMessages(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[session PUT]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
