import { NextResponse } from "next/server";
import { micStatus, readVoiceLive, takeHeard } from "@/lib/foniaMic";

export async function GET() {
  return NextResponse.json({ ...micStatus(), lines: takeHeard(), live: readVoiceLive() });
}
