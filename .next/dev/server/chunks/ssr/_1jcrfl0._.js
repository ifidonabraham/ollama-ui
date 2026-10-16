module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Sidebar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWindow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ChatWindow.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FileBrowser$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FileBrowser.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TerminalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/TerminalPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommandPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommandPalette.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OCore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OCore.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/intent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/awayIntent.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/inferenceBudget.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directAction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/directAction.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function Home() {
    // ── Session state ─────────────────────────────────────────────────────────
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeSessionId, setActiveSessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [agentHistory, setAgentHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [systemPrompt, setSystemPromptState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // ── Model state ───────────────────────────────────────────────────────────
    const [models, setModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [freeMemoryMb, setFreeMemoryMb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [scheduler, setScheduler] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        queued_operations: 0,
        active_model: null,
        loaded_models: []
    });
    const [activeModel, setActiveModel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // ── Streaming ─────────────────────────────────────────────────────────────
    const [streaming, setStreaming] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [streamingContent, setStreamingContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // ── Workspace / folder ────────────────────────────────────────────────────
    const [workspace, setWorkspace] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedFilePaths, setSelectedFilePaths] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [contextFiles, setContextFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    // ── Panel ─────────────────────────────────────────────────────────────────
    const [activePanel, setActivePanel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("chat");
    const [sidebarCollapsed, setSidebarCollapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [terminalDock, setTerminalDock] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [paletteOpen, setPaletteOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // ── Ollama source tracking ────────────────────────────────────────────────
    const [ollamaSource, setOllamaSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("offline");
    // ── Load models (auto-refresh every 30s to pick up newly pulled models) ──
    const fetchModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (keepCurrent = true)=>{
        try {
            const r = await fetch("/api/models");
            const d = await r.json();
            const names = (d.models ?? []).map((m)=>m.name);
            setModels(names);
            setFreeMemoryMb(typeof d.free_memory_mb === "number" ? d.free_memory_mb : null);
            setScheduler(d.scheduler ?? {
                queued_operations: 0,
                active_model: null,
                loaded_models: []
            });
            setOllamaSource(names.length > 0 ? d.source ?? "local" : "offline");
            if (!keepCurrent || !activeModel) {
                if (names.length > 0) setActiveModel(names[0]);
            }
        } catch  {
            setOllamaSource("offline");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchModels(false);
        const interval = setInterval(()=>fetchModels(true), 30_000);
        return ()=>clearInterval(interval);
    }, [
        fetchModels
    ]);
    // ── Load sessions ─────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadSessions();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function onKey(event) {
            const key = event.key.toLowerCase();
            if ((event.ctrlKey || event.metaKey) && key === "k") {
                event.preventDefault();
                setPaletteOpen((open)=>!open);
            }
            if ((event.ctrlKey || event.metaKey) && key === "n" && !event.shiftKey) {
                event.preventDefault();
                void createNewSession();
            }
        }
        window.addEventListener("keydown", onKey);
        return ()=>window.removeEventListener("keydown", onKey);
    });
    async function loadSessions() {
        const res = await fetch("/api/sessions");
        const data = await res.json();
        setSessions(data.sessions ?? []);
    }
    async function loadSession(id) {
        const res = await fetch(`/api/sessions/${id}`);
        const data = await res.json();
        if (!data.session) return;
        setActiveSessionId(id);
        setMessages(data.messages ?? []);
        setAgentHistory(data.agent_messages ?? []);
        setActiveModel(data.session.model);
        setSystemPromptState(data.session.system_prompt ?? "");
    }
    async function createNewSession() {
        const modelToUse = activeModel || models[0];
        if (!modelToUse) return;
        const res = await fetch("/api/sessions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: modelToUse,
                title: "New Chat"
            })
        });
        const data = await res.json();
        if (data.session) {
            await loadSessions();
            await loadSession(data.session.id);
            setActivePanel("chat");
        }
    }
    async function deleteSession(id) {
        await fetch(`/api/sessions/${id}`, {
            method: "DELETE"
        });
        if (activeSessionId === id) {
            setActiveSessionId(null);
            setMessages([]);
            setAgentHistory([]);
        }
        await loadSessions();
    }
    async function renameSession(id, title) {
        await fetch(`/api/sessions/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title
            })
        });
        await loadSessions();
    }
    async function changeModel(model) {
        // Unload the previous model from RAM when switching (free memory)
        if (activeModel && activeModel !== model) {
            fetch("/api/unload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: activeModel
                })
            }).catch(()=>{});
        }
        setActiveModel(model);
        if (!activeSessionId) return;
        await fetch(`/api/sessions/${activeSessionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model
            })
        });
        await loadSessions();
    }
    async function updateSystemPrompt(prompt) {
        setSystemPromptState(prompt);
        if (!activeSessionId) return;
        await fetch(`/api/sessions/${activeSessionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                system_prompt: prompt
            })
        });
    }
    async function clearHistory() {
        if (!activeSessionId) return;
        await fetch(`/api/sessions/${activeSessionId}`, {
            method: "PUT"
        });
        setMessages([]);
    }
    // ── Stop generation ───────────────────────────────────────────────────────
    function stopGeneration() {
        abortRef.current?.abort();
    }
    // ── Workspace ─────────────────────────────────────────────────────────────
    async function openFolder(folderPath) {
        try {
            const res = await fetch(`/api/workspace?path=${encodeURIComponent(folderPath)}`);
            const data = await res.json();
            if (!res.ok) {
                alert(data.error ?? "Could not open folder");
                return;
            }
            setWorkspace({
                path: data.path,
                name: data.name,
                tree: data.tree
            });
            setSelectedFilePaths(new Set());
            setContextFiles([]);
        } catch  {
            alert("Failed to load folder");
        }
    }
    function closeFolder() {
        setWorkspace(null);
        setSelectedFilePaths(new Set());
        setContextFiles([]);
    }
    async function toggleFile(filePath, type, _node) {
        if (type === "dir") return;
        const newSelected = new Set(selectedFilePaths);
        if (newSelected.has(filePath)) {
            newSelected.delete(filePath);
            setSelectedFilePaths(newSelected);
            setContextFiles((prev)=>prev.filter((f)=>f.path !== filePath));
            return;
        }
        try {
            const res = await fetch("/api/workspace", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    files: [
                        filePath
                    ]
                })
            });
            const data = await res.json();
            const result = data.files?.[0];
            if (result?.error) {
                alert(result.error);
                return;
            }
            if (result) {
                newSelected.add(filePath);
                setSelectedFilePaths(newSelected);
                const fileName = filePath.split(/[\\/]/).pop() ?? filePath;
                setContextFiles((prev)=>[
                        ...prev,
                        {
                            path: filePath,
                            name: fileName,
                            content: result.content
                        }
                    ]);
            }
        } catch  {
            alert("Failed to read file");
        }
    }
    function removeContextFile(filePath) {
        const newSelected = new Set(selectedFilePaths);
        newSelected.delete(filePath);
        setSelectedFilePaths(newSelected);
        setContextFiles((prev)=>prev.filter((f)=>f.path !== filePath));
    }
    // ── Core stream function ──────────────────────────────────────────────────
    async function streamChat(sessionId, content, images) {
        const abort = new AbortController();
        abortRef.current = abort;
        setStreaming(true);
        setStreamingContent("");
        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    content,
                    model: activeModel,
                    images
                }),
                signal: abort.signal
            });
            if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let accumulated = "";
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, {
                    stream: true
                });
                for (const line of chunk.split("\n")){
                    if (!line.startsWith("data: ")) continue;
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.delta) {
                            accumulated += data.delta;
                            setStreamingContent(accumulated);
                        }
                        if (data.done) {
                            const assistantMsg = {
                                id: data.id,
                                role: "assistant",
                                content: accumulated,
                                models: data.models
                            };
                            setMessages((prev)=>[
                                    ...prev.filter((m)=>!m.id.startsWith("temp-")),
                                    assistantMsg
                                ]);
                            loadSession(sessionId);
                        }
                    } catch  {}
                }
            }
        } catch (err) {
            if (err?.name !== "AbortError") {
                setMessages((prev)=>[
                        ...prev,
                        {
                            id: "err-" + Date.now(),
                            role: "assistant",
                            content: "❌ Error connecting to Ollama. Is it running?"
                        }
                    ]);
            }
        } finally{
            setStreaming(false);
            setStreamingContent("");
            abortRef.current = null;
        }
    }
    // ── Auto model switching ──────────────────────────────────────────────────
    function pickBestModel(content, images, forAgent = false) {
        const lower = content.toLowerCase();
        const wordCount = lower.trim().split(/\s+/).length;
        const intent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["classifyIntent"])(content, Boolean(images?.length));
        const isVision = (m)=>[
                "llava",
                "moondream",
                "minicpm-v",
                "bakllava"
            ].some((p)=>m.toLowerCase().startsWith(p));
        const isCoder = (m)=>m.toLowerCase().includes("coder");
        const isGeneral = (m)=>!isCoder(m) && !isVision(m);
        const tiny = models.find((m)=>isCoder(m) && m.includes("1.5b"));
        const mid = models.find((m)=>isCoder(m) && /:3b\b/i.test(m));
        const small = models.find((m)=>isCoder(m) && m.includes("7b"));
        const general = models.find((m)=>isGeneral(m)); // qwen3:8b
        const llava = models.find((m)=>m.toLowerCase().startsWith("llava"));
        const dream = models.find((m)=>m.toLowerCase().startsWith("moondream"));
        const otherVision = models.filter((m)=>isVision(m) && m !== llava && m !== dream);
        // The same fit lines the server uses: 3B near 3800 MB, moondream near 2800 MB, 7B near 6200 MB.
        const canFit = (candidate)=>{
            if (!candidate) return false;
            if (freeMemoryMb === null) return /1\.5b/i.test(candidate);
            return freeMemoryMb >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateModelMb"])(candidate);
        };
        const firstFitting = (...candidates)=>candidates.find(canFit) ?? null;
        // Follow-ups such as "did you create it" are answered from the session log. Do not load a model for them.
        if (forAgent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["refersToPriorAction"])(content)) return null;
        // "run dir" and "read package.json" are executed by the server.
        if (forAgent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$directAction$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["directUserAction"])(content)) return null;
        // Documents, videos, and opening an installed app need a tool-capable coder. LLaVA is loaded only for the frames.
        if (forAgent && (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLocalComputerTask"])(content)) {
            const computerModel = firstFitting(small, mid, general, tiny);
            return computerModel && computerModel !== activeModel ? computerModel : null;
        }
        // Images get a vision pass first. The agent route then hands the result to a coder.
        if (images && images.length > 0) {
            const fittingVision = firstFitting(llava, dream, ...otherVision);
            return fittingVision && fittingVision !== activeModel ? fittingVision : null;
        }
        // Very short conversational messages should never wake a multi-gigabyte model.
        const casualTask = wordCount <= 6 && !/\b(code|file|folder|project|bug|error|help|explain|why|how|create|edit|run)\b/.test(lower) && !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["personIsSteppingAway"])(content);
        if (forAgent && casualTask) {
            const casualModel = firstFitting(general, tiny, small);
            return casualModel && casualModel !== activeModel ? casualModel : null;
        }
        if (forAgent && ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$intent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isSimpleAction"])(content, Boolean(images?.length)) || intent.needsWriteAccess)) {
            const simpleModel = firstFitting(small, mid, tiny);
            return simpleModel && simpleModel !== activeModel ? simpleModel : null;
        }
        const hasCodeKeyword = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create a file|script|compile|deploy|import|export|interface|type |enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/;
        const codeTask = hasCodeKeyword.test(lower) || /\b(create|edit|update|change|delete|remove|add|write|implement|run|test|debug)\b/.test(lower);
        const deepTask = intent.intent === "deep";
        // Deep tasks use a sequential planner and executor rather than loading 14B by default.
        if (deepTask) {
            // Deep work is planned by Qwen3 8B server-side, then executed by the 7B coder.
            // Keep 14B out of the default path because its load cost is disproportionate.
            const complexModel = firstFitting(small, mid, tiny);
            return complexModel && complexModel !== activeModel ? complexModel : null;
        }
        // Small edits can be handled quickly; normal coding uses the 7B coder.
        const minorEdit = /\b(rename|change the|replace|swap|update the|fix the|add a|remove the|delete the|move the|make it|set the|convert|just|only)\b/;
        if (codeTask && wordCount <= 20 && minorEdit.test(lower)) {
            const quickCodeModel = firstFitting(small, mid, tiny);
            return quickCodeModel && quickCodeModel !== activeModel ? quickCodeModel : null;
        }
        if (codeTask) {
            const codeModel = firstFitting(small, mid, tiny);
            return codeModel && codeModel !== activeModel ? codeModel : null;
        }
        // Short explanations and quick questions favor the general model.
        if (forAgent && (wordCount <= 16 || /\b(explain|what is|why|how does|summarize|compare|recommend|suggest)\b/.test(lower))) {
            const explanationModel = firstFitting(general, tiny, small);
            return explanationModel && explanationModel !== activeModel ? explanationModel : null;
        }
        return forAgent ? firstFitting(general, mid, small, tiny) ?? null : null;
    }
    // ── Send new message ──────────────────────────────────────────────────────
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (content, images)=>{
        if (!activeSessionId || streaming) return;
        // Auto-switch model if a better one exists for this task (never switch to vision in normal mode unless images present)
        const suggestedModel = pickBestModel(content, images, false);
        if (suggestedModel) {
            await changeModel(suggestedModel);
        }
        // Auto-name on first message
        const session = sessions.find((s)=>s.id === activeSessionId);
        if (session && session.title === "New Chat") {
            const autoTitle = content.replace(/\n<!-- images:\d+ -->$/, "").slice(0, 40) + (content.length > 40 ? "…" : "");
            await renameSession(activeSessionId, autoTitle);
        }
        // Prepend sidebar context files
        let finalContent = content;
        if (contextFiles.length > 0) {
            const blocks = contextFiles.map((f)=>{
                const ext = f.name.split(".").pop() ?? "";
                return `File: \`${f.name}\`\n\`\`\`${ext}\n${f.content}\n\`\`\``;
            });
            finalContent = blocks.join("\n\n") + "\n\n---\n\n" + content;
        }
        // Optimistic user message (show original, not the file dumps)
        const tempId = "temp-" + Date.now();
        const displayContent = images && images.length > 0 ? `${content}\n<!-- images:${images.length} -->` : content;
        setMessages((prev)=>[
                ...prev,
                {
                    id: tempId,
                    role: "user",
                    content: displayContent
                }
            ]);
        await streamChat(activeSessionId, finalContent, images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        activeSessionId,
        streaming,
        sessions,
        contextFiles,
        activeModel,
        models
    ]);
    // ── Edit & resend ─────────────────────────────────────────────────────────
    const resendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (messageId, newContent, images)=>{
        if (!activeSessionId || streaming) return;
        // Find the index of the edited message, truncate messages from there
        const idx = messages.findIndex((m)=>m.id === messageId);
        if (idx === -1) return;
        const updatedMessages = messages.slice(0, idx);
        setMessages(updatedMessages);
        // Also clear those messages from DB: delete session messages and re-add kept ones
        await fetch(`/api/sessions/${activeSessionId}`, {
            method: "PUT"
        });
        // Re-add kept messages by re-sending them silently (no — too complex)
        // Instead: just resend with the new content; history in DB will be appended
        const tempId = "temp-" + Date.now();
        const displayContent = images && images.length > 0 ? `${newContent}\n<!-- images:${images.length} -->` : newContent;
        setMessages((prev)=>[
                ...prev,
                {
                    id: tempId,
                    role: "user",
                    content: displayContent
                }
            ]);
        await streamChat(activeSessionId, newContent, images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        activeSessionId,
        streaming,
        messages,
        activeModel
    ]);
    // ── Regenerate last response ──────────────────────────────────────────────
    const regenerate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!activeSessionId || streaming) return;
        // Find the last user message
        const lastUser = [
            ...messages
        ].reverse().find((m)=>m.role === "user");
        if (!lastUser) return;
        // Remove last assistant message from UI
        setMessages((prev)=>{
            const last = [
                ...prev
            ].reverse().findIndex((m)=>m.role === "assistant");
            if (last === -1) return prev;
            const realIdx = prev.length - 1 - last;
            return prev.slice(0, realIdx);
        });
        const cleanContent = lastUser.content.replace(/\n<!-- images:\d+ -->$/, "");
        await streamChat(activeSessionId, cleanContent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        activeSessionId,
        streaming,
        messages,
        activeModel
    ]);
    // ── Insert from FileBrowser / Terminal ────────────────────────────────────
    function handleInsertToChat(text) {
        setActivePanel("chat");
        window.dispatchEvent(new CustomEvent("ollama-insert-text", {
            detail: text
        }));
    }
    const panelButtons = [
        {
            id: "chat",
            label: "Chat"
        },
        {
            id: "split",
            label: "Split"
        },
        {
            id: "terminal",
            label: "Terminal"
        }
    ];
    const showChat = activePanel === "chat" || activePanel === "split";
    const showTerminal = activePanel === "terminal" || terminalDock && activePanel !== "terminal";
    function freeRam() {
        void fetch("/api/unload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        }).then(()=>fetchModels(true));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fonia-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fonia-bg",
                "aria-hidden": "true",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OCore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCore"], {
                    size: 420,
                    animation: "full",
                    uid: "bg"
                }, void 0, false, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 484,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 483,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sessions: sessions,
                activeId: activeSessionId,
                workspace: workspace,
                selectedFiles: selectedFilePaths,
                collapsed: sidebarCollapsed,
                freeMemoryMb: freeMemoryMb,
                onToggleCollapse: ()=>setSidebarCollapsed((value)=>!value),
                onSelect: (id)=>{
                    loadSession(id);
                    setActivePanel("chat");
                },
                onNew: createNewSession,
                onDelete: deleteSession,
                onRename: renameSession,
                onOpenFolder: openFolder,
                onCloseFolder: closeFolder,
                onToggleFile: toggleFile
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fonia-stage",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fonia-top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "fonia-btn",
                                onClick: ()=>setSidebarCollapsed((value)=>!value),
                                title: "Collapse sidebar",
                                children: sidebarCollapsed ? "Show" : "Hide"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 505,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fonia-seg",
                                role: "tablist",
                                "aria-label": "Workspace",
                                children: panelButtons.map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        role: "tab",
                                        "aria-selected": activePanel === btn.id,
                                        className: activePanel === btn.id ? "is-active" : "",
                                        onClick: ()=>setActivePanel(btn.id),
                                        children: btn.label
                                    }, btn.id, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 510,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 508,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fonia-pills",
                                children: [
                                    activeModel && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fonia-pill",
                                        children: activeModel
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 523,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fonia-pill",
                                        children: freeMemoryMb == null ? "RAM —" : `RAM ${freeMemoryMb} MB`
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 524,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fonia-pill",
                                        children: [
                                            models.length,
                                            " models"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 525,
                                        columnNumber: 13
                                    }, this),
                                    scheduler.queued_operations > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fonia-pill",
                                        children: [
                                            scheduler.queued_operations,
                                            " running"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 526,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "fonia-btn",
                                        onClick: ()=>setTerminalDock((value)=>!value),
                                        children: terminalDock ? "Hide TTY" : "TTY"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 527,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "fonia-btn",
                                        onClick: ()=>fetchModels(true),
                                        title: "Refresh model list",
                                        children: "Refresh"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 530,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "fonia-btn",
                                        onClick: freeRam,
                                        title: "Unload models from RAM",
                                        children: "Free RAM"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 531,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 522,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column",
                            minHeight: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: showChat ? "flex" : "none",
                                    flex: 1,
                                    minHeight: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            flex: 1,
                                            minWidth: 0,
                                            minHeight: 0,
                                            flexDirection: "column"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ChatWindow$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            sessionId: activeSessionId,
                                            messages: messages,
                                            model: activeModel,
                                            models: models,
                                            streaming: streaming,
                                            streamingContent: streamingContent,
                                            initialAgentMessages: agentHistory,
                                            contextFiles: contextFiles,
                                            onSend: sendMessage,
                                            onResend: resendMessage,
                                            onRegenerate: regenerate,
                                            onModelChange: changeModel,
                                            pickModelForTask: (content, images)=>pickBestModel(content, images, true),
                                            onClearHistory: clearHistory,
                                            onSystemPromptChange: updateSystemPrompt,
                                            systemPrompt: systemPrompt,
                                            onRemoveContextFile: removeContextFile,
                                            onStopGeneration: stopGeneration,
                                            workspacePath: workspace?.path,
                                            ollamaSource: ollamaSource
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 538,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this),
                                    activePanel === "split" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: "42%",
                                            minWidth: 280,
                                            borderLeft: "1px solid rgba(63, 63, 70, 0.6)",
                                            display: "flex",
                                            minHeight: 0
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FileBrowser$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            onInsertToChat: handleInsertToChat
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 563,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 562,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 536,
                                columnNumber: 11
                            }, this),
                            showTerminal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flex: activePanel === "terminal" ? 1 : "0 0 200px",
                                    minHeight: 0,
                                    borderTop: "1px solid rgba(63, 63, 70, 0.6)"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TerminalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onInsertToChat: handleInsertToChat
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 535,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 503,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommandPalette$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                open: paletteOpen,
                onClose: ()=>setPaletteOpen(false),
                actions: [
                    {
                        id: "new",
                        label: "New session",
                        hint: "Ctrl+N",
                        run: ()=>void createNewSession()
                    },
                    {
                        id: "chat",
                        label: "Chat",
                        run: ()=>setActivePanel("chat")
                    },
                    {
                        id: "split",
                        label: "Split code view",
                        run: ()=>setActivePanel("split")
                    },
                    {
                        id: "terminal",
                        label: "Terminal",
                        run: ()=>setActivePanel("terminal")
                    },
                    {
                        id: "tty",
                        label: terminalDock ? "Hide live terminal" : "Show live terminal",
                        run: ()=>setTerminalDock((value)=>!value)
                    },
                    {
                        id: "settings",
                        label: "Settings",
                        run: ()=>window.dispatchEvent(new Event("fonia-open-settings"))
                    },
                    {
                        id: "ram",
                        label: "Purge VRAM",
                        hint: "Unload models",
                        run: freeRam
                    },
                    ...models.map((name)=>({
                            id: `model:${name}`,
                            label: `Switch model ${name}`,
                            hint: name,
                            run: ()=>void changeModel(name)
                        })),
                    ...sessions.slice(0, 12).map((session)=>({
                            id: `chat:${session.id}`,
                            label: session.title || "Untitled chat",
                            hint: session.model,
                            run: ()=>{
                                void loadSession(session.id);
                                setActivePanel("chat");
                            }
                        }))
                ]
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 574,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 482,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ChatWindow.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatWindow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/marked/lib/marked.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/highlight.js/es/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/answerModels.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modelRelay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/modelRelay.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webAsk$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/webAsk.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function shownReply(content) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webAsk$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeWebAsk"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modelRelay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeModelChoice"])(content).text).text;
}
function WebAskButtons({ content, onAllow, onSkip }) {
    const { url } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$webAsk$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeWebAsk"])(content);
    if (!url) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 8,
            alignItems: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 11,
                    color: "var(--text-secondary)"
                },
                children: "Internet is connected"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onAllow(url),
                style: {
                    background: "var(--accent)",
                    border: "none",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: 11
                },
                children: "Allow this page"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onSkip,
                style: {
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: 11
                },
                children: "Stay offline"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function ModelChoiceButtons({ content, onPick }) {
    const { choice } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$modelRelay$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["decodeModelChoice"])(content);
    const [picked, setPicked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    if (!choice) return null;
    const selected = picked || choice.failedModel;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 8,
            alignItems: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: {
                    fontSize: 11,
                    color: "var(--text-secondary)"
                },
                children: "Choose a model"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                value: selected,
                onChange: (event)=>setPicked(event.target.value),
                style: {
                    background: "var(--bg-panel)",
                    color: "var(--text-primary)",
                    border: "1px solid var(--border)",
                    borderRadius: 6,
                    padding: "4px 8px",
                    fontSize: 11,
                    maxWidth: 280
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                        value: choice.failedModel,
                        children: [
                            "Retry ",
                            choice.failedModel
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    choice.choices.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: item.name,
                            children: [
                                item.name,
                                " · ",
                                item.role
                            ]
                        }, item.name, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>onPick(selected),
                style: {
                    background: "var(--accent)",
                    border: "none",
                    color: "#fff",
                    borderRadius: 6,
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontSize: 11
                },
                children: "Use this model"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
// Vision-capable model detection
const VISION_PREFIXES = [
    "llava",
    "moondream",
    "minicpm-v",
    "bakllava",
    "cogvlm"
];
function isVisionModel(m) {
    return VISION_PREFIXES.some((p)=>m.toLowerCase().startsWith(p));
}
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].setOptions({
    breaks: true
});
// Extract <think>...</think> from content, return both parts
function extractThinking(content) {
    const match = content.match(/^<think>([\s\S]*?)<\/think>\s*([\s\S]*)$/);
    if (match) {
        return {
            thinking: match[1].trim(),
            answer: match[2].trim()
        };
    }
    // Partial thinking (still streaming — think block not closed yet)
    const openMatch = content.match(/^<think>([\s\S]*)$/);
    if (openMatch) {
        return {
            thinking: openMatch[1].trim(),
            answer: ""
        };
    }
    return {
        thinking: "",
        answer: content
    };
}
function renderMarkdown(content) {
    const clean = content.replace(/\n<!-- images:\d+ -->$/, "");
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$marked$2f$lib$2f$marked$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["marked"].parse(clean);
}
function AnsweredBy({ models, working = false, failed = false }) {
    const list = models ?? [];
    const text = list.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatAnswerModels"])(list) : working ? "choosing a model" : "not recorded";
    const label = working ? "Working" : failed ? "Tried" : "Answered";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 8
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "fonia-badge",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 152,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "fonia-mono",
                children: text
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
// ── Think block display ────────────────────────────────────────────────────
function ThinkBlock({ content, streaming }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (!content) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 10
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded((v)=>!v),
                style: {
                    background: "transparent",
                    border: "1px solid var(--border)",
                    color: "var(--text-muted)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontStyle: "italic"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "#a78bfa",
                            fontSize: 13
                        },
                        children: "💭"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, this),
                    streaming && !expanded ? "Thinking…" : `Thought process`,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9
                        },
                        children: expanded ? "▲" : "▼"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 184,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 6,
                    padding: "10px 14px",
                    background: "#12111a",
                    border: "1px solid #2d2845",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#9d8fd4",
                    lineHeight: 1.7,
                    fontStyle: "italic",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxHeight: 300,
                    overflowY: "auto"
                },
                children: [
                    content,
                    streaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            opacity: 0.5
                        },
                        children: " ▋"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 206,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, this);
}
// ── Inline model picker ────────────────────────────────────────────────────
function ModelPicker({ model, models, onChange }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [dropPos, setDropPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const btnRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function close(e) {
            // Close if click is outside the button and the fixed dropdown
            const el = e.target;
            if (btnRef.current && btnRef.current.contains(el)) return;
            if (el.closest("[data-model-dropdown]")) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", close);
        return ()=>document.removeEventListener("mousedown", close);
    }, []);
    function handleOpen() {
        if (!open && btnRef.current) {
            const rect = btnRef.current.getBoundingClientRect();
            setDropPos({
                x: rect.left,
                y: rect.top
            }); // we'll open upward
        }
        setOpen((v)=>!v);
    }
    const shortName = model.split(":")[0] ?? model;
    const vision = isVisionModel(model);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                ref: btnRef,
                onClick: handleOpen,
                title: "Switch model",
                style: {
                    background: open ? "var(--bg-active)" : "transparent",
                    border: "1px solid " + (open ? "var(--accent)" : "var(--border)"),
                    color: open ? "var(--accent)" : "var(--text-secondary)",
                    borderRadius: 6,
                    padding: "3px 8px",
                    cursor: "pointer",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    whiteSpace: "nowrap"
                },
                children: [
                    vision ? "👁" : "🤖",
                    " ",
                    shortName,
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9
                        },
                        children: "▾"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 257,
                        columnNumber: 44
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-model-dropdown": "true",
                style: {
                    position: "fixed",
                    bottom: `calc(100vh - ${dropPos.y}px + 6px)`,
                    left: dropPos.x,
                    background: "var(--bg-panel)",
                    border: "1px solid var(--border)",
                    borderRadius: 8,
                    minWidth: 270,
                    zIndex: 99999,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
                    maxHeight: 340,
                    overflowY: "auto",
                    overflowX: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "6px 10px 5px",
                            fontSize: 10,
                            color: "var(--text-muted)",
                            borderBottom: "1px solid var(--border)",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            position: "sticky",
                            top: 0,
                            background: "var(--bg-panel)"
                        },
                        children: [
                            "Select Model (",
                            models.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 278,
                        columnNumber: 11
                    }, this),
                    models.map((m)=>{
                        const v = isVisionModel(m);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                onChange(m);
                                setOpen(false);
                            },
                            style: {
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                textAlign: "left",
                                background: m === model ? "var(--bg-active)" : "transparent",
                                border: "none",
                                color: m === model ? "var(--accent)" : "var(--text-secondary)",
                                padding: "9px 12px",
                                cursor: "pointer",
                                fontSize: 12,
                                borderLeft: m === model ? "2px solid var(--accent)" : "2px solid transparent",
                                boxSizing: "border-box"
                            },
                            onMouseEnter: (e)=>{
                                if (m !== model) e.currentTarget.style.background = "var(--bg-hover)";
                            },
                            onMouseLeave: (e)=>{
                                if (m !== model) e.currentTarget.style.background = "transparent";
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontWeight: m === model ? 600 : 400
                                    },
                                    children: [
                                        v ? "👁 " : "",
                                        m.split(":")[0]
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 304,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 10,
                                        color: "var(--text-muted)"
                                    },
                                    children: [
                                        m,
                                        v ? " · vision" : " · text only"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 305,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, m, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 290,
                            columnNumber: 15
                        }, this);
                    }),
                    models.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "10px 12px",
                            color: "var(--text-muted)",
                            fontSize: 12
                        },
                        children: "No models found — is Ollama running?"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 310,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 261,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 244,
        columnNumber: 5
    }, this);
}
// ── Single message bubble ──────────────────────────────────────────────────
function MessageBubble({ msg, isLast, streaming, onEdit, onRegenerate }) {
    const isUser = msg.role === "user";
    const cleanContent = msg.content.replace(/\n<!-- images:\d+ -->$/, "");
    const { thinking, answer } = extractThinking(cleanContent);
    const html = renderMarkdown(answer || cleanContent);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editValue, setEditValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(cleanContent);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ref.current?.querySelectorAll("pre code").forEach((block)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].highlightElement(block);
        });
    }, [
        html
    ]);
    const wrappedHtml = html.replace(/<pre>/g, `<div class="code-block-wrapper" style="position:relative"><button class="copy-btn" style="position:absolute;top:7px;right:8px;background:var(--bg-active);border:1px solid var(--border);color:var(--text-secondary);border-radius:4px;padding:2px 8px;cursor:pointer;font-size:10px;z-index:1;font-family:inherit">Copy</button><pre>`).replace(/<\/pre>/g, "</pre></div>");
    function handleCopy() {
        navigator.clipboard.writeText(cleanContent).catch(()=>{});
        setCopied(true);
        setTimeout(()=>setCopied(false), 1500);
    }
    function handleEditSubmit() {
        if (editValue.trim()) {
            onEdit(msg.id, editValue.trim());
        }
        setEditing(false);
    }
    // Display images attached to user message
    const imageCount = msg.content.match(/<!-- images:(\d+) -->/)?.[1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: isUser ? "row-reverse" : "row",
            gap: 10,
            marginBottom: 20,
            alignItems: "flex-start"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: isUser ? "var(--accent)" : "var(--bg-active)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    flexShrink: 0,
                    border: "1px solid var(--border)",
                    color: isUser ? "#fff" : "var(--text-secondary)",
                    fontWeight: 700
                },
                children: isUser ? "U" : "AI"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "82%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginBottom: 1
                        },
                        children: isUser ? "You" : "Assistant"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 393,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: isUser ? "var(--user-bubble)" : "transparent",
                            border: isUser ? "1px solid var(--border)" : "none",
                            borderRadius: 10,
                            padding: isUser ? "8px 12px" : "0"
                        },
                        children: [
                            imageCount && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--accent)",
                                    marginBottom: 6,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "🖼"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 407,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    imageCount,
                                    " image",
                                    parseInt(imageCount) > 1 ? "s" : "",
                                    " attached"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 406,
                                columnNumber: 13
                            }, this),
                            !isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnsweredBy, {
                                models: msg.models
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 411,
                                columnNumber: 23
                            }, this),
                            !isUser && thinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThinkBlock, {
                                content: thinking
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 414,
                                columnNumber: 35
                            }, this),
                            editing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 6
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        autoFocus: true,
                                        value: editValue,
                                        onChange: (e)=>setEditValue(e.target.value),
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                handleEditSubmit();
                                            }
                                            if (e.key === "Escape") setEditing(false);
                                        },
                                        rows: 3,
                                        style: {
                                            background: "var(--bg-input)",
                                            border: "1px solid var(--accent)",
                                            color: "var(--text-primary)",
                                            borderRadius: 6,
                                            padding: "6px 8px",
                                            fontSize: 13,
                                            resize: "vertical",
                                            outline: "none",
                                            fontFamily: "inherit",
                                            minWidth: 260
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 418,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: 6
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleEditSubmit,
                                                style: {
                                                    background: "var(--accent)",
                                                    border: "none",
                                                    color: "#fff",
                                                    borderRadius: 5,
                                                    padding: "4px 12px",
                                                    cursor: "pointer",
                                                    fontSize: 12
                                                },
                                                children: "Resend ↑"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditing(false),
                                                style: {
                                                    background: "none",
                                                    border: "1px solid var(--border)",
                                                    color: "var(--text-secondary)",
                                                    borderRadius: 5,
                                                    padding: "4px 10px",
                                                    cursor: "pointer",
                                                    fontSize: 12
                                                },
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 434,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 417,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: ref,
                                className: "prose",
                                style: {
                                    color: "var(--text-primary)"
                                },
                                dangerouslySetInnerHTML: {
                                    __html: wrappedHtml
                                },
                                onClick: (e)=>{
                                    const target = e.target;
                                    if (target.classList.contains("copy-btn")) {
                                        const pre = target.closest(".code-block-wrapper")?.querySelector("pre");
                                        if (pre) {
                                            navigator.clipboard.writeText(pre.innerText).catch(()=>{});
                                            target.textContent = "Copied!";
                                            setTimeout(()=>target.textContent = "Copy", 1500);
                                        }
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 444,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    !editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 2,
                            marginTop: 2
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleCopy,
                                style: {
                                    background: "none",
                                    border: "none",
                                    color: copied ? "var(--success)" : "var(--text-muted)",
                                    cursor: "pointer",
                                    fontSize: 10,
                                    padding: "2px 5px",
                                    borderRadius: 3
                                },
                                children: copied ? "✓ Copied" : "⎘ Copy"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, this),
                            isUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    setEditValue(cleanContent);
                                    setEditing(true);
                                },
                                disabled: streaming,
                                style: {
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-muted)",
                                    cursor: streaming ? "not-allowed" : "pointer",
                                    fontSize: 10,
                                    padding: "2px 5px",
                                    borderRadius: 3
                                },
                                title: "Edit and resend",
                                children: "✏ Edit"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 475,
                                columnNumber: 15
                            }, this),
                            !isUser && isLast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onRegenerate,
                                disabled: streaming,
                                style: {
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-muted)",
                                    cursor: streaming ? "not-allowed" : "pointer",
                                    fontSize: 10,
                                    padding: "2px 5px",
                                    borderRadius: 3
                                },
                                title: "Regenerate response",
                                children: "↺ Regenerate"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 486,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 392,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 372,
        columnNumber: 5
    }, this);
}
function StreamingBubble({ content, model }) {
    const { thinking, answer } = extractThinking(content);
    const isThinking = !!thinking && !answer; // still inside <think> block
    const displayContent = answer || (!thinking ? content : "");
    const html = renderMarkdown(displayContent + (isThinking ? "" : " ▋"));
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        ref.current?.querySelectorAll("pre code").forEach((block)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$highlight$2e$js$2f$es$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].highlightElement(block);
        });
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            gap: 10,
            marginBottom: 20,
            alignItems: "flex-start"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "var(--bg-active)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    flexShrink: 0,
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontWeight: 700
                },
                children: "AI"
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 515,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    maxWidth: "82%"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginBottom: 1
                        },
                        children: "Assistant"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 517,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnsweredBy, {
                        models: model ? [
                            {
                                name: model,
                                role: "chat"
                            }
                        ] : [],
                        working: true
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 518,
                        columnNumber: 9
                    }, this),
                    thinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThinkBlock, {
                        content: thinking,
                        streaming: isThinking
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 521,
                        columnNumber: 22
                    }, this),
                    displayContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: ref,
                        className: "prose",
                        style: {
                            color: "var(--text-primary)"
                        },
                        dangerouslySetInnerHTML: {
                            __html: html
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 525,
                        columnNumber: 11
                    }, this) : isThinking ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-muted)",
                            fontSize: 13
                        },
                        children: "▋"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 527,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 516,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 514,
        columnNumber: 5
    }, this);
}
function ToolEventBubble({ events, startOpen = false }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(startOpen);
    if (events.length === 0) return null;
    const filesRead = events.filter((event)=>event.type === "tool_call" && event.args?.path).map((event)=>event.args?.path).filter((filePath)=>Boolean(filePath));
    const calls = events.filter((event)=>event.type === "tool_call").length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 12
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded((v)=>!v),
                className: "fonia-btn",
                children: [
                    calls,
                    " step",
                    calls === 1 ? "" : "s",
                    filesRead.length ? ` · ${filesRead.length} file${filesRead.length === 1 ? "" : "s"}` : "",
                    expanded ? " · hide" : ""
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 556,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginTop: 6,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                },
                children: events.map((ev, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "var(--bg-panel)",
                            border: "1px solid var(--border)",
                            borderRadius: 6,
                            padding: "6px 10px",
                            fontSize: 11
                        },
                        children: [
                            ev.type === "thinking" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--text-muted)"
                                },
                                children: [
                                    "💭 ",
                                    ev.text
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 571,
                                columnNumber: 17
                            }, this),
                            ev.type === "model" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    color: "var(--success)",
                                    fontWeight: 600
                                },
                                children: [
                                    "● ",
                                    ev.model,
                                    " · ",
                                    ev.role
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 574,
                                columnNumber: 17
                            }, this),
                            ev.type === "tool_call" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--accent)",
                                            fontWeight: 600
                                        },
                                        children: [
                                            "▶ ",
                                            ev.tool
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 578,
                                        columnNumber: 19
                                    }, this),
                                    ev.args && Object.keys(ev.args).length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        style: {
                                            margin: "4px 0 0",
                                            fontSize: 10,
                                            color: "var(--text-secondary)",
                                            background: "var(--bg-input)",
                                            padding: "4px 6px",
                                            borderRadius: 4,
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-all",
                                            border: "none"
                                        },
                                        children: JSON.stringify(ev.args, null, 2)
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 580,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 577,
                                columnNumber: 17
                            }, this),
                            ev.type === "tool_result" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: /^(Error:|Command failed)|did not finish/i.test(ev.result ?? "") ? "fonia-fail" : "fonia-ok",
                                        children: /^(Error:|Command failed)|did not finish/i.test(ev.result ?? "") ? "Failed" : "Success"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 588,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            marginLeft: 8
                                        },
                                        className: "fonia-mono",
                                        children: ev.tool
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 591,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        style: {
                                            margin: "4px 0 0",
                                            fontSize: 10,
                                            color: "var(--text-secondary)",
                                            background: "var(--bg-input)",
                                            padding: "4px 6px",
                                            borderRadius: 4,
                                            whiteSpace: "pre-wrap",
                                            wordBreak: "break-all",
                                            maxHeight: 160,
                                            overflow: "auto",
                                            border: "none",
                                            fontFamily: "var(--mono)"
                                        },
                                        children: ev.result
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 592,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 587,
                                columnNumber: 17
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 566,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 564,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 555,
        columnNumber: 5
    }, this);
}
function DiffView({ diff: diffEvent, onAccept, onReject }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const lines = diffEvent.diff.split("\n");
    const fileName = diffEvent.path.split(/[\\/]/).pop() ?? diffEvent.path;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 10,
            border: "1px solid var(--border)",
            borderRadius: 8,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px",
                    background: "var(--bg-active)",
                    cursor: "pointer"
                },
                onClick: ()=>setExpanded((v)=>!v),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12
                        },
                        children: "📄"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: "var(--text-secondary)",
                            flex: 1,
                            fontFamily: "monospace"
                        },
                        children: fileName
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)"
                        },
                        children: expanded ? "▲" : "▼"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 624,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 620,
                columnNumber: 7
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxHeight: 300,
                            overflowY: "auto",
                            background: "#0d1117"
                        },
                        children: lines.map((line, i)=>{
                            const isAdd = line.startsWith("+ ");
                            const isDel = line.startsWith("- ");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "1px 10px",
                                    background: isAdd ? "#0d2b0d" : isDel ? "#2b0d0d" : "transparent",
                                    color: isAdd ? "#3fb950" : isDel ? "#f85149" : "var(--text-muted)",
                                    fontFamily: "ui-monospace, monospace",
                                    fontSize: 11,
                                    lineHeight: 1.6,
                                    whiteSpace: "pre-wrap",
                                    wordBreak: "break-all"
                                },
                                children: line
                            }, i, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 633,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 628,
                        columnNumber: 11
                    }, this),
                    (onAccept || onReject) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 6,
                            padding: "6px 10px",
                            background: "var(--bg-panel)",
                            borderTop: "1px solid var(--border)"
                        },
                        children: [
                            onAccept && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onAccept,
                                style: {
                                    background: "#1a3a1a",
                                    border: "1px solid var(--success)",
                                    color: "var(--success)",
                                    borderRadius: 5,
                                    padding: "3px 12px",
                                    cursor: "pointer",
                                    fontSize: 11
                                },
                                children: "✓ Accept"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 647,
                                columnNumber: 28
                            }, this),
                            onReject && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: onReject,
                                style: {
                                    background: "#2a1010",
                                    border: "1px solid var(--danger)",
                                    color: "var(--danger)",
                                    borderRadius: 5,
                                    padding: "3px 12px",
                                    cursor: "pointer",
                                    fontSize: 11
                                },
                                children: "✕ Reject"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 648,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 646,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 627,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 619,
        columnNumber: 5
    }, this);
}
function ChatWindow({ sessionId, messages, model, models, streaming, streamingContent, initialAgentMessages, contextFiles, onSend, onResend, onRegenerate, onModelChange, pickModelForTask, onClearHistory, onSystemPromptChange, systemPrompt, onRemoveContextFile, onStopGeneration, workspacePath, ollamaSource = "local" }) {
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showSystem, setShowSystem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [localSystemPrompt, setLocalSystemPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(systemPrompt);
    const [attachedImages, setAttachedImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [attachedDocs, setAttachedDocs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visionWarning, setVisionWarning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agentRunning, setAgentRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [queue, setQueue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const queueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const [agentIntentLabel, setAgentIntentLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const agentMode = true;
    const [agentEvents, setAgentEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [liveModels, setLiveModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [agentDraft, setAgentDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [agentStatus, setAgentStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [agentMessages, setAgentMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialAgentMessages);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        function loadSteps() {
            void fetch("/api/fonia/settings").then((response)=>response.json()).then((data)=>setShowSteps(Boolean(data.showSteps))).catch(()=>{});
        }
        loadSteps();
        window.addEventListener("fonia-settings", loadSteps);
        return ()=>window.removeEventListener("fonia-settings", loadSteps);
    }, []);
    const [loadedModels, setLoadedModels] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [adjusterOn, setAdjusterOn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showSteps, setShowSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pendingDiffs, setPendingDiffs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // diffs waiting for accept/reject
    const [diffDecision, setDiffDecision] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [hearing, setHearing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const agentAbortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const agentJobRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const agentRunRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const agentRunningRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sendHeardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages,
        streamingContent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setAdjusterOn(window.localStorage.getItem("fonia-adjust") === "on");
    }, []);
    async function refreshLoadedModels() {
        try {
            const response = await fetch("/api/unload");
            const data = await response.json();
            setLoadedModels(data.models ?? []);
        } catch  {
            setLoadedModels([]);
        }
    }
    async function unloadModel(name) {
        await fetch("/api/unload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(name ? {
                model: name
            } : {})
        });
        await refreshLoadedModels();
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setInterval(async ()=>{
            try {
                const response = await fetch("/api/fonia/heard");
                if (!response.ok) return;
                const data = await response.json();
                const line = data.lines?.[0]?.trim();
                if (line) sendHeardRef.current(line);
            } catch  {}
        }, 2000);
        return ()=>clearInterval(timer);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLocalSystemPrompt(systemPrompt);
    }, [
        systemPrompt
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (agentJobRef.current) {
            void fetch("/api/agent/cancel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_id: agentJobRef.current
                })
            });
        }
        agentAbortRef.current?.abort();
        setAgentRunning(false);
        setAgentIntentLabel("");
        setAgentEvents([]);
        setLiveModels([]);
        setAgentDraft("");
        setAgentStatus("");
        setAgentMessages(initialAgentMessages);
    }, [
        sessionId,
        initialAgentMessages
    ]);
    // Show vision warning when images attached but model doesn't support vision
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setVisionWarning(attachedImages.length > 0 && !isVisionModel(model));
    }, [
        attachedImages,
        model
    ]);
    // ── Paste image from clipboard ──────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function handlePaste(e) {
            const items = e.clipboardData?.items;
            if (!items) return;
            for (const item of Array.from(items)){
                if (item.type.startsWith("image/")) {
                    e.preventDefault();
                    const file = item.getAsFile();
                    if (file) await processImageFile(file);
                }
            }
        }
        window.addEventListener("paste", handlePaste);
        return ()=>window.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    async function processImageFile(file) {
        const form = new FormData();
        form.append("file", file);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: form
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error ?? "Upload failed");
                return;
            }
            if (data.type === "image") {
                setAttachedImages((prev)=>[
                        ...prev,
                        {
                            base64: data.base64,
                            dataUrl: data.dataUrl,
                            name: data.name
                        }
                    ]);
            }
        } catch  {
            alert("Failed to upload image");
        }
    }
    async function processDocFile(file) {
        const form = new FormData();
        form.append("file", file);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: form
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.error ?? "Upload failed");
                return;
            }
            if (data.type === "video" && data.path) {
                setAttachedDocs((prev)=>[
                        ...prev,
                        {
                            name: data.name,
                            ext: data.ext,
                            content: "",
                            path: data.path,
                            kind: "video"
                        }
                    ]);
                return;
            }
            if (data.type === "document") {
                setAttachedDocs((prev)=>[
                        ...prev,
                        {
                            name: data.name,
                            ext: data.ext,
                            content: data.content,
                            kind: "document"
                        }
                    ]);
            }
        } catch  {
            alert("Failed to upload document");
        }
    }
    function handleImageInputChange(e) {
        const files = Array.from(e.target.files ?? []);
        files.forEach(processImageFile);
        e.target.value = "";
    }
    function handleFileInputChange(e) {
        const files = Array.from(e.target.files ?? []);
        files.forEach(processDocFile);
        e.target.value = "";
    }
    // ── Agent send (Claude Code style — model can read/write files and run commands) ──
    function rememberQueue(next) {
        queueRef.current = next;
        setQueue(next);
    }
    function stopAgentRun() {
        onStopGeneration();
        if (agentJobRef.current) {
            void fetch("/api/agent/cancel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    job_id: agentJobRef.current
                })
            });
        }
        agentAbortRef.current?.abort();
    }
    async function sendAgent(userMessage, images, selectedModel = model, modelLocked = false, force = false, allowWeb = false, confirmedMode = "", confirmedText = "") {
        if (!userMessage.trim()) return;
        if (agentRunningRef.current) {
            if (!force) return;
            stopAgentRun();
        }
        const outbound = confirmedText.trim() || userMessage;
        const routedModel = modelLocked ? selectedModel : selectedModel === model ? pickModelForTask(outbound, images) ?? selectedModel : selectedModel;
        const userEntry = {
            role: "user",
            content: userMessage,
            images
        };
        const newHistory = [
            ...agentMessages.map(({ toolEvents: _toolEvents, diffEvents: _diffEvents, models: _models, failed: _failed, images: _images, choices: _choices, choiceOriginal: _choiceOriginal, content, ...m })=>({
                    ...m,
                    content: shownReply(content)
                })),
            {
                role: "user",
                content: outbound
            }
        ];
        setAgentMessages((prev)=>[
                ...prev,
                {
                    ...userEntry
                }
            ]);
        const runId = agentRunRef.current + 1;
        agentRunRef.current = runId;
        agentRunningRef.current = true;
        setAgentRunning(true);
        const currentEvents = [];
        const currentModels = [];
        const currentDiffs = [];
        let assistantText = "";
        setLiveModels([]);
        setAgentDraft("");
        setAgentStatus("Checking the model server. A reply is coming.");
        // Fix: create abort controller and pass signal to fetch
        let aborted = false;
        let pendingChoices = null;
        const abort = new AbortController();
        agentAbortRef.current = abort;
        const jobId = crypto.randomUUID();
        agentJobRef.current = jobId;
        try {
            const res = await fetch("/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: newHistory,
                    model: routedModel,
                    system_prompt: systemPrompt,
                    workspace_path: workspacePath,
                    images,
                    session_id: sessionId,
                    job_id: jobId,
                    model_locked: modelLocked,
                    adjust_prompt: adjusterOn,
                    allow_web: allowWeb,
                    confirmed_mode: confirmedMode || undefined,
                    confirmed_text: confirmedText || undefined
                }),
                signal: abort.signal
            });
            if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            while(true){
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, {
                    stream: true
                });
                for (const line of chunk.split("\n")){
                    if (!line.startsWith("data: ")) continue;
                    try {
                        const data = JSON.parse(line.slice(6));
                        if (data.event === "status") {
                            setAgentStatus(String(data.text ?? ""));
                        } else if (data.event === "intent") {
                            setAgentIntentLabel(`${data.intent} · tools ${data.tools}`);
                        } else if (data.event === "plan") {
                            const models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["asAnswerModels"])(data.models);
                            setAgentMessages((prev)=>[
                                    ...prev,
                                    {
                                        role: "assistant",
                                        content: `**Planner handoff**\n\n${data.content}`,
                                        toolEvents: [],
                                        models: models.length ? models : [
                                            ...currentModels
                                        ]
                                    }
                                ]);
                        } else if (data.event === "review") {
                            const models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["asAnswerModels"])(data.models);
                            setAgentMessages((prev)=>[
                                    ...prev,
                                    {
                                        role: "assistant",
                                        content: `**Reviewer notes**\n\n${data.content}`,
                                        toolEvents: [],
                                        models: models.length ? models : [
                                            ...currentModels
                                        ]
                                    }
                                ]);
                        } else if (data.event === "model") {
                            const ev = {
                                type: "model",
                                model: data.model,
                                role: data.role
                            };
                            currentEvents.push(ev);
                            const entry = {
                                name: String(data.model ?? ""),
                                role: String(data.role ?? "")
                            };
                            if ((entry.name || entry.role) && !currentModels.some((item)=>item.name === entry.name && item.role === entry.role)) {
                                currentModels.push(entry);
                            }
                            setLiveModels([
                                ...currentModels
                            ]);
                            setAgentEvents([
                                ...currentEvents
                            ]);
                        } else if (data.event === "thinking") {
                            const ev = {
                                type: "thinking",
                                text: data.text
                            };
                            currentEvents.push(ev);
                            setAgentEvents([
                                ...currentEvents
                            ]);
                        } else if (data.event === "tool_call") {
                            const ev = {
                                type: "tool_call",
                                tool: data.tool,
                                args: data.args
                            };
                            currentEvents.push(ev);
                            setAgentEvents([
                                ...currentEvents
                            ]);
                        } else if (data.event === "verification") {
                            setAgentStatus(`${data.command}: ${data.status}`);
                        } else if (data.event === "tool_result") {
                            const ev = {
                                type: "tool_result",
                                tool: data.tool,
                                result: data.result
                            };
                            currentEvents.push(ev);
                            setAgentEvents([
                                ...currentEvents
                            ]);
                        } else if (data.event === "delta") {
                            assistantText += data.text;
                            setAgentDraft(assistantText);
                            setAgentEvents([
                                ...currentEvents
                            ]); // trigger re-render
                        } else if (data.event === "file_diff") {
                            const diff = {
                                path: data.path,
                                before: data.before,
                                after: data.after,
                                diff: data.diff
                            };
                            currentDiffs.push(diff);
                        } else if (data.event === "clarify") {
                            const options = Array.isArray(data.options) ? data.options : [];
                            pendingChoices = {
                                options,
                                original: String(data.original ?? "")
                            };
                        } else if (data.event === "done") {
                            assistantText = data.fullText || assistantText;
                            const models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["asAnswerModels"])(data.models);
                            const choices = pendingChoices;
                            pendingChoices = null;
                            setAgentMessages((prev)=>[
                                    ...prev,
                                    {
                                        role: "assistant",
                                        content: assistantText,
                                        toolEvents: [
                                            ...currentEvents
                                        ],
                                        diffEvents: [
                                            ...currentDiffs
                                        ],
                                        models: models.length ? models : [
                                            ...currentModels
                                        ],
                                        choices: choices?.options,
                                        choiceOriginal: choices?.original
                                    }
                                ]);
                            currentEvents.splice(0);
                            currentDiffs.splice(0);
                            setAgentEvents([]);
                            setLiveModels([]);
                            setAgentDraft("");
                        } else if (data.event === "error") {
                            const models = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["asAnswerModels"])(data.models);
                            setAgentMessages((prev)=>[
                                    ...prev,
                                    {
                                        role: "assistant",
                                        content: `❌ ${data.message}`,
                                        toolEvents: [
                                            ...currentEvents
                                        ],
                                        models: models.length ? models : currentModels.length ? [
                                            ...currentModels
                                        ] : __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NO_MODEL_ANSWER"],
                                        failed: true
                                    }
                                ]);
                        }
                    } catch  {}
                }
            }
        } catch (err) {
            if (err?.name === "AbortError") {
                aborted = true;
            } else {
                setAgentMessages((prev)=>[
                        ...prev,
                        {
                            role: "assistant",
                            content: "The agent could not finish. Check that the model server is running.",
                            toolEvents: [],
                            models: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NO_MODEL_ANSWER"],
                            failed: true
                        }
                    ]);
            }
        } finally{
            if (agentRunRef.current === runId) {
                agentRunningRef.current = false;
                setAgentRunning(false);
                setAgentIntentLabel("");
                setAgentEvents([]);
                setLiveModels([]);
                setAgentDraft("");
                setAgentStatus("");
                agentAbortRef.current = null;
                agentJobRef.current = null;
                const next = aborted ? undefined : queueRef.current[0];
                if (next) {
                    rememberQueue(queueRef.current.slice(1));
                    void sendAgent(next.text, next.images);
                }
            }
        }
    }
    function queueComposer(text, images) {
        const item = {
            id: crypto.randomUUID(),
            text,
            images
        };
        rememberQueue([
            ...queueRef.current,
            item
        ]);
        setInput("");
        setAttachedImages([]);
        setAttachedDocs([]);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setAgentStatus(`Queued. It starts when this run finishes. ${queueRef.current.length} waiting.`);
    }
    async function steerComposer(text) {
        const job = agentJobRef.current;
        if (!text.trim() || !agentRunningRef.current || !job) return;
        const response = await fetch("/api/agent/steer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                job_id: job,
                text
            })
        });
        if (!response.ok) {
            queueComposer(text);
            setAgentStatus("That run had already moved on, so the message was queued.");
            return;
        }
        setAgentMessages((prev)=>[
                ...prev,
                {
                    role: "user",
                    content: text
                }
            ]);
        setInput("");
        setAttachedImages([]);
        setAttachedDocs([]);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
        setAgentStatus("That note is in the current run. The goal stays open until the check passes, the work is blocked, or you press Stop.");
    }
    function dispatchAgent(text, images) {
        if (agentRunningRef.current) queueComposer(text, images);
        else void sendAgent(text, images);
    }
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const trimmed = input.trim();
        if (!trimmed && attachedImages.length === 0 && attachedDocs.length === 0 || streaming || !sessionId) return;
        // ── Slash commands ──────────────────────────────────────────────────────
        if (trimmed.startsWith("/")) {
            const [cmd, ...rest] = trimmed.slice(1).split(" ");
            const arg = rest.join(" ").trim();
            setInput("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            switch(cmd.toLowerCase()){
                case "diff":
                    dispatchAgent(`Run: git diff HEAD${arg ? ` -- ${arg}` : ""} and show me what changed`);
                    return;
                case "undo":
                    dispatchAgent("Run: git log --oneline -5 to show recent commits, then revert the last AI commit with git revert HEAD --no-edit");
                    return;
                case "log":
                    dispatchAgent("Run: git log --oneline -15 and show me the recent commit history");
                    return;
                case "add":
                    if (!arg) {
                        setAgentMessages((prev)=>[
                                ...prev,
                                {
                                    role: "assistant",
                                    content: "Usage: `/add <file or glob>` e.g. `/add src/components/Button.tsx`",
                                    toolEvents: [],
                                    models: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCAL_COMMAND_ANSWER"]
                                }
                            ]);
                        return;
                    }
                    dispatchAgent(`Read the file(s) matching "${arg}" and summarise what they contain so I have them in context`);
                    return;
                case "ls":
                    dispatchAgent(`List the directory: ${arg || workspacePath || "."}`);
                    return;
                case "run":
                    if (!arg) return;
                    dispatchAgent(`Run command: ${arg}`);
                    return;
                case "help":
                    setAgentMessages((prev)=>[
                            ...prev,
                            {
                                role: "assistant",
                                content: `**Slash commands:**\n- \`/diff [file]\` — show git diff\n- \`/undo\` — revert last AI commit\n- \`/log\` — git log last 15 commits\n- \`/add <file>\` — read file into context\n- \`/ls [path]\` — list directory\n- \`/run <command>\` — run any command\n- \`/help\` — show this list`,
                                toolEvents: [],
                                models: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCAL_COMMAND_ANSWER"]
                            }
                        ]);
                    return;
                default:
                    setAgentMessages((prev)=>[
                            ...prev,
                            {
                                role: "assistant",
                                content: `Unknown command: \`/${cmd}\`. Type \`/help\` for available commands.`,
                                toolEvents: [],
                                models: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$answerModels$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LOCAL_COMMAND_ANSWER"]
                            }
                        ]);
                    return;
            }
        }
        // Agent mode — route to agent API
        if ("TURBOPACK compile-time truthy", 1) {
            let agentContent = trimmed;
            if (attachedDocs.length > 0) {
                const docBlocks = attachedDocs.map((d)=>d.kind === "video" && d.path ? `Video: ${d.path}` : `File: \`${d.name}\`\n\`\`\`${d.ext.slice(1)}\n${d.content}\n\`\`\``);
                agentContent = docBlocks.join("\n\n") + (trimmed ? "\n\n---\n\n" + trimmed : "");
            }
            if (!agentContent) agentContent = "(image attached)";
            const imageBase64s = attachedImages.map((i)=>i.base64);
            if (agentRunningRef.current) {
                queueComposer(agentContent, imageBase64s.length > 0 ? imageBase64s : undefined);
                return;
            }
            const suggestedModel = pickModelForTask(agentContent, imageBase64s);
            if (suggestedModel) await onModelChange(suggestedModel);
            sendAgent(agentContent, imageBase64s.length > 0 ? imageBase64s : undefined, suggestedModel ?? model);
            setInput("");
            setAttachedImages([]);
            setAttachedDocs([]);
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            return;
        }
        //TURBOPACK unreachable
        ;
        // Build final content with doc attachments inline
        let finalContent;
        const imageBase64s = undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        input,
        attachedImages,
        attachedDocs,
        streaming,
        agentRunning,
        agentMode,
        sessionId,
        onSend,
        onModelChange,
        pickModelForTask
    ]);
    function handleKeyDown(e) {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            void steerComposer(input.trim());
            return;
        }
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }
    function autoResize(e) {
        setInput(e.target.value);
        const ta = e.target;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
    }
    function handleEdit(messageId, newContent) {
        onResend(messageId, newContent);
    }
    sendHeardRef.current = (text)=>{
        if (sessionId) void sendAgent(text);
    };
    async function pressListen() {
        setHearing(true);
        setAgentStatus("Listening…");
        try {
            const response = await fetch("/api/fonia/listen", {
                method: "POST"
            });
            const data = await response.json();
            if (data.text?.trim()) {
                setAgentStatus("");
                void sendAgent(data.text.trim());
            } else {
                setAgentStatus(data.message || "No speech recognized.");
            }
        } catch  {
            setAgentStatus("The microphone did not answer.");
        } finally{
            setHearing(false);
        }
    }
    const canSend = (input.trim() || attachedImages.length > 0 || attachedDocs.length > 0) && !streaming && !!sessionId;
    if (!sessionId) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
                color: "var(--text-muted)",
                height: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: 28,
                        fontWeight: 700,
                        color: "var(--text-primary)"
                    },
                    children: "Fonia"
                }, void 0, false, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 1218,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: 15,
                        fontWeight: 500,
                        color: "var(--text-secondary)"
                    },
                    children: "Start a new chat or select one"
                }, void 0, false, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 1219,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontSize: 12
                    },
                    children: [
                        models.length,
                        " model",
                        models.length !== 1 ? "s" : "",
                        " available"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 1220,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ChatWindow.tsx",
            lineNumber: 1217,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "8px 16px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                    background: "var(--bg-panel)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setShowSystem((v)=>!v),
                        className: "fonia-btn",
                        children: showSystem ? "Hide instructions" : "Instructions"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 12,
                            color: "var(--text-muted)"
                        },
                        children: model || "No model selected"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (confirm("Clear all messages?")) {
                                onClearHistory();
                                setAgentMessages([]);
                            }
                        },
                        className: "fonia-btn",
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1234,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1228,
                columnNumber: 7
            }, this),
            showSystem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "10px 16px",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--bg-input)",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            display: "block",
                            marginBottom: 4,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em"
                        },
                        children: "System Prompt"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1248,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                value: localSystemPrompt,
                                onChange: (e)=>setLocalSystemPrompt(e.target.value),
                                placeholder: "You are a helpful assistant...",
                                rows: 3,
                                style: {
                                    flex: 1,
                                    background: "var(--bg-panel)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text-primary)",
                                    borderRadius: 6,
                                    padding: "6px 10px",
                                    fontSize: 12,
                                    resize: "vertical",
                                    outline: "none",
                                    fontFamily: "inherit"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onSystemPromptChange(localSystemPrompt),
                                style: {
                                    background: "var(--accent)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: 6,
                                    padding: "6px 12px",
                                    cursor: "pointer",
                                    fontSize: 12,
                                    alignSelf: "flex-start"
                                },
                                children: "Save"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1257,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1249,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1247,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "16px 20px"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fonia-read",
                    children: [
                        messages.length === 0 && agentMessages.length === 0 && !streaming && !agentRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: "var(--text-muted)",
                                marginTop: 48,
                                fontSize: 14,
                                lineHeight: 1.6
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        color: "var(--text-primary)",
                                        fontSize: 16,
                                        marginBottom: 6
                                    },
                                    children: "Fonia"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1267,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Ask for a change, a check, or a file. A run stays open until the check passes, the work is blocked, or you press Stop."
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1268,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontSize: 12,
                                        marginTop: 8
                                    },
                                    children: "Enter queues the next message while a run is open. Ctrl+Enter steers the current one."
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1269,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1266,
                            columnNumber: 11
                        }, this),
                        !agentMode && messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageBubble, {
                                msg: m,
                                isLast: i === messages.length - 1,
                                streaming: streaming,
                                onEdit: handleEdit,
                                onRegenerate: onRegenerate
                            }, m.id, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1275,
                                columnNumber: 11
                            }, this)),
                        !agentMode && streaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StreamingBubble, {
                            content: streamingContent,
                            model: model
                        }, void 0, false, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1278,
                            columnNumber: 37
                        }, this),
                        agentMode && agentMessages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: m.role === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fonia-user",
                                    children: m.content
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1284,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fonia-answer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnsweredBy, {
                                            models: m.models,
                                            failed: m.failed
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1287,
                                            columnNumber: 19
                                        }, this),
                                        m.toolEvents && m.toolEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolEventBubble, {
                                            events: m.toolEvents,
                                            startOpen: showSteps
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1288,
                                            columnNumber: 63
                                        }, this),
                                        m.diffEvents && m.diffEvents.map((d, di)=>{
                                            const key = `${i}:${di}:${d.path}`;
                                            const decision = diffDecision[key];
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffView, {
                                                        diff: d,
                                                        onAccept: decision ? undefined : ()=>setDiffDecision((prev)=>({
                                                                    ...prev,
                                                                    [key]: "kept"
                                                                })),
                                                        onReject: decision ? undefined : ()=>{
                                                            void fetch("/api/files/restore", {
                                                                method: "POST",
                                                                headers: {
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify({
                                                                    path: d.path,
                                                                    content: d.before
                                                                })
                                                            }).then(async (response)=>{
                                                                if (response.ok) setDiffDecision((prev)=>({
                                                                        ...prev,
                                                                        [key]: "restored"
                                                                    }));
                                                                else setAgentStatus("That file was not restored.");
                                                            });
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatWindow.tsx",
                                                        lineNumber: 1294,
                                                        columnNumber: 25
                                                    }, this),
                                                    decision === "kept" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "fonia-hint",
                                                        children: "Kept the change."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatWindow.tsx",
                                                        lineNumber: 1308,
                                                        columnNumber: 49
                                                    }, this),
                                                    decision === "restored" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "fonia-hint",
                                                        children: "Restored the previous file."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/ChatWindow.tsx",
                                                        lineNumber: 1309,
                                                        columnNumber: 53
                                                    }, this)
                                                ]
                                            }, key, true, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 1293,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "prose",
                                            style: {
                                                color: "var(--text-primary)"
                                            },
                                            dangerouslySetInnerHTML: {
                                                __html: renderMarkdown(shownReply(m.content))
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1313,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelChoiceButtons, {
                                            content: m.content,
                                            onPick: (nextModel)=>{
                                                const previousUser = [
                                                    ...agentMessages
                                                ].slice(0, i).reverse().find((entry)=>entry.role === "user");
                                                if (!previousUser) return;
                                                void onModelChange(nextModel);
                                                void sendAgent(shownReply(previousUser.content), previousUser.images, nextModel, true, true);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1314,
                                            columnNumber: 19
                                        }, this),
                                        m.choices && m.choices.length > 0 && !agentMessages.slice(i + 1).some((entry)=>entry.role === "user") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: m.choices.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: "fonia-choice",
                                                    onClick: ()=>{
                                                        if (option.id === "custom") {
                                                            setAgentStatus("Type what you mean. Nothing has been run.");
                                                            return;
                                                        }
                                                        void sendAgent(option.label, undefined, model, false, false, false, option.id, m.choiceOriginal || "");
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            children: option.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ChatWindow.tsx",
                                                            lineNumber: 1335,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: option.detail
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/ChatWindow.tsx",
                                                            lineNumber: 1336,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, option.id, true, {
                                                    fileName: "[project]/components/ChatWindow.tsx",
                                                    lineNumber: 1323,
                                                    columnNumber: 25
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1321,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WebAskButtons, {
                                            content: m.content,
                                            onAllow: ()=>{
                                                const previousUser = [
                                                    ...agentMessages
                                                ].slice(0, i).reverse().find((entry)=>entry.role === "user");
                                                if (!previousUser) return;
                                                void sendAgent(`${shownReply(previousUser.content)}\n\nThe user allowed the web for this run.`, previousUser.images, model, true, true, true);
                                            },
                                            onSkip: ()=>{
                                                const previousUser = [
                                                    ...agentMessages
                                                ].slice(0, i).reverse().find((entry)=>entry.role === "user");
                                                if (!previousUser) return;
                                                void sendAgent(`${shownReply(previousUser.content)}\n\nThe user said to stay offline. Finish the goal without the web.`, previousUser.images, model, true, true, false);
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/components/ChatWindow.tsx",
                                            lineNumber: 1341,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1286,
                                    columnNumber: 15
                                }, this)
                            }, i, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1282,
                                columnNumber: 11
                            }, this)),
                        agentMode && agentRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 22
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fonia-status",
                                    children: [
                                        "Working",
                                        agentIntentLabel ? ` · ${agentIntentLabel}` : ""
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1362,
                                    columnNumber: 15
                                }, this),
                                agentStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "fonia-status",
                                    children: agentStatus
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1363,
                                    columnNumber: 31
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AnsweredBy, {
                                    models: liveModels,
                                    working: true
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1364,
                                    columnNumber: 15
                                }, this),
                                agentEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolEventBubble, {
                                    events: agentEvents,
                                    startOpen: showSteps
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1365,
                                    columnNumber: 42
                                }, this),
                                agentDraft ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "prose",
                                    style: {
                                        color: "var(--text-primary)"
                                    },
                                    dangerouslySetInnerHTML: {
                                        __html: renderMarkdown(shownReply(agentDraft))
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1367,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 13,
                                        color: "var(--text-muted)"
                                    },
                                    children: "Working"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1369,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1361,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: bottomRef
                        }, void 0, false, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1374,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 1264,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1263,
                columnNumber: 7
            }, this),
            visionWarning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 16px",
                    background: "#2a1a00",
                    borderTop: "1px solid var(--warning)",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--warning)",
                            fontSize: 13
                        },
                        children: "⚠️"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1381,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            color: "var(--warning)"
                        },
                        children: [
                            "This picture goes to the vision model. ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: model
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1383,
                                columnNumber: 52
                            }, this),
                            " will not be asked to read it. If RAM is short, unload a loaded model first."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1382,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1380,
                columnNumber: 9
            }, this),
            (contextFiles.length > 0 || attachedDocs.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 16px 4px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 5,
                    borderTop: "1px solid var(--border)",
                    background: "var(--bg-input)",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            alignSelf: "center",
                            marginRight: 2
                        },
                        children: "Context:"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1391,
                        columnNumber: 11
                    }, this),
                    contextFiles.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                background: "var(--accent-dim)",
                                color: "var(--accent)",
                                borderRadius: 5,
                                padding: "2px 7px",
                                fontSize: 11,
                                border: "1px solid var(--accent-dim)"
                            },
                            children: [
                                "📄 ",
                                f.name,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onRemoveContextFile(f.path),
                                    style: {
                                        background: "none",
                                        border: "none",
                                        color: "var(--accent)",
                                        cursor: "pointer",
                                        fontSize: 11,
                                        padding: 0
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1395,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, f.path, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1393,
                            columnNumber: 13
                        }, this)),
                    attachedDocs.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 4,
                                background: "#1a2a1a",
                                color: "var(--success)",
                                borderRadius: 5,
                                padding: "2px 7px",
                                fontSize: 11,
                                border: "1px solid #2a4a2a"
                            },
                            children: [
                                d.kind === "video" ? "🎬" : "📄",
                                " ",
                                d.name,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setAttachedDocs((prev)=>prev.filter((_, j)=>j !== i)),
                                    style: {
                                        background: "none",
                                        border: "none",
                                        color: "var(--success)",
                                        cursor: "pointer",
                                        fontSize: 11,
                                        padding: 0
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/ChatWindow.tsx",
                                    lineNumber: 1401,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1399,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1390,
                columnNumber: 9
            }, this),
            attachedImages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 16px 4px",
                    display: "flex",
                    gap: 8,
                    borderTop: "1px solid var(--border)",
                    background: "var(--bg-input)",
                    flexShrink: 0,
                    flexWrap: "wrap"
                },
                children: attachedImages.map((img, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: "relative"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: img.dataUrl,
                                alt: img.name,
                                style: {
                                    width: 60,
                                    height: 60,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    border: "1px solid var(--border)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1413,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setAttachedImages((prev)=>prev.filter((_, j)=>j !== i)),
                                style: {
                                    position: "absolute",
                                    top: -4,
                                    right: -4,
                                    background: "var(--danger)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    width: 16,
                                    height: 16,
                                    cursor: "pointer",
                                    fontSize: 9,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: 0
                                },
                                children: "✕"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1418,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1411,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1409,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: imageInputRef,
                type: "file",
                accept: "image/*",
                multiple: true,
                hidden: true,
                onChange: handleImageInputChange
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".txt,.md,.json,.csv,.xml,.html,.ts,.tsx,.js,.jsx,.py,.go,.rs,.sh,.sql,.yaml,.yml,.toml,.pdf,.docx,.pptx,.mp4,.webm,.mov,.mkv",
                multiple: true,
                hidden: true,
                onChange: handleFileInputChange
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1429,
                columnNumber: 7
            }, this),
            loadedModels.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 14px",
                    borderTop: "1px solid var(--border)",
                    background: "var(--bg-input)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    alignItems: "center"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            color: "var(--text-secondary)"
                        },
                        children: "In memory"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1433,
                        columnNumber: 11
                    }, this),
                    loadedModels.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>void unloadModel(item.name),
                            title: `Unload ${item.name}`,
                            style: {
                                background: "var(--bg-panel)",
                                border: "1px solid var(--border)",
                                color: "var(--text-primary)",
                                borderRadius: 6,
                                padding: "2px 6px",
                                cursor: "pointer",
                                fontSize: 11
                            },
                            children: [
                                item.name,
                                " · ",
                                item.sizeMB,
                                " MB · unload"
                            ]
                        }, item.name, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1435,
                            columnNumber: 13
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>void unloadModel(),
                        style: {
                            background: "none",
                            border: "none",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            fontSize: 11
                        },
                        children: "Unload all"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1445,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1432,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fonia-dock",
                style: {
                    flexShrink: 0
                },
                children: [
                    hearing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 12px 0"
                        },
                        "aria-live": "polite",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "fonia-wave",
                                "aria-hidden": "true",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1459,
                                        columnNumber: 61
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1459,
                                        columnNumber: 69
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1459,
                                        columnNumber: 77
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1459,
                                        columnNumber: 85
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1459,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "fonia-mono",
                                children: "Listening"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1460,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1458,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ref: textareaRef,
                                value: input,
                                onChange: autoResize,
                                onKeyDown: handleKeyDown,
                                disabled: streaming,
                                placeholder: agentRunning ? "Queue with Enter. Steer this run with Ctrl+Enter." : "Message Fonia",
                                rows: 1,
                                style: {
                                    display: "block",
                                    width: "100%",
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-primary)",
                                    fontSize: 14,
                                    resize: "none",
                                    outline: "none",
                                    fontFamily: "inherit",
                                    lineHeight: 1.5,
                                    padding: "10px 12px 6px",
                                    minHeight: 22,
                                    maxHeight: 200,
                                    boxSizing: "border-box"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1464,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "5px 10px",
                                    borderTop: "1px solid var(--border)",
                                    gap: 4
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelPicker, {
                                        model: model,
                                        models: models,
                                        onChange: onModelChange
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1478,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 1,
                                            height: 16,
                                            background: "var(--border)",
                                            margin: "0 4px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1480,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fileInputRef.current?.click(),
                                        className: "fonia-btn",
                                        title: "Attach a document or video",
                                        children: "Attach"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1483,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>imageInputRef.current?.click(),
                                        className: "fonia-btn",
                                        title: "Attach a picture for the vision model",
                                        children: "Vision"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1484,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>void pressListen(),
                                        disabled: agentRunning || streaming,
                                        className: "fonia-btn",
                                        children: hearing ? "Hearing" : "Voice"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1485,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            const next = !adjusterOn;
                                            setAdjusterOn(next);
                                            window.localStorage.setItem("fonia-adjust", next ? "on" : "off");
                                        },
                                        className: "fonia-btn",
                                        title: "Let the 1.5B label an unclear message. It does not rewrite your words.",
                                        children: adjusterOn ? "Label on" : "Label"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1488,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1498,
                                        columnNumber: 13
                                    }, this),
                                    agentRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSend,
                                                disabled: !canSend,
                                                className: "fonia-btn",
                                                children: "Queue"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 1502,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>void steerComposer(input.trim()),
                                                disabled: !input.trim(),
                                                className: "fonia-btn",
                                                children: "Steer"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 1503,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1501,
                                        columnNumber: 15
                                    }, this),
                                    streaming || agentRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            stopAgentRun();
                                            agentRunningRef.current = false;
                                            setAgentRunning(false);
                                        },
                                        className: "fonia-btn",
                                        children: "Stop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1507,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSend,
                                        disabled: !canSend,
                                        className: "fonia-btn-primary",
                                        children: "Send"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1518,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1476,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1463,
                        columnNumber: 9
                    }, this),
                    queue.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            marginTop: 8
                        },
                        children: queue.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "fonia-chip",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Next ",
                                            index + 1,
                                            ": ",
                                            item.text.slice(0, 140)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1528,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "fonia-btn",
                                        onClick: ()=>rememberQueue(queueRef.current.filter((entry)=>entry.id !== item.id)),
                                        children: "Remove"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1529,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1527,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1525,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "fonia-hint",
                        style: {
                            padding: "0 12px 8px"
                        },
                        children: [
                            "Enter sends. Shift+Enter adds a line. Ctrl+Enter steers. Ctrl+K opens commands.",
                            ollamaSource === "offline" ? " Model server offline." : agentRunning ? " This run stays open until the check passes, the work is blocked, or you press Stop." : ""
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1537,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1456,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 1226,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/CommandPalette.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommandPalette
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function CommandPalette({ open, onClose, actions }) {
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cursor, setCursor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const matches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const needle = query.trim().toLowerCase();
        if (!needle) return actions;
        return actions.filter((action)=>`${action.label} ${action.hint ?? ""}`.toLowerCase().includes(needle));
    }, [
        actions,
        query
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!open) return;
        setQuery("");
        setCursor(0);
        const timer = window.setTimeout(()=>inputRef.current?.focus(), 0);
        return ()=>window.clearTimeout(timer);
    }, [
        open
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setCursor(0);
    }, [
        query
    ]);
    if (!open) return null;
    function choose(action) {
        if (!action) return;
        onClose();
        action.run();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fonia-palette-backdrop",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "fonia-palette",
            role: "dialog",
            "aria-label": "Command palette",
            onClick: (event)=>event.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    ref: inputRef,
                    value: query,
                    "aria-label": "Command",
                    placeholder: "Jump to a chat view, model, or action",
                    onChange: (event)=>setQuery(event.target.value),
                    onKeyDown: (event)=>{
                        if (event.key === "Escape") onClose();
                        if (event.key === "ArrowDown") {
                            event.preventDefault();
                            setCursor((value)=>Math.min(matches.length - 1, value + 1));
                        }
                        if (event.key === "ArrowUp") {
                            event.preventDefault();
                            setCursor((value)=>Math.max(0, value - 1));
                        }
                        if (event.key === "Enter") {
                            event.preventDefault();
                            choose(matches[cursor]);
                        }
                    }
                }, void 0, false, {
                    fileName: "[project]/components/CommandPalette.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fonia-palette-list",
                    children: [
                        matches.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "fonia-muted",
                            children: "Nothing matches."
                        }, void 0, false, {
                            fileName: "[project]/components/CommandPalette.tsx",
                            lineNumber: 77,
                            columnNumber: 36
                        }, this),
                        matches.map((action, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: index === cursor ? "fonia-palette-item is-active" : "fonia-palette-item",
                                onMouseEnter: ()=>setCursor(index),
                                onClick: ()=>choose(action),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: action.label
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommandPalette.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    action.hint && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "fonia-mono",
                                        children: action.hint
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommandPalette.tsx",
                                        lineNumber: 87,
                                        columnNumber: 31
                                    }, this)
                                ]
                            }, action.id, true, {
                                fileName: "[project]/components/CommandPalette.tsx",
                                lineNumber: 79,
                                columnNumber: 13
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommandPalette.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "fonia-hint",
                    children: "Enter runs the row. Esc closes. Ctrl+K opens this again."
                }, void 0, false, {
                    fileName: "[project]/components/CommandPalette.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/CommandPalette.tsx",
            lineNumber: 53,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/CommandPalette.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/FileBrowser.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FileBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const TEXT_EXTS = new Set([
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".md",
    ".mdx",
    ".txt",
    ".css",
    ".scss",
    ".html",
    ".xml",
    ".yaml",
    ".yml",
    ".toml",
    ".py",
    ".rs",
    ".go",
    ".java",
    ".c",
    ".cpp",
    ".h",
    ".sh",
    ".bat",
    ".ps1",
    ".sql",
    ".prisma",
    ".graphql"
]);
function fileIcon(item) {
    if (item.isDir) return "📁";
    const ext = item.ext ?? "";
    if ([
        ".ts",
        ".tsx"
    ].includes(ext)) return "🟦";
    if ([
        ".js",
        ".jsx"
    ].includes(ext)) return "🟨";
    if ([
        ".py"
    ].includes(ext)) return "🐍";
    if ([
        ".json"
    ].includes(ext)) return "📋";
    if ([
        ".md",
        ".mdx"
    ].includes(ext)) return "📝";
    if ([
        ".css",
        ".scss"
    ].includes(ext)) return "🎨";
    if ([
        ".html"
    ].includes(ext)) return "🌐";
    if ([
        ".sh",
        ".bat",
        ".ps1"
    ].includes(ext)) return "⚙️";
    if ([
        ".sql"
    ].includes(ext)) return "🗄️";
    return "📄";
}
function formatSize(bytes) {
    if (bytes === null) return "";
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
}
function FileBrowser({ onInsertToChat }) {
    const [listing, setListing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentPath, setCurrentPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("C:\\Users\\PC");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fileContent, setFileContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pathInput, setPathInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("C:\\Users\\PC");
    async function browse(p) {
        setLoading(true);
        setError(null);
        setFileContent(null);
        try {
            const res = await fetch(`/api/files?path=${encodeURIComponent(p)}&action=list`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Failed to list directory");
            setListing(data);
            setCurrentPath(data.path);
            setPathInput(data.path);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error");
        } finally{
            setLoading(false);
        }
    }
    async function readFile(p) {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/files?path=${encodeURIComponent(p)}&action=read`);
            const data = await res.json();
            if (!res.ok) throw new Error(data.error ?? "Failed to read file");
            setFileContent({
                path: data.path,
                content: data.content
            });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Error");
        } finally{
            setLoading(false);
        }
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        browse(currentPath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    function handleItemClick(item) {
        if (item.isDir) {
            browse(item.path);
        } else if (item.ext && TEXT_EXTS.has(item.ext)) {
            readFile(item.path);
        } else {
            setError("Binary file — cannot preview.");
        }
    }
    function handleInsert() {
        if (!fileContent) return;
        const lang = fileContent.path.split(".").pop() ?? "";
        const text = `File: \`${fileContent.path}\`\n\`\`\`${lang}\n${fileContent.content}\n\`\`\``;
        onInsertToChat(text);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "var(--bg-panel)",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "8px 10px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    gap: 6,
                    alignItems: "center",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: pathInput,
                        onChange: (e)=>setPathInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter") browse(pathInput);
                        },
                        style: {
                            flex: 1,
                            background: "var(--bg-input)",
                            border: "1px solid var(--border)",
                            color: "var(--text-primary)",
                            borderRadius: 5,
                            padding: "4px 8px",
                            fontSize: 11,
                            outline: "none",
                            fontFamily: "ui-monospace, monospace"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 136,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>browse(pathInput),
                        style: {
                            background: "var(--bg-active)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                            borderRadius: 5,
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontSize: 11
                        },
                        children: "Go"
                    }, void 0, false, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    listing?.parent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>browse(listing.parent),
                        title: "Go up",
                        style: {
                            background: "var(--bg-active)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                            borderRadius: 5,
                            padding: "4px 8px",
                            cursor: "pointer",
                            fontSize: 11
                        },
                        children: "↑"
                    }, void 0, false, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 167,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FileBrowser.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 10px",
                    background: "#2a1010",
                    color: "var(--danger)",
                    fontSize: 11,
                    borderBottom: "1px solid var(--border)",
                    flexShrink: 0
                },
                children: error
            }, void 0, false, {
                fileName: "[project]/components/FileBrowser.tsx",
                lineNumber: 186,
                columnNumber: 9
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "10px",
                    color: "var(--text-muted)",
                    fontSize: 12,
                    textAlign: "center"
                },
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/components/FileBrowser.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, this),
            fileContent ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "6px 10px",
                            borderBottom: "1px solid var(--border)",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            flexShrink: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setFileContent(null),
                                style: {
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-secondary)",
                                    cursor: "pointer",
                                    fontSize: 13
                                },
                                children: "← Back"
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    flex: 1,
                                    fontSize: 11,
                                    color: "var(--text-muted)",
                                    fontFamily: "monospace",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: fileContent.path
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 231,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleInsert,
                                style: {
                                    background: "var(--accent)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: 5,
                                    padding: "3px 10px",
                                    cursor: "pointer",
                                    fontSize: 11
                                },
                                children: "Insert to Chat"
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 244,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        style: {
                            flex: 1,
                            margin: 0,
                            padding: "10px",
                            background: "#1a1d26",
                            color: "var(--text-primary)",
                            fontSize: 11,
                            overflowY: "auto",
                            border: "none",
                            borderRadius: 0,
                            fontFamily: "ui-monospace, monospace",
                            whiteSpace: "pre-wrap",
                            wordBreak: "break-all"
                        },
                        children: fileContent.content
                    }, void 0, false, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 259,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FileBrowser.tsx",
                lineNumber: 208,
                columnNumber: 9
            }, this) : /* Directory listing */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "4px 6px"
                },
                children: listing?.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>handleItemClick(item),
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            padding: "5px 8px",
                            borderRadius: 5,
                            cursor: "pointer",
                            marginBottom: 1
                        },
                        onMouseEnter: (e)=>e.currentTarget.style.background = "var(--bg-hover)",
                        onMouseLeave: (e)=>e.currentTarget.style.background = "transparent",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 13,
                                    flexShrink: 0
                                },
                                children: fileIcon(item)
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 301,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    flex: 1,
                                    fontSize: 12,
                                    color: item.isDir ? "var(--text-primary)" : "var(--text-secondary)",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap"
                                },
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 302,
                                columnNumber: 15
                            }, this),
                            item.size !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 10,
                                    color: "var(--text-muted)",
                                    flexShrink: 0
                                },
                                children: formatSize(item.size)
                            }, void 0, false, {
                                fileName: "[project]/components/FileBrowser.tsx",
                                lineNumber: 315,
                                columnNumber: 17
                            }, this)
                        ]
                    }, item.path, true, {
                        fileName: "[project]/components/FileBrowser.tsx",
                        lineNumber: 282,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/FileBrowser.tsx",
                lineNumber: 280,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FileBrowser.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/FolderTree.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FolderTree
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function fileIcon(node) {
    if (node.type === "dir") return "📁";
    const ext = node.ext ?? "";
    if ([
        ".ts",
        ".tsx"
    ].includes(ext)) return "𝙏";
    if ([
        ".js",
        ".jsx"
    ].includes(ext)) return "𝙅";
    if ([
        ".py"
    ].includes(ext)) return "𝙋";
    if ([
        ".json"
    ].includes(ext)) return "{}";
    if ([
        ".md",
        ".mdx"
    ].includes(ext)) return "𝙈";
    if ([
        ".css",
        ".scss"
    ].includes(ext)) return "𝘾";
    if ([
        ".html"
    ].includes(ext)) return "𝙃";
    if ([
        ".sh",
        ".bat",
        ".ps1"
    ].includes(ext)) return "⚡";
    if ([
        ".sql"
    ].includes(ext)) return "𝘿";
    if ([
        ".go"
    ].includes(ext)) return "𝙂";
    if ([
        ".rs"
    ].includes(ext)) return "𝙍";
    return "𝙁";
}
function TreeNode({ node, depth, selectedPaths, onToggle }) {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(depth < 1);
    const selected = selectedPaths.has(node.path);
    const handleClick = ()=>{
        if (node.type === "dir") {
            setOpen((v)=>!v);
        } else {
            onToggle(node.path, node.type, node);
        }
    };
    const handleCheck = (e)=>{
        e.stopPropagation();
        onToggle(node.path, node.type, node);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                onClick: handleClick,
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 6px 2px " + (8 + depth * 14) + "px",
                    cursor: "pointer",
                    borderRadius: 4,
                    background: selected ? "var(--accent-dim)" : "transparent",
                    color: selected ? "var(--accent)" : node.type === "dir" ? "var(--text-primary)" : "var(--text-secondary)",
                    fontSize: 12,
                    userSelect: "none"
                },
                onMouseEnter: (e)=>{
                    if (!selected) e.currentTarget.style.background = "var(--bg-hover)";
                },
                onMouseLeave: (e)=>{
                    if (!selected) e.currentTarget.style.background = "transparent";
                },
                children: [
                    node.type === "dir" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 10,
                            fontSize: 9,
                            color: "var(--text-muted)",
                            flexShrink: 0
                        },
                        children: open ? "▼" : "▶"
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 88,
                        columnNumber: 11
                    }, this),
                    node.type === "file" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            width: 10,
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 93,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            flexShrink: 0,
                            fontFamily: "ui-monospace, monospace",
                            width: 14
                        },
                        children: fileIcon(node)
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            flex: 1,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap"
                        },
                        children: node.name
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this),
                    node.type === "file" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        onClick: handleCheck,
                        title: selected ? "Remove from context" : "Add to context",
                        style: {
                            fontSize: 10,
                            color: selected ? "var(--accent)" : "var(--text-muted)",
                            padding: "0 2px",
                            flexShrink: 0,
                            fontWeight: 700
                        },
                        children: selected ? "✓" : "+"
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FolderTree.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            node.type === "dir" && open && node.children && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    node.children.map((child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TreeNode, {
                            node: child,
                            depth: depth + 1,
                            selectedPaths: selectedPaths,
                            onToggle: onToggle
                        }, child.path, false, {
                            fileName: "[project]/components/FolderTree.tsx",
                            lineNumber: 127,
                            columnNumber: 13
                        }, this)),
                    node.children.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            paddingLeft: 8 + (depth + 1) * 14,
                            fontSize: 11,
                            color: "var(--text-muted)",
                            padding: "2px 6px 2px " + (8 + (depth + 1) * 14) + "px"
                        },
                        children: "empty"
                    }, void 0, false, {
                        fileName: "[project]/components/FolderTree.tsx",
                        lineNumber: 136,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/FolderTree.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FolderTree.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
function FolderTree({ tree, selectedPaths, onToggle }) {
    if (tree.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: "12px 8px",
                color: "var(--text-muted)",
                fontSize: 12,
                textAlign: "center"
            },
            children: "Empty folder"
        }, void 0, false, {
            fileName: "[project]/components/FolderTree.tsx",
            lineNumber: 149,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            overflowY: "auto",
            flex: 1
        },
        children: tree.map((node)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(TreeNode, {
                node: node,
                depth: 0,
                selectedPaths: selectedPaths,
                onToggle: onToggle
            }, node.path, false, {
                fileName: "[project]/components/FolderTree.tsx",
                lineNumber: 158,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/FolderTree.tsx",
        lineNumber: 156,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/FoniaSettings.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FoniaSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$capabilityIndex$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/capabilityIndex.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const EMPTY = {
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
const TOGGLES = [
    {
        group: "Internet",
        key: "internetAccess",
        title: "Access the internet",
        detail: "Off fetches nothing. On still asks Allow this page or Stay offline before one public address."
    },
    {
        group: "Connections",
        key: "connectExternalTools",
        title: "Allow external programs",
        detail: "Off refuses every launch, including Notepad. On lets Fonia start a program you name. Blender stays on by itself. MetaTrader 5, VirtualBox, CorelDRAW, and Android Studio stay off until you enable them."
    },
    {
        group: "Connections",
        key: "connectBlender",
        title: "Blender",
        detail: "Fonia opens Blender, or asks Blender to build one shape with bpy and save a .blend file. It does not click inside the Blender window."
    },
    {
        group: "Connections",
        key: "connectMetatrader",
        title: "MetaTrader 5",
        detail: "Fonia opens terminal64.exe when you ask. No trade is placed."
    },
    {
        group: "Connections",
        key: "connectVm",
        title: "Virtual machine",
        detail: "Fonia opens VirtualBox when you ask. A guest machine is not powered on."
    },
    {
        group: "Connections",
        key: "connectCorel",
        title: "CorelDRAW",
        detail: "Fonia opens CorelDRW.exe from the usual folder. If that file is missing, nothing is started."
    },
    {
        group: "Connections",
        key: "connectAndroidStudio",
        title: "Android Studio",
        detail: "Fonia opens studio64.exe when you ask."
    },
    {
        group: "Understanding",
        key: "understandFirst",
        title: "Match a muddy sentence with the small model",
        detail: "The 1.5B reads a sentence that could mean more than one thing, picks a mode, and unloads. It needs about 2200 MB free. A clear command, such as check the battery, skips it."
    },
    {
        group: "Understanding",
        key: "askBeforeConsequential",
        title: "Ask before a big action",
        detail: "Overnight work, suspending the PC, and a match the small model is unsure about wait for a click. You can pick a similar action or type what you mean."
    },
    {
        group: "Coding",
        key: "holdGoal",
        title: "Keep checking after a file change",
        detail: "The run stays open until the check passes, the work is blocked, or you press Stop."
    },
    {
        group: "Coding",
        key: "lookAfterUiEdit",
        title: "Look at the page after a UI change",
        detail: "Opens the local app and asks a vision model when free RAM can hold it."
    },
    {
        group: "Coding",
        key: "brainWhenRamFits",
        title: "Let the 8B plan when RAM fits",
        detail: "Only when at least 7200 MB is free. The 8B plans, unloads, and then the 7B edits. They are never loaded together."
    },
    {
        group: "Away",
        key: "closeExtraApps",
        title: "Close extra apps for an overnight run",
        detail: "Up to four other heavy apps. The browser, the editor, Fonia, and Ollama stay open."
    },
    {
        group: "Away",
        key: "strongCoderOvernight",
        title: "Use the strongest coder that fits",
        detail: "An overnight run uses the 7B when it fits. The 8B then the 7B only when RAM allows and the model is not locked."
    },
    {
        group: "Voice",
        key: "whisperFallback",
        title: "Record the microphone if Windows speech fails",
        detail: "Uses the whisper model already in the Fonia folder. Off leaves the Windows recognizer result as it is."
    },
    {
        group: "Chat",
        key: "showSteps",
        title: "Show each tool step open",
        detail: "Off keeps the steps as one line until you open them."
    }
];
function FoniaSettings() {
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [settings, setSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(EMPTY);
    const [found, setFound] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [note, setNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        void fetch("/api/fonia/settings").then((response)=>response.json()).then((data)=>setSettings({
                ...EMPTY,
                ...data,
                micMode: data.micMode === "open" || data.micMode === "wake" ? data.micMode : "push"
            })).catch(()=>setNote("Settings could not be read."));
        void fetch("/api/fonia/connections").then((response)=>response.json()).then((data)=>setFound(data.connections ?? [])).catch(()=>setFound([]));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const show = ()=>setOpen(true);
        window.addEventListener("fonia-open-settings", show);
        return ()=>window.removeEventListener("fonia-open-settings", show);
    }, []);
    async function save(patch) {
        const next = {
            ...settings,
            ...patch
        };
        setSettings(next);
        setNote("");
        const response = await fetch("/api/fonia/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patch)
        });
        if (!response.ok) setNote("That switch was not saved.");
        else window.dispatchEvent(new Event("fonia-settings"));
    }
    let lastGroup = "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "8px 12px",
                    borderBottom: "1px solid var(--border)"
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "fonia-btn",
                    onClick: ()=>setOpen(true),
                    style: {
                        width: "100%"
                    },
                    children: "Settings"
                }, void 0, false, {
                    fileName: "[project]/components/FoniaSettings.tsx",
                    lineNumber: 196,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FoniaSettings.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fonia-sheet-backdrop",
                onClick: ()=>setOpen(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fonia-sheet",
                    role: "dialog",
                    "aria-label": "Settings",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 8
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fonia-kicker",
                                            children: "Fonia"
                                        }, void 0, false, {
                                            fileName: "[project]/components/FoniaSettings.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            style: {
                                                fontSize: 22,
                                                letterSpacing: "-0.03em"
                                            },
                                            children: "Settings"
                                        }, void 0, false, {
                                            fileName: "[project]/components/FoniaSettings.tsx",
                                            lineNumber: 206,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/FoniaSettings.tsx",
                                    lineNumber: 204,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "fonia-btn",
                                    onClick: ()=>setOpen(false),
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/components/FoniaSettings.tsx",
                                    lineNumber: 208,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 203,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginTop: 0
                            },
                            children: [
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$capabilityIndex$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["capabilityCount"])(),
                                " backend features are listed below, in the sectors this PC already runs. A switch changes the next message. Sleep, shutdown, format, and protected processes stay refused either way."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 210,
                            columnNumber: 13
                        }, this),
                        TOGGLES.map((item)=>{
                            const header = item.group !== lastGroup;
                            lastGroup = item.group;
                            const on = Boolean(settings[item.key]);
                            const installed = found.find((entry)=>item.title === entry.label || item.key === "connectVm" && entry.id === "vm");
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    header && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fonia-kicker",
                                        style: {
                                            marginTop: 14
                                        },
                                        children: item.group
                                    }, void 0, false, {
                                        fileName: "[project]/components/FoniaSettings.tsx",
                                        lineNumber: 220,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "fonia-setting",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            fontWeight: 600,
                                                            color: "var(--text-primary)"
                                                        },
                                                        children: item.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FoniaSettings.tsx",
                                                        lineNumber: 223,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: item.detail
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/FoniaSettings.tsx",
                                                        lineNumber: 224,
                                                        columnNumber: 23
                                                    }, this),
                                                    installed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "fonia-mono",
                                                        children: [
                                                            installed.found ? "Installed" : "Not in the usual folder",
                                                            installed.note ? ` · ${installed.note}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/FoniaSettings.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/FoniaSettings.tsx",
                                                lineNumber: 222,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                className: "fonia-switch",
                                                role: "switch",
                                                "aria-checked": on,
                                                "aria-label": item.title,
                                                onClick: ()=>void save({
                                                        [item.key]: !on
                                                    }),
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                    fileName: "[project]/components/FoniaSettings.tsx",
                                                    lineNumber: 240,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/FoniaSettings.tsx",
                                                lineNumber: 232,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FoniaSettings.tsx",
                                        lineNumber: 221,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.key, true, {
                                fileName: "[project]/components/FoniaSettings.tsx",
                                lineNumber: 219,
                                columnNumber: 17
                            }, this);
                        }),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fonia-kicker",
                            style: {
                                marginTop: 14
                            },
                            children: "Voice"
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 246,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            style: {
                                display: "block",
                                fontWeight: 600,
                                marginBottom: 6
                            },
                            children: "Microphone"
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            "aria-label": "Microphone",
                            value: settings.micMode,
                            onChange: (event)=>void save({
                                    micMode: event.target.value
                                }),
                            style: {
                                width: "100%",
                                background: "var(--bg-input)",
                                color: "var(--text-primary)",
                                border: "1px solid var(--border)",
                                borderRadius: 10,
                                padding: "8px 10px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "push",
                                    children: "Press Listen"
                                }, void 0, false, {
                                    fileName: "[project]/components/FoniaSettings.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "open",
                                    children: "Leave the microphone on"
                                }, void 0, false, {
                                    fileName: "[project]/components/FoniaSettings.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "wake",
                                    children: "Wake word: Fonia"
                                }, void 0, false, {
                                    fileName: "[project]/components/FoniaSettings.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 248,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Press Listen keeps the microphone off until you click it. The other two keep Windows speech available. They do not start a second whisper loop."
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fonia-kicker",
                            style: {
                                marginTop: 14
                            },
                            children: "Everything the backend already does"
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this),
                        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$capabilityIndex$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CAPABILITY_SECTORS"].map((sector)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                                className: "fonia-sector",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                        children: [
                                            sector.title,
                                            " · ",
                                            sector.rows.length
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FoniaSettings.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    sector.rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "fonia-capability",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: row.name
                                                }, void 0, false, {
                                                    fileName: "[project]/components/FoniaSettings.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: row.detail
                                                }, void 0, false, {
                                                    fileName: "[project]/components/FoniaSettings.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, row.name, true, {
                                            fileName: "[project]/components/FoniaSettings.tsx",
                                            lineNumber: 264,
                                            columnNumber: 19
                                        }, this))
                                ]
                            }, sector.id, true, {
                                fileName: "[project]/components/FoniaSettings.tsx",
                                lineNumber: 261,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "fonia-kicker",
                            style: {
                                marginTop: 14
                            },
                            children: "Memory"
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 271,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "This screen is the Next.js app in a browser tab. A desktop wrapper such as Electron adds another browser, so the models do not get that memory back. The dev compiler is the extra cost. Running the built app with next start drops that compiler. A switch here cannot stop the server that is showing this page."
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 272,
                            columnNumber: 13
                        }, this),
                        note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: note
                        }, void 0, false, {
                            fileName: "[project]/components/FoniaSettings.tsx",
                            lineNumber: 276,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/FoniaSettings.tsx",
                    lineNumber: 202,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/FoniaSettings.tsx",
                lineNumber: 201,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/FoniaSettings.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/OCore.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OCore",
    ()=>OCore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function OCore({ size = 40, animation = "none", uid = "oc" }) {
    const id = uid;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: `ocore ocore--${animation}`,
        width: size,
        height: size,
        viewBox: "0 0 64 64",
        fill: "none",
        role: "img",
        "aria-label": "Fonia Labs O-core mark",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: `${id}-orb`,
                        cx: "40%",
                        cy: "35%",
                        r: "65%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#e0f2fe"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "28%",
                                stopColor: "#7dd3fc"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "62%",
                                stopColor: "#2563eb"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 35,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#1e3a8a"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OCore.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: `${id}-halo`,
                        cx: "50%",
                        cy: "50%",
                        r: "50%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: "#38bdf8",
                                stopOpacity: "0.55"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 39,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "60%",
                                stopColor: "#38bdf8",
                                stopOpacity: "0.15"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: "#38bdf8",
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OCore.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: `${id}-glow`,
                        x: "-50%",
                        y: "-50%",
                        width: "200%",
                        height: "200%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feGaussianBlur", {
                                stdDeviation: "2.5",
                                result: "blur"
                            }, void 0, false, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMerge", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                        in: "blur"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OCore.tsx",
                                        lineNumber: 45,
                                        columnNumber: 20
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("feMergeNode", {
                                        in: "SourceGraphic"
                                    }, void 0, false, {
                                        fileName: "[project]/components/OCore.tsx",
                                        lineNumber: 45,
                                        columnNumber: 45
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/OCore.tsx",
                                lineNumber: 45,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/OCore.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "oc-ring oc-ring--outer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "32",
                    cy: "32",
                    r: "28",
                    stroke: "#cbd5e1",
                    strokeWidth: "3.2",
                    strokeOpacity: "0.55",
                    strokeLinecap: "round",
                    strokeDasharray: "38.5 5.5",
                    transform: "rotate(-45 32 32)"
                }, void 0, false, {
                    fileName: "[project]/components/OCore.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "oc-ring oc-ring--mid",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "32",
                    cy: "32",
                    r: "21",
                    stroke: "#94a3b8",
                    strokeWidth: "2.4",
                    strokeOpacity: "0.45",
                    strokeLinecap: "round",
                    strokeDasharray: "28.5 4.5",
                    transform: "rotate(-45 32 32)"
                }, void 0, false, {
                    fileName: "[project]/components/OCore.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                className: "oc-ring oc-ring--inner",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                    cx: "32",
                    cy: "32",
                    r: "14",
                    stroke: "#38bdf8",
                    strokeWidth: "1.8",
                    strokeOpacity: "0.5",
                    strokeLinecap: "round",
                    strokeDasharray: "18 3.8",
                    transform: "rotate(-45 32 32)"
                }, void 0, false, {
                    fileName: "[project]/components/OCore.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                className: "oc-halo",
                cx: "32",
                cy: "32",
                r: "12",
                fill: `url(#${id}-halo)`
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 89,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "32",
                cy: "32",
                r: "7.5",
                fill: `url(#${id}-orb)`,
                filter: `url(#${id}-glow)`
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "29.5",
                cy: "28.5",
                rx: "2.8",
                ry: "1.8",
                fill: "white",
                fillOpacity: "0.5",
                transform: "rotate(-30 29.5 28.5)"
            }, void 0, false, {
                fileName: "[project]/components/OCore.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/OCore.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FolderTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FolderTree.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoniaSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FoniaSettings.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OCore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/OCore.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const SECTION_HEADER_STYLE = {
    padding: "8px 12px 4px",
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
};
function Sidebar({ sessions, activeId, workspace, selectedFiles, onSelect, onNew, onDelete, onRename, onOpenFolder, onCloseFolder, onToggleFile, collapsed = false, freeMemoryMb = null, onToggleCollapse }) {
    const [editingId, setEditingId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editValue, setEditValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [folderInput, setFolderInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showFolderInput, setShowFolderInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [projectExpanded, setProjectExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [chatsExpanded, setChatsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    function startEdit(s) {
        setEditingId(s.id);
        setEditValue(s.title);
    }
    function commitEdit(id) {
        if (editValue.trim()) onRename(id, editValue.trim());
        setEditingId(null);
    }
    function handleOpenFolder() {
        if (folderInput.trim()) {
            onOpenFolder(folderInput.trim());
            setShowFolderInput(false);
            setFolderInput("");
        }
    }
    if (collapsed) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            style: {
                width: 44,
                minWidth: 44,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "8px 0",
                background: "rgba(24,24,27,0.8)",
                borderRight: "1px solid rgba(63,63,70,0.6)",
                height: "100%"
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OCore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCore"], {
                    size: 28,
                    animation: "subtle",
                    uid: "rail"
                }, void 0, false, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 94,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "fonia-btn",
                    onClick: onToggleCollapse,
                    title: "Show sidebar",
                    children: "›"
                }, void 0, false, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 95,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/Sidebar.tsx",
            lineNumber: 93,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            width: 240,
            minWidth: 240,
            display: "flex",
            flexDirection: "column",
            background: "rgba(24, 24, 27, 0.8)",
            backdropFilter: "blur(12px)",
            borderRight: "1px solid rgba(63, 63, 70, 0.6)",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: 1
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "12px 14px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$OCore$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["OCore"], {
                                size: 28,
                                animation: "subtle",
                                uid: "brand"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 128,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "fonia-wordmark",
                                style: {
                                    fontWeight: 700,
                                    fontSize: 15,
                                    letterSpacing: "-0.03em"
                                },
                                children: "Fonia"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNew,
                        title: "New session (Ctrl+N)",
                        className: "fonia-btn-primary",
                        style: {
                            width: 26,
                            height: 26,
                            padding: 0,
                            cursor: "pointer",
                            fontSize: 16,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 700,
                            flexShrink: 0
                        },
                        children: "+"
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FoniaSettings$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: SECTION_HEADER_STYLE,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setProjectExpanded((v)=>!v),
                                style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "inherit",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                    padding: 0
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 8
                                        },
                                        children: projectExpanded ? "▼" : "▶"
                                    }, void 0, false, {
                                        fileName: "[project]/components/Sidebar.tsx",
                                        lineNumber: 162,
                                        columnNumber: 13
                                    }, this),
                                    "Project"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowFolderInput((v)=>!v),
                                title: "Open folder",
                                style: {
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "var(--text-muted)",
                                    fontSize: 14,
                                    padding: "0 2px"
                                },
                                children: "📂"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    showFolderInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "4px 10px 8px",
                            display: "flex",
                            gap: 6
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                autoFocus: true,
                                value: folderInput,
                                onChange: (e)=>setFolderInput(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === "Enter") handleOpenFolder();
                                    if (e.key === "Escape") setShowFolderInput(false);
                                },
                                placeholder: "C:\\Users\\PC\\my-project",
                                style: {
                                    flex: 1,
                                    background: "var(--bg-input)",
                                    border: "1px solid var(--border)",
                                    color: "var(--text-primary)",
                                    borderRadius: 5,
                                    padding: "4px 7px",
                                    fontSize: 11,
                                    outline: "none",
                                    fontFamily: "ui-monospace, monospace"
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleOpenFolder,
                                style: {
                                    background: "var(--accent)",
                                    border: "none",
                                    color: "#fff",
                                    borderRadius: 5,
                                    padding: "4px 8px",
                                    cursor: "pointer",
                                    fontSize: 11,
                                    flexShrink: 0
                                },
                                children: "Open"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 201,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 156,
                columnNumber: 7
            }, this),
            projectExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: workspace ? "0 0 auto" : "0 0 0px",
                    maxHeight: workspace ? "45%" : 0,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: workspace ? "1px solid var(--border)" : "none"
                },
                children: workspace ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                padding: "4px 10px",
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                flexShrink: 0
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        flex: 1,
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    },
                                    children: workspace.name
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this),
                                selectedFiles.size > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 10,
                                        background: "var(--accent-dim)",
                                        color: "var(--accent)",
                                        borderRadius: 10,
                                        padding: "1px 6px",
                                        flexShrink: 0
                                    },
                                    children: [
                                        selectedFiles.size,
                                        " files"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 248,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onCloseFolder,
                                    title: "Close folder",
                                    style: {
                                        background: "none",
                                        border: "none",
                                        cursor: "pointer",
                                        color: "var(--text-muted)",
                                        fontSize: 13,
                                        padding: "0 2px"
                                    },
                                    children: "✕"
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 252,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 235,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FolderTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            tree: workspace.tree,
                            selectedPaths: selectedFiles,
                            onToggle: onToggleFile
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 260,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 233,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        padding: "8px 12px",
                        color: "var(--text-muted)",
                        fontSize: 12,
                        textAlign: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "No folder open"
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 275,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 276,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 11
                            },
                            children: "Click 📂 to open a project"
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 277,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 267,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 222,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: SECTION_HEADER_STYLE,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setChatsExpanded((v)=>!v),
                        style: {
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 8
                                },
                                children: chatsExpanded ? "▼" : "▶"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this),
                            "Chats"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 285,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-muted)",
                            fontSize: 10
                        },
                        children: sessions.length
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 292,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, this),
            chatsExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "2px 6px 8px"
                },
                children: [
                    sessions.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            color: "var(--text-muted)",
                            textAlign: "center",
                            marginTop: 16,
                            fontSize: 11
                        },
                        children: "No chats yet — click + to start"
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 299,
                        columnNumber: 13
                    }, this),
                    sessions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>onSelect(s.id),
                            style: {
                                padding: "6px 9px",
                                borderRadius: 6,
                                cursor: "pointer",
                                marginBottom: 1,
                                background: activeId === s.id ? "var(--bg-active)" : "transparent",
                                border: `1px solid ${activeId === s.id ? "var(--border)" : "transparent"}`,
                                display: "flex",
                                alignItems: "center",
                                gap: 7
                            },
                            onMouseEnter: (e)=>{
                                if (activeId !== s.id) e.currentTarget.style.background = "var(--bg-hover)";
                            },
                            onMouseLeave: (e)=>{
                                if (activeId !== s.id) e.currentTarget.style.background = "transparent";
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontSize: 12,
                                        flexShrink: 0,
                                        color: activeId === s.id ? "var(--accent)" : "var(--text-muted)"
                                    },
                                    children: "◉"
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 326,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        minWidth: 0
                                    },
                                    children: editingId === s.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        autoFocus: true,
                                        value: editValue,
                                        onChange: (e)=>setEditValue(e.target.value),
                                        onBlur: ()=>commitEdit(s.id),
                                        onKeyDown: (e)=>{
                                            if (e.key === "Enter") commitEdit(s.id);
                                            if (e.key === "Escape") setEditingId(null);
                                        },
                                        onClick: (e)=>e.stopPropagation(),
                                        style: {
                                            background: "var(--bg-input)",
                                            border: "1px solid var(--accent)",
                                            borderRadius: 4,
                                            color: "var(--text-primary)",
                                            fontSize: 12,
                                            padding: "2px 6px",
                                            width: "100%",
                                            outline: "none"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/Sidebar.tsx",
                                        lineNumber: 332,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                    color: activeId === s.id ? "var(--text-primary)" : "var(--text-secondary)",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                },
                                                children: s.title
                                            }, void 0, false, {
                                                fileName: "[project]/components/Sidebar.tsx",
                                                lineNumber: 355,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "fonia-pill",
                                                style: {
                                                    maxWidth: "100%",
                                                    overflow: "hidden"
                                                },
                                                children: s.model
                                            }, void 0, false, {
                                                fileName: "[project]/components/Sidebar.tsx",
                                                lineNumber: 367,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Sidebar.tsx",
                                        lineNumber: 354,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 330,
                                    columnNumber: 15
                                }, this),
                                activeId === s.id && editingId !== s.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        gap: 1,
                                        flexShrink: 0
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                startEdit(s);
                                            },
                                            title: "Rename",
                                            style: {
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "var(--text-muted)",
                                                fontSize: 11,
                                                padding: "2px 3px",
                                                borderRadius: 3
                                            },
                                            children: "✏"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Sidebar.tsx",
                                            lineNumber: 376,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: (e)=>{
                                                e.stopPropagation();
                                                if (confirm("Delete this chat?")) onDelete(s.id);
                                            },
                                            title: "Delete",
                                            style: {
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "var(--danger)",
                                                fontSize: 11,
                                                padding: "2px 3px",
                                                borderRadius: 3
                                            },
                                            children: "✕"
                                        }, void 0, false, {
                                            fileName: "[project]/components/Sidebar.tsx",
                                            lineNumber: 383,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 375,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 304,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 297,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fonia-side-foot",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "fonia-btn",
                        onClick: ()=>window.dispatchEvent(new Event("fonia-open-settings")),
                        children: "Microphone"
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 397,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fonia-mono",
                        children: freeMemoryMb == null ? "RAM —" : `RAM ${freeMemoryMb} MB free`
                    }, void 0, false, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 396,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Sidebar.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/TerminalPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TerminalPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function TerminalPanel({ onInsertToChat }) {
    const [cwd, setCwd] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("C:\\Users\\PC");
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cmdHistory, setCmdHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [cmdHistoryIdx, setCmdHistoryIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [running, setRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        history
    ]);
    async function run(cmd) {
        const trimmed = cmd.trim();
        if (!trimmed) return;
        // Handle cd locally (just update state for display; real cd handled server side)
        setCmdHistory((prev)=>[
                trimmed,
                ...prev.slice(0, 99)
            ]);
        setCmdHistoryIdx(-1);
        setRunning(true);
        try {
            const res = await fetch("/api/terminal", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    command: trimmed,
                    cwd
                })
            });
            const data = await res.json();
            if (!res.ok) {
                setHistory((prev)=>[
                        ...prev,
                        {
                            cwd,
                            command: trimmed,
                            stdout: "",
                            stderr: data.error ?? "Request failed",
                            error: true
                        }
                    ]);
                return;
            }
            // If it was a cd command, try to extract new cwd from stdout or just assume
            if (/^cd\s+/i.test(trimmed)) {
                // Run a pwd equivalent to get new cwd
                const cdRes = await fetch("/api/terminal", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        command: "(Get-Location).Path",
                        cwd
                    })
                });
                const cdData = await cdRes.json();
                if (cdData.stdout?.trim()) setCwd(cdData.stdout.trim());
            }
            setHistory((prev)=>[
                    ...prev,
                    {
                        cwd,
                        command: trimmed,
                        stdout: data.stdout ?? "",
                        stderr: data.stderr ?? "",
                        error: data.error
                    }
                ]);
        } catch  {
            setHistory((prev)=>[
                    ...prev,
                    {
                        cwd,
                        command: trimmed,
                        stdout: "",
                        stderr: "Network error",
                        error: true
                    }
                ]);
        } finally{
            setRunning(false);
            setInput("");
            inputRef.current?.focus();
        }
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            run(input);
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const newIdx = Math.min(cmdHistoryIdx + 1, cmdHistory.length - 1);
            setCmdHistoryIdx(newIdx);
            setInput(cmdHistory[newIdx] ?? "");
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const newIdx = Math.max(cmdHistoryIdx - 1, -1);
            setCmdHistoryIdx(newIdx);
            setInput(newIdx === -1 ? "" : cmdHistory[newIdx] ?? "");
        }
    }
    function insertLast() {
        if (history.length === 0) return;
        const last = history[history.length - 1];
        const text = `\`\`\`\n$ ${last.command}\n${last.stdout}${last.stderr ? "\n" + last.stderr : ""}\n\`\`\``;
        onInsertToChat(text);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            background: "#0d0f12",
            overflow: "hidden",
            fontFamily: "ui-monospace, 'Cascadia Code', monospace"
        },
        onClick: ()=>inputRef.current?.focus(),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "6px 10px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                    background: "var(--bg-panel)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 13,
                            color: "var(--text-muted)"
                        },
                        children: "📟 Terminal (PowerShell)"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: insertLast,
                        disabled: history.length === 0,
                        title: "Insert last output to chat",
                        style: {
                            background: "var(--bg-active)",
                            border: "1px solid var(--border)",
                            color: history.length === 0 ? "var(--text-muted)" : "var(--text-secondary)",
                            borderRadius: 5,
                            padding: "3px 8px",
                            cursor: history.length === 0 ? "not-allowed" : "pointer",
                            fontSize: 11
                        },
                        children: "Insert to Chat"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setHistory([]),
                        title: "Clear terminal",
                        style: {
                            background: "var(--bg-active)",
                            border: "1px solid var(--border)",
                            color: "var(--text-secondary)",
                            borderRadius: 5,
                            padding: "3px 8px",
                            cursor: "pointer",
                            fontSize: 11
                        },
                        children: "Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 158,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TerminalPanel.tsx",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "10px 12px",
                    fontSize: 12,
                    lineHeight: 1.6
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            color: "var(--text-muted)",
                            marginBottom: 8,
                            fontSize: 11
                        },
                        children: "PowerShell terminal — runs commands on your local machine"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 185,
                        columnNumber: 9
                    }, this),
                    history.map((entry, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 10
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        color: "var(--success)"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--accent)"
                                            },
                                            children: entry.cwd
                                        }, void 0, false, {
                                            fileName: "[project]/components/TerminalPanel.tsx",
                                            lineNumber: 193,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "var(--text-muted)"
                                            },
                                            children: " > "
                                        }, void 0, false, {
                                            fileName: "[project]/components/TerminalPanel.tsx",
                                            lineNumber: 194,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: "#e8eaf0"
                                            },
                                            children: entry.command
                                        }, void 0, false, {
                                            fileName: "[project]/components/TerminalPanel.tsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/TerminalPanel.tsx",
                                    lineNumber: 192,
                                    columnNumber: 13
                                }, this),
                                entry.stdout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    style: {
                                        margin: "2px 0",
                                        color: "var(--text-primary)",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-all",
                                        fontSize: 12,
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        fontFamily: "inherit"
                                    },
                                    children: entry.stdout
                                }, void 0, false, {
                                    fileName: "[project]/components/TerminalPanel.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, this),
                                entry.stderr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    style: {
                                        margin: "2px 0",
                                        color: entry.error ? "var(--danger)" : "var(--warning)",
                                        whiteSpace: "pre-wrap",
                                        wordBreak: "break-all",
                                        fontSize: 12,
                                        background: "none",
                                        border: "none",
                                        padding: 0,
                                        fontFamily: "inherit"
                                    },
                                    children: entry.stderr
                                }, void 0, false, {
                                    fileName: "[project]/components/TerminalPanel.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/TerminalPanel.tsx",
                            lineNumber: 190,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TerminalPanel.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    borderTop: "1px solid var(--border)",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--accent)",
                            fontSize: 12,
                            flexShrink: 0
                        },
                        children: cwd
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-muted)",
                            fontSize: 12,
                            flexShrink: 0
                        },
                        children: ">"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: inputRef,
                        value: input,
                        onChange: (e)=>{
                            setInput(e.target.value);
                            setCmdHistoryIdx(-1);
                        },
                        onKeyDown: handleKeyDown,
                        disabled: running,
                        placeholder: running ? "Running..." : "Enter command...",
                        style: {
                            flex: 1,
                            background: "none",
                            border: "none",
                            color: "var(--text-primary)",
                            fontSize: 12,
                            outline: "none",
                            fontFamily: "ui-monospace, monospace"
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this),
                    running && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-muted)",
                            fontSize: 11
                        },
                        children: "⏳"
                    }, void 0, false, {
                        fileName: "[project]/components/TerminalPanel.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/TerminalPanel.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/TerminalPanel.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/answerModels.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FILES_ANSWER",
    ()=>FILES_ANSWER,
    "LOCAL_COMMAND_ANSWER",
    ()=>LOCAL_COMMAND_ANSWER,
    "NO_MODEL_ANSWER",
    ()=>NO_MODEL_ANSWER,
    "SERVER_ANSWER",
    ()=>SERVER_ANSWER,
    "SESSION_LOG_ANSWER",
    ()=>SESSION_LOG_ANSWER,
    "asAnswerModels",
    ()=>asAnswerModels,
    "formatAnswerModels",
    ()=>formatAnswerModels,
    "modelsThatAnswered",
    ()=>modelsThatAnswered
]);
const FILES_ANSWER = [
    {
        name: "",
        role: "files on disk"
    }
];
const SESSION_LOG_ANSWER = [
    {
        name: "",
        role: "session log"
    }
];
const LOCAL_COMMAND_ANSWER = [
    {
        name: "",
        role: "local command"
    }
];
const NO_MODEL_ANSWER = [
    {
        name: "",
        role: "no model"
    }
];
const SERVER_ANSWER = [
    {
        name: "",
        role: "server"
    }
];
function formatAnswerModels(models) {
    return models.map((model)=>model.name ? `${model.name} · ${model.role}` : model.role).filter(Boolean).join(", ");
}
function asAnswerModels(value) {
    if (!Array.isArray(value)) return [];
    const models = [];
    for (const item of value){
        if (!item || typeof item !== "object") continue;
        const record = item;
        const name = typeof record.name === "string" ? record.name : "";
        const role = typeof record.role === "string" ? record.role : "";
        if (!name && !role) continue;
        if (models.some((model)=>model.name === name && model.role === role)) continue;
        models.push({
            name,
            role
        });
    }
    return models;
}
function modelsThatAnswered(input) {
    if (input.fromFiles) return FILES_ANSWER;
    const models = [];
    if (input.visionWorked && input.visionModel) models.push({
        name: input.visionModel,
        role: "vision"
    });
    if (input.plannerWorked && input.plannerModel) models.push({
        name: input.plannerModel,
        role: input.plannerRole || "planner"
    });
    if (input.executorWorked && input.executorModel) {
        models.push({
            name: input.executorModel,
            role: input.executorRole || "coding"
        });
    }
    return models.length ? models : NO_MODEL_ANSWER;
}
}),
"[project]/lib/appConnections.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Named programs Fonia may start itself. Paths are usual install folders, not a disk scan. */ __turbopack_context__.s([
    "APP_CONNECTIONS",
    ()=>APP_CONNECTIONS,
    "connectionBlock",
    ()=>connectionBlock,
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
}),
"[project]/lib/awayIntent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/capabilityIndex.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Real backend sectors. These rows are what Settings shows. A row with a switch is saved. The others are already implemented and stay available. */ __turbopack_context__.s([
    "CAPABILITY_SECTORS",
    ()=>CAPABILITY_SECTORS,
    "capabilityCount",
    ()=>capabilityCount
]);
const CAPABILITY_SECTORS = [
    {
        id: "files",
        title: "Files",
        rows: [
            {
                name: "Read a file",
                detail: "read_file returns the bytes on disk. A missing path is an error, not a guess."
            },
            {
                name: "Write a file",
                detail: "write_file saves the new text, then the chat shows the diff."
            },
            {
                name: "Patch a file",
                detail: "patch_file replaces one exact passage and shows the diff."
            },
            {
                name: "List a folder",
                detail: "list_dir reads one directory. It does not walk the whole disk."
            },
            {
                name: "Search in files",
                detail: "search_in_files looks through the open project."
            },
            {
                name: "Delete a file",
                detail: "delete_file removes one named file. A recursive wipe of C: is refused."
            }
        ]
    },
    {
        id: "terminal",
        title: "Terminal",
        rows: [
            {
                name: "Run a command",
                detail: "run_command uses PowerShell in the project folder. A command that prints nothing for 30 seconds is stopped, and the result says to try a different command. A command that keeps printing can run for up to 3 minutes. Shutdown, format, and a recursive delete of C: are refused."
            },
            {
                name: "Live terminal",
                detail: "The Terminal panel runs a command on this PC and shows stdout and stderr. It stops after 15 seconds."
            },
            {
                name: "Steer a run",
                detail: "Ctrl+Enter adds a note to the open run. Enter queues the next message."
            },
            {
                name: "Hold the goal",
                detail: "After a code write, the same model keeps the check until it passes, blocks, or you press Stop."
            }
        ]
    },
    {
        id: "documents",
        title: "Documents and video",
        rows: [
            {
                name: "Text and Markdown",
                detail: "txt and md are read on the server before a model sees them."
            },
            {
                name: "PDF",
                detail: "A text layer is extracted. A scan with no words uses Windows OCR."
            },
            {
                name: "Word",
                detail: "docx text is read from the office file."
            },
            {
                name: "PowerPoint",
                detail: "pptx slide text is read from the office file."
            },
            {
                name: "Windows OCR",
                detail: "A scanned page or image is read with the Windows language pack. No extra OCR program is installed."
            },
            {
                name: "Video frames",
                detail: "ffmpeg splits the clip first. A vision model describes at most four frames, then unloads."
            }
        ]
    },
    {
        id: "web",
        title: "Internet",
        rows: [
            {
                name: "Internet access",
                detail: "Off means no page is fetched. On still asks Allow this page or Stay offline for each public address."
            },
            {
                name: "Public page",
                detail: "web_fetch reads one http or https page after the connection check. Local and private addresses are refused."
            }
        ]
    },
    {
        id: "models",
        title: "Models and memory",
        rows: [
            {
                name: "One heavy model",
                detail: "The 8B and the 7B are never loaded together. The 14B stays out of automatic selection."
            },
            {
                name: "Small context model",
                detail: "The 1.5B matches a muddy sentence to a mode and unloads. It does not plan a file write."
            },
            {
                name: "Vision",
                detail: "A picture goes only to LLaVA or Moondream. A text coder never receives the image."
            },
            {
                name: "8B plan",
                detail: "When at least 7200 MB is free, the 8B can plan and the 7B can edit."
            },
            {
                name: "Free RAM",
                detail: "Unload drops the model from memory. It does not stop the page you are looking at."
            },
            {
                name: "Session reports",
                detail: "A question about the last battery or the last report uses this chat. A fresh check reads the PC again."
            }
        ]
    },
    {
        id: "voice",
        title: "Voice",
        rows: [
            {
                name: "Press Listen",
                detail: "The microphone stays off until you click Listen."
            },
            {
                name: "Wake word",
                detail: "The saved mode can be the word Fonia. Changing it is the Microphone menu, not a background install."
            },
            {
                name: "Whisper fallback",
                detail: "If Windows speech fails, ffmpeg records and the local whisper model transcribes."
            },
            {
                name: "Speak",
                detail: "speak uses the Windows voice when you ask it to say something."
            }
        ]
    },
    {
        id: "pc-status",
        title: "PC status",
        rows: [
            {
                name: "Battery",
                detail: "battery_status reads charge and power source."
            },
            {
                name: "Disk",
                detail: "disk_space reads the drives. It does not format them."
            },
            {
                name: "Memory",
                detail: "memory_status reads RAM."
            },
            {
                name: "CPU",
                detail: "cpu_status reads the processor."
            },
            {
                name: "GPU",
                detail: "gpu_status reads the display adapter."
            },
            {
                name: "Display",
                detail: "display_status reads the screen. The display device is never disabled."
            },
            {
                name: "Audio",
                detail: "audio_status reads the sound devices."
            },
            {
                name: "Volume",
                detail: "Volume can be read, set to a number, muted, or unmuted."
            },
            {
                name: "Wi-Fi and network",
                detail: "wifi_status and network_status read the adapters."
            },
            {
                name: "Bluetooth",
                detail: "Bluetooth can be read, and a change can still need an Administrator terminal."
            },
            {
                name: "Firewall",
                detail: "Firewall profiles can be read or switched. A change can need an Administrator terminal."
            },
            {
                name: "Printers and cameras",
                detail: "printers_status and camera_status list the devices."
            },
            {
                name: "Power plan",
                detail: "power_status reads the active plan."
            },
            {
                name: "Startup and programs",
                detail: "startup_status and programs_status list what is installed or set to start."
            },
            {
                name: "Full PC status",
                detail: "components_status is the one-pass report: OS, CPU, memory, battery, GPU, disks, audio, network, Bluetooth, printers, cameras, and the power plan."
            },
            {
                name: "Process and service",
                detail: "A named process or service can be checked. Protected names such as lsass and svchost are refused."
            }
        ]
    },
    {
        id: "pc-change",
        title: "PC changes",
        rows: [
            {
                name: "Brightness",
                detail: "Read, step, or set the level. The screen is not dimmed just because RAM is low."
            },
            {
                name: "Dark mode",
                detail: "Read or switch apps and system theme."
            },
            {
                name: "Default apps",
                detail: "http, https, mailto, and pdf can be read. Changing them opens Settings. Fonia does not write the Windows hash."
            },
            {
                name: "Windows Update",
                detail: "History can be read. Scan and install exist and are not run unless you ask."
            },
            {
                name: "Clipboard",
                detail: "A local model sees the clipboard text, including a password. An online host would get secrets hidden."
            },
            {
                name: "Type and click",
                detail: "ui_type and ui_click use one named window. The lock screen and a sign-in window are refused."
            },
            {
                name: "Screenshot",
                detail: "One screen frame is saved when you ask."
            },
            {
                name: "Eject a flash drive",
                detail: "Only a removable disk. C: is refused."
            },
            {
                name: "Sleep, restart, shutdown",
                detail: "These run only from the named command or a click. There is no switch that turns the safety check off."
            }
        ]
    },
    {
        id: "connections",
        title: "App connections",
        rows: [
            {
                name: "External tools",
                detail: "Off refuses every program launch, including Notepad. On allows a launch. Blender, MetaTrader 5, the virtual machine, CorelDRAW, and Android Studio also have their own switches."
            },
            {
                name: "Blender",
                detail: "On lets Fonia open Blender, and lets Blender build one named shape with bpy into a .blend file. Fonia does not click inside the Blender window."
            },
            {
                name: "MetaTrader 5",
                detail: "On opens terminal64.exe when you ask. No trade is placed."
            },
            {
                name: "Virtual machine",
                detail: "On opens VirtualBox when it is installed. A guest machine is not powered on."
            },
            {
                name: "CorelDRAW",
                detail: "On opens CorelDRW.exe from the usual folder. The X7 suite folder can be present while that program file is missing."
            },
            {
                name: "Android Studio",
                detail: "On opens studio64.exe when you ask."
            }
        ]
    },
    {
        id: "away",
        title: "Away",
        rows: [
            {
                name: "Ask before a big action",
                detail: "A sentence about leaving asks what should happen. Put the computer to sleep still suspends."
            },
            {
                name: "Close extra apps",
                detail: "An overnight run may close up to four heavy apps. The browser, editor, Fonia, and Ollama stay."
            },
            {
                name: "Strong coder overnight",
                detail: "The overnight run uses the strongest coder that fits. The 14B is not chosen automatically."
            }
        ]
    }
];
function capabilityCount() {
    return CAPABILITY_SECTORS.reduce((sum, sector)=>sum + sector.rows.length, 0);
}
}),
"[project]/lib/computerActionParse.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isComputerControlTask",
    ()=>isComputerControlTask,
    "parseComputerAction",
    ()=>parseComputerAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phraseMap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/phraseMap.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$typos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/typos.ts [app-ssr] (ecmascript)");
