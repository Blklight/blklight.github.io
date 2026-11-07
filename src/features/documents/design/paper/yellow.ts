import type { FixedPaperTheme } from "./types";

/**
 * Amarelo
 * - Tipo: fixo (mesma cor no claro e no escuro)
 * - Para que serve: post-it clássico
 * - Valores idênticos aos de PAPER_THEME_PRESETS
 */
export const yellowTheme: FixedPaperTheme = {
  id: "amarelo",
  name: "Amarelo",
  description: "Post-it classico",
  kind: "fixed",
  bg: "#FFEB3B",
  text: "#1A1A1A",
};

export default yellowTheme;
