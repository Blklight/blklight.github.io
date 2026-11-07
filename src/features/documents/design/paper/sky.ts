import type { FixedPaperTheme } from "./types";

/**
 * Azul Céu
 * - Tipo: fixo (mesma cor no claro e no escuro)
 * - Para que serve: post-it azul
 * - Valores idênticos aos de PAPER_THEME_PRESETS
 */
export const skyTheme: FixedPaperTheme = {
  id: "azul",
  name: "Azul Ceu",
  description: "Post-it azul",
  kind: "fixed",
  bg: "#4FC3F7",
  text: "#1A1A1A",
};

export default skyTheme;
