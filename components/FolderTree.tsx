"use client";

import { useState } from "react";

export interface FileNode {
  name: string;
  path: string;
  type: "file" | "dir";
  ext?: string;
  children?: FileNode[];
}

interface Props {
  tree: FileNode[];
  selectedPaths: Set<string>;
  onToggle: (path: string, type: "file" | "dir", node: FileNode) => void;
}

function fileIcon(node: FileNode) {
  if (node.type === "dir") return "📁";
  const ext = node.ext ?? "";
  if ([".ts", ".tsx"].includes(ext)) return "𝙏";
  if ([".js", ".jsx"].includes(ext)) return "𝙅";
  if ([".py"].includes(ext)) return "𝙋";
  if ([".json"].includes(ext)) return "{}";
  if ([".md", ".mdx"].includes(ext)) return "𝙈";
  if ([".css", ".scss"].includes(ext)) return "𝘾";
  if ([".html"].includes(ext)) return "𝙃";
  if ([".sh", ".bat", ".ps1"].includes(ext)) return "⚡";
  if ([".sql"].includes(ext)) return "𝘿";
  if ([".go"].includes(ext)) return "𝙂";
  if ([".rs"].includes(ext)) return "𝙍";
  return "𝙁";
}

function TreeNode({
  node,
  depth,
  selectedPaths,
  onToggle,
}: {
  node: FileNode;
  depth: number;
  selectedPaths: Set<string>;
  onToggle: Props["onToggle"];
}) {
  const [open, setOpen] = useState(depth < 1);
  const selected = selectedPaths.has(node.path);

  const handleClick = () => {
    if (node.type === "dir") {
      setOpen((v) => !v);
    } else {
      onToggle(node.path, node.type, node);
    }
  };

  const handleCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(node.path, node.type, node);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          padding: "2px 6px 2px " + (8 + depth * 14) + "px",
          cursor: "pointer",
          borderRadius: 4,
          background: selected ? "var(--accent-dim)" : "transparent",
          color: selected ? "var(--accent)" : node.type === "dir" ? "var(--text-primary)" : "var(--text-secondary)",
          fontSize: 12,
          userSelect: "none",
        }}
        onMouseEnter={(e) => {
          if (!selected) (e.currentTarget as HTMLElement).style.background = "var(--bg-hover)";
        }}
        onMouseLeave={(e) => {
          if (!selected) (e.currentTarget as HTMLElement).style.background = "transparent";
        }}
      >
        {/* Expand arrow for dirs */}
        {node.type === "dir" && (
          <span style={{ width: 10, fontSize: 9, color: "var(--text-muted)", flexShrink: 0 }}>
            {open ? "▼" : "▶"}
          </span>
        )}
        {node.type === "file" && (
          <span style={{ width: 10, flexShrink: 0 }} />
        )}

        {/* Icon */}
        <span style={{ fontSize: 11, flexShrink: 0, fontFamily: "ui-monospace, monospace", width: 14 }}>
          {fileIcon(node)}
        </span>

        {/* Name */}
        <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {node.name}
        </span>

        {/* Checkbox for files — add to context */}
        {node.type === "file" && (
          <span
            onClick={handleCheck}
            title={selected ? "Remove from context" : "Add to context"}
            style={{
              fontSize: 10,
              color: selected ? "var(--accent)" : "var(--text-muted)",
              padding: "0 2px",
              flexShrink: 0,
              fontWeight: 700,
            }}
          >
            {selected ? "✓" : "+"}
          </span>
        )}
      </div>

      {node.type === "dir" && open && node.children && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.path}
              node={child}
              depth={depth + 1}
              selectedPaths={selectedPaths}
              onToggle={onToggle}
            />
          ))}
          {node.children.length === 0 && (
            <div style={{ paddingLeft: 8 + (depth + 1) * 14, fontSize: 11, color: "var(--text-muted)", padding: "2px 6px 2px " + (8 + (depth + 1) * 14) + "px" }}>
              empty
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function FolderTree({ tree, selectedPaths, onToggle }: Props) {
  if (tree.length === 0) {
    return (
      <div style={{ padding: "12px 8px", color: "var(--text-muted)", fontSize: 12, textAlign: "center" }}>
        Empty folder
      </div>
    );
  }

  return (
    <div style={{ overflowY: "auto", flex: 1 }}>
      {tree.map((node) => (
        <TreeNode
          key={node.path}
          node={node}
          depth={0}
          selectedPaths={selectedPaths}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}
