// Accessibility utilities for color contrast (WCAG 2.1)

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Returns accessible text color (black or white) based on background
export function getAccessibleTextColor(bgColor: string): string {
  const rgb = hexToRgb(bgColor);
  const bgLuminance = getLuminance(rgb.r, rgb.g, rgb.b);

  // Check contrast with white and black
  const whiteLuminance = 1;
  const blackLuminance = 0;

  const whiteContrast = getContrastRatio(whiteLuminance, bgLuminance);
  const blackContrast = getContrastRatio(bgLuminance, blackLuminance);

  // WCAG AA requires 4.5:1 for normal text, we use the one with better contrast
  return whiteContrast > blackContrast ? "#FFFFFF" : "#1A1A1A";
}

// Get a muted version of the text color for placeholders
export function getMutedTextColor(textColor: string): string {
  return textColor === "#FFFFFF"
    ? "rgba(255, 255, 255, 0.5)"
    : "rgba(26, 26, 26, 0.5)";
}

// Get border color based on background
export function getAccessibleBorderColor(bgColor: string): string {
  const rgb = hexToRgb(bgColor);
  const bgLuminance = getLuminance(rgb.r, rgb.g, rgb.b);
  return bgLuminance > 0.5 ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)";
}

// Calculate WCAG contrast ratio between two colors
export function calculateContrastRatio(bg: string, text: string): number {
  const bgRgb = hexToRgb(bg);
  const textRgb = hexToRgb(text);
  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const textLum = getLuminance(textRgb.r, textRgb.g, textRgb.b);
  return getContrastRatio(bgLum, textLum);
}

// Get WCAG level based on contrast ratio
export function getWCAGLevel(ratio: number): {
  level: string;
  color: string;
  message: string;
} {
  if (ratio >= 7)
    return { level: "AAA", color: "#22C55E", message: "Excelente contraste" };
  if (ratio >= 4.5)
    return { level: "AA", color: "#84CC16", message: "Bom contraste" };
  if (ratio >= 3)
    return {
      level: "AA Large",
      color: "#EAB308",
      message: "Apenas texto grande",
    };
  return {
    level: "Falha",
    color: "#EF4444",
    message: "Contraste insuficiente",
  };
}
