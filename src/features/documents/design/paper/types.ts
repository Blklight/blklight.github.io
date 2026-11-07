/**
 * Paper theme types.
 *
 * DECISÃO: Temas de papel são Tema Padrão (adaptativo, acompanha claro/escuro)
 * e Amarelo, Rosa, Azul Céu, Kraft (fixos: mesma cor no claro e no escuro).
 * Modo personalizado (custom) continua como está.
 */

export type PaperThemeKind = "adaptive" | "fixed";

export interface BasePaperTheme {
  id: string;
  name: string;
  description: string;
  kind: PaperThemeKind;
}

/**
 * Tema adaptativo: não define cores fixas. As cores vêm do contexto
 * (Tema Padrão / resolução atual) e se adaptam ao claro/escuro.
 */
export interface AdaptivePaperTheme extends BasePaperTheme {
  kind: "adaptive";
}

/**
 * Tema fixo: mesma cor no claro e no escuro (bg e text).
 * Valores devem permanecer idênticos aos de PAPER_THEME_PRESETS.
 */
export interface FixedPaperTheme extends BasePaperTheme {
  kind: "fixed";
  bg: string;
  text: string;
}

export type PaperTheme = AdaptivePaperTheme | FixedPaperTheme;
