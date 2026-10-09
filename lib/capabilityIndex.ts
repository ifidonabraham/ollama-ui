/** Real backend sectors. These rows are what Settings shows. A row with a switch is saved. The others are already implemented and stay available. */

export interface CapabilityRow {
  name: string;
  detail: string;
}

export interface CapabilitySector {
  id: string;
  title: string;
  rows: CapabilityRow[];
}

export const CAPABILITY_SECTORS: CapabilitySector[] = [
  {
    id: "files",
    title: "Files",
    rows: [
      { name: "Read a file", detail: "read_file returns the bytes on disk. A missing path is an error, not a guess." },
      { name: "Write a file", detail: "write_file saves the new text, then the chat shows the diff." },
      { name: "Patch a file", detail: "patch_file replaces one exact passage and shows the diff." },
      { name: "List a folder", detail: "list_dir reads one directory. It does not walk the whole disk." },
      { name: "Search in files", detail: "search_in_files looks through the open project." },
      { name: "Delete a file", detail: "delete_file removes one named file. A recursive wipe of C: is refused." },
    ],
  },
  {
    id: "terminal",
    title: "Terminal",
    rows: [
      { name: "Run a command", detail: "run_command uses PowerShell in the project folder. A command that prints nothing for 30 seconds is stopped, and the result says to try a different command. A command that keeps printing can run for up to 3 minutes. Shutdown, format, and a recursive delete of C: are refused." },
      { name: "Live terminal", detail: "The Terminal panel runs a command on this PC and shows stdout and stderr. It stops after 15 seconds." },
      { name: "Steer a run", detail: "Ctrl+Enter adds a note to the open run. Enter queues the next message." },
      { name: "Hold the goal", detail: "After a code write, the same model keeps the check until it passes, blocks, or you press Stop." },
    ],
  },
  {
    id: "documents",
    title: "Documents and video",
    rows: [
      { name: "Text and Markdown", detail: "txt and md are read on the server before a model sees them." },
      { name: "PDF", detail: "A text layer is extracted. A scan with no words uses Windows OCR." },
      { name: "Word", detail: "docx text is read from the office file." },
      { name: "PowerPoint", detail: "pptx slide text is read from the office file." },
      { name: "Windows OCR", detail: "A scanned page or image is read with the Windows language pack. No extra OCR program is installed." },
      { name: "Video frames", detail: "ffmpeg splits the clip first. A vision model describes at most four frames, then unloads." },
    ],
  },
  {
    id: "web",
    title: "Internet",
    rows: [
      { name: "Internet access", detail: "Off means no page is fetched. On still asks Allow this page or Stay offline for each public address." },
      { name: "Public page", detail: "web_fetch reads one http or https page after the connection check. Local and private addresses are refused." },
    ],
  },
  {
    id: "models",
    title: "Models and memory",
    rows: [
      { name: "One heavy model", detail: "The 8B and the 7B are never loaded together. The 14B stays out of automatic selection." },
      { name: "Small context model", detail: "The 1.5B matches a muddy sentence to a mode and unloads. It does not plan a file write." },
      { name: "Vision", detail: "A picture goes only to LLaVA or Moondream. A text coder never receives the image." },
      { name: "8B plan", detail: "When at least 7200 MB is free, the 8B can plan and the 7B can edit." },
      { name: "Free RAM", detail: "Unload drops the model from memory. It does not stop the page you are looking at." },
      { name: "Session reports", detail: "A question about the last battery or the last report uses this chat. A fresh check reads the PC again." },
    ],
  },
  {
    id: "voice",
    title: "Voice",
    rows: [
      { name: "Press Listen", detail: "The microphone stays off until you click Listen." },
      { name: "Microphone off", detail: "Turn the microphone off mutes it and blocks apps in this Windows account. It does not remove the device. Generic failure means Windows refused a hardware switch and the microphone was left as it was." },
      { name: "Wake word", detail: "The saved mode can be the word Fonia. Changing it is the Microphone menu, not a background install." },
      { name: "Whisper fallback", detail: "If Windows speech fails, ffmpeg records and the local whisper model transcribes." },
      { name: "Speak", detail: "speak uses the Windows voice when you ask it to say something." },
    ],
  },
  {
    id: "pc-status",
    title: "PC status",
    rows: [
      { name: "Battery", detail: "battery_status reads charge and power source." },
      { name: "Disk", detail: "disk_space reads the drives. It does not format them." },
      { name: "Memory", detail: "memory_status reads RAM." },
      { name: "CPU", detail: "cpu_status reads the processor." },
      { name: "GPU", detail: "gpu_status reads the display adapter." },
      { name: "Display", detail: "display_status reads the screen. The display device is never disabled." },
      { name: "Audio", detail: "audio_status reads the sound devices." },
      { name: "Volume", detail: "Volume can be read, set to a number, muted, or unmuted." },
      { name: "Wi-Fi and network", detail: "wifi_status and network_status read the adapters." },
      { name: "Bluetooth", detail: "Bluetooth can be read, and a change can still need an Administrator terminal." },
      { name: "Firewall", detail: "Firewall profiles can be read or switched. A change can need an Administrator terminal." },
      { name: "Printers and cameras", detail: "printers_status and camera_status list the devices." },
      { name: "Power plan", detail: "power_status reads the active plan." },
      { name: "Startup and programs", detail: "startup_status and programs_status list what is installed or set to start." },
      { name: "Full PC status", detail: "components_status is the one-pass report: OS, CPU, memory, battery, GPU, disks, audio, network, Bluetooth, printers, cameras, and the power plan." },
      { name: "Process and service", detail: "A named process or service can be checked. Protected names such as lsass and svchost are refused." },
    ],
  },
  {
    id: "pc-change",
    title: "PC changes",
    rows: [
      { name: "Brightness", detail: "Read, step, or set the level. The screen is not dimmed just because RAM is low." },
      { name: "Dark mode", detail: "Read or switch apps and system theme." },
      { name: "Default apps", detail: "http, https, mailto, and pdf can be read. Changing them opens Settings. Fonia does not write the Windows hash." },
      { name: "Windows Update", detail: "History can be read. Scan and install exist and are not run unless you ask." },
      { name: "Clipboard", detail: "A local model sees the clipboard text, including a password. An online host would get secrets hidden." },
      { name: "Type and click", detail: "ui_type and ui_click use one named window. The lock screen and a sign-in window are refused." },
      { name: "Screenshot", detail: "One screen frame is saved when you ask." },
      { name: "Eject a flash drive", detail: "Only a removable disk. C: is refused." },
      { name: "Sleep, restart, shutdown", detail: "These run only from the named command or a click. There is no switch that turns the safety check off." },
    ],
  },
  {
    id: "connections",
    title: "App connections",
    rows: [
      { name: "External tools", detail: "Off refuses every program launch, including Notepad. On allows a launch. Blender, MetaTrader 5, the virtual machine, CorelDRAW, and Android Studio also have their own switches." },
      { name: "Blender", detail: "On lets Fonia open Blender, and lets Blender build one named shape with bpy into a .blend file. Fonia does not click inside the Blender window." },
      { name: "MetaTrader 5", detail: "On opens terminal64.exe when you ask. No trade is placed." },
      { name: "Virtual machine", detail: "On opens VirtualBox when it is installed. A guest machine is not powered on." },
      { name: "CorelDRAW", detail: "On opens CorelDRW.exe from the usual folder. The X7 suite folder can be present while that program file is missing." },
      { name: "Android Studio", detail: "On opens studio64.exe when you ask." },
    ],
  },
  {
    id: "away",
    title: "Away",
    rows: [
      { name: "Ask before a big action", detail: "A sentence about leaving asks what should happen. Put the computer to sleep still suspends." },
      { name: "Close extra apps", detail: "An overnight run may close up to four heavy apps. The browser, editor, Fonia, and Ollama stay." },
      { name: "Strong coder overnight", detail: "The overnight run uses the strongest coder that fits. The 14B is not chosen automatically." },
    ],
  },
];

export function capabilityCount(): number {
  return CAPABILITY_SECTORS.reduce((sum, sector) => sum + sector.rows.length, 0);
}
