import { strict as assert } from "node:assert";
import { test } from "node:test";
import { asAnswerModels, formatAnswerModels, modelsThatAnswered } from "../lib/answerModels";

test("an answer lists every model that produced it", () => {
  const models = modelsThatAnswered({
    visionModel: "llava:7b",
    visionWorked: true,
    plannerModel: "qwen3:8b",
    plannerWorked: true,
    executorModel: "qwen2.5-coder:7b",
    executorRole: "coding",
    executorWorked: true,
    fromFiles: false,
  });
  assert.deepEqual(models, [
    { name: "llava:7b", role: "vision" },
    { name: "qwen3:8b", role: "planner" },
    { name: "qwen2.5-coder:7b", role: "coding" },
  ]);
  assert.equal(
    formatAnswerModels(models),
    "llava:7b · vision, qwen3:8b · planner, qwen2.5-coder:7b · coding"
  );
});

test("a file answer does not credit a model that failed to write", () => {
  const models = modelsThatAnswered({
    plannerModel: "qwen3:8b",
    plannerWorked: true,
    executorModel: "qwen2.5-coder:1.5b",
    executorRole: "coding",
    executorWorked: true,
    visionWorked: false,
    fromFiles: true,
  });
  assert.deepEqual(models, [{ name: "", role: "files on disk" }]);
  assert.equal(formatAnswerModels(models), "files on disk");
});

test("a failed vision pass is left off the answer line", () => {
  const models = modelsThatAnswered({
    visionModel: "llava:7b",
    visionWorked: false,
    executorModel: "qwen2.5-coder:7b",
    executorRole: "tool-capable coder",
    executorWorked: true,
    plannerWorked: false,
    fromFiles: false,
  });
  assert.deepEqual(models, [{ name: "qwen2.5-coder:7b", role: "tool-capable coder" }]);
});

test("model events ignore entries with no name and no role", () => {
  assert.deepEqual(asAnswerModels([{ name: "" }, { role: "session log" }, "nope"]), [
    { name: "", role: "session log" },
  ]);
});
