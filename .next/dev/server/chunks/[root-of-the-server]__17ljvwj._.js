module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
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
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "isVisionModel",
    ()=>isVisionModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/ollama.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
// Models known to support vision — checked by name prefix
const VISION_PREFIXES = [
    "llava",
    "moondream",
    "minicpm-v",
    "llava-llama3",
    "llava-phi3",
    "bakllava",
    "cogvlm"
];
function isVisionModel(model) {
    const lower = model.toLowerCase();
    return VISION_PREFIXES.some((p)=>lower.startsWith(p));
}
async function POST(req) {
    try {
        const body = await req.json();
        const { session_id, content, model: modelOverride, images } = body;
        if (!session_id || !content) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "session_id and content are required"
            }, {
                status: 400
            });
        }
        const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])(session_id);
        if (!session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Session not found"
            }, {
                status: 404
            });
        }
        const model = modelOverride ?? session.model;
        // Persist user message
        const userMsgId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
        const userContent = images && images.length > 0 ? `${content}\n<!-- images:${images.length} -->` : content;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMessage"])(userMsgId, session_id, "user", userContent);
        // Build Ollama message history
        const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMessages"])(session_id, "chat");
        const ollamaMessages = [];
        if (session.system_prompt) {
            ollamaMessages.push({
                role: "system",
                content: session.system_prompt
            });
        }
        for (const m of history){
            const cleanContent = m.content.replace(/\n<!-- images:\d+ -->$/, "");
            ollamaMessages.push({
                role: m.role,
                content: cleanContent
            });
        }
        if (images && images.length > 0) {
            const last = ollamaMessages[ollamaMessages.length - 1];
            if (last && last.role === "user") {
                last.images = images;
            }
        }
        let ollamaRes;
        let releaseModel = null;
        try {
            const ollamaHost = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveOllamaHost"])();
            releaseModel = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$ollama$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["acquireOllamaModel"])(ollamaHost, model);
            ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model,
                    messages: ollamaMessages,
                    stream: true,
                    keep_alive: "30s"
                })
            });
        } catch (err) {
            releaseModel?.();
            const msg = err instanceof Error ? err.message : "Cannot reach Ollama";
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: msg
            }, {
                status: 503
            });
        }
        if (!ollamaRes.ok || !ollamaRes.body) {
            releaseModel?.();
            const errText = await ollamaRes.text().catch(()=>ollamaRes.statusText);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: `Ollama error: ${errText}`
            }, {
                status: 502
            });
        }
        const assistantMsgId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
        let fullContent = "";
        const encoder = new TextEncoder();
        const readable = new ReadableStream({
            async start (controller) {
                const reader = ollamaRes.body.getReader();
                const decoder = new TextDecoder();
                try {
                    while(true){
                        const { done, value } = await reader.read();
                        if (done) break;
                        const chunk = decoder.decode(value, {
                            stream: true
                        });
                        const lines = chunk.split("\n").filter(Boolean);
                        for (const line of lines){
                            try {
                                const data = JSON.parse(line);
                                if (data.message?.content) {
                                    fullContent += data.message.content;
                                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                        delta: data.message.content
                                    })}\n\n`));
                                }
                                if (data.done) {
                                    const models = [
                                        {
                                            name: model,
                                            role: "chat"
                                        }
                                    ];
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMessage"])(assistantMsgId, session_id, "assistant", fullContent, "chat", models);
                                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                        done: true,
                                        id: assistantMsgId,
                                        models
                                    })}\n\n`));
                                }
                            } catch  {
                            // skip malformed JSON
                            }
                        }
                    }
                } finally{
                    releaseModel?.();
                    controller.close();
                }
            }
        });
        return new Response(readable, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                Connection: "keep-alive"
            }
        });
    } catch (err) {
        console.error("[chat]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/answerModels.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FILES_ANSWER",
    ()=>FILES_ANSWER,
    "LOCAL_COMMAND_ANSWER",
    ()=>LOCAL_COMMAND_ANSWER,
    "NO_MODEL_ANSWER",
    ()=>NO_MODEL_ANSWER,
    "SERVER_ANSWER",
    ()=>SERVER_ANSWER,
    "SESSION_LOG_ANSWER",
    ()=>SESSION_LOG_ANSWER,
    "asAnswerModels",
    ()=>asAnswerModels,
    "formatAnswerModels",
    ()=>formatAnswerModels,
    "modelsThatAnswered",
    ()=>modelsThatAnswered
]);
const FILES_ANSWER = [
    {
        name: "",
        role: "files on disk"
    }
];
const SESSION_LOG_ANSWER = [
    {
        name: "",
        role: "session log"
    }
];
const LOCAL_COMMAND_ANSWER = [
    {
        name: "",
        role: "local command"
    }
];
const NO_MODEL_ANSWER = [
    {
        name: "",
        role: "no model"
    }
];
const SERVER_ANSWER = [
    {
        name: "",
        role: "server"
    }
];
function formatAnswerModels(models) {
    return models.map((model)=>model.name ? `${model.name} · ${model.role}` : model.role).filter(Boolean).join(", ");
}
function asAnswerModels(value) {
    if (!Array.isArray(value)) return [];
    const models = [];
    for (const item of value){
        if (!item || typeof item !== "object") continue;
        const record = item;
        const name = typeof record.name === "string" ? record.name : "";
        const role = typeof record.role === "string" ? record.role : "";
        if (!name && !role) continue;
        if (models.some((model)=>model.name === name && model.role === role)) continue;
        models.push({
            name,
            role
        });
    }
    return models;
}
function modelsThatAnswered(input) {
    if (input.fromFiles) return FILES_ANSWER;
    const models = [];
    if (input.visionWorked && input.visionModel) models.push({
        name: input.visionModel,
        role: "vision"
    });
    if (input.plannerWorked && input.plannerModel) models.push({
        name: input.plannerModel,
        role: input.plannerRole || "planner"
    });
    if (input.executorWorked && input.executorModel) {
        models.push({
            name: input.executorModel,
            role: input.executorRole || "coding"
        });
    }
    return models.length ? models : NO_MODEL_ANSWER;
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addMessage",
    ()=>addMessage,
    "clearMessages",
    ()=>clearMessages,
    "createSession",
    ()=>createSession,
    "deleteMessage",
    ()=>deleteMessage,
    "deleteSession",
    ()=>deleteSession,
    "getAgentJob",
    ()=>getAgentJob,
    "getAgentState",
    ()=>getAgentState,
    "getMessages",
    ()=>getMessages,
    "getSession",
    ()=>getSession,
    "listAgentJobs",
    ()=>listAgentJobs,
    "listSessions",
    ()=>listSessions,
    "saveAgentJob",
    ()=>saveAgentJob,
    "sessionTitleFromMessage",
    ()=>sessionTitleFromMessage,
    "updateAgentState",
    ()=>updateAgentState,
    "updateSession",
    ()=>updateSession
]);
/**
 * Database layer — uses better-sqlite3 when running locally/server,
 * and a simple in-memory store when running on Vercel (serverless).
 *
 * On Vercel, sessions are ephemeral (reset on each cold start). This is
 * acceptable since the app's primary data (models, conversations) lives
 * in the user's Ollama instance, not the DB.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/answerModels.ts [app-route] (ecmascript)");
;
// ── Detect environment ────────────────────────────────────────────────────
const IS_VERCEL = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;
// ── In-memory store (Vercel fallback) ────────────────────────────────────
const memSessions = new Map();
const memMessages = new Map();
const memAgentStates = new Map();
function nowSec() {
    return Math.floor(Date.now() / 1000);
}
// ── SQLite implementation ─────────────────────────────────────────────────
let _sqliteDb = null;
function getSqliteDb() {
    if (_sqliteDb) return _sqliteDb;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Database = __turbopack_context__.r("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
    const fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
    const path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
    const DB_DIR = path.join(process.cwd(), ".data");
    const DB_PATH = path.join(DB_DIR, "ollama-ui.db");
    if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, {
            recursive: true
        });
    }
    _sqliteDb = new Database(DB_PATH);
    _sqliteDb.pragma("journal_mode = WAL");
    _sqliteDb.pragma("foreign_keys = ON");
    initSchema(_sqliteDb);
    return _sqliteDb;
}
function initSchema(db) {
    db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id        TEXT PRIMARY KEY,
      title     TEXT NOT NULL DEFAULT 'New Chat',
      model     TEXT NOT NULL,
      system_prompt TEXT NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS messages (
      id         TEXT PRIMARY KEY,
      session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      role       TEXT NOT NULL CHECK(role IN ('user','assistant','system')),
      content    TEXT NOT NULL,
      channel    TEXT NOT NULL DEFAULT 'chat',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);
  `);
    try {
        db.exec("ALTER TABLE messages ADD COLUMN channel TEXT NOT NULL DEFAULT 'chat'");
    } catch  {}
    try {
        db.exec("ALTER TABLE messages ADD COLUMN models_json TEXT NOT NULL DEFAULT '[]'");
    } catch  {}
    db.exec("CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(session_id, channel, created_at)");
    db.exec(`
    CREATE TABLE IF NOT EXISTS agent_state (
      session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
      inspected_files TEXT NOT NULL DEFAULT '[]',
      decisions TEXT NOT NULL DEFAULT '[]',
      tool_results TEXT NOT NULL DEFAULT '[]',
      tests_run TEXT NOT NULL DEFAULT '[]',
      phase TEXT NOT NULL DEFAULT 'idle',
      model TEXT NOT NULL DEFAULT '',
      model_role TEXT NOT NULL DEFAULT '',
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS agent_jobs (
      id TEXT PRIMARY KEY,
      session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      phase TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      error TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_agent_jobs_session ON agent_jobs(session_id, updated_at);
  `);
}
function listSessions() {
    if (IS_VERCEL) {
        return Array.from(memSessions.values()).sort((a, b)=>b.updated_at - a.updated_at);
    }
    return getSqliteDb().prepare("SELECT * FROM sessions ORDER BY updated_at DESC").all();
}
function getSession(id) {
    if (IS_VERCEL) {
        return memSessions.get(id);
    }
    return getSqliteDb().prepare("SELECT * FROM sessions WHERE id = ?").get(id);
}
function createSession(id, model, title = "New Chat", system_prompt = "") {
    if (IS_VERCEL) {
        const now = nowSec();
        const session = {
            id,
            title,
            model,
            system_prompt,
            created_at: now,
            updated_at: now
        };
        memSessions.set(id, session);
        return session;
    }
    const db = getSqliteDb();
    db.prepare(`INSERT INTO sessions (id, title, model, system_prompt) VALUES (?, ?, ?, ?)`).run(id, title, model, system_prompt);
    return getSession(id);
}
function sessionTitleFromMessage(text) {
    const line = text.replace(/\s+/g, " ").trim();
    if (!line) return "New Chat";
    return line.length > 42 ? `${line.slice(0, 42)}…` : line;
}
function updateSession(id, fields) {
    if (IS_VERCEL) {
        const s = memSessions.get(id);
        if (!s) return undefined;
        const updated = {
            ...s,
            ...fields,
            updated_at: nowSec()
        };
        memSessions.set(id, updated);
        return updated;
    }
    const db = getSqliteDb();
    const sets = [];
    const vals = [];
    if (fields.title !== undefined) {
        sets.push("title = ?");
        vals.push(fields.title);
    }
    if (fields.model !== undefined) {
        sets.push("model = ?");
        vals.push(fields.model);
    }
    if (fields.system_prompt !== undefined) {
        sets.push("system_prompt = ?");
        vals.push(fields.system_prompt);
    }
    if (sets.length === 0) return getSession(id);
    sets.push("updated_at = unixepoch()");
    vals.push(id);
    db.prepare(`UPDATE sessions SET ${sets.join(", ")} WHERE id = ?`).run(...vals);
    return getSession(id);
}
function deleteSession(id) {
    if (IS_VERCEL) {
        memSessions.delete(id);
        memAgentStates.delete(id);
        // Also delete messages
        for (const [msgId, msg] of memMessages.entries()){
            if (msg.session_id === id) memMessages.delete(msgId);
        }
        return;
    }
    getSqliteDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
}
function emptyAgentState(session_id) {
    return {
        session_id,
        inspected_files: [],
        decisions: [],
        tool_results: [],
        tests_run: [],
        phase: "idle",
        model: "",
        model_role: "",
        updated_at: nowSec()
    };
}
function getAgentState(session_id) {
    if (IS_VERCEL) return memAgentStates.get(session_id) ?? emptyAgentState(session_id);
    const row = getSqliteDb().prepare("SELECT * FROM agent_state WHERE session_id = ?").get(session_id);
    if (!row) return emptyAgentState(session_id);
    return {
        session_id: row.session_id,
        inspected_files: JSON.parse(row.inspected_files),
        decisions: JSON.parse(row.decisions),
        tool_results: JSON.parse(row.tool_results),
        tests_run: JSON.parse(row.tests_run),
        phase: row.phase,
        model: row.model,
        model_role: row.model_role,
        updated_at: row.updated_at
    };
}
function updateAgentState(session_id, patch) {
    const current = getAgentState(session_id);
    const next = {
        ...current,
        ...patch,
        updated_at: nowSec()
    };
    next.inspected_files = next.inspected_files.slice(-100);
    next.decisions = next.decisions.slice(-50);
    next.tool_results = next.tool_results.slice(-30);
    next.tests_run = next.tests_run.slice(-20);
    if (IS_VERCEL) {
        memAgentStates.set(session_id, next);
        return next;
    }
    getSqliteDb().prepare(`
    INSERT INTO agent_state (session_id, inspected_files, decisions, tool_results, tests_run, phase, model, model_role, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(session_id) DO UPDATE SET
      inspected_files = excluded.inspected_files,
      decisions = excluded.decisions,
      tool_results = excluded.tool_results,
      tests_run = excluded.tests_run,
      phase = excluded.phase,
      model = excluded.model,
      model_role = excluded.model_role,
      updated_at = excluded.updated_at
  `).run(session_id, JSON.stringify(next.inspected_files), JSON.stringify(next.decisions), JSON.stringify(next.tool_results), JSON.stringify(next.tests_run), next.phase, next.model, next.model_role, next.updated_at);
    return next;
}
function saveAgentJob(job) {
    if (IS_VERCEL) return job;
    getSqliteDb().prepare(`
    INSERT INTO agent_jobs (id, session_id, status, phase, model, role, error, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status, phase = excluded.phase, model = excluded.model,
      role = excluded.role, error = excluded.error, updated_at = excluded.updated_at
  `).run(job.id, job.session_id ?? null, job.status, job.phase, job.model ?? "", job.role ?? "", job.error ?? null, job.created_at, job.updated_at);
    return job;
}
function getAgentJob(id) {
    if (IS_VERCEL) return undefined;
    return getSqliteDb().prepare("SELECT * FROM agent_jobs WHERE id = ?").get(id);
}
function listAgentJobs(session_id) {
    if (IS_VERCEL) return [];
    return getSqliteDb().prepare("SELECT * FROM agent_jobs WHERE session_id = ? ORDER BY updated_at DESC LIMIT 20").all(session_id);
}
function rowToMessage(row) {
    return {
        id: row.id,
        session_id: row.session_id,
        role: row.role,
        content: row.content,
        channel: row.channel,
        created_at: row.created_at,
        models: row.models?.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asAnswerModels"])(row.models) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asAnswerModels"])(safeParse(row.models_json))
    };
}
function safeParse(raw) {
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch  {
        return [];
    }
}
function getMessages(session_id, channel) {
    if (IS_VERCEL) {
        return Array.from(memMessages.values()).filter((m)=>m.session_id === session_id && (!channel || m.channel === channel)).sort((a, b)=>a.created_at - b.created_at).map((message)=>rowToMessage(message));
    }
    const rows = channel ? getSqliteDb().prepare("SELECT * FROM messages WHERE session_id = ? AND channel = ? ORDER BY created_at ASC").all(session_id, channel) : getSqliteDb().prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC").all(session_id);
    return rows.map(rowToMessage);
}
function addMessage(id, session_id, role, content, channel = "chat", models = []) {
    const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["asAnswerModels"])(models);
    if (IS_VERCEL) {
        const msg = {
            id,
            session_id,
            role,
            content,
            channel,
            created_at: nowSec(),
            models: stored
        };
        memMessages.set(id, msg);
        const s = memSessions.get(session_id);
        if (s) memSessions.set(session_id, {
            ...s,
            updated_at: nowSec()
        });
        return msg;
    }
    const db = getSqliteDb();
    db.prepare(`INSERT INTO messages (id, session_id, role, content, channel, models_json) VALUES (?, ?, ?, ?, ?, ?)`).run(id, session_id, role, content, channel, JSON.stringify(stored));
    db.prepare(`UPDATE sessions SET updated_at = unixepoch() WHERE id = ?`).run(session_id);
    return rowToMessage(db.prepare("SELECT * FROM messages WHERE id = ?").get(id));
}
function deleteMessage(id) {
    if (IS_VERCEL) {
        memMessages.delete(id);
        return;
    }
    getSqliteDb().prepare("DELETE FROM messages WHERE id = ?").run(id);
}
function clearMessages(session_id) {
    if (IS_VERCEL) {
        for (const [msgId, msg] of memMessages.entries()){
            if (msg.session_id === session_id) memMessages.delete(msgId);
        }
        return;
    }
    getSqliteDb().prepare("DELETE FROM messages WHERE session_id = ?").run(session_id);
}
}),
"[project]/lib/ollama.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acquireOllamaModel",
    ()=>acquireOllamaModel,
    "cleanupOrphanedLlamaServers",
    ()=>cleanupOrphanedLlamaServers,
    "getLocalHost",
    ()=>getLocalHost,
    "getOllamaSchedulerStatus",
    ()=>getOllamaSchedulerStatus,
    "getPrimaryHost",
    ()=>getPrimaryHost,
    "isCloudConfigured",
    ()=>isCloudConfigured,
    "isReachable",
    ()=>isReachable,
    "listLoadedModels",
    ()=>listLoadedModels,
    "ollamaFetch",
    ()=>ollamaFetch,
    "releaseLoadedModels",
    ()=>releaseLoadedModels,
    "resolveOllamaHost",
    ()=>resolveOllamaHost,
    "waitForModelServer",
    ()=>waitForModelServer,
    "withOllamaModelLock",
    ()=>withOllamaModelLock
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
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
;
;
const execFileAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execFile"]);
let ollamaOperationQueue = Promise.resolve();
let queuedOperations = 0;
let activeModel = null;
let activeHost = null;
async function releaseLoadedModels(host) {
    const loaded = await listLoadedModels(host);
    await Promise.all(loaded.map((model)=>unloadModel(host, model)));
    return loaded;
}
async function unloadModel(host, model) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(()=>controller.abort(), 5000);
        await fetch(`${host}/api/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                keep_alive: 0
            }),
            signal: controller.signal
        });
        clearTimeout(timer);
    } catch  {}
}
async function listLoadedModels(host) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(()=>controller.abort(), 5000);
        const response = await fetch(`${host}/api/ps`, {
            cache: "no-store",
            signal: controller.signal
        });
        clearTimeout(timer);
        const data = await response.json();
        return (data.models ?? []).map((model)=>model.name);
    } catch  {
        return [];
    }
}
async function acquireOllamaModel(host, model) {
    queuedOperations++;
    const previous = ollamaOperationQueue;
    let release;
    ollamaOperationQueue = new Promise((resolve)=>{
        release = resolve;
    });
    await previous;
    queuedOperations--;
    activeModel = model || null;
    activeHost = host;
    let released = false;
    try {
        const loadedModels = await listLoadedModels(host);
        await Promise.all(loadedModels.filter((loadedModel)=>loadedModel !== model).map((loadedModel)=>unloadModel(host, loadedModel)));
        return ()=>{
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
async function getOllamaSchedulerStatus(host = getPrimaryHost()) {
    return {
        queued_operations: queuedOperations,
        active_model: activeHost === host ? activeModel : null,
        loaded_models: await listLoadedModels(host)
    };
}
async function cleanupOrphanedLlamaServers() {
    try {
        if ("TURBOPACK compile-time truthy", 1) {
            await execFileAsync("powershell.exe", [
                "-NoProfile",
                "-NonInteractive",
                "-Command",
                "Get-Process -Name llama-server -ErrorAction SilentlyContinue | Stop-Process -Force"
            ]);
        } else //TURBOPACK unreachable
        ;
    } catch  {}
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
async function waitForModelServer(options = {}) {
    const maxAttempts = options.maxAttempts ?? 20;
    for(let attempt = 1; attempt <= maxAttempts; attempt++){
        if (options.isCancelled?.()) return null;
        try {
            return await resolveOllamaHost();
        } catch  {
            options.onWait?.(attempt);
            await new Promise((resolve)=>setTimeout(resolve, 2000));
        }
    }
    return null;
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

//# sourceMappingURL=%5Broot-of-the-server%5D__17ljvwj._.js.map