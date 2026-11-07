import defaultTheme from "./default";
import kraftTheme from "./kraft";
import pinkTheme from "./pink";
import skyTheme from "./sky";
import type { FixedPaperTheme, PaperTheme } from "./types";
import yellowTheme from "./yellow";

export { default as defaultTheme } from "./default";
export { default as kraftTheme } from "./kraft";
export { default as pinkTheme } from "./pink";
export { default as skyTheme } from "./sky";
export * from "./types";
export { default as yellowTheme } from "./yellow";

/**
 * Registro dos temas de papel na ordem atual do picker.
 * Ordem: Amarelo, Rosa, Azul Céu, Kraft (conforme PAPER_THEME_PRESETS)
 */
export const PAPER_THEMES: FixedPaperTheme[] = [
  yellowTheme,
  pinkTheme,
  skyTheme,
  kraftTheme,
];

/** Registro completo incluindo tema adaptativo padrão */
export const ALL_PAPER_THEMES: PaperTheme[] = [defaultTheme, ...PAPER_THEMES];

const PAPER_THEME_MAP = new Map<string, PaperTheme>(
  ALL_PAPER_THEMES.map((theme) => [theme.id, theme]),
);

/**
 * resolvePaperTheme(id): retorna tema pelo id; fallback para default quando desconhecido.
 */
export function resolvePaperTheme(id: string | null | undefined): PaperTheme {
  if (!id) return defaultTheme;
  const theme = PAPER_THEME_MAP.get(id);
  if (theme) return theme;
  return defaultTheme;
}
