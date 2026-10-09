/** Correct a mistyped word toward the command vocabulary. Unknown words stay as they are. */

const VOCAB = [
  "battery", "brightness", "bluetooth", "firewall", "screenshot", "picture", "photo",
  "memory", "processor", "graphics", "display", "monitor", "volume", "printer", "printers",
  "camera", "webcam", "microphone", "startup", "network", "internet", "wireless", "storage",
  "clipboard", "update", "updates", "default", "defaults", "theme", "restart", "reboot",
  "shutdown", "transcribe", "sleep", "mute", "unmute", "increase", "decrease", "status",
  "computer", "laptop", "percentage", "percent", "disk", "drive", "space", "wifi",
  "speaker", "speakers", "installed", "devices", "process", "service", "enable", "disable",
  "capture", "charging", "keyboard", "touchpad", "notepad", "windows", "dark", "light",
  "install", "scan", "click", "eject", "unplug", "flash", "usb", "removable",
];

const KNOWN = new Set(VOCAB);
/** Real words that sit one edit from a command. They are not typos. */
const KEEP = new Set([
  "enabled", "disabled", "increased", "decreased", "updated", "displayed",
  "pictured", "captured", "restarted", "muted", "unmuted",
]);

function distance(left: string, right: string): number {
  if (Math.abs(left.length - right.length) > 2) return 9;
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const current = row[j];
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + cost);
      previous = current;
    }
  }
  return row[right.length];
}

function isSubsequence(shorter: string, longer: string): boolean {
  let index = 0;
  for (const char of longer) {
    if (char === shorter[index]) index += 1;
    if (index === shorter.length) return true;
  }
  return false;
}

function correctToken(token: string): string {
  const word = token.toLowerCase();
  if (word.length < 4 || KNOWN.has(word) || KEEP.has(word) || /[0-9:\\/]/.test(word)) return token;
  const allowed = word.length >= 6 ? 2 : 1;
  let best = "";
  let bestDistance = allowed + 1;
  let ties = 0;
  for (const candidate of VOCAB) {
    if (candidate[0] !== word[0]) continue;
    const score = distance(word, candidate);
    if (score < bestDistance) {
      best = candidate;
      bestDistance = score;
      ties = 1;
    } else if (score === bestDistance && candidate !== best) {
      ties += 1;
    }
  }
  if (!best || ties !== 1 || bestDistance > allowed) return token;
  if (best.startsWith(word) && /^(?:ed|ing|s|es|d)$/.test(best.slice(word.length))) return token;
  if (word.startsWith(best) && /^(?:ed|ing|s|es|d)$/.test(word.slice(best.length))) return token;
  if (bestDistance > 1) {
    const shorter = word.length <= best.length ? word : best;
    const longer = word.length > best.length ? word : best;
    if (!isSubsequence(shorter, longer)) return token;
  }
  return best;
}

/** Fix mistyped command words. Words that are not close to the vocabulary are unchanged. */
export function correctTypos(content: string): string {
  return content.split(/(\s+)/).map((part) => (/\s/.test(part) ? part : correctToken(part))).join("");
}
