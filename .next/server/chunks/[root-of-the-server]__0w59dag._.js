module.exports=[85148,(e,t,s)=>{t.exports=e.x("better-sqlite3-90e2652d1716b047",()=>require("better-sqlite3-90e2652d1716b047"))},33405,(e,t,s)=>{t.exports=e.x("child_process",()=>require("child_process"))},54799,(e,t,s)=>{t.exports=e.x("crypto",()=>require("crypto"))},22734,(e,t,s)=>{t.exports=e.x("fs",()=>require("fs"))},70406,(e,t,s)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,s)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,s)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,s)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,s)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,s)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,s)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,s)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,s)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},14747,(e,t,s)=>{t.exports=e.x("path",()=>require("path"))},24361,(e,t,s)=>{t.exports=e.x("util",()=>require("util"))},62294,12533,e=>{"use strict";let t=[{name:"",role:"files on disk"}],s=[{name:"",role:"no model"}];function r(e){if(!Array.isArray(e))return[];let t=[];for(let s of e){if(!s||"object"!=typeof s)continue;let e="string"==typeof s.name?s.name:"",r="string"==typeof s.role?s.role:"";(e||r)&&(t.some(t=>t.name===e&&t.role===r)||t.push({name:e,role:r}))}return t}e.s(["FILES_ANSWER",0,t,"SERVER_ANSWER",0,[{name:"",role:"server"}],"SESSION_LOG_ANSWER",0,[{name:"",role:"session log"}],"asAnswerModels",0,r,"modelsThatAnswered",0,function(e){if(e.fromFiles)return t;let r=[];return e.visionWorked&&e.visionModel&&r.push({name:e.visionModel,role:"vision"}),e.plannerWorked&&e.plannerModel&&r.push({name:e.plannerModel,role:e.plannerRole||"planner"}),e.executorWorked&&e.executorModel&&r.push({name:e.executorModel,role:e.executorRole||"coding"}),r.length?r:s}],12533);let n="1"===process.env.VERCEL||void 0!==process.env.VERCEL_ENV,a=new Map,o=new Map,i=new Map;function l(){return Math.floor(Date.now()/1e3)}let d=null;function u(){if(d)return d;let t=e.r(85148),s=e.r(22734),r=e.r(14747),n=r.join(process.cwd(),".data"),a=r.join(n,"ollama-ui.db");return s.existsSync(n)||s.mkdirSync(n,{recursive:!0}),(d=new t(a)).pragma("journal_mode = WAL"),d.pragma("foreign_keys = ON"),function(e){e.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id        TEXT PRIMARY KEY,
      title     TEXT NOT NULL DEFAULT 'New Chat',
      model     TEXT NOT NULL,
      system_prompt TEXT NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL DEFAULT (unixepoch()),
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE TABLE IF NOT EXISTS messages (
      id         TEXT PRIMARY KEY,
      session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
      role       TEXT NOT NULL CHECK(role IN ('user','assistant','system')),
      content    TEXT NOT NULL,
      channel    TEXT NOT NULL DEFAULT 'chat',
      created_at INTEGER NOT NULL DEFAULT (unixepoch())
    );

    CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id, created_at);
  `);try{e.exec("ALTER TABLE messages ADD COLUMN channel TEXT NOT NULL DEFAULT 'chat'")}catch{}try{e.exec("ALTER TABLE messages ADD COLUMN models_json TEXT NOT NULL DEFAULT '[]'")}catch{}e.exec("CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(session_id, channel, created_at)"),e.exec(`
    CREATE TABLE IF NOT EXISTS agent_state (
      session_id TEXT PRIMARY KEY REFERENCES sessions(id) ON DELETE CASCADE,
      inspected_files TEXT NOT NULL DEFAULT '[]',
      decisions TEXT NOT NULL DEFAULT '[]',
      tool_results TEXT NOT NULL DEFAULT '[]',
      tests_run TEXT NOT NULL DEFAULT '[]',
      phase TEXT NOT NULL DEFAULT 'idle',
      model TEXT NOT NULL DEFAULT '',
      model_role TEXT NOT NULL DEFAULT '',
      updated_at INTEGER NOT NULL DEFAULT (unixepoch())
    );
    CREATE TABLE IF NOT EXISTS agent_jobs (
      id TEXT PRIMARY KEY,
      session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
      status TEXT NOT NULL,
      phase TEXT NOT NULL,
      model TEXT NOT NULL DEFAULT '',
      role TEXT NOT NULL DEFAULT '',
      error TEXT,
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_agent_jobs_session ON agent_jobs(session_id, updated_at);
  `)}(d),d}function c(e){return n?a.get(e):u().prepare("SELECT * FROM sessions WHERE id = ?").get(e)}function p(e){return{session_id:e,inspected_files:[],decisions:[],tool_results:[],tests_run:[],phase:"idle",model:"",model_role:"",updated_at:l()}}function E(e){if(n)return i.get(e)??p(e);let t=u().prepare("SELECT * FROM agent_state WHERE session_id = ?").get(e);return t?{session_id:t.session_id,inspected_files:JSON.parse(t.inspected_files),decisions:JSON.parse(t.decisions),tool_results:JSON.parse(t.tool_results),tests_run:JSON.parse(t.tests_run),phase:t.phase,model:t.model,model_role:t.model_role,updated_at:t.updated_at}:p(e)}function T(e){return{id:e.id,session_id:e.session_id,role:e.role,content:e.content,channel:e.channel,created_at:e.created_at,models:e.models?.length?r(e.models):r(function(e){if(!e)return[];try{return JSON.parse(e)}catch{return[]}}(e.models_json))}}e.s(["addMessage",0,function(e,t,s,i,d="chat",c=[]){let p=r(c);if(n){let r={id:e,session_id:t,role:s,content:i,channel:d,created_at:l(),models:p};o.set(e,r);let n=a.get(t);return n&&a.set(t,{...n,updated_at:l()}),r}let E=u();return E.prepare("INSERT INTO messages (id, session_id, role, content, channel, models_json) VALUES (?, ?, ?, ?, ?, ?)").run(e,t,s,i,d,JSON.stringify(p)),E.prepare("UPDATE sessions SET updated_at = unixepoch() WHERE id = ?").run(t),T(E.prepare("SELECT * FROM messages WHERE id = ?").get(e))},"clearMessages",0,function(e){if(n){for(let[t,s]of o.entries())s.session_id===e&&o.delete(t);return}u().prepare("DELETE FROM messages WHERE session_id = ?").run(e)},"createSession",0,function(e,t,s="New Chat",r=""){if(n){let n=l(),o={id:e,title:s,model:t,system_prompt:r,created_at:n,updated_at:n};return a.set(e,o),o}return u().prepare("INSERT INTO sessions (id, title, model, system_prompt) VALUES (?, ?, ?, ?)").run(e,s,t,r),c(e)},"deleteSession",0,function(e){if(n){for(let[t,s]of(a.delete(e),i.delete(e),o.entries()))s.session_id===e&&o.delete(t);return}u().prepare("DELETE FROM sessions WHERE id = ?").run(e)},"getAgentJob",0,function(e){if(!n)return u().prepare("SELECT * FROM agent_jobs WHERE id = ?").get(e)},"getAgentState",0,E,"getMessages",0,function(e,t){return n?Array.from(o.values()).filter(s=>s.session_id===e&&(!t||s.channel===t)).sort((e,t)=>e.created_at-t.created_at).map(e=>T(e)):(t?u().prepare("SELECT * FROM messages WHERE session_id = ? AND channel = ? ORDER BY created_at ASC").all(e,t):u().prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY created_at ASC").all(e)).map(T)},"getSession",0,c,"listAgentJobs",0,function(e){return n?[]:u().prepare("SELECT * FROM agent_jobs WHERE session_id = ? ORDER BY updated_at DESC LIMIT 20").all(e)},"listSessions",0,function(){return n?Array.from(a.values()).sort((e,t)=>t.updated_at-e.updated_at):u().prepare("SELECT * FROM sessions ORDER BY updated_at DESC").all()},"saveAgentJob",0,function(e){return n||u().prepare(`
    INSERT INTO agent_jobs (id, session_id, status, phase, model, role, error, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      status = excluded.status, phase = excluded.phase, model = excluded.model,
      role = excluded.role, error = excluded.error, updated_at = excluded.updated_at
  `).run(e.id,e.session_id??null,e.status,e.phase,e.model??"",e.role??"",e.error??null,e.created_at,e.updated_at),e},"sessionTitleFromMessage",0,function(e){let t=e.replace(/\s+/g," ").trim();return t?t.length>42?`${t.slice(0,42)}…`:t:"New Chat"},"updateAgentState",0,function(e,t){let s={...E(e),...t,updated_at:l()};return(s.inspected_files=s.inspected_files.slice(-100),s.decisions=s.decisions.slice(-50),s.tool_results=s.tool_results.slice(-30),s.tests_run=s.tests_run.slice(-20),n)?i.set(e,s):u().prepare(`
    INSERT INTO agent_state (session_id, inspected_files, decisions, tool_results, tests_run, phase, model, model_role, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(session_id) DO UPDATE SET
      inspected_files = excluded.inspected_files,
      decisions = excluded.decisions,
      tool_results = excluded.tool_results,
      tests_run = excluded.tests_run,
      phase = excluded.phase,
      model = excluded.model,
      model_role = excluded.model_role,
      updated_at = excluded.updated_at
  `).run(e,JSON.stringify(s.inspected_files),JSON.stringify(s.decisions),JSON.stringify(s.tool_results),JSON.stringify(s.tests_run),s.phase,s.model,s.model_role,s.updated_at),s},"updateSession",0,function(e,t){if(n){let s=a.get(e);if(!s)return;let r={...s,...t,updated_at:l()};return a.set(e,r),r}let s=u(),r=[],o=[];return void 0!==t.title&&(r.push("title = ?"),o.push(t.title)),void 0!==t.model&&(r.push("model = ?"),o.push(t.model)),void 0!==t.system_prompt&&(r.push("system_prompt = ?"),o.push(t.system_prompt)),0===r.length||(r.push("updated_at = unixepoch()"),o.push(e),s.prepare(`UPDATE sessions SET ${r.join(", ")} WHERE id = ?`).run(...o)),c(e)}],62294)},45685,e=>{"use strict";var t=e.i(33405),s=e.i(24361);let r="http://127.0.0.1:11434",n=process.env.OLLAMA_HOST?.trim()??"";(0,s.promisify)(t.execFile);let a=Promise.resolve(),o=0,i=null,l=null;async function d(e){let t=await c(e);return await Promise.all(t.map(t=>u(e,t))),t}async function u(e,t){try{let s=new AbortController,r=setTimeout(()=>s.abort(),5e3);await fetch(`${e}/api/generate`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:t,keep_alive:0}),signal:s.signal}),clearTimeout(r)}catch{}}async function c(e){try{let t=new AbortController,s=setTimeout(()=>t.abort(),5e3),r=await fetch(`${e}/api/ps`,{cache:"no-store",signal:t.signal});return clearTimeout(s),((await r.json()).models??[]).map(e=>e.name)}catch{return[]}}async function p(e,t){let s;o++;let r=a;a=new Promise(e=>{s=e}),await r,o--,i=t||null,l=e;let n=!1;try{let r=await c(e);return await Promise.all(r.filter(e=>e!==t).map(t=>u(e,t))),()=>{n||(n=!0,i=null,l=null,s())}}catch(e){throw i=null,l=null,s(),e}}async function E(e=_()){return{queued_operations:o,active_model:l===e?i:null,loaded_models:await c(e)}}async function T(e,t=r,s=""){let n=await p(t,s);try{return await e()}finally{n()}}function _(){return n||r}function m(){return!!n&&!n.includes("127.0.0.1")&&!n.includes("localhost")}async function N(e,t=3e3){try{let s=new AbortController,r=setTimeout(()=>s.abort(),t),n=await fetch(`${e}/api/tags`,{cache:"no-store",signal:s.signal});return clearTimeout(r),n.ok}catch{return!1}}async function L(e={}){let t=e.maxAttempts??20;for(let s=1;s<=t&&!e.isCancelled?.();s++)try{return await f()}catch{e.onWait?.(s),await new Promise(e=>setTimeout(e,2e3))}return null}async function f(){let e=_();if(await N(e,3e3))return e;if(m()){if(await N(r,2e3))return console.warn("[ollama] Cloud host unreachable, falling back to local Ollama"),r;throw Error(`Cannot reach Ollama. Tried: ${e} (cloud) and ${r} (local). Make sure Ollama is running locally or your Azure instance is up.`)}throw Error(`Cannot reach Ollama at ${e}. Make sure Ollama is running (run: ollama serve), or set the OLLAMA_HOST environment variable to point to an Azure/cloud instance.`)}async function x(e,t){let s=await f();return fetch(`${s}${e}`,t)}e.s(["acquireOllamaModel",0,p,"getOllamaSchedulerStatus",0,E,"getPrimaryHost",0,_,"isCloudConfigured",0,m,"isReachable",0,N,"listLoadedModels",0,c,"ollamaFetch",0,x,"releaseLoadedModels",0,d,"resolveOllamaHost",0,f,"waitForModelServer",0,L,"withOllamaModelLock",0,T])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0w59dag._.js.map