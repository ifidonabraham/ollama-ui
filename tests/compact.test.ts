import { strict as assert } from "node:assert";
import { test } from "node:test";
import { compactOldToolResults } from "../lib/compact";
import { extractToolCalls } from "../lib/toolCalls";

test("old tool results shrink and the last two stay intact", () => {
  const messages = [
    { role: "user", content: "explain this project" },
    { role: "tool", content: "package.json\nname: ollama-ui\n" + "x".repeat(400) },
    { role: "tool", content: "README.md\nLocal coding UI\n" + "y".repeat(400) },
    { role: "tool", content: "app/page.tsx\nexport default function Home" },
    { role: "tool", content: "lib/intent.ts\nexport function classifyIntent" },
  ];
  const compacted = compactOldToolResults(messages, 2);
  assert.equal(compacted[0].content, messages[0].content);
  assert.ok(compacted[1].content.length < messages[1].content.length);
  assert.match(compacted[1].content, /^package\.json: /);
  assert.equal(compacted[3].content, messages[3].content);
  assert.equal(compacted[4].content, messages[4].content);
});

test("a prose sentence is not a tool call", () => {
  assert.deepEqual(extractToolCalls({ content: "I listed the directory and the project uses Rollup." }), []);
});
