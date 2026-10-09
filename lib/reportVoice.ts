import { estimateModelMb } from "./inferenceBudget";

/** Turn a PC report into a short explanation. The raw report stays the source of the numbers. */

export interface ReportVoice {
  text: string;
  model: string;
  note: string;
}

function usable(name: string): boolean {
  return Boolean(name) && !/llava|vision|moondream/i.test(name);
}

export async function explainPcReport(options: {
  base: string;
  requested: string;
  installed: string[];
  freeMb: number;
  report: string;
  question: string;
}): Promise<ReportVoice> {
  const requested = usable(options.requested) ? options.requested : "";
  const fitting = options.installed.filter((name) => usable(name) && options.freeMb >= estimateModelMb(name));
  const chosen = requested && options.freeMb >= estimateModelMb(requested)
    ? requested
    : fitting.find((name) => /1\.5b/i.test(name)) ?? fitting[0] ?? "";
  if (!options.base || !chosen) {
    return {
      text: "No model summarized this report. The lines above are the computer's own reading.",
      model: "",
      note: options.base ? `Free RAM is ${options.freeMb} MB, which is not enough to load a model beside the app.` : "The model server is not running.",
    };
  }
  const note = chosen === requested
    ? ""
    : `${requested || "The selected model"} needs about ${estimateModelMb(requested || "qwen2.5-coder:7b")} MB free and this PC has ${options.freeMb} MB, so ${chosen} wrote the summary.`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45_000);
  try {
    const response = await fetch(`${options.base}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: chosen,
        stream: false,
        keep_alive: 0,
        options: { num_ctx: 2048 },
        messages: [
          {
            role: "system",
            content: "You explain a report that the computer already produced. Use only facts and numbers that appear in the report. If a line says Error, say that part failed. Do not claim a setting changed unless the report says it changed. Stay under 120 words.",
          },
          {
            role: "user",
            content: `Request: ${options.question.slice(0, 500)}\n\nReport:\n${options.report.slice(0, 4000)}`,
          },
        ],
      }),
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => response.statusText);
      return { text: `The summary model did not answer. ${detail.slice(0, 240)}`, model: chosen, note };
    }
    const data = await response.json() as { message?: { content?: string } };
    const text = data.message?.content?.trim() || "The summary model returned no text.";
    return { text, model: chosen, note };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { text: `The summary model did not answer. ${message.slice(0, 240)}`, model: chosen, note };
  } finally {
    clearTimeout(timer);
  }
}

const REPORT_ACTIONS = new Set([
  "battery_status", "disk_space", "memory_status", "cpu_status", "gpu_status", "display_status",
  "audio_status", "volume_status", "wifi_status", "network_status", "bluetooth_status", "firewall_status",
  "printers_status", "camera_status", "power_status", "startup_status", "programs_status", "devices_status",
  "components_status", "process_status", "service_status", "brightness_status", "theme_status",
  "defaults_status", "windows_update_status", "windows_update_scan",
]);

export function reportNeedsVoice(action: string): boolean {
  return REPORT_ACTIONS.has(action);
}
