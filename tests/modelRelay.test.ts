import { strict as assert } from "node:assert";
import { test } from "node:test";
import { codingUsesBrain, decodeModelChoice, encodeModelChoice, fallbackChoices, fallbackReason, nextModelAfterStall, pickBrainModel, pickFallbackCoder, pickHandsModel, pickVisionModel } from "../lib/modelRelay";
import { estimateModelMb, inferenceBudgetMs, nextWait } from "../lib/inferenceBudget";
import { parseAdjusterKind } from "../lib/promptAdjust";

const installed = [
  "qwen2.5-coder:1.5b",
  "llava:7b",
  "qwen2.5-coder:14b-instruct-q3_K_M",
  "qwen3:8b",
  "qwen2.5-coder:7b",
];

test("the hands model is the 7B coder, not the 14B quant", () => {
  assert.equal(pickHandsModel(installed), "qwen2.5-coder:7b");
});

test("the brain is qwen3", () => {
  assert.equal(pickBrainModel(installed), "qwen3:8b");
});

test("only a write or a deep coding request uses the relay", () => {
  assert.equal(codingUsesBrain("code", true), true);
  assert.equal(codingUsesBrain("deep", true), true);
  assert.equal(codingUsesBrain("explain", false), false);
  assert.equal(codingUsesBrain("casual", false), false);
});

test("a failed model asks for a choice and does not pick the next one", () => {
  const choices = fallbackChoices(installed, "qwen2.5-coder:1.5b");
  assert.equal(choices.some((choice) => choice.name === "qwen2.5-coder:1.5b"), false);
  assert.deepEqual(choices.map((choice) => choice.name), [
    "llava:7b",
    "qwen2.5-coder:14b-instruct-q3_K_M",
    "qwen3:8b",
    "qwen2.5-coder:7b",
  ]);
  assert.match(fallbackReason("qwen2.5-coder:1.5b", "tools"), /cannot use tools/);
  assert.match(fallbackReason("qwen2.5-coder:1.5b", "timeout"), /Retry qwen2\.5-coder:1\.5b/);
});

test("a picture goes to the vision model even when a coder is selected", () => {
  assert.equal(pickVisionModel("qwen2.5-coder:7b", installed), "llava:7b");
  assert.equal(pickVisionModel("llava:7b", installed), "llava:7b");
});

test("moondream and the 3B coder have their own fit lines", () => {
  assert.equal(estimateModelMb("moondream"), 2800);
  assert.equal(estimateModelMb("qwen2.5-coder:3b"), 3800);
  assert.equal(estimateModelMb("llava:7b"), 6200);
  assert.equal(estimateModelMb("qwen2.5-coder:13b"), 4500);
});

test("a picture uses moondream when LLaVA does not fit", () => {
  const withDream = [...installed, "moondream"];
  assert.equal(pickVisionModel("qwen2.5-coder:7b", withDream, 4000), "moondream");
  assert.equal(pickVisionModel("qwen2.5-coder:7b", withDream, 8000), "llava:7b");
  assert.equal(pickVisionModel("moondream", withDream, 8000), "moondream");
});

test("a stalled model continues with the closest coder that fits", () => {
  const withMid = [...installed, "qwen2.5-coder:3b"];
  assert.equal(nextModelAfterStall({ models: withMid, failed: ["qwen2.5-coder:3b"], freeMb: 7000, needsWrite: true }), "qwen2.5-coder:7b");
  assert.equal(nextModelAfterStall({ models: withMid, failed: ["qwen2.5-coder:3b"], freeMb: 4500, needsWrite: false }), "qwen2.5-coder:1.5b");
  assert.equal(nextModelAfterStall({ models: withMid, failed: ["qwen2.5-coder:3b"], freeMb: 4500, needsWrite: true }), null);
  assert.equal(nextModelAfterStall({ models: withMid, failed: ["qwen2.5-coder:7b"], freeMb: 4500, needsWrite: true }), "qwen2.5-coder:3b");
  assert.equal(nextModelAfterStall({ models: withMid, failed: ["qwen2.5-coder:3b", "qwen2.5-coder:7b"], freeMb: 9000, needsWrite: false }), "qwen2.5-coder:1.5b");
});

test("the 3B solver takes a task the 7B cannot fit", () => {
  const withMid = [...installed, "qwen2.5-coder:3b"];
  assert.equal(pickFallbackCoder(withMid, 4500, true), "qwen2.5-coder:3b");
  assert.equal(pickFallbackCoder(installed, 4500, true), null);
  assert.equal(pickFallbackCoder(installed, 4500, false), "qwen2.5-coder:1.5b");
});

test("the first run of a cold model gets longer than a warm run", () => {
  const cold = inferenceBudgetMs({ model: "qwen2.5-coder:7b", loaded: false, freeMb: 8000 });
  const warm = inferenceBudgetMs({ model: "qwen2.5-coder:7b", loaded: true, freeMb: 8000 });
  assert.ok(cold.ms > warm.ms);
  assert.ok(warm.ms > 120_000);
  const tight = inferenceBudgetMs({ model: "qwen2.5-coder:7b", loaded: true, freeMb: 1000 });
  assert.ok(tight.ms > warm.ms);
});

test("a model that is still loaded extends the wait and a dead server stops it", () => {
  assert.equal(nextWait({ elapsedMs: 200_000, budgetMs: 180_000, extensions: 0, serverUp: true, hot: true }).action, "wait");
  assert.equal(nextWait({ elapsedMs: 200_000, budgetMs: 180_000, extensions: 0, serverUp: false, hot: false }).action, "stop");
  assert.equal(nextWait({ elapsedMs: 400_000, budgetMs: 180_000, extensions: 2, serverUp: true, hot: true }).action, "stop");
  assert.equal(nextWait({ elapsedMs: 200_000, budgetMs: 180_000, extensions: 0, serverUp: true, hot: false }).action, "wait");
});

test("the prompt label is one word and anything else is ignored", () => {
  assert.equal(parseAdjusterKind("project"), "project");
  assert.equal(parseAdjusterKind("I think this is chat."), "chat");
  assert.equal(parseAdjusterKind("please run dir"), null);
});

test("a model choice can be stored on the reply and read back", () => {
  const encoded = `The model stopped.${encodeModelChoice({ failedModel: "qwen2.5-coder:1.5b", choices: fallbackChoices(installed, "qwen2.5-coder:1.5b") })}`;
  const decoded = decodeModelChoice(encoded);
  assert.equal(decoded.text, "The model stopped.");
  assert.equal(decoded.choice?.failedModel, "qwen2.5-coder:1.5b");
  assert.equal(decoded.choice?.choices.some((choice) => choice.name === "qwen2.5-coder:7b"), true);
  assert.equal(decoded.choice?.choices.some((choice) => choice.name === "qwen2.5-coder:1.5b"), false);
});
