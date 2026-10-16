module.exports = [
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
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/fonia/connections/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$installedApps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/installedApps.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaSettings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/foniaSettings.ts [app-route] (ecmascript)");
;
;
;
async function GET() {
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$foniaSettings$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["readFoniaSettings"])();
    const connections = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$installedApps$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["inspectConnections"])().map((item)=>({
            ...item,
            enabled: item.id === "blender" ? settings.connectBlender : item.id === "metatrader" ? settings.connectMetatrader : item.id === "vm" ? settings.connectVm : item.id === "corel" ? settings.connectCorel : settings.connectAndroidStudio
        }));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        internetAccess: settings.internetAccess,
        connectExternalTools: settings.connectExternalTools,
        connections
    });
}
}),
"[project]/lib/appConnections.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Named programs Fonia may start itself. Paths are usual install folders, not a disk scan. */ __turbopack_context__.s([
    "APP_CONNECTIONS",
    ()=>APP_CONNECTIONS,
    "connectionBlock",
    ()=>connectionBlock,
    "connectionStance",
    ()=>connectionStance,
    "connectionStartedNote",
    ()=>connectionStartedNote,
    "knownExePaths",
    ()=>knownExePaths,
    "matchConnection",
    ()=>matchConnection
]);
const APP_CONNECTIONS = [
    {
        id: "blender",
        setting: "connectBlender",
        label: "Blender",
        defaultOn: true,
        aliases: [
            "blender"
        ]
    },
    {
        id: "metatrader",
        setting: "connectMetatrader",
        label: "MetaTrader 5",
        defaultOn: false,
        aliases: [
            "metatrader",
            "metatrader 5",
            "mt5",
            "terminal64"
        ]
    },
    {
        id: "vm",
        setting: "connectVm",
        label: "Virtual machine",
        defaultOn: false,
        aliases: [
            "virtualbox",
            "vbox",
            "vmware",
            "hyper-v",
            "hyperv",
            "virtual machine"
        ]
    },
    {
        id: "corel",
        setting: "connectCorel",
        label: "CorelDRAW",
        defaultOn: false,
        aliases: [
            "corel",
            "coreldraw",
            "corel draw",
            "coreldrw"
        ]
    },
    {
        id: "androidstudio",
        setting: "connectAndroidStudio",
        label: "Android Studio",
        defaultOn: false,
        aliases: [
            "android studio",
            "studio64"
        ]
    }
];
const EXE_PATHS = {
    blender: [
        "C:\\Program Files\\Blender Foundation\\Blender 5.1\\blender.exe"
    ],
    metatrader: [
        "C:\\Program Files\\MetaTrader 5\\terminal64.exe",
        "C:\\Program Files (x86)\\MetaTrader 5\\terminal64.exe"
    ],
    vm: [
        "C:\\Program Files\\Oracle\\VirtualBox\\VirtualBox.exe",
        "C:\\Program Files\\VMware\\VMware Workstation\\vmware.exe",
        "C:\\Program Files (x86)\\VMware\\VMware Workstation\\vmware.exe"
    ],
    corel: [
        "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7\\Draw\\CorelDRW.exe",
        "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7\\Programs\\CorelDRW.exe",
        "C:\\Program Files\\Corel\\CorelDRAW Graphics Suite\\Programs64\\CorelDRW.exe"
    ],
    androidstudio: [
        "C:\\Program Files\\Android\\Android Studio\\bin\\studio64.exe",
        "C:\\Program Files\\Android\\Android Studio1\\bin\\studio64.exe"
    ]
};
function knownExePaths(id) {
    return EXE_PATHS[id];
}
function normalizeAppName(name) {
    return name.trim().replace(/^["']|["']$/g, "").replace(/\.exe$/i, "").replace(/[_]+/g, " ").toLowerCase();
}
function matchConnection(name) {
    const key = normalizeAppName(name);
    if (!key) return null;
    const base = key.split(/[\\/]/).pop() ?? key;
    for (const rule of APP_CONNECTIONS){
        if (rule.aliases.some((alias)=>base === alias || key === alias)) return rule;
    }
    if (key.includes("terminal64")) return APP_CONNECTIONS.find((rule)=>rule.id === "metatrader") ?? null;
    if (key.includes("virtualbox") || key.includes("vmware")) return APP_CONNECTIONS.find((rule)=>rule.id === "vm") ?? null;
    if (key.includes("coreldrw") || key.includes("coreldraw")) return APP_CONNECTIONS.find((rule)=>rule.id === "corel") ?? null;
    if (key.includes("studio64") || key.includes("android studio")) return APP_CONNECTIONS.find((rule)=>rule.id === "androidstudio") ?? null;
    if (base === "blender" || key.endsWith("blender")) return APP_CONNECTIONS.find((rule)=>rule.id === "blender") ?? null;
    return null;
}
function connectionBlock(settings, name) {
    const rule = matchConnection(name);
    if (!settings.connectExternalTools) {
        return rule ? `${rule.label} stays closed. External tool connections are off in Settings.` : "External tool connections are off in Settings, so the program was not started.";
    }
    if (!rule) return "";
    if (!settings[rule.setting]) {
        return `${rule.label} is off in Settings. Turn that connection on, then ask again. Nothing was started.`;
    }
    return "";
}
function connectionStartedNote(name, appPath) {
    const rule = matchConnection(name);
    if (rule?.id === "vm") return `Started: ${appPath}. VirtualBox is open. A virtual machine was not powered on.`;
    if (rule?.id === "metatrader") return `Started: ${appPath}. MetaTrader 5 is open. No trade was placed.`;
    if (rule?.id === "corel") return `Started: ${appPath}. CorelDRAW is open. Fonia does not draw inside that window.`;
    if (rule?.id === "androidstudio") return `Started: ${appPath}. Android Studio is open.`;
    if (rule?.id === "blender") return `Started: ${appPath}. Opening Blender does not build a mesh. Ask for a shape when you want a .blend file.`;
    return `Started: ${appPath}`;
}
function connectionStance(settings) {
    if (!settings.connectExternalTools) {
        return "You are Fonia on this PC, in the open project. External programs are off. Your advantage is the project files and PowerShell. You are not a public web chatbot.";
    }
    const on = [];
    if (settings.connectBlender) on.push("Blender can open and can build one named shape into a .blend file");
    if (settings.connectMetatrader) on.push("MetaTrader 5 can open and a launch does not place a trade");
    if (settings.connectVm) on.push("VirtualBox can open and a guest is not powered on");
    if (settings.connectCorel) on.push("CorelDRAW can open when its program file is present");
    if (settings.connectAndroidStudio) on.push("Android Studio can open");
    const connected = on.length ? on.join(". ") + "." : "No named program is switched on.";
    return `You are Fonia on this PC, in the open project. You are not a public web chatbot. Connected: ${connected} Your advantage is the project files, PowerShell, and those connected programs. Leave a program that is off unstarted.`;
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
"[project]/lib/installedApps.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "inspectConnections",
    ()=>inspectConnections
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appConnections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appConnections.ts [app-route] (ecmascript)");
;
;
;
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
function firstExisting(paths) {
    return paths.find((candidate)=>candidate && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(candidate)) ?? "";
}
function noteFor(id, found, appPath) {
    if (id === "blender") {
        return found ? "Blender can open, and it can build one shape with bpy." : "Blender was not in C:\\Program Files\\Blender Foundation.";
    }
    if (id === "metatrader") {
        return found ? "MetaTrader 5 can open. A launch does not place a trade." : "terminal64.exe was not in C:\\Program Files\\MetaTrader 5.";
    }
    if (id === "vm") {
        return found ? `The virtual machine program is ${appPath}. Opening it does not power on a guest.` : "VirtualBox and VMware were not in their usual Program Files folders.";
    }
    if (id === "androidstudio") {
        return found ? "Android Studio can open." : "studio64.exe was not in the usual Android Studio folders.";
    }
    const suite = "C:\\Program Files (x86)\\Corel\\CorelDRAW Graphics Suite X7";
    if (found) return "CorelDRAW can open. Fonia does not draw inside the window.";
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(suite)) {
        return "CorelDRAW Graphics Suite X7 is on this PC, and CorelDRW.exe was not in the usual folder. The installer is not started.";
    }
    return "CorelDRW.exe was not in the usual Corel folders.";
}
function inspectConnections() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appConnections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["APP_CONNECTIONS"].map((rule)=>{
        const appPath = rule.id === "blender" ? blenderExe() ?? "" : firstExisting((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appConnections$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["knownExePaths"])(rule.id));
        return {
            id: rule.id,
            label: rule.label,
            found: Boolean(appPath),
            path: appPath,
            note: noteFor(rule.id, Boolean(appPath), appPath)
        };
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1rb-jx1._.js.map