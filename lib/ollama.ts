/**
 * Ollama connection resolver with Azure fallback.
 *
 * Priority order:
 *   1. OLLAMA_HOST env var (if set — could be Azure, cloud VM, etc.)
 *   2. Local Ollama at 127.0.0.1:11434
 *
 * If the primary host is unreachable and a fallback is available, we
 * automatically switch for that request cycle.
 */

const LOCAL_OLLAMA = "http://127.0.0.1:11434";
const AZURE_HOST   = process.env.OLLAMA_HOST?.trim() ?? "";

/** Returns the configured primary host (Azure/cloud if set, local otherwise). */
export function getPrimaryHost(): string {
  return AZURE_HOST || LOCAL_OLLAMA;
}

/** Returns the local fallback host (only useful if primary is Azure). */
export function getLocalHost(): string {
  return LOCAL_OLLAMA;
}

/**
 * Returns true if OLLAMA_HOST is explicitly set to a non-local address,
 * meaning we should route to Azure/cloud.
 */
export function isCloudConfigured(): boolean {
  return !!AZURE_HOST && !AZURE_HOST.includes("127.0.0.1") && !AZURE_HOST.includes("localhost");
}

/**
 * Quick health-check for a given Ollama host.
 * Returns true if reachable within the given timeout (ms).
 */
export async function isReachable(host: string, timeoutMs = 3000): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(`${host}/api/tags`, {
      cache: "no-store",
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Returns the best available Ollama host, trying primary first then local.
 * Throws a descriptive error if neither is reachable.
 */
export async function resolveOllamaHost(): Promise<string> {
  const primary = getPrimaryHost();

  // Fast path — if already reachable, return immediately
  if (await isReachable(primary, 3000)) {
    return primary;
  }

  // If primary was Azure/cloud and it failed, try local as backup
  if (isCloudConfigured()) {
    if (await isReachable(LOCAL_OLLAMA, 2000)) {
      console.warn("[ollama] Cloud host unreachable, falling back to local Ollama");
      return LOCAL_OLLAMA;
    }
    throw new Error(
      `Cannot reach Ollama. Tried: ${primary} (cloud) and ${LOCAL_OLLAMA} (local). ` +
      `Make sure Ollama is running locally or your Azure instance is up.`
    );
  }

  throw new Error(
    `Cannot reach Ollama at ${primary}. ` +
    `Make sure Ollama is running (run: ollama serve), ` +
    `or set the OLLAMA_HOST environment variable to point to an Azure/cloud instance.`
  );
}

/**
 * Convenience: fetch from the best available Ollama host.
 * Automatically resolves host and prepends it to the path.
 */
export async function ollamaFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const host = await resolveOllamaHost();
  return fetch(`${host}${path}`, init);
}
