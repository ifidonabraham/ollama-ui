"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { asAnswerModels, formatAnswerModels, LOCAL_COMMAND_ANSWER, NO_MODEL_ANSWER, type AnswerModel } from "@/lib/answerModels";
import { decodeModelChoice } from "@/lib/modelRelay";
import { decodeWebAsk } from "@/lib/webAsk";
import type { IntentOption } from "@/lib/intentAsk";
import { toolResultFailed } from "@/lib/plainResult";
import { OCore } from "./OCore";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[]; // base64 strings for display
  models?: AnswerModel[];
}

interface AttachedImage {
  base64: string;   // pure base64 for Ollama
  dataUrl: string;  // data URI for preview
  name: string;
}

interface AttachedDoc {
  name: string;
  ext: string;
  content: string;
  path?: string;
  kind?: "document" | "video";
}

function shownReply(content: string): string {
  return decodeWebAsk(decodeModelChoice(content).text).text;
}

function WebAskButtons({ content, onAllow, onSkip }: { content: string; onAllow: (url: string) => void; onSkip: () => void }) {
  const { url } = decodeWebAsk(content);
  if (!url) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, alignItems: "center" }}>
      <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Internet is connected</span>
      <button
        type="button"
        onClick={() => onAllow(url)}
        style={{ background: "var(--accent)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 11 }}
      >
        Allow this page
      </button>
      <button
        type="button"
        onClick={onSkip}
        style={{ background: "transparent", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 11 }}
      >
        Stay offline
      </button>
    </div>
  );
}

function ModelChoiceButtons({ content, onPick }: { content: string; onPick: (modelName: string) => void }) {
  const { choice } = decodeModelChoice(content);
  const [picked, setPicked] = useState("");
  if (!choice) return null;
  const selected = picked || choice.failedModel;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8, alignItems: "center" }}>
      <label style={{ fontSize: 11, color: "var(--text-secondary)" }}>Choose a model</label>
      <select
        value={selected}
        onChange={(event) => setPicked(event.target.value)}
        style={{ background: "var(--bg-panel)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 8px", fontSize: 11, maxWidth: 280 }}
      >
        <option value={choice.failedModel}>Retry {choice.failedModel}</option>
        {choice.choices.map((item) => (
          <option key={item.name} value={item.name}>{item.name} · {item.role}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={() => onPick(selected)}
        style={{ background: "var(--accent)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 8px", cursor: "pointer", fontSize: 11 }}
      >
        Use this model
      </button>
    </div>
  );
}

interface Props {
  sessionId: string | null;
  messages: ChatMessage[];
  model: string;
  models: string[];
  streaming: boolean;
  streamingContent: string;
  initialAgentMessages: { role: "user" | "assistant"; content: string; models?: AnswerModel[] }[];
  contextFiles: { path: string; name: string }[];
  onSend: (content: string, images?: string[]) => void;
  onResend: (messageId: string, newContent: string, images?: string[]) => void;
  onRegenerate: () => void;
  onModelChange: (model: string) => void | Promise<void>;
  pickModelForTask: (content: string, images?: string[]) => string | null;
  onClearHistory: () => void;
  onSystemPromptChange: (prompt: string) => void;
  systemPrompt: string;
  onRemoveContextFile: (path: string) => void;
  onStopGeneration: () => void;
  workspacePath?: string;
  ollamaSource?: "local" | "cloud" | "offline";
}

// Vision-capable model detection
const VISION_PREFIXES = ["llava", "moondream", "minicpm-v", "bakllava", "cogvlm"];
function isVisionModel(m: string) {
  return VISION_PREFIXES.some((p) => m.toLowerCase().startsWith(p));
}

marked.setOptions({ breaks: true });

// Extract <think>...</think> from content, return both parts
function extractThinking(content: string): { thinking: string; answer: string } {
  const match = content.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
  if (match) {
    return { thinking: match[1].trim(), answer: match[2].trim() };
  }
  // Partial thinking (still streaming — think block not closed yet)
  const openMatch = content.match(/^<think>([\s\S]*)$/);
  if (openMatch) {
    return { thinking: openMatch[1].trim(), answer: "" };
  }
  return { thinking: "", answer: content };
}

function renderMarkdown(content: string): string {
  const clean = content.replace(/\n<!-- images:\d+ -->$/, "");
  return marked.parse(clean) as string;
}

function AnsweredBy({ models, working = false, failed = false }: { models?: AnswerModel[]; working?: boolean; failed?: boolean }) {
  const list = models ?? [];
  const text = list.length
    ? formatAnswerModels(list)
    : working
      ? "choosing a model"
      : "not recorded";
  const label = working ? "Working" : failed ? "Tried" : "Answered";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
      <span className="fonia-badge">{label}</span>
      <span className="fonia-mono">{text}</span>
    </div>
  );
}

// ── Think block display ────────────────────────────────────────────────────

function ThinkBlock({ content, streaming }: { content: string; streaming?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  if (!content) return null;

  return (
    <div style={{ marginBottom: 10 }}>
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: "transparent",
          border: "1px solid var(--border)",
          color: "var(--text-muted)",
          borderRadius: 6,
          padding: "3px 10px",
          cursor: "pointer",
          fontSize: 11,
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontStyle: "italic",
        }}
      >
        <span style={{ color: "#a78bfa", fontSize: 13 }}>💭</span>
        {streaming && !expanded ? "Thinking…" : `Thought process`}
        <span style={{ fontSize: 9 }}>{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div
          style={{
            marginTop: 6,
            padding: "10px 14px",
            background: "#12111a",
            border: "1px solid #2d2845",
            borderRadius: 8,
            fontSize: 12,
            color: "#9d8fd4",
            lineHeight: 1.7,
            fontStyle: "italic",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {content}
          {streaming && <span style={{ opacity: 0.5 }}> ▋</span>}
        </div>
      )}
    </div>
  );
}

// ── Inline model picker ────────────────────────────────────────────────────

