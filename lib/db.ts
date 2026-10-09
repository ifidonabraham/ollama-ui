/**
 * Database layer — uses better-sqlite3 when running locally/server,
 * and a simple in-memory store when running on Vercel (serverless).
 *
 * On Vercel, sessions are ephemeral (reset on each cold start). This is
 * acceptable since the app's primary data (models, conversations) lives
 * in the user's Ollama instance, not the DB.
 */

import { asAnswerModels, type AnswerModel } from "./answerModels";

// ── Types (shared) ────────────────────────────────────────────────────────

export interface Session {
  id: string;
  title: string;
  model: string;
  system_prompt: string;
  created_at: number;
  updated_at: number;
}

export interface Message {
  id: string;
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  channel: "chat" | "agent";
  created_at: number;
  models: AnswerModel[];
}

export interface AgentState {
  session_id: string;
  inspected_files: string[];
  decisions: string[];
  tool_results: { tool: string; summary: string; created_at: number }[];
  tests_run: { command: string; result: string; created_at: number }[];
  phase: string;
  model: string;
  model_role: string;
  updated_at: number;
}

export interface AgentJobRecord {
  id: string;
  session_id?: string;
  status: string;
  phase: string;
  model: string;
  role: string;
  error?: string;
  created_at: number;
  updated_at: number;
}

// ── Detect environment ────────────────────────────────────────────────────

const IS_VERCEL = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;

// ── In-memory store (Vercel fallback) ────────────────────────────────────

const memSessions = new Map<string, Session>();
const memMessages = new Map<string, Message>();
const memAgentStates = new Map<string, AgentState>();

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

// ── SQLite implementation ─────────────────────────────────────────────────

let _sqliteDb: import("better-sqlite3").Database | null = null;

function getSqliteDb(): import("better-sqlite3").Database {
  if (_sqliteDb) return _sqliteDb;
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const Database = require("better-sqlite3");
  const fs = require("fs");
  const path = require("path");

  const DB_DIR = path.join(process.cwd(), ".data");
  const DB_PATH = path.join(DB_DIR, "ollama-ui.db");

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  _sqliteDb = new Database(DB_PATH);
  _sqliteDb!.pragma("journal_mode = WAL");
  _sqliteDb!.pragma("foreign_keys = ON");
  initSchema(_sqliteDb!);
  return _sqliteDb!;
}

function initSchema(db: import("better-sqlite3").Database) {
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
  try { db.exec("ALTER TABLE messages ADD COLUMN channel TEXT NOT NULL DEFAULT 'chat'"); } catch { /* already migrated */ }
  try { db.exec("ALTER TABLE messages ADD COLUMN models_json TEXT NOT NULL DEFAULT '[]'"); } catch { /* already migrated */ }
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

// ── Public API ────────────────────────────────────────────────────────────

export function listSessions(): Session[] {
  if (IS_VERCEL) {
    return Array.from(memSessions.values()).sort((a, b) => b.updated_at - a.updated_at);
  }
  return getSqliteDb()
    .prepare("SELECT * FROM sessions ORDER BY updated_at DESC")
    .all() as Session[];
}

export function getSession(id: string): Session | undefined {
  if (IS_VERCEL) {
    return memSessions.get(id);
  }
  return getSqliteDb()
    .prepare("SELECT * FROM sessions WHERE id = ?")
    .get(id) as Session | undefined;
}

export function createSession(
  id: string,
  model: string,
  title = "New Chat",
  system_prompt = ""
): Session {
  if (IS_VERCEL) {
    const now = nowSec();
    const session: Session = { id, title, model, system_prompt, created_at: now, updated_at: now };
    memSessions.set(id, session);
    return session;
  }
  const db = getSqliteDb();
  db.prepare(
    `INSERT INTO sessions (id, title, model, system_prompt) VALUES (?, ?, ?, ?)`
  ).run(id, title, model, system_prompt);
  return getSession(id)!;
}

export function updateSession(
  id: string,
  fields: Partial<Pick<Session, "title" | "model" | "system_prompt">>
): Session | undefined {
  if (IS_VERCEL) {
    const s = memSessions.get(id);
    if (!s) return undefined;
    const updated = { ...s, ...fields, updated_at: nowSec() };
    memSessions.set(id, updated);
    return updated;
  }
  const db = getSqliteDb();
  const sets: string[] = [];
  const vals: unknown[] = [];
  if (fields.title !== undefined) { sets.push("title = ?"); vals.push(fields.title); }
  if (fields.model !== undefined) { sets.push("model = ?"); vals.push(fields.model); }
  if (fields.system_prompt !== undefined) { sets.push("system_prompt = ?"); vals.push(fields.system_prompt); }
  if (sets.length === 0) return getSession(id);
  sets.push("updated_at = unixepoch()");
  vals.push(id);
  db.prepare(`UPDATE sessions SET ${sets.join(", ")} WHERE id = ?`).run(...vals);
  return getSession(id);
}

export function deleteSession(id: string) {
  if (IS_VERCEL) {
    memSessions.delete(id);
    memAgentStates.delete(id);
    // Also delete messages
    for (const [msgId, msg] of memMessages.entries()) {
      if (msg.session_id === id) memMessages.delete(msgId);
    }
    return;
  }
  getSqliteDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
}

function emptyAgentState(session_id: string): AgentState {
  return { session_id, inspected_files: [], decisions: [], tool_results: [], tests_run: [], phase: "idle", model: "", model_role: "", updated_at: nowSec() };
}

export function getAgentState(session_id: string): AgentState {
  if (IS_VERCEL) return memAgentStates.get(session_id) ?? emptyAgentState(session_id);
  const row = getSqliteDb().prepare("SELECT * FROM agent_state WHERE session_id = ?").get(session_id) as {
    session_id: string; inspected_files: string; decisions: string; tool_results: string; tests_run: string;
    phase: string; model: string; model_role: string; updated_at: number;
  } | undefined;
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
    updated_at: row.updated_at,
  };
}

