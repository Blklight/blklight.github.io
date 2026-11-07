/**
 * Letterhead text placeholders (cabeçalho/rodapé).
 *
 * Lines are saved with the markers as typed (e.g. "Artigo de {{publicador}}")
 * and resolved only on display. Pure and isomorphic (no "use client"): used by
 * the public reading page (Server Component), the design preview and the
 * editor.
 *
 * Markers (name is case-insensitive, spaces inside braces allowed):
 *   {{publicador}} — organization name if any, else the author's display
 *                    name, else the username
 *   {{autor}}      — author's display name, else the username
 *   {{org}}        — organization name
 * Unknown markers are kept as typed. Missing data resolves to "" (never
 * "undefined"/"null").
 */
export interface LetterheadTextContext {
  author?: {
    displayName?: string | null;
    username?: string | null;
  } | null;
  organization?: { name?: string | null } | null;
}

const MARKER = /\{\{\s*(\w+)\s*\}\}/g;

function clean(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

export function resolveLetterheadText(
  text: string,
  context: LetterheadTextContext,
): string {
  if (typeof text !== "string" || !text.includes("{{")) {
    return typeof text === "string" ? text : "";
  }
  const author =
    clean(context.author?.displayName) || clean(context.author?.username);
  const org = clean(context.organization?.name);
  return text.replace(MARKER, (match, name: string) => {
    switch (name.toLowerCase()) {
      case "publicador":
        return org || author;
      case "autor":
        return author;
      case "org":
        return org;
      default:
        return match;
    }
  });
}

/** Resolve every line; without a context the lines are returned as they are. */
export function resolveLetterheadLines(
  lines: string[],
  context?: LetterheadTextContext | null,
): string[] {
  if (!context) return lines;
  return lines.map((line) => resolveLetterheadText(line, context));
}
