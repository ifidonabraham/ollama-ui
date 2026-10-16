module.exports = [
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
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
const OLLAMA_BASE = process.env.OLLAMA_HOST ?? "http://127.0.0.1:11434";
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
        // Persist user message (store image count in content annotation)
        const userMsgId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])();
        const userContent = images && images.length > 0 ? `${content}\n<!-- images:${images.length} -->` : content;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMessage"])(userMsgId, session_id, "user", userContent);
        // Build Ollama message history
        const history = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMessages"])(session_id);
        const ollamaMessages = [];
        if (session.system_prompt) {
            ollamaMessages.push({
                role: "system",
                content: session.system_prompt
            });
        }
        for (const m of history){
            // Strip image annotation from stored content
            const cleanContent = m.content.replace(/\n<!-- images:\d+ -->$/, "");
            ollamaMessages.push({
                role: m.role,
                content: cleanContent
            });
        }
        // Attach images to the last user message if provided
        if (images && images.length > 0) {
            const last = ollamaMessages[ollamaMessages.length - 1];
            if (last && last.role === "user") {
                last.images = images;
            }
        }
        // Call Ollama streaming API
        const ollamaRes = await fetch(`${OLLAMA_BASE}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model,
                messages: ollamaMessages,
                stream: true
            })
        });
        if (!ollamaRes.ok || !ollamaRes.body) {
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
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addMessage"])(assistantMsgId, session_id, "assistant", fullContent);
                                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({
                                        done: true,
                                        id: assistantMsgId
                                    })}\n\n`));
                                }
                            } catch  {
                            // skip malformed JSON
                            }
                        }
                    }
                } finally{
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
    "getDb",
    ()=>getDb,
    "getMessages",
    ()=>getMessages,
    "getSession",
    ()=>getSession,
    "listSessions",
    ()=>listSessions,
    "updateSession",
    ()=>updateSession
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__ = __turbopack_context__.i("[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
;
;
;
const DB_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ".data");
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(DB_DIR, "ollama-ui.db");
if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DB_DIR)) {
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(DB_DIR, {
        recursive: true
    });
}
let _db = null;
function getDb() {
    if (_db) return _db;
    _db = new __TURBOPACK__imported__module__$5b$externals$5d2f$better$2d$sqlite3__$5b$external$5d$__$28$better$2d$sqlite3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$better$2d$sqlite3$29$__["default"](DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.pragma("foreign_keys = ON");
    initSchema(_db);
    return _db;
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
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);
  `);
}
function listSessions() {
    return getDb().prepare("SELECT * FROM sessions ORDER BY updated_at DESC").all();
}
function getSession(id) {
    return getDb().prepare("SELECT * FROM sessions WHERE id = ?").get(id);
}
function createSession(id, model, title = "New Chat", system_prompt = "") {
    const db = getDb();
    db.prepare(`INSERT INTO sessions (id, title, model, system_prompt) VALUES (?, ?, ?, ?)`).run(id, title, model, system_prompt);
    return getSession(id);
}
function updateSession(id, fields) {
    const db = getDb();
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
    getDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
}
function getMessages(session_id) {
    return getDb().prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC").all(session_id);
}
function addMessage(id, session_id, role, content) {
    const db = getDb();
    db.prepare(`INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)`).run(id, session_id, role, content);
    // bump session updated_at
    db.prepare(`UPDATE sessions SET updated_at = unixepoch() WHERE id = ?`).run(session_id);
    return db.prepare("SELECT * FROM messages WHERE id = ?").get(id);
}
function deleteMessage(id) {
    getDb().prepare("DELETE FROM messages WHERE id = ?").run(id);
}
function clearMessages(session_id) {
    getDb().prepare("DELETE FROM messages WHERE session_id = ?").run(session_id);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1qlz07m._.js.map