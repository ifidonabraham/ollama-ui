import { NextResponse } from "next/server";
import { inspectConnections } from "@/lib/installedApps";
import { readFoniaSettings } from "@/lib/foniaSettings";

export async function GET() {
  const settings = readFoniaSettings();
  const connections = inspectConnections().map((item) => ({
    ...item,
    enabled: item.id === "blender"
      ? settings.connectBlender
      : item.id === "metatrader"
        ? settings.connectMetatrader
        : item.id === "vm"
          ? settings.connectVm
          : item.id === "corel"
            ? settings.connectCorel
            : settings.connectAndroidStudio,
  }));
  return NextResponse.json({
    internetAccess: settings.internetAccess,
    connectExternalTools: settings.connectExternalTools,
    connections,
  });
}
