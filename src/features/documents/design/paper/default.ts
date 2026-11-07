import type { AdaptivePaperTheme } from "./types";

/**
 * Tema Padrão
 * - Tipo: adaptativo (acompanha claro/escuro)
 * - Para que serve: padrão do sistema
 * - Cores: vêm de use-document-design.ts (fonte/cores derivadas do contexto) e
 *   document-read.ts via deriveReadDesign (resolução para leitura pública).
 *   Evidência: src/components/document/use-document-design.ts usa paperStyle
 *   + getAccessibleTextColor/getMutedTextColor; src/features/documents/document-read.ts
 *   aplica lógica de cores sem tema fixo para o padrão.
 */
export const defaultTheme: AdaptivePaperTheme = {
  id: "default",
  name: "Tema Padrão",
  description: "Tema padrão",
  kind: "adaptive",
};

export default defaultTheme;
