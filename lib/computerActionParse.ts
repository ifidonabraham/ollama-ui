import { mapPhrase, normalizePhrase } from "./phraseMap";
import { correctTypos } from "./typos";

export interface ComputerAction {
  action: string;
  target: string;
}

const COMPUTER_WORDS = /\b(bluetooth|firewall|wifi|wi-fi|disk space|microphone|voice command|transcribe|screenshot|hear me|battery|cpu|gpu|processor|graphics|display|monitor|volume|printer|camera|brightness|startup|components|hardware|audio|speaker|power plan|shutdown|restart|eject)\b|\bshut\s*down\b|\b(?:say|speak)\s+aloud\b|\b(?:check|show)\s+(?:the\s+|my\s+)?network\b|\b(disable|enable)\b[\s\S]{0,40}\b(camera|device|adapter|bluetooth|wifi|microphone|speaker|usb)\b|\b(stop|start|kill)\s+(?:the\s+)?(?:process|service)\b|\b(?:eject|unplug|safely\s+remove)\b[\s\S]{0,48}\b(?:flash|usb|thumb|pen|stick|drive|removable)\b/i;
const PROCESS_WORDS = /\b(is|check|ensure)\b[\s\S]{0,50}\b(running|process|service)\b/i;
const SPOKEN_PERCENT = /\b(percent|percentage)\b[\s\S]{0,48}\b(system|battery|laptop|pc|computer|disk|drive|storage|ram|memory|cpu|charge)\b/i;
const SPOKEN_CONTROL = /\b(brightness|clipboard|dark\s+mode|light\s+mode|night\s+mode|windows\s+updates?|default\s+apps?|take\s+a\s+(?:picture|photo|pic))\b/i;

/** A PC check or change, including sentences that also ask the model to explain the result. */
export function isComputerControlTask(content: string): boolean {
  return COMPUTER_WORDS.test(content) || PROCESS_WORDS.test(content) || SPOKEN_PERCENT.test(content) || SPOKEN_CONTROL.test(content);
}

