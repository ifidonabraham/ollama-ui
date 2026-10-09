/** A Blender scene Fonia can build with bpy. No files and no Blender process. */

export const BLENDER_SHAPES = ["cube", "sphere", "cylinder", "cone", "plane", "monkey"] as const;
export type BlenderShape = (typeof BLENDER_SHAPES)[number];

const OPS: Record<BlenderShape, string> = {
  cube: "primitive_cube_add",
  sphere: "primitive_uv_sphere_add",
  cylinder: "primitive_cylinder_add",
  cone: "primitive_cone_add",
  plane: "primitive_plane_add",
  monkey: "primitive_monkey_add",
};

export function isBlenderShape(value: string): value is BlenderShape {
  return (BLENDER_SHAPES as readonly string[]).includes(value);
}

export function parseBlenderScene(text: string): { shape: BlenderShape } | null {
  if (!/\bblender\b/i.test(text)) return null;
  if (/\b(suzanne|monkey)\b/i.test(text)) return { shape: "monkey" };
  if (/\b(sphere|ball)\b/i.test(text)) return { shape: "sphere" };
  if (/\bcylinder\b/i.test(text)) return { shape: "cylinder" };
  if (/\bcone\b/i.test(text)) return { shape: "cone" };
  if (/\bplane\b/i.test(text)) return { shape: "plane" };
  if (/\b(cube|box)\b/i.test(text)) return { shape: "cube" };
  return null;
}

/** Blender was named as the place to build, and no shape was named. */
export function blenderNeedsShape(text: string): boolean {
  if (!/\bblender\b/i.test(text) || parseBlenderScene(text)) return false;
  return /\b(make|create|add|build|model|design)\b/i.test(text);
}

/** Python that Blender runs. It imports bpy only. */
export function blenderPython(shape: BlenderShape, filepath: string): string {
  const name = shape === "monkey" ? "Suzanne" : shape.slice(0, 1).toUpperCase() + shape.slice(1);
  return [
    "import bpy",
    "bpy.ops.wm.read_factory_settings(use_empty=True)",
    `bpy.ops.mesh.${OPS[shape]}(location=(0, 0, 0))`,
    `bpy.context.active_object.name = ${JSON.stringify(name)}`,
    `bpy.ops.wm.save_as_mainfile(filepath=${JSON.stringify(filepath)})`,
  ].join("\n");
}
