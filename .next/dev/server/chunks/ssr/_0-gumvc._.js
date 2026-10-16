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
"use client";
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
    const [modelSizes, setModelSizes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [freeMemoryMb, setFreeMemoryMb] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
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
    // ── Ollama source tracking ────────────────────────────────────────────────
    const [ollamaSource, setOllamaSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("offline");
    // ── Load models (auto-refresh every 30s to pick up newly pulled models) ──
    const fetchModels = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (keepCurrent = true)=>{
        try {
            const r = await fetch("/api/models");
            const d = await r.json();
            const names = (d.models ?? []).map((m)=>m.name);
            const sizes = {};
            for (const model of d.models ?? [])sizes[model.name] = model.size ?? 0;
            setModels(names);
            setModelSizes(sizes);
            setFreeMemoryMb(typeof d.free_memory_mb === "number" ? d.free_memory_mb : null);
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
                                content: accumulated
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
        const isVision = (m)=>[
                "llava",
                "moondream",
                "minicpm-v",
                "bakllava"
            ].some((p)=>m.toLowerCase().startsWith(p));
        const isCoder = (m)=>m.toLowerCase().includes("coder");
        const isGeneral = (m)=>!isCoder(m) && !isVision(m);
        const tiny = models.find((m)=>isCoder(m) && m.includes("1.5b"));
        const small = models.find((m)=>isCoder(m) && m.includes("7b"));
        const large = models.find((m)=>isCoder(m) && (m.includes("14b") || m.includes("13b")));
        const general = models.find((m)=>isGeneral(m)); // qwen3:8b
        const vision = models.find((m)=>isVision(m)); // llava:7b
        // Leave headroom for Windows, Ollama, and the Next.js server when choosing a model.
        const canFit = (candidate)=>{
            if (!candidate) return false;
            if (freeMemoryMb === null) return candidate.includes("1.5b");
            const modelMb = (modelSizes[candidate] ?? 0) / 1024 / 1024;
            return freeMemoryMb > modelMb + 2048;
        };
        const firstFitting = (...candidates)=>candidates.find(canFit) ?? null;
        // Images get a vision pass first. The agent route then hands the result to a coder.
        if (images && images.length > 0) {
            const fittingVision = firstFitting(vision);
            return fittingVision && fittingVision !== activeModel ? fittingVision : null;
        }
        // Very short conversational messages should never wake a multi-gigabyte model.
        const casualTask = wordCount <= 6 && !/\b(code|file|folder|project|bug|error|help|explain|why|how|create|edit|run)\b/.test(lower);
        if (forAgent && casualTask) {
            const casualModel = firstFitting(general, tiny, small);
            return casualModel && casualModel !== activeModel ? casualModel : null;
        }
        const hasCodeKeyword = /\b(function|class|component|hook|route|api|sql|bug|error|fix|refactor|implement|build|create a file|script|compile|deploy|import|export|interface|type |enum|async|await|fetch|database|query|css|html|jsx|tsx|python|javascript|typescript|react|next\.?js|node)\b/;
        const codeTask = hasCodeKeyword.test(lower) || /\b(create|edit|update|change|delete|remove|add|write|implement|run|test|debug)\b/.test(lower);
        const complexTask = /\b(architecture|full (page|app|website|system|backend|frontend|api)|scaffold|entire|whole project|from scratch|multi.?file|design system|database schema|migrate|migration)\b/;
        const deepTask = complexTask.test(lower) && (wordCount >= 6 || /\b(architecture|from scratch|multi.?file|database schema|migration)\b/.test(lower));
        // Larger coding tasks need the strongest available coder.
        if (deepTask) {
            const complexModel = firstFitting(large, small, tiny);
            return complexModel && complexModel !== activeModel ? complexModel : null;
        }
        // Small edits can be handled quickly; normal coding uses the 7B coder.
        const minorEdit = /\b(rename|change the|replace|swap|update the|fix the|add a|remove the|delete the|move the|make it|set the|convert|just|only)\b/;
        if (codeTask && wordCount <= 20 && minorEdit.test(lower)) {
            const quickCodeModel = firstFitting(tiny, small);
            return quickCodeModel && quickCodeModel !== activeModel ? quickCodeModel : null;
        }
        if (codeTask) {
            const codeModel = firstFitting(small, tiny);
            return codeModel && codeModel !== activeModel ? codeModel : null;
        }
        // Short explanations and quick questions favor the general model.
        if (forAgent && (wordCount <= 16 || /\b(explain|what is|why|how does|summarize|compare|recommend|suggest)\b/.test(lower))) {
            const explanationModel = firstFitting(general, tiny, small);
            return explanationModel && explanationModel !== activeModel ? explanationModel : null;
        }
        return forAgent ? firstFitting(general, small, tiny) ?? null : null;
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
            label: "Chat",
            icon: "◉"
        },
        {
            id: "files",
            label: "Files",
            icon: "📁"
        },
        {
            id: "terminal",
            label: "Terminal",
            icon: "⚡"
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: "flex",
            height: "100vh",
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Sidebar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                sessions: sessions,
                activeId: activeSessionId,
                workspace: workspace,
                selectedFiles: selectedFilePaths,
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
                lineNumber: 436,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    background: "var(--bg-base)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            borderBottom: "1px solid var(--border)",
                            background: "var(--bg-panel)",
                            flexShrink: 0
                        },
                        children: [
                            panelButtons.map((btn)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActivePanel(btn.id),
                                    style: {
                                        padding: "9px 18px",
                                        background: "none",
                                        border: "none",
                                        borderBottom: activePanel === btn.id ? "2px solid var(--accent)" : "2px solid transparent",
                                        color: activePanel === btn.id ? "var(--accent)" : "var(--text-muted)",
                                        cursor: "pointer",
                                        fontSize: 12,
                                        fontWeight: activePanel === btn.id ? 600 : 400,
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 5,
                                        transition: "color 0.15s"
                                    },
                                    children: [
                                        btn.icon,
                                        " ",
                                        btn.label
                                    ]
                                }, btn.id, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    flex: 1
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 469,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: "9px 14px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 5,
                                    fontSize: 11,
                                    color: "var(--text-muted)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            width: 6,
                                            height: 6,
                                            borderRadius: "50%",
                                            background: models.length > 0 ? "var(--success)" : "var(--danger)",
                                            display: "inline-block"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this),
                                    models.length > 0 ? `Ollama · ${models.length} models` : "Ollama offline",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fetchModels(true),
                                        title: "Refresh model list",
                                        style: {
                                            background: "none",
                                            border: "none",
                                            color: "var(--text-muted)",
                                            cursor: "pointer",
                                            fontSize: 12,
                                            padding: "0 2px",
                                            lineHeight: 1
                                        },
                                        children: "↻"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 473,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fetch("/api/unload", {
                                                method: "POST",
                                                headers: {
                                                    "Content-Type": "application/json"
                                                },
                                                body: JSON.stringify({})
                                            }).then(()=>fetchModels(true)),
                                        title: "Unload all models from RAM",
                                        style: {
                                            background: "none",
                                            border: "1px solid var(--border)",
                                            color: "var(--text-muted)",
                                            cursor: "pointer",
                                            fontSize: 10,
                                            padding: "1px 6px",
                                            borderRadius: 4,
                                            lineHeight: 1.4
                                        },
                                        children: "⏏ Free RAM"
                                    }, void 0, false, {
                                        fileName: "[project]/app/page.tsx",
                                        lineNumber: 478,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1,
                            overflow: "hidden",
                            display: "flex",
                            flexDirection: "column"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: activePanel === "chat" ? "flex" : "none",
                                    flex: 1,
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
                                    lineNumber: 488,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 487,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: activePanel === "files" ? "flex" : "none",
                                    flex: 1,
                                    minHeight: 0,
                                    flexDirection: "column"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FileBrowser$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onInsertToChat: handleInsertToChat
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: activePanel === "terminal" ? "flex" : "none",
                                    flex: 1,
                                    minHeight: 0,
                                    flexDirection: "column"
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$TerminalPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onInsertToChat: handleInsertToChat
                                }, void 0, false, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 514,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 486,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 435,
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
"use client";
;
;
;
;
;
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
                        lineNumber: 101,
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
                        lineNumber: 103,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 85,
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
                        lineNumber: 125,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 107,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 84,
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
                        lineNumber: 176,
                        columnNumber: 44
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 164,
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
                        lineNumber: 197,
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
                                    lineNumber: 223,
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
                                    lineNumber: 224,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, m, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 209,
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
                        lineNumber: 229,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 163,
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
                lineNumber: 301,
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
                        lineNumber: 312,
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
                                        lineNumber: 326,
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
                                lineNumber: 325,
                                columnNumber: 13
                            }, this),
                            !isUser && thinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThinkBlock, {
                                content: thinking
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 331,
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
                                        lineNumber: 335,
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
                                                lineNumber: 352,
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
                                                lineNumber: 355,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 351,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 334,
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
                                lineNumber: 361,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 317,
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
                                lineNumber: 384,
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
                                lineNumber: 392,
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
                                lineNumber: 403,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 383,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 311,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 291,
        columnNumber: 5
    }, this);
}
function StreamingBubble({ content }) {
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
                lineNumber: 432,
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
                        lineNumber: 434,
                        columnNumber: 9
                    }, this),
                    thinking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThinkBlock, {
                        content: thinking,
                        streaming: isThinking
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 437,
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
                        lineNumber: 441,
                        columnNumber: 11
                    }, this) : isThinking ? null : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--text-muted)",
                            fontSize: 13
                        },
                        children: "▋"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 443,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 433,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 431,
        columnNumber: 5
    }, this);
}
function ToolEventBubble({ events }) {
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    if (events.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            marginBottom: 12,
            marginLeft: 38
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setExpanded((v)=>!v),
                style: {
                    background: "var(--bg-active)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    borderRadius: 6,
                    padding: "3px 10px",
                    cursor: "pointer",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    gap: 5
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "var(--accent)"
                        },
                        children: "⚡"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this),
                    events.filter((e)=>e.type === "tool_call").length,
                    " tool",
                    events.filter((e)=>e.type === "tool_call").length !== 1 ? "s" : "",
                    " used",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 9
                        },
                        children: expanded ? "▲" : "▼"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 477,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 467,
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
                                lineNumber: 487,
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
                                lineNumber: 490,
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
                                        lineNumber: 494,
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
                                        lineNumber: 496,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 493,
                                columnNumber: 17
                            }, this),
                            ev.type === "tool_result" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            color: "var(--success)",
                                            fontWeight: 600
                                        },
                                        children: [
                                            "✓ ",
                                            ev.tool
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 504,
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
                                            maxHeight: 100,
                                            overflow: "auto",
                                            border: "none"
                                        },
                                        children: ev.result
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 505,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 503,
                                columnNumber: 17
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 482,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 480,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 466,
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
                        lineNumber: 535,
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
                        lineNumber: 536,
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
                        lineNumber: 537,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 533,
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
                                lineNumber: 546,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 541,
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
                                lineNumber: 560,
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
                                lineNumber: 561,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 559,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 540,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 532,
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
    const [agentModelLabel, setAgentModelLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const agentMode = true;
    const [agentEvents, setAgentEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [agentMessages, setAgentMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialAgentMessages);
    const [pendingDiffs, setPendingDiffs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]); // diffs waiting for accept/reject
    const agentAbortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textareaRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [
        messages,
        streamingContent
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setLocalSystemPrompt(systemPrompt);
    }, [
        systemPrompt
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        agentAbortRef.current?.abort();
        setAgentRunning(false);
        setAgentModelLabel("");
        setAgentEvents([]);
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
            if (data.type === "document") {
                setAttachedDocs((prev)=>[
                        ...prev,
                        {
                            name: data.name,
                            ext: data.ext,
                            content: data.content
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
    async function sendAgent(userMessage, images, selectedModel = model) {
        if (!userMessage.trim() || agentRunning) return;
        const userEntry = {
            role: "user",
            content: userMessage
        };
        const newHistory = [
            ...agentMessages.map(({ toolEvents: _, diffEvents: __, ...m })=>m),
            userEntry
        ];
        setAgentMessages((prev)=>[
                ...prev,
                {
                    ...userEntry
                }
            ]);
        setAgentRunning(true);
        const currentEvents = [];
        const currentDiffs = [];
        let assistantText = "";
        // Fix: create abort controller and pass signal to fetch
        const abort = new AbortController();
        agentAbortRef.current = abort;
        try {
            const res = await fetch("/api/agent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    messages: newHistory,
                    model: selectedModel,
                    system_prompt: systemPrompt,
                    workspace_path: workspacePath,
                    images,
                    session_id: sessionId
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
                        if (data.event === "model") {
                            const ev = {
                                type: "model",
                                model: data.model,
                                role: data.role
                            };
                            currentEvents.push(ev);
                            setAgentModelLabel(`${data.model} · ${data.role}`);
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
                        } else if (data.event === "done") {
                            assistantText = data.fullText || assistantText;
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
                                        ]
                                    }
                                ]);
                            currentEvents.splice(0);
                            currentDiffs.splice(0);
                            setAgentEvents([]);
                        } else if (data.event === "error") {
                            setAgentMessages((prev)=>[
                                    ...prev,
                                    {
                                        role: "assistant",
                                        content: `❌ ${data.message}`,
                                        toolEvents: []
                                    }
                                ]);
                        }
                    } catch  {}
                }
            }
        } catch (err) {
            if (err?.name !== "AbortError") {
                setAgentMessages((prev)=>[
                        ...prev,
                        {
                            role: "assistant",
                            content: "❌ Agent error — is Ollama running?",
                            toolEvents: []
                        }
                    ]);
            }
        } finally{
            setAgentRunning(false);
            setAgentModelLabel("");
            setAgentEvents([]);
            agentAbortRef.current = null;
        }
    }
    const handleSend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const trimmed = input.trim();
        if (!trimmed && attachedImages.length === 0 && attachedDocs.length === 0 || streaming || agentRunning || !sessionId) return;
        // ── Slash commands ──────────────────────────────────────────────────────
        if (trimmed.startsWith("/")) {
            const [cmd, ...rest] = trimmed.slice(1).split(" ");
            const arg = rest.join(" ").trim();
            setInput("");
            if (textareaRef.current) textareaRef.current.style.height = "auto";
            switch(cmd.toLowerCase()){
                case "diff":
                    sendAgent(`Run: git diff HEAD${arg ? ` -- ${arg}` : ""} and show me what changed`);
                    return;
                case "undo":
                    sendAgent("Run: git log --oneline -5 to show recent commits, then revert the last AI commit with git revert HEAD --no-edit");
                    return;
                case "log":
                    sendAgent("Run: git log --oneline -15 and show me the recent commit history");
                    return;
                case "add":
                    if (!arg) {
                        setAgentMessages((prev)=>[
                                ...prev,
                                {
                                    role: "assistant",
                                    content: "Usage: `/add <file or glob>` e.g. `/add src/components/Button.tsx`",
                                    toolEvents: []
                                }
                            ]);
                        return;
                    }
                    sendAgent(`Read the file(s) matching "${arg}" and summarise what they contain so I have them in context`);
                    return;
                case "ls":
                    sendAgent(`List the directory: ${arg || workspacePath || "."}`);
                    return;
                case "run":
                    if (!arg) return;
                    sendAgent(`Run command: ${arg}`);
                    return;
                case "help":
                    setAgentMessages((prev)=>[
                            ...prev,
                            {
                                role: "assistant",
                                content: `**Slash commands:**\n- \`/diff [file]\` — show git diff\n- \`/undo\` — revert last AI commit\n- \`/log\` — git log last 15 commits\n- \`/add <file>\` — read file into context\n- \`/ls [path]\` — list directory\n- \`/run <command>\` — run any command\n- \`/help\` — show this list`,
                                toolEvents: []
                            }
                        ]);
                    return;
                default:
                    setAgentMessages((prev)=>[
                            ...prev,
                            {
                                role: "assistant",
                                content: `Unknown command: \`/${cmd}\`. Type \`/help\` for available commands.`,
                                toolEvents: []
                            }
                        ]);
                    return;
            }
        }
        // Agent mode — route to agent API
        if ("TURBOPACK compile-time truthy", 1) {
            let agentContent = trimmed;
            if (attachedDocs.length > 0) {
                const docBlocks = attachedDocs.map((d)=>`File: \`${d.name}\`\n\`\`\`${d.ext.slice(1)}\n${d.content}\n\`\`\``);
                agentContent = docBlocks.join("\n\n") + (trimmed ? "\n\n---\n\n" + trimmed : "");
            }
            if (!agentContent) agentContent = "(image attached)";
            const imageBase64s = attachedImages.map((i)=>i.base64);
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
    const canSend = (input.trim() || attachedImages.length > 0 || attachedDocs.length > 0) && !streaming && !agentRunning && !!sessionId;
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
                        fontSize: 44
                    },
                    children: "🦙"
                }, void 0, false, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 880,
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
                    lineNumber: 881,
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
                        " available · Ollama running"
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ChatWindow.tsx",
                    lineNumber: 882,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ChatWindow.tsx",
            lineNumber: 879,
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
                    padding: "7px 16px",
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
                        style: {
                            background: showSystem ? "var(--accent-dim)" : "transparent",
                            border: "1px solid " + (showSystem ? "var(--accent)" : "var(--border)"),
                            color: showSystem ? "var(--accent)" : "var(--text-muted)",
                            borderRadius: 6,
                            padding: "3px 8px",
                            cursor: "pointer",
                            fontSize: 11
                        },
                        children: "⚙ System"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 892,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 10,
                            color: "var(--success)",
                            fontStyle: "italic"
                        },
                        children: "⚡ Agent mode · file and command access enabled"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 899,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 903,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            if (confirm("Clear all messages?")) {
                                onClearHistory();
                                setAgentMessages([]);
                            }
                        },
                        style: {
                            background: "none",
                            border: "none",
                            color: "var(--text-muted)",
                            cursor: "pointer",
                            fontSize: 11,
                            padding: "3px 6px"
                        },
                        title: "Clear history",
                        children: "🗑 Clear"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 904,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 891,
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
                        lineNumber: 919,
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
                                lineNumber: 921,
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
                                lineNumber: 928,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 920,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 918,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 24px"
                },
                children: [
                    messages.length === 0 && agentMessages.length === 0 && !streaming && !agentRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: "center",
                            color: "var(--text-muted)",
                            marginTop: 60,
                            fontSize: 13
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: 32,
                                    marginBottom: 8
                                },
                                children: "🦙"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 937,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Send a message to start"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 938,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    marginTop: 4
                                },
                                children: [
                                    "Model: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            color: "var(--text-secondary)"
                                        },
                                        children: model
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 939,
                                        columnNumber: 62
                                    }, this),
                                    isVisionModel(model) ? " · 👁 vision" : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 939,
                                columnNumber: 13
                            }, this),
                            ("TURBOPACK compile-time truthy", 1) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontSize: 11,
                                    color: "var(--success)",
                                    marginTop: 8
                                },
                                children: "⚡ Agent mode — ask me to create files, edit code, run commands…"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 941,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ "TURBOPACK unreachable"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 936,
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
                            lineNumber: 949,
                            columnNumber: 11
                        }, this)),
                    !agentMode && streaming && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StreamingBubble, {
                        content: streamingContent
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 952,
                        columnNumber: 37
                    }, this),
                    agentMode && agentMessages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: m.role === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    gap: 10,
                                    marginBottom: 18,
                                    alignItems: "flex-start"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: "50%",
                                            background: "var(--accent)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 11,
                                            flexShrink: 0,
                                            border: "1px solid var(--border)",
                                            color: "#fff",
                                            fontWeight: 700
                                        },
                                        children: "U"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 959,
                                        columnNumber: 17
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
                                                    marginBottom: 2
                                                },
                                                children: "You"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 961,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: "var(--user-bubble)",
                                                    border: "1px solid var(--border)",
                                                    borderRadius: 10,
                                                    padding: "8px 12px",
                                                    color: "var(--text-primary)",
                                                    fontSize: 14,
                                                    whiteSpace: "pre-wrap"
                                                },
                                                children: m.content
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 962,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 960,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 958,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 10,
                                    marginBottom: 18,
                                    alignItems: "flex-start"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            width: 28,
                                            height: 28,
                                            borderRadius: "50%",
                                            background: "#1a2a0a",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 11,
                                            flexShrink: 0,
                                            border: "1px solid var(--success)",
                                            color: "var(--success)",
                                            fontWeight: 700
                                        },
                                        children: "⚡"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 967,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            maxWidth: "82%"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "var(--success)",
                                                    marginBottom: 4
                                                },
                                                children: "Agent"
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 969,
                                                columnNumber: 19
                                            }, this),
                                            m.toolEvents && m.toolEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolEventBubble, {
                                                events: m.toolEvents
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 970,
                                                columnNumber: 63
                                            }, this),
                                            m.diffEvents && m.diffEvents.map((d, di)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(DiffView, {
                                                    diff: d
                                                }, di, false, {
                                                    fileName: "[project]/components/ChatWindow.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 21
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "prose",
                                                style: {
                                                    color: "var(--text-primary)"
                                                },
                                                dangerouslySetInnerHTML: {
                                                    __html: renderMarkdown(m.content)
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/ChatWindow.tsx",
                                                lineNumber: 974,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 968,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 966,
                                columnNumber: 15
                            }, this)
                        }, i, false, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 956,
                            columnNumber: 11
                        }, this)),
                    agentMode && agentRunning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            gap: 10,
                            marginBottom: 18,
                            alignItems: "flex-start"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                    background: "#1a2a0a",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 11,
                                    flexShrink: 0,
                                    border: "1px solid var(--success)",
                                    color: "var(--success)",
                                    fontWeight: 700
                                },
                                children: "⚡"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 984,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    maxWidth: "82%"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: 10,
                                            color: "var(--success)",
                                            marginBottom: 4
                                        },
                                        children: [
                                            "Agent · working…",
                                            agentModelLabel ? ` · ${agentModelLabel}` : ""
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 986,
                                        columnNumber: 15
                                    }, this),
                                    agentEvents.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolEventBubble, {
                                        events: agentEvents
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 987,
                                        columnNumber: 42
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: 13,
                                            color: "var(--text-muted)"
                                        },
                                        children: "▋"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 988,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 985,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 983,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 993,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 934,
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
                        lineNumber: 999,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            color: "var(--warning)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: model
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1001,
                                columnNumber: 13
                            }, this),
                            " is text-only. Switch to ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "llava:7b"
                            }, void 0, false, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1001,
                                columnNumber: 62
                            }, this),
                            " (or another vision model) to process images."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1000,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 998,
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
                        lineNumber: 1009,
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
                                    lineNumber: 1013,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, f.path, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1011,
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
                                "📄 ",
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
                                    lineNumber: 1019,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/components/ChatWindow.tsx",
                            lineNumber: 1017,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1008,
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
                                lineNumber: 1031,
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
                                lineNumber: 1036,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1029,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1027,
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
                lineNumber: 1046,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: ".txt,.md,.json,.csv,.xml,.html,.ts,.tsx,.js,.jsx,.py,.go,.rs,.sh,.sql,.yaml,.yml,.toml,.pdf",
                multiple: true,
                hidden: true,
                onChange: handleFileInputChange
            }, void 0, false, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1047,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    padding: "10px 14px 12px",
                    borderTop: "1px solid var(--border)",
                    background: "var(--bg-panel)",
                    flexShrink: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            background: "var(--bg-input)",
                            border: "1px solid var(--border)",
                            borderRadius: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                ref: textareaRef,
                                value: input,
                                onChange: autoResize,
                                onKeyDown: handleKeyDown,
                                disabled: streaming,
                                placeholder: streaming ? "Generating… (Ctrl+V to paste image)" : ("TURBOPACK compile-time truthy", 1) ? "Message… · /help for commands · Enter to send" : "TURBOPACK unreachable",
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
                                lineNumber: 1052,
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
                                        lineNumber: 1066,
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
                                        lineNumber: 1068,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>imageInputRef.current?.click(),
                                        title: "Attach image (or Ctrl+V to paste)",
                                        style: {
                                            background: "none",
                                            border: "none",
                                            color: "var(--text-muted)",
                                            cursor: "pointer",
                                            fontSize: 15,
                                            padding: "3px 5px",
                                            borderRadius: 5
                                        },
                                        children: "🖼"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>fileInputRef.current?.click(),
                                        title: "Attach document",
                                        style: {
                                            background: "none",
                                            border: "none",
                                            color: "var(--text-muted)",
                                            cursor: "pointer",
                                            fontSize: 15,
                                            padding: "3px 5px",
                                            borderRadius: 5
                                        },
                                        children: "📎"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1078,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            flex: 1
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1084,
                                        columnNumber: 13
                                    }, this),
                                    streaming || agentRunning ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            onStopGeneration();
                                            agentAbortRef.current?.abort();
                                            setAgentRunning(false);
                                        },
                                        style: {
                                            background: "var(--danger)",
                                            border: "none",
                                            color: "#fff",
                                            borderRadius: 8,
                                            padding: "5px 12px",
                                            cursor: "pointer",
                                            fontSize: 12,
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 4
                                        },
                                        children: "⏹ Stop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1088,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleSend,
                                        disabled: !canSend,
                                        style: {
                                            background: canSend ? "var(--accent)" : "var(--bg-active)",
                                            border: "none",
                                            color: canSend ? "#fff" : "var(--text-muted)",
                                            borderRadius: 8,
                                            padding: "5px 14px",
                                            cursor: canSend ? "pointer" : "not-allowed",
                                            fontSize: 13,
                                            fontWeight: 600,
                                            transition: "background 0.15s"
                                        },
                                        children: "Send ↑"
                                    }, void 0, false, {
                                        fileName: "[project]/components/ChatWindow.tsx",
                                        lineNumber: 1095,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/ChatWindow.tsx",
                                lineNumber: 1064,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1051,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontSize: 10,
                            color: "var(--text-muted)",
                            marginTop: 5,
                            textAlign: "center"
                        },
                        children: ollamaSource === "cloud" ? "☁️ Running via Azure · inference in the cloud" : ollamaSource === "offline" ? "⚠️ Ollama offline · start Ollama or configure OLLAMA_HOST" : "Running locally via Ollama · no data leaves your machine"
                    }, void 0, false, {
                        fileName: "[project]/components/ChatWindow.tsx",
                        lineNumber: 1105,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ChatWindow.tsx",
                lineNumber: 1050,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ChatWindow.tsx",
        lineNumber: 888,
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
"[project]/components/Sidebar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Sidebar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FolderTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FolderTree.tsx [app-ssr] (ecmascript)");
"use client";
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
function Sidebar({ sessions, activeId, workspace, selectedFiles, onSelect, onNew, onDelete, onRename, onOpenFolder, onCloseFolder, onToggleFile }) {
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        style: {
            width: 248,
            minWidth: 248,
            display: "flex",
            flexDirection: "column",
            background: "var(--bg-panel)",
            borderRight: "1px solid var(--border)",
            height: "100%",
            overflow: "hidden"
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: 17
                                },
                                children: "🦙"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontWeight: 700,
                                    fontSize: 14,
                                    color: "var(--text-primary)",
                                    letterSpacing: "-0.01em"
                                },
                                children: "Ollama UI"
                            }, void 0, false, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onNew,
                        title: "New chat",
                        style: {
                            background: "var(--accent)",
                            border: "none",
                            color: "#fff",
                            borderRadius: 6,
                            width: 26,
                            height: 26,
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
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 97,
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
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    "Project"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/Sidebar.tsx",
                                lineNumber: 139,
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
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 138,
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
                                lineNumber: 164,
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
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 137,
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
                                        fontSize: 12
                                    },
                                    children: "📁"
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 225,
                                    columnNumber: 17
                                }, this),
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
                                    lineNumber: 226,
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
                                    lineNumber: 230,
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
                                    lineNumber: 234,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 216,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FolderTree$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            tree: workspace.tree,
                            selectedPaths: selectedFiles,
                            onToggle: onToggleFile
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 242,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 214,
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
                            lineNumber: 257,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 258,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontSize: 11
                            },
                            children: "Click 📂 to open a project"
                        }, void 0, false, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 259,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/Sidebar.tsx",
                    lineNumber: 249,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 203,
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
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            "Chats"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Sidebar.tsx",
                        lineNumber: 267,
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
                        lineNumber: 274,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 266,
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
                        lineNumber: 281,
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
                                    lineNumber: 308,
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
                                        lineNumber: 314,
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
                                                lineNumber: 337,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 10,
                                                    color: "var(--text-muted)",
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis"
                                                },
                                                children: s.model.split(":")[0]
                                            }, void 0, false, {
                                                fileName: "[project]/components/Sidebar.tsx",
                                                lineNumber: 349,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/Sidebar.tsx",
                                        lineNumber: 336,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 312,
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
                                            lineNumber: 358,
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
                                            lineNumber: 365,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/Sidebar.tsx",
                                    lineNumber: 357,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.id, true, {
                            fileName: "[project]/components/Sidebar.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Sidebar.tsx",
                lineNumber: 279,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Sidebar.tsx",
        lineNumber: 84,
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
];

//# sourceMappingURL=_0-gumvc._.js.map