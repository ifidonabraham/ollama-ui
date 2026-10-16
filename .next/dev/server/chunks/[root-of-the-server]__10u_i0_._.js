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
"[project]/app/api/fonia/settings/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaMic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/foniaMic.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaSettings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/foniaSettings.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaSettings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readFoniaSettings"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaMic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyMicMode"])(settings.micMode);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ...settings,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaMic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["micStatus"])()
    });
}
async function POST(req) {
    const body = await req.json().catch(()=>({}));
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaSettings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["writeFoniaSettings"])(body);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaMic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["applyMicMode"])(settings.micMode);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ...settings,
        ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaMic$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["micStatus"])()
    });
}
}),
"[project]/lib/foniaMic.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "applyMicMode",
    ()=>applyMicMode,
    "clearVoiceLive",
    ()=>clearVoiceLive,
    "micStatus",
    ()=>micStatus,
    "readVoiceLive",
    ()=>readVoiceLive,
    "stopMic",
    ()=>stopMic,
    "takeHeard",
    ()=>takeHeard,
    "voiceLivePath",
    ()=>voiceLivePath
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/os [external] (os, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
let child = null;
let mode = "push";
let scriptPath = "";
const heard = [];
function micStatus() {
    return {
        mode,
        running: Boolean(child && child.exitCode === null && !child.killed)
    };
}
function stopMic() {
    if (child && child.exitCode === null) child.kill();
    child = null;
    if (scriptPath) __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(scriptPath, {
        force: true
    });
    scriptPath = "";
}
function voiceLivePath() {
    return __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ".data", "voice-live.txt");
}
function clearVoiceLive() {
    const file = voiceLivePath();
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(file), {
        recursive: true
    });
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(file, "", "utf8");
}
function readVoiceLive() {
    try {
        return __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(voiceLivePath(), "utf8").replace(/^\uFEFF/, "").trim();
    } catch  {
        return "";
    }
}
function takeHeard() {
    const lines = heard.splice(0, heard.length).map((line)=>line.trim()).filter(Boolean);
    return lines.slice(-1);
}
function applyMicMode(next) {
    if (next === mode && (next === "push" || micStatus().running)) return;
    stopMic();
    mode = next;
    if (next === "push") return;
    scriptPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$os__$5b$external$5d$__$28$os$2c$__cjs$29$__["default"].tmpdir(), `fonia-mic-${Date.now()}.ps1`);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(scriptPath, next === "wake" ? wakeScript() : openScript(), "utf8");
    child = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])("powershell.exe", [
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        scriptPath
    ], {
        stdio: [
            "ignore",
            "pipe",
            "pipe"
        ],
        windowsHide: true
    });
    let buffer = "";
    child.stdout?.setEncoding("utf8");
    child.stdout?.on("data", (chunk)=>{
        buffer += chunk;
        const lines = buffer.split(/\r?\n/);
        buffer = lines.pop() ?? "";
        for (const line of lines){
            const text = line.trim();
            if (text.startsWith("Heard:")) heard.push(text.slice("Heard:".length).trim());
        }
    });
    child.on("exit", ()=>{
        child = null;
    });
}
function openScript() {
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -AssemblyName System.Speech",
        "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
        "$engine.LoadGrammar((New-Object System.Speech.Recognition.DictationGrammar))",
        "$engine.SetInputToDefaultAudioDevice()",
        "$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(8)",
        "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(1)",
        "while ($true) {",
        "  $result = $engine.Recognize()",
        "  if ($result -and -not [string]::IsNullOrWhiteSpace($result.Text)) { \"Heard: $($result.Text)\" }",
        "}"
    ].join("\n");
}
function wakeScript() {
    return [
        "$ErrorActionPreference = 'Stop'",
        "Add-Type -AssemblyName System.Speech",
        "$engine = New-Object System.Speech.Recognition.SpeechRecognitionEngine",
        "$engine.SetInputToDefaultAudioDevice()",
        "$wakeChoices = New-Object System.Speech.Recognition.Choices",
        "$wakeChoices.Add('fonia')",
        "$wake = New-Object System.Speech.Recognition.Grammar((New-Object System.Speech.Recognition.GrammarBuilder($wakeChoices)))",
        "$dictation = New-Object System.Speech.Recognition.DictationGrammar",
        "$engine.EndSilenceTimeout = [TimeSpan]::FromSeconds(1)",
        "$engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(12)",
        "while ($true) {",
        "  $engine.UnloadAllGrammars()",
        "  $engine.LoadGrammar($wake)",
        "  $spotted = $engine.Recognize()",
        "  if (-not $spotted -or $spotted.Text -notmatch 'fonia') { continue }",
        "  $engine.UnloadAllGrammars()",
        "  $engine.LoadGrammar($dictation)",
        "  $command = $engine.Recognize()",
        "  if ($command -and -not [string]::IsNullOrWhiteSpace($command.Text)) { \"Heard: $($command.Text)\" }",
        "}"
    ].join("\n");
}
}),
"[project]/lib/foniaSettings.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_FONIA_SETTINGS",
    ()=>DEFAULT_FONIA_SETTINGS,
    "mergeFoniaSettings",
    ()=>mergeFoniaSettings,
    "readFoniaSettings",
    ()=>readFoniaSettings,
    "writeFoniaSettings",
    ()=>writeFoniaSettings
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const FILE = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), ".data", "fonia-settings.json");
const BOOL_KEYS = [
    "understandFirst",
    "askBeforeConsequential",
    "holdGoal",
    "lookAfterUiEdit",
    "brainWhenRamFits",
    "closeExtraApps",
    "strongCoderOvernight",
    "whisperFallback",
    "showSteps",
    "internetAccess",
    "connectExternalTools",
    "connectBlender",
    "connectMetatrader",
    "connectVm",
    "connectCorel",
    "connectAndroidStudio"
];
const DEFAULT_FONIA_SETTINGS = {
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
    connectAndroidStudio: false
};
function clean(value) {
    if (!value) return {};
    const next = {};
    if (value.micMode === "open" || value.micMode === "wake" || value.micMode === "push") next.micMode = value.micMode;
    for (const key of BOOL_KEYS){
        if (typeof value[key] === "boolean") next[key] = value[key];
    }
    return next;
}
function mergeFoniaSettings(current, patch) {
    return {
        ...DEFAULT_FONIA_SETTINGS,
        ...clean(current),
        ...clean(patch)
    };
}
function readFoniaSettings() {
    try {
        const parsed = JSON.parse(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(FILE, "utf8"));
        return mergeFoniaSettings(parsed, {});
    } catch  {
        return {
            ...DEFAULT_FONIA_SETTINGS
        };
    }
}
function writeFoniaSettings(patch) {
    const settings = mergeFoniaSettings(readFoniaSettings(), patch);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(FILE), {
        recursive: true
    });
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(FILE, JSON.stringify(settings, null, 2));
    return settings;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__10u_i0_._.js.map