import { strict as assert } from "node:assert";
import { test } from "node:test";
import { runProcessBounded, silenceNote } from "../lib/commandRun";

test("a silent process is stopped and a fast process is kept", async () => {
  const silent = await runProcessBounded(process.execPath, ["-e", "setTimeout(() => {}, 8000)"], {
    idleMs: 400,
    totalMs: 5000,
  });
  assert.equal(silent.stopped, "idle");
  assert.match(silent.output, /No output for 1 second/);
  assert.match(silent.output, /Try a different command/);
  assert.equal(silenceNote(30_000), "No output for 30 seconds, so this was stopped. Try a different command. Do not run this same command again.");

  const fast = await runProcessBounded(process.execPath, ["-e", "console.log('ok')"], {
    idleMs: 5000,
    totalMs: 8000,
  });
  assert.equal(fast.stopped, "");
  assert.match(fast.output, /ok/);
});
