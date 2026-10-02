"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Sidebar, { SessionMeta, WorkspaceContext } from "@/components/Sidebar";
import ChatWindow, { ChatMessage } from "@/components/ChatWindow";
import FileBrowser from "@/components/FileBrowser";
import TerminalPanel from "@/components/TerminalPanel";
import { FileNode } from "@/components/FolderTree";

type Panel = "chat" | "files" | "terminal";

interface ContextFile {
  path: string;
  name: string;
  content: string;
}

export default function Home() {
  // ── Session state ─────────────────────────────────────────────────────────
  const [sessions, setSessions] = useState<SessionMeta[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [systemPrompt, setSystemPromptState] = useState("");

  // ── Model state ───────────────────────────────────────────────────────────
  const [models, setModels] = useState<string[]>([]);
  const [activeModel, setActiveModel] = useState<string>("");

  // ── Streaming ─────────────────────────────────────────────────────────────
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  // ── Workspace / folder ────────────────────────────────────────────────────
  const [workspace, setWorkspace] = useState<WorkspaceContext | null>(null);
  const [selectedFilePaths, setSelectedFilePaths] = useState<Set<string>>(new Set());
  const [contextFiles, setContextFiles] = useState<ContextFile[]>([]);

  // ── Panel ─────────────────────────────────────────────────────────────────
  const [activePanel, setActivePanel] = useState<Panel>("chat");

  // ── Ollama source tracking ────────────────────────────────────────────────
  const [ollamaSource, setOllamaSource] = useState<"local" | "cloud" | "offline">("offline");

  // ── Load models (auto-refresh every 30s to pick up newly pulled models) ──
  const fetchModels = useCallback(async (keepCurrent = true) => {
    try {
      const r = await fetch("/api/models");
      const d = await r.json();
      const names: string[] = (d.models ?? []).map((m: { name: string }) => m.name);
      setModels(names);
      setOllamaSource(names.length > 0 ? (d.source ?? "local") : "offline");
      if (!keepCurrent || !activeModel) {
        if (names.length > 0) setActiveModel(names[0]);
      }
    } catch { setOllamaSource("offline"); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchModels(false);
    const interval = setInterval(() => fetchModels(true), 30_000);
    return () => clearInterval(interval);
  }, [fetchModels]);

  // ── Load sessions ─────────────────────────────────────────────────────────
  useEffect(() => { loadSessions(); }, []);

  async function loadSessions() {
    const res = await fetch("/api/sessions");
    const data = await res.json();
    setSessions(data.sessions ?? []);
  }

  async function loadSession(id: string) {
    const res = await fetch(`/api/sessions/${id}`);
    const data = await res.json();
    if (!data.session) return;
    setActiveSessionId(id);
    setMessages(data.messages ?? []);
    setActiveModel(data.session.model);
    setSystemPromptState(data.session.system_prompt ?? "");
  }

  async function createNewSession() {
    const modelToUse = activeModel || models[0];
    if (!modelToUse) return;
    const res = await fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: modelToUse, title: "New Chat" }),
    });
    const data = await res.json();
    if (data.session) {
      await loadSessions();
      await loadSession(data.session.id);
      setActivePanel("chat");
    }
  }

  async function deleteSession(id: string) {
    await fetch(`/api/sessions/${id}`, { method: "DELETE" });
    if (activeSessionId === id) { setActiveSessionId(null); setMessages([]); }
    await loadSessions();
  }

  async function renameSession(id: string, title: string) {
    await fetch(`/api/sessions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    await loadSessions();
  }

  async function changeModel(model: string) {
    // Unload the previous model from RAM when switching (free memory)
    if (activeModel && activeModel !== model) {
      fetch("/api/unload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: activeModel }),
      }).catch(() => {});
    }
    setActiveModel(model);
    if (!activeSessionId) return;
    await fetch(`/api/sessions/${activeSessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model }),
    });
    await loadSessions();
  }

  async function updateSystemPrompt(prompt: string) {
    setSystemPromptState(prompt);
    if (!activeSessionId) return;
    await fetch(`/api/sessions/${activeSessionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system_prompt: prompt }),
    });
  }

  async function clearHistory() {
    if (!activeSessionId) return;
    await fetch(`/api/sessions/${activeSessionId}`, { method: "PUT" });
    setMessages([]);
  }

  // ── Stop generation ───────────────────────────────────────────────────────
  function stopGeneration() {
    abortRef.current?.abort();
  }

  // ── Workspace ─────────────────────────────────────────────────────────────
  async function openFolder(folderPath: string) {
    try {
      const res = await fetch(`/api/workspace?path=${encodeURIComponent(folderPath)}`);
      const data = await res.json();
      if (!res.ok) { alert(data.error ?? "Could not open folder"); return; }
      setWorkspace({ path: data.path, name: data.name, tree: data.tree });
      setSelectedFilePaths(new Set());
      setContextFiles([]);
    } catch { alert("Failed to load folder"); }
  }

  function closeFolder() {
    setWorkspace(null);
    setSelectedFilePaths(new Set());
    setContextFiles([]);
  }

  async function toggleFile(filePath: string, type: "file" | "dir", _node: FileNode) {
    if (type === "dir") return;
    const newSelected = new Set(selectedFilePaths);
    if (newSelected.has(filePath)) {
      newSelected.delete(filePath);
      setSelectedFilePaths(newSelected);
      setContextFiles((prev) => prev.filter((f) => f.path !== filePath));
      return;
    }
    try {
      const res = await fetch("/api/workspace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: [filePath] }),
      });
      const data = await res.json();
      const result = data.files?.[0];
      if (result?.error) { alert(result.error); return; }
      if (result) {
        newSelected.add(filePath);
        setSelectedFilePaths(newSelected);
        const fileName = filePath.split(/[\\/]/).pop() ?? filePath;
        setContextFiles((prev) => [...prev, { path: filePath, name: fileName, content: result.content }]);
      }
    } catch { alert("Failed to read file"); }
  }

  function removeContextFile(filePath: string) {
    const newSelected = new Set(selectedFilePaths);
    newSelected.delete(filePath);
    setSelectedFilePaths(newSelected);
    setContextFiles((prev) => prev.filter((f) => f.path !== filePath));
  }

  // ── Core stream function ──────────────────────────────────────────────────
  async function streamChat(sessionId: string, content: string, images?: string[]) {
    const abort = new AbortController();
    abortRef.current = abort;
    setStreaming(true);
    setStreamingContent("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, content, model: activeModel, images }),
        signal: abort.signal,
      });
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.delta) { accumulated += data.delta; setStreamingContent(accumulated); }
            if (data.done) {
              const assistantMsg: ChatMessage = { id: data.id, role: "assistant", content: accumulated };
              setMessages((prev) => [...prev.filter((m) => !m.id.startsWith("temp-")), assistantMsg]);
              loadSession(sessionId);
            }
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if ((err as Error)?.name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          { id: "err-" + Date.now(), role: "assistant", content: "❌ Error connecting to Ollama. Is it running?" },
        ]);
      }
    } finally {
      setStreaming(false);
      setStreamingContent("");
      abortRef.current = null;
    }
  }

  // ── Auto model switching ──────────────────────────────────────────────────
  function pickBestModel(content: string, images?: string[], forAgent = false): string | null {
    const lower = content.toLowerCase();
    const wordCount = lower.trim().split(/\s+/).length;

    const isVision  = (m: string) => ["llava", "moondream", "minicpm-v", "bakllava"].some((p) => m.toLowerCase().startsWith(p));
    const isCoder   = (m: string) => m.toLowerCase().includes("coder");
    const isGeneral = (m: string) => !isCoder(m) && !isVision(m);

    const tiny    = models.find((m) => isCoder(m) && m.includes("1.5b"));
    const small   = models.find((m) => isCoder(m) && m.includes("7b"));
    const large   = models.find((m) => isCoder(m) && (m.includes("14b") || m.includes("13b")));
    const general = models.find((m) => isGeneral(m)); // qwen3:8b
    const vision  = models.find((m) => isVision(m));  // llava:7b

    // Agent mode with images → use vision model (it will still try tools; agent route handles fallback if it fails)
    if (forAgent && images && images.length > 0 && vision) {
      return vision !== activeModel ? vision : null;
    }

    // Agent mode without images → prefer fast text models, avoid slow 14b by default
    // NOTE: 1.5b IS allowed — agent route will fall back gracefully if tools not supported
    if (forAgent) {
      // If currently on 14b or a vision model, switch to something faster
      if (activeModel.includes("14b") || isVision(activeModel)) {
        const best = general ?? small ?? tiny ?? null;
        return best && best !== activeModel ? best : null;
      }
      // Otherwise keep current model — don't force-switch away from 1.5b
      return null;
    }

    // Image attached → vision model
    if (images && images.length > 0) {
      return vision && vision !== activeModel ? vision : null;
    }

    // ── Minor / tiny code edits → 1.5b (fast) ──────────────────────────────
    const minorEdit = /\b(rename|change the|replace|swap|update the|fix the|add a|remove the|delete the|move the|make it|set the|convert|just|only)\b/;
    if (tiny && wordCount <= 20 && minorEdit.test(lower) && /\b(color|variable|name|class|import|line|typo|spacing|margin|padding|font|size|text|value|string|number|comment|console\.log)\b/.test(lower)) {
      return tiny !== activeModel ? tiny : null;
    }

    // ── qwen3:8b — reasoning, explanations, non-code questions ─────────────
    // Use it when the message is clearly NOT a coding task
    const generalIntent = /\b(explain|what is|what are|why does|why is|how does|how do|tell me|describe|summarize|compare|difference between|pros and cons|should i use|which is better|what do you think|overview|understand|learn|concept|theory|idea|opinion|recommend|suggest)\b/;
    const hasCodeKeyword = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create a file|script|compile|deploy|import|export|interface|type |enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/;
    if (generalIntent.test(lower) && !hasCodeKeyword.test(lower) && general) {
      return general !== activeModel ? general : null;
    }

    // ── Large coding task → 14b ─────────────────────────────────────────────
    const bigTask = /\b(architecture|full (page|app|website|system|backend|frontend|api)|scaffold|entire|whole project|from scratch|multi.?file|design system|database schema)\b/;
    if (bigTask.test(lower) && large) {
      return large !== activeModel ? large : null;
    }

    // ── Standard coding → 7b ───────────────────────────────────────────────
    if (hasCodeKeyword.test(lower) && small) {
      return small !== activeModel ? small : null;
    }

    return null; // keep current model
  }

  // ── Send new message ──────────────────────────────────────────────────────
  const sendMessage = useCallback(async (content: string, images?: string[]) => {
    if (!activeSessionId || streaming) return;

    // Auto-switch model if a better one exists for this task (never switch to vision in normal mode unless images present)
    const suggestedModel = pickBestModel(content, images, false);
    if (suggestedModel) {
      await changeModel(suggestedModel);
    }

    // Auto-name on first message
    const session = sessions.find((s) => s.id === activeSessionId);
    if (session && session.title === "New Chat") {
      const autoTitle = content.replace(/\n<!-- images:\d+ -->$/, "").slice(0, 40) + (content.length > 40 ? "…" : "");
      await renameSession(activeSessionId, autoTitle);
    }

    // Prepend sidebar context files
    let finalContent = content;
    if (contextFiles.length > 0) {
      const blocks = contextFiles.map((f) => {
        const ext = f.name.split(".").pop() ?? "";
        return `File: \`${f.name}\`\n\`\`\`${ext}\n${f.content}\n\`\`\``;
      });
      finalContent = blocks.join("\n\n") + "\n\n---\n\n" + content;
    }

    // Optimistic user message (show original, not the file dumps)
    const tempId = "temp-" + Date.now();
    const displayContent = images && images.length > 0
      ? `${content}\n<!-- images:${images.length} -->`
      : content;
    setMessages((prev) => [...prev, { id: tempId, role: "user", content: displayContent }]);

    await streamChat(activeSessionId, finalContent, images);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSessionId, streaming, sessions, contextFiles, activeModel, models]);

  // ── Edit & resend ─────────────────────────────────────────────────────────
  const resendMessage = useCallback(async (messageId: string, newContent: string, images?: string[]) => {
    if (!activeSessionId || streaming) return;

    // Find the index of the edited message, truncate messages from there
    const idx = messages.findIndex((m) => m.id === messageId);
    if (idx === -1) return;

    const updatedMessages = messages.slice(0, idx);
    setMessages(updatedMessages);

    // Also clear those messages from DB: delete session messages and re-add kept ones
    await fetch(`/api/sessions/${activeSessionId}`, { method: "PUT" });
    // Re-add kept messages by re-sending them silently (no — too complex)
    // Instead: just resend with the new content; history in DB will be appended

    const tempId = "temp-" + Date.now();
    const displayContent = images && images.length > 0
      ? `${newContent}\n<!-- images:${images.length} -->`
      : newContent;
    setMessages((prev) => [...prev, { id: tempId, role: "user", content: displayContent }]);

    await streamChat(activeSessionId, newContent, images);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSessionId, streaming, messages, activeModel]);

  // ── Regenerate last response ──────────────────────────────────────────────
  const regenerate = useCallback(async () => {
    if (!activeSessionId || streaming) return;

    // Find the last user message
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;

    // Remove last assistant message from UI
    setMessages((prev) => {
      const last = [...prev].reverse().findIndex((m) => m.role === "assistant");
      if (last === -1) return prev;
      const realIdx = prev.length - 1 - last;
      return prev.slice(0, realIdx);
    });

    const cleanContent = lastUser.content.replace(/\n<!-- images:\d+ -->$/, "");
    await streamChat(activeSessionId, cleanContent);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSessionId, streaming, messages, activeModel]);

  // ── Insert from FileBrowser / Terminal ────────────────────────────────────
  function handleInsertToChat(text: string) {
    setActivePanel("chat");
    window.dispatchEvent(new CustomEvent("ollama-insert-text", { detail: text }));
  }

  const panelButtons: { id: Panel; label: string; icon: string }[] = [
    { id: "chat", label: "Chat", icon: "◉" },
    { id: "files", label: "Files", icon: "📁" },
    { id: "terminal", label: "Terminal", icon: "⚡" },
  ];

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar
        sessions={sessions}
        activeId={activeSessionId}
        workspace={workspace}
        selectedFiles={selectedFilePaths}
        onSelect={(id) => { loadSession(id); setActivePanel("chat"); }}
        onNew={createNewSession}
        onDelete={deleteSession}
        onRename={renameSession}
        onOpenFolder={openFolder}
        onCloseFolder={closeFolder}
        onToggleFile={toggleFile}
      />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "var(--bg-base)" }}>
        {/* Panel tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)", background: "var(--bg-panel)", flexShrink: 0 }}>
          {panelButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActivePanel(btn.id)}
              style={{
                padding: "9px 18px", background: "none", border: "none",
                borderBottom: activePanel === btn.id ? "2px solid var(--accent)" : "2px solid transparent",
                color: activePanel === btn.id ? "var(--accent)" : "var(--text-muted)",
                cursor: "pointer", fontSize: 12,
                fontWeight: activePanel === btn.id ? 600 : 400,
                display: "flex", alignItems: "center", gap: 5, transition: "color 0.15s",
              }}
            >
              {btn.icon} {btn.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "9px 14px", display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--text-muted)" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: models.length > 0 ? "var(--success)" : "var(--danger)", display: "inline-block" }} />
            {models.length > 0 ? `Ollama · ${models.length} models` : "Ollama offline"}
            <button
              onClick={() => fetchModels(true)}
              title="Refresh model list"
              style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 12, padding: "0 2px", lineHeight: 1 }}
            >↻</button>
            <button
              onClick={() => fetch("/api/unload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) }).then(() => fetchModels(true))}
              title="Unload all models from RAM"
              style={{ background: "none", border: "1px solid var(--border)", color: "var(--text-muted)", cursor: "pointer", fontSize: 10, padding: "1px 6px", borderRadius: 4, lineHeight: 1.4 }}
            >⏏ Free RAM</button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {activePanel === "chat" && (
            <ChatWindow
              sessionId={activeSessionId}
              messages={messages}
              model={activeModel}
              models={models}
              streaming={streaming}
              streamingContent={streamingContent}
              contextFiles={contextFiles}
              onSend={sendMessage}
              onResend={resendMessage}
              onRegenerate={regenerate}
              onModelChange={changeModel}
              onClearHistory={clearHistory}
              onSystemPromptChange={updateSystemPrompt}
              systemPrompt={systemPrompt}
              onRemoveContextFile={removeContextFile}
              onStopGeneration={stopGeneration}
              workspacePath={workspace?.path}
              ollamaSource={ollamaSource}
            />
          )}
          {activePanel === "files" && <FileBrowser onInsertToChat={handleInsertToChat} />}
          {activePanel === "terminal" && <TerminalPanel onInsertToChat={handleInsertToChat} />}
        </div>
      </div>
    </div>
  );
}
