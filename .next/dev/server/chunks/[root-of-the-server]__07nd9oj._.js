module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/app/api/models/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ollama.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ollamaFetch"])("/api/tags", {
            cache: "no-store"
        });
        if (!res.ok) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Ollama error: ${res.statusText}`
            }, {
                status: 502
            });
        }
        const data = await res.json();
        const models = (data.models ?? []).map((m)=>({
                name: m.name,
                size: m.size,
                modified_at: m.modified_at
            }));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            models,
            free_memory_mb: Math.round(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].freemem() / 1024 / 1024),
            total_memory_mb: Math.round(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].totalmem() / 1024 / 1024),
            source: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCloudConfigured"])() ? "cloud" : "local",
            host: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getPrimaryHost"])()
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[models]", msg);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: msg,
            models: [],
            free_memory_mb: Math.round(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].freemem() / 1024 / 1024),
            total_memory_mb: Math.round(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].totalmem() / 1024 / 1024),
            source: "offline",
            hint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isCloudConfigured"])() ? "Your Azure Ollama instance is unreachable. Check if the container is running." : "Ollama is not running. Start it with: ollama serve"
        }, {
            status: 503
        });
    }
}
}),
"[project]/lib/ollama.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acquireOllamaModel",
    ()=>acquireOllamaModel,
    "getLocalHost",
    ()=>getLocalHost,
    "getPrimaryHost",
    ()=>getPrimaryHost,
    "isCloudConfigured",
    ()=>isCloudConfigured,
    "isReachable",
    ()=>isReachable,
    "ollamaFetch",
    ()=>ollamaFetch,
    "resolveOllamaHost",
    ()=>resolveOllamaHost,
    "withOllamaModelLock",
    ()=>withOllamaModelLock
]);
/**
 * Ollama connection resolver with Azure fallback.
 *
 * Priority order:
 *   1. OLLAMA_HOST env var (if set — could be Azure, cloud VM, etc.)
 *   2. Local Ollama at 127.0.0.1:11434
 *
 * If the primary host is unreachable and a fallback is available, we
 * automatically switch for that request cycle.
 */ const LOCAL_OLLAMA = "http://127.0.0.1:11434";
const AZURE_HOST = process.env.OLLAMA_HOST?.trim() ?? "";
let ollamaOperationQueue = Promise.resolve();
async function unloadModel(host, model) {
    try {
        await fetch(`${host}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                keep_alive: 0
            })
        });
    } catch  {}
}
async function getLoadedModels(host) {
    try {
        const response = await fetch(`${host}/api/ps`, {
            cache: "no-store"
        });
        const data = await response.json();
        return (data.models ?? []).map((model)=>model.name);
    } catch  {
        return [];
    }
}
async function acquireOllamaModel(host, model) {
    const previous = ollamaOperationQueue;
    let release;
    ollamaOperationQueue = new Promise((resolve)=>{
        release = resolve;
    });
    await previous;
    try {
        const loadedModels = await getLoadedModels(host);
        await Promise.all(loadedModels.filter((loadedModel)=>loadedModel !== model).map((loadedModel)=>unloadModel(host, loadedModel)));
        return release;
    } catch (error) {
        release();
        throw error;
    }
}
async function withOllamaModelLock(operation, host = LOCAL_OLLAMA, model = "") {
    const release = await acquireOllamaModel(host, model);
    try {
        return await operation();
    } finally{
        release();
    }
}
function getPrimaryHost() {
    return AZURE_HOST || LOCAL_OLLAMA;
}
function getLocalHost() {
    return LOCAL_OLLAMA;
}
function isCloudConfigured() {
    return !!AZURE_HOST && !AZURE_HOST.includes("127.0.0.1") && !AZURE_HOST.includes("localhost");
}
async function isReachable(host, timeoutMs = 3000) {
    try {
        const ctrl = new AbortController();
        const timer = setTimeout(()=>ctrl.abort(), timeoutMs);
        const res = await fetch(`${host}/api/tags`, {
            cache: "no-store",
            signal: ctrl.signal
        });
        clearTimeout(timer);
        return res.ok;
    } catch  {
        return false;
    }
}
async function resolveOllamaHost() {
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
        throw new Error(`Cannot reach Ollama. Tried: ${primary} (cloud) and ${LOCAL_OLLAMA} (local). ` + `Make sure Ollama is running locally or your Azure instance is up.`);
    }
    throw new Error(`Cannot reach Ollama at ${primary}. ` + `Make sure Ollama is running (run: ollama serve), ` + `or set the OLLAMA_HOST environment variable to point to an Azure/cloud instance.`);
}
async function ollamaFetch(path, init) {
    const host = await resolveOllamaHost();
    return fetch(`${host}${path}`, init);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__07nd9oj._.js.map