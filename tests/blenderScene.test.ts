import { strict as assert } from "node:assert";
import { test } from "node:test";
import { blenderNeedsShape, blenderPython, parseBlenderScene } from "../lib/blenderScene";

test("a named Blender shape becomes a bpy script and an open request does not", () => {
  assert.deepEqual(parseBlenderScene("make a cube in blender"), { shape: "cube" });
  assert.deepEqual(parseBlenderScene("open blender and make a sphere"), { shape: "sphere" });
  assert.equal(parseBlenderScene("open blender"), null);
  assert.equal(blenderNeedsShape("make a model in blender"), true);
  assert.equal(blenderNeedsShape("open blender"), false);
  const script = blenderPython("cube", "C:\\work\\fonia-blender\\cube.blend");
  assert.equal(script.includes("import bpy"), true);
  assert.equal(script.includes("primitive_cube_add"), true);
  assert.equal(script.includes("import os"), false);
  assert.equal(script.includes("subprocess"), false);
});
