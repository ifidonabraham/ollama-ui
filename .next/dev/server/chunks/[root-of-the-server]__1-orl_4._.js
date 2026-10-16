module.exports = [
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("child_process", () => require("child_process"));

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
"[project]/app/api/terminal/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$commandRun$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/commandRun.ts [app-route] (ecmascript)");
;
;
// Commands that are too dangerous to allow
const BLOCKED_PATTERNS = [
    /rm\s+-rf\s+\//i,
    /format\s+[a-z]:/i,
    /del\s+\/[sqa]/i,
    /Remove-Item.*-Recurse.*-Force.*[Cc]:/i,
    /dd\s+if=/i
];
function isBlocked(cmd) {
    return BLOCKED_PATTERNS.some((p)=>p.test(cmd));
}
async function POST(req) {
    try {
        const body = await req.json();
        const { command, cwd } = body;
        if (!command || typeof command !== "string") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "command is required"
            }, {
                status: 400
            });
        }
        if (isBlocked(command)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Command blocked for safety reasons."
            }, {
                status: 403
            });
        }
        const workingDir = cwd && cwd.trim() ? cwd.trim() : process.env.HOME ?? "C:\\Users\\PC";
        const run = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$commandRun$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runCommandBounded"])(command, {
            cwd: workingDir,
            idleMs: 15_000,
            totalMs: 15_000,
            maxBytes: 512 * 1024
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            stdout: run.output,
            stderr: "",
            cwd: workingDir,
            error: run.stopped !== "" || run.code !== null && run.code !== 0
        });
    } catch (err) {
        console.error("[terminal]", err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal server error"
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/commandRun.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "quoteSpacedPaths",
    ()=>quoteSpacedPaths,
    "runCommandBounded",
    ()=>runCommandBounded,
    "runProcessBounded",
    ()=>runProcessBounded,
    "silenceNote",
    ()=>silenceNote,
    "totalNote",
    ()=>totalNote
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/child_process [external] (child_process, cjs)");
;
function duration(ms) {
    const seconds = Math.max(1, Math.round(ms / 1000));
    return `${seconds} ${seconds === 1 ? "second" : "seconds"}`;
}
function silenceNote(idleMs) {
    return `No output for ${duration(idleMs)}, so this was stopped. Try a different command. Do not run this same command again.`;
}
function totalNote(totalMs) {
    return `Stopped after ${duration(totalMs)}. The command was still running. Try a smaller command.`;
}
function killTree(child) {
    const pid = child.pid;
    if (!pid) return;
    try {
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["execFileSync"])("taskkill", [
            "/PID",
            String(pid),
            "/T",
            "/F"
        ], {
            windowsHide: true,
            stdio: "ignore"
        });
    } catch  {
        try {
            child.kill();
        } catch  {}
    }
}
/** A test runner's channel makes a child Node process wait instead of running. */ function childEnv(base) {
    const env = {
        ...base ?? process.env
    };
    delete env.NODE_CHANNEL_FD;
    delete env.NODE_TEST_CONTEXT;
    return env;
}
function runProcessBounded(file, args, options) {
    const idleMs = options.idleMs;
    const totalMs = options.totalMs;
    const maxBytes = options.maxBytes ?? 512 * 1024;
    return new Promise((resolve)=>{
        const child = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$child_process__$5b$external$5d$__$28$child_process$2c$__cjs$29$__["spawn"])(file, args, {
            cwd: options.cwd,
            env: childEnv(options.env),
            windowsHide: true,
            stdio: [
                "ignore",
                "pipe",
                "pipe"
            ]
        });
        let output = "";
        let settled = false;
        let code = null;
        const started = Date.now();
        let lastOutput = started;
        function push(chunk) {
            lastOutput = Date.now();
            output += typeof chunk === "string" ? chunk : chunk.toString("utf8");
            if (output.length > maxBytes) output = output.slice(-maxBytes);
        }
        child.stdout?.on("data", push);
        child.stderr?.on("data", push);
        function textFor(reason) {
            const trimmed = output.trim();
            if (reason === "idle") return [
                trimmed,
                silenceNote(idleMs)
            ].filter(Boolean).join("\n");
            if (reason === "total") return [
                trimmed,
                totalNote(totalMs)
            ].filter(Boolean).join("\n");
            if (trimmed) return trimmed;
            return code === 0 || code === null ? "(no output)" : "Command failed";
        }
        function finish(reason) {
            if (settled) return;
            settled = true;
            clearInterval(timer);
            if (reason) killTree(child);
            const send = ()=>resolve({
                    output: textFor(reason),
                    stopped: reason,
                    code
                });
            if (!reason || child.exitCode !== null) {
                send();
                return;
            }
            const force = setTimeout(send, 1000);
            child.once("exit", (exitCode)=>{
                code = exitCode;
                clearTimeout(force);
                send();
            });
        }
        const timer = setInterval(()=>{
            const now = Date.now();
            if (now - lastOutput >= idleMs) finish("idle");
            else if (now - started >= totalMs) finish("total");
        }, 100);
        child.on("error", (error)=>{
            output += `\n${error.message}`;
            finish("");
        });
        child.on("exit", (exitCode)=>{
            code = exitCode;
            setTimeout(()=>finish(""), 40);
        });
    });
}
function quoteSpacedPaths(command) {
    const joined = command.replace(/([A-Za-z]:\\(?:[^\\"\r\n]+\\)+)"([^"\r\n]+)"/g, (_full, folder, name)=>`"${folder}${name}"`);
    let out = "";
    let index = 0;
    while(index < joined.length){
        const mark = joined[index];
        if (mark === '"' || mark === "'") {
            const end = joined.indexOf(mark, index + 1);
            const stop = end === -1 ? joined.length : end + 1;
            out += joined.slice(index, stop);
            index = stop;
            continue;
        }
        const match = joined.slice(index).match(/^(?:[A-Za-z]:\\|\\\\)[^\r\n"'|&;<>]+/);
        if (!match) {
            out += mark;
            index += 1;
            continue;
        }
        let token = match[0];
        const flagAt = token.search(/\s+-\w/);
        let flags = "";
        if (flagAt > 0) {
            flags = token.slice(flagAt);
            token = token.slice(0, flagAt);
        }
        const trimmed = token.replace(/\s+$/, "");
        const rest = token.slice(trimmed.length);
        out += /\s/.test(trimmed) ? `"${trimmed}"` : trimmed;
        out += rest + flags;
        index += match[0].length;
    }
    return out;
}
function runCommandBounded(command, options = {}) {
    return runProcessBounded("powershell.exe", [
        "-NoProfile",
        "-NonInteractive",
        "-Command",
        quoteSpacedPaths(command)
    ], {
        cwd: options.cwd,
        env: options.env,
        idleMs: options.idleMs ?? 30_000,
        totalMs: options.totalMs ?? 180_000,
        maxBytes: options.maxBytes ?? 512 * 1024
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1-orl_4._.js.map