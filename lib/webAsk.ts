/** Public-web permission. Safe for the browser bundle: no network and no files. */

const WEB_ASK_MARKER = /<!--web-ask:([\s\S]*?)-->/;

export function encodeWebAsk(url: string): string {
  return `\n\nInternet is connected. Allow this page for the goal?\n${url}\n\n<!--web-ask:${encodeURIComponent(url)}-->`;
}

export function decodeWebAsk(content: string): { text: string; url: string | null } {
  const match = content.match(WEB_ASK_MARKER);
  const text = content.replace(WEB_ASK_MARKER, "").trim();
  if (!match) return { text, url: null };
  try {
    const url = decodeURIComponent(match[1]);
    return { text, url: parsePublicUrl(url).ok ? url : null };
  } catch {
    return { text, url: null };
  }
}

function isPrivateHost(host: string): boolean {
  const name = host.replace(/^\[|\]$/g, "").toLowerCase();
  if (!name || name === "localhost" || name.endsWith(".localhost") || name.endsWith(".local")) return true;
  if (name === "::1" || name === "0.0.0.0") return true;
  const parts = name.split(".");
  if (parts.length !== 4 || parts.some((part) => !/^\d+$/.test(part))) return name.includes(":");
  const numbers = parts.map((part) => Number(part));
  const [a, b] = numbers;
  if (numbers.some((part) => part > 255)) return true;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 169 && b === 254) return true;
  return false;
}

/** One public http(s) page. Local addresses stay on the app-look path. */
export function parsePublicUrl(value: string): { ok: true; url: string } | { ok: false; reason: string } {
  const raw = value.trim();
  if (!raw) return { ok: false, reason: "No page was named." };
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, reason: "That is not a web address." };
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, reason: "Only an http or https page can be opened." };
  }
  if (parsed.username || parsed.password) return { ok: false, reason: "A page address cannot carry a password." };
  if (isPrivateHost(parsed.hostname)) return { ok: false, reason: "That address is on this PC or a private network, so the web tool left it alone." };
  return { ok: true, url: parsed.toString() };
}
