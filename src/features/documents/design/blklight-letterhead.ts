import type { LineFormat } from "@/components/document/types";

/**
 * Cabeçalho/rodapé default "Blklight" (preset "blklight", ver header-presets
 * e footer-presets). As linhas guardam os marcadores ({{publicador}}), que só
 * são resolvidos na exibição (letterhead-text.ts). Usado pelos defaults (defaults.ts), pela
 * lista de presets e pelo botão "Restaurar padrão" do Editar design.
 * Arquivo leve e isomórfico (sem "use client", sem dependências de UI).
 */
export const BLKLIGHT_PRESET_ID = "blklight";

export const BLKLIGHT_HEADER_LINES = ["Blklight", "Artigo de {{publicador}}"];

export const BLKLIGHT_HEADER_LINE_FORMATS: LineFormat[] = [
  {
    bold: true,
    uppercase: true,
    size: "lg",
    opacity: 100,
    italic: false,
    letterSpacing: "wider",
  },
  {
    bold: false,
    uppercase: false,
    size: "sm",
    opacity: 100,
    italic: false,
    letterSpacing: "normal",
  },
];

export const BLKLIGHT_FOOTER_LINES = ["Blklight"];

export const BLKLIGHT_FOOTER_LINE_FORMATS: LineFormat[] = [
  {
    bold: false,
    uppercase: true,
    size: "base",
    opacity: 100,
    italic: false,
    letterSpacing: "wider",
  },
];
