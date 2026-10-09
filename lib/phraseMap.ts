/** Spoken wording for the computer actions that already exist. No model and no extra tools. */

export interface PhraseAction {
  action: string;
  target: string;
}

const LEADING = [
  /^(?:hey|hi|hello|ok|okay|yo)\s+/,
  /^fonia\s*/,
  /^(?:can|could|would|will)\s+you\s+/,
  /^(?:please|kindly)\s+/,
  /^(?:i\s+(?:want|need)\s+(?:you\s+)?to|i'?d\s+like(?:\s+you)?\s+to)\s+/,
  /^(?:tell\s+me|show\s+me|let\s+me\s+know|give\s+me)\s+/,
  /^(?:i\s+(?:want|need)\s+to\s+know)\s+/,
];

const NAME_STOP = new Set([
  "the", "that", "this", "a", "an", "process", "service", "my", "your", "it", "computer", "pc",
  "system", "laptop", "machine", "windows", "sound", "volume", "please", "fonia", "window",
  "screen", "file", "folder", "app", "program", "device", "running", "status",
]);

/** Drop greetings and politeness so "can you check battery" can match "check battery". */
export function normalizePhrase(content: string): string {
  let text = content
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[?!.,;]+(?=\s|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (let pass = 0; pass < 6; pass += 1) {
    let next = text;
    for (const pattern of LEADING) next = next.replace(pattern, "");
    next = next.replace(/\b(check|show)\s+on\b/g, "$1").replace(/\s+(?:for me|right now|please)$/g, "").trim();
    if (next === text) break;
    text = next;
  }
  return text;
}

function has(text: string, pattern: RegExp): boolean {
  return pattern.test(text);
}

function cleanName(value: string | undefined): string | null {
  const name = (value ?? "").trim().replace(/^["']|["']$/g, "");
  if (!/^[a-z0-9._-]{1,40}$/i.test(name)) return null;
  if (NAME_STOP.has(name.toLowerCase())) return null;
  return name;
}

interface Hit {
  action: string;
  target: string;
  score: number;
}

function best(hits: Hit[]): PhraseAction | null {
  if (hits.length === 0) return null;
  hits.sort((left, right) => right.score - left.score);
  const winner = hits[0];
  if (winner.score < 6) return null;
  const rival = hits.find((hit) => hit.action !== winner.action || hit.target !== winner.target);
  if (rival && winner.score - rival.score < 2) return null;
  return { action: winner.action, target: winner.target };
}

function asks(text: string, kind: "off" | "on"): boolean {
  if (kind === "off") return has(text, /\b(turn|switch|set)\b/) && has(text, /\boff\b/) || has(text, /\bdisable\b/);
  return has(text, /\b(turn|switch|set)\b/) && has(text, /\bon\b/) || has(text, /\benable\b/);
}

/** One confident meaning, or null when the sentence is mixed or unclear. */
export function mapPhrase(content: string): PhraseAction | null {
  const text = normalizePhrase(content);
  if (!text) return null;
  if (has(text, /\b(function|component|bug|refactor|fix|indicator|website|css|html|javascript|typescript|repo|repository|file|folder|code)\b/)
    && !has(text, /\b(percent|percentage|screenshot|transcribe)\b/)) {
    return null;
  }

  const ejecting = has(text, /\b(eject|unplug)\b/) || has(text, /\bsafely\s+remove\b/);

  const percent = has(text, /\b(percent|percentage|%)\b/);
  const systemish = has(text, /\b(system|laptop|pc|computer|machine)\b/);
  const diskWord = has(text, /\b(disk|drive|storage|ssd|hdd|hard\s*drive)\b/);
  const ramWord = has(text, /\bram\b/) || (has(text, /\bmemory\b/) && !has(text, /\b(remember|memorial)\b/));
  const cpuWord = has(text, /\b(cpu|processor)\b/);
  const batteryWord = has(text, /\b(battery|charging)\b/)
    || has(text, /\b(charge|power)\s+(left|remaining|level|percent|percentage)\b/)
    || has(text, /\bhow\s+much\s+(?:battery|charge|power)\b/)
    || has(text, /\b(?:my|the)\s+charge\b/);
  const hits: Hit[] = [];
  const add = (action: string, score: number, target = "") => {
    if (score > 0) hits.push({ action, target, score });
  };

  if (ejecting && (has(text, /\b(flash|usb|thumb|pen|stick|removable)\b/) || has(text, /\bdrive\b/))) {
    const drive = text.match(/\b([d-z]):\b/) || text.match(/\bdrive\s+([d-z])\b/) || text.match(/\b([d-z])\s+drive\b/);
    add("eject_drive", 10, drive ? drive[1].toUpperCase() : "");
  }

  if (percent && diskWord) add("disk_space", 9);
  else if (percent && ramWord) add("memory_status", 9);
  else if (percent && cpuWord) add("cpu_status", 8);
  else if (percent && (batteryWord || systemish)) add("battery_status", 9);

  if (batteryWord) add("battery_status", 7);
  if (!ejecting && diskWord && has(text, /\b(space|free|full|left|used|usage|storage|much)\b/) && !has(text, /\bformat\b/)) add("disk_space", 7);
  else if (has(text, /\b(free space|space left|disk space)\b/)) add("disk_space", 7);
  else if (!ejecting && diskWord && has(text, /\b(check|show|status|how)\b/) && !has(text, /\bformat\b/)) add("disk_space", 6);
  if (ramWord) add("memory_status", 7);
  if (cpuWord) add("cpu_status", 7);
  if (has(text, /\b(gpu|graphics\s+card|video\s+card|integrated\s+graphics)\b/)
    || (has(text, /\bgraphics\b/) && has(text, /\b(card|gpu|status|check|show)\b/))) {
    add("gpu_status", 7);
  }
  if (has(text, /\b(monitor|resolution|screen\s+size|screen\s+resolution|display\s+status|the\s+display|my\s+display)\b/)
    && !has(text, /\b(screenshot|screen\s*shot|capture|snap)\b/)) {
    add("display_status", 7);
  }
  if (has(text, /\b(screenshot|screen\s*shot)\b/)
    || has(text, /\b(capture|snap)\b(?:\s+\w+){0,3}\s+(?:screen|desktop)\b/)
    || has(text, /\b(?:picture|photo|image)\s+of\s+(?:the\s+|my\s+)?(?:screen|desktop)\b/)
    || has(text, /\bwhat(?:'s| is)\s+on\s+(?:my\s+|the\s+)?screen\b/)
    || (has(text, /\b(take|grab|snap|capture)\b/) && has(text, /\b(picture|photo|pic)\b/))) {
    add("screenshot", 8);
  }
  if (has(text, /\bbrightness\b/) || (has(text, /\bbright\b/) && has(text, /\b(screen|display|monitor)\b/))) {
    const raised = has(text, /\b(increase|raise|higher|brighter|up)\b/);
    const lowered = has(text, /\b(decrease|lower|dim|dimmer|down|reduce)\b/);
    const level = text.match(/\b(\d{1,3})\b/);
    if (raised && !lowered) add("brightness_up", 8);
    else if (lowered && !raised) add("brightness_down", 8);
    else if (level && has(text, /\b(set|make|to|at)\b/) && Number(level[1]) <= 100) add("brightness_set", 9, String(Number(level[1])));
    else add("brightness_status", 7);
  }
  if (has(text, /\b(dark\s*mode|light\s*mode|night\s*mode|dark\s*theme|light\s*theme)\b/) || (has(text, /\b(dark|light|night)\b/) && has(text, /\b(mode|theme)\b/))) {
    const changing = has(text, /\b(turn|set|make|switch|enable|disable|use)\b/);
    const dark = has(text, /\b(dark|night)\b/);
    const light = has(text, /\blight\b/);
    if (changing && dark && has(text, /\b(off|disable)\b/)) add("theme_light", 9);
    else if (changing && light && has(text, /\b(off|disable)\b/) && !dark) add("theme_dark", 9);
    else if (changing && dark && !light) add("theme_dark", 9);
    else if (changing && light && !dark) add("theme_light", 9);
    else add("theme_status", 7);
  }
  if (has(text, /\bdefault\s+(?:app|apps|browser|program|programs)\b/) || has(text, /\bdefaults\b/)) {
    if (has(text, /\b(change|set|pick|choose|open)\b/)) add("defaults_open", 8);
    else add("defaults_status", 7);
  }
  if (has(text, /\b(windows\s+updates?|check\s+for\s+updates)\b/) || (has(text, /\bupdates?\b/) && has(text, /\bwindows\b/))) {
    if (has(text, /\binstall\b/)) add("windows_update_install", 8);
    else if (has(text, /\b(scan|search)\b/)) add("windows_update_scan", 8);
    else add("windows_update_status", 7);
  }
  if (has(text, /\bclipboard\b/) || has(text, /\bpasteboard\b/) || has(text, /\bwhat\s+(?:did|have)\s+i\s+cop(?:y|ied)\b/)) {
    add("clipboard_read", 8);
  }
  const typed = text.match(/\b(?:type|enter)\s+(.{1,120}?)\s+(?:in|into|on)\s+(?:the\s+)?([a-z0-9 ._-]{1,40})$/);
  if (typed) add("ui_type", 8, `${typed[2].trim()}|${typed[1].trim()}`);
  const clicked = text.match(/\bclick\s+(?:the\s+)?(.{1,60}?)\s+(?:in|on|inside)\s+(?:the\s+)?([a-z0-9 ._-]{1,40})$/);
  if (clicked) add("ui_click", 8, `${clicked[2].trim()}|${clicked[1].replace(/\bbutton\b/g, "").trim()}`);

  const volumeTopic = has(text, /\b(volume|loud|loudness)\b/)
    || (has(text, /\b(sound|speakers?|audio)\b/) && has(text, /\b(volume|loud|level|mute|unmute)\b/));
  const volumeShift = volumeTopic && has(text, /\b(up|down|higher|lower|increase|decrease|louder|quieter)\b/);
  const volumeNumber = text.match(/\b(\d{1,3})\b/);
  const statusQuestion = has(text, /\b(is|are|status|currently|already|what(?:'s| is)|how)\b/) && !has(text, /\b(turn|set|make|switch)\b/);
  if (!volumeShift && volumeTopic && volumeNumber && has(text, /\b(set|make|turn|change|put)\b/) && Number(volumeNumber[1]) <= 100) {
    add("volume_set", 9, String(Number(volumeNumber[1])));
  } else if (has(text, /\bunmute\b/) || (has(text, /\bturn\b/) && has(text, /\b(sound|volume|speakers?|audio)\s+on\b/))) {
    if (!statusQuestion) add("volume_unmute", 8);
    else if (volumeTopic) add("volume_status", 7);
  } else if (has(text, /\b(mute|silence)\b/) || has(text, /\b(sound|volume|speakers?|audio)\s+off\b/) || (has(text, /\b(sound|volume|speakers?|audio)\b/) && has(text, /\bturn\b/) && has(text, /\boff\b/) && !has(text, /\bdisable\b/))) {
    if (!statusQuestion) add("volume_mute", 8);
    else if (volumeTopic || has(text, /\b(sound|volume|speakers?|audio)\b/)) add("volume_status", 7);
  } else if (volumeTopic && !volumeShift) {
    add("volume_status", 7);
  }

  if (has(text, /\bbluetooth\b/)) {
    const changing = has(text, /\b(turn|switch|set|enable|disable)\b/);
    if (!statusQuestion && changing && (has(text, /\boff\b/) || has(text, /\bdisable\b/))) add("bluetooth_off", 9);
    else if (!statusQuestion && changing && (has(text, /\bon\b/) || has(text, /\benable\b/))) add("bluetooth_on", 9);
    else add("bluetooth_status", 7);
  }
  if (has(text, /\bfirewall\b/)) {
    const changing = has(text, /\b(turn|switch|set|enable|disable)\b/);
    if (!statusQuestion && changing && (has(text, /\boff\b/) || has(text, /\bdisable\b/))) add("firewall_off", 9);
    else if (!statusQuestion && changing && (has(text, /\bon\b/) || has(text, /\benable\b/))) add("firewall_on", 9);
    else add("firewall_status", 7);
  }
  if (has(text, /\b(wi-?fi|wireless)\b/)) {
    const changing = has(text, /\b(turn|switch|enable|disable)\b/) && has(text, /\b(on|off|enable|disable)\b/);
    if (!changing) add("wifi_status", 7);
  } else if (has(text, /\b(network\s+adapter|ethernet|internet\s+connection|am\s+i\s+online)\b/)
    || (has(text, /\b(network|internet)\b/) && has(text, /\b(status|check|show|connected|connection|working|up|down)\b/))) {
    add("network_status", 7);
  }

  if (has(text, /\bprinters?\b/)) add("printers_status", 7);
  if (has(text, /\b(camera|webcam)\b/)) {
    if (asks(text, "off")) add("device_disable", 8, "camera");
    else if (asks(text, "on")) add("device_enable", 8, "camera");
    else add("camera_status", 7);
  }
  if (has(text, /\b(microphone|mic)\b/)) {
    if (asks(text, "off")) add("microphone_off", 8);
    else if (asks(text, "on")) add("microphone_on", 8);
    else if (!volumeTopic) add("audio_status", 6);
  }
  if (has(text, /\b(audio\s+devices?|sound\s+devices?|speakers?|headset)\b/)
    && !volumeTopic
    && !has(text, /\b(mute|unmute|volume|loud)\b/)
    && !has(text, /\b(enable|disable|turn)\b/)) {
    add("audio_status", 7);
  }
  if (has(text, /\bpower\s+(plan|scheme|mode)\b/) || has(text, /\bwhich\s+power\b/) || has(text, /\bactive\s+power\b/)) add("power_status", 7);
  if (has(text, /\bstartup\b/) || has(text, /\bstarts?\s+with\s+windows\b/) || has(text, /\bwhen\s+(?:i\s+)?(?:start|boot)\s+windows\b/) || has(text, /\bboot\s+apps\b/)) {
    add("startup_status", 7);
  }
  if (has(text, /\b(installed\s+(?:programs|apps)|what(?:'s| is)\s+installed|programs\s+installed|list\s+(?:the\s+)?(?:programs|apps))\b/)) {
    add("programs_status", 7);
  }
  const foundProgram = text.match(/\b(?:find|search)\s+(?:for\s+)?(?:the\s+)?(?:program|app)\s+([a-z0-9 ._-]{1,40})/);
  if (foundProgram) add("programs_status", 8, foundProgram[1].trim());
  const installed = text.match(/\bis\s+([a-z0-9._-]{1,40})\s+installed\b/);
  const installedName = cleanName(installed?.[1]);
  if (installedName) add("programs_status", 7, installedName);
  if (has(text, /\b(devices|peripherals)\b/) || has(text, /\bwhat(?:'s| is)\s+connected\b/) || has(text, /\bconnected\s+devices\b/)) {
    add("devices_status", 7);
  }

  const specificPart = percent || batteryWord || diskWord || ramWord || cpuWord
    || has(text, /\b(gpu|graphics|display|monitor|wifi|wi-fi|bluetooth|firewall|volume|camera|printer)\b/);
  if (!specificPart && (has(text, /\b(all\s+components|hardware\s+status|full\s+(?:pc\s+)?status|system\s+status|pc\s+status|computer\s+status)\b/)
    || (has(text, /\b(pc|computer|machine|laptop)\b/) && has(text, /\b(status|health|doing|overview|hardware|components)\b/))
    || /^(?:how(?:'s| is)\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:pc|computer|system|laptop|machine)(?:\s+doing)?$/.test(text))) {
    add("components_status", 8);
  }

  if (/^(?:shut\s*down|shutdown|power\s*off)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(text)
    || has(text, /\b(?:turn|power|switch)\s+off\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\b/)
    || has(text, /\b(?:shut\s*down|shutdown|power\s*off)\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\b/)) {
    add("shutdown", 9);
  }
  if (/^(?:restart|reboot)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop|windows))?$/.test(text)
    || has(text, /\b(?:restart|reboot)\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop|windows)\b/)) {
    add("restart", 8);
  }
  if (/^(?:sleep|suspend)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(text)
    || has(text, /\bput\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\s+to\s+sleep\b/)
    || text === "go to sleep") {
    add("sleep", 8);
  }

  const serviceStatus = text.match(/\b(?:is|check|show)\s+(?:if\s+|whether\s+|that\s+)?(?:the\s+)?service\s+([a-z0-9._-]{1,40})(?:\s+running)?\b/)
    || text.match(/\b(?:is|check)\s+(?:if\s+|whether\s+)?(?:the\s+)?([a-z0-9._-]{1,40})\s+service\s+(?:is\s+)?running\b/);
  const serviceName = cleanName(serviceStatus?.[1]);
  if (serviceName) add("service_status", 8, serviceName);
  const serviceChange = text.match(/\b(start|stop)\s+(?:the\s+)?(?:([a-z0-9._-]{1,40})\s+)?service(?:\s+([a-z0-9._-]{1,40}))?\b/);
  const serviceChangeName = cleanName(serviceChange?.[3] || serviceChange?.[2]);
  if (serviceChange && serviceChangeName) {
    add(serviceChange[1] === "start" ? "service_start" : "service_stop", 8, serviceChangeName);
  }

  if (!has(text, /\bservice\b/)) {
    const processStatus = text.match(/\b(?:is|check|ensure|make\s+sure)\s+(?:if\s+|whether\s+|that\s+)?(?:the\s+)?(?:process\s+)?([a-z0-9._-]{1,40})\s+(?:is\s+)?(?:still\s+)?running\b/);
    const processName = cleanName(processStatus?.[1]);
    if (processName) add("process_status", 8, processName);
    const processStop = text.match(/\b(?:stop|end|kill|quit|close)\s+(?:the\s+)?(?:process\s+)?([a-z0-9._-]{1,40})\b/);
    const stopName = cleanName(processStop?.[1]);
    if (stopName) add("process_stop", 8, stopName);
  }

  if (!has(text, /\b(bluetooth|firewall|camera|webcam|microphone|mic|wifi|wi-fi|volume|sound|brightness|clipboard|theme|dark|light|night|update|updates|default|defaults|picture|photo|screenshot)\b/)) {
    const unsafeTarget = /\b(format|wipe|erase|delete|everything|files)\b/;
    const device = text.match(/\b(enable|disable)\s+(?:the\s+|my\s+)?([a-z0-9][a-z0-9 ._()/-]{0,60})/);
    const turned = text.match(/\bturn\s+(on|off)\s+(?:the\s+|my\s+)?([a-z0-9][a-z0-9 ._-]{0,40})/);
    if (device && !/^(it|that|this|them)$/.test(device[2].trim()) && !unsafeTarget.test(device[2])) {
      add(device[1] === "enable" ? "device_enable" : "device_disable", 7, device[2].trim());
    } else if (turned && !/^(it|that|this|computer|pc|system|laptop|machine|speaker|audio)$/.test(turned[2].trim()) && !unsafeTarget.test(turned[2])) {
      add(turned[1] === "on" ? "device_enable" : "device_disable", 7, turned[2].trim());
    }
  }

  if (/^(?:start\s+)?(?:listen|listening|hear\s+me)(?:\s+to\s+me)?(?:\s+for\s+(?:a\s+)?(?:few|moment|\d{1,2})\s*(?:seconds?)?)?$/.test(text)) {
    add("listen", 7, "8");
  }
  const spoken = text.match(/^(?:say|speak)(?:\s+aloud)?\s+(.{1,180})$/);
  if (spoken && !has(spoken[1], /\b(read|file|folder|project|run|open|install|code|document|video)\b/)) {
    add("speak", 6, spoken[1].trim());
  }
  const transcribe = text.match(/\btranscribe\s+(\S+)/);
  if (transcribe) add("transcribe", 8, transcribe[1].replace(/^["']|["']$/g, ""));

  return best(hits);
}
