import { NextRequest, NextResponse } from "next/server";
import { cancelJob, getJob } from "@/lib/jobs";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { job_id?: string };
  if (!body.job_id) return NextResponse.json({ error: "job_id is required" }, { status: 400 });
  if (!getJob(body.job_id)) return NextResponse.json({ error: "Job not found" }, { status: 404 });
  return NextResponse.json({ job: cancelJob(body.job_id) });
}