function ModelPicker({ model, models, onChange }: { model: string; models: string[]; onChange: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ x: 0, y: 0 });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      // Close if click is outside the button and the fixed dropdown
      const el = e.target as HTMLElement;
      if (btnRef.current && btnRef.current.contains(el)) return;
      if (el.closest("[data-model-dropdown]")) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function handleOpen() {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropPos({ x: rect.left, y: rect.top }); // we'll open upward
    }
    setOpen((v) => !v);
  }

  const shortName = model.split(":")[0] ?? model;
  const vision = isVisionModel(model);

  return (
    <>
      <button
        ref={btnRef}
        onClick={handleOpen}
        title="Switch model"
        style={{
          background: open ? "var(--bg-active)" : "transparent",
          border: "1px solid " + (open ? "var(--accent)" : "var(--border)"),
          color: open ? "var(--accent)" : "var(--text-secondary)",
          borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11,
          display: "flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
        }}
      >
        {vision ? "👁" : "🤖"} {shortName} <span style={{ fontSize: 9 }}>▾</span>
      </button>

      {open && (
        <div
          data-model-dropdown="true"
          style={{
            position: "fixed",
            bottom: `calc(100vh - ${dropPos.y}px + 6px)`,
            left: dropPos.x,
            background: "var(--bg-panel)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            minWidth: 270,
            zIndex: 99999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
            maxHeight: 340,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <div style={{
            padding: "6px 10px 5px",
            fontSize: 10, color: "var(--text-muted)",
            borderBottom: "1px solid var(--border)",
            fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            position: "sticky", top: 0, background: "var(--bg-panel)",
          }}>
            Select Model ({models.length})
          </div>
          {models.map((m) => {
            const v = isVisionModel(m);
            return (
              <button key={m}
                onClick={() => { onChange(m); setOpen(false); }}
                style={{
                  display: "flex", flexDirection: "column", width: "100%", textAlign: "left",
                  background: m === model ? "var(--bg-active)" : "transparent",
                  border: "none",
                  color: m === model ? "var(--accent)" : "var(--text-secondary)",
                  padding: "9px 12px", cursor: "pointer", fontSize: 12,
                  borderLeft: m === model ? "2px solid var(--accent)" : "2px solid transparent",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => { if (m !== model) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)"; }}
                onMouseLeave={(e) => { if (m !== model) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ fontWeight: m === model ? 600 : 400 }}>{v ? "👁 " : ""}{m.split(":")[0]}</span>
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{m}{v ? " · vision" : " · text only"}</span>
              </button>
            );
          })}
          {models.length === 0 && (
            <div style={{ padding: "10px 12px", color: "var(--text-muted)", fontSize: 12 }}>
              No models found — is Ollama running?
            </div>
          )}
        </div>
      )}
    </>
  );
}

// ── Single message bubble ──────────────────────────────────────────────────

function MessageBubble({
  msg,
  isLast,
  streaming,
  onEdit,
  onRegenerate,
}: {
  msg: ChatMessage;
  isLast: boolean;
  streaming: boolean;
  onEdit: (id: string, content: string) => void;
  onRegenerate: () => void;
}) {
  const isUser = msg.role === "user";
  const cleanContent = msg.content.replace(/\n<!-- images:\d+ -->$/, "");
  const { thinking, answer } = extractThinking(cleanContent);
  const html = renderMarkdown(answer || cleanContent);
  const ref = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(cleanContent);

  useEffect(() => {
    ref.current?.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, [html]);

  const wrappedHtml = html
    .replace(/<pre>/g,
      `<div class="code-block-wrapper" style="position:relative"><button class="copy-btn" style="position:absolute;top:7px;right:8px;background:var(--bg-active);border:1px solid var(--border);color:var(--text-secondary);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:10px;z-index:1;font-family:inherit">Copy</button><pre>`)
    .replace(/<\/pre>/g, "</pre></div>");

  function handleCopy() {
    navigator.clipboard.writeText(cleanContent).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleEditSubmit() {
    if (editValue.trim()) {
      onEdit(msg.id, editValue.trim());
    }
    setEditing(false);
  }

  // Display images attached to user message
  const imageCount = msg.content.match(/<!-- images:(\d+) -->/)?.[1];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        gap: 10,
        marginBottom: 20,
        alignItems: "flex-start",
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: isUser ? "var(--accent)" : "var(--bg-active)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, flexShrink: 0, border: "1px solid var(--border)",
        color: isUser ? "#fff" : "var(--text-secondary)", fontWeight: 700,
      }}>
        {isUser ? "U" : "AI"}
      </div>

      <div style={{ maxWidth: "82%", display: "flex", flexDirection: "column", gap: 3 }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 1 }}>
          {isUser ? "You" : "Assistant"}
        </div>

        {/* Bubble */}
        <div style={{
          background: isUser ? "var(--user-bubble)" : "transparent",
          border: isUser ? "1px solid var(--border)" : "none",
          borderRadius: 10,
          padding: isUser ? "8px 12px" : "0",
        }}>
          {/* Image indicator */}
          {imageCount && (
            <div style={{ fontSize: 11, color: "var(--accent)", marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
              <span>🖼</span> {imageCount} image{parseInt(imageCount) > 1 ? "s" : ""} attached
            </div>
          )}

          {!isUser && <AnsweredBy models={msg.models} />}

          {/* Think block (reasoning models like qwen3) */}
          {!isUser && thinking && <ThinkBlock content={thinking} />}

          {editing ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <textarea
                autoFocus
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleEditSubmit(); }
                  if (e.key === "Escape") setEditing(false);
                }}
                rows={3}
                style={{
                  background: "var(--bg-input)", border: "1px solid var(--accent)",
                  color: "var(--text-primary)", borderRadius: 6, padding: "6px 8px",
                  fontSize: 13, resize: "vertical", outline: "none", fontFamily: "inherit",
                  minWidth: 260,
                }}
              />
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={handleEditSubmit} style={{ background: "var(--accent)", border: "none", color: "#fff", borderRadius: 5, padding: "4px 12px", cursor: "pointer", fontSize: 12 }}>
                  Resend ↑
                </button>
                <button onClick={() => setEditing(false)} style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-secondary)", borderRadius: 5, padding: "4px 10px", cursor: "pointer", fontSize: 12 }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div
              ref={ref}
              className="prose"
              style={{ color: "var(--text-primary)" }}
              dangerouslySetInnerHTML={{ __html: wrappedHtml }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.classList.contains("copy-btn")) {
                  const pre = target.closest(".code-block-wrapper")?.querySelector("pre");
                  if (pre) {
                    navigator.clipboard.writeText(pre.innerText).catch(() => {});
                    target.textContent = "Copied!";
                    setTimeout(() => (target.textContent = "Copy"), 1500);
                  }
                }
              }}
            />
          )}
        </div>

        {/* Message action buttons */}
        {!editing && (
          <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
            <button
              onClick={handleCopy}
              style={{ background: "none", border: "none", color: copied ? "var(--success)" : "var(--text-muted)", cursor: "pointer", fontSize: 10, padding: "2px 5px", borderRadius: 3 }}
            >
              {copied ? "✓ Copied" : "⎘ Copy"}
            </button>

            {isUser && (
              <button
                onClick={() => { setEditValue(cleanContent); setEditing(true); }}
                disabled={streaming}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: streaming ? "not-allowed" : "pointer", fontSize: 10, padding: "2px 5px", borderRadius: 3 }}
                title="Edit and resend"
              >
                ✏ Edit
              </button>
            )}

            {!isUser && isLast && (
              <button
                onClick={onRegenerate}
                disabled={streaming}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: streaming ? "not-allowed" : "pointer", fontSize: 10, padding: "2px 5px", borderRadius: 3 }}
                title="Regenerate response"
              >
                ↺ Regenerate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function StreamingBubble({ content, model }: { content: string; model: string }) {
  const { thinking, answer } = extractThinking(content);
  const isThinking = !!thinking && !answer; // still inside <think> block
  const displayContent = answer || (!thinking ? content : "");
  const html = renderMarkdown(displayContent + (isThinking ? "" : " ▋"));
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  });
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "flex-start" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--bg-active)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: "1px solid var(--border)", color: "var(--text-secondary)", fontWeight: 700 }}>AI</div>
      <div style={{ maxWidth: "82%" }}>
        <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 1 }}>Assistant</div>
        <AnsweredBy models={model ? [{ name: model, role: "chat" }] : []} working />

        {/* Live thinking block */}
        {thinking && <ThinkBlock content={thinking} streaming={isThinking} />}

        {/* Answer or cursor */}
        {displayContent ? (
          <div ref={ref} className="prose" style={{ color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: html }} />
        ) : isThinking ? null : (
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>▋</span>
        )}
      </div>
    </div>
  );
}

