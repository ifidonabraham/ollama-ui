# Platform status

This is the living record of what ollama-ui can do on this PC. Update this file in the same change that adds, proves, or blocks a capability. Add a dated line to the log. Do not record secrets, tokens, or passwords here.

## What this is

The interface name is Fonia. It is a localhost Next.js app over local Ollama. It edits files in the open workspace, runs PowerShell, and can check or change this Windows PC. One heavy model is loaded at a time. Azure and Vercel stay parked. The npm package name is still `ollama-ui`.

Installed models: `qwen3:8b` (plans and the user-facing voice), `qwen2.5-coder:7b` (file edits and tool calls), `qwen2.5-coder:3b` (1.9 GB, solver when the 7B does not fit), `qwen2.5-coder:1.5b` (tiny replies and report summaries), `llava:7b` (pictures when about 6200 MB is free), `moondream:latest` (1.7 GB, pictures when LLaVA does not fit), `qwen2.5-coder:14b-instruct-q3_K_M` (only when the user picks it). The 3B finished installing on 2026-10-09. The 8B and the 7B are never loaded together.

## How a request runs

- One PC command runs on the server. A status report is then explained by a model that fits in free RAM. The numbers stay the computer's. The answer lists role `report` and role `server`.
- If the selected model does not fit, a smaller installed model writes the summary and the reply says why. `keep_alive` is 0.
- Several PC commands in one sentence are split and run. A destructive tail cancels the whole sentence.
- A known PC phrase, including ejecting one removable flash drive, runs on the server. A new request that is not a question goes to a solver model with tools. The 7B is that solver when it fits. The 3B is next when free RAM is at least 3800 MB. The 1.5B does not plan that work.
- A coding write uses `qwen3:8b` and then the 7B only when free RAM is at least 7200 MB and the model is not locked. Below that, the pair does not start, and the status line says how much RAM is free. Explain and chat do not use that pair. A deep plan also waits for 8192 MB free.
- A picture goes only to a vision model. LLaVA is preferred. Moondream is used when LLaVA does not fit. The text coder never receives the image bytes. If no vision model fits, the picture is not sent and the reply asks for a choice.
- The wait depends on the model, a cold load, and free RAM. A warm 7B gets 180 seconds before the first check. A cold 7B gets 300 seconds. Tight RAM adds 60 seconds. If Ollama still lists that model, the wait extends by 60 seconds, twice. If the server is up but the model is not listed yet, it extends by 45 seconds, twice. A dead server stops the wait. The model process is not killed.
- The 1.5B can label an unclear chat message when Adjuster is on. The label is one word. It does not rewrite the message into a command, and a `code` label does not grant a file write. The toggle is off until it is turned on.
- The Loaded button lists Ollama models in memory and can unload them. It does not end Windows processes.
- Model retry is a dropdown. Choosing a model stops the current call, so Stop is only for a cancel. The working line is text.
- Video frames are split with ffmpeg first. `llava:7b` describes at most 4 frames. A textless PDF is read with Windows OCR, up to 3 pages.
- If a model cannot finish a coding task, the user gets Retry and the other installed models. The app does not switch models by itself for that work.

## Verified on this PC

Checked 2026-10-09 through `computer_action` and through `POST /api/agent`. The chat page was not clicked.

| Check | Result |
| --- | --- |
| `pc status` | Windows 11 Pro, HP EliteBook 840 G3, Intel i5-6300U, 1366x768, battery on AC. Role `server`. |
| Memory | About 5 GB free of 15.9 GB during these checks |
| Disk | C: about 110 GB free of 476 GB |
| Battery | 97% and on AC. "check the batery" ran on the server and `qwen2.5-coder:1.5b` explained it. With the 7B selected and 5541 MB free, the reply named the 6200 MB gap and used the 1.5B |
| Network | Wi-Fi adapter connected. Ethernet media disconnected |
| Bluetooth radio | State On. Not toggled |
| Firewall | Domain, Private, and Public are on. Not toggled |
| Volume | Speaker at 100, not muted. Not changed |
| Display | Intel HD Graphics 520 at 1366x768 |
| Cameras | HP IR Camera and HP Full-HD Camera are present. Windows reports their device state as Unknown |
| Printers | Microsoft Print to PDF is the default |
| Power plan | Balanced |
| Devices | Keyboard, mouse, touchpad, USB, display, and the two cameras are reported |
| Screenshot | A desktop image was captured with ffmpeg and then deleted. "take a picture" maps to the same action |
| Brightness | Read 100%. Set to that same value. Still 100%. Not left changed |
| Theme | Apps dark, system dark. Not switched |
| Default apps | http, https, and pdf are Edge. mailto is Opera. Settings was not opened |
| Windows Update | Last history rows read. RebootRequired is false. Scan and install were not run |
| Clipboard | A test string was read. A planted password assignment was replaced with `[hidden]`. The previous clipboard was restored and was not printed |
| Other programs | Typed "fonia ui test" into a Notepad window, then closed it without saving |
| OCR | Windows OCR read "Hello scan" from a generated PNG |
| ffmpeg | Gyan.FFmpeg.Essentials 9.0.1 |
| Speech | One listen returned `Heard: We have` and matched no command. The microphone was closed afterward |
| Whisper | whisper.cpp 1.7.6 and `ggml-tiny.bin` are installed under `%LOCALAPPDATA%\Fonia\whisper`. Listen uses Windows speech first. If that recognizer fails, Fonia records the microphone and transcribes it with whisper. |
| Name | The window title and sidebar say Fonia |
| Microphone setting | Press Listen. The wake word and the always-on option exist and are off |

`npm run test:intent` passed 42 tests on 2026-10-09. The suite covers paraphrases, typos, a seven-command sentence, and clipboard redaction. The full map is in `SYSTEM.md`.

## OS components the agent can use

Say `pc status` or `all components` for one report. These one-line phrases also work:

| Phrase | What it does |
| --- | --- |
| `cpu status`, `check battery`, `display status`, `audio status` | That part only |
| `network status`, `wifi status` | Adapters, or the Wi-Fi interface details |
| `bluetooth status`, `turn on bluetooth`, `turn off bluetooth` | Radio state. A change can need an Administrator terminal |
| `firewall status`, `turn the firewall on`, `turn the firewall off` | All three profiles. Off was not run |
| `disk space`, `memory status`, `power plan` | Storage, RAM, active power scheme |
| `volume`, `set volume to 30`, `mute`, `unmute` | Default speaker. Volume was not changed in testing |
| `printers`, `devices`, `camera status` | Those devices |
| `startup apps`, `installed programs`, `find program Chrome` | Up to 15 startup commands, or 25 installed programs |
| `is node running`, `check the service Spooler running` | A named process or service. This reports state. It does not start or stop it |
| `take a screenshot`, `take a picture` | Saves a desktop image. A one-line request does not load LLaVA |
| `brightness`, `increase brightness`, `set brightness to 40` | Reads the panel, moves it by 10, or sets 0–100. A same-value write was proven |
| `is dark mode on`, `turn on dark mode` | Reads or sets the Windows theme. Only the read was run |
| `what are my default apps` | Reads http, https, mailto, and pdf. A change opens Windows Settings |
| `check for windows updates`, `install windows updates` | History, a search, or an install. Install can ask Windows to restart. Only history was run |
| `read the clipboard` | Reads the clipboard. A local model sees the text. An online model receives passwords hidden |
| `type hello into notepad`, `click Save in notepad` | Types or clicks in a named window. A password window is refused |
| `open notepad`, `open blender` | Starts an installed app. Blender was not started |
| `say hello` | Windows voice. No test phrase was played |
| Listen button, or `listen` | Listens once, then stops. One live listen heard "We have" and matched nothing |
| Microphone setting | Press Listen, leave the microphone on, or wake on the word Fonia. It is set to Press Listen |
| `transcribe C:\audio\note.wav` | whisper.cpp and `ggml-tiny.bin` |
| `sleep`, `restart`, `shut down the pc` | Schedules the action. Restart and shutdown wait 5 seconds. Cancel with `shutdown /a`. None of these was run |
| `stop node`, `start the service Spooler`, `stop the service Spooler` | Ends a named process, or starts or stops a named service. Fonia's own process is left running. Not run in testing |
| `disable camera`, `enable camera` | Enables or disables a named device. Keyboard, mouse, display, and disks are refused. Not run in testing |

