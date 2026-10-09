export interface AnswerModel {
  name: string;
  role: string;
}

export const FILES_ANSWER: AnswerModel[] = [{ name: "", role: "files on disk" }];
export const SESSION_LOG_ANSWER: AnswerModel[] = [{ name: "", role: "session log" }];
export const LOCAL_COMMAND_ANSWER: AnswerModel[] = [{ name: "", role: "local command" }];
export const NO_MODEL_ANSWER: AnswerModel[] = [{ name: "", role: "no model" }];
export const SERVER_ANSWER: AnswerModel[] = [{ name: "", role: "server" }];

export function formatAnswerModels(models: AnswerModel[]): string {
  return models
    .map((model) => (model.name ? `${model.name} · ${model.role}` : model.role))
    .filter(Boolean)
    .join(", ");
}

export function asAnswerModels(value: unknown): AnswerModel[] {
  if (!Array.isArray(value)) return [];
  const models: AnswerModel[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as { name?: unknown; role?: unknown };
    const name = typeof record.name === "string" ? record.name : "";
    const role = typeof record.role === "string" ? record.role : "";
    if (!name && !role) continue;
    if (models.some((model) => model.name === name && model.role === role)) continue;
    models.push({ name, role });
  }
  return models;
}

/** Models that produced the visible answer. A disk answer does not credit a model. */
export function modelsThatAnswered(input: {
  visionModel?: string;
  visionWorked: boolean;
  plannerModel?: string;
  plannerRole?: string;
  plannerWorked: boolean;
  executorModel?: string;
  executorRole: string;
  executorWorked: boolean;
  fromFiles: boolean;
}): AnswerModel[] {
  if (input.fromFiles) return FILES_ANSWER;
  const models: AnswerModel[] = [];
  if (input.visionWorked && input.visionModel) models.push({ name: input.visionModel, role: "vision" });
  if (input.plannerWorked && input.plannerModel) models.push({ name: input.plannerModel, role: input.plannerRole || "planner" });
  if (input.executorWorked && input.executorModel) {
    models.push({ name: input.executorModel, role: input.executorRole || "coding" });
  }
  return models.length ? models : NO_MODEL_ANSWER;
}