function cleanName(value: string): string | null {
  const name = value.trim().replace(/^["']|["']$/g, "");
  if (!/^[A-Za-z0-9._-]{1,40}$/.test(name)) return null;
  return name;
}

function switchAction(text: string, device: "bluetooth" | "firewall"): ComputerAction | null {
  const trailing = text.match(new RegExp(`^(?:please\\s+)?(?:turn|switch|set)\\s+(?:the\\s+)?${device}\\s+(on|off)$`, "i"));
  if (trailing) return { action: `${device}_${trailing[1].toLowerCase()}`, target: "" };
  const leading = text.match(new RegExp(`^(?:please\\s+)?(?:turn|switch|set)\\s+(on|off)\\s+(?:the\\s+)?${device}$`, "i"));
  if (leading) return { action: `${device}_${leading[1].toLowerCase()}`, target: "" };
  const enable = text.match(new RegExp(`^(?:please\\s+)?(enable|disable)\\s+(?:the\\s+)?${device}$`, "i"));
  if (enable) return { action: `${device}_${enable[1].toLowerCase() === "enable" ? "on" : "off"}`, target: "" };
  const bare = text.match(new RegExp(`^(?:please\\s+)?${device}\\s+(on|off)$`, "i"));
  if (bare) return { action: `${device}_${bare[1].toLowerCase()}`, target: "" };
  return null;
}

function matchExact(text: string): ComputerAction | null {
  const bluetooth = switchAction(text, "bluetooth");
  if (bluetooth) return bluetooth;
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:bluetooth(?:\s+status)?|is\s+bluetooth\s+on)\??$/i.test(text)) {
    return { action: "bluetooth_status", target: "" };
  }

  const firewall = switchAction(text, "firewall");
  if (firewall) return firewall;
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:firewall(?:\s+status)?|is\s+(?:the\s+)?firewall\s+on)\??$/i.test(text)) {
    return { action: "firewall_status", target: "" };
  }

  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:disk\s+space|free\s+disk\s+space|how\s+much\s+(?:disk\s+)?space(?:\s+is\s+free)?)\??$/i.test(text)) {
    return { action: "disk_space", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:memory\s+status|ram\s+status|how\s+much\s+(?:memory|ram)(?:\s+is\s+free)?)\??$/i.test(text)) {
    return { action: "memory_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:wifi|wi-fi)(?:\s+status)?\??$/i.test(text)) {
    return { action: "wifi_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:network|network\s+adapters?)(?:\s+status)?\??$/i.test(text)) {
    return { action: "network_status", target: "" };
  }
  if (/^(?:please\s+)?(?:system\s+status|pc\s+status|computer\s+status|all\s+components|my\s+components|hardware\s+status)\??$/i.test(text)) {
    return { action: "components_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?battery(?:\s+status)?\??$/i.test(text)) {
    return { action: "battery_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:cpu|processor)(?:\s+status)?\??$/i.test(text)) {
    return { action: "cpu_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:gpu|graphics)(?:\s+status)?\??$/i.test(text)) {
    return { action: "gpu_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:display|monitor|screen)(?:\s+status)?\??$/i.test(text)) {
    return { action: "display_status", target: "" };
  }
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:audio|sound|speaker)(?:\s+status)?\??$/i.test(text)) {
    return { action: "audio_status", target: "" };
  }
  if (/^(?:please\s+)?(?:volume|volume\s+status|what(?:'s| is)\s+the\s+volume)\??$/i.test(text)) {
    return { action: "volume_status", target: "" };
  }
  const volumeSet = text.match(/^(?:please\s+)?set\s+(?:the\s+)?volume\s+(?:to\s+)?(\d{1,3})\s*%?$/i);
  if (volumeSet) return { action: "volume_set", target: String(Math.min(100, Math.max(0, Number(volumeSet[1])))) };
  if (/^(?:please\s+)?mute(?:\s+(?:the\s+)?(?:volume|sound|audio))?$/i.test(text)) return { action: "volume_mute", target: "" };
  if (/^(?:please\s+)?unmute(?:\s+(?:the\s+)?(?:volume|sound|audio))?$/i.test(text)) return { action: "volume_unmute", target: "" };
  if (/^(?:please\s+)?(?:printers?|printer\s+status)\??$/i.test(text)) return { action: "printers_status", target: "" };
  if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?camera(?:\s+status)?\??$/i.test(text)) {
    return { action: "camera_status", target: "" };
  }
  if (/^(?:please\s+)?(?:power\s+status|power\s+plan)\??$/i.test(text)) return { action: "power_status", target: "" };
  if (/^(?:please\s+)?(?:startup\s+(?:apps|programs)|what\s+starts\s+with\s+windows)\??$/i.test(text)) {
    return { action: "startup_status", target: "" };
  }
  if (/^(?:please\s+)?(?:installed\s+programs|list\s+programs|what(?:'s| is)\s+installed)\??$/i.test(text)) {
    return { action: "programs_status", target: "" };
  }
  const programFind = text.match(/^(?:please\s+)?find\s+program\s+(.{1,40})$/i);
  if (programFind) return { action: "programs_status", target: programFind[1].trim() };
  if (/^(?:please\s+)?(?:devices?|my\s+devices|connected\s+devices)\??$/i.test(text)) {
    return { action: "devices_status", target: "" };
  }
  if (/^(?:please\s+)?(?:shut\s*down|shutdown)(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
    return { action: "shutdown", target: "" };
  }
  if (/^(?:please\s+)?restart(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
    return { action: "restart", target: "" };
  }
  if (/^(?:please\s+)?sleep(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
    return { action: "sleep", target: "" };
  }

  const stopProcess = text.match(/^(?:please\s+)?(?:stop|end|kill)\s+(?:the\s+)?(?:process\s+)?([A-Za-z0-9._-]{1,40})$/i);
  if (stopProcess) {
    const name = cleanName(stopProcess[1]);
    if (!name || /^(the|that|this|a|an|it|process|service)$/i.test(name)) return null;
    return { action: "process_stop", target: name };
  }
  const serviceChange = text.match(/^(?:please\s+)?(start|stop)\s+(?:the\s+)?service\s+([A-Za-z0-9._-]{1,40})$/i);
  if (serviceChange) {
    const name = cleanName(serviceChange[2]);
    if (!name) return null;
    return { action: serviceChange[1].toLowerCase() === "start" ? "service_start" : "service_stop", target: name };
  }
  const deviceChange = text.match(/^(?:please\s+)?(enable|disable)\s+(?:the\s+)?(.{1,80})$/i);
  if (deviceChange && !/^(bluetooth|firewall)$/i.test(deviceChange[2].trim())) {
    const deviceTarget = deviceChange[2].trim();
    if (/^(microphone|mic)$/i.test(deviceTarget)) {
      return { action: deviceChange[1].toLowerCase() === "enable" ? "microphone_on" : "microphone_off", target: "" };
    }
    return { action: deviceChange[1].toLowerCase() === "enable" ? "device_enable" : "device_disable", target: deviceTarget };
  }

  if (/^(?:please\s+)?(?:take\s+a\s+screenshot|screenshot)\??$/i.test(text)) return { action: "screenshot", target: "" };

  const listen = text.match(/^(?:please\s+)?(?:listen|hear me)(?:\s+for\s+(\d{1,2})\s+seconds?)?\??$/i);
  if (listen) {
    const seconds = listen[1] ? String(Math.min(8, Math.max(3, Number(listen[1])))) : "6";
    return { action: "listen", target: seconds };
  }

  const speak = text.match(/^(?:please\s+)?(?:say|speak)(?:\s+aloud)?\s+(.{1,180})$/i);
  if (speak && !/\b(read|file|folder|project|run|open|install|code|document|video)\b/i.test(speak[1])) {
    return { action: "speak", target: speak[1].trim() };
  }

  const transcribe = text.match(/^(?:please\s+)?transcribe\s+(\S+)$/i);
  if (transcribe) return { action: "transcribe", target: transcribe[1].replace(/^["']|["']$/g, "") };

  const processAsk = text.match(/^(?:please\s+)?(?:is|check|ensure)\s+(?:that\s+)?(?:the\s+)?(?:process\s+)?([A-Za-z0-9._-]{1,40})\s+(?:is\s+)?running(?:\s+well)?\??$/i);
  if (processAsk) {
    const name = cleanName(processAsk[1]);
    if (!name || /^(the|that|this|a|an|it|process|service)$/i.test(name)) return null;
    return { action: "process_status", target: name };
  }

  const serviceAsk = text.match(/^(?:please\s+)?(?:is|check)\s+(?:the\s+)?service\s+([A-Za-z0-9._-]{1,40})\s+running(?:\s+well)?\??$/i);
  if (serviceAsk) {
    const name = cleanName(serviceAsk[1]);
    return name ? { action: "service_status", target: name } : null;
  }

  return null;
}

/** An exact line, or one spoken paraphrase of a command that already exists. Mixed sentences stay with the model. */
export function parseComputerAction(content: string): ComputerAction | null {
  const text = content.trim();
  if (!text || text.includes("\n") || text.length > 240) return null;
  if (/\b(and|then)\b/i.test(text)) return null;
  const corrected = correctTypos(text);
  const normalized = normalizePhrase(corrected);
  return matchExact(text) ?? (normalized ? matchExact(normalized) : null) ?? mapPhrase(normalized);
}
