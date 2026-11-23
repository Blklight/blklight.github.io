import type { LineFormat } from "@/components/document/types";

/**
 * Cabeçalho/rodapé default "Blklight" (preset "blklight", ver header-presets
 * e footer-presets). As linhas guardam os marcadores ({{publicador}}), que só
 * são resolvidos na exibição (letterhead-text.ts). Usado pelos defaults (defaults.ts), pela
 * lista de presets e pelo botão "Restaurar padrão" do Editar design.
 * Arquivo leve e isomórfico (sem "use client", sem dependências de UI).
 */
export const BLKLIGHT_PRESET_ID = "blklight";

export const BLKLIGHT_HEADER_LINES = ["Blklight", "{{tipo}} de {{publicador}}"];

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

/** Letterhead models offered in the editor. Removed ids render as Blklight. */
export const LETTERHEAD_PRESET_IDS = [
  BLKLIGHT_PRESET_ID,
  "corp-moderno",
  "alerta-vermelho",
];

interface LetterheadLook {
  mode: "preset" | "custom";
  presetId?: string | null;
  style?: unknown;
}

/**
 * Header and footer always share one look: the footer takes the header's mode,
 * model and style (its own lines and enabled flag stay). A model that no longer
 * exists falls back to Blklight, so old documents keep rendering.
 */
export function linkLetterhead<
  H extends LetterheadLook,
  F extends LetterheadLook,
>(header: H, footer: F): { header: H; footer: F } {
  const presetId =
    header.mode === "preset"
      ? LETTERHEAD_PRESET_IDS.includes(header.presetId ?? "")
        ? header.presetId
        : BLKLIGHT_PRESET_ID
      : header.presetId;
  const linked = { ...header, presetId };
  return {
    header: linked,
    footer: { ...footer, mode: linked.mode, presetId, style: linked.style },
  };
}
