"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CAPABILITY_SECTORS, capabilityCount } from "@/lib/capabilityIndex";

type MicMode = "push" | "open" | "wake";

interface Settings {
  micMode: MicMode;
  understandFirst: boolean;
  askBeforeConsequential: boolean;
  holdGoal: boolean;
  lookAfterUiEdit: boolean;
  brainWhenRamFits: boolean;
  closeExtraApps: boolean;
  strongCoderOvernight: boolean;
  whisperFallback: boolean;
  showSteps: boolean;
  internetAccess: boolean;
  connectExternalTools: boolean;
  connectBlender: boolean;
  connectMetatrader: boolean;
  connectVm: boolean;
  connectCorel: boolean;
  connectAndroidStudio: boolean;
}

interface FoundConnection {
  id: string;
  label: string;
  found: boolean;
  path: string;
  note: string;
}

const EMPTY: Settings = {
  micMode: "push",
  understandFirst: true,
  askBeforeConsequential: true,
  holdGoal: true,
  lookAfterUiEdit: true,
  brainWhenRamFits: true,
  closeExtraApps: true,
  strongCoderOvernight: true,
  whisperFallback: true,
  showSteps: false,
  internetAccess: true,
  connectExternalTools: true,
  connectBlender: true,
  connectMetatrader: false,
  connectVm: false,
  connectCorel: false,
  connectAndroidStudio: false,
};

const TOGGLES: { key: keyof Settings; title: string; detail: string; group: string }[] = [
  {
    group: "Internet",
    key: "internetAccess",
    title: "Access the internet",
    detail: "Off fetches nothing. On still asks Allow this page or Stay offline before one public address.",
  },
  {
    group: "Connections",
    key: "connectExternalTools",
    title: "Allow external programs",
    detail: "Off refuses every launch, including Notepad. On lets Fonia start a program you name. Blender stays on by itself. MetaTrader 5, VirtualBox, CorelDRAW, and Android Studio stay off until you enable them.",
  },
  {
    group: "Connections",
    key: "connectBlender",
    title: "Blender",
    detail: "Fonia opens Blender, or asks Blender to build one shape with bpy and save a .blend file. It does not click inside the Blender window.",
  },
  {
    group: "Connections",
    key: "connectMetatrader",
    title: "MetaTrader 5",
    detail: "Fonia opens terminal64.exe when you ask. No trade is placed.",
  },
  {
    group: "Connections",
    key: "connectVm",
    title: "Virtual machine",
    detail: "Fonia opens VirtualBox when you ask. A guest machine is not powered on.",
  },
  {
    group: "Connections",
    key: "connectCorel",
    title: "CorelDRAW",
    detail: "Fonia opens CorelDRW.exe from the usual folder. If that file is missing, nothing is started.",
  },
  {
    group: "Connections",
    key: "connectAndroidStudio",
    title: "Android Studio",
    detail: "Fonia opens studio64.exe when you ask.",
  },
  {
    group: "Understanding",
    key: "understandFirst",
    title: "Match a muddy sentence with the small model",
    detail: "The 1.5B reads a sentence that could mean more than one thing, picks a mode, and unloads. It needs about 2200 MB free. A clear command, such as check the battery, skips it.",
  },
  {
    group: "Understanding",
    key: "askBeforeConsequential",
    title: "Ask before a big action",
    detail: "Overnight work, suspending the PC, and a match the small model is unsure about wait for a click. You can pick a similar action or type what you mean.",
  },
  {
    group: "Coding",
    key: "holdGoal",
    title: "Keep checking after a file change",
    detail: "The run stays open until the check passes, the work is blocked, or you press Stop.",
  },
  {
    group: "Coding",
    key: "lookAfterUiEdit",
    title: "Look at the page after a UI change",
    detail: "Opens the local app and asks a vision model when free RAM can hold it.",
  },
  {
    group: "Coding",
    key: "brainWhenRamFits",
    title: "Let the 8B plan when RAM fits",
    detail: "Only when at least 7200 MB is free. The 8B plans, unloads, and then the 7B edits. They are never loaded together.",
  },
  {
    group: "Away",
    key: "closeExtraApps",
    title: "Close extra apps for an overnight run",
    detail: "Up to four other heavy apps. The browser, the editor, Fonia, and Ollama stay open.",
  },
  {
    group: "Away",
    key: "strongCoderOvernight",
    title: "Use the strongest coder that fits",
    detail: "An overnight run uses the 7B when it fits. The 8B then the 7B only when RAM allows and the model is not locked.",
  },
  {
    group: "Voice",
    key: "whisperFallback",
    title: "Record the microphone if Windows speech fails",
    detail: "Uses the whisper model already in the Fonia folder. Off leaves the Windows recognizer result as it is.",
  },
  {
    group: "Chat",
    key: "showSteps",
    title: "Show each tool step open",
    detail: "Off keeps the steps as one line until you open them.",
  },
];