Files, documents, and video are separate tools: `read_file`, `write_file`, `patch_file`, `list_dir`, `search_in_files`, `run_command`, `read_document`, `sample_video`, `launch_app`.

## The same command in your own words

Fonia does not store the example sentences. It corrects a near miss in the command vocabulary, then scores the words in any order. One clear meaning becomes one existing action.

`can you check the percentage of my system` and `check the batery` are the battery. `my screen brightness is low incese` is brightness up. `take a picture` is a screenshot. `percentage of my disk` and `percentage of my memory` stay with disk and memory. Asking to check something does not shut the PC down, mute the speaker, or disable a device.

One sentence can hold several commands. "check battery and the disk and memory and wifi and take a picture and the clipboard and windows updates" is seven actions. A clause that says to delete, format, or wipe cancels the whole sentence. Code requests such as "create a website" stay with the model.

A status report is then explained by a model that fits. A local model sees the clipboard text. An online model receives passwords hidden. A question about a report already taken in this session is answered from that log with no new model load. The last six computer reports are also placed in the next model prompt.

## Still not the same as sitting at the keyboard

1. Typing and clicking work in one named window. Fonia does not drive an arbitrary program by itself. A click was not part of the live proof.
2. Windows blocks a silent change of the default browser. Fonia can open the Settings page.
3. Windows Update install is coded and was not run. It can reboot the PC.
4. OCR uses the Windows language pack. A PNG proof returned "Hello scan". A scanned PDF path is wired and was not given a real scan.
5. `lsass`, `svchost`, and the other processes that keep Windows alive are refused. Keyboard, mouse, display, and disks cannot be disabled.
6. Device changes and some service changes need an Administrator terminal. Fonia cannot grant itself admin.
7. The wake word and the always-on microphone are built and switched off. One listen heard "We have" and matched no command.
8. With about 5 GB free, the 7B coder and the 8B planner may not fit. Status checks still run. The summary falls back to the 1.5B and says so. A coding task or a new PC idea waits for the 3B solver instead of asking the 1.5B to plan it.
9. A known phrase runs with no model. "eject the flash drive" ejects one removable disk and leaves fixed disks alone. A sentence that matches nothing goes to the solver, which may choose one existing action or one safe command. The 1.5B can restate a report. It is a poor planner.

## Log

- 2026-10-08: ffmpeg installed. Video frames split with no model. User-chosen model fallback. PDF, Word, and PowerPoint text extracted on the server.
- 2026-10-09: One-line Bluetooth, firewall, disk, memory, process, and Wi-Fi checks run with no model. Screenshot capture proven and deleted. Windows speech engine loads. Whisper is absent.
- 2026-10-09: `pc status` reports the OS and the main components in one server call. Display, battery wording, speaker volume, devices, network, printers, power plan, and startup apps are wired. Volume was left at 100. Firewall and Bluetooth were not switched.
- 2026-10-09: The interface is named Fonia. Sleep, restart, and shutdown are real one-line actions and were not run. A named process can be ended, and a named service can be started or stopped. A named device can be enabled or disabled, except the keyboard, mouse, display, and disks. whisper.cpp 1.7.6 and ggml-tiny.bin are installed. The microphone setting defaults to Press Listen. The Listen button, the always-on option, and the Fonia wake word were not opened.
- 2026-10-09: Spoken paraphrases map onto the existing commands without a model. "can you check the percentage of my system" is the battery check. A live server call returned `Battery: charge=95% on AC` with role `server`. A check does not shut down, mute, or disable anything. Sentences with "and" or "then" stay with the model.
- 2026-10-09: The interpreter corrects typos and splits several commands in one sentence. Brightness, theme, default apps, and Windows Update history were read. Brightness was set to its own 100% and stayed there. Clipboard redaction was proven and the previous clipboard restored. Notepad was typed into and closed. Windows OCR read a test image. "check the batery" returned 97% on AC and the 1.5B explained it. A selected 7B that did not fit was named in the reply. Full structure is in `SYSTEM.md`.
- 2026-10-09: An image sent with the 7B selected was refused in 310 ms. Free RAM was 4826 MB. The reply said `llava:7b` needs about 6200 MB and the picture was not sent to a text model. No coder call was made. `npm run test:intent` passed 46 tests. The chat page was not clicked. Electron was not started.
- 2026-10-09: A local model can see clipboard text. Password hiding stays in `redactSecrets` for an online model host only. A question about a computer report already stored in the session is answered from that log with no model load. The last six reports are added to the next model prompt. No new model was pulled.
- 2026-10-09: `moondream:latest` finished (1.7 GB). `qwen2.5-coder:3b` was still pulling. The code prefers moondream for a picture when LLaVA needs more than the free RAM, and the 3B for a task the 7B cannot fit. "eject the flash drive" is a server action for one removable disk. A fixed-disk letter is refused. `npm run test:intent` passed 51 tests. The chat page was not clicked.
- 2026-10-09: A coding write holds its goal after the reply. The server runs the project test when `npm test` exists, opens the app on port 3000 for a page change, and sends a failing check back to the same model. The run stops when the check passes, the same failure repeats, or Stop is pressed. `web_fetch` asks before opening a public page, and only when a real internet connection answers. The chat page was not clicked.
- 2026-10-09: `qwen2.5-coder:3b` finished installing (1.9 GB, id `f72c60cabf62`). `ollama ps` listed no model. Nothing else was pulled. `npm run test:intent` had passed 54 tests on the goal and web check. The chat page was not clicked. A live coding goal was not sent through a model, so the screenshot step has not run on a real edit.
- 2026-10-09: Settings holds the switches for understanding, asking before overnight or sleep, the goal check, looking at a page, the 8B planner, closing extra apps, the strong coder, whisper, and open tool steps. "I am going to sleep" asks which action is meant. "Put the computer to sleep" still suspends the PC. A desktop wrapper was not added. Electron would add another browser. The chat page was not clicked.
- 2026-10-09: The chat uses the Fonia Labs palette from fonia-labs-starter: #0B1120, #2563EB, and #38BDF8. Type stays Segoe UI so the screen still works offline. resources/dev-catalog.json records the stacks found on this PC. A website uses Next.js. three.js is for a 3D section. Beautiful Soup, Prisma, Stripe, Go, and Rust were not installed. The same catalog is copied to %LOCALAPPDATA%\Fonia\resources\dev-catalog.json. The chat page was not clicked.
- 2026-10-09: The composer stays open during a run. Enter queues the next message. Ctrl+Enter steers the current run. A sentence such as "I am going to sleep" means the person is leaving, so the project continues with the strongest coder that fits. "Put the computer to sleep" still suspends the PC. The browser, editor, Fonia, and Ollama stay open. Up to four other large applications can be closed. The chat page was not clicked.
- 2026-10-09: Listen no longer stops with an install message when Windows speech fails. It records the microphone and transcribes that recording with the installed whisper model. A generated wave of "check the battery" was transcribed as "Check the battery." The internal microphone recorded one second and the file was deleted. Windows OCR reports en-US. A PDF with no text layer goes straight to Windows OCR. If Edge and Chrome are missing, the local page opens in the default browser. The Listen button was not clicked.
