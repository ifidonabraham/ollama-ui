import { NextRequest, NextResponse } from "next/server";
import { applyMicMode, micStatus } from "@/lib/foniaMic";
import { readFoniaSettings, writeFoniaSettings, type FoniaSettings } from "@/lib/foniaSettings";

export async function GET() {
  const settings = readFoniaSettings();
  applyMicMode(settings.micMode);
  return NextResponse.json({ ...settings, ...micStatus() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Partial<FoniaSettings>;
  const settings = writeFoniaSettings(body);
  applyMicMode(settings.micMode);
  return NextResponse.json({ ...settings, ...micStatus() });
}
