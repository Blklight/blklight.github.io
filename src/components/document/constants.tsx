import { CircleDot, FileText, Grid3X3 } from "lucide-react";
import type React from "react";
import { PAPER_THEMES } from "@/features/documents/design/paper";
import type {
  HeaderPreset,
  LetterheadStyle,
  LineFormat,
  TextureType,
} from "./types";
import { DEFAULT_LINE_FORMAT } from "./types";

// Derivado do registro em src/features/documents/design/paper (mesma ordem/valores)
export const PAPER_THEME_PRESETS = PAPER_THEMES.map((theme) => ({
  id: theme.id,
  name: theme.name,
  bg: theme.bg,
  description: theme.description,
}));

export const TEXTURE_PRESETS: {
  id: TextureType;
  name: string;
  icon: React.ReactNode;
}[] = [
  { id: "none", name: "Nenhuma", icon: <FileText className="w-4 h-4" /> },
  {
    id: "dots",
    name: "Bullet Journal",
    icon: <CircleDot className="w-4 h-4" />,
  },
  { id: "grid", name: "Quadriculado", icon: <Grid3X3 className="w-4 h-4" /> },
];

// Gradient presets for letterhead backgrounds
export const GRADIENT_PRESETS = [
  { id: "sunset", name: "Por do Sol", from: "#FF6B35", to: "#F7C948" },
  { id: "ocean", name: "Oceano", from: "#0077B6", to: "#00B4D8" },
  { id: "forest", name: "Floresta", from: "#2D6A4F", to: "#95D5B2" },
  { id: "lavender", name: "Lavanda", from: "#7B2D8E", to: "#D4A5E5" },
  { id: "ember", name: "Brasa", from: "#9D0208", to: "#E85D04" },
  { id: "midnight", name: "Meia-Noite", from: "#1B1B2F", to: "#3D405B" },
  { id: "peach", name: "Pessego", from: "#FFB4A2", to: "#FFCDB2" },
  { id: "steel", name: "Aco", from: "#6C757D", to: "#ADB5BD" },
];

// CSS pattern presets for letterhead image backgrounds
export const IMAGE_PATTERN_PRESETS = [
  {
    id: "diagonal-stripes",
    name: "Listras Diagonais",
    css: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)",
  },
  {
    id: "dots-pattern",
    name: "Pontos",
    css: "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
    size: "16px 16px",
  },
  {
    id: "cross-hatch",
    name: "Hachura",
    css: "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(0,0,0,0.04) 14px, rgba(0,0,0,0.04) 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,0,0,0.04) 14px, rgba(0,0,0,0.04) 15px)",
  },
  {
    id: "zigzag",
    name: "Zigue-Zague",
    css: "linear-gradient(135deg, rgba(0,0,0,0.04) 25%, transparent 25%) -10px 0, linear-gradient(225deg, rgba(0,0,0,0.04) 25%, transparent 25%) -10px 0, linear-gradient(315deg, rgba(0,0,0,0.04) 25%, transparent 25%), linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%)",
    size: "20px 20px",
  },
  {
    id: "noise-light",
    name: "Ruido Leve",
    css: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
  },
  {
    id: "grid-subtle",
    name: "Grade Sutil",
    css: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)",
    size: "24px 24px",
  },
];

// Default letterhead style - uses inverse of paper color by default
export const DEFAULT_LETTERHEAD_STYLE: LetterheadStyle = {
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
};

// Helper: create line format with overrides
function fmt(overrides: Partial<LineFormat> = {}): LineFormat {
  return { ...DEFAULT_LINE_FORMAT, ...overrides };
}

// Font options for combobox
export const FONT_OPTIONS = [
  { id: "sans", name: "Inter", family: "font-sans" },
  { id: "mono", name: "JetBrains Mono", family: "font-mono" },
  { id: "serif", name: "Merriweather", family: "font-serif" },
];
