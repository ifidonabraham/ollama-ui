import { strict as assert } from "node:assert";
import { test } from "node:test";
import { appsToClose, machineRestCommand, personIsSteppingAway } from "../lib/awayIntent";
import { classifyIntent } from "../lib/intent";
import { parseComputerAction } from "../lib/computerActionParse";
import { buildClarification } from "../lib/intentAsk";

test("leaving asks before an overnight run and does not suspend the pc", () => {
  assert.equal(personIsSteppingAway("I am going to sleep"), true);
  assert.equal(personIsSteppingAway("I'll be out tonight, keep the page going"), true);
  assert.equal(personIsSteppingAway("work through the night"), true);
  assert.equal(machineRestCommand("put the computer to sleep"), true);
  assert.equal(personIsSteppingAway("put the computer to sleep"), false);
  assert.equal(personIsSteppingAway("go to sleep"), false);
  assert.equal(personIsSteppingAway("how do I sleep"), false);
  assert.equal(personIsSteppingAway("keep working on the header"), false);
  assert.equal(parseComputerAction("I am going to sleep"), null);
  assert.deepEqual(parseComputerAction("go to sleep"), { action: "sleep", target: "" });
  const asked = buildClarification("I am going to sleep", null, true);
  assert.equal(asked?.options.some((option) => option.id === "overnight"), true);
  assert.equal(asked?.options.some((option) => option.id === "sleep"), true);
  const away = classifyIntent("I am going to sleep");
  assert.equal(away.intent, "code");
  assert.equal(away.needsWriteAccess, true);
});

test("only large extra applications are closed for a long run", () => {
  const chosen = appsToClose([
    { name: "node", pid: 10, memMB: 800 },
    { name: "chrome", pid: 11, memMB: 900 },
    { name: "ollama", pid: 12, memMB: 1200 },
    { name: "Code", pid: 13, memMB: 700 },
    { name: "Discord", pid: 14, memMB: 420 },
    { name: "Spotify", pid: 15, memMB: 260 },
    { name: "Notepad", pid: 16, memMB: 40 },
    { name: "Steam", pid: process.pid, memMB: 900 },
  ], process.pid);
  assert.deepEqual(chosen.map((app) => app.name), ["Discord", "Spotify"]);
});
