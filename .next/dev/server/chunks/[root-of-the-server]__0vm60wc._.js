module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/app/api/fonia/listen/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/computerActions.ts [app-route] (ecmascript)");
;
;
async function POST() {
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runComputerAction"])("listen");
    if (result.startsWith("Heard:")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            text: result.slice("Heard:".length).trim()
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        text: "",
        message: result.slice(0, 300)
    });
}
}),
"[project]/lib/awayIntent.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appsToClose",
    ()=>appsToClose,
    "awayWorkNote",
    ()=>awayWorkNote,
    "machineRestCommand",
    ()=>machineRestCommand,
    "personIsSteppingAway",
    ()=>personIsSteppingAway
]);
/** Processes the night run still needs, plus Windows itself. */ const KEEP_RUNNING = new Set([
    "system",
    "idle",
    "registry",
    "smss",
    "csrss",
    "wininit",
    "winlogon",
    "services",
    "lsass",
    "svchost",
    "dwm",
    "explorer",
    "sihost",
    "ctfmon",
    "fontdrvhost",
    "conhost",
    "dllhost",
    "runtimebroker",
    "taskhostw",
    "searchhost",
    "startmenuexperiencehost",
    "shellexperiencehost",
    "textinputhost",
    "applicationframehost",
    "securityhealthservice",
    "securityhealthsystray",
    "msmpeng",
    "nissrv",
    "node",
    "ollama",
    "llama-server",
    "powershell",
    "cmd",
    "windowsterminal",
    "code",
    "cursor",
    "devenv",
    "chrome",
    "msedge",
    "firefox",
    "brave",
    "whisper-cli",
    "searchindexer",
    "lockapp"
]);
const QUESTION = /^(?:how|what|why|when|where|who|is|are|do|does|can|could)\b/i;
function machineRestCommand(text) {
    const normalized = text.trim().toLowerCase().replace(/[.!?]+$/g, "");
    return /^(?:please\s+)?(?:sleep|suspend)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(normalized) || /\bput\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\s+to\s+sleep\b/.test(normalized) || normalized === "go to sleep";
}
function personIsSteppingAway(text) {
    const normalized = text.trim().toLowerCase();
    if (!normalized || QUESTION.test(normalized) || machineRestCommand(normalized)) return false;
    const aboutTheMachine = /\b(computer|pc|laptop|machine|windows)\b/.test(normalized) && /\b(sleep|suspend|shut|restart|reboot|hibernate)\b/.test(normalized);
    if (aboutTheMachine) return false;
    const aboutMe = /\b(i'm|i am|i will|i'll|im)\b/.test(normalized);
    const awayForAWhile = /\b(bed|asleep|overnight|through the night|tonight|heading out|leaving|be away|be out|be gone|call it a night|turning in|don't wait|do not wait|unattended|in the morning)\b/.test(normalized);
    const personalRest = /\b(?:i'm|i am|i will|i'll|im)\b[\s\S]{0,48}\b(?:sleep|bed|asleep)\b/.test(normalized);
    const unattended = /\b(overnight|through the night|while i(?:'m| am) (?:out|gone|away|asleep)|don't wait for me|do not wait for me|leave (?:this|it) running)\b/.test(normalized);
    return aboutMe && (awayForAWhile || personalRest) || unattended;
}
function awayWorkNote(closed) {
    return [
        "The person is away from this PC. Continue the open project.",
        "Do not suspend, shut down, or restart the computer, and do not close applications yourself.",
        closed,
        "Keep this goal until the check passes, the work is blocked, or the user presses Stop."
    ].join(" ");
}
function appsToClose(apps, selfPid) {
    return apps.filter((app)=>app.pid !== selfPid && app.pid > 4 && app.memMB >= 180 && !KEEP_RUNNING.has(app.name.toLowerCase())).sort((a, b)=>b.memMB - a.memMB).slice(0, 4);
}
}),
"[project]/lib/computerActions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cleanTranscript",
    ()=>cleanTranscript,
    "findWhisper",
    ()=>findWhisper,
    "pickAudioDevice",
    ()=>pickAudioDevice,
    "releaseExtraApps",
    ()=>releaseExtraApps,
    "runComputerAction",
    ()=>runComputerAction,
    "speechEngineFailed",
    ()=>speechEngineFailed
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/videoFrames.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/systemControls.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/awayIntent.ts [app-route] (ecmascript)");
;
;
;
;
;
;
;
;
const execFileAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execFile"]);
const PROTECTED_PROCESSES = new Set([
    "system",
    "idle",
    "csrss",
    "wininit",
    "winlogon",
    "lsass",
    "services",
    "smss",
    "svchost",
    "registry"
]);
const PROTECTED_SERVICES = new Set([
    "rpcss",
    "dcomlaunch",
    "samss",
    "lsm",
    "power",
    "plugplay",
    "winmgmt"
]);
const ACTIONS = new Set([
    "bluetooth_status",
    "bluetooth_on",
    "bluetooth_off",
    "firewall_status",
    "firewall_on",
    "firewall_off",
    "process_status",
    "service_status",
    "disk_space",
    "eject_drive",
    "memory_status",
    "wifi_status",
    "network_status",
    "components_status",
    "battery_status",
    "cpu_status",
    "gpu_status",
    "display_status",
    "audio_status",
    "volume_status",
    "volume_set",
    "volume_mute",
    "volume_unmute",
    "shutdown",
    "restart",
    "sleep",
    "process_stop",
    "service_start",
    "service_stop",
    "device_enable",
    "device_disable",
    "printers_status",
    "camera_status",
    "power_status",
    "startup_status",
    "programs_status",
    "devices_status",
    "screenshot",
    "speak",
    "listen",
    "transcribe",
    "brightness_status",
    "brightness_up",
    "brightness_down",
    "brightness_set",
    "theme_status",
    "theme_dark",
    "theme_light",
    "defaults_status",
    "defaults_open",
    "windows_update_status",
    "windows_update_scan",
    "windows_update_install",
    "clipboard_read",
    "ui_type",
    "ui_click"
]);
function safeName(value) {
    const name = value.trim().replace(/^["']|["']$/g, "");
    return /^[A-Za-z0-9._-]{1,40}$/.test(name) ? name : null;
}
async function runPowerShell(script, timeout = 25_000, sta = false) {
    const file = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), `ollama-ui-ps-${Date.now()}-${Math.random().toString(16).slice(2)}.ps1`);
    const body = [
        "$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)",
        script
    ].join("\n");
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(file, body, "utf8");
    try {
        const { stdout, stderr } = await execFileAsync("powershell.exe", sta ? [
            "-NoProfile",
            "-STA",
            "-NonInteractive",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            file
        ] : [
            "-NoProfile",
            "-NonInteractive",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            file
        ], {
            timeout,
            maxBuffer: 1_000_000,
            env: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toolEnv"])()
        });
        return [
            stdout,
            stderr
        ].map((part)=>part?.trim()).filter(Boolean).join("\n") || "(no output)";
    } catch (error) {
        const err = error;
        const detail = [
            err.stdout,
            err.stderr
        ].map((part)=>part?.trim()).filter(Boolean).join("\n");
        const text = detail || (err.message ?? "PowerShell failed");
        if (/Access is denied|requires elevation|0x8007|UnauthorizedAccess/i.test(text)) {
            return `Error: This needs an Administrator terminal. ${text.slice(0, 300)}`;
        }
        if (err.killed || /TIMEOUT|timed out/i.test(err.message ?? "")) {
            return `Error: The PC check timed out. ${detail.slice(0, 300)}`;
        }
        return `Error: ${text.slice(0, 500)}`;
    } finally{
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(file, {
            force: true
        });
    }
}
function bluetoothScript(mode) {
    const change = mode === "status" ? "" : `$desired = [Windows.Devices.Radios.RadioState]::${mode === "on" ? "On" : "Off"}; $access = Await-WinRt ($radio.SetStateAsync($desired)) ([Windows.Devices.Radios.RadioAccessStatus]); "access=$access";`;
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -AssemblyName System.Runtime.WindowsRuntime",
        "$null = [Windows.Devices.Radios.Radio,Windows.Devices.Radios,ContentType=WindowsRuntime]",
        "$asTask = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' })[0]",
        "function Await-WinRt($op, $type) { $task = $asTask.MakeGenericMethod($type).Invoke($null, @($op)); $task.Wait() | Out-Null; if ($task.IsFaulted) { throw $task.Exception.GetBaseException() }; $task.Result }",
        "$radios = Await-WinRt ([Windows.Devices.Radios.Radio]::GetRadiosAsync()) ([System.Collections.Generic.IReadOnlyList[Windows.Devices.Radios.Radio]])",
        "$radio = $radios | Where-Object { $_.Kind -eq [Windows.Devices.Radios.RadioKind]::Bluetooth } | Select-Object -First 1",
        "if (-not $radio) { 'No Bluetooth radio found'; exit 0 }",
        change,
        "\"name=$($radio.Name) state=$($radio.State)\""
    ].filter(Boolean).join("; ");
}
function whisperInTree(dir, depth, names = [
    "whisper-cli.exe",
    "whisper.exe"
]) {
    for (const name of names){
        const candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, name);
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(candidate)) return candidate;
    }
    if (depth <= 0) return null;
    let entries = [];
    try {
        entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dir, {
            withFileTypes: true
        });
    } catch  {
        return null;
    }
    for (const entry of entries){
        if (!entry.isDirectory()) continue;
        const found = whisperInTree(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name), depth - 1);
        if (found) return found;
    }
    return null;
}
function findWhisper() {
    const names = [
        "whisper-cli.exe",
        "whisper.exe"
    ];
    let command = "";
    const foniaDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.env.LOCALAPPDATA ?? "", "Fonia", "whisper");
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(foniaDir)) {
        const found = whisperInTree(foniaDir, 3, [
            "whisper-cli.exe",
            "whisper.exe",
            "main.exe"
        ]);
        if (found) command = found;
    }
    for (const dir of command ? [] : (process.env.PATH ?? "").split(";")){
        const trimmed = dir.trim();
        if (!trimmed) continue;
        for (const name of names){
            const candidate = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(trimmed, name);
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(candidate)) {
                command = candidate;
                break;
            }
        }
        if (command) break;
    }
    const packages = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
    if (!command && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(packages)) {
        for (const entry of __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(packages)){
            if (!/whisper/i.test(entry)) continue;
            const found = whisperInTree(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(packages, entry), 3);
            if (found) {
                command = found;
                break;
            }
        }
    }
    if (!command) return null;
    const roots = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(command),
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(command), "models"),
        foniaDir
    ];
    for (const root of roots){
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(root)) continue;
        const model = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(root).find((name)=>/^ggml-.*\.bin$/i.test(name));
        if (model) return {
            command,
            model: __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(root, model)
        };
    }
    return {
        command,
        model: ""
    };
}
function speechEngineFailed(text) {
    if (!text.startsWith("Error:")) return false;
    if (/timed out|TIMEOUT/i.test(text)) return false;
    return /recognizer|speech|audio device|microphone|language|dictation/i.test(text);
}
function pickAudioDevice(names) {
    return names.find((name)=>/microphone|mic\b|headset|array/i.test(name)) ?? names[0] ?? "";
}
function cleanTranscript(raw) {
    const lines = raw.split(/\r?\n/).map((line)=>line.trim()).filter((line)=>{
        if (!line) return false;
        if (/^(whisper_|ggml_|system_info|main:)/i.test(line)) return false;
        if (/\b(load time|mel time|encode time|decode time|total time)\b/i.test(line)) return false;
        return true;
    });
    return lines.join(" ").replace(/\s+/g, " ").trim();
}
function heardLine(raw) {
    if (raw.startsWith("Error:")) return raw;
    if (/returned no words/i.test(raw)) return "No speech recognized.";
    const text = cleanTranscript(raw);
    if (!text) return "No speech recognized.";
    return text.startsWith("Heard:") ? text : `Heard: ${text}`;
}
async function audioDeviceNames(ffmpeg) {
    let dump = "";
    try {
        const { stdout, stderr } = await execFileAsync(ffmpeg, [
            "-hide_banner",
            "-list_devices",
            "true",
            "-f",
            "dshow",
            "-i",
            "dummy"
        ], {
            timeout: 12_000,
            env: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toolEnv"])()
        });
        dump = `${stdout ?? ""}\n${stderr ?? ""}`;
    } catch (error) {
        const err = error;
        dump = `${err.stdout ?? ""}\n${err.stderr ?? ""}`;
    }
    return [
        ...dump.matchAll(/"([^"\r\n]+)"\s+\(audio\)/gi)
    ].map((match)=>match[1]);
}
/** Record the microphone and transcribe it with the installed whisper model. */ async function captureMicrophone(seconds) {
    const ffmpeg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findFfmpeg"])();
    if (!ffmpeg) return "Error: The microphone could not be recorded.";
    const device = pickAudioDevice(await audioDeviceNames(ffmpeg));
    if (!device) return "Error: No microphone was found.";
    const dest = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), `fonia-mic-${Date.now()}.wav`);
    try {
        await execFileAsync(ffmpeg, [
            "-y",
            "-f",
            "dshow",
            "-i",
            `audio=${device}`,
            "-t",
            String(seconds),
            "-ac",
            "1",
            "-ar",
            "16000",
            dest
        ], {
            timeout: (seconds + 15) * 1000,
            env: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toolEnv"])()
        });
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dest) || __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(dest).size < 1000) return "Error: The microphone recording was empty.";
        return heardLine(await transcribeFile(dest));
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: The microphone could not be recorded. ${message.slice(0, 240)}`;
    } finally{
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(dest, {
            force: true
        });
    }
}
async function transcribeFile(filePath) {
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return `Error: Audio file not found: ${filePath}`;
    const whisper = findWhisper();
    if (!whisper?.command || !whisper.model) {
        return "Error: The speech model is not in the Fonia whisper folder, so the audio was not transcribed.";
    }
    try {
        const { stdout, stderr } = await execFileAsync(whisper.command, [
            "-m",
            whisper.model,
            "-f",
            filePath,
            "-nt",
            "-l",
            "en"
        ], {
            timeout: 120_000,
            maxBuffer: 1_000_000,
            env: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toolEnv"])()
        });
        const text = cleanTranscript([
            stdout,
            stderr
        ].map((part)=>part?.trim()).filter(Boolean).join("\n"));
        return text || "The speech model returned no words.";
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return `Error: The speech model could not transcribe that file. ${message.slice(0, 300)}`;
    }
}
/** A drive letter D–Z, empty when the only removable drive should be used, or REFUSE. */ function ejectLetter(target) {
    const trimmed = target.trim().toLowerCase();
    if (!trimmed || /^(?:the\s+)?(?:usb|flash|thumb|pen|stick|drive|removable)(?:\s+drive)?$/.test(trimmed)) return "";
    if (/^(?:c:?|c\s+drive)$/.test(trimmed) || /\b(format|wipe|erase|delete|shutdown)\b/.test(trimmed)) return "REFUSE";
    const match = trimmed.match(/^([d-z]):?$/) || trimmed.match(/^drive\s+([d-z]):?$/) || trimmed.match(/^([d-z])\s+drive$/);
    return match ? match[1].toUpperCase() : "REFUSE";
}
/** Eject one DriveType 2 disk. Fixed disks, including C:, are never selected. */ function ejectScript(letter) {
    const wanted = /^[D-Z]$/.test(letter) ? `'${letter}:'` : "''";
    return [
        "$ErrorActionPreference = 'Stop'",
        `$wanted = ${wanted}`,
        "$disks = @(Get-CimInstance Win32_LogicalDisk -Filter \"DriveType=2\" | Where-Object { $_.DeviceID -match '^[D-Z]:$' })",
        "if ($wanted) {",
        "  $chosen = @($disks | Where-Object { $_.DeviceID -eq $wanted })",
        "  if ($chosen.Count -eq 0) { Write-Output \"Error: $wanted is not a removable flash drive, so nothing was ejected.\"; return }",
        "} else {",
        "  if ($disks.Count -eq 0) { Write-Output 'No flash drive is mounted.'; return }",
        "  if ($disks.Count -gt 1) {",
        "    $names = ($disks | ForEach-Object { $_.DeviceID }) -join ', '",
        "    Write-Output \"More than one flash drive is mounted ($names). Name the letter, for example eject E:.\"",
        "    return",
        "  }",
        "  $chosen = $disks",
        "}",
        "$id = [string]$chosen[0].DeviceID",
        "if ($id -notmatch '^[D-Z]:$') { Write-Output 'Error: Only a removable flash drive can be ejected. A fixed disk was left alone.'; return }",
        "$shell = New-Object -ComObject Shell.Application",
        "$item = $shell.NameSpace(17).ParseName($id + [char]92)",
        "if (-not $item) { Write-Output \"Error: Windows could not find $id to eject.\"; return }",
        "$item.InvokeVerb('Eject')",
        "Write-Output \"Ejected $id.\""
    ].join("\n");
}
async function releaseExtraApps() {
    const listed = await runPowerShell("Get-Process | ForEach-Object { \"{0}|{1}|{2}\" -f $_.ProcessName, $_.Id, [math]::Round($_.WorkingSet64/1MB,0) }", 20_000);
    if (listed.startsWith("Error:")) return listed;
    const apps = [];
    for (const line of listed.split(/\r?\n/)){
        const [name, pidText, memText] = line.split("|");
        const pid = Number(pidText);
        const memMB = Number(memText);
        if (!name || !Number.isFinite(pid) || !Number.isFinite(memMB)) continue;
        apps.push({
            name: name.trim(),
            pid,
            memMB
        });
    }
    const chosen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appsToClose"])(apps, process.pid);
    if (!chosen.length) {
        return "No extra application was large enough to close. The browser, the editor, Fonia, and Ollama stay running.";
    }
    const ids = chosen.map((app)=>app.pid).join(",");
    const stopped = await runPowerShell(`$ids = @(${ids}); foreach ($id in $ids) { $proc = Get-Process -Id $id -ErrorAction SilentlyContinue; if ($proc) { Stop-Process -Id $id -Force -ErrorAction SilentlyContinue; \"Closed: $($proc.ProcessName) pid=$id\" } }`, 20_000);
    const kept = "The browser, the editor, Fonia, and Ollama were left running.";
    return stopped.startsWith("Error:") ? `${stopped}\n${kept}` : `${stopped}\n${kept}`;
}
async function runComputerAction(action, target = "") {
    if (!ACTIONS.has(action)) return `Error: Unknown computer action: ${action}`;
    if (action === "bluetooth_status" || action === "bluetooth_on" || action === "bluetooth_off") {
        const mode = action === "bluetooth_on" ? "on" : action === "bluetooth_off" ? "off" : "status";
        const result = await runPowerShell(bluetoothScript(mode));
        if (mode === "status" && result.startsWith("Error:")) {
            const devices = await runPowerShell("Get-PnpDevice -Class Bluetooth -ErrorAction SilentlyContinue | ForEach-Object { \"$($_.Status) $($_.FriendlyName)\" }");
            if (!devices.startsWith("Error:") && devices !== "(no output)") return `Bluetooth devices:\n${devices}`;
        }
        return result;
    }
    if (action === "firewall_status") {
        return runPowerShell("Get-NetFirewallProfile | ForEach-Object { \"$($_.Name)=$($_.Enabled)\" }");
    }
    if (action === "firewall_on" || action === "firewall_off") {
        const enabled = action === "firewall_on" ? "True" : "False";
        const changed = await runPowerShell(`Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled ${enabled}; Get-NetFirewallProfile | ForEach-Object { \"$($_.Name)=$($_.Enabled)\" }`);
        return changed.startsWith("Error:") ? changed : `Firewall profiles:\n${changed}`;
    }
    if (action === "process_status" || action === "service_status") {
        const name = safeName(target);
        if (!name) return "Error: Name the process or service with letters, numbers, dots, or dashes only.";
        if (action === "service_status") {
            return runPowerShell(`$svc = Get-Service -Name '${name}' -ErrorAction SilentlyContinue; if (-not $svc) { "Not found: ${name}" } else { "$($svc.Name) $($svc.Status)" }`);
        }
        return runPowerShell(`$procs = @(Get-Process -Name '${name}' -ErrorAction SilentlyContinue); if ($procs.Count -eq 0) { "Not running: ${name}" } else { $procs | ForEach-Object { "$($_.ProcessName) pid=$($_.Id) memMB=$([math]::Round($_.WorkingSet64/1MB,1))" } }`);
    }
    if (action === "disk_space") {
        return runPowerShell("Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | ForEach-Object { $free=[math]::Round($_.FreeSpace/1GB,1); $size=[math]::Round($_.Size/1GB,1); \"$($_.DeviceID) free ${free}GB of ${size}GB\" }");
    }
    if (action === "eject_drive") {
        const letter = ejectLetter(target);
        if (letter === "REFUSE") return "Error: Only a removable flash drive can be ejected. A fixed disk was left alone.";
        return runPowerShell(ejectScript(letter), 20_000, true);
    }
    if (action === "memory_status") {
        return runPowerShell("$os = Get-CimInstance Win32_OperatingSystem; $free=[math]::Round($os.FreePhysicalMemory/1MB,1); $total=[math]::Round($os.TotalVisibleMemorySize/1MB,1); \"Free ${free}GB of ${total}GB\"");
    }
    if (action === "wifi_status") {
        return runPowerShell("netsh wlan show interfaces");
    }
    if (action === "network_status") return runPowerShell(componentScript("network"), 40_000);
    if (action === "components_status") return runPowerShell(componentScript("all"), 45_000);
    if (action === "battery_status") return runPowerShell(componentScript("battery"), 30_000);
    if (action === "cpu_status") return runPowerShell(componentScript("cpu"), 30_000);
    if (action === "gpu_status") return runPowerShell(componentScript("gpu"), 30_000);
    if (action === "display_status") return runPowerShell(componentScript("display"), 30_000);
    if (action === "audio_status") return runPowerShell(componentScript("audio"), 30_000);
    if (action === "printers_status") return runPowerShell(componentScript("printers"), 30_000);
    if (action === "camera_status") return runPowerShell(componentScript("camera"), 30_000);
    if (action === "power_status") return runPowerShell(componentScript("power"), 30_000);
    if (action === "startup_status") return runPowerShell(componentScript("startup"), 30_000);
    if (action === "programs_status") return runPowerShell(componentScript("programs", target), 40_000);
    if (action === "devices_status") return runPowerShell(componentScript("devices"), 40_000);
    if (action === "volume_status" || action === "volume_set" || action === "volume_mute" || action === "volume_unmute") {
        return runPowerShell(volumeScript(action, target), 20_000);
    }
    if (action === "sleep") {
        return runPowerShell("Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class FoniaPower { [DllImport(\"PowrProf.dll\")] public static extern bool SetSuspendState(bool hibernate, bool forceCritical, bool disableWakeEvent); }'; [FoniaPower]::SetSuspendState($false, $false, $false) | Out-Null; 'Sleep requested.'");
    }
    if (action === "restart") {
        return runPowerShell("shutdown.exe /r /t 5 /c \"Fonia is restarting this PC because you asked.\"; 'Restart starts in 5 seconds. Cancel it with: shutdown /a'");
    }
    if (action === "shutdown") {
        return runPowerShell("shutdown.exe /s /t 5 /c \"Fonia is shutting down this PC because you asked.\"; 'Shutdown starts in 5 seconds. Cancel it with: shutdown /a'");
    }
    if (action === "process_stop") {
        const name = safeName(target);
        if (!name) return "Error: Name the process with letters, numbers, dots, or dashes only.";
        if (PROTECTED_PROCESSES.has(name.toLowerCase())) return `Error: ${name} stays running so Windows can keep working.`;
        return runPowerShell(`$procs = @(Get-Process -Name '${name}' -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne ${process.pid} }); if ($procs.Count -eq 0) { "Not running: ${name}" } else { $procs | Stop-Process -Force; "Stopped: ${name} count=$($procs.Count)" }`);
    }
    if (action === "service_start" || action === "service_stop") {
        const name = safeName(target);
        if (!name) return "Error: Name the service with letters, numbers, dots, or dashes only.";
        if (PROTECTED_SERVICES.has(name.toLowerCase())) return `Error: ${name} stays as it is so Windows can keep working.`;
        const verb = action === "service_start" ? "Start-Service" : "Stop-Service";
        return runPowerShell(`try { ${verb} -Name '${name}' -ErrorAction Stop; $svc = Get-Service -Name '${name}'; "$($svc.Name) $($svc.Status)" } catch { throw }`);
    }
    if (action === "device_enable" || action === "device_disable") {
        if (/^(keyboard|mouse|display|monitor|screen|disk|drive)$/i.test(target.trim())) {
            return `Error: ${target.trim()} stays available so this PC can still be used.`;
        }
        return runPowerShell(deviceScript(action === "device_enable", target), 40_000);
    }
    if (action === "screenshot") {
        const ffmpeg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["findFfmpeg"])();
        if (!ffmpeg) return "Error: ffmpeg is not installed, so the screen cannot be captured.";
        const dest = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), `ollama-ui-shot-${Date.now()}.jpg`);
        try {
            await execFileAsync(ffmpeg, [
                "-y",
                "-f",
                "gdigrab",
                "-framerate",
                "1",
                "-i",
                "desktop",
                "-frames:v",
                "1",
                "-vf",
                "scale=1280:-1",
                dest
            ], {
                timeout: 20_000,
                env: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$videoFrames$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["toolEnv"])()
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            return `Error: Could not capture the screen. ${message.slice(0, 300)}`;
        }
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dest)) return "Error: The screenshot file was not created.";
        return `Screenshot: ${dest}`;
    }
    if (action === "speak") {
        const spoken = target.replace(/[^\x20-\x7E]/g, " ").trim().slice(0, 300);
        if (!spoken) return "Error: There is nothing to say.";
        const safe = spoken.replace(/'/g, "''");
        const result = await runPowerShell(`Add-Type -AssemblyName System.Speech; $voice = New-Object System.Speech.Synthesis.SpeechSynthesizer; $voice.Speak('${safe}'); 'Spoke.'`);
        return result.startsWith("Error:") ? result : "Spoke.";
    }
    if (action === "brightness_status" || action === "brightness_up" || action === "brightness_down" || action === "brightness_set") {
        const mode = action === "brightness_status" ? "status" : action.replace("brightness_", "");
        return runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["brightnessScript"])(mode, target), 25_000);
    }
    if (action === "theme_status" || action === "theme_dark" || action === "theme_light") {
        const mode = action === "theme_dark" ? "dark" : action === "theme_light" ? "light" : "status";
        return runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["themeScript"])(mode));
    }
    if (action === "defaults_status" || action === "defaults_open") {
        return runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultsScript"])(action === "defaults_open"));
    }
    if (action === "windows_update_status" || action === "windows_update_scan" || action === "windows_update_install") {
        const mode = action === "windows_update_scan" ? "scan" : action === "windows_update_install" ? "install" : "status";
        const timeout = mode === "status" ? 30_000 : 120_000;
        return runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updatesScript"])(mode), timeout);
    }
    if (action === "clipboard_read") {
        const raw = await runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clipboardScript"])(), 15_000, true);
        if (raw === "Clipboard: empty" || raw.startsWith("Error:")) return raw;
        const clipped = raw.slice(0, 2000);
        const shortened = raw.length > 2000 ? "\nClipboard text was shortened." : "";
        return `Clipboard:\n${clipped}${shortened}`;
    }
    if (action === "ui_type" || action === "ui_click") {
        return runPowerShell((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$systemControls$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["uiScript"])(action === "ui_type" ? "type" : "click", target), 20_000, true);
    }
    if (action === "listen") {
        const seconds = Math.min(30, Math.max(6, Number(target) || 12));
        const heard = await runPowerShell(listenScript(seconds), (seconds + 25) * 1000);
        if (speechEngineFailed(heard)) {
            if (!readFoniaSettings().whisperFallback) return "The speech recognizer failed. Whisper fallback is off in Settings.";
            return captureMicrophone(Math.min(seconds, 10));
        }
        return heard;
    }
    return transcribeFile(target.trim().replace(/^["']|["']$/g, ""));
}
function componentScript(section, filter = "") {
    const allowed = new Set([
        "all",
        "os",
        "cpu",
        "battery",
        "gpu",
        "display",
        "audio",
        "network",
        "printers",
        "camera",
        "power",
        "startup",
        "programs",
        "devices"
    ]);
    const want = allowed.has(section) ? section : "all";
    const safeFilter = filter.replace(/[^A-Za-z0-9 ._-]/g, "").slice(0, 40);
    return [
        "$ErrorActionPreference = 'Continue'",
        `$want = '${want}'`,
        `$filter = '${safeFilter.replace(/'/g, "")}'`,
        "function Keep($name) { $want -eq 'all' -or $want -eq $name }",
        "if (Keep 'os') { $os = Get-CimInstance Win32_OperatingSystem; $cs = Get-CimInstance Win32_ComputerSystem; \"OS: $($os.Caption) $($os.Version)\"; \"PC: $($cs.Manufacturer) $($cs.Model)\"; \"UptimeHours: $([math]::Round(((Get-Date) - $os.LastBootUpTime).TotalHours, 1))\" }",
        "if (Keep 'cpu') { $cpu = Get-CimInstance Win32_Processor | Select-Object -First 1; \"CPU: $($cpu.Name) cores=$($cpu.NumberOfCores) load=$($cpu.LoadPercentage)%\" }",
        "if (Keep 'os' -or (Keep 'battery') -or $want -eq 'all') { if ($want -eq 'all' -or $want -eq 'os') { $mem = Get-CimInstance Win32_OperatingSystem; $free=[math]::Round($mem.FreePhysicalMemory/1MB,1); $total=[math]::Round($mem.TotalVisibleMemorySize/1MB,1); \"Memory: free $($free)GB of $($total)GB\" } }",
        "if (Keep 'battery') { $batts = @(Get-CimInstance Win32_Battery -ErrorAction SilentlyContinue); $chargeWords = @{1='discharging';2='on AC';3='fully charged';4='low';5='critical';6='charging'}; if ($batts.Count -eq 0) { 'Battery: no battery reported' } else { $batts | ForEach-Object { $word = $chargeWords[[int]$_.BatteryStatus]; if (-not $word) { $word = $_.BatteryStatus }; \"Battery: charge=$($_.EstimatedChargeRemaining)% $word\" } } }",
        "if ((Keep 'gpu') -or (Keep 'display')) { Get-CimInstance Win32_VideoController | ForEach-Object { \"GPU: $($_.Name) screen=$($_.CurrentHorizontalResolution)x$($_.CurrentVerticalResolution)\" } }",
        "if ($want -eq 'all') { Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' | ForEach-Object { $freeD=[math]::Round($_.FreeSpace/1GB,1); $sizeD=[math]::Round($_.Size/1GB,1); \"Disk: $($_.DeviceID) free $($freeD)GB of $($sizeD)GB\" } }",
        "if (Keep 'audio') { Get-CimInstance Win32_SoundDevice | Select-Object -First 6 | ForEach-Object { \"Audio: $($_.Status) $($_.Name)\" } }",
        "if (Keep 'network') { $names = @{0='disconnected';1='connecting';2='connected';3='disconnecting';4='hardware missing';5='hardware disabled';6='hardware problem';7='media disconnected'}; Get-CimInstance Win32_NetworkAdapter -Filter 'PhysicalAdapter=True' | Where-Object { $null -ne $_.NetConnectionStatus } | Select-Object -First 8 | ForEach-Object { $label = $names[[int]$_.NetConnectionStatus]; if (-not $label) { $label = $_.NetConnectionStatus }; \"Network: $($_.Name) $label\" } }",
        "if (Keep 'printers') { $printers = @(Get-CimInstance Win32_Printer -ErrorAction SilentlyContinue | Select-Object -First 8); if ($printers.Count -eq 0) { 'Printers: none' } else { $printers | ForEach-Object { \"Printer: $($_.Name) default=$($_.Default)\" } } }",
        "if (Keep 'camera') { $cams = @(Get-PnpDevice -Class Camera -ErrorAction SilentlyContinue | Select-Object -First 6); if ($cams.Count -eq 0) { 'Camera: none reported' } else { $cams | ForEach-Object { \"Camera: $($_.Status) $($_.FriendlyName)\" } } }",
        "if (Keep 'power') { $scheme = (powercfg /getactivescheme) -join ' '; \"Power: $scheme\" }",
        "if ($want -eq 'all') { Get-PnpDevice -Class Bluetooth -ErrorAction SilentlyContinue | Select-Object -First 5 | ForEach-Object { \"BluetoothDevice: $($_.Status) $($_.FriendlyName)\" } }",
        "if (Keep 'startup') { Get-CimInstance Win32_StartupCommand -ErrorAction SilentlyContinue | Select-Object -First 15 | ForEach-Object { \"Startup: $($_.Name) :: $($_.Command)\" } }",
        "if (Keep 'programs') { $roots = 'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'; $apps = Get-ItemProperty $roots -ErrorAction SilentlyContinue | Where-Object { $_.DisplayName -and (-not $filter -or $_.DisplayName -like \"*$filter*\") } | Select-Object -First 25 DisplayName, DisplayVersion; if (-not $apps) { 'Programs: none matched' } else { $apps | ForEach-Object { \"Program: $($_.DisplayName) $($_.DisplayVersion)\" } } }",
        "if (Keep 'devices') { foreach ($class in @('Keyboard','Mouse','Camera','Media','USB','Display')) { $rows = @(Get-PnpDevice -Class $class -ErrorAction SilentlyContinue | Where-Object { $_.Status -match 'OK|Unknown|Error|Degraded' }); $sample = ($rows | Select-Object -First 2 | ForEach-Object { \"$($_.Status) $($_.FriendlyName)\" }) -join ', '; \"DeviceClass: $class count=$($rows.Count) sample=$sample\" } }"
    ].join("\n");
}
function volumeScript(action, target) {
    const level = Math.min(100, Math.max(0, Number(target) || 0));
    const mode = action === "volume_set" ? "set" : action === "volume_mute" ? "mute" : action === "volume_unmute" ? "unmute" : "status";
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -TypeDefinition @'",
        "using System;",
        "using System.Runtime.InteropServices;",
        "[Guid(\"5CDF2C82-841E-4546-9722-0CF74078229A\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
        "interface IAudioEndpointVolume {",
        "  int RegisterControlChangeNotify(IntPtr client);",
        "  int UnregisterControlChangeNotify(IntPtr client);",
        "  int GetChannelCount(out uint count);",
        "  int SetMasterVolumeLevel(float level, Guid ctx);",
        "  int SetMasterVolumeLevelScalar(float level, Guid ctx);",
        "  int GetMasterVolumeLevel(out float level);",
        "  int GetMasterVolumeLevelScalar(out float level);",
        "  int SetChannelVolumeLevel(uint channel, float level, Guid ctx);",
        "  int SetChannelVolumeLevelScalar(uint channel, float level, Guid ctx);",
        "  int GetChannelVolumeLevel(uint channel, out float level);",
        "  int GetChannelVolumeLevelScalar(uint channel, out float level);",
        "  int SetMute([MarshalAs(UnmanagedType.Bool)] bool mute, Guid ctx);",
        "  int GetMute(out bool mute);",
        "}",
        "[Guid(\"D666063F-1587-4E43-81F1-B948E807363F\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
        "interface IMMDevice { int Activate(ref Guid id, int clsCtx, IntPtr activationParams, [MarshalAs(UnmanagedType.IUnknown)] out object pointer); }",
        "[Guid(\"A95664D2-9614-4F35-A746-DE8DB63617E6\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]",
        "interface IMMDeviceEnumerator { int EnumAudioEndpoints(int dataFlow, int stateMask, out IntPtr devices); int GetDefaultAudioEndpoint(int dataFlow, int role, out IMMDevice endpoint); }",
        "[ComImport, Guid(\"BCDE0395-E52F-467C-8E3D-C4579291692E\")] class MMDeviceEnumeratorComObject { }",
        "public class Speaker {",
        "  static IAudioEndpointVolume Volume() {",
        "    var enumerator = (IMMDeviceEnumerator)new MMDeviceEnumeratorComObject();",
        "    IMMDevice device; enumerator.GetDefaultAudioEndpoint(0, 1, out device);",
        "    var iid = typeof(IAudioEndpointVolume).GUID; object pointer;",
        "    device.Activate(ref iid, 23, IntPtr.Zero, out pointer);",
        "    return (IAudioEndpointVolume)pointer;",
        "  }",
        "  public static string Read() { float level; bool mute; var v = Volume(); v.GetMasterVolumeLevelScalar(out level); v.GetMute(out mute); return \"volume=\" + Math.Round(level * 100) + \" mute=\" + mute; }",
        `  public static string Apply(string mode, int level) { var v = Volume(); var ctx = Guid.Empty; if (mode == "mute") v.SetMute(true, ctx); else if (mode == "unmute") v.SetMute(false, ctx); else if (mode == "set") v.SetMasterVolumeLevelScalar(level / 100f, ctx); return Read(); }`,
        "}",
        "'@",
        `[Speaker]::Apply('${mode}', ${level})`
    ].join("\n");
}
function deviceScript(enable, query) {
    const safe = query.replace(/[^A-Za-z0-9 ._()/-]/g, "").trim().slice(0, 80);
    if (!safe) return "Write-Output 'Error: Name the device.'";
    const verb = enable ? "Enable-PnpDevice" : "Disable-PnpDevice";
    const done = enable ? "Enabled" : "Disabled";
    return [
        "$ErrorActionPreference = 'Continue'",
        `$q = '${safe.replace(/'/g, "")}'`,
        "$blocked = @('Keyboard','Mouse','Display','Computer','DiskDrive','HDC','SCSIAdapter','System')",
        "$found = @(Get-PnpDevice -ErrorAction SilentlyContinue | Where-Object { $_.FriendlyName -and ($_.FriendlyName -like \"*$q*\" -or $_.Class -eq $q) })",
        "if ($found.Count -eq 0) { \"No device matched: $q\"; exit 0 }",
        "$bad = @($found | Where-Object { $blocked -contains $_.Class })",
        "if ($bad.Count -gt 0) { \"Refused: $($bad[0].FriendlyName) is a $($bad[0].Class) device and stays available.\"; exit 0 }",
        "if ($found.Count -gt 3) { $list = ($found | Select-Object -First 8 | ForEach-Object { $_.FriendlyName }) -join ', '; \"Too many devices. Name one of: $list\"; exit 0 }",
        `foreach ($device in $found) { try { ${verb} -InstanceId $device.InstanceId -Confirm:$false -ErrorAction Stop; "${done}: $($device.FriendlyName)" } catch { "Error: $($device.FriendlyName) $($_.Exception.Message)" } }`
    ].join("\n");
}
function listenScript(seconds) {
    const initial = Math.min(30, Math.max(6, Math.round(seconds)));
    const babble = initial >= 12 ? 8 : 3;
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -AssemblyName System.Speech",
        "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
        "$engine.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))",
        "$engine.SetInputToDefaultAudioDevice()",
        `$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(${initial})`,
        `$engine.BabbleTimeout = [TimeSpan]::FromSeconds(${babble})`,
        "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(2)",
        "$result = $engine.Recognize()",
        "if ($null -eq $result -or [string]::IsNullOrWhiteSpace($result.Text)) { 'No speech recognized.' } else { \"Heard: $($result.Text)\" }",
        "$engine.Dispose()"
    ].join("; ");
}
}),
"[project]/lib/mediaTasks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractDocxXml",
    ()=>extractDocxXml,
    "extractPdfText",
    ()=>extractPdfText,
    "extractPptxXml",
    ()=>extractPptxXml,
    "frameIntervalSeconds",
    ()=>frameIntervalSeconds,
    "parseAppRequest",
    ()=>parseAppRequest,
    "readDocumentFile",
    ()=>readDocumentFile,
    "readDocxFile",
    ()=>readDocxFile,
    "readPptxFile",
    ()=>readPptxFile,
    "resolveInstalledApp",
    ()=>resolveInstalledApp,
    "videoIntervalFromText",
    ()=>videoIntervalFromText,
    "videoPathFromText",
    ()=>videoPathFromText
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/zlib [external] (zlib, cjs)");
;
;
;
;
;
const execFileAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execFile"]);
function frameIntervalSeconds(requested, fallback = 1) {
    const value = typeof requested === "number" ? requested : Number.parseFloat(String(requested ?? ""));
    if (!Number.isFinite(value)) return fallback;
    return Math.min(10, Math.max(0.5, value));
}
function videoIntervalFromText(text) {
    const match = text.match(/every\s+(\d+(?:\.\d+)?)\s*(?:s|sec|secs|second|seconds)\b/i);
    return frameIntervalSeconds(match?.[1], 1);
}
function videoPathFromText(text) {
    const labeled = text.match(/Video:\s*([^\r\n]+?\.(?:mp4|webm|mov|mkv))/i);
    const bare = text.match(/(?:[A-Za-z]:\\|\\\\|\.{1,2}[\\/])[^\r\n"<>|]+?\.(?:mp4|webm|mov|mkv)/i);
    const match = labeled?.[1] ?? bare?.[0];
    if (!match) return null;
    return match.trim().replace(/^["']|["']$/g, "");
}
function decodePdfLiteral(inner) {
    return inner.replace(/\\n/g, "\n").replace(/\\r/g, "").replace(/\\([()\\])/g, "$1").replace(/[^\x09\x0A\x0D\x20-\x7E]/g, " ").trim();
}
function textFromPdfChunk(raw) {
    const pieces = [];
    const literals = /\((?:\\\)|\\.|[^)]){1,}\)/g;
    for (const match of raw.match(/\((?:\\\)|\\.|[^)]){1,}\)\s*Tj/g) ?? []){
        const text = decodePdfLiteral(match.slice(1, match.lastIndexOf(")")));
        if (text) pieces.push(text);
    }
    for (const match of raw.match(/\[([\s\S]*?)\]\s*TJ/g) ?? []){
        const words = [];
        for (const part of match.match(literals) ?? []){
            const text = decodePdfLiteral(part.slice(1, -1));
            if (text) words.push(text);
        }
        if (words.length) pieces.push(words.join(" "));
    }
    return pieces.join(" ");
}
function extractPdfText(buffer) {
    const raw = buffer.toString("latin1");
    const parts = [
        textFromPdfChunk(raw)
    ];
    for (const match of raw.match(/stream\r?\n([\s\S]*?)endstream/g) ?? []){
        const body = match.replace(/^stream\r?\n/, "").replace(/endstream$/, "").replace(/[\r\n]+$/, "");
        const data = Buffer.from(body, "latin1");
        if (!data.length || data.length > 2_000_000) continue;
        for (const inflate of [
            __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].inflateSync,
            __TURBOPACK__imported__module__$5b$externals$5d2f$zlib__$5b$external$5d$__$28$zlib$2c$__cjs$29$__["default"].inflateRawSync
        ]){
            try {
                parts.push(textFromPdfChunk(inflate(data).toString("latin1")));
                break;
            } catch  {}
        }
    }
    return parts.filter(Boolean).join(" ").replace(/[ \t]{2,}/g, " ").trim();
}
function extractDocxXml(xml) {
    return xml.replace(/<w:p[^>]*>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\n{3,}/g, "\n\n").trim();
}
function extractPptxXml(xml) {
    return extractDocxXml(xml.replace(/<\/a:p>/g, "\n"));
}
function parseAppRequest(name) {
    const target = name.trim().replace(/^["']|["']$/g, "");
    if (!target) return {
        ok: false,
        reason: "No application was named."
    };
    if (/[;&|<>`$]/.test(target)) return {
        ok: false,
        reason: "The application name cannot include a shell command."
    };
    if (/shutdown|format|Remove-Item|Restart-Computer/i.test(target)) return {
        ok: false,
        reason: "That action is blocked."
    };
    return {
        ok: true,
        target
    };
}
function firstExisting(candidates) {
    return candidates.find((candidate)=>candidate && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(candidate)) ?? null;
}
function blenderExe() {
    const root = "C:\\Program Files\\Blender Foundation";
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(root)) return null;
    const direct = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(root, "blender.exe");
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(direct)) return direct;
    const versions = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(root).filter((entry)=>entry.toLowerCase().startsWith("blender")).sort().reverse();
    for (const version of versions){
        const exe = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(root, version, "blender.exe");
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(exe)) return exe;
    }
    return null;
}
function resolveInstalledApp(name) {
    const target = name.trim().replace(/^["']|["']$/g, "");
    if (/[\\/]/.test(target)) return target;
    const key = target.toLowerCase().replace(/\.exe$/i, "");
    const local = process.env.LOCALAPPDATA ?? "";
    const known = {
        blender: [],
        code: [
            __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(local, "Programs", "Microsoft VS Code", "Code.exe")
        ],
        vscode: [
            __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(local, "Programs", "Microsoft VS Code", "Code.exe")
        ],
        chrome: [
            "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
        ],
        msedge: [
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
            "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
        ],
        edge: [
            "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
            "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe"
        ]
    };
    if (key === "blender") return blenderExe() ?? target;
    return firstExisting(known[key] ?? []) ?? target;
}
async function readZipEntries(filePath, entryMatch) {
    const safe = filePath.replace(/'/g, "''");
    const command = [
        "Add-Type -AssemblyName System.IO.Compression.FileSystem",
        `$zip=[System.IO.Compression.ZipFile]::OpenRead('${safe}')`,
        `$entries=$zip.Entries | Where-Object { $_.FullName -like '${entryMatch}' } | Sort-Object FullName`,
        "$parts=New-Object System.Collections.Generic.List[string]",
        "foreach ($entry in $entries) {",
        "  $reader=New-Object System.IO.StreamReader($entry.Open())",
        "  $parts.Add($reader.ReadToEnd())",
        "  $reader.Close()",
        "}",
        "$zip.Dispose()",
        "$parts -join [char]10"
    ].join("; ");
    const { stdout } = await execFileAsync("powershell.exe", [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        command
    ], {
        maxBuffer: 2_000_000
    });
    return stdout || "";
}
async function readDocxFile(filePath) {
    return extractDocxXml(await readZipEntries(filePath, "word/document.xml"));
}
async function readPptxFile(filePath) {
    return extractPptxXml(await readZipEntries(filePath, "ppt/slides/slide*.xml"));
}
function readDocumentFile(filePath) {
    const lower = filePath.toLowerCase();
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) return `Error: File not found: ${filePath}`;
    if (lower.endsWith(".pdf")) {
        const text = extractPdfText(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath));
        return text;
    }
    if (lower.endsWith(".docx") || lower.endsWith(".pptx")) return "";
    return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, "utf-8").slice(0, 20_000);
}
}),
"[project]/lib/systemControls.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** PowerShell for the Windows controls that are not in the original component report. */ __turbopack_context__.s([
    "brightnessScript",
    ()=>brightnessScript,
    "clipboardScript",
    ()=>clipboardScript,
    "defaultsScript",
    ()=>defaultsScript,
    "themeScript",
    ()=>themeScript,
    "uiScript",
    ()=>uiScript,
    "updatesScript",
    ()=>updatesScript
]);
function brightnessScript(mode, level = "0") {
    const safeMode = [
        "status",
        "up",
        "down",
        "set"
    ].includes(mode) ? mode : "status";
    const safeLevel = Math.min(100, Math.max(0, Number(level) || 0));
    return [
        "$ErrorActionPreference = 'Continue'",
        "function Read-Level { $rows = @(Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightness -ErrorAction SilentlyContinue); if ($rows.Count -eq 0) { return $null }; return [int]$rows[0].CurrentBrightness }",
        "function Write-Level($value) { $value = [Math]::Min(100, [Math]::Max(0, [int]$value)); $methods = @(Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightnessMethods -ErrorAction SilentlyContinue); if ($methods.Count -eq 0) { return $false }; foreach ($method in $methods) { Invoke-CimMethod -InputObject $method -MethodName WmiSetBrightness -Arguments @{ Timeout = [uint32]1; Brightness = [byte]$value } | Out-Null }; return $true }",
        `$mode = '${safeMode}'`,
        "$current = Read-Level",
        "if ($null -eq $current) { 'Error: This display does not report a brightness level.'; exit 0 }",
        "if ($mode -eq 'status') { \"Brightness: $current%\"; exit 0 }",
        "$next = $current",
        `if ($mode -eq 'up') { $next = [Math]::Min(100, $current + 10) } elseif ($mode -eq 'down') { $next = [Math]::Max(0, $current - 10) } elseif ($mode -eq 'set') { $next = ${safeLevel} }`,
        "if (-not (Write-Level $next)) { 'Error: This display does not accept a brightness change.'; exit 0 }",
        "$after = Read-Level",
        "if ($null -eq $after) { $after = $next }",
        "\"Brightness: $after% was $current%\""
    ].join("\n");
}
function themeScript(mode) {
    const safeMode = mode === "dark" || mode === "light" ? mode : "status";
    const value = safeMode === "dark" ? 0 : 1;
    return [
        "$ErrorActionPreference = 'Continue'",
        "$path = 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize'",
        "if (-not (Test-Path $path)) { 'Error: Windows theme settings were not found.'; exit 0 }",
        `$mode = '${safeMode}'`,
        "if ($mode -ne 'status') {",
        `  Set-ItemProperty -Path $path -Name AppsUseLightTheme -Value ${value} -Type DWord`,
        `  Set-ItemProperty -Path $path -Name SystemUsesLightTheme -Value ${value} -Type DWord`,
        "  Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class ThemeBroadcast { [DllImport(\"user32.dll\", CharSet=CharSet.Auto)] public static extern IntPtr SendMessageTimeout(IntPtr hWnd, int msg, IntPtr wParam, string lParam, int flags, int timeout, out IntPtr result); }' | Out-Null",
        "  $result = [IntPtr]::Zero",
        "  [ThemeBroadcast]::SendMessageTimeout([IntPtr]0xffff, 0x001A, [IntPtr]::Zero, 'ImmersiveColorSet', 2, 1000, [ref]$result) | Out-Null",
        "}",
        "$item = Get-ItemProperty $path",
        "$apps = if ([int]$item.AppsUseLightTheme -eq 0) { 'dark' } else { 'light' }",
        "$system = if ([int]$item.SystemUsesLightTheme -eq 0) { 'dark' } else { 'light' }",
        "\"Theme: apps=$apps system=$system\""
    ].join("\n");
}
function defaultsScript(openSettings) {
    if (openSettings) {
        return "Start-Process 'ms-settings:defaultapps'; 'Opened Windows default app settings.'";
    }
    return [
        "$ErrorActionPreference = 'Continue'",
        "function Prog($label, $path) { if (Test-Path $path) { $id = (Get-ItemProperty $path -ErrorAction SilentlyContinue).ProgId; if (-not $id) { $id = 'unset' }; \"$label=$id\" } else { \"$label=unknown\" } }",
        "Prog 'http' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice'",
        "Prog 'https' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\https\\UserChoice'",
        "Prog 'mailto' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\mailto\\UserChoice'",
        "Prog 'pdf' 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.pdf\\UserChoice'",
        "'Defaults: changing a protected app such as the browser has to be done in Windows Settings. Fonia can open that page.'"
    ].join("\n");
}
function updatesScript(mode) {
    const safeMode = mode === "scan" || mode === "install" ? mode : "status";
    const lines = [
        "$ErrorActionPreference = 'Continue'",
        "$session = $null",
        "try { $session = New-Object -ComObject Microsoft.Update.Session } catch { 'Error: Windows Update is not available in this session.'; exit 0 }",
        "$searcher = $session.CreateUpdateSearcher()",
        "$reboot = Test-Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WindowsUpdate\\Auto Update\\RebootRequired'",
        "\"RebootRequired: $reboot\""
    ];
    if (safeMode === "status") {
        lines.push("$count = 0", "try { $count = $searcher.GetTotalHistoryCount() } catch { 'Update history is unavailable.'; exit 0 }", "$take = [Math]::Min(5, [int]$count)", "if ($take -le 0) { 'Updates: no history'; exit 0 }", "$history = $searcher.QueryHistory(0, $take)", "foreach ($entry in $history) { \"Update: $($entry.Date) $($entry.Title) result=$($entry.ResultCode)\" }");
    } else if (safeMode === "scan") {
        lines.push("$found = $searcher.Search(\"IsInstalled=0 and IsHidden=0 and Type='Software'\")", "\"Pending: $($found.Updates.Count)\"", "foreach ($update in $found.Updates) { \"PendingUpdate: $($update.Title)\" }");
    } else {
        lines.push("$found = $searcher.Search(\"IsInstalled=0 and IsHidden=0 and Type='Software'\")", "if ($found.Updates.Count -eq 0) { 'Pending: 0'; 'No updates to install.'; exit 0 }", "$installer = $session.CreateUpdateInstaller()", "$installer.Updates = $found.Updates", "$installer.AllowSourcePrompts = $false", "$result = $installer.Install()", "\"InstallResult: $($result.ResultCode) reboot=$($result.RebootRequired)\"", "'Windows may still ask to restart. Fonia did not schedule a restart.'");
    }
    return lines.join("\n");
}
function clipboardScript() {
    return [
        "$ErrorActionPreference = 'Continue'",
        "try { $text = Get-Clipboard -Raw -ErrorAction SilentlyContinue } catch { $text = '' }",
        "if ([string]::IsNullOrWhiteSpace($text)) { 'Clipboard: empty' } else { $text }"
    ].join("\n");
}
function uiScript(kind, target) {
    const splitAt = target.indexOf("|");
    const windowQuery = (splitAt === -1 ? target : target.slice(0, splitAt)).replace(/[^A-Za-z0-9 ._-]/g, "").slice(0, 40);
    const payload = (splitAt === -1 ? "" : target.slice(splitAt + 1)).slice(0, 180);
    if (!windowQuery) return "Write-Output 'Error: Name the window.'";
    if (/lock screen|bitlocker|sign-?\s*in/i.test(windowQuery)) {
        return "Write-Output 'Error: That window is the Windows sign-in screen, so nothing was typed or clicked.'";
    }
    const keys = payload.replace(/'/g, "").replace(/[+^%~(){}[\]]/g, (char)=>`{${char}}`);
    const button = payload.replace(/'/g, "").replace(/\bbutton\b/gi, "").trim().slice(0, 60);
    if (!keys && kind === "type") return "Write-Output 'Error: There is no text to type.'";
    if (!button && kind === "click") return "Write-Output 'Error: Name the control to click.'";
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -AssemblyName UIAutomationClient",
        "Add-Type -AssemblyName UIAutomationTypes",
        "Add-Type -AssemblyName System.Windows.Forms",
        "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class WinFocus { [DllImport(\"user32.dll\")] public static extern bool SetForegroundWindow(IntPtr hWnd); [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow); [DllImport(\"user32.dll\")] public static extern IntPtr GetForegroundWindow(); }'",
        `$query = '${windowQuery.replace(/'/g, "")}'`,
        "$root = [System.Windows.Automation.AutomationElement]::RootElement",
        "$windows = $root.FindAll([System.Windows.Automation.TreeScope]::Children, [System.Windows.Automation.Condition]::TrueCondition)",
        "$hits = @($windows | Where-Object { $_.Current.Name -and $_.Current.Name -like \"*$query*\" })",
        "if ($hits.Count -eq 0) { \"Error: No window matched: $query\"; exit 0 }",
        "if ($hits.Count -gt 3) { $names = ($hits | Select-Object -First 6 | ForEach-Object { $_.Current.Name }) -join ', '; \"Error: Too many windows. Name one of: $names\"; exit 0 }",
        "$window = $hits[0]",
        "$handle = [IntPtr]$window.Current.NativeWindowHandle",
        "[WinFocus]::ShowWindow($handle, 9) | Out-Null",
        "[WinFocus]::SetForegroundWindow($handle) | Out-Null",
        "Start-Sleep -Milliseconds 400",
        "$front = [WinFocus]::GetForegroundWindow()",
        "if ($front.ToInt64() -ne $handle.ToInt64()) { 'Error: The window did not come to the front, so nothing was typed or clicked.'; exit 0 }",
        kind === "type" ? `$keys = '${keys}'; [System.Windows.Forms.SendKeys]::SendWait($keys); "Typed into: $($window.Current.Name)"` : [
            `$buttonName = '${button.replace(/'/g, "")}'`,
            "$controls = $window.FindAll([System.Windows.Automation.TreeScope]::Descendants, [System.Windows.Automation.Condition]::TrueCondition)",
            "$control = @($controls | Where-Object { $_.Current.Name -and $_.Current.Name -like \"*$buttonName*\" } | Select-Object -First 1)",
            "if ($control.Count -eq 0) { \"Error: No control matched: $buttonName\"; exit 0 }",
            "$chosen = $control[0]",
            "try { $invoke = $chosen.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern); $invoke.Invoke(); \"Clicked: $($chosen.Current.Name) in $($window.Current.Name)\" } catch { \"Error: $($chosen.Current.Name) cannot be clicked. $($_.Exception.Message)\" }"
        ].join("\n")
    ].join("\n");
}
}),
"[project]/lib/videoFrames.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractVideoFrames",
    ()=>extractVideoFrames,
    "findFfmpeg",
    ()=>findFfmpeg,
    "toolEnv",
    ()=>toolEnv
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/util [external] (util, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediaTasks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mediaTasks.ts [app-route] (ecmascript)");
;
;
;
;
;
;
const execFileAsync = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$util__$5b$external$5d$__$28$util$2c$__cjs$29$__["promisify"])(__TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execFile"]);
function ffmpegInTree(dir, depth) {
    const candidates = [
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, "bin", "ffmpeg.exe"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, "ffmpeg.exe")
    ];
    for (const candidate of candidates){
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(candidate)) return candidate;
    }
    if (depth <= 0) return null;
    let entries = [];
    try {
        entries = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dir, {
            withFileTypes: true
        });
    } catch  {
        return null;
    }
    for (const entry of entries){
        if (!entry.isDirectory()) continue;
        const found = ffmpegInTree(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, entry.name), depth - 1);
        if (found) return found;
    }
    return null;
}
function findFfmpeg() {
    const dirs = [
        ...(process.env.PATH ?? "").split(";"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Links"),
        "C:\\ffmpeg\\bin",
        __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.env.ProgramFiles ?? "C:\\Program Files", "ffmpeg", "bin")
    ];
    for (const dir of dirs){
        const trimmed = dir.trim();
        if (!trimmed) continue;
        const exe = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(trimmed, "ffmpeg.exe");
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(exe)) return exe;
    }
    const packages = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.env.LOCALAPPDATA ?? "", "Microsoft", "WinGet", "Packages");
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(packages)) return null;
    let names = [];
    try {
        names = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(packages);
    } catch  {
        return null;
    }
    for (const name of names){
        if (!/ffmpeg/i.test(name)) continue;
        const found = ffmpegInTree(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(packages, name), 3);
        if (found) return found;
    }
    return null;
}
function toolEnv() {
    const ffmpeg = findFfmpeg();
    if (!ffmpeg) return process.env;
    const bin = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(ffmpeg);
    const current = process.env.PATH ?? "";
    const already = current.split(";").some((dir)=>dir.trim().toLowerCase() === bin.toLowerCase());
    if (already) return process.env;
    return {
        ...process.env,
        PATH: `${bin};${current}`
    };
}
async function extractVideoFrames(videoPath, intervalSeconds) {
    const interval = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mediaTasks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["frameIntervalSeconds"])(intervalSeconds, 1);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(videoPath)) return {
        frames: [],
        note: `Error: Video not found: ${videoPath}`
    };
    const ffmpeg = findFfmpeg();
    if (!ffmpeg) return {
        frames: [],
        note: "Error: ffmpeg is not installed, so the video cannot be split into frames yet."
    };
    const dir = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdtempSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), "ollama-ui-frames-"));
    const pattern = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, "frame-%03d.jpg");
    try {
        await execFileAsync(ffmpeg, [
            "-y",
            "-i",
            videoPath,
            "-vf",
            `fps=1/${interval}`,
            "-frames:v",
            "6",
            pattern
        ], {
            timeout: 60_000
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (/ENOENT|not recognized|not found/i.test(message)) {
            return {
                frames: [],
                note: "Error: ffmpeg is not installed, so the video cannot be split into frames yet."
            };
        }
        return {
            frames: [],
            note: `Error: Could not split the video. ${message.slice(0, 300)}`
        };
    }
    const frames = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(dir).filter((name)=>name.endsWith(".jpg")).sort().map((name)=>__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dir, name));
    return {
        frames,
        note: frames.length ? `Split ${videoPath} into ${frames.length} frame(s) every ${interval} second(s), without using a model.` : "Error: ffmpeg produced no frames."
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0vm60wc._.js.map