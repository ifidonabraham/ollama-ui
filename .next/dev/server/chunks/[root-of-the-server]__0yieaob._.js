module.exports = [
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
"[project]/app/api/sessions/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(_req, { params }) {
    try {
        const { id } = await params;
        const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])(id);
        if (!session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Session not found"
            }, {
                status: 404
            });
        }
        const messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMessages"])(id, "chat");
        const agent_messages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMessages"])(id, "agent");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            session,
            messages,
            agent_messages,
            agent_state: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAgentState"])(id),
            agent_jobs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["listAgentJobs"])(id)
        });
    } catch (err) {
        console.error("[session GET]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function PATCH(req, { params }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const { title, model, system_prompt } = body;
        const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateSession"])(id, {
            title,
            model,
            system_prompt
        });
        if (!session) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Session not found"
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            session
        });
    } catch (err) {
        console.error("[session PATCH]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function DELETE(_req, { params }) {
    try {
        const { id } = await params;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])(id)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Session not found"
            }, {
                status: 404
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteSession"])(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error("[session DELETE]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
async function PUT(_req, { params }) {
    try {
        const { id } = await params;
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getSession"])(id)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Session not found"
            }, {
                status: 404
            });
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clearMessages"])(id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true
        });
    } catch (err) {
        console.error("[session PUT]", err);
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

/**
 * Database layer — uses better-sqlite3 when running locally/server,
 * and a simple in-memory store when running on Vercel (serverless).
 *
 * On Vercel, sessions are ephemeral (reset on each cold start). This is
 * acceptable since the app's primary data (models, conversations) lives
 * in the user's Ollama instance, not the DB.
 */ // ── Types (shared) ────────────────────────────────────────────────────────
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
    "updateAgentState",
    ()=>updateAgentState,
    "updateSession",
    ()=>updateSession
]);
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
function getMessages(session_id, channel) {
    if (IS_VERCEL) {
        return Array.from(memMessages.values()).filter((m)=>m.session_id === session_id && (!channel || m.channel === channel)).sort((a, b)=>a.created_at - b.created_at);
    }
    if (channel) {
        return getSqliteDb().prepare("SELECT * FROM messages WHERE session_id = ? AND channel = ? ORDER BY created_at ASC").all(session_id, channel);
    }
    return getSqliteDb().prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC").all(session_id);
}
function addMessage(id, session_id, role, content, channel = "chat") {
    if (IS_VERCEL) {
        const msg = {
            id,
            session_id,
            role,
            content,
            channel,
            created_at: nowSec()
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
    db.prepare(`INSERT INTO messages (id, session_id, role, content, channel) VALUES (?, ?, ?, ?, ?)`).run(id, session_id, role, content, channel);
    db.prepare(`UPDATE sessions SET updated_at = unixepoch() WHERE id = ?`).run(session_id);
    return db.prepare("SELECT * FROM messages WHERE id = ?").get(id);
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
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0yieaob._.js.map