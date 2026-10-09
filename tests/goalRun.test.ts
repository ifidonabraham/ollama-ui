import { strict as assert } from "node:assert";
import { test } from "node:test";
import { commandFailed, commandsForGoal, failureTouches, isUiFile, nextGoalStep, shouldLook } from "../lib/goalRun";
import { decodeWebAsk, encodeWebAsk, parsePublicUrl } from "../lib/webAsk";

test("a coding goal runs the test script and skips a production build", () => {
  assert.deepEqual(commandsForGoal({ test: "tsx --test", build: "next build", lint: "eslint" }, ["lib/goalRun.ts"]), ["npm test"]);
  assert.deepEqual(commandsForGoal({ lint: "eslint", build: "next build" }, ["app/page.tsx"]), []);
  assert.deepEqual(commandsForGoal({ lint: "eslint" }, ["lib/goalRun.ts"]), ["npm run lint"]);
});

test("a page change is looked at, and a private address is not a web page", () => {
  assert.equal(isUiFile("app/page.tsx"), true);
  assert.equal(shouldLook("edit the parser", ["lib/goalRun.ts"]), false);
  assert.equal(shouldLook("edit the parser", ["app/page.tsx"]), true);
  assert.equal(shouldLook("run the app and look at the website", ["lib/goalRun.ts"]), true);
  assert.equal(parsePublicUrl("https://example.com/docs").ok, true);
  assert.equal(parsePublicUrl("http://127.0.0.1:3000").ok, false);
  assert.equal(parsePublicUrl("file:///C:/secret.txt").ok, false);
  const encoded = encodeWebAsk("https://example.com/docs");
  assert.equal(decodeWebAsk(encoded).url, "https://example.com/docs");
  assert.equal(decodeWebAsk(encoded).text.includes("example.com"), true);
});

test("the same failing check blocks the goal and a new failure continues it", () => {
  assert.equal(failureTouches("app/page.tsx(3,1): error", ["C:\\repo\\app\\page.tsx"]), true);
  assert.equal(commandFailed("npm run lint", false, "lib/jobs.ts error", ["app/page.tsx"]), false);
  assert.equal(commandFailed("npm test", false, "fail", ["app/page.tsx"]), true);
  assert.equal(nextGoalStep({ attempt: 1, maxAttempts: 3, failureKey: "npm test failed", previousKey: "" }), "retry");
  assert.equal(nextGoalStep({ attempt: 2, maxAttempts: 3, failureKey: "npm test failed", previousKey: "npm test failed" }), "blocked");
  assert.equal(nextGoalStep({ attempt: 1, maxAttempts: 3, failureKey: "", previousKey: "" }), "done");
});
