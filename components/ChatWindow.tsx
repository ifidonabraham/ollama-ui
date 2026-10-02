"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  images?: string[]; // base64 strings for display
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
}

interface Props {
  sessionId: string | null;
  messages: ChatMessage[];
  model: string;
  models: string[];
  streaming: boolean;
  streamingContent: string;
  contextFiles: { path: string; name: string }[];
  onSend: (content: string, images?: string[]) => void;
  onResend: (messageId: string, newContent: string, images?: string[]) => void;
  onRegenerate: () => void;
  onModelChange: (model: string) => void;
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

function StreamingBubble({ content }: { content: string }) {
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
  type: "thinking" | "tool_call" | "tool_result";
  tool?: string;
  args?: Record<string, string>;
  result?: string;
  text?: string;
}

function ToolEventBubble({ events }: { events: ToolEvent[] }) {
  const [expanded, setExpanded] = useState(false);
  if (events.length === 0) return null;
  return (
    <div style={{ marginBottom: 12, marginLeft: 38 }}>
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: "var(--bg-active)", border: "1px solid var(--border)",
          color: "var(--text-secondary)", borderRadius: 6, padding: "3px 10px",
          cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 5,
        }}
      >
        <span style={{ color: "var(--accent)" }}>⚡</span>
        {events.filter((e) => e.type === "tool_call").length} tool{events.filter((e) => e.type === "tool_call").length !== 1 ? "s" : ""} used
        <span style={{ fontSize: 9 }}>{expanded ? "▲" : "▼"}</span>
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
                  <span style={{ color: "var(--success)", fontWeight: 600 }}>✓ {ev.tool}</span>
                  <pre style={{ margin: "4px 0 0", fontSize: 10, color: "var(--text-secondary)", background: "var(--bg-input)", padding: "4px 6px", borderRadius: 4, whiteSpace: "pre-wrap", wordBreak: "break-all", maxHeight: 100, overflow: "auto", border: "none" }}>
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
  contextFiles, onSend, onResend, onRegenerate, onModelChange,
  onClearHistory, onSystemPromptChange, systemPrompt,
  onRemoveContextFile, onStopGeneration, workspacePath, ollamaSource = "local",
}: Props) {
  const [input, setInput] = useState("");
  const [showSystem, setShowSystem] = useState(false);
  const [localSystemPrompt, setLocalSystemPrompt] = useState(systemPrompt);
  const [attachedImages, setAttachedImages] = useState<AttachedImage[]>([]);
  const [attachedDocs, setAttachedDocs] = useState<AttachedDoc[]>([]);
  const [visionWarning, setVisionWarning] = useState(false);
  const [agentMode, setAgentMode] = useState(true);
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentEvents, setAgentEvents] = useState<ToolEvent[]>([]);
  const [agentMessages, setAgentMessages] = useState<{ role: string; content: string; toolEvents?: ToolEvent[]; diffEvents?: DiffEvent[] }[]>([]);
  const [pendingDiffs, setPendingDiffs] = useState<DiffEvent[]>([]); // diffs waiting for accept/reject
  const agentAbortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, streamingContent]);
  useEffect(() => { setLocalSystemPrompt(systemPrompt); }, [systemPrompt]);

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
      if (data.type === "document") {
        setAttachedDocs((prev) => [...prev, { name: data.name, ext: data.ext, content: data.content }]);
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
  async function sendAgent(userMessage: string) {
    if (!userMessage.trim() || agentRunning) return;

    const userEntry = { role: "user", content: userMessage };
    const newHistory = [...agentMessages.map(({ toolEvents: _, diffEvents: __, ...m }) => m), userEntry];

    setAgentMessages((prev) => [...prev, { ...userEntry }]);
    setAgentRunning(true);

    const currentEvents: ToolEvent[] = [];
    const currentDiffs: DiffEvent[] = [];
    let assistantText = "";

    // Fix: create abort controller and pass signal to fetch
    const abort = new AbortController();
    agentAbortRef.current = abort;

    try {
      const res = await fetch("/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newHistory,
          model,
          system_prompt: systemPrompt,
          workspace_path: workspacePath,
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
            if (data.event === "thinking") {
              const ev: ToolEvent = { type: "thinking", text: data.text };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "tool_call") {
              const ev: ToolEvent = { type: "tool_call", tool: data.tool, args: data.args };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "tool_result") {
              const ev: ToolEvent = { type: "tool_result", tool: data.tool, result: data.result };
              currentEvents.push(ev);
              setAgentEvents([...currentEvents]);
            } else if (data.event === "delta") {
              assistantText += data.text;
              setAgentEvents([...currentEvents]); // trigger re-render
            } else if (data.event === "file_diff") {
              const diff: DiffEvent = { path: data.path, before: data.before, after: data.after, diff: data.diff };
              currentDiffs.push(diff);
            } else if (data.event === "done") {
              assistantText = data.fullText || assistantText;
              setAgentMessages((prev) => [
                ...prev,
                { role: "assistant", content: assistantText, toolEvents: [...currentEvents], diffEvents: [...currentDiffs] },
              ]);
              currentEvents.splice(0);
              currentDiffs.splice(0);
              setAgentEvents([]);
            } else if (data.event === "error") {
              setAgentMessages((prev) => [
                ...prev,
                { role: "assistant", content: `❌ ${data.message}`, toolEvents: [] },
              ]);
            }
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") {
        setAgentMessages((prev) => [
          ...prev,
          { role: "assistant", content: "❌ Agent error — is Ollama running?", toolEvents: [] },
        ]);
      }
    } finally {
      setAgentRunning(false);
      setAgentEvents([]);
      agentAbortRef.current = null;
    }
  }

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if ((!trimmed && attachedImages.length === 0 && attachedDocs.length === 0) || streaming || agentRunning || !sessionId) return;

    // ── Slash commands ──────────────────────────────────────────────────────
    if (trimmed.startsWith("/")) {
      const [cmd, ...rest] = trimmed.slice(1).split(" ");
      const arg = rest.join(" ").trim();
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      switch (cmd.toLowerCase()) {
        case "diff":
          sendAgent(`Run: git diff HEAD${arg ? ` -- ${arg}` : ""} and show me what changed`);
          return;
        case "undo":
          sendAgent("Run: git log --oneline -5 to show recent commits, then revert the last AI commit with git revert HEAD --no-edit");
          return;
        case "log":
          sendAgent("Run: git log --oneline -15 and show me the recent commit history");
          return;
        case "add":
          if (!arg) {
            setAgentMessages((prev) => [...prev, { role: "assistant", content: "Usage: `/add <file or glob>` e.g. `/add src/components/Button.tsx`", toolEvents: [] }]);
            return;
          }
          sendAgent(`Read the file(s) matching "${arg}" and summarise what they contain so I have them in context`);
          return;
        case "ls":
          sendAgent(`List the directory: ${arg || workspacePath || "."}`);
          return;
        case "run":
          if (!arg) return;
          sendAgent(`Run command: ${arg}`);
          return;
        case "help":
          setAgentMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `**Slash commands:**\n- \`/diff [file]\` — show git diff\n- \`/undo\` — revert last AI commit\n- \`/log\` — git log last 15 commits\n- \`/add <file>\` — read file into context\n- \`/ls [path]\` — list directory\n- \`/run <command>\` — run any command\n- \`/help\` — show this list`,
              toolEvents: [],
            },
          ]);
          return;
        default:
          setAgentMessages((prev) => [...prev, { role: "assistant", content: `Unknown command: \`/${cmd}\`. Type \`/help\` for available commands.`, toolEvents: [] }]);
          return;
      }
    }

    // Agent mode — route to agent API
    if (agentMode) {
      sendAgent(trimmed);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      return;
    }

    // Build final content with doc attachments inline
    let finalContent = trimmed;
    if (attachedDocs.length > 0) {
      const docBlocks = attachedDocs.map((d) => `File: \`${d.name}\`\n\`\`\`${d.ext.slice(1)}\n${d.content}\n\`\`\``);
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
  }, [input, attachedImages, attachedDocs, streaming, agentRunning, agentMode, sessionId, onSend]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
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

  const canSend = (input.trim() || attachedImages.length > 0 || attachedDocs.length > 0) && !streaming && !agentRunning && !!sessionId;

  if (!sessionId) {
    return (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, color: "var(--text-muted)", height: "100%" }}>
        <div style={{ fontSize: 44 }}>🦙</div>
        <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text-secondary)" }}>Start a new chat or select one</p>
        <p style={{ fontSize: 12 }}>{models.length} model{models.length !== 1 ? "s" : ""} available · Ollama running</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>

      {/* Toolbar */}
      <div style={{ padding: "7px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, flexShrink: 0, background: "var(--bg-panel)" }}>
        <button
          onClick={() => setShowSystem((v) => !v)}
          style={{ background: showSystem ? "var(--accent-dim)" : "transparent", border: "1px solid " + (showSystem ? "var(--accent)" : "var(--border)"), color: showSystem ? "var(--accent)" : "var(--text-muted)", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11 }}
        >
          ⚙ System
        </button>

        {/* Agent mode toggle */}
        <button
          onClick={() => { setAgentMode((v) => !v); setAgentMessages([]); }}
          title="Agent mode: AI can read/write files and run commands directly"
          style={{
            background: agentMode ? "#1a2a0a" : "transparent",
            border: "1px solid " + (agentMode ? "var(--success)" : "var(--border)"),
            color: agentMode ? "var(--success)" : "var(--text-muted)",
            borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontSize: 11,
            display: "flex", alignItems: "center", gap: 4,
          }}
        >
          ⚡ Agent {agentMode ? "ON" : "OFF"}
        </button>

        {agentMode && (
          <span style={{ fontSize: 10, color: "var(--text-muted)", fontStyle: "italic" }}>
            AI can read/write files & run commands
          </span>
        )}

        <div style={{ flex: 1 }} />
        <button
          onClick={() => {
            if (confirm("Clear all messages?")) {
              onClearHistory();
              setAgentMessages([]);
            }
          }}
          style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 11, padding: "3px 6px" }}
          title="Clear history"
        >🗑 Clear</button>
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
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        {messages.length === 0 && agentMessages.length === 0 && !streaming && !agentRunning && (
          <div style={{ textAlign: "center", color: "var(--text-muted)", marginTop: 60, fontSize: 13 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🦙</div>
            <p>Send a message to start</p>
            <p style={{ fontSize: 11, marginTop: 4 }}>Model: <strong style={{ color: "var(--text-secondary)" }}>{model}</strong>{isVisionModel(model) ? " · 👁 vision" : ""}</p>
            {agentMode
              ? <p style={{ fontSize: 11, color: "var(--success)", marginTop: 8 }}>⚡ Agent mode — ask me to create files, edit code, run commands…</p>
              : <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8 }}>Ctrl+V to paste image · 📎 attach file · ⚡ Agent for file/command execution</p>
            }
          </div>
        )}

        {/* Normal chat messages */}
        {!agentMode && messages.map((m, i) => (
          <MessageBubble key={m.id} msg={m} isLast={i === messages.length - 1}
            streaming={streaming} onEdit={handleEdit} onRegenerate={onRegenerate} />
        ))}
        {!agentMode && streaming && <StreamingBubble content={streamingContent} />}

        {/* Agent messages */}
        {agentMode && agentMessages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <div style={{ display: "flex", flexDirection: "row-reverse", gap: 10, marginBottom: 18, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: "1px solid var(--border)", color: "#fff", fontWeight: 700 }}>U</div>
                <div style={{ maxWidth: "82%" }}>
                  <div style={{ fontSize: 10, color: "var(--text-muted)", marginBottom: 2 }}>You</div>
                  <div style={{ background: "var(--user-bubble)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 12px", color: "var(--text-primary)", fontSize: 14, whiteSpace: "pre-wrap" }}>{m.content}</div>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a2a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: "1px solid var(--success)", color: "var(--success)", fontWeight: 700 }}>⚡</div>
                <div style={{ maxWidth: "82%" }}>
                  <div style={{ fontSize: 10, color: "var(--success)", marginBottom: 4 }}>Agent</div>
                  {m.toolEvents && m.toolEvents.length > 0 && <ToolEventBubble events={m.toolEvents} />}
                  {m.diffEvents && m.diffEvents.map((d, di) => (
                    <DiffView key={di} diff={d} />
                  ))}
                  <div className="prose" style={{ color: "var(--text-primary)" }} dangerouslySetInnerHTML={{ __html: renderMarkdown(m.content) }} />
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Live agent activity while running */}
        {agentMode && agentRunning && (
          <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "flex-start" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#1a2a0a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0, border: "1px solid var(--success)", color: "var(--success)", fontWeight: 700 }}>⚡</div>
            <div style={{ maxWidth: "82%" }}>
              <div style={{ fontSize: 10, color: "var(--success)", marginBottom: 4 }}>Agent · working…</div>
              {agentEvents.length > 0 && <ToolEventBubble events={agentEvents} />}
              <span style={{ fontSize: 13, color: "var(--text-muted)" }}>▋</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Vision warning */}
      {visionWarning && (
        <div style={{ padding: "6px 16px", background: "#2a1a00", borderTop: "1px solid var(--warning)", flexShrink: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--warning)", fontSize: 13 }}>⚠️</span>
          <span style={{ fontSize: 11, color: "var(--warning)" }}>
            <strong>{model}</strong> is text-only. Switch to <strong>llava:7b</strong> (or another vision model) to process images.
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
              📄 {d.name}
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
      <input ref={fileInputRef} type="file" accept=".txt,.md,.json,.csv,.xml,.html,.ts,.tsx,.js,.jsx,.py,.go,.rs,.sh,.sql,.yaml,.yml,.toml,.pdf" multiple hidden onChange={handleFileInputChange} />

      {/* Input area */}
      <div style={{ padding: "10px 14px 12px", borderTop: "1px solid var(--border)", background: "var(--bg-panel)", flexShrink: 0 }}>
        <div style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={autoResize}
            onKeyDown={handleKeyDown}
            disabled={streaming}
            placeholder={streaming ? "Generating… (Ctrl+V to paste image)" : agentMode ? "Message… · /help for commands · Enter to send" : "Message… · Ctrl+V paste image · Enter to send · Shift+Enter newline"}
            rows={1}
            style={{ display: "block", width: "100%", background: "none", border: "none", color: "var(--text-primary)", fontSize: 14, resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5, padding: "10px 12px 6px", minHeight: 22, maxHeight: 200, boxSizing: "border-box" }}
          />

          {/* Bottom toolbar */}
          <div style={{ display: "flex", alignItems: "center", padding: "5px 10px", borderTop: "1px solid var(--border)", gap: 4 }}>
            {/* Model picker */}
            <ModelPicker model={model} models={models} onChange={onModelChange} />

            <div style={{ width: 1, height: 16, background: "var(--border)", margin: "0 4px" }} />

            {/* Image attach */}
            <button
              onClick={() => imageInputRef.current?.click()}
              title="Attach image (or Ctrl+V to paste)"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 15, padding: "3px 5px", borderRadius: 5 }}
            >🖼</button>

            {/* Document attach */}
            <button
              onClick={() => fileInputRef.current?.click()}
              title="Attach document"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 15, padding: "3px 5px", borderRadius: 5 }}
            >📎</button>

            <div style={{ flex: 1 }} />

            {/* Stop button (streaming or agent running) */}
            {(streaming || agentRunning) ? (
              <button
                onClick={() => { onStopGeneration(); agentAbortRef.current?.abort(); setAgentRunning(false); }}
                style={{ background: "var(--danger)", border: "none", color: "#fff", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
              >
                ⏹ Stop
              </button>
            ) : (
              <button
                onClick={handleSend}
                disabled={!canSend}
                style={{ background: canSend ? "var(--accent)" : "var(--bg-active)", border: "none", color: canSend ? "#fff" : "var(--text-muted)", borderRadius: 8, padding: "5px 14px", cursor: canSend ? "pointer" : "not-allowed", fontSize: 13, fontWeight: 600, transition: "background 0.15s" }}
              >
                Send ↑
              </button>
            )}
          </div>
        </div>
        <p style={{ fontSize: 10, color: "var(--text-muted)", marginTop: 5, textAlign: "center" }}>
          {ollamaSource === "cloud"
            ? "☁️ Running via Azure · inference in the cloud"
            : ollamaSource === "offline"
            ? "⚠️ Ollama offline · start Ollama or configure OLLAMA_HOST"
            : "Running locally via Ollama · no data leaves your machine"}
        </p>
      </div>
    </div>
  );
}
