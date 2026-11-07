/**
 * Defaults de design centralizados.
 * Os valores vieram do store (create-document-design-store.ts) e agora vivem aqui.
 * Sem alteração de comportamento.
 */
import { DEFAULT_COVER_SETTINGS } from "@/components/document/cover-image-editor";
import type { DesignState } from "@/store/create-document-design-store";
import {
  BLKLIGHT_FOOTER_LINE_FORMATS,
  BLKLIGHT_FOOTER_LINES,
  BLKLIGHT_HEADER_LINE_FORMATS,
  BLKLIGHT_HEADER_LINES,
  BLKLIGHT_PRESET_ID,
} from "./blklight-letterhead";
import { SIGNATURE_LABEL } from "./signature";

export const defaultDesignPaperStyle = {
  mode: "default" as const,
  presetId: null,
  bg: null,
  text: null,
  grains: ["background-texture"],
};

export const defaultDesignPaperTexture = {
  type: "none" as const,
  size: 24,
  opacity: 0.15,
  color: null,
};

export const defaultDesignDocumentHeader = {
  enabled: true,
  mode: "preset" as const,
  presetId: BLKLIGHT_PRESET_ID,
  lines: [...BLKLIGHT_HEADER_LINES],
  lineFormats: BLKLIGHT_HEADER_LINE_FORMATS.map((f) => ({ ...f })),
  style: {
    mode: "custom" as const,
    bgType: "solid" as const,
    bg: "#1a1a1a",
    gradientFrom: "#FF6B35",
    gradientTo: "#F7C948",
    gradientDirection: "to-r" as const,
    imageUrl: "",
    imageOverlayColor: "#000000",
    imageOverlayOpacity: 0.4,
    text: "#ffffff",
    textAlign: "center" as const,
    textureType: "none" as const,
    textureOpacity: 0.1,
    borderStyle: "none" as const,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 0,
    paddingX: 24,
    paddingY: 16,
  },
};

export const defaultDesignDocumentFooter = {
  enabled: true,
  mode: "preset" as const,
  presetId: BLKLIGHT_PRESET_ID,
  lines: [...BLKLIGHT_FOOTER_LINES],
  lineFormats: BLKLIGHT_FOOTER_LINE_FORMATS.map((f) => ({ ...f })),
  style: {
    mode: "custom" as const,
    bgType: "solid" as const,
    bg: "#1a1a1a",
    gradientFrom: "#FF6B35",
    gradientTo: "#F7C948",
    gradientDirection: "to-r" as const,
    imageUrl: "",
    imageOverlayColor: "#000000",
    imageOverlayOpacity: 0.4,
    text: "#ffffff",
    textAlign: "center" as const,
    textureType: "none" as const,
    textureOpacity: 0.1,
    borderStyle: "none" as const,
    borderWidth: 0,
    borderColor: "#000000",
    borderRadius: 0,
    paddingX: 24,
    paddingY: 16,
  },
};

// Assinatura sempre automática: nome, código, data e organização são
// resolvidos na exibição (signature.ts). Os campos de texto ficam vazios e só
// existem por compatibilidade com o tipo (legado, nunca lidos).
export const defaultDesignDocumentSignature = {
  enabled: true,
  label: SIGNATURE_LABEL,
  authorName: "",
  authorId: "",
  locationCode: "",
  organization: "",
  showTimestamp: true,
};

export const defaultDesignTypography = "sans" as const;

export const defaultDesignState: DesignState = {
  paperStyle: defaultDesignPaperStyle,
  paperTexture: defaultDesignPaperTexture,
  documentHeader: defaultDesignDocumentHeader as DesignState["documentHeader"],
  documentFooter: defaultDesignDocumentFooter as DesignState["documentFooter"],
  documentSignature:
    defaultDesignDocumentSignature as DesignState["documentSignature"],
  typography: defaultDesignTypography,
  coverImage: null,
  coverSettings: { ...DEFAULT_COVER_SETTINGS },
  headerFooterLinked: true,
};
