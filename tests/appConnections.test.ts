import { strict as assert } from "node:assert";
import { test } from "node:test";
import { connectionBlock, connectionStance, matchConnection } from "../lib/appConnections";
import { capabilityCount } from "../lib/capabilityIndex";
import { directUserAction } from "../lib/directAction";
import { mergeFoniaSettings } from "../lib/foniaSettings";

const OPEN = {
  connectExternalTools: true,
  connectBlender: true,
  connectMetatrader: false,
  connectVm: false,
  connectCorel: false,
  connectAndroidStudio: false,
};

test("a named app is refused until its connection is on", () => {
  assert.equal(matchConnection("Android Studio")?.id, "androidstudio");
  assert.equal(matchConnection("mt5")?.id, "metatrader");
  assert.equal(matchConnection("virtualbox")?.id, "vm");
  assert.equal(matchConnection("notepad"), null);
  assert.equal(connectionBlock(OPEN, "blender"), "");
  assert.match(connectionBlock(OPEN, "MetaTrader 5"), /off in Settings/);
  assert.match(connectionBlock({ ...OPEN, connectExternalTools: false }, "notepad"), /External tool connections are off/);
  assert.equal(capabilityCount() >= 40, true);
});

test("the model is told which programs are connected", () => {
  const stance = connectionStance(OPEN);
  assert.equal(stance.includes("You are Fonia"), true);
  assert.equal(stance.includes("Blender can open"), true);
  assert.equal(stance.includes("MetaTrader 5 can open"), false);
  assert.equal(connectionStance({ ...OPEN, connectExternalTools: false }).includes("External programs are off"), true);
});

test("open android studio is a launch and the new switches keep their defaults", () => {
  assert.equal(directUserAction("open android studio")?.function.name, "launch_app");
  assert.equal(directUserAction("open android studio")?.function.arguments.name, "android studio");
  assert.equal(directUserAction("open the report"), null);
  assert.equal(directUserAction("open blender and make a cube"), null);
  const next = mergeFoniaSettings({ micMode: "wake" }, {});
  assert.equal(next.connectBlender, true);
  assert.equal(next.connectMetatrader, false);
  assert.equal(next.internetAccess, true);
  assert.equal(next.micMode, "wake");
});