const SHORT: Record<string, string> = {
  internetAccess: "Internet",
  connectExternalTools: "External programs",
  connectBlender: "Blender",
  connectMetatrader: "MetaTrader",
  connectVm: "Virtual machine",
  connectCorel: "CorelDRAW",
  connectAndroidStudio: "Android Studio",
  understandFirst: "Match the sentence",
  askBeforeConsequential: "Ask first",
  holdGoal: "Keep checking",
  lookAfterUiEdit: "Look at the page",
  brainWhenRamFits: "Plan when RAM fits",
  closeExtraApps: "Close extra apps",
  strongCoderOvernight: "Strongest coder",
  whisperFallback: "Whisper backup",
  showSteps: "Show tool steps",
};

const ICONS: Record<string, string> = {
  internetAccess: "globe",
  connectExternalTools: "plug",
  connectBlender: "cube",
  connectMetatrader: "chart",
  connectVm: "monitor",
  connectCorel: "pen",
  connectAndroidStudio: "device",
  understandFirst: "spark",
  askBeforeConsequential: "shield",
  holdGoal: "check",
  lookAfterUiEdit: "eye",
  brainWhenRamFits: "layers",
  closeExtraApps: "apps",
  strongCoderOvernight: "cpu",
  whisperFallback: "mic",
  showSteps: "list",
};

function SetIcon({ name }: { name: string }) {
  const props = {
    className: "fonia-set-icon",
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "globe") return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.4 2.8 2.4 15.2 0 18M12 3c-2.4 2.8-2.4 15.2 0 18" /></svg>;
  if (name === "plug") return <svg {...props}><path d="M8 7V3M16 7V3M7 7h10v5a5 5 0 0 1-10 0V7zM12 17v4" /></svg>;
  if (name === "cube") return <svg {...props}><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5" /></svg>;
  if (name === "chart") return <svg {...props}><path d="M4 19V5M4 19h16M8 16v-4M12 16V8M16 16v-6" /></svg>;
  if (name === "monitor") return <svg {...props}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></svg>;
  if (name === "pen") return <svg {...props}><path d="M4 20l4.2-1.1L19 8.1 15.9 5 5.1 15.8 4 20z" /></svg>;
  if (name === "device") return <svg {...props}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></svg>;
  if (name === "spark") return <svg {...props}><path d="M12 3l1.6 5.2L19 10l-5.4 1.8L12 17l-1.6-5.2L5 10l5.4-1.8L12 3z" /></svg>;
  if (name === "shield") return <svg {...props}><path d="M12 3l7 3v6c0 4.2-2.8 7.2-7 9-4.2-1.8-7-4.8-7-9V6l7-3z" /></svg>;
  if (name === "check") return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9" /></svg>;
  if (name === "eye") return <svg {...props}><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></svg>;
  if (name === "layers") return <svg {...props}><path d="M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>;
  if (name === "apps") return <svg {...props}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
  if (name === "cpu") return <svg {...props}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>;
  if (name === "mic") return <svg {...props}><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M6 11a6 6 0 0 0 12 0M12 17v4" /></svg>;
  return <svg {...props}><path d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" /></svg>;
}

