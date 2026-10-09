"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface PaletteAction {
  id: string;
  label: string;
  hint?: string;
  run: () => void;
}

export default function CommandPalette({
  open,
  onClose,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  actions: PaletteAction[];
}) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return actions;
    return actions.filter((action) => `${action.label} ${action.hint ?? ""}`.toLowerCase().includes(needle));
  }, [actions, query]);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setCursor(0);
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  if (!open) return null;

  function choose(action: PaletteAction | undefined) {
    if (!action) return;
    onClose();
    action.run();
  }

  return (
    <div className="fonia-palette-backdrop" onClick={onClose}>
      <div className="fonia-palette" role="dialog" aria-label="Command palette" onClick={(event) => event.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          aria-label="Command"
          placeholder="Jump to a chat view, model, or action"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape") onClose();
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setCursor((value) => Math.min(matches.length - 1, value + 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setCursor((value) => Math.max(0, value - 1));
            }
            if (event.key === "Enter") {
              event.preventDefault();
              choose(matches[cursor]);
            }
          }}
        />
        <div className="fonia-palette-list">
          {matches.length === 0 && <p className="fonia-muted">Nothing matches.</p>}
          {matches.map((action, index) => (
            <button
              key={action.id}
              type="button"
              className={index === cursor ? "fonia-palette-item is-active" : "fonia-palette-item"}
              onMouseEnter={() => setCursor(index)}
              onClick={() => choose(action)}
            >
              <span>{action.label}</span>
              {action.hint && <span className="fonia-mono">{action.hint}</span>}
            </button>
          ))}
        </div>
        <p className="fonia-hint">Enter runs the row. Esc closes. Ctrl+K opens this again.</p>
      </div>
    </div>
  );
}
