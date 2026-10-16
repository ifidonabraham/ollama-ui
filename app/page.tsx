"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Sidebar, { SessionMeta, WorkspaceContext } from "@/components/Sidebar";
import ChatWindow, { ChatMessage } from "@/components/ChatWindow";
import FileBrowser from "@/components/FileBrowser";
import TerminalPanel from "@/components/TerminalPanel";
import CommandPalette from "@/components/CommandPalette";
import { OCore } from "@/components/OCore";
import { FileNode } from "@/components/FolderTree";
import { classifyIntent, isLocalComputerTask, isSimpleAction, refersToPriorAction } from "@/lib/intent";
import { personIsSteppingAway } from "@/lib/awayIntent";
import { estimateModelMb } from "@/lib/inferenceBudget";
import { directUserAction } from "@/lib/directAction";
import type { AnswerModel } from "@/lib/answerModels";

type Panel = "chat" | "split" | "terminal";

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
  const [agentHistory, setAgentHistory] = useState<{ role: "user" | "assistant"; content: string; models?: AnswerModel[] }[]>([]);
  const [systemPrompt, setSystemPromptState] = useState("");

  // ── Model state ───────────────────────────────────────────────────────────
  const [models, setModels] = useState<string[]>([]);
  const [freeMemoryMb, setFreeMemoryMb] = useState<number | null>(null);
  const [scheduler, setScheduler] = useState<{ queued_operations: number; active_model: string | null; loaded_models: string[] }>({ queued_operations: 0, active_model: null, loaded_models: [] });
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [terminalDock, setTerminalDock] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  // ── Ollama source tracking ────────────────────────────────────────────────
  const [ollamaSource, setOllamaSource] = useState<"local" | "cloud" | "offline">("offline");

  // ── Load models (auto-refresh every 30s to pick up newly pulled models) ──
  const fetchModels = useCallback(async (keepCurrent = true) => {
    try {
      const r = await fetch("/api/models");
      const d = await r.json();
      const names: string[] = (d.models ?? []).map((m: { name: string }) => m.name);
      setModels(names);
      setFreeMemoryMb(typeof d.free_memory_mb === "number" ? d.free_memory_mb : null);
      setScheduler(d.scheduler ?? { queued_operations: 0, active_model: null, loaded_models: [] });
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

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if ((event.ctrlKey || event.metaKey) && key === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      }
      if ((event.ctrlKey || event.metaKey) && key === "n" && !event.shiftKey) {
        event.preventDefault();
        void createNewSession();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

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
    setAgentHistory(data.agent_messages ?? []);
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
    if (activeSessionId === id) { setActiveSessionId(null); setMessages([]); setAgentHistory([]); }
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
              const assistantMsg: ChatMessage = { id: data.id, role: "assistant", content: accumulated, models: data.models };
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
    const intent = classifyIntent(content, Boolean(images?.length));

    const isVision  = (m: string) => ["llava", "moondream", "minicpm-v", "bakllava"].some((p) => m.toLowerCase().startsWith(p));
    const isCoder   = (m: string) => m.toLowerCase().includes("coder");
    const isGeneral = (m: string) => !isCoder(m) && !isVision(m);

    const tiny    = models.find((m) => isCoder(m) && m.includes("1.5b"));
    const mid     = models.find((m) => isCoder(m) && /:3b\b/i.test(m));
    const small   = models.find((m) => isCoder(m) && m.includes("7b"));
    const general = models.find((m) => isGeneral(m)); // qwen3:8b
    const llava   = models.find((m) => m.toLowerCase().startsWith("llava"));
    const dream   = models.find((m) => m.toLowerCase().startsWith("moondream"));
    const otherVision = models.filter((m) => isVision(m) && m !== llava && m !== dream);

    // The same fit lines the server uses: 3B near 3800 MB, moondream near 2800 MB, 7B near 6200 MB.
    const canFit = (candidate: string | undefined) => {
      if (!candidate) return false;
      if (freeMemoryMb === null) return /1\.5b/i.test(candidate);
      return freeMemoryMb >= estimateModelMb(candidate);
    };
    const firstFitting = (...candidates: (string | undefined)[]): string | null => candidates.find(canFit) ?? null;

    // Follow-ups such as "did you create it" are answered from the session log. Do not load a model for them.
    if (forAgent && refersToPriorAction(content)) return null;
    // "run dir" and "read package.json" are executed by the server.
    if (forAgent && directUserAction(content)) return null;

    // Documents, videos, and opening an installed app need a tool-capable coder. LLaVA is loaded only for the frames.
    if (forAgent && isLocalComputerTask(content)) {
      const computerModel = firstFitting(small, mid, general, tiny);
      return computerModel && computerModel !== activeModel ? computerModel : null;
    }

    // Images get a vision pass first. The agent route then hands the result to a coder.
    if (images && images.length > 0) {
      const fittingVision = firstFitting(llava, dream, ...otherVision);
      return fittingVision && fittingVision !== activeModel ? fittingVision : null;
    }

    // Very short conversational messages should never wake a multi-gigabyte model.
    const casualTask = wordCount <= 6 && !/\b(code|file|folder|project|bug|error|help|explain|why|how|create|edit|run)\b/.test(lower) && !personIsSteppingAway(content);
    if (forAgent && casualTask) {
      const casualModel = firstFitting(general, tiny, small);
      return casualModel && casualModel !== activeModel ? casualModel : null;
    }

    if (forAgent && (isSimpleAction(content, Boolean(images?.length)) || intent.needsWriteAccess)) {
      const simpleModel = firstFitting(small, mid, tiny);
      return simpleModel && simpleModel !== activeModel ? simpleModel : null;
    }

    const hasCodeKeyword = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create a file|script|compile|deploy|import|export|interface|type |enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/;
    const codeTask = hasCodeKeyword.test(lower) || /\b(create|edit|update|change|delete|remove|add|write|implement|run|test|debug)\b/.test(lower);
    const deepTask = intent.intent === "deep";

    // Deep tasks use a sequential planner and executor rather than loading 14B by default.
    if (deepTask) {
      // Deep work is planned by Qwen3 8B server-side, then executed by the 7B coder.
      // Keep 14B out of the default path because its load cost is disproportionate.
      const complexModel = firstFitting(small, mid, tiny);
      return complexModel && complexModel !== activeModel ? complexModel : null;
    }

    // Small edits can be handled quickly; normal coding uses the 7B coder.
    const minorEdit = /\b(rename|change the|replace|swap|update the|fix the|add a|remove the|delete the|move the|make it|set the|convert|just|only)\b/;
    if (codeTask && wordCount <= 20 && minorEdit.test(lower)) {
      const quickCodeModel = firstFitting(small, mid, tiny);
      return quickCodeModel && quickCodeModel !== activeModel ? quickCodeModel : null;
    }
    if (codeTask) {
      const codeModel = firstFitting(small, mid, tiny);
      return codeModel && codeModel !== activeModel ? codeModel : null;
    }

    // Short explanations and quick questions favor the general model.
    if (forAgent && (wordCount <= 16 || /\b(explain|what is|why|how does|summarize|compare|recommend|suggest)\b/.test(lower))) {
      const explanationModel = firstFitting(general, tiny, small);
      return explanationModel && explanationModel !== activeModel ? explanationModel : null;
    }

    return forAgent ? (firstFitting(general, mid, small, tiny) ?? null) : null;
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

  const panelButtons: { id: Panel; label: string }[] = [
    { id: "chat", label: "Chat" },
    { id: "split", label: "Split" },
    { id: "terminal", label: "Terminal" },
  ];
  const showChat = activePanel === "chat" || activePanel === "split";
  const showTerminal = activePanel === "terminal" || terminalDock;

  function freeRam() {
    void fetch("/api/unload", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) }).then(() => fetchModels(true));
  }

  return (
    <div className="fonia-shell">
      <div className="fonia-bg" aria-hidden="true">
        <OCore size={420} animation="full" uid="bg" />
      </div>
      <Sidebar
        sessions={sessions}
        activeId={activeSessionId}
        workspace={workspace}
        selectedFiles={selectedFilePaths}
        collapsed={sidebarCollapsed}
        freeMemoryMb={freeMemoryMb}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
        onSelect={(id) => { loadSession(id); setActivePanel("chat"); }}
        onNew={createNewSession}
        onDelete={deleteSession}
        onRename={renameSession}
        onOpenFolder={openFolder}
        onCloseFolder={closeFolder}
        onToggleFile={toggleFile}
      />

      <div className="fonia-stage">
        <div className="fonia-top">
          <button type="button" className="fonia-btn" onClick={() => setSidebarCollapsed((value) => !value)} title="Collapse sidebar">
            {sidebarCollapsed ? "Show" : "Hide"}
          </button>
          <div className="fonia-seg" role="tablist" aria-label="Workspace">
            {panelButtons.map((btn) => (
              <button
                key={btn.id}
                type="button"
                role="tab"
                aria-selected={activePanel === btn.id}
                className={activePanel === btn.id ? "is-active" : ""}
                onClick={() => setActivePanel(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
          <div className="fonia-pills">
            {activeModel && <span className="fonia-pill">{activeModel}</span>}
            <span className="fonia-pill">{freeMemoryMb == null ? "RAM —" : `RAM ${freeMemoryMb} MB`}</span>
            <span className="fonia-pill">{models.length} models</span>
            {scheduler.queued_operations > 0 && <span className="fonia-pill">{scheduler.queued_operations} running</span>}
            <button type="button" className="fonia-btn" onClick={() => setTerminalDock((value) => !value)}>
              {terminalDock ? "Hide TTY" : "TTY"}
            </button>
            <button type="button" className="fonia-btn" onClick={() => fetchModels(true)} title="Refresh model list">Refresh</button>
            <button type="button" className="fonia-btn" onClick={freeRam} title="Unload models from RAM">Free RAM</button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ display: showChat ? "flex" : "none", flex: 1, minHeight: 0 }}>
            <div style={{ display: "flex", flex: 1, minWidth: 0, minHeight: 0, flexDirection: "column" }}>
              <ChatWindow
                sessionId={activeSessionId}
                messages={messages}
                model={activeModel}
                models={models}
                streaming={streaming}
                streamingContent={streamingContent}
                initialAgentMessages={agentHistory}
                contextFiles={contextFiles}
                onSend={sendMessage}
                onResend={resendMessage}
                onRegenerate={regenerate}
                onModelChange={changeModel}
                pickModelForTask={(content, images) => pickBestModel(content, images, true)}
                onClearHistory={clearHistory}
                onSystemPromptChange={updateSystemPrompt}
                systemPrompt={systemPrompt}
                onRemoveContextFile={removeContextFile}
                onStopGeneration={stopGeneration}
                sessionTitle={sessions.find((item) => item.id === activeSessionId)?.title}
                onRenameSession={(title) => { if (activeSessionId) void renameSession(activeSessionId, title); }}
                workspacePath={workspace?.path}
                ollamaSource={ollamaSource}
              />
            </div>
            {activePanel === "split" && (
              <div style={{ width: "42%", minWidth: 280, borderLeft: "1px solid rgba(63, 63, 70, 0.6)", display: "flex", minHeight: 0 }}>
                <FileBrowser onInsertToChat={handleInsertToChat} />
              </div>
            )}
          </div>
          {showTerminal && (
            <div style={{ display: "flex", flex: activePanel === "terminal" ? 1 : "0 0 200px", minHeight: 0, borderTop: "1px solid rgba(63, 63, 70, 0.6)" }}>
              <TerminalPanel onInsertToChat={handleInsertToChat} />
            </div>
          )}
        </div>
      </div>
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        actions={[
          { id: "new", label: "New session", hint: "Ctrl+N", run: () => void createNewSession() },
          { id: "chat", label: "Chat", run: () => setActivePanel("chat") },
          { id: "split", label: "Split code view", run: () => setActivePanel("split") },
          { id: "terminal", label: "Terminal", run: () => setActivePanel("terminal") },
          { id: "tty", label: terminalDock ? "Hide live terminal" : "Show live terminal", run: () => setTerminalDock((value) => !value) },
          { id: "settings", label: "Settings", run: () => window.dispatchEvent(new Event("fonia-open-settings")) },
          { id: "ram", label: "Purge VRAM", hint: "Unload models", run: freeRam },
          ...models.map((name) => ({ id: `model:${name}`, label: `Switch model ${name}`, hint: name, run: () => void changeModel(name) })),
          ...sessions.slice(0, 12).map((session) => ({ id: `chat:${session.id}`, label: session.title || "Untitled chat", hint: session.model, run: () => { void loadSession(session.id); setActivePanel("chat"); } })),
        ]}
      />
    </div>
  );
}
