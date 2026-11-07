import type { FixedPaperTheme } from "./types";

/**
 * Rosa
 * - Tipo: fixo (mesma cor no claro e no escuro)
 * - Para que serve: post-it rosa
 * - Valores idênticos aos de PAPER_THEME_PRESETS
 */
export const pinkTheme: FixedPaperTheme = {
  id: "rosa",
  name: "Rosa",
  description: "Post-it rosa",
  kind: "fixed",
  bg: "#F48FB1",
  text: "#1A1A1A",
};

export default pinkTheme;
