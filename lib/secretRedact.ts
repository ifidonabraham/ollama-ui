/** Hide values that look like passwords or tokens before they reach an online model. Local models see the original text. */

const SECRET = [
  /\b(password|passwd|pwd|secret|token|api[_-]?key|authorization)\b\s*[:=]\s*\S+/gi,
  /\bBearer\s+[A-Za-z0-9._\-]{8,}/gi,
  /\b(?:sk|ghp|gho|github_pat|xox[baprs]|AKIA)[A-Za-z0-9_\-]{8,}\b/g,
  /\b(?=[A-Za-z0-9+/]{24,}={0,2}\b)(?=[A-Za-z+/]*[0-9])(?=[A-Za-z0-9+/]*[A-Z])[A-Za-z0-9+/]{24,}={0,2}\b/g,
];

export function redactSecrets(value: string): { text: string; hidden: number } {
  let hidden = 0;
  let text = value;
  for (const pattern of SECRET) {
    text = text.replace(pattern, () => {
      hidden += 1;
      return "[hidden]";
    });
  }
  return { text, hidden };
}

/** Online models receive the hidden copy. A local Ollama model receives the original text. */
export function textForModel(value: string, online: boolean): string {
  if (!online) return value;
  return redactSecrets(value).text;
}
