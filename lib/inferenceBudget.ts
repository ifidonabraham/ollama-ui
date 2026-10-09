/** How long one model call may run before Fonia checks whether it is still working. */

export function estimateModelMb(name: string): number {
  if (/moondream/i.test(name)) return 2800;
  if (/1\.5b/i.test(name)) return 2200;
  if (/:3b\b/i.test(name)) return 3800;
  if (/14b/i.test(name)) return 9000;
  if (/8b/i.test(name)) return 7200;
  if (/7b/i.test(name)) return 6200;
  return 4500;
}

export function sameModel(loaded: string, requested: string): boolean {
  const left = loaded.toLowerCase();
  const right = requested.toLowerCase();
  return left === right || left.startsWith(`${right}:`) || right.startsWith(`${left}:`);
}

export function inferenceBudgetMs(options: { model: string; loaded: boolean; freeMb: number }): { ms: number; note: string } {
  const small = /1\.5b/i.test(options.model);
  const large = /14b/i.test(options.model);
  const generate = small ? 90_000 : large ? 240_000 : 180_000;
  const load = options.loaded ? 0 : small ? 60_000 : large ? 150_000 : 120_000;
  const needs = estimateModelMb(options.model);
  const tight = options.freeMb < needs ? 60_000 : 0;
  const ms = generate + load + tight;
  const seconds = Math.round(ms / 1000);
  const head = options.loaded
    ? `${options.model} is already loaded. This run can use ${seconds} seconds before the server is checked.`
    : `${options.model} is not loaded yet. The first run can use ${seconds} seconds, then the server is checked before it is stopped.`;
  const ram = tight ? ` Free RAM is ${options.freeMb} MB, under the ${needs} MB this model usually needs.` : "";
  return { ms, note: `${head}${ram}` };
}

export interface WaitDecision {
  action: "wait" | "stop";
  extraMs: number;
  note: string;
}

/** After the first budget, keep waiting only while Ollama is still up. A hot model gets two extensions. */
export function nextWait(options: {
  elapsedMs: number;
  budgetMs: number;
  extensions: number;
  serverUp: boolean;
  hot: boolean;
}): WaitDecision {
  if (!options.serverUp) {
    return { action: "stop", extraMs: 0, note: "The model server stopped answering." };
  }
  const cap = options.budgetMs + 120_000;
  if (options.extensions >= 2 || options.elapsedMs >= cap) {
    return { action: "stop", extraMs: 0, note: "The extended wait is over." };
  }
  if (options.hot) {
    return { action: "wait", extraMs: 60_000, note: "The model is still in memory and working. The wait is extended by 60 seconds." };
  }
  return { action: "wait", extraMs: 45_000, note: "The model server is still up. The wait is extended by 45 seconds." };
}
