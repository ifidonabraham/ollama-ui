"use client";

import { useState } from "react";
import FolderTree, { FileNode } from "./FolderTree";

export interface SessionMeta {
  id: string;
  title: string;
  model: string;
  updated_at: number;
}

export interface WorkspaceContext {
  path: string;
  name: string;
  tree: FileNode[];
}

interface Props {
  sessions: SessionMeta[];
  activeId: string | null;
  workspace: WorkspaceContext | null;
  selectedFiles: Set<string>;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onOpenFolder: (path: string) => void;
  onCloseFolder: () => void;
  onToggleFile: (path: string, type: "file" | "dir", node: FileNode) => void;
}

const SECTION_HEADER_STYLE: React.CSSProperties = {
  padding: "8px 12px 4px",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "var(--text-muted)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function Sidebar({
  sessions,
  activeId,
  workspace,
  selectedFiles,
  onSelect,
  onNew,
  onDelete,
  onRename,
  onOpenFolder,
  onCloseFolder,
  onToggleFile,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [folderInput, setFolderInput] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [projectExpanded, setProjectExpanded] = useState(true);
  const [chatsExpanded, setChatsExpanded] = useState(true);

  function startEdit(s: SessionMeta) {
    setEditingId(s.id);
    setEditValue(s.title);
  }

  function commitEdit(id: string) {
    if (editValue.trim()) onRename(id, editValue.trim());
    setEditingId(null);
  }

  function handleOpenFolder() {
    if (folderInput.trim()) {
      onOpenFolder(folderInput.trim());
      setShowFolderInput(false);
      setFolderInput("");
    }
  }

  return (
    <aside
      style={{
        width: 248,
        minWidth: 248,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-panel)",
        borderRight: "1px solid var(--border)",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* App header */}
      <div
        style={{
          padding: "12px 14px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 17 }}>🦙</span>
          <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
            Ollama UI
          </span>
        </div>
        <button
          onClick={onNew}
          title="New chat"
          style={{
            background: "var(--accent)",
            border: "none",
            color: "#fff",
            borderRadius: 6,
            width: 26,
            height: 26,
            cursor: "pointer",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          +
        </button>
      </div>

      {/* ── PROJECT SECTION ────────────────────────────────── */}
      <div style={{ flexShrink: 0 }}>
        <div style={SECTION_HEADER_STYLE}>
          <button
            onClick={() => setProjectExpanded((v) => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0 }}
          >
            <span style={{ fontSize: 8 }}>{projectExpanded ? "▼" : "▶"}</span>
            Project
          </button>
          <button
            onClick={() => setShowFolderInput((v) => !v)}
            title="Open folder"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              fontSize: 14,
              padding: "0 2px",
            }}
          >
            📂
          </button>
        </div>

        {showFolderInput && (
          <div style={{ padding: "4px 10px 8px", display: "flex", gap: 6 }}>
            <input
              autoFocus
              value={folderInput}
              onChange={(e) => setFolderInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleOpenFolder(); if (e.key === "Escape") setShowFolderInput(false); }}
              placeholder="C:\Users\PC\my-project"
              style={{
                flex: 1,
                background: "var(--bg-input)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                borderRadius: 5,
                padding: "4px 7px",
                fontSize: 11,
                outline: "none",
                fontFamily: "ui-monospace, monospace",
              }}
            />
            <button
              onClick={handleOpenFolder}
              style={{
                background: "var(--accent)",
                border: "none",
                color: "#fff",
                borderRadius: 5,
                padding: "4px 8px",
                cursor: "pointer",
                fontSize: 11,
                flexShrink: 0,
              }}
            >
              Open
            </button>
          </div>
        )}
      </div>

      {/* Project tree */}
      {projectExpanded && (
        <div
          style={{
            flex: workspace ? "0 0 auto" : "0 0 0px",
            maxHeight: workspace ? "45%" : 0,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            borderBottom: workspace ? "1px solid var(--border)" : "none",
          }}
        >
          {workspace ? (
            <>
              {/* Workspace header */}
              <div
                style={{
                  padding: "4px 10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 12 }}>📁</span>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {workspace.name}
                </span>
                {selectedFiles.size > 0 && (
                  <span style={{ fontSize: 10, background: "var(--accent-dim)", color: "var(--accent)", borderRadius: 10, padding: "1px 6px", flexShrink: 0 }}>
                    {selectedFiles.size} files
                  </span>
                )}
                <button
                  onClick={onCloseFolder}
                  title="Close folder"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 13, padding: "0 2px" }}
                >
                  ✕
                </button>
              </div>
              <FolderTree
                tree={workspace.tree}
                selectedPaths={selectedFiles}
                onToggle={onToggleFile}
              />
            </>
          ) : (
            <div
              style={{
                padding: "8px 12px",
                color: "var(--text-muted)",
                fontSize: 12,
                textAlign: "center",
              }}
            >
              <span>No folder open</span>
              <br />
              <span style={{ fontSize: 11 }}>Click 📂 to open a project</span>
            </div>
          )}
        </div>
      )}

      {/* ── CHATS SECTION ──────────────────────────────────── */}
      <div style={SECTION_HEADER_STYLE}>
        <button
          onClick={() => setChatsExpanded((v) => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: 0 }}
        >
          <span style={{ fontSize: 8 }}>{chatsExpanded ? "▼" : "▶"}</span>
          Chats
        </button>
        <span style={{ color: "var(--text-muted)", fontSize: 10 }}>{sessions.length}</span>
      </div>

      {/* Chat sessions list */}
      {chatsExpanded && (
        <div style={{ flex: 1, overflowY: "auto", padding: "2px 6px 8px" }}>
          {sessions.length === 0 && (
            <p style={{ color: "var(--text-muted)", textAlign: "center", marginTop: 16, fontSize: 11 }}>
              No chats yet — click + to start
            </p>
          )}
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                padding: "6px 9px",
                borderRadius: 6,
                cursor: "pointer",
                marginBottom: 1,
                background: activeId === s.id ? "var(--bg-active)" : "transparent",
                border: `1px solid ${activeId === s.id ? "var(--border)" : "transparent"}`,
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
              onMouseEnter={(e) => {
                if (activeId !== s.id) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
              }}
              onMouseLeave={(e) => {
                if (activeId !== s.id) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              {/* Chat icon */}
              <span style={{ fontSize: 12, flexShrink: 0, color: activeId === s.id ? "var(--accent)" : "var(--text-muted)" }}>
                ◉
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                {editingId === s.id ? (
                  <input
                    autoFocus
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => commitEdit(s.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") commitEdit(s.id);
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      background: "var(--bg-input)",
                      border: "1px solid var(--accent)",
                      borderRadius: 4,
                      color: "var(--text-primary)",
                      fontSize: 12,
                      padding: "2px 6px",
                      width: "100%",
                      outline: "none",
                    }}
                  />
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: activeId === s.id ? "var(--text-primary)" : "var(--text-secondary)",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.title}
                    </div>
                    <div style={{ fontSize: 10, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {s.model.split(":")[0]}
                    </div>
                  </>
                )}
              </div>

              {activeId === s.id && editingId !== s.id && (
                <div style={{ display: "flex", gap: 1, flexShrink: 0 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); startEdit(s); }}
                    title="Rename"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 11, padding: "2px 3px", borderRadius: 3 }}
                  >
                    ✏
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); if (confirm("Delete this chat?")) onDelete(s.id); }}
                    title="Delete"
                    style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)", fontSize: 11, padding: "2px 3px", borderRadius: 3 }}
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
