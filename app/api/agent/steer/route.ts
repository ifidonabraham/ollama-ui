import { NextRequest, NextResponse } from "next/server";
import { pushSteerNote } from "@/lib/jobs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { job_id?: string; text?: string };
  if (!body.job_id || !body.text?.trim()) {
    return NextResponse.json({ error: "job_id and text are required" }, { status: 400 });
  }
  if (!pushSteerNote(body.job_id, body.text)) {
    return NextResponse.json({ error: "That run is not open." }, { status: 409 });
  }
  return NextResponse.json({ ok: true });
}
