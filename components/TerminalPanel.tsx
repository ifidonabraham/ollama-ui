"use client";

import { useEffect, useRef, useState } from "react";

interface HistoryEntry {
  cwd: string;
  command: string;
  stdout: string;
  stderr: string;
  error?: boolean;
}

interface Props {
  onInsertToChat: (text: string) => void;
}

export default function TerminalPanel({ onInsertToChat }: Props) {
  const [cwd, setCwd] = useState("C:\\Users\\PC");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [cmdHistoryIdx, setCmdHistoryIdx] = useState(-1);
  const [running, setRunning] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  async function run(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Handle cd locally (just update state for display; real cd handled server side)
    setCmdHistory((prev) => [trimmed, ...prev.slice(0, 99)]);
    setCmdHistoryIdx(-1);
    setRunning(true);

    try {
      const res = await fetch("/api/terminal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: trimmed, cwd }),
      });
      const data = await res.json();

      if (!res.ok) {
        setHistory((prev) => [
          ...prev,
          { cwd, command: trimmed, stdout: "", stderr: data.error ?? "Request failed", error: true },
        ]);
        return;
      }

      // If it was a cd command, try to extract new cwd from stdout or just assume
      if (/^cd\s+/i.test(trimmed)) {
        // Run a pwd equivalent to get new cwd
        const cdRes = await fetch("/api/terminal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ command: "(Get-Location).Path", cwd }),
        });
        const cdData = await cdRes.json();
        if (cdData.stdout?.trim()) setCwd(cdData.stdout.trim());
      }

      setHistory((prev) => [
        ...prev,
        {
          cwd,
          command: trimmed,
          stdout: data.stdout ?? "",
          stderr: data.stderr ?? "",
          error: data.error,
        },
      ]);
    } catch {
      setHistory((prev) => [
        ...prev,
        { cwd, command: trimmed, stdout: "", stderr: "Network error", error: true },
      ]);
    } finally {
      setRunning(false);
      setInput("");
      inputRef.current?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
      setCmdHistoryIdx(newIdx);
      setInput(cmdHistory[newIdx] ?? "");
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIdx = Math.max(cmdHistoryIdx - 1, -1);
      setCmdHistoryIdx(newIdx);
      setInput(newIdx === -1 ? "" : cmdHistory[newIdx] ?? "");
    }
  }

  function insertLast() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    const text = `\`\`\`\n$ ${last.command}\n${last.stdout}${last.stderr ? "\n" + last.stderr : ""}\n\`\`\``;
    onInsertToChat(text);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "#0d0f12",
        overflow: "hidden",
        fontFamily: "ui-monospace, 'Cascadia Code', monospace",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Toolbar */}
      <div
        style={{
          padding: "6px 10px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexShrink: 0,
          background: "var(--bg-panel)",
        }}
      >
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>📟 Terminal (PowerShell)</span>
        <div style={{ flex: 1 }} />
        <button
          onClick={insertLast}
          disabled={history.length === 0}
          title="Insert last output to chat"
          style={{
            background: "var(--bg-active)",
            border: "1px solid var(--border)",
            color: history.length === 0 ? "var(--text-muted)" : "var(--text-secondary)",
            borderRadius: 5,
            padding: "3px 8px",
            cursor: history.length === 0 ? "not-allowed" : "pointer",
            fontSize: 11,
          }}
        >
          Insert to Chat
        </button>
        <button
          onClick={() => setHistory([])}
          title="Clear terminal"
          style={{
            background: "var(--bg-active)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            borderRadius: 5,
            padding: "3px 8px",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          Clear
        </button>
      </div>

      {/* Output */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 12px",
          fontSize: 12,
          lineHeight: 1.6,
        }}
      >
        <div style={{ color: "var(--text-muted)", marginBottom: 8, fontSize: 11 }}>
          PowerShell terminal — runs commands on your local machine
        </div>

        {history.map((entry, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            {/* Prompt line */}
            <div style={{ color: "var(--success)" }}>
              <span style={{ color: "var(--accent)" }}>{entry.cwd}</span>
              <span style={{ color: "var(--text-muted)" }}> &gt; </span>
              <span style={{ color: "#e8eaf0" }}>{entry.command}</span>
            </div>
            {/* stdout */}
            {entry.stdout && (
              <pre
                style={{
                  margin: "2px 0",
                  color: "var(--text-primary)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  fontSize: 12,
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                {entry.stdout}
              </pre>
            )}
            {/* stderr */}
            {entry.stderr && (
              <pre
                style={{
                  margin: "2px 0",
                  color: entry.error ? "var(--danger)" : "var(--warning)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-all",
                  fontSize: 12,
                  background: "none",
                  border: "none",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                {entry.stderr}
              </pre>
            )}
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "8px 12px",
          display: "flex",
          alignItems: "center",
          gap: 6,
          flexShrink: 0,
        }}
      >
        <span style={{ color: "var(--accent)", fontSize: 12, flexShrink: 0 }}>{cwd}</span>
        <span style={{ color: "var(--text-muted)", fontSize: 12, flexShrink: 0 }}>&gt;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); setCmdHistoryIdx(-1); }}
          onKeyDown={handleKeyDown}
          disabled={running}
          placeholder={running ? "Running..." : "Enter command..."}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            color: "var(--text-primary)",
            fontSize: 12,
            outline: "none",
            fontFamily: "ui-monospace, monospace",
          }}
        />
        {running && (
          <span style={{ color: "var(--text-muted)", fontSize: 11 }}>⏳</span>
        )}
      </div>
    </div>
  );
}
