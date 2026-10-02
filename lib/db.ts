/**
 * Database layer — uses better-sqlite3 when running locally/server,
 * and a simple in-memory store when running on Vercel (serverless).
 *
 * On Vercel, sessions are ephemeral (reset on each cold start). This is
 * acceptable since the app's primary data (models, conversations) lives
 * in the user's Ollama instance, not the DB.
 */

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
  created_at: number;
}

// ── Detect environment ────────────────────────────────────────────────────

const IS_VERCEL = process.env.VERCEL === "1" || process.env.VERCEL_ENV !== undefined;

// ── In-memory store (Vercel fallback) ────────────────────────────────────

const memSessions = new Map<string, Session>();
const memMessages = new Map<string, Message>();

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
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);
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
    // Also delete messages
    for (const [msgId, msg] of memMessages.entries()) {
      if (msg.session_id === id) memMessages.delete(msgId);
    }
    return;
  }
  getSqliteDb().prepare("DELETE FROM sessions WHERE id = ?").run(id);
}

export function getMessages(session_id: string): Message[] {
  if (IS_VERCEL) {
    return Array.from(memMessages.values())
      .filter((m) => m.session_id === session_id)
      .sort((a, b) => a.created_at - b.created_at);
  }
  return getSqliteDb()
    .prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC")
    .all(session_id) as Message[];
}

export function addMessage(
  id: string,
  session_id: string,
  role: Message["role"],
  content: string
): Message {
  if (IS_VERCEL) {
    const msg: Message = { id, session_id, role, content, created_at: nowSec() };
    memMessages.set(id, msg);
    const s = memSessions.get(session_id);
    if (s) memSessions.set(session_id, { ...s, updated_at: nowSec() });
    return msg;
  }
  const db = getSqliteDb();
  db.prepare(
    `INSERT INTO messages (id, session_id, role, content) VALUES (?, ?, ?, ?)`
  ).run(id, session_id, role, content);
  db.prepare(`UPDATE sessions SET updated_at = unixepoch() WHERE id = ?`).run(session_id);
  return db.prepare("SELECT * FROM messages WHERE id = ?").get(id) as Message;
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
