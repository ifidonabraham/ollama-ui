# Fonia system

This file describes the whole local app: what it can do, how a sentence becomes an action, and what was proven on this PC. `PLATFORM.md` is the short living status. Update both when a capability is added, proven, or blocked. Do not record secrets, tokens, passwords, or clipboard contents here.

The visible name is Fonia. The npm package is still `ollama-ui`. The app is a localhost Next.js interface over local Ollama. Azure and Vercel stay parked.

## What it is for

Fonia is a coding assistant that must use the real workspace. It can also check and change this Windows PC. A greeting does not scan the disk. A claim that a file was written counts only after `write_file` or `patch_file` returns `Written:` or `Patched:`. The app does not invent file contents.

Checked 2026-10-09: Windows 11 Pro, HP EliteBook 840 G3, Intel i5-6300U, 1366x768 on Intel HD Graphics 520, about 15.9 GB RAM with about 5 GB free, C: about 110 GB free of 476 GB.

## Layout

| Path | Role |
| --- | --- |
| `app/page.tsx` | Chat page. It must not import `fs` or `child_process`. |
| `app/api/agent/route.ts` | The agent. Server-sent events. Tools, direct commands, and the model loop. |
| `app/api/chat/route.ts` | Ordinary chat with Ollama. |
| `app/api/upload/route.ts` | Attached files. A PDF with no text layer is sent to Windows OCR. |
| `app/api/fonia/` | Microphone settings, one listen, and the heard text. |
| `components/ChatWindow.tsx` | The conversation, model choice, and the Listen button. |
| `components/FoniaSettings.tsx` | Press to listen, leave the mic on, or wake on the word Fonia. |
| `lib/intent.ts` | casual, explain, code, deep, or image. |
| `lib/directAction.ts` | One explicit line: `run`, `read`, `list`, `open`, or one computer command. No `and` or `then`. |
| `lib/commandUnderstand.ts` | Splits one sentence into several commands. |
| `lib/typos.ts` | Corrects a mistyped command word. |
| `lib/phraseMap.ts` | Scores the words in a clause and picks one computer action. |
| `lib/computerActionParse.ts` | Exact line, then typo correction, then the word scorer. |
| `lib/computerActions.ts` | Runs a computer action. Server only. |
| `lib/systemControls.ts` | PowerShell for brightness, theme, default apps, Windows Update, clipboard, and UI Automation. |
| `lib/windowsOcr.ts` | Windows OCR for a picture or a textless PDF. Server only. |
| `lib/secretRedact.ts` | Hides passwords and tokens before text is shown. |
| `lib/reportVoice.ts` | Asks a model that fits in free RAM to explain a status report. |
| `lib/modelRelay.ts` | Chooses the 8B planner and the 7B coder, and refuses to load them together. |
| `lib/mediaTasks.ts` | PDF, Word, and PowerPoint text, before OCR. |
| `lib/videoFrames.ts` | ffmpeg frames. |
| `lib/foniaMic.ts` | Press, open, or wake-word listening. The saved mode is press. |
| `.data/fonia-settings.json` | `{ micMode: "push" \| "open" \| "wake" }`. |

## How one message moves

1. The browser posts to `/api/agent` with the chosen model. The body always includes a model, even when the server can answer alone.
2. A question about an earlier action in this session uses the saved tool log only.
3. `directUserAction` handles one explicit line. A newline, more than 400 characters, or the words `and` or `then` make it return nothing. That keeps a mixed sentence out of the one-line path.
4. If that returns nothing, `understandCommand` splits the sentence and runs the plan when every clause is safe.
5. A destructive clause such as delete, format, wipe, or erase makes the whole plan unsafe. The route runs nothing and does not hand the sentence to a model.
6. Anything else is classified and sent to Ollama. If Ollama is down, the route waits up to 20 times, 2 seconds apart, and still saves a reply. The stream closes in `finally`.
7. A status report is read by the server first. A model then explains those lines. The numbers in the reply come from the computer, not from the model.

The browser shows the models that produced the answer. A server-only step has role `server`. A summary has role `report`.

## Models and memory

Installed models:

| Model | About | Job |
| --- | --- | --- |
| `qwen3:8b` | 5.2 GB | Plans a coding write and writes the user-facing reply. |
| `qwen2.5-coder:7b` | 4.7 GB | Edits files and calls tools. |
| `qwen2.5-coder:1.5b` | 986 MB | Tiny replies and status summaries when RAM is tight. It labels one word. It is a poor planner. |
| `qwen2.5-coder:3b` | 1.9 GB | Solver for a task the 7B cannot fit. Fit estimate 3800 MB. Installed on 2026-10-09 (id `f72c60cabf62`). `ollama ps` was empty after the pull. |
| `llava:7b` | 4.7 GB | Pictures and at most 4 video frames when free RAM is at least 6200 MB, then it unloads. It is not used to summarize text. |
| `moondream:latest` | 1.7 GB | Pictures when LLaVA does not fit. Fit estimate 2800 MB. Present in `ollama list` on 2026-10-09. |
| `qwen2.5-coder:14b-instruct-q3_K_M` | 7.3 GB | Only when the user selects it. Automatic selection skips it. |

Only one heavy model is loaded. The 8B and the 7B are never loaded together.

A coding write uses the 8B and then the 7B only when free RAM is at least 7200 MB and the chosen model is not locked. Below that line the 8B planner is skipped. Explain turns are read-only. A greeting does not load a model and does not scan the PC.

A status summary uses the model the user selected when free RAM can hold it. The fit estimates are 2200 MB for the 1.5B, 2800 MB for moondream, 3800 MB for a 3B, 6200 MB for a 7B, 7200 MB for the 8B, and 9000 MB for the 14B. If the selected model does not fit, the 1.5B writes the summary when it fits, and the reply says why the selected model was not used. `keep_alive` is 0 so the summary model unloads. If no model fits, or Ollama is down, the raw report is still shown with the reason.

A coding task or a new PC idea uses the 7B when it fits. When it does not, and the model is not locked, `qwen2.5-coder:3b` takes the task if free RAM is at least 3800 MB. The reply names that swap. A write that only the 1.5B could fit is not started. The reply asks for Retry or another model. The 1.5B is not asked to plan that write.

A coding write keeps its goal after the model replies. The server runs `npm test` when that script exists, or lint for a non-page file. A page change opens the app already running on port 3000, takes a screenshot, and a vision model that fits describes it. A failing check is handed back to the same model. The run stops when the check passes, the same failure repeats, or you press Stop. `web_fetch` reads one public page only after a real internet check. The first call asks you to allow that page. Private addresses are refused.

On 2026-10-09 a request for the 7B, with 5541 MB free, read the battery and then said the 7B needs about 6200 MB, so the 1.5B wrote the summary.

If a model cannot finish a coding task, the reply states a reason and offers Retry or another installed model. The app does not silently switch models for that work. `model_locked` keeps the user's choice. The inference wait is 90 seconds of generation for the 1.5B, 180 for a 7B or 8B, and 240 for a 14B. A model that is not already loaded also gets load time: 60, 120, or 150 seconds. Free RAM under the model's estimate adds 60 seconds. After that budget, Fonia asks Ollama whether the server is still up. A listed model gets two 60-second extensions. A server that is up but has not listed the model yet gets two 45-second extensions. A dead server stops immediately. That stop does not kill the model process. A summary waits 45 seconds.

## Intent

`classifyIntent` decides casual, explain, code, deep, or image before a model sees the message.

- A greeting is casual. No tools and no disk scan.
- Explain lists the workspace and reads `package.json`, then the coder may use read-only tools for at most 6 rounds.
- Code and deep work can use tools. A write is allowed only when the words ask for a change. Deep planning loads the 8B only when free RAM is at least 8192 MB, then unloads it before the coder.
- An image goes to a vision model that fits. LLaVA is preferred at 6200 MB free. Moondream is used when LLaVA does not fit and 2800 MB is free. The picture is not sent to a text coder.
- "design the architecture for a multi-file system" stays a deep coding task. The word system alone does not make it a PC command.

## Understanding a sentence

The matcher is one mechanism. It is not a list of example sentences. Tests pin some sentences so a later edit cannot break them. The user does not have to teach each new wording.

A clause is understood in this order:

1. Politeness is removed: "can you", "please", "hey Fonia", "tell me".
2. A mistyped word is corrected toward the command vocabulary when the first letter matches and there is one nearest word. A word shorter than 6 letters may be one edit away. A longer word may be two edits away when the shorter form is contained in the longer one. Real words such as "enabled" and "disabled" are left alone. A command is not expanded into its past tense, so "install" stays "install".
3. The words are scored. Order does not have to match the examples. "brightness screen increase" and "my screen brightness is low increase" are the same action. "low" is the reason. "increase", "raise", "higher", or "up" decides the action.
4. The winner needs a score of at least 6, and it must lead the next meaning by 2 points. A tie returns nothing rather than guessing.
5. Words about code, files, websites, bugs, and functions stay with the model unless the sentence also asks for a percentage, a screenshot, or a transcription.

Proven wordings include `take a picture` (screenshot), `my screen brightness is low incese` (brightness up), `brigtness` (brightness status), `check the batery` (battery), `is dark mode on` (theme status), `turn on dark mode`, `what are my default apps`, `check for windows updates`, `install windows updates`, `read the clipboard`, and `type hello into notepad`.

`can you check the percentage of my system` is the battery. Percentage plus disk, memory, or CPU stays with that part. A check does not shut the PC down, mute the speaker, or disable a device.

### Several commands in one sentence

`understandCommand` splits on `;`, `and`, `then`, `also`, `plus`, and `after that`. The last verb is carried forward. In "check battery and the disk and memory", the later clauses are still checks. The verb "take" is not carried, so "take a picture and the clipboard" does not become "take the clipboard".

A sentence of seven commands is accepted:

`check battery and the disk and memory and wifi and take a picture and the clipboard and windows updates`

That becomes battery, disk, memory, Wi-Fi, screenshot, clipboard, and Windows Update history.

A leftover that is not a PC command is reported and skipped. A leftover that asks to delete, format, wipe, or erase makes the whole sentence unsafe, including the safe clauses in front of it. "turn off the firewall and delete everything" runs nothing.

These stay with the model, because they are not a list of PC commands:

- `create a website`
- `open blender and make a cube`
- `Run: git diff HEAD and show me what changed`

`turn off wifi`, `restart node`, and `turn the volume up` without a number return nothing. `stop it` and `close the window` do not kill a process named "it" or "window".

The one-line parser still returns nothing when the full string contains `and` or `then`. The splitter is a separate step. That is why the old tests stay in place.

### What a messy sentence cannot do

A typo is repaired only when it is close to a known command word. A known phrase, including "eject the flash drive", runs on the server with no model. A new kind of request that is not a question goes to the solver with tools. The solver may use one existing `computer_action` or one safe PowerShell command. It must not invent the result. The 1.5B can restate a report. It is not the planner for that new idea. When the 7B does not fit, the 3B is the solver.

## Tools

The model may call only these names: `read_file`, `write_file`, `patch_file`, `list_dir`, `run_command`, `delete_file`, `search_in_files`, `read_document`, `sample_video`, `launch_app`, `computer_action`.

Prose such as `List_dir:` is not a tool call. `run_command` blocks shutdown, restart, `Stop-Computer`, `format`, `Format-Volume`, `Clear-Disk`, `Initialize-Disk`, and a recursive delete of `C:\`. A power action has to be the named `computer_action`. Shell metacharacters are rejected. The command does not scan the whole disk.

`read_document` extracts text from txt, md, pdf, docx, and pptx. When a PDF has no text layer, the agent route and the upload route rasterize up to 3 pages with Windows.Data.Pdf and read them with Windows.Media.Ocr. No extra OCR program is installed. If the Windows language pack is missing, the error says so.

`sample_video` uses ffmpeg first. The interval is 0.5 to 10 seconds, default 1, and at most 6 frames. A vision model that fits sees at most 4, then unloads before a coder runs. A one-line screenshot does not load a vision model.

`launch_app` starts an installed program with `Start-Process`. Blender, VS Code, Chrome, and Edge are resolved from their usual folders when the exe exists. Blender was not launched in testing.

## Computer actions

`computer_action` runs on the server. The action name has to be in the allowed set or it is rejected before any command.

Status and report actions, which a fitting model then explains:

`battery_status`, `disk_space`, `memory_status`, `cpu_status`, `gpu_status`, `display_status`, `audio_status`, `volume_status`, `wifi_status`, `network_status`, `bluetooth_status`, `firewall_status`, `printers_status`, `camera_status`, `power_status`, `startup_status`, `programs_status`, `devices_status`, `components_status`, `process_status`, `service_status`, `brightness_status`, `theme_status`, `defaults_status`, `windows_update_status`, `windows_update_scan`.

Changes and captures. The server text is returned. A model is not asked to invent the change. Clipboard text is sent to a local model and hidden from an online model:

`eject_drive`, `brightness_up`, `brightness_down`, `brightness_set`, `theme_dark`, `theme_light`, `defaults_open`, `windows_update_install`, `clipboard_read`, `ui_type`, `ui_click`, `screenshot`, `volume_set`, `volume_mute`, `volume_unmute`, `bluetooth_on`, `bluetooth_off`, `firewall_on`, `firewall_off`, `device_enable`, `device_disable`, `process_stop`, `service_start`, `service_stop`, `sleep`, `restart`, `shutdown`, `speak`, `listen`, `transcribe`.

`eject_drive` removes one removable disk (Windows DriveType 2) with the shell Eject verb. A letter such as E is used only when that letter is removable. C: and any other fixed disk are refused. No letter and no removable disk says that no flash drive is mounted. More than one removable disk lists the letters and ejects none.

`pc status` is `components_status`: OS, CPU, memory, battery, GPU, disks, audio, network adapters, Bluetooth devices, printers, cameras, and the power plan.

### Brightness

WMI `WmiMonitorBrightness` reads the level. `WmiSetBrightness` writes it. Up and down move by 10, capped at 0 and 100. A number with set, make, to, or at is an exact level. Proven 2026-10-09: read 100%, set to that same value, read 100% again. The screen was not left on a different level.

### Dark mode

Reads `AppsUseLightTheme` and `SystemUsesLightTheme` under the current user. A change also broadcasts `ImmersiveColorSet`. "is dark mode on" is a status. "turn on dark mode" is the change. Proven: apps and system were both dark. The theme was not switched.

### Default apps

Reads the UserChoice ProgId for http, https, mailto, and .pdf. Windows protects that choice with a hash, so Fonia does not write it. Changing the default opens `ms-settings:defaultapps`. Proven read: http, https, and pdf are Edge. mailto is Opera. Settings was not opened.

### Windows Update

History comes from `Microsoft.Update.Session` plus the RebootRequired registry. Scan and install are implemented. Install does not force a reboot, but Windows can still ask to restart, and a search can take minutes. Proven: the last five history rows, `RebootRequired: False`. Scan and install were not run.

### Clipboard

`Get-Clipboard -Raw`. The text is capped at 2000 characters and is shown to a local model, including a password. `redactSecrets` runs only when the model host is an online address. Proven earlier: a harmless test string came back, a planted `password=` value was replaced with `[hidden]` under the old local rule, and the previous clipboard was restored. The previous contents were not printed. That local hide is removed.

### Typing and clicking

UI Automation finds a window by name, brings it forward, and checks the foreground handle before `SendKeys` or a click. More than three matches are listed and nothing is changed. Zero matches is an error. The Windows lock screen, BitLocker, and a sign-in window are refused. A password typed into a normal window is allowed for a local model. Typed text is capped around 180 characters, and SendKeys special characters are escaped. Proven: Notepad was opened on a temp file, the text "fonia ui test" was typed into that window, and that Notepad was closed without saving. A click of a named control is implemented and was not part of this proof. This is one named window, not control of the whole desktop.

### Screenshot, speech, and the microphone

A screenshot is one ffmpeg `gdigrab` frame, scaled to 1280, saved as a jpg, then deleted in the proof.

`speak` uses the Windows voice. No test phrase was played.

`listen` uses the Windows recognizer once, then releases it. The Listen button defaults to about 12 seconds. One live listen on 2026-10-09 returned `Heard: We have` and mapped to no command. The microphone was not left running. The saved setting stayed press-to-listen. Wake word "fonia" and the always-on option exist and were not turned on.

`listen` uses Windows speech. When that recognizer fails, Fonia records the microphone with ffmpeg and transcribes the recording with `%LOCALAPPDATA%\Fonia\whisper\Release\whisper-cli.exe` and `ggml-tiny.bin`. `transcribe` uses that same pair on an audio file. The chat models do not hear by themselves.

### Power, processes, and devices

Sleep, restart, and shutdown are real commands. Restart and shutdown wait 5 seconds and can be cancelled with `shutdown /a`. None of them was run.

A named process can be stopped and a named service can be started or stopped. Protected processes and services are refused, including `lsass`, `svchost`, `csrss`, `winlogon`, RpcSs, SamSs, and Winmgmt. "stop node" would also hit the dev server, so it was not run.

A named device can be enabled or disabled. Keyboard, mouse, display, monitor, screen, disk, and drive are refused. More than three matches are listed and left alone. Bluetooth and the firewall are their own actions, not generic devices. A change can still need an Administrator terminal. Neither radio was toggled in testing. Firewall profiles were all on. Bluetooth was on.

Volume can be read, set to a number, muted, or unmuted. It was left at 100 and not muted.

## What was proven on 2026-10-09

`npm run test:intent` passed 42 tests. That includes the paraphrase suite and the interpreter tests for typos, a seven-command sentence, a destructive tail, and clipboard redaction.

Live, without leaving the PC changed:

- Brightness read and set back to the same 100%.
- Theme read: apps dark, system dark.
- Default apps read. Settings stayed closed.
- Windows Update history read. No scan and no install.
- Clipboard round-trip with redaction. The original clipboard was restored.
- Notepad received typed text and was closed.
- Windows OCR read "Hello scan" from a generated PNG.
- A screenshot was created and deleted.
- `POST /api/agent` with "check the batery" ran `battery_status` (`Battery: charge=97% on AC`) and `qwen2.5-coder:1.5b` explained that report.
- The same sentence with the 7B selected named the RAM limit and used the 1.5B for the summary.

Earlier the same day, with no model: `pc status`, disk, memory, Wi-Fi connected, Ethernet media disconnected, volume 100, cameras present with state Unknown, printers, power plan Balanced, and the battery sentence at 95% on AC. ffmpeg is Gyan.FFmpeg.Essentials 9.0.1. The page title is Fonia. Settings GET returned press mode and the microphone was not running.

The chat page was not clicked. Proof is the test runner, PowerShell, and the agent event stream.

## Limits

- A known phrase runs with no model. A new request that is not a question goes to the solver. The solver can be slow on this 2-core CPU, and a guessed command can still be wrong. Format, shutdown, and disk-clear stay blocked.
- The 7B and the 8B often do not fit while the app is open and free RAM is about 5 GB. The 8B-then-7B relay still waits for 7200 MB. A write can use the 3B when that model is installed and 3800 MB is free.
- The 1.5B can explain a report. It is a poor planner and a poor tool caller. It does not take a coding write that the 7B and the 3B cannot fit.
- UI automation types or clicks in one named window. It does not drive an arbitrary program the way a person does.
- Windows does not allow a silent change of protected default apps.
- Windows Update install can reboot the PC. It is coded and was not run.
- OCR quality depends on the Windows language pack. A textless PDF path is wired. The live proof was a PNG, not a scanned PDF.
- The microphone heard "We have" once. A spoken command has not been carried through to an action.
- No audio file has been transcribed.
- A model-driven file edit, and the 8B-then-7B relay, have not been proven on a live coding request.
- `npx tsc --noEmit` still fails on a pre-existing `JobStatus` mismatch in `lib/jobs.ts`.
- Device and some service changes need Administrator rights. Fonia does not grant itself admin.

## Deferred

Repo indexing, automatic test repair, workspace search, plan, undo, Electron, and a second shell stay queued. `TASK_ORDERS.md` tasks 6–9 stay queued until a coding request changes a file on disk. Do not start those while this loop is still being proven.
