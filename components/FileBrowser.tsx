"use client";

import { useState, useEffect } from "react";

interface FileItem {
  name: string;
  path: string;
  isDir: boolean;
  size: number | null;
  ext: string | null;
}

interface DirListing {
  path: string;
  parent: string | null;
  items: FileItem[];
}

interface Props {
  onInsertToChat: (text: string) => void;
}

const TEXT_EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".mdx", ".txt",
  ".css", ".scss", ".html", ".xml", ".yaml", ".yml", ".toml",
  ".py", ".rs", ".go", ".java", ".c", ".cpp", ".h", ".sh",
  ".bat", ".ps1", ".sql", ".prisma", ".graphql",
]);

function fileIcon(item: FileItem) {
  if (item.isDir) return "📁";
  const ext = item.ext ?? "";
  if ([".ts", ".tsx"].includes(ext)) return "🟦";
  if ([".js", ".jsx"].includes(ext)) return "🟨";
  if ([".py"].includes(ext)) return "🐍";
  if ([".json"].includes(ext)) return "📋";
  if ([".md", ".mdx"].includes(ext)) return "📝";
  if ([".css", ".scss"].includes(ext)) return "🎨";
  if ([".html"].includes(ext)) return "🌐";
  if ([".sh", ".bat", ".ps1"].includes(ext)) return "⚙️";
  if ([".sql"].includes(ext)) return "🗄️";
  return "📄";
}

function formatSize(bytes: number | null) {
  if (bytes === null) return "";
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

export default function FileBrowser({ onInsertToChat }: Props) {
  const [listing, setListing] = useState<DirListing | null>(null);
  const [currentPath, setCurrentPath] = useState("C:\\Users\\PC");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<{ path: string; content: string } | null>(null);
  const [pathInput, setPathInput] = useState("C:\\Users\\PC");

  async function browse(p: string) {
    setLoading(true);
    setError(null);
    setFileContent(null);
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(p)}&action=list`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to list directory");
      setListing(data);
      setCurrentPath(data.path);
      setPathInput(data.path);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  async function readFile(p: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/files?path=${encodeURIComponent(p)}&action=read`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to read file");
      setFileContent({ path: data.path, content: data.content });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    browse(currentPath);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleItemClick(item: FileItem) {
    if (item.isDir) {
      browse(item.path);
    } else if (item.ext && TEXT_EXTS.has(item.ext)) {
      readFile(item.path);
    } else {
      setError("Binary file — cannot preview.");
    }
  }

  function handleInsert() {
    if (!fileContent) return;
    const lang = fileContent.path.split(".").pop() ?? "";
    const text = `File: \`${fileContent.path}\`\n\`\`\`${lang}\n${fileContent.content}\n\`\`\``;
    onInsertToChat(text);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg-panel)",
        overflow: "hidden",
      }}
    >
      {/* Path bar */}
      <div
        style={{
          padding: "8px 10px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          gap: 6,
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <input
          value={pathInput}
          onChange={(e) => setPathInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") browse(pathInput); }}
          style={{
            flex: 1,
            background: "var(--bg-input)",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            borderRadius: 5,
            padding: "4px 8px",
            fontSize: 11,
            outline: "none",
            fontFamily: "ui-monospace, monospace",
          }}
        />
        <button
          onClick={() => browse(pathInput)}
          style={{
            background: "var(--bg-active)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            borderRadius: 5,
            padding: "4px 8px",
            cursor: "pointer",
            fontSize: 11,
          }}
        >
          Go
        </button>
        {listing?.parent && (
          <button
            onClick={() => browse(listing.parent!)}
            title="Go up"
            style={{
              background: "var(--bg-active)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              borderRadius: 5,
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 11,
            }}
          >
            ↑
          </button>
        )}
      </div>

      {error && (
        <div
          style={{
            padding: "6px 10px",
            background: "#2a1010",
            color: "var(--danger)",
            fontSize: 11,
            borderBottom: "1px solid var(--border)",
            flexShrink: 0,
          }}
        >
          {error}
        </div>
      )}

      {loading && (
        <div style={{ padding: "10px", color: "var(--text-muted)", fontSize: 12, textAlign: "center" }}>
          Loading...
        </div>
      )}

      {/* File viewer */}
      {fileContent ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div
            style={{
              padding: "6px 10px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setFileContent(null)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              ← Back
            </button>
            <span
              style={{
                flex: 1,
                fontSize: 11,
                color: "var(--text-muted)",
                fontFamily: "monospace",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {fileContent.path}
            </span>
            <button
              onClick={handleInsert}
              style={{
                background: "var(--accent)",
                border: "none",
                color: "#fff",
                borderRadius: 5,
                padding: "3px 10px",
                cursor: "pointer",
                fontSize: 11,
              }}
            >
              Insert to Chat
            </button>
          </div>
          <pre
            style={{
              flex: 1,
              margin: 0,
              padding: "10px",
              background: "#1a1d26",
              color: "var(--text-primary)",
              fontSize: 11,
              overflowY: "auto",
              border: "none",
              borderRadius: 0,
              fontFamily: "ui-monospace, monospace",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all",
            }}
          >
            {fileContent.content}
          </pre>
        </div>
      ) : (
        /* Directory listing */
        <div style={{ flex: 1, overflowY: "auto", padding: "4px 6px" }}>
          {listing?.items.map((item) => (
            <div
              key={item.path}
              onClick={() => handleItemClick(item)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 8px",
                borderRadius: 5,
                cursor: "pointer",
                marginBottom: 1,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "var(--bg-hover)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "transparent")
              }
            >
              <span style={{ fontSize: 13, flexShrink: 0 }}>{fileIcon(item)}</span>
              <span
                style={{
                  flex: 1,
                  fontSize: 12,
                  color: item.isDir ? "var(--text-primary)" : "var(--text-secondary)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </span>
              {item.size !== null && (
                <span style={{ fontSize: 10, color: "var(--text-muted)", flexShrink: 0 }}>
                  {formatSize(item.size)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
