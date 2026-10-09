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
import { execFile } from "child_process";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

let ollamaOperationQueue: Promise<void> = Promise.resolve();
let queuedOperations = 0;
let activeModel: string | null = null;
let activeHost: string | null = null;

export async function releaseLoadedModels(host: string): Promise<string[]> {
  const loaded = await listLoadedModels(host);
  await Promise.all(loaded.map((model) => unloadModel(host, model)));
  return loaded;
}

async function unloadModel(host: string, model: string): Promise<void> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    await fetch(`${host}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, keep_alive: 0 }),
      signal: controller.signal,
    });
    clearTimeout(timer);
  } catch { /* best effort */ }
}

export async function listLoadedModels(host: string): Promise<string[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(`${host}/api/ps`, { cache: "no-store", signal: controller.signal });
    clearTimeout(timer);
    const data = await response.json() as { models?: { name: string }[] };
    return (data.models ?? []).map((model) => model.name);
  } catch {
    return [];
  }
}

/** Acquire the only model slot and unload other models before inference. */
export async function acquireOllamaModel(host: string, model: string): Promise<() => void> {
  queuedOperations++;
  const previous = ollamaOperationQueue;
  let release!: () => void;
  ollamaOperationQueue = new Promise<void>((resolve) => { release = resolve; });
  await previous;
  queuedOperations--;
  activeModel = model || null;
  activeHost = host;
  let released = false;
  try {
    const loadedModels = await listLoadedModels(host);
    await Promise.all(
      loadedModels
        .filter((loadedModel) => loadedModel !== model)
        .map((loadedModel) => unloadModel(host, loadedModel))
    );
    return () => {
      if (released) return;
      released = true;
      activeModel = null;
      activeHost = null;
      release();
    };
  } catch (error) {
    activeModel = null;
    activeHost = null;
    release();
    throw error;
  }
}

export async function getOllamaSchedulerStatus(host = getPrimaryHost()) {
  return {
    queued_operations: queuedOperations,
    active_model: activeHost === host ? activeModel : null,
    loaded_models: await listLoadedModels(host),
  };
}

/** Best-effort cleanup for a model server left behind after a load timeout. */
export async function cleanupOrphanedLlamaServers(): Promise<void> {
  try {
    if (process.platform === "win32") {
      await execFileAsync("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "Get-Process -Name llama-server -ErrorAction SilentlyContinue | Stop-Process -Force"]);
    } else {
      await execFileAsync("pkill", ["-f", "llama-server"]);
    }
  } catch { /* no matching orphan or cleanup unavailable */ }
}

/** Serialize model load/inference operations so concurrent requests do not load multiple models. */
export async function withOllamaModelLock<T>(
  operation: () => Promise<T>,
  host = LOCAL_OLLAMA,
  model = ""
): Promise<T> {
  const release = await acquireOllamaModel(host, model);
  try {
    return await operation();
  } finally {
    release();
  }
}

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
/**
 * Poll until the local model server answers. A down server is a wait, not a dropped message.
 * Returns null when the wait is cancelled or the attempt cap is reached.
 */
export async function waitForModelServer(options: {
  isCancelled?: () => boolean;
  onWait?: (attempt: number) => void;
  maxAttempts?: number;
} = {}): Promise<string | null> {
  const maxAttempts = options.maxAttempts ?? 20;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (options.isCancelled?.()) return null;
    try {
      return await resolveOllamaHost();
    } catch {
      options.onWait?.(attempt);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }
  return null;
}

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
