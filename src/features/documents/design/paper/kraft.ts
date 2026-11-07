import type { FixedPaperTheme } from "./types";

/**
 * Kraft
 * - Tipo: fixo (mesma cor no claro e no escuro)
 * - Para que serve: papel kraft
 * - Valores idênticos aos de PAPER_THEME_PRESETS
 */
export const kraftTheme: FixedPaperTheme = {
  id: "kraft",
  name: "Kraft",
  description: "Papel kraft",
  kind: "fixed",
  bg: "#D7CCC8",
  text: "#1A1A1A",
};

export default kraftTheme;
