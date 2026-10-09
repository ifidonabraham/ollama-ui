import { strict as assert } from "node:assert";
import { test } from "node:test";
import { directUserAction, TEXT_TOOL_INSTRUCTION } from "../lib/directAction";
import { extractToolCalls } from "../lib/toolCalls";

test("an explicit run, read, or list is a server action", () => {
  assert.deepEqual(directUserAction("run dir"), {
    function: { name: "run_command", arguments: { command: "dir" } },
  });
  assert.deepEqual(directUserAction("read package.json"), {
    function: { name: "read_file", arguments: { path: "package.json" } },
  });
  assert.deepEqual(directUserAction("list this folder"), {
    function: { name: "list_dir", arguments: { path: "." } },
  });
});

test("vague or open-ended requests stay with the model", () => {
  assert.equal(directUserAction("hi"), null);
  assert.equal(directUserAction("run a command in terminal to check the directory"), null);
  assert.equal(directUserAction("Run: git diff HEAD and show me what changed"), null);
  assert.equal(directUserAction("create a file named ola"), null);
  assert.equal(directUserAction("tell me about this project"), null);
  assert.equal(directUserAction("open blender and make a cube"), null);
});

test("a one-line PC check does not load a model", () => {
  assert.deepEqual(directUserAction("turn on bluetooth"), {
    function: { name: "computer_action", arguments: { action: "bluetooth_on", target: "" } },
  });
  assert.equal(directUserAction("create a website"), null);
});

test("a one-line app or document request is a server action", () => {
  assert.deepEqual(directUserAction("open blender"), {
    function: { name: "launch_app", arguments: { name: "blender" } },
  });
  assert.deepEqual(directUserAction("read notes.pdf"), {
    function: { name: "read_document", arguments: { path: "notes.pdf" } },
  });
  assert.equal(directUserAction("open notepad & shutdown"), null);
  assert.equal(directUserAction("start shutdown"), null);
});

test("document, video, and app tool calls are accepted", () => {
  const call = extractToolCalls({
    tool_calls: [{ function: { name: "launch_app", arguments: { name: "blender" } } }],
  });
  assert.equal(call.length, 1);
  assert.equal(call[0].function.name, "launch_app");
  const video = extractToolCalls({
    content: '{"name":"sample_video","arguments":{"path":"clip.mp4","interval_seconds":"2"}}',
  });
  assert.equal(video[0].function.name, "sample_video");
  assert.equal(video[0].function.arguments.interval_seconds, "2");
});

test("the text protocol accepts one JSON action and rejects prose", () => {
  assert.equal(TEXT_TOOL_INSTRUCTION.includes("read_file(\""), false);
  const call = extractToolCalls({
    content: `${TEXT_TOOL_INSTRUCTION}\n{"name":"run_command","arguments":{"command":"dir"}}`,
  });
  assert.equal(call.length, 1);
  assert.equal(call[0].function.name, "run_command");
  assert.equal(call[0].function.arguments.command, "dir");
  assert.deepEqual(extractToolCalls({ content: "I ran dir and the project uses Rollup." }), []);
});
