import { NextResponse } from "next/server";
import { runComputerAction } from "@/lib/computerActions";

export async function POST() {
  const result = await runComputerAction("listen");
  if (result.startsWith("Heard:")) {
    return NextResponse.json({ text: result.slice("Heard:".length).trim() });
  }
  return NextResponse.json({ text: "", message: result.slice(0, 300) });
}