// ── Tool call display bubble ───────────────────────────────────────────────

interface ToolEvent {
  type: "thinking" | "tool_call" | "tool_result" | "model";
  tool?: string;
  model?: string;
  role?: string;
  args?: Record<string, string>;
  result?: string;
  text?: string;
}

function ToolEventBubble({ events, startOpen = false }: { events: ToolEvent[]; startOpen?: boolean }) {
  const [expanded, setExpanded] = useState(startOpen);
  if (events.length === 0) return null;
  const filesRead = events
    .filter((event) => event.type === "tool_call" && event.args?.path)
    .map((event) => event.args?.path)
    .filter((filePath): filePath is string => Boolean(filePath));
  const calls = events.filter((event) => event.type === "tool_call").length;
  return (
    <div style={{ marginBottom: 12 }}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="fonia-btn"
      >
        {calls} step{calls === 1 ? "" : "s"}{filesRead.length ? ` · ${filesRead.length} file${filesRead.length === 1 ? "" : "s"}` : ""}
        {expanded ? " · hide" : ""}
      </button>
      {expanded && (
        <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 4 }}>
          {events.map((ev, i) => (
            <div key={i} style={{
              background: "var(--bg-panel)", border: "1px solid var(--border)",
              borderRadius: 6, padding: "6px 10px", fontSize: 11,
            }}>
              {ev.type === "thinking" && (
                <span style={{ color: "var(--text-muted)" }}>💭 {ev.text}</span>
              )}
              {ev.type === "model" && (
                <span style={{ color: "var(--success)", fontWeight: 600 }}>● {ev.model} · {ev.role}</span>
              )}
              {ev.type === "tool_call" && (
                <div>
                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>▶ {ev.tool}</span>
                  {ev.args && Object.keys(ev.args).length > 0 && (
                    <pre style={{ margin: "4px 0 0", fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-input)", padding: "4px 6px", borderRadius: 4, whiteSpace: "pre-wrap", wordBreak: "break-all", border: "none" }}>
                      {JSON.stringify(ev.args, null, 2)}
                    </pre>
                  )}
                </div>
              )}
              {ev.type === "tool_result" && (
                <div>
                  <span className={toolResultFailed(ev.result ?? "") ? "fonia-fail" : "fonia-ok"}>
                    {toolResultFailed(ev.result ?? "") ? "Failed" : "Success"}
                  </span>
                  <span style={{ marginLeft: 8 }} className="fonia-mono">{ev.tool}</span>
                  <pre style={{ margin: "4px 0 0", fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-input)", padding: "4px 6px", borderRadius: 4, whiteSpace: "pre-wrap", wordBreak: "break-all", maxHeight: 160, overflow: "auto", border: "none", fontFamily: "var(--mono)" }}>
                    {ev.result}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ── Diff types and view ────────────────────────────────────────────────────

export interface DiffEvent {
  path: string;
  before: string;
  after: string;
  diff: string;
}

function DiffView({ diff: diffEvent, onAccept, onReject }: { diff: DiffEvent; onAccept?: () => void; onReject?: () => void }) {
  const [expanded, setExpanded] = useState(true);
  const lines = diffEvent.diff.split("\n");
  const fileName = diffEvent.path.split(/[\\/]/).pop() ?? diffEvent.path;

  return (
    <div style={{ marginBottom: 10, border: "1px solid var(--border)", borderRadius: 8, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "var(--bg-active)", cursor: "pointer" }}
        onClick={() => setExpanded(v => !v)}>
        <span style={{ fontSize: 12 }}>📄</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", flex: 1, fontFamily: "monospace" }}>{fileName}</span>
        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <>
          <div style={{ maxHeight: 300, overflowY: "auto", background: "#0d1117" }}>
            {lines.map((line, i) => {
              const isAdd = line.startsWith("+ ");
              const isDel = line.startsWith("- ");
              return (
                <div key={i} style={{
                  padding: "1px 10px",
                  background: isAdd ? "#0d2b0d" : isDel ? "#2b0d0d" : "transparent",
                  color: isAdd ? "#3fb950" : isDel ? "#f85149" : "var(--text-muted)",
                  fontFamily: "ui-monospace, monospace", fontSize: 11, lineHeight: 1.6,
                  whiteSpace: "pre-wrap", wordBreak: "break-all",
                }}>
                  {line}
                </div>
              );
            })}
          </div>
          {(onAccept || onReject) && (
            <div style={{ display: "flex", gap: 6, padding: "6px 10px", background: "var(--bg-panel)", borderTop: "1px solid var(--border)" }}>
              {onAccept && <button onClick={onAccept} style={{ background: "#1a3a1a", border: "1px solid var(--success)", color: "var(--success)", borderRadius: 5, padding: "3px 12px", cursor: "pointer", fontSize: 11 }}>✓ Accept</button>}
              {onReject && <button onClick={onReject} style={{ background: "#2a1010", border: "1px solid var(--danger)", color: "var(--danger)", borderRadius: 5, padding: "3px 12px", cursor: "pointer", fontSize: 11 }}>✕ Reject</button>}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ── Main ChatWindow ────────────────────────────────────────────────────────

export default function ChatWindow({
  sessionId, messages, model, models, streaming, streamingContent,
  initialAgentMessages,
  contextFiles, onSend, onResend, onRegenerate, onModelChange,
  pickModelForTask,
  onClearHistory, onSystemPromptChange, systemPrompt,
  onRemoveContextFile, onStopGeneration, workspacePath, ollamaSource = "local",
}: Props) {
  const [input, setInput] = useState("");
  const [showSystem, setShowSystem] = useState(false);
  const [localSystemPrompt, setLocalSystemPrompt] = useState(systemPrompt);
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
  const [visionWarning, setVisionWarning] = useState(false);
  const [agentRunning, setAgentRunning] = useState(false);
  const [queue, setQueue] = useState<{ id: string; text: string; images?: string[] }[]>([]);
  const queueRef = useRef<{ id: string; text: string; images?: string[] }[]>([]);
  const [agentIntentLabel, setAgentIntentLabel] = useState("");
  const agentMode = true;
  const [agentEvents, setAgentEvents] = useState<ToolEvent[]>([]);
  const [liveModels, setLiveModels] = useState<AnswerModel[]>([]);
  const [agentDraft, setAgentDraft] = useState("");
  const [agentStatus, setAgentStatus] = useState("");
  const [agentMessages, setAgentMessages] = useState<{ role: string; content: string; images?: string[]; toolEvents?: ToolEvent[]; diffEvents?: DiffEvent[]; models?: AnswerModel[]; failed?: boolean; choices?: IntentOption[]; choiceOriginal?: string }[]>(initialAgentMessages);

  useEffect(() => {
    function loadSteps() {
      void fetch("/api/fonia/settings")
        .then((response) => response.json())
        .then((data: { showSteps?: boolean }) => setShowSteps(Boolean(data.showSteps)))
        .catch(() => {});
    }
    loadSteps();
    window.addEventListener("fonia-settings", loadSteps);
    return () => window.removeEventListener("fonia-settings", loadSteps);
  }, []);
  const [loadedModels, setLoadedModels] = useState<{ name: string; sizeMB: number }[]>([]);
  const [adjusterOn, setAdjusterOn] = useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [pendingDiffs, setPendingDiffs] = useState<DiffEvent[]>([]); // diffs waiting for accept/reject
  const [diffDecision, setDiffDecision] = useState<Record<string, "kept" | "restored">>({});
  const [hearing, setHearing] = useState(false);
  const agentAbortRef = useRef<AbortController | null>(null);
  const agentJobRef = useRef<string | null>(null);
  const agentRunRef = useRef(0);
  const agentRunningRef = useRef(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const sendHeardRef = useRef<(text: string) => void>(() => {});

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streamingContent]);
  useEffect(() => {
    setAdjusterOn(window.localStorage.getItem("fonia-adjust") === "on");
  }, []);

  async function refreshLoadedModels() {
    try {
      const response = await fetch("/api/unload");
      const data = await response.json() as { models?: { name: string; sizeMB: number }[] };
      setLoadedModels(data.models ?? []);
    } catch {
      setLoadedModels([]);
    }
  }

  async function unloadModel(name?: string) {
    await fetch("/api/unload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name ? { model: name } : {}),
    });
    await refreshLoadedModels();
  }
  useEffect(() => {
    const timer = setInterval(async () => {
      try {
        const response = await fetch("/api/fonia/heard");
        if (!response.ok) return;
        const data = await response.json() as { lines?: string[] };
        const line = data.lines?.[0]?.trim();
        if (line) sendHeardRef.current(line);
      } catch { /* the microphone is off unless a setting turns it on */ }
    }, 2000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => { setLocalSystemPrompt(systemPrompt); }, [systemPrompt]);
  useEffect(() => {
    if (agentJobRef.current) {
      void fetch("/api/agent/cancel", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ job_id: agentJobRef.current }) });
    }
    agentAbortRef.current?.abort();
    setAgentRunning(false);
    setAgentIntentLabel("");
    setAgentEvents([]);
    setLiveModels([]);
    setAgentDraft("");
    setAgentStatus("");
    setAgentMessages(initialAgentMessages);
  }, [sessionId, initialAgentMessages]);

  // Show vision warning when images attached but model doesn't support vision
  useEffect(() => {
    setVisionWarning(attachedImages.length > 0 && !isVisionModel(model));
  }, [attachedImages, model]);

  // ── Paste image from clipboard ──────────────────────────────────────────
  useEffect(() => {
    async function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) await processImageFile(file);
        }
      }
    }
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function processImageFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Upload failed"); return; }
      if (data.type === "image") {
        setAttachedImages((prev) => [...prev, { base64: data.base64, dataUrl: data.dataUrl, name: data.name }]);
      }
    } catch { alert("Failed to upload image"); }
  }

  async function processDocFile(file: File) {
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Upload failed"); return; }
      if (data.type === "video" && data.path) {
        setAttachedDocs((prev) => [...prev, { name: data.name, ext: data.ext, content: "", path: data.path, kind: "video" }]);
        return;
      }
      if (data.type === "document") {
        setAttachedDocs((prev) => [...prev, { name: data.name, ext: data.ext, content: data.content, kind: "document" }]);
      }
    } catch { alert("Failed to upload document"); }
  }

  function handleImageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach(processImageFile);
    e.target.value = "";
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    files.forEach(processDocFile);
    e.target.value = "";
  }

  // ── Agent send (Claude Code style — model can read/write files and run commands) ──
  function rememberQueue(next: { id: string; text: string; images?: string[] }[]) {
    queueRef.current = next;
    setQueue(next);
  }

  function stopAgentRun() {
    onStopGeneration();
    if (agentJobRef.current) {
      void fetch("/api/agent/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: agentJobRef.current }),
      });
    }
    agentAbortRef.current?.abort();
  }

  async function sendAgent(userMessage: string, images?: string[], selectedModel = model, modelLocked = false, force = false, allowWeb = false, confirmedMode = "", confirmedText = "") {
    if (!userMessage.trim()) return;
    if (agentRunningRef.current) {
      if (!force) return;
      stopAgentRun();
    }

    const outbound = confirmedText.trim() || userMessage;
    const routedModel = modelLocked
      ? selectedModel
      : selectedModel === model
        ? (pickModelForTask(outbound, images) ?? selectedModel)
        : selectedModel;

    const userEntry = { role: "user" as const, content: userMessage, images };
    const newHistory = [...agentMessages.map(({ toolEvents: _toolEvents, diffEvents: _diffEvents, models: _models, failed: _failed, images: _images, choices: _choices, choiceOriginal: _choiceOriginal, content, ...m }) => ({
      ...m,
      content: shownReply(content),
    })), { role: "user", content: outbound }];

    setAgentMessages((prev) => [...prev, { ...userEntry }]);
    const runId = agentRunRef.current + 1;
    agentRunRef.current = runId;
    agentRunningRef.current = true;
    setAgentRunning(true);

    const currentEvents: ToolEvent[] = [];
    const currentModels: AnswerModel[] = [];
    const currentDiffs: DiffEvent[] = [];
    let assistantText = "";
    setLiveModels([]);
    setAgentDraft("");
    setAgentStatus("Checking the model server. A reply is coming.");

    // Fix: create abort controller and pass signal to fetch
    let aborted = false;
    let pendingChoices: { options: IntentOption[]; original: string } | null = null;
    const abort = new AbortController();
    agentAbortRef.current = abort;
    const jobId = crypto.randomUUID();
    agentJobRef.current = jobId;

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          model: routedModel,
          system_prompt: systemPrompt,
          workspace_path: workspacePath,
          images,
          session_id: sessionId,
          job_id: jobId,
          model_locked: modelLocked,
          adjust_prompt: adjusterOn,
          allow_web: allowWeb,
          confirmed_mode: confirmedMode || undefined,
          confirmed_text: confirmedText || undefined,
        }),
        signal: abort.signal,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.event === "status") {
              setAgentStatus(String(data.text ?? ""));
            } else if (data.event === "intent") {
              setAgentIntentLabel(`${data.intent} · tools ${data.tools}`);
            } else if (data.event === "plan") {
              const models = asAnswerModels(data.models);
              setAgentMessages((prev) => [
                ...prev,
                { role: "assistant", content: `**Planner handoff**\n\n${data.content}`, toolEvents: [], models: models.length ? models : [...currentModels] },
              ]);
            } else if (data.event === "review") {
              const models = asAnswerModels(data.models);
              setAgentMessages((prev) => [
                ...prev,
                { role: "assistant", content: `**Reviewer notes**\n\n${data.content}`, toolEvents: [], models: models.length ? models : [...currentModels] },
              ]);
            } else if (data.event === "model") {
              const ev: ToolEvent = { type: "model", model: data.model, role: data.role };
              currentEvents.push(ev);
              const entry = { name: String(data.model ?? ""), role: String(data.role ?? "") };
              if ((entry.name || entry.role) && !currentModels.some((item) => item.name === entry.name && item.role === entry.role)) {
                currentModels.push(entry);
              }
              setLiveModels([...currentModels]);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "thinking") {
              const ev: ToolEvent = { type: "thinking", text: data.text };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "tool_call") {
              const ev: ToolEvent = { type: "tool_call", tool: data.tool, args: data.args };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "verification") {
              setAgentStatus(`${data.command}: ${data.status}`);
            } else if (data.event === "tool_result") {
              const ev: ToolEvent = { type: "tool_result", tool: data.tool, result: data.result };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "delta") {
              assistantText += data.text;
              setAgentDraft(assistantText);
              setAgentEvents([...currentEvents]); // trigger re-render
            } else if (data.event === "file_diff") {
              const diff: DiffEvent = { path: data.path, before: data.before, after: data.after, diff: data.diff };
              currentDiffs.push(diff);
            } else if (data.event === "clarify") {
              const options = Array.isArray(data.options) ? data.options as IntentOption[] : [];
              pendingChoices = { options, original: String(data.original ?? "") };
            } else if (data.event === "done") {
              assistantText = data.fullText || assistantText;
              const models = asAnswerModels(data.models);
              const choices = pendingChoices;
              pendingChoices = null;
              setAgentMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: assistantText,
                  toolEvents: [...currentEvents],
                  diffEvents: [...currentDiffs],
                  models: models.length ? models : [...currentModels],
                  choices: choices?.options,
                  choiceOriginal: choices?.original,
                },
              ]);
              currentEvents.splice(0);
              currentDiffs.splice(0);
              setAgentEvents([]);
              setLiveModels([]);
              setAgentDraft("");
            } else if (data.event === "error") {
              const models = asAnswerModels(data.models);
              setAgentMessages((prev) => [
                ...prev,
                {
                  role: "assistant",
                  content: `❌ ${data.message}`,
                  toolEvents: [...currentEvents],
                  models: models.length ? models : (currentModels.length ? [...currentModels] : NO_MODEL_ANSWER),
                  failed: true,
                },
              ]);
            }
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name === "AbortError") {
        aborted = true;
      } else {
        setAgentMessages((prev) => [
          ...prev,
          { role: "assistant", content: "The agent could not finish. Check that the model server is running.", toolEvents: [], models: NO_MODEL_ANSWER, failed: true },
        ]);
      }
    } finally {
      if (agentRunRef.current === runId) {
        agentRunningRef.current = false;
        setAgentRunning(false);
        setAgentIntentLabel("");
        setAgentEvents([]);
        setLiveModels([]);
        setAgentDraft("");
        setAgentStatus("");
        agentAbortRef.current = null;
        agentJobRef.current = null;
        const next = aborted ? undefined : queueRef.current[0];
        if (next) {
          rememberQueue(queueRef.current.slice(1));
          void sendAgent(next.text, next.images);
        }
      }
    }
  }

  function queueComposer(text: string, images?: string[]) {
    const item = { id: crypto.randomUUID(), text, images };
    rememberQueue([...queueRef.current, item]);
    setInput("");
    setAttachedImages([]);
    setAttachedDocs([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setAgentStatus(`Queued. It starts when this run finishes. ${queueRef.current.length} waiting.`);
  }

  async function steerComposer(text: string) {
    const job = agentJobRef.current;
    if (!text.trim() || !agentRunningRef.current || !job) return;
    const response = await fetch("/api/agent/steer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ job_id: job, text }),
    });
    if (!response.ok) {
      queueComposer(text);
      setAgentStatus("That run had already moved on, so the message was queued.");
      return;
    }
    setAgentMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setAttachedImages([]);
    setAttachedDocs([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setAgentStatus("That note is in the current run. The goal stays open until the check passes, the work is blocked, or you press Stop.");
  }

  function dispatchAgent(text: string, images?: string[]) {
    if (agentRunningRef.current) queueComposer(text, images);
    else void sendAgent(text, images);
  }

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if ((!trimmed && attachedImages.length === 0 && attachedDocs.length === 0) || streaming || !sessionId) return;

    // ── Slash commands ──────────────────────────────────────────────────────
    if (trimmed.startsWith("/")) {
      const [cmd, ...rest] = trimmed.slice(1).split(" ");
      const arg = rest.join(" ").trim();
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      switch (cmd.toLowerCase()) {
        case "diff":
          dispatchAgent(`Run: git diff HEAD${arg ? ` -- ${arg}` : ""} and show me what changed`);
          return;
        case "undo":
          dispatchAgent("Run: git log --oneline -5 to show recent commits, then revert the last AI commit with git revert HEAD --no-edit");
          return;
        case "log":
          dispatchAgent("Run: git log --oneline -15 and show me the recent commit history");
          return;
        case "add":
          if (!arg) {
            setAgentMessages((prev) => [...prev, { role: "assistant", content: "Usage: `/add <file or glob>` e.g. `/add src/components/Button.tsx`", toolEvents: [], models: LOCAL_COMMAND_ANSWER }]);
            return;
          }
          dispatchAgent(`Read the file(s) matching "${arg}" and summarise what they contain so I have them in context`);
          return;
        case "ls":
          dispatchAgent(`List the directory: ${arg || workspacePath || "."}`);
          return;
        case "run":
          if (!arg) return;
          dispatchAgent(`Run command: ${arg}`);
          return;
        case "help":
          setAgentMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `**Slash commands:**\n- \`/diff [file]\` — show git diff\n- \`/undo\` — revert last AI commit\n- \`/log\` — git log last 15 commits\n- \`/add <file>\` — read file into context\n- \`/ls [path]\` — list directory\n- \`/run <command>\` — run any command\n- \`/help\` — show this list`,
              toolEvents: [],
              models: LOCAL_COMMAND_ANSWER,
            },
          ]);
          return;
        default:
          setAgentMessages((prev) => [...prev, { role: "assistant", content: `Unknown command: \`/${cmd}\`. Type \`/help\` for available commands.`, toolEvents: [], models: LOCAL_COMMAND_ANSWER }]);
          return;
      }
    }

    // Agent mode — route to agent API
    if (agentMode) {
      let agentContent = trimmed;
      if (attachedDocs.length > 0) {
        const docBlocks = attachedDocs.map((d) => d.kind === "video" && d.path
          ? `Video: ${d.path}`
          : `File: \`${d.name}\`\n\`\`\`${d.ext.slice(1)}\n${d.content}\n\`\`\``);
        agentContent = docBlocks.join("\n\n") + (trimmed ? "\n\n---\n\n" + trimmed : "");
      }
      if (!agentContent) agentContent = "(image attached)";

      const imageBase64s = attachedImages.map((i) => i.base64);
      if (agentRunningRef.current) {
        queueComposer(agentContent, imageBase64s.length > 0 ? imageBase64s : undefined);
        return;
      }
      const suggestedModel = pickModelForTask(agentContent, imageBase64s);
      if (suggestedModel) await onModelChange(suggestedModel);
      sendAgent(agentContent, imageBase64s.length > 0 ? imageBase64s : undefined, suggestedModel ?? model);
      setInput("");
      setAttachedImages([]);
      setAttachedDocs([]);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      return;
    }

    // Build final content with doc attachments inline
    let finalContent = trimmed;
    if (attachedDocs.length > 0) {
      const docBlocks = attachedDocs.map((d) => d.kind === "video" && d.path
        ? `Video: ${d.path}`
        : `File: \`${d.name}\`\n\`\`\`${d.ext.slice(1)}\n${d.content}\n\`\`\``);
      finalContent = docBlocks.join("\n\n") + (trimmed ? "\n\n---\n\n" + trimmed : "");
    }
    if (!finalContent) finalContent = "(image attached)";

    const imageBase64s = attachedImages.map((i) => i.base64);
    onSend(finalContent, imageBase64s.length > 0 ? imageBase64s : undefined);

    setInput("");
    setAttachedImages([]);
    setAttachedDocs([]);
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, attachedImages, attachedDocs, streaming, agentRunning, agentMode, sessionId, onSend, onModelChange, pickModelForTask]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      void steerComposer(input.trim());
      return;
    }
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function autoResize(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }

  function handleEdit(messageId: string, newContent: string) {
    onResend(messageId, newContent);
  }

  sendHeardRef.current = (text: string) => {
    if (sessionId) void sendAgent(text);
  };

  async function pressListen() {
    setHearing(true);
    setAgentStatus("Listening…");
    try {
      const response = await fetch("/api/fonia/listen", { method: "POST" });
      const data = await response.json() as { text?: string; message?: string };
      if (data.text?.trim()) {
        setAgentStatus("");
        void sendAgent(data.text.trim());
      } else {
        setAgentStatus(data.message || "No speech recognized.");
      }
    } catch {
      setAgentStatus("The microphone did not answer.");
    } finally {
      setHearing(false);
    }
  }

  const canSend = (input.trim() || attachedImages.length > 0 || attachedDocs.length > 0) && !streaming && !!sessionId;

  if (!sessionId) {
    return (
      <div className="fonia-hello" style={{ height: "100%" }}>
        <OCore size={36} animation="subtle" uid="arrive" />
        <p>Start a chat</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

      <div style={{ padding: "8px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, background: "var(--bg-panel)" }}>
        <button onClick={() => setShowSystem((v) => !v)} className="fonia-btn">
          {showSystem ? "Hide instructions" : "Instructions"}
        </button>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{model || "No model selected"}</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => {
            if (confirm("Clear all messages?")) {
              onClearHistory();
              setAgentMessages([]);
            }
          }}
          className="fonia-btn"
        >Clear</button>
      </div>

      {/* System prompt */}
      {showSystem && (
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", background: "var(--bg-input)", flexShrink: 0 }}>
          <label style={{ fontSize: 10, color: "var(--text-muted)", display: "block", marginBottom: 4, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>System Prompt</label>
          <div style={{ display: "flex", gap: 8 }}>
            <textarea
              value={localSystemPrompt}
              onChange={(e) => setLocalSystemPrompt(e.target.value)}
              placeholder="You are a helpful assistant..."
              rows={3}
              style={{ flex: 1, background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 6, padding: "6px 10px", fontSize: 12, resize: "vertical", outline: "none", fontFamily: "inherit" }}
            />
            <button onClick={() => onSystemPromptChange(localSystemPrompt)} style={{ background: "var(--accent)", border: "none", color: "#fff", borderRadius: 6, padding: "6px 12px", cursor: "pointer", fontSize: 12, alignSelf: "flex-start" }}>Save</button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        <div className="fonia-read">
        {messages.length === 0 && agentMessages.length === 0 && !streaming && !agentRunning && (
          <div className="fonia-hello">
            <OCore size={36} animation="subtle" uid="hello" />
            <p>What should we work on?</p>
          </div>
        )}

        {/* Normal chat messages */}
        {!agentMode && messages.map((m, i) => (
          <MessageBubble key={m.id} msg={m} isLast={i === messages.length - 1}
            streaming={streaming} onEdit={handleEdit} onRegenerate={onRegenerate} />
        ))}
        {!agentMode && streaming && <StreamingBubble content={streamingContent} model={model} />}

        {/* Agent messages */}
        {agentMode && agentMessages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div className="fonia-user">{m.content}</div>
            ) : (
              <div className="fonia-answer">
                  <AnsweredBy models={m.models} failed={m.failed} />
                  {m.toolEvents && m.toolEvents.length > 0 && <ToolEventBubble events={m.toolEvents} startOpen={showSteps} />}
                  {m.diffEvents && m.diffEvents.map((d, di) => {
                    const key = `${i}:${di}:${d.path}`;
                    const decision = diffDecision[key];
                    return (
                      <div key={key}>
                        <DiffView
                          diff={d}
                          onAccept={decision ? undefined : () => setDiffDecision((prev) => ({ ...prev, [key]: "kept" }))}
                          onReject={decision ? undefined : () => {
                            void fetch("/api/files/restore", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ path: d.path, content: d.before }),
                            }).then(async (response) => {
                              if (response.ok) setDiffDecision((prev) => ({ ...prev, [key]: "restored" }));
                              else setAgentStatus("That file was not restored.");
                            });
                          }}
                        />
                        {decision === "kept" && <p className="fonia-hint">Kept the change.</p>}
                        {decision === "restored" && <p className="fonia-hint">Restored the previous file.</p>}
                      </div>
                    );
                  })}
                  <div className="prose" style={{ color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: renderMarkdown(shownReply(m.content)) }} />
                  <ModelChoiceButtons content={m.content} onPick={(nextModel) => {
                    const previousUser = [...agentMessages].slice(0, i).reverse().find((entry) => entry.role === "user");
                    if (!previousUser) return;
                    void onModelChange(nextModel);
                    void sendAgent(shownReply(previousUser.content), previousUser.images, nextModel, true, true);
                  }} />
                  {m.choices && m.choices.length > 0 && !agentMessages.slice(i + 1).some((entry) => entry.role === "user") && (
                    <div>
                      {m.choices.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          className="fonia-choice"
                          onClick={() => {
                            if (option.id === "custom") {
                              setAgentStatus("Type what you mean. Nothing has been run.");
                              return;
                            }
                            void sendAgent(option.label, undefined, model, false, false, false, option.id, m.choiceOriginal || "");
                          }}
                        >
                          <strong>{option.label}</strong>
                          <span>{option.detail}</span>
                        </button>
                      ))}
                    </div>
                  )}
                  <WebAskButtons
                    content={m.content}
                    onAllow={() => {
                      const previousUser = [...agentMessages].slice(0, i).reverse().find((entry) => entry.role === "user");
                      if (!previousUser) return;
                      void sendAgent(`${shownReply(previousUser.content)}\n\nThe user allowed the web for this run.`, previousUser.images, model, true, true, true);
                    }}
                    onSkip={() => {
                      const previousUser = [...agentMessages].slice(0, i).reverse().find((entry) => entry.role === "user");
                      if (!previousUser) return;
                      void sendAgent(`${shownReply(previousUser.content)}\n\nThe user said to stay offline. Finish the goal without the web.`, previousUser.images, model, true, true, false);
                    }}
                  />
              </div>
            )}
          </div>
        ))}

        {/* Live agent activity while running */}
        {agentMode && agentRunning && (
          <div style={{ marginBottom: 22 }}>
              <div className="fonia-status">Working{agentIntentLabel ? ` · ${agentIntentLabel}` : ""}</div>
              {agentStatus && <div className="fonia-status">{agentStatus}</div>}
              <AnsweredBy models={liveModels} working />
              {agentEvents.length > 0 && <ToolEventBubble events={agentEvents} startOpen={showSteps} />}
              {agentDraft ? (
                <div className="prose" style={{ color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: renderMarkdown(shownReply(agentDraft)) }} />
              ) : (
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Working</span>
              )}
          </div>
        )}

        <div ref={bottomRef} />
        </div>
      </div>

      {/* Vision warning */}
      {visionWarning && (
        <div style={{ padding: "6px 16px", background: "#2a1a00", borderTop: "1px solid var(--warning)", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--warning)", fontSize: 13 }}>⚠️</span>
          <span style={{ fontSize: 11, color: "var(--warning)" }}>
            This picture goes to the vision model. <strong>{model}</strong> will not be asked to read it. If RAM is short, unload a loaded model first.
          </span>
        </div>
      )}

      {/* Context file chips */}
      {(contextFiles.length > 0 || attachedDocs.length > 0) && (
        <div style={{ padding: "6px 16px 4px", display: "flex", flexWrap: "wrap", gap: 5, borderTop: "1px solid var(--border)", background: "var(--bg-input)", flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: "var(--text-muted)", alignSelf: "center", marginRight: 2 }}>Context:</span>
          {contextFiles.map((f) => (
            <span key={f.path} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "var(--accent-dim)", color: "var(--accent)", borderRadius: 5, padding: "2px 7px", fontSize: 11, border: "1px solid var(--accent-dim)" }}>
              📄 {f.name}
              <button onClick={() => onRemoveContextFile(f.path)} style={{ background: "none", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 11, padding: 0 }}>✕</button>
            </span>
          ))}
          {attachedDocs.map((d, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#1a2a1a", color: "var(--success)", borderRadius: 5, padding: "2px 7px", fontSize: 11, border: "1px solid #2a4a2a" }}>
              {d.kind === "video" ? "🎬" : "📄"} {d.name}
              <button onClick={() => setAttachedDocs((prev) => prev.filter((_, j) => j !== i))} style={{ background: "none", border: "none", color: "var(--success)", cursor: "pointer", fontSize: 11, padding: 0 }}>✕</button>
            </span>
          ))}
        </div>
      )}

      {/* Image previews */}
      {attachedImages.length > 0 && (
        <div style={{ padding: "6px 16px 4px", display: "flex", gap: 8, borderTop: "1px solid var(--border)", background: "var(--bg-input)", flexShrink: 0, flexWrap: "wrap" }}>
          {attachedImages.map((img, i) => (
            <div key={i} style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.dataUrl}
                alt={img.name}
                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, border: "1px solid var(--border)" }}
              />
              <button
                onClick={() => setAttachedImages((prev) => prev.filter((_, j) => j !== i))}
                style={{ position: "absolute", top: -4, right: -4, background: "var(--danger)", border: "none", color: "#fff", borderRadius: "50%", width: 16, height: 16, cursor: "pointer", fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
              >✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden file inputs */}
      <input ref={imageInputRef} type="file" accept="image/*" multiple hidden onChange={handleImageInputChange} />
      <input ref={fileInputRef} type="file" accept=".txt,.md,.json,.csv,.xml,.html,.ts,.tsx,.js,.jsx,.py,.go,.rs,.sh,.sql,.yaml,.yml,.toml,.pdf,.docx,.pptx,.mp4,.webm,.mov,.mkv" multiple hidden onChange={handleFileInputChange} />

      {loadedModels.length > 0 && (
        <div style={{ padding: "6px 14px", borderTop: "1px solid var(--border)", background: "var(--bg-input)", display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>In memory</span>
          {loadedModels.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => void unloadModel(item.name)}
              title={`Unload ${item.name}`}
              style={{ background: "var(--bg-panel)", border: "1px solid var(--border)", color: "var(--text-primary)", borderRadius: 6, padding: "2px 6px", cursor: "pointer", fontSize: 11 }}
            >
              {item.name} · {item.sizeMB} MB · unload
            </button>
          ))}
          <button
            type="button"
            onClick={() => void unloadModel()}
            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: 11 }}
          >
            Unload all
          </button>
        </div>
      )}

      {/* Input area */}
      <div className="fonia-dock" style={{ flexShrink: 0 }}>
        {hearing && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px 0" }} aria-live="polite">
            <span className="fonia-wave" aria-hidden="true"><span /><span /><span /><span /></span>
            <span className="fonia-mono">Listening</span>
          </div>
        )}
        <div>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder={agentRunning ? "Queue with Enter. Steer this run with Ctrl+Enter." : "Message Fonia"}
            rows={1}
            style={{ display: "block", width: "100%", background: "none", border: "none", color: "var(--text-primary)", fontSize: 14, resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5, padding: "10px 12px 6px", minHeight: 22, maxHeight: 200, boxSizing: "border-box" }}
          />

          {/* Bottom toolbar */}
          <div style={{ display: "flex", alignItems: "center", padding: "5px 10px", borderTop: "1px solid var(--border)", gap: 4 }}>
            {/* Model picker */}
            <ModelPicker model={model} models={models} onChange={onModelChange} />

            <div style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px" }} />

            {/* Image attach */}
            <button onClick={() => fileInputRef.current?.click()} className="fonia-btn" title="Attach a document or video">Attach</button>
            <button onClick={() => imageInputRef.current?.click()} className="fonia-btn" title="Attach a picture for the vision model">Vision</button>
            <button onClick={() => void pressListen()} disabled={agentRunning || streaming} className="fonia-btn">
              {hearing ? "Hearing" : "Voice"}
            </button>
            <button
              onClick={() => {
                const next = !adjusterOn;
                setAdjusterOn(next);
                window.localStorage.setItem("fonia-adjust", next ? "on" : "off");
              }}
              className="fonia-btn"
              title="Let the 1.5B label an unclear message. It does not rewrite your words."
            >{adjusterOn ? "Label on" : "Label"}</button>

            <div style={{ flex: 1 }} />

            {agentRunning && (
              <>
                <button onClick={handleSend} disabled={!canSend} className="fonia-btn">Queue</button>
                <button onClick={() => void steerComposer(input.trim())} disabled={!input.trim()} className="fonia-btn">Steer</button>
              </>
            )}
            {(streaming || agentRunning) ? (
              <button
                onClick={() => {
                  stopAgentRun();
                  agentRunningRef.current = false;
                  setAgentRunning(false);
                }}
                className="fonia-btn"
              >
                Stop
              </button>
            ) : (
              <button onClick={handleSend} disabled={!canSend} className="fonia-btn-primary">
                Send
              </button>
            )}
          </div>
        </div>
        {queue.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8 }}>
            {queue.map((item, index) => (
              <div key={item.id} className="fonia-chip">
                <span>Next {index + 1}: {item.text.slice(0, 140)}</span>
                <button
                  className="fonia-btn"
                  onClick={() => rememberQueue(queueRef.current.filter((entry) => entry.id !== item.id))}
                >Remove</button>
              </div>
            ))}
          </div>
        )}
        <p className="fonia-hint" style={{ padding: "0 12px 8px" }}>
          Enter sends. Shift+Enter adds a line. Ctrl+Enter steers. Ctrl+K opens commands.
          {ollamaSource === "offline" ? " Model server offline." : agentRunning ? " This run stays open until the check passes, the work is blocked, or you press Stop." : ""}
        </p>
      </div>
    </div>
  );
}
