import { strict as assert } from "node:assert";
import { test } from "node:test";
import { buildClarification, intentForMode, needsUnderstanding, parseModeProposal } from "../lib/intentAsk";
import { mergeFoniaSettings } from "../lib/foniaSettings";

test("leaving asks which system action is meant and an explicit sleep command does not", () => {
  const asked = buildClarification("I am going to sleep", null, true);
  assert.equal(asked?.question.includes("leaving"), true);
  assert.deepEqual(asked?.options.map((option) => option.id), ["overnight", "sleep", "chat", "custom"]);
  assert.equal(buildClarification("I'll be out tonight, keep the page going", null, true)?.options[0].id, "overnight");
  assert.equal(buildClarification("go to sleep", null, true), null);
  assert.equal(buildClarification("put the computer to sleep", null, true), null);
  assert.equal(buildClarification("how do I sleep", null, true), null);
  assert.equal(buildClarification("keep working on the header", null, true), null);
  assert.equal(buildClarification("I am going to sleep", null, false), null);
  assert.equal(needsUnderstanding("I am going to sleep"), false);
  assert.equal(needsUnderstanding("fix the header"), false);
  assert.equal(needsUnderstanding("can you take care of this while I rest"), true);
});

test("a small-model proposal asks when two meanings fit and a clear edit does not", () => {
  const parsed = parseModeProposal('Sure. {"mode":"code","ask":true,"question":"Do you want me to edit the project?","options":["code","explain"]}');
  assert.equal(parsed?.mode, "code");
  assert.equal(parsed?.ask, true);
  const asked = buildClarification("make it feel faster", parsed, true);
  assert.equal(asked?.options.some((option) => option.id === "code"), true);
  assert.equal(asked?.options.some((option) => option.id === "custom"), true);
  assert.equal(parseModeProposal("I do not know"), null);
  assert.equal(intentForMode("overnight")?.needsWriteAccess, true);
  assert.equal(intentForMode("chat")?.needsTools, false);
  assert.equal(intentForMode("custom"), null);
});

test("a settings change keeps the other switches", () => {
  const next = mergeFoniaSettings({ micMode: "wake", understandFirst: false }, { askBeforeConsequential: false });
  assert.equal(next.micMode, "wake");
  assert.equal(next.understandFirst, false);
  assert.equal(next.askBeforeConsequential, false);
  assert.equal(next.holdGoal, true);
  assert.equal(next.whisperFallback, true);
});