export default function FoniaSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<Settings>(EMPTY);
  const [found, setFound] = useState<FoundConnection[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    void fetch("/api/fonia/settings")
      .then((response) => response.json())
      .then((data: Partial<Settings>) => setSettings({ ...EMPTY, ...data, micMode: data.micMode === "open" || data.micMode === "wake" ? data.micMode : "push" }))
      .catch(() => setNote("Settings could not be read."));
    void fetch("/api/fonia/connections")
      .then((response) => response.json())
      .then((data: { connections?: FoundConnection[] }) => setFound(data.connections ?? []))
      .catch(() => setFound([]));
  }, []);

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("fonia-open-settings", show);
    return () => window.removeEventListener("fonia-open-settings", show);
  }, []);

  async function save(patch: Partial<Settings>) {
    const next = { ...settings, ...patch };
    setSettings(next);
    setNote("");
    const response = await fetch("/api/fonia/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (!response.ok) setNote("That switch was not saved.");
    else window.dispatchEvent(new Event("fonia-settings"));
  }

  let lastGroup = "";

  if (!open || typeof document === "undefined") return null;
  return createPortal(
        <div className="fonia-sheet-backdrop" onClick={() => setOpen(false)}>
          <div className="fonia-sheet" role="dialog" aria-label="Settings" onClick={(event) => event.stopPropagation()}>
            <div className="fonia-set-head">
              <span>Settings</span>
              <button type="button" className="fonia-btn" onClick={() => setOpen(false)}>Close</button>
            </div>
            {TOGGLES.map((item) => {
              const header = item.group !== lastGroup;
              lastGroup = item.group;
              const on = Boolean(settings[item.key]);
              const installed = found.find((entry) => item.title === entry.label || (item.key === "connectVm" && entry.id === "vm"));
              const label = SHORT[item.key] ?? item.title;
              return (
                <div key={item.key}>
                  {header && <div className="fonia-kicker fonia-set-kicker">{item.group}</div>}
                  <div className="fonia-set-row" title={item.detail}>
                    <SetIcon name={ICONS[item.key] ?? "list"} />
                    <span className="fonia-set-label">{label}</span>
                    {installed && (
                      <span className="fonia-set-pill" title={installed.path || installed.note}>
                        {installed.found ? "Installed" : "Missing"}
                      </span>
                    )}
                    <button
                      type="button"
                      className="fonia-switch"
                      role="switch"
                      aria-checked={on}
                      aria-label={item.title}
                      onClick={() => void save({ [item.key]: !on })}
                    >
                      <span />
                    </button>
                  </div>
                </div>
              );
            })}
            <div className="fonia-set-row" title="Press Listen keeps the microphone off until you click it.">
              <SetIcon name="mic" />
              <span className="fonia-set-label">Microphone</span>
              <select
                aria-label="Microphone"
                className="fonia-set-select"
                value={settings.micMode}
                onChange={(event) => void save({ micMode: event.target.value as MicMode })}
              >
                <option value="push">Press Listen</option>
                <option value="open">Leave on</option>
                <option value="wake">Wake word</option>
              </select>
            </div>
            <details className="fonia-sector">
              <summary>Capabilities · {capabilityCount()}</summary>
              {CAPABILITY_SECTORS.map((sector) => (
                <details key={sector.id} className="fonia-sector">
                  <summary>{sector.title} · {sector.rows.length}</summary>
                  {sector.rows.map((row) => (
                    <div key={row.name} className="fonia-set-cap" title={row.detail}>{row.name}</div>
                  ))}
                </details>
              ))}
            </details>
            <details className="fonia-sector">
              <summary>Memory</summary>
              <p>
                This screen is the Next.js app in a browser tab. Electron would add another browser. next start drops the dev compiler. A switch here cannot stop the server that is showing this page.
              </p>
            </details>
            {note && <p>{note}</p>}
          </div>
        </div>,
    document.body
  );
}
