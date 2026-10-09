import { strict as assert } from "node:assert";
import fs from "fs";
import os from "os";
import path from "path";
import { test } from "node:test";
import { extractToolCalls } from "../lib/toolCalls";
import {
  answerFromPriorAction,
  collectProjectFacts,
  renderProjectFacts,
  resolveWorkspace,
  stripUngroundedSentences,
  workspaceForRequest,
} from "../lib/projectFacts";
import { casualSystemPrompt, evidenceSystemPrompt } from "../lib/prompts";

test("prose and a fake package.json are not tool calls", () => {
  assert.deepEqual(extractToolCalls({ content: "List_dir: C:\\Users\\PC\\ollama-ui\\refactoring" }), []);
  const fake = `{
    "dependencies": { "@ollama/core": "^0.1.0", "@ollama/server": "^0.1.0" },
    "devDependencies": { "rollup": "^2.47.0", "typescript": "^4.7.3" },
    "scripts": { "dev": "rollup -c", "test": "jest" }
  }`;
  assert.deepEqual(extractToolCalls({ content: fake }), []);
  const real = extractToolCalls({ content: '{"name":"read_file","arguments":{"path":"package.json"}}' });
  assert.equal(real.length, 1);
  assert.equal(real[0].function.name, "read_file");
});

test("a missing former project path resolves to the app fixture", () => {
  const app = fs.mkdtempSync(path.join(os.tmpdir(), "ollama-ui-facts-"));
  const oldPath = path.join(app, "missing-old-ollama-ui");
  fs.writeFileSync(path.join(app, "package.json"), JSON.stringify({
    name: "ollama-ui",
    scripts: { dev: "next dev" },
    dependencies: { next: "16.3.6", react: "19.2.8", "better-sqlite3": "13.0.3" },
  }));
  fs.writeFileSync(path.join(app, "README.md"), "Local coding UI");
  fs.mkdirSync(path.join(app, "app"));

  const resolved = resolveWorkspace(oldPath, app, oldPath);
  assert.equal(resolved.missing, false);
  assert.equal(resolved.path, path.resolve(app));
  assert.equal(resolved.redirectedFrom, path.resolve(oldPath));

  const facts = collectProjectFacts(resolved.path, resolved.redirectedFrom);
  assert.match(facts.packageSummary, /better-sqlite3/);
  assert.equal(facts.packageSummary.includes("rollup"), false);
  assert.match(renderProjectFacts(facts), /Files read:/);
  assert.match(renderProjectFacts(facts), /next/);

  const unknown = resolveWorkspace(path.join(app, "not-a-project"), app, oldPath);
  assert.equal(unknown.missing, true);

  fs.rmSync(app, { recursive: true, force: true });
});

test("a video or document path does not replace the workspace folder", () => {
  const app = fs.mkdtempSync(path.join(os.tmpdir(), "ollama-ui-media-"));
  const clip = path.join(app, "clip.mp4");
  fs.writeFileSync(clip, "");
  const found = workspaceForRequest(`Watch this\nVideo: ${clip}`, app, app);
  assert.equal(found.missing, false);
  assert.equal(found.path, path.resolve(app));
  const missingClip = workspaceForRequest("Video: C:\\no\\such\\clip.mp4", app, app);
  assert.equal(missingClip.missing, false);
  assert.equal(missingClip.path, path.resolve(app));
  fs.rmSync(app, { recursive: true, force: true });
});

test("prompts do not teach a copyable tool example", () => {
  assert.equal(casualSystemPrompt().includes("read_file"), false);
  assert.equal(evidenceSystemPrompt({ workspace: "C:\\app", evidence: "name: ollama-ui" }).includes("read_file(\""), false);
});

test("invented stack sentences are removed and create claims require a real write", () => {
  const evidence = "name: ollama-ui\ndependencies: next, react, better-sqlite3";
  const stripped = stripUngroundedSentences(
    "The program uses Rollup and the MIT license. It is a Next.js app.",
    evidence
  );
  assert.equal(stripped.toLowerCase().includes("rollup"), false);
  assert.equal(stripped.toLowerCase().includes("mit license"), false);
  assert.match(stripped, /Next\.js/);
  assert.equal(answerFromPriorAction("did you successfully create it", []), "I have not created a file in this session.");
  assert.match(answerFromPriorAction("what type of file is it that you created", [
    { tool: "write_file", summary: "Written: C:\\temp\\ola" },
  ]) ?? "", /not on disk|ola/);
});