;
;
const COMPUTER_WORDS = /\b(bluetooth|firewall|wifi|wi-fi|disk space|microphone|voice command|transcribe|screenshot|hear me|battery|cpu|gpu|processor|graphics|display|monitor|volume|printer|camera|brightness|startup|components|hardware|audio|speaker|power plan|shutdown|restart|eject)\b|\bshut\s*down\b|\b(?:say|speak)\s+aloud\b|\b(?:check|show)\s+(?:the\s+|my\s+)?network\b|\b(disable|enable)\b[\s\S]{0,40}\b(camera|device|adapter|bluetooth|wifi|microphone|speaker|usb)\b|\b(stop|start|kill)\s+(?:the\s+)?(?:process|service)\b|\b(?:eject|unplug|safely\s+remove)\b[\s\S]{0,48}\b(?:flash|usb|thumb|pen|stick|drive|removable)\b/i;
const PROCESS_WORDS = /\b(is|check|ensure)\b[\s\S]{0,50}\b(running|process|service)\b/i;
const SPOKEN_PERCENT = /\b(percent|percentage)\b[\s\S]{0,48}\b(system|battery|laptop|pc|computer|disk|drive|storage|ram|memory|cpu|charge)\b/i;
const SPOKEN_CONTROL = /\b(brightness|clipboard|dark\s+mode|light\s+mode|night\s+mode|windows\s+updates?|default\s+apps?|take\s+a\s+(?:picture|photo|pic))\b/i;
function isComputerControlTask(content) {
    return COMPUTER_WORDS.test(content) || PROCESS_WORDS.test(content) || SPOKEN_PERCENT.test(content) || SPOKEN_CONTROL.test(content);
}
function cleanName(value) {
    const name = value.trim().replace(/^["']|["']$/g, "");
    if (!/^[A-Za-z0-9._-]{1,40}$/.test(name)) return null;
    return name;
}
function switchAction(text, device) {
    const trailing = text.match(new RegExp(`^(?:please\\s+)?(?:turn|switch|set)\\s+(?:the\\s+)?${device}\\s+(on|off)$`, "i"));
    if (trailing) return {
        action: `${device}_${trailing[1].toLowerCase()}`,
        target: ""
    };
    const leading = text.match(new RegExp(`^(?:please\\s+)?(?:turn|switch|set)\\s+(on|off)\\s+(?:the\\s+)?${device}$`, "i"));
    if (leading) return {
        action: `${device}_${leading[1].toLowerCase()}`,
        target: ""
    };
    const enable = text.match(new RegExp(`^(?:please\\s+)?(enable|disable)\\s+(?:the\\s+)?${device}$`, "i"));
    if (enable) return {
        action: `${device}_${enable[1].toLowerCase() === "enable" ? "on" : "off"}`,
        target: ""
    };
    const bare = text.match(new RegExp(`^(?:please\\s+)?${device}\\s+(on|off)$`, "i"));
    if (bare) return {
        action: `${device}_${bare[1].toLowerCase()}`,
        target: ""
    };
    return null;
}
function matchExact(text) {
    const bluetooth = switchAction(text, "bluetooth");
    if (bluetooth) return bluetooth;
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:bluetooth(?:\s+status)?|is\s+bluetooth\s+on)\??$/i.test(text)) {
        return {
            action: "bluetooth_status",
            target: ""
        };
    }
    const firewall = switchAction(text, "firewall");
    if (firewall) return firewall;
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:firewall(?:\s+status)?|is\s+(?:the\s+)?firewall\s+on)\??$/i.test(text)) {
        return {
            action: "firewall_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:disk\s+space|free\s+disk\s+space|how\s+much\s+(?:disk\s+)?space(?:\s+is\s+free)?)\??$/i.test(text)) {
        return {
            action: "disk_space",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:memory\s+status|ram\s+status|how\s+much\s+(?:memory|ram)(?:\s+is\s+free)?)\??$/i.test(text)) {
        return {
            action: "memory_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+)?(?:wifi|wi-fi)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "wifi_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:network|network\s+adapters?)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "network_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:system\s+status|pc\s+status|computer\s+status|all\s+components|my\s+components|hardware\s+status)\??$/i.test(text)) {
        return {
            action: "components_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?battery(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "battery_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:cpu|processor)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "cpu_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:gpu|graphics)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "gpu_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:display|monitor|screen)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "display_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:audio|sound|speaker)(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "audio_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:volume|volume\s+status|what(?:'s| is)\s+the\s+volume)\??$/i.test(text)) {
        return {
            action: "volume_status",
            target: ""
        };
    }
    const volumeSet = text.match(/^(?:please\s+)?set\s+(?:the\s+)?volume\s+(?:to\s+)?(\d{1,3})\s*%?$/i);
    if (volumeSet) return {
        action: "volume_set",
        target: String(Math.min(100, Math.max(0, Number(volumeSet[1]))))
    };
    if (/^(?:please\s+)?mute(?:\s+(?:the\s+)?(?:volume|sound|audio))?$/i.test(text)) return {
        action: "volume_mute",
        target: ""
    };
    if (/^(?:please\s+)?unmute(?:\s+(?:the\s+)?(?:volume|sound|audio))?$/i.test(text)) return {
        action: "volume_unmute",
        target: ""
    };
    if (/^(?:please\s+)?(?:printers?|printer\s+status)\??$/i.test(text)) return {
        action: "printers_status",
        target: ""
    };
    if (/^(?:please\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?camera(?:\s+status)?\??$/i.test(text)) {
        return {
            action: "camera_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:power\s+status|power\s+plan)\??$/i.test(text)) return {
        action: "power_status",
        target: ""
    };
    if (/^(?:please\s+)?(?:startup\s+(?:apps|programs)|what\s+starts\s+with\s+windows)\??$/i.test(text)) {
        return {
            action: "startup_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:installed\s+programs|list\s+programs|what(?:'s| is)\s+installed)\??$/i.test(text)) {
        return {
            action: "programs_status",
            target: ""
        };
    }
    const programFind = text.match(/^(?:please\s+)?find\s+program\s+(.{1,40})$/i);
    if (programFind) return {
        action: "programs_status",
        target: programFind[1].trim()
    };
    if (/^(?:please\s+)?(?:devices?|my\s+devices|connected\s+devices)\??$/i.test(text)) {
        return {
            action: "devices_status",
            target: ""
        };
    }
    if (/^(?:please\s+)?(?:shut\s*down|shutdown)(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
        return {
            action: "shutdown",
            target: ""
        };
    }
    if (/^(?:please\s+)?restart(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
        return {
            action: "restart",
            target: ""
        };
    }
    if (/^(?:please\s+)?sleep(?:\s+(?:the\s+)?(?:computer|pc|system))?$/i.test(text)) {
        return {
            action: "sleep",
            target: ""
        };
    }
    const stopProcess = text.match(/^(?:please\s+)?(?:stop|end|kill)\s+(?:the\s+)?(?:process\s+)?([A-Za-z0-9._-]{1,40})$/i);
    if (stopProcess) {
        const name = cleanName(stopProcess[1]);
        if (!name || /^(the|that|this|a|an|it|process|service)$/i.test(name)) return null;
        return {
            action: "process_stop",
            target: name
        };
    }
    const serviceChange = text.match(/^(?:please\s+)?(start|stop)\s+(?:the\s+)?service\s+([A-Za-z0-9._-]{1,40})$/i);
    if (serviceChange) {
        const name = cleanName(serviceChange[2]);
        if (!name) return null;
        return {
            action: serviceChange[1].toLowerCase() === "start" ? "service_start" : "service_stop",
            target: name
        };
    }
    const deviceChange = text.match(/^(?:please\s+)?(enable|disable)\s+(?:the\s+)?(.{1,80})$/i);
    if (deviceChange && !/^(bluetooth|firewall)$/i.test(deviceChange[2].trim())) {
        const deviceTarget = deviceChange[2].trim();
        if (/^(microphone|mic)$/i.test(deviceTarget)) {
            return {
                action: deviceChange[1].toLowerCase() === "enable" ? "microphone_on" : "microphone_off",
                target: ""
            };
        }
        return {
            action: deviceChange[1].toLowerCase() === "enable" ? "device_enable" : "device_disable",
            target: deviceTarget
        };
    }
    if (/^(?:please\s+)?(?:take\s+a\s+screenshot|screenshot)\??$/i.test(text)) return {
        action: "screenshot",
        target: ""
    };
    const listen = text.match(/^(?:please\s+)?(?:listen|hear me)(?:\s+for\s+(\d{1,2})\s+seconds?)?\??$/i);
    if (listen) {
        const seconds = listen[1] ? String(Math.min(8, Math.max(3, Number(listen[1])))) : "6";
        return {
            action: "listen",
            target: seconds
        };
    }
    const speak = text.match(/^(?:please\s+)?(?:say|speak)(?:\s+aloud)?\s+(.{1,180})$/i);
    if (speak && !/\b(read|file|folder|project|run|open|install|code|document|video)\b/i.test(speak[1])) {
        return {
            action: "speak",
            target: speak[1].trim()
        };
    }
    const transcribe = text.match(/^(?:please\s+)?transcribe\s+(\S+)$/i);
    if (transcribe) return {
        action: "transcribe",
        target: transcribe[1].replace(/^["']|["']$/g, "")
    };
    const processAsk = text.match(/^(?:please\s+)?(?:is|check|ensure)\s+(?:that\s+)?(?:the\s+)?(?:process\s+)?([A-Za-z0-9._-]{1,40})\s+(?:is\s+)?running(?:\s+well)?\??$/i);
    if (processAsk) {
        const name = cleanName(processAsk[1]);
        if (!name || /^(the|that|this|a|an|it|process|service)$/i.test(name)) return null;
        return {
            action: "process_status",
            target: name
        };
    }
    const serviceAsk = text.match(/^(?:please\s+)?(?:is|check)\s+(?:the\s+)?service\s+([A-Za-z0-9._-]{1,40})\s+running(?:\s+well)?\??$/i);
    if (serviceAsk) {
        const name = cleanName(serviceAsk[1]);
        return name ? {
            action: "service_status",
            target: name
        } : null;
    }
    return null;
}
function parseComputerAction(content) {
    const text = content.trim();
    if (!text || text.includes("\n") || text.length > 240) return null;
    if (/\b(and|then)\b/i.test(text)) return null;
    const corrected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$typos$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["correctTypos"])(text);
    const normalized = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phraseMap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["normalizePhrase"])(corrected);
    return matchExact(text) ?? (normalized ? matchExact(normalized) : null) ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$phraseMap$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mapPhrase"])(normalized);
}
}),
"[project]/lib/directAction.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TEXT_TOOL_INSTRUCTION",
    ()=>TEXT_TOOL_INSTRUCTION,
    "directUserAction",
    ()=>directUserAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appConnections$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/appConnections.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActionParse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/computerActionParse.ts [app-ssr] (ecmascript)");
;
;
const TEXT_TOOL_INSTRUCTION = [
    "Reply with one JSON object only and no other text.",
    "Use the keys name and arguments.",
    "name must be read_file, write_file, patch_file, list_dir, run_command, delete_file, search_in_files, read_document, sample_video, launch_app, or computer_action."
].join(" ");
function directUserAction(content) {
    const text = content.trim();
    if (!text || text.includes("\n") || text.length > 400) return null;
    if (/\b(and|then)\b/i.test(text)) return null;
    const computer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActionParse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseComputerAction"])(text);
    if (computer) return {
        function: {
            name: "computer_action",
            arguments: {
                action: computer.action,
                target: computer.target
            }
        }
    };
    const run = text.match(/^(?:please\s+)?(?:run|execute)(?:\s+(?:the\s+)?command)?\s*:?\s+(.+)$/i);
    if (run) {
        const command = run[1].trim().replace(/^["']|["']$/g, "");
        if (!command || /^(a|the|this|command|something)\b/i.test(command)) return null;
        return {
            function: {
                name: "run_command",
                arguments: {
                    command
                }
            }
        };
    }
    const read = text.match(/^(?:please\s+)?read(?:\s+(?:the\s+)?file)?\s+(.+)$/i);
    if (read) {
        const filePath = read[1].trim().replace(/^["']|["']$/g, "");
        if (!filePath || /\s/.test(filePath)) return null;
        const tool = /\.(pdf|docx|pptx)$/i.test(filePath) ? "read_document" : "read_file";
        return {
            function: {
                name: tool,
                arguments: {
                    path: filePath
                }
            }
        };
    }
    const open = text.match(/^(?:please\s+)?(?:open|launch|start)\s+(.+)$/i);
    if (open) {
        const name = open[1].trim().replace(/^["']|["']$/g, "");
        const known = Boolean((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$appConnections$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["matchConnection"])(name));
        if (name && (known || !/\s/.test(name)) && !/[;&|<>`$]/.test(name) && !/shutdown|format|Remove-Item|Restart-Computer/i.test(name)) {
            return {
                function: {
                    name: "launch_app",
                    arguments: {
                        name
                    }
                }
            };
        }
    }
    if (/^(?:please\s+)?(?:list|ls)(?:\s+(?:me\s+)?)?(?:this\s+|the\s+)?(?:dir|directory|folder|files)?\s*$/i.test(text)) {
        return {
            function: {
                name: "list_dir",
                arguments: {
                    path: "."
                }
            }
        };
    }
    const listed = text.match(/^(?:please\s+)?(?:list|ls)(?:\s+(?:directory|dir|folder))?\s+(\S+)$/i);
    if (listed) {
        return {
            function: {
                name: "list_dir",
                arguments: {
                    path: listed[1]
                }
            }
        };
    }
    return null;
}
}),
"[project]/lib/inferenceBudget.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** How long one model call may run before Fonia checks whether it is still working. */ __turbopack_context__.s([
    "estimateModelMb",
    ()=>estimateModelMb,
    "inferenceBudgetMs",
    ()=>inferenceBudgetMs,
    "nextWait",
    ()=>nextWait,
    "sameModel",
    ()=>sameModel
]);
function estimateModelMb(name) {
    if (/moondream/i.test(name)) return 2800;
    if (/1\.5b/i.test(name)) return 2200;
    if (/:3b\b/i.test(name)) return 3800;
    if (/14b/i.test(name)) return 9000;
    if (/8b/i.test(name)) return 7200;
    if (/7b/i.test(name)) return 6200;
    return 4500;
}
function sameModel(loaded, requested) {
    const left = loaded.toLowerCase();
    const right = requested.toLowerCase();
    return left === right || left.startsWith(`${right}:`) || right.startsWith(`${left}:`);
}
function inferenceBudgetMs(options) {
    const small = /1\.5b/i.test(options.model);
    const large = /14b/i.test(options.model);
    const generate = small ? 90_000 : large ? 240_000 : 180_000;
    const load = options.loaded ? 0 : small ? 60_000 : large ? 150_000 : 120_000;
    const needs = estimateModelMb(options.model);
    const tight = options.freeMb < needs ? 60_000 : 0;
    const ms = generate + load + tight;
    const seconds = Math.round(ms / 1000);
    const head = options.loaded ? `${options.model} is already loaded. This run can use ${seconds} seconds before the server is checked.` : `${options.model} is not loaded yet. The first run can use ${seconds} seconds, then the server is checked before it is stopped.`;
    const ram = tight ? ` Free RAM is ${options.freeMb} MB, under the ${needs} MB this model usually needs.` : "";
    return {
        ms,
        note: `${head}${ram}`
    };
}
function nextWait(options) {
    if (!options.serverUp) {
        return {
            action: "stop",
            extraMs: 0,
            note: "The model server stopped answering."
        };
    }
    const cap = options.budgetMs + 120_000;
    if (options.extensions >= 2 || options.elapsedMs >= cap) {
        return {
            action: "stop",
            extraMs: 0,
            note: "The extended wait is over."
        };
    }
    if (options.hot) {
        return {
            action: "wait",
            extraMs: 60_000,
            note: "The model is still in memory and working. The wait is extended by 60 seconds."
        };
    }
    return {
        action: "wait",
        extraMs: 45_000,
        note: "The model server is still up. The wait is extended by 45 seconds."
    };
}
}),
"[project]/lib/intent.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "answerRequiresEvidence",
    ()=>answerRequiresEvidence,
    "classifyIntent",
    ()=>classifyIntent,
    "imageStaysWithVision",
    ()=>imageStaysWithVision,
    "isLocalComputerTask",
    ()=>isLocalComputerTask,
    "isSimpleAction",
    ()=>isSimpleAction,
    "refersToPriorAction",
    ()=>refersToPriorAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActionParse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/computerActionParse.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/awayIntent.ts [app-ssr] (ecmascript)");
;
;
const SIMPLE_ACTION = /^\s*(create|make|touch|delete|remove|rename|move|list|show|read|run)\b(?!.*\b(app|application|system|website|project|architecture|database|from scratch)\b).{0,180}$/i;
const CASUAL_GREETINGS = /^(hi|hello|hey|yo|greetings|howdy|sup|good\s+(morning|afternoon|evening)|who\s+are\s+you|what\s+can\s+you\s+do|thanks|thank\s+you|bye|goodbye)[\s!.]*$/i;
const CODE_WORDS = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create|file|folder|project|repository|repo|script|compile|deploy|import|export|interface|type|enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/i;
const ACTION_WORDS = /\b(create|edit|update|change|delete|remove|add|write|implement|run|test|debug|rename|replace|patch|move|fix|refactor|execute)\b/i;
const INSPECT_WORDS = /\b(scan|inspect|examine|explore|read|review|summarize|search|find|list|look at|go through|check|browse)\b/i;
const EXPLAIN_WORDS = /\b(explain|what is|what are|why|how does|how do|summarize|compare|recommend|suggest|describe)\b/i;
const DEEP_WORDS = /\b(architecture|full (page|app|website|system|backend|frontend|api)|scaffold|entire|whole project|from scratch|multi.?file|design system|database schema|migrate|migration|complex)\b/i;
const SYSTEM_OR_FILE_TARGET = /\b(file|folder|dir|directory|project|repository|repo|workspace|code|source|terminal|powershell|bash|command|cmd|[a-zA-Z]:[\\/]|(?:\.{1,2}[\\/]))\b/i;
const LOCAL_MEDIA = /\b(pdf|docx|pptx|video|mp4|webm|mov|mkv)\b|Video:\s*\S/i;
const LOCAL_APP = /\b(open|launch|start)\b[\s\S]{0,80}\b(blender|notepad|explorer|calc|paint|app|application|program)\b/i;
const LOCAL_SETUP = /^(?:please\s+)?(?:can you\s+)?(?:install|uninstall|set up|setup)\b/i;
function isLocalComputerTask(content) {
    return LOCAL_MEDIA.test(content) || LOCAL_APP.test(content) || LOCAL_SETUP.test(content) || (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$computerActionParse$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isComputerControlTask"])(content);
}
function refersToPriorAction(content) {
    const normalized = content.trim();
    if (/^(create|make|write|delete|run|read|scan|list|show)\b/i.test(normalized)) return false;
    return /\bwhat type of file\b/i.test(normalized) || /\bdid you\b[\s\S]{0,40}\b(create|created|write|wrote|make|made|change|changed|edit|edited|delete|deleted|run|scan|read|save|saved)\b/i.test(normalized) || /\bhave you\b[\s\S]{0,40}\b(create|created|write|wrote|make|made|change|changed|edit|edited|delete|deleted|run|scan|read|save|saved)\b/i.test(normalized) || /\bsucce(?:s|ss)ful(?:ly|y) create/i.test(normalized);
}
function imageStaysWithVision(content) {
    return !ACTION_WORDS.test(content) && !/\b(file|folder|code|css|html|component|implement)\b/i.test(content);
}
function answerRequiresEvidence(content, hasImages = false) {
    if (hasImages) return true;
    if (refersToPriorAction(content)) return true;
    const decision = classifyIntent(content, hasImages);
    if (decision.intent === "casual") return false;
    if (decision.intent === "explain" && !decision.needsTools) return false;
    return decision.needsTools;
}
function classifyIntent(content, hasImages = false) {
    const normalized = content.trim();
    const wordCount = normalized ? normalized.split(/\s+/).length : 0;
    if (hasImages) {
        return {
            intent: "image",
            needsTools: true,
            needsWriteAccess: ACTION_WORDS.test(normalized)
        };
    }
    // Always keep purely conversational greetings casual (no tools, zero RAM wasted on scanning)
    if (CASUAL_GREETINGS.test(normalized)) {
        return {
            intent: "casual",
            needsTools: false,
            needsWriteAccess: false
        };
    }
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$awayIntent$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["personIsSteppingAway"])(normalized)) {
        return {
            intent: "code",
            needsTools: true,
            needsWriteAccess: true
        };
    }
    if (refersToPriorAction(normalized)) {
        return {
            intent: "explain",
            needsTools: true,
            needsWriteAccess: false
        };
    }
    if (isLocalComputerTask(normalized)) {
        return {
            intent: "code",
            needsTools: true,
            needsWriteAccess: ACTION_WORDS.test(normalized)
        };
    }
    if (/\bbrief\b/i.test(normalized) && SYSTEM_OR_FILE_TARGET.test(normalized)) {
        return {
            intent: "explain",
            needsTools: true,
            needsWriteAccess: false
        };
    }
    if (DEEP_WORDS.test(normalized) && (wordCount >= 4 || /architecture|from scratch|multi.?file|database schema/i.test(normalized))) {
        return {
            intent: "deep",
            needsTools: true,
            needsWriteAccess: ACTION_WORDS.test(normalized)
        };
    }
    // Explicit inspection/scan requests on files, folders, paths, or terminal commands
    if (INSPECT_WORDS.test(normalized) && SYSTEM_OR_FILE_TARGET.test(normalized)) {
        const isWrite = ACTION_WORDS.test(normalized) && !/^(scan|inspect|examine|read|look at|check|list)\b/i.test(normalized);
        return {
            intent: "code",
            needsTools: true,
            needsWriteAccess: isWrite
        };
    }
    // Explicit questions about the workspace, repository, or current project
    if (SYSTEM_OR_FILE_TARGET.test(normalized) && (EXPLAIN_WORDS.test(normalized) || /\b(about|what is|tell me)\b/i.test(normalized))) {
        return {
            intent: "explain",
            needsTools: true,
            needsWriteAccess: false
        };
    }
    if (ACTION_WORDS.test(normalized) || CODE_WORDS.test(normalized) && !EXPLAIN_WORDS.test(normalized)) {
        return {
            intent: "code",
            needsTools: true,
            needsWriteAccess: ACTION_WORDS.test(normalized)
        };
    }
    if (EXPLAIN_WORDS.test(normalized) || INSPECT_WORDS.test(normalized)) {
        const needsTools = SYSTEM_OR_FILE_TARGET.test(normalized);
        return {
            intent: "explain",
            needsTools,
            needsWriteAccess: false
        };
    }
    // A short new request, such as ejecting a drive, is a task. A greeting already returned above.
    if (/\b(eject|unplug|remove|empty|recycle|flash|usb|thumb|stick|install|uninstall|connect|disconnect|mount|unmount|hide|extract|zip|print|scan|rename|lock|unlock|minimize|maximize|pair|calibrate|rotate)\b/i.test(normalized) && !/^(what|who|why|how|when|where|is|are)\b/i.test(normalized)) {
        return {
            intent: "code",
            needsTools: true,
            needsWriteAccess: false
        };
    }
    if (wordCount <= 6) {
        return {
            intent: "casual",
            needsTools: false,
            needsWriteAccess: false
        };
    }
    return {
        intent: "explain",
        needsTools: false,
        needsWriteAccess: false
    };
}
function isSimpleAction(content, hasImages = false) {
    if (hasImages) return false;
    const normalized = content.trim();
    return normalized.split(/\s+/).length <= 14 && SIMPLE_ACTION.test(normalized);
}
}),
"[project]/lib/modelRelay.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "codingUsesBrain",
    ()=>codingUsesBrain,
    "decodeModelChoice",
    ()=>decodeModelChoice,
    "encodeModelChoice",
    ()=>encodeModelChoice,
    "fallbackChoices",
    ()=>fallbackChoices,
    "fallbackReason",
    ()=>fallbackReason,
    "modelRole",
    ()=>modelRole,
    "pickBrainModel",
    ()=>pickBrainModel,
    "pickFallbackCoder",
    ()=>pickFallbackCoder,
    "pickHandsModel",
    ()=>pickHandsModel,
    "pickStrongCoder",
    ()=>pickStrongCoder,
    "pickVisionModel",
    ()=>pickVisionModel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/inferenceBudget.ts [app-ssr] (ecmascript)");
;
function pickHandsModel(models) {
    const hands = models.filter((name)=>/coder|code/i.test(name) && !/1\.5b/i.test(name) && !/14b/i.test(name));
    return hands.find((name)=>/7b/i.test(name)) ?? hands[0] ?? null;
}
function pickBrainModel(models) {
    return models.find((name)=>name.toLowerCase().startsWith("qwen3")) ?? null;
}
function codingUsesBrain(intent, needsWriteAccess) {
    return needsWriteAccess && (intent === "code" || intent === "deep");
}
function modelRole(name) {
    const lower = name.toLowerCase();
    if (lower.startsWith("qwen3")) return "brain";
    if (/llava|vision|moondream/i.test(lower)) return "vision";
    if (/1\.5b/i.test(lower)) return "small coder";
    if (/:3b\b/i.test(lower)) return "solver";
    if (/14b/i.test(lower)) return "large coder";
    if (/coder|code/i.test(lower)) return "coder";
    return "general";
}
function fallbackChoices(models, failedModel) {
    return models.filter((name)=>name && name !== failedModel).map((name)=>({
            name,
            role: modelRole(name)
        }));
}
const MODEL_CHOICE_MARKER = /<!--model-choice:([\s\S]*?)-->/;
function encodeModelChoice(choice) {
    return `\n\n<!--model-choice:${JSON.stringify(choice)}-->`;
}
function decodeModelChoice(content) {
    const match = content.match(MODEL_CHOICE_MARKER);
    const text = content.replace(MODEL_CHOICE_MARKER, "").trim();
    if (!match) return {
        text,
        choice: null
    };
    try {
        const parsed = JSON.parse(match[1]);
        if (!parsed || typeof parsed.failedModel !== "string" || !Array.isArray(parsed.choices)) {
            return {
                text,
                choice: null
            };
        }
        const choices = parsed.choices.filter((item)=>item && typeof item.name === "string" && typeof item.role === "string");
        return {
            text,
            choice: {
                failedModel: parsed.failedModel,
                choices
            }
        };
    } catch  {
        return {
            text,
            choice: null
        };
    }
}
function pickVisionModel(requested, models, freeMb) {
    const vision = (name)=>/^(llava|moondream|minicpm-v|bakllava|cogvlm)/i.test(name);
    const found = models.filter(vision);
    if (!found.length) return null;
    const fitting = typeof freeMb === "number" ? found.filter((name)=>freeMb >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateModelMb"])(name)) : found;
    const pool = fitting.length ? fitting : found;
    if (vision(requested) && pool.includes(requested)) return requested;
    return pool.find((name)=>/^llava/i.test(name)) ?? pool.find((name)=>/^moondream/i.test(name)) ?? pool[0];
}
function pickStrongCoder(models, freeMb) {
    const hands = pickHandsModel(models);
    if (hands && freeMb >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateModelMb"])(hands)) return hands;
    return pickFallbackCoder(models, freeMb, true);
}
function pickFallbackCoder(models, freeMb, needsWrite) {
    const mid = models.find((name)=>/coder|code/i.test(name) && /:3b\b/i.test(name));
    if (mid && freeMb >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateModelMb"])(mid)) return mid;
    if (needsWrite) return null;
    const small = models.find((name)=>/1\.5b/i.test(name));
    if (small && freeMb >= (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$inferenceBudget$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["estimateModelMb"])(small)) return small;
    return null;
}
function fallbackReason(model, kind, waitedSeconds) {
    if (kind === "timeout") {
        const seconds = waitedSeconds && waitedSeconds > 0 ? waitedSeconds : 120;
        return `${model} did not answer within ${seconds} seconds. The model server was checked before this stop. Retry ${model}, or choose a different model.`;
    }
    if (kind === "tools") {
        return `${model} cannot use tools, so it cannot edit files or run commands. Retry it only for a plain answer, or choose a coder model.`;
    }
    if (kind === "planner") {
        return `${model} did not produce a plan. Retry ${model}, or choose the model that should take the task.`;
    }
    return `${model} answered without using a tool, so no file or command was run. Retry ${model}, or choose a different model.`;
}
}),
"[project]/lib/phraseMap.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** Spoken wording for the computer actions that already exist. No model and no extra tools. */ __turbopack_context__.s([
    "mapPhrase",
    ()=>mapPhrase,
    "normalizePhrase",
    ()=>normalizePhrase
]);
const LEADING = [
    /^(?:hey|hi|hello|ok|okay|yo)\s+/,
    /^fonia\s*/,
    /^(?:can|could|would|will)\s+you\s+/,
    /^(?:please|kindly)\s+/,
    /^(?:i\s+(?:want|need)\s+(?:you\s+)?to|i'?d\s+like(?:\s+you)?\s+to)\s+/,
    /^(?:tell\s+me|show\s+me|let\s+me\s+know|give\s+me)\s+/,
    /^(?:i\s+(?:want|need)\s+to\s+know)\s+/
];
const NAME_STOP = new Set([
    "the",
    "that",
    "this",
    "a",
    "an",
    "process",
    "service",
    "my",
    "your",
    "it",
    "computer",
    "pc",
    "system",
    "laptop",
    "machine",
    "windows",
    "sound",
    "volume",
    "please",
    "fonia",
    "window",
    "screen",
    "file",
    "folder",
    "app",
    "program",
    "device",
    "running",
    "status"
]);
function normalizePhrase(content) {
    let text = content.toLowerCase().replace(/[’‘]/g, "'").replace(/[?!.,;]+(?=\s|$)/g, " ").replace(/\s+/g, " ").trim();
    for(let pass = 0; pass < 6; pass += 1){
        let next = text;
        for (const pattern of LEADING)next = next.replace(pattern, "");
        next = next.replace(/\b(check|show)\s+on\b/g, "$1").replace(/\s+(?:for me|right now|please)$/g, "").trim();
        if (next === text) break;
        text = next;
    }
    return text;
}
function has(text, pattern) {
    return pattern.test(text);
}
function cleanName(value) {
    const name = (value ?? "").trim().replace(/^["']|["']$/g, "");
    if (!/^[a-z0-9._-]{1,40}$/i.test(name)) return null;
    if (NAME_STOP.has(name.toLowerCase())) return null;
    return name;
}
function best(hits) {
    if (hits.length === 0) return null;
    hits.sort((left, right)=>right.score - left.score);
    const winner = hits[0];
    if (winner.score < 6) return null;
    const rival = hits.find((hit)=>hit.action !== winner.action || hit.target !== winner.target);
    if (rival && winner.score - rival.score < 2) return null;
    return {
        action: winner.action,
        target: winner.target
    };
}
function asks(text, kind) {
    if (kind === "off") return has(text, /\b(turn|switch|set)\b/) && has(text, /\boff\b/) || has(text, /\bdisable\b/);
    return has(text, /\b(turn|switch|set)\b/) && has(text, /\bon\b/) || has(text, /\benable\b/);
}
function mapPhrase(content) {
    const text = normalizePhrase(content);
    if (!text) return null;
    if (has(text, /\b(function|component|bug|refactor|fix|indicator|website|css|html|javascript|typescript|repo|repository|file|folder|code)\b/) && !has(text, /\b(percent|percentage|screenshot|transcribe)\b/)) {
        return null;
    }
    const ejecting = has(text, /\b(eject|unplug)\b/) || has(text, /\bsafely\s+remove\b/);
    const percent = has(text, /\b(percent|percentage|%)\b/);
    const systemish = has(text, /\b(system|laptop|pc|computer|machine)\b/);
    const diskWord = has(text, /\b(disk|drive|storage|ssd|hdd|hard\s*drive)\b/);
    const ramWord = has(text, /\bram\b/) || has(text, /\bmemory\b/) && !has(text, /\b(remember|memorial)\b/);
    const cpuWord = has(text, /\b(cpu|processor)\b/);
    const batteryWord = has(text, /\b(battery|charging)\b/) || has(text, /\b(charge|power)\s+(left|remaining|level|percent|percentage)\b/) || has(text, /\bhow\s+much\s+(?:battery|charge|power)\b/) || has(text, /\b(?:my|the)\s+charge\b/);
    const hits = [];
    const add = (action, score, target = "")=>{
        if (score > 0) hits.push({
            action,
            target,
            score
        });
    };
    if (ejecting && (has(text, /\b(flash|usb|thumb|pen|stick|removable)\b/) || has(text, /\bdrive\b/))) {
        const drive = text.match(/\b([d-z]):\b/) || text.match(/\bdrive\s+([d-z])\b/) || text.match(/\b([d-z])\s+drive\b/);
        add("eject_drive", 10, drive ? drive[1].toUpperCase() : "");
    }
    if (percent && diskWord) add("disk_space", 9);
    else if (percent && ramWord) add("memory_status", 9);
    else if (percent && cpuWord) add("cpu_status", 8);
    else if (percent && (batteryWord || systemish)) add("battery_status", 9);
    if (batteryWord) add("battery_status", 7);
    if (!ejecting && diskWord && has(text, /\b(space|free|full|left|used|usage|storage|much)\b/) && !has(text, /\bformat\b/)) add("disk_space", 7);
    else if (has(text, /\b(free space|space left|disk space)\b/)) add("disk_space", 7);
    else if (!ejecting && diskWord && has(text, /\b(check|show|status|how)\b/) && !has(text, /\bformat\b/)) add("disk_space", 6);
    if (ramWord) add("memory_status", 7);
    if (cpuWord) add("cpu_status", 7);
    if (has(text, /\b(gpu|graphics\s+card|video\s+card|integrated\s+graphics)\b/) || has(text, /\bgraphics\b/) && has(text, /\b(card|gpu|status|check|show)\b/)) {
        add("gpu_status", 7);
    }
    if (has(text, /\b(monitor|resolution|screen\s+size|screen\s+resolution|display\s+status|the\s+display|my\s+display)\b/) && !has(text, /\b(screenshot|screen\s*shot|capture|snap)\b/)) {
        add("display_status", 7);
    }
    if (has(text, /\b(screenshot|screen\s*shot)\b/) || has(text, /\b(capture|snap)\b(?:\s+\w+){0,3}\s+(?:screen|desktop)\b/) || has(text, /\b(?:picture|photo|image)\s+of\s+(?:the\s+|my\s+)?(?:screen|desktop)\b/) || has(text, /\bwhat(?:'s| is)\s+on\s+(?:my\s+|the\s+)?screen\b/) || has(text, /\b(take|grab|snap|capture)\b/) && has(text, /\b(picture|photo|pic)\b/)) {
        add("screenshot", 8);
    }
    if (has(text, /\bbrightness\b/) || has(text, /\bbright\b/) && has(text, /\b(screen|display|monitor)\b/)) {
        const raised = has(text, /\b(increase|raise|higher|brighter|up)\b/);
        const lowered = has(text, /\b(decrease|lower|dim|dimmer|down|reduce)\b/);
        const level = text.match(/\b(\d{1,3})\b/);
        if (raised && !lowered) add("brightness_up", 8);
        else if (lowered && !raised) add("brightness_down", 8);
        else if (level && has(text, /\b(set|make|to|at)\b/) && Number(level[1]) <= 100) add("brightness_set", 9, String(Number(level[1])));
        else add("brightness_status", 7);
    }
    if (has(text, /\b(dark\s*mode|light\s*mode|night\s*mode|dark\s*theme|light\s*theme)\b/) || has(text, /\b(dark|light|night)\b/) && has(text, /\b(mode|theme)\b/)) {
        const changing = has(text, /\b(turn|set|make|switch|enable|disable|use)\b/);
        const dark = has(text, /\b(dark|night)\b/);
        const light = has(text, /\blight\b/);
        if (changing && dark && has(text, /\b(off|disable)\b/)) add("theme_light", 9);
        else if (changing && light && has(text, /\b(off|disable)\b/) && !dark) add("theme_dark", 9);
        else if (changing && dark && !light) add("theme_dark", 9);
        else if (changing && light && !dark) add("theme_light", 9);
        else add("theme_status", 7);
    }
    if (has(text, /\bdefault\s+(?:app|apps|browser|program|programs)\b/) || has(text, /\bdefaults\b/)) {
        if (has(text, /\b(change|set|pick|choose|open)\b/)) add("defaults_open", 8);
        else add("defaults_status", 7);
    }
    if (has(text, /\b(windows\s+updates?|check\s+for\s+updates)\b/) || has(text, /\bupdates?\b/) && has(text, /\bwindows\b/)) {
        if (has(text, /\binstall\b/)) add("windows_update_install", 8);
        else if (has(text, /\b(scan|search)\b/)) add("windows_update_scan", 8);
        else add("windows_update_status", 7);
    }
    if (has(text, /\bclipboard\b/) || has(text, /\bpasteboard\b/) || has(text, /\bwhat\s+(?:did|have)\s+i\s+cop(?:y|ied)\b/)) {
        add("clipboard_read", 8);
    }
    const typed = text.match(/\b(?:type|enter)\s+(.{1,120}?)\s+(?:in|into|on)\s+(?:the\s+)?([a-z0-9 ._-]{1,40})$/);
    if (typed) add("ui_type", 8, `${typed[2].trim()}|${typed[1].trim()}`);
    const clicked = text.match(/\bclick\s+(?:the\s+)?(.{1,60}?)\s+(?:in|on|inside)\s+(?:the\s+)?([a-z0-9 ._-]{1,40})$/);
    if (clicked) add("ui_click", 8, `${clicked[2].trim()}|${clicked[1].replace(/\bbutton\b/g, "").trim()}`);
    const volumeTopic = has(text, /\b(volume|loud|loudness)\b/) || has(text, /\b(sound|speakers?|audio)\b/) && has(text, /\b(volume|loud|level|mute|unmute)\b/);
    const volumeShift = volumeTopic && has(text, /\b(up|down|higher|lower|increase|decrease|louder|quieter)\b/);
    const volumeNumber = text.match(/\b(\d{1,3})\b/);
    const statusQuestion = has(text, /\b(is|are|status|currently|already|what(?:'s| is)|how)\b/) && !has(text, /\b(turn|set|make|switch)\b/);
    if (!volumeShift && volumeTopic && volumeNumber && has(text, /\b(set|make|turn|change|put)\b/) && Number(volumeNumber[1]) <= 100) {
        add("volume_set", 9, String(Number(volumeNumber[1])));
    } else if (has(text, /\bunmute\b/) || has(text, /\bturn\b/) && has(text, /\b(sound|volume|speakers?|audio)\s+on\b/)) {
        if (!statusQuestion) add("volume_unmute", 8);
        else if (volumeTopic) add("volume_status", 7);
    } else if (has(text, /\b(mute|silence)\b/) || has(text, /\b(sound|volume|speakers?|audio)\s+off\b/) || has(text, /\b(sound|volume|speakers?|audio)\b/) && has(text, /\bturn\b/) && has(text, /\boff\b/) && !has(text, /\bdisable\b/)) {
        if (!statusQuestion) add("volume_mute", 8);
        else if (volumeTopic || has(text, /\b(sound|volume|speakers?|audio)\b/)) add("volume_status", 7);
    } else if (volumeTopic && !volumeShift) {
        add("volume_status", 7);
    }
    if (has(text, /\bbluetooth\b/)) {
        const changing = has(text, /\b(turn|switch|set|enable|disable)\b/);
        if (!statusQuestion && changing && (has(text, /\boff\b/) || has(text, /\bdisable\b/))) add("bluetooth_off", 9);
        else if (!statusQuestion && changing && (has(text, /\bon\b/) || has(text, /\benable\b/))) add("bluetooth_on", 9);
        else add("bluetooth_status", 7);
    }
    if (has(text, /\bfirewall\b/)) {
        const changing = has(text, /\b(turn|switch|set|enable|disable)\b/);
        if (!statusQuestion && changing && (has(text, /\boff\b/) || has(text, /\bdisable\b/))) add("firewall_off", 9);
        else if (!statusQuestion && changing && (has(text, /\bon\b/) || has(text, /\benable\b/))) add("firewall_on", 9);
        else add("firewall_status", 7);
    }
    if (has(text, /\b(wi-?fi|wireless)\b/)) {
        const changing = has(text, /\b(turn|switch|enable|disable)\b/) && has(text, /\b(on|off|enable|disable)\b/);
        if (!changing) add("wifi_status", 7);
    } else if (has(text, /\b(network\s+adapter|ethernet|internet\s+connection|am\s+i\s+online)\b/) || has(text, /\b(network|internet)\b/) && has(text, /\b(status|check|show|connected|connection|working|up|down)\b/)) {
        add("network_status", 7);
    }
    if (has(text, /\bprinters?\b/)) add("printers_status", 7);
    if (has(text, /\b(camera|webcam)\b/)) {
        if (asks(text, "off")) add("device_disable", 8, "camera");
        else if (asks(text, "on")) add("device_enable", 8, "camera");
        else add("camera_status", 7);
    }
    if (has(text, /\b(microphone|mic)\b/)) {
        if (asks(text, "off")) add("microphone_off", 8);
        else if (asks(text, "on")) add("microphone_on", 8);
        else if (!volumeTopic) add("audio_status", 6);
    }
    if (has(text, /\b(audio\s+devices?|sound\s+devices?|speakers?|headset)\b/) && !volumeTopic && !has(text, /\b(mute|unmute|volume|loud)\b/) && !has(text, /\b(enable|disable|turn)\b/)) {
        add("audio_status", 7);
    }
    if (has(text, /\bpower\s+(plan|scheme|mode)\b/) || has(text, /\bwhich\s+power\b/) || has(text, /\bactive\s+power\b/)) add("power_status", 7);
    if (has(text, /\bstartup\b/) || has(text, /\bstarts?\s+with\s+windows\b/) || has(text, /\bwhen\s+(?:i\s+)?(?:start|boot)\s+windows\b/) || has(text, /\bboot\s+apps\b/)) {
        add("startup_status", 7);
    }
    if (has(text, /\b(installed\s+(?:programs|apps)|what(?:'s| is)\s+installed|programs\s+installed|list\s+(?:the\s+)?(?:programs|apps))\b/)) {
        add("programs_status", 7);
    }
    const foundProgram = text.match(/\b(?:find|search)\s+(?:for\s+)?(?:the\s+)?(?:program|app)\s+([a-z0-9 ._-]{1,40})/);
    if (foundProgram) add("programs_status", 8, foundProgram[1].trim());
    const installed = text.match(/\bis\s+([a-z0-9._-]{1,40})\s+installed\b/);
    const installedName = cleanName(installed?.[1]);
    if (installedName) add("programs_status", 7, installedName);
    if (has(text, /\b(devices|peripherals)\b/) || has(text, /\bwhat(?:'s| is)\s+connected\b/) || has(text, /\bconnected\s+devices\b/)) {
        add("devices_status", 7);
    }
    const specificPart = percent || batteryWord || diskWord || ramWord || cpuWord || has(text, /\b(gpu|graphics|display|monitor|wifi|wi-fi|bluetooth|firewall|volume|camera|printer)\b/);
    if (!specificPart && (has(text, /\b(all\s+components|hardware\s+status|full\s+(?:pc\s+)?status|system\s+status|pc\s+status|computer\s+status)\b/) || has(text, /\b(pc|computer|machine|laptop)\b/) && has(text, /\b(status|health|doing|overview|hardware|components)\b/) || /^(?:how(?:'s| is)\s+)?(?:check\s+|show\s+)?(?:the\s+|my\s+)?(?:pc|computer|system|laptop|machine)(?:\s+doing)?$/.test(text))) {
        add("components_status", 8);
    }
    if (/^(?:shut\s*down|shutdown|power\s*off)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(text) || has(text, /\b(?:turn|power|switch)\s+off\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\b/) || has(text, /\b(?:shut\s*down|shutdown|power\s*off)\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\b/)) {
        add("shutdown", 9);
    }
    if (/^(?:restart|reboot)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop|windows))?$/.test(text) || has(text, /\b(?:restart|reboot)\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop|windows)\b/)) {
        add("restart", 8);
    }
    if (/^(?:sleep|suspend)(?:\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop))?$/.test(text) || has(text, /\bput\s+(?:the\s+|my\s+)?(?:computer|pc|system|machine|laptop)\s+to\s+sleep\b/) || text === "go to sleep") {
        add("sleep", 8);
    }
    const serviceStatus = text.match(/\b(?:is|check|show)\s+(?:if\s+|whether\s+|that\s+)?(?:the\s+)?service\s+([a-z0-9._-]{1,40})(?:\s+running)?\b/) || text.match(/\b(?:is|check)\s+(?:if\s+|whether\s+)?(?:the\s+)?([a-z0-9._-]{1,40})\s+service\s+(?:is\s+)?running\b/);
    const serviceName = cleanName(serviceStatus?.[1]);
    if (serviceName) add("service_status", 8, serviceName);
    const serviceChange = text.match(/\b(start|stop)\s+(?:the\s+)?(?:([a-z0-9._-]{1,40})\s+)?service(?:\s+([a-z0-9._-]{1,40}))?\b/);
    const serviceChangeName = cleanName(serviceChange?.[3] || serviceChange?.[2]);
    if (serviceChange && serviceChangeName) {
        add(serviceChange[1] === "start" ? "service_start" : "service_stop", 8, serviceChangeName);
    }
    if (!has(text, /\bservice\b/)) {
        const processStatus = text.match(/\b(?:is|check|ensure|make\s+sure)\s+(?:if\s+|whether\s+|that\s+)?(?:the\s+)?(?:process\s+)?([a-z0-9._-]{1,40})\s+(?:is\s+)?(?:still\s+)?running\b/);
        const processName = cleanName(processStatus?.[1]);
        if (processName) add("process_status", 8, processName);
        const processStop = text.match(/\b(?:stop|end|kill|quit|close)\s+(?:the\s+)?(?:process\s+)?([a-z0-9._-]{1,40})\b/);
        const stopName = cleanName(processStop?.[1]);
        if (stopName) add("process_stop", 8, stopName);
    }
    if (!has(text, /\b(bluetooth|firewall|camera|webcam|microphone|mic|wifi|wi-fi|volume|sound|brightness|clipboard|theme|dark|light|night|update|updates|default|defaults|picture|photo|screenshot)\b/)) {
        const unsafeTarget = /\b(format|wipe|erase|delete|everything|files)\b/;
        const device = text.match(/\b(enable|disable)\s+(?:the\s+|my\s+)?([a-z0-9][a-z0-9 ._()/-]{0,60})/);
        const turned = text.match(/\bturn\s+(on|off)\s+(?:the\s+|my\s+)?([a-z0-9][a-z0-9 ._-]{0,40})/);
        if (device && !/^(it|that|this|them)$/.test(device[2].trim()) && !unsafeTarget.test(device[2])) {
            add(device[1] === "enable" ? "device_enable" : "device_disable", 7, device[2].trim());
        } else if (turned && !/^(it|that|this|computer|pc|system|laptop|machine|speaker|audio)$/.test(turned[2].trim()) && !unsafeTarget.test(turned[2])) {
            add(turned[1] === "on" ? "device_enable" : "device_disable", 7, turned[2].trim());
        }
    }
    if (/^(?:start\s+)?(?:listen|listening|hear\s+me)(?:\s+to\s+me)?(?:\s+for\s+(?:a\s+)?(?:few|moment|\d{1,2})\s*(?:seconds?)?)?$/.test(text)) {
        add("listen", 7, "8");
    }
    const spoken = text.match(/^(?:say|speak)(?:\s+aloud)?\s+(.{1,180})$/);
    if (spoken && !has(spoken[1], /\b(read|file|folder|project|run|open|install|code|document|video)\b/)) {
        add("speak", 6, spoken[1].trim());
    }
    const transcribe = text.match(/\btranscribe\s+(\S+)/);
    if (transcribe) add("transcribe", 8, transcribe[1].replace(/^["']|["']$/g, ""));
    return best(hits);
}
}),
"[project]/lib/typos.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "correctTypos",
    ()=>correctTypos
]);
/** Correct a mistyped word toward the command vocabulary. Unknown words stay as they are. */ const VOCAB = [
    "battery",
    "brightness",
    "bluetooth",
    "firewall",
    "screenshot",
    "picture",
    "photo",
    "memory",
    "processor",
    "graphics",
    "display",
    "monitor",
    "volume",
    "printer",
    "printers",
    "camera",
    "webcam",
    "microphone",
    "startup",
    "network",
    "internet",
    "wireless",
    "storage",
    "clipboard",
    "update",
    "updates",
    "default",
    "defaults",
    "theme",
    "restart",
    "reboot",
    "shutdown",
    "transcribe",
    "sleep",
    "mute",
    "unmute",
    "increase",
    "decrease",
    "status",
    "computer",
    "laptop",
    "percentage",
    "percent",
    "disk",
    "drive",
    "space",
    "wifi",
    "speaker",
    "speakers",
    "installed",
    "devices",
    "process",
    "service",
    "enable",
    "disable",
    "capture",
    "charging",
    "keyboard",
    "touchpad",
    "notepad",
    "windows",
    "dark",
    "light",
    "install",
    "scan",
    "click",
    "eject",
    "unplug",
    "flash",
    "usb",
    "removable"
];
const KNOWN = new Set(VOCAB);
/** Real words that sit one edit from a command. They are not typos. */ const KEEP = new Set([
    "enabled",
    "disabled",
    "increased",
    "decreased",
    "updated",
    "displayed",
    "pictured",
    "captured",
    "restarted",
    "muted",
    "unmuted"
]);
function distance(left, right) {
    if (Math.abs(left.length - right.length) > 2) return 9;
    const row = Array.from({
        length: right.length + 1
    }, (_, index)=>index);
    for(let i = 1; i <= left.length; i += 1){
        let previous = row[0];
        row[0] = i;
        for(let j = 1; j <= right.length; j += 1){
            const current = row[j];
            const cost = left[i - 1] === right[j - 1] ? 0 : 1;
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + cost);
            previous = current;
        }
    }
    return row[right.length];
}
function isSubsequence(shorter, longer) {
    let index = 0;
    for (const char of longer){
        if (char === shorter[index]) index += 1;
        if (index === shorter.length) return true;
    }
    return false;
}
function correctToken(token) {
    const word = token.toLowerCase();
    if (word.length < 4 || KNOWN.has(word) || KEEP.has(word) || /[0-9:\\/]/.test(word)) return token;
    const allowed = word.length >= 6 ? 2 : 1;
    let best = "";
    let bestDistance = allowed + 1;
    let ties = 0;
    for (const candidate of VOCAB){
        if (candidate[0] !== word[0]) continue;
        const score = distance(word, candidate);
        if (score < bestDistance) {
            best = candidate;
            bestDistance = score;
            ties = 1;
        } else if (score === bestDistance && candidate !== best) {
            ties += 1;
        }
    }
    if (!best || ties !== 1 || bestDistance > allowed) return token;
    if (best.startsWith(word) && /^(?:ed|ing|s|es|d)$/.test(best.slice(word.length))) return token;
    if (word.startsWith(best) && /^(?:ed|ing|s|es|d)$/.test(word.slice(best.length))) return token;
    if (bestDistance > 1) {
        const shorter = word.length <= best.length ? word : best;
        const longer = word.length > best.length ? word : best;
        if (!isSubsequence(shorter, longer)) return token;
    }
    return best;
}
function correctTypos(content) {
    return content.split(/(\s+)/).map((part)=>/\s/.test(part) ? part : correctToken(part)).join("");
}
}),
"[project]/lib/webAsk.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "decodeWebAsk",
    ()=>decodeWebAsk,
    "encodeWebAsk",
    ()=>encodeWebAsk,
    "parsePublicUrl",
    ()=>parsePublicUrl
]);
/** Public-web permission. Safe for the browser bundle: no network and no files. */ const WEB_ASK_MARKER = /<!--web-ask:([\s\S]*?)-->/;
function encodeWebAsk(url) {
    return `\n\nInternet is connected. Allow this page for the goal?\n${url}\n\n<!--web-ask:${encodeURIComponent(url)}-->`;
}
function decodeWebAsk(content) {
    const match = content.match(WEB_ASK_MARKER);
    const text = content.replace(WEB_ASK_MARKER, "").trim();
    if (!match) return {
        text,
        url: null
    };
    try {
        const url = decodeURIComponent(match[1]);
        return {
            text,
            url: parsePublicUrl(url).ok ? url : null
        };
    } catch  {
        return {
            text,
            url: null
        };
    }
}
function isPrivateHost(host) {
    const name = host.replace(/^\[|\]$/g, "").toLowerCase();
    if (!name || name === "localhost" || name.endsWith(".localhost") || name.endsWith(".local")) return true;
    if (name === "::1" || name === "0.0.0.0") return true;
    const parts = name.split(".");
    if (parts.length !== 4 || parts.some((part)=>!/^\d+$/.test(part))) return name.includes(":");
    const numbers = parts.map((part)=>Number(part));
    const [a, b] = numbers;
    if (numbers.some((part)=>part > 255)) return true;
    if (a === 10 || a === 127 || a === 0) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 169 && b === 254) return true;
    return false;
}
function parsePublicUrl(value) {
    const raw = value.trim();
    if (!raw) return {
        ok: false,
        reason: "No page was named."
    };
    let parsed;
    try {
        parsed = new URL(raw);
    } catch  {
        return {
            ok: false,
            reason: "That is not a web address."
        };
    }
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
        return {
            ok: false,
            reason: "Only an http or https page can be opened."
        };
    }
    if (parsed.username || parsed.password) return {
        ok: false,
        reason: "A page address cannot carry a password."
    };
    if (isPrivateHost(parsed.hostname)) return {
        ok: false,
        reason: "That address is on this PC or a private network, so the web tool left it alone."
    };
    return {
        ok: true,
        url: parsed.toString()
    };
}
}),
];

//# sourceMappingURL=_1jcrfl0._.js.map