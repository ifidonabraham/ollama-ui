import { parsePublicUrl } from "./webAsk";

/** A real route to the public web, not just a local adapter. */
export async function internetIsUp(): Promise<boolean> {
  try {
    const response = await fetch("https://www.gstatic.com/generate_204", {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    return response.status === 204 || response.ok;
  } catch {
    return false;
  }
}

export async function fetchPublicPage(url: string): Promise<string> {
  const parsed = parsePublicUrl(url);
  if (!parsed.ok) return `Error: ${parsed.reason}`;
  try {
    const response = await fetch(parsed.url, {
      signal: AbortSignal.timeout(12_000),
      cache: "no-store",
      redirect: "follow",
      headers: { "User-Agent": "Fonia" },
    });
    const landed = parsePublicUrl(response.url || parsed.url);
    if (!landed.ok) return `Error: ${landed.reason}`;
    const text = await response.text();
    const body = text.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    return `Page ${response.status} ${landed.url}\n${body.slice(0, 8000) || "(no text)"}`;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return `Error: The page could not be read. ${message.slice(0, 300)}`;
  }
}

export async function prepareWebFetch(raw: string, allowed: boolean): Promise<
  | { kind: "note"; note: string }
  | { kind: "ask"; url: string; note: string }
  | { kind: "page"; text: string }
> {
  const parsed = parsePublicUrl(raw);
  if (!parsed.ok) return { kind: "note", note: `Error: ${parsed.reason}` };
  const online = await internetIsUp();
  if (!online) return { kind: "note", note: "No internet connection is visible, so the page was not opened." };
  if (!allowed) {
    return {
      kind: "ask",
      url: parsed.url,
      note: `Internet is connected. The page stays closed until you allow it: ${parsed.url}`,
    };
  }
  return { kind: "page", text: await fetchPublicPage(parsed.url) };
}