export function updateAgentState(session_id: string, patch: Partial<Omit<AgentState, "session_id" | "updated_at">>): AgentState {
  const current = getAgentState(session_id);
  const next: AgentState = { ...current, ...patch, updated_at: nowSec() };
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

export function saveAgentJob(job: AgentJobRecord): AgentJobRecord {
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

export function getAgentJob(id: string): AgentJobRecord | undefined {
  if (IS_VERCEL) return undefined;
  return getSqliteDb().prepare("SELECT * FROM agent_jobs WHERE id = ?").get(id) as AgentJobRecord | undefined;
}

export function listAgentJobs(session_id: string): AgentJobRecord[] {
  if (IS_VERCEL) return [];
  return getSqliteDb().prepare("SELECT * FROM agent_jobs WHERE session_id = ? ORDER BY updated_at DESC LIMIT 20").all(session_id) as AgentJobRecord[];
}

function rowToMessage(row: {
  id: string;
  session_id: string;
  role: Message["role"];
  content: string;
  channel: Message["channel"];
  created_at: number;
  models_json?: string;
  models?: AnswerModel[];
}): Message {
  return {
    id: row.id,
    session_id: row.session_id,
    role: row.role,
    content: row.content,
    channel: row.channel,
    created_at: row.created_at,
    models: row.models?.length ? asAnswerModels(row.models) : asAnswerModels(safeParse(row.models_json)),
  };
}

function safeParse(raw: string | undefined): unknown {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

export function getMessages(session_id: string, channel?: Message["channel"]): Message[] {
  if (IS_VERCEL) {
    return Array.from(memMessages.values())
      .filter((m) => m.session_id === session_id && (!channel || m.channel === channel))
      .sort((a, b) => a.created_at - b.created_at)
      .map((message) => rowToMessage(message));
  }
  const rows = channel
    ? getSqliteDb()
      .prepare("SELECT * FROM messages WHERE session_id = ? AND channel = ? ORDER BY created_at ASC")
      .all(session_id, channel)
    : getSqliteDb()
      .prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC")
      .all(session_id);
  return (rows as Parameters<typeof rowToMessage>[0][]).map(rowToMessage);
}

export function addMessage(
  id: string,
  session_id: string,
  role: Message["role"],
  content: string,
  channel: Message["channel"] = "chat",
  models: AnswerModel[] = []
): Message {
  const stored = asAnswerModels(models);
  if (IS_VERCEL) {
    const msg: Message = { id, session_id, role, content, channel, created_at: nowSec(), models: stored };
    memMessages.set(id, msg);
    const s = memSessions.get(session_id);
    if (s) memSessions.set(session_id, { ...s, updated_at: nowSec() });
    return msg;
  }
  const db = getSqliteDb();
  db.prepare(
    `INSERT INTO messages (id, session_id, role, content, channel, models_json) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, session_id, role, content, channel, JSON.stringify(stored));
  db.prepare(`UPDATE sessions SET updated_at = unixepoch() WHERE id = ?`).run(session_id);
  return rowToMessage(db.prepare("SELECT * FROM messages WHERE id = ?").get(id) as Parameters<typeof rowToMessage>[0]);
}

export function deleteMessage(id: string) {
  if (IS_VERCEL) {
    memMessages.delete(id);
    return;
  }
  getSqliteDb().prepare("DELETE FROM messages WHERE id = ?").run(id);
}

export function clearMessages(session_id: string) {
  if (IS_VERCEL) {
    for (const [msgId, msg] of memMessages.entries()) {
      if (msg.session_id === session_id) memMessages.delete(msgId);
    }
    return;
  }
  getSqliteDb()
    .prepare("DELETE FROM messages WHERE session_id = ?")
    .run(session_id);
}
