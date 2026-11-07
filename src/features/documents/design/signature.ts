/**
 * Document signature (assinatura), ALWAYS automatic.
 *
 * Name, code, date and organization are resolved on display from the
 * author/document data; nothing is typed or saved. The legacy saved fields of
 * `documentSignature` (authorName, authorId, locationCode, organization) are
 * never read. `enabled` is the only switch.
 *
 * Pure and isomorphic (no "use client"), like letterhead-text.ts: used by the
 * public reading page (Server Component), the design preview and the editor.
 *
 * The resolver returns a plain block (ResolvedSignature), so a second block
 * (e.g. an organization signature) can be added later as another resolver
 * returning the same shape. Not built yet.
 */
import type { LetterheadTextContext } from "./letterhead-text";

export const SIGNATURE_LABEL = "DOCUMENTO ASSINADO DIGITALMENTE";

/**
 * Shown before publishing (editor/preview), in the same shape as the real
 * authorship.publicIdentifier ("PLT-" + 8 hex + "." + 8 hex, e.g.
 * "PLT-8edf2701.d29c4b90").
 */
export const SIGNATURE_CODE_PLACEHOLDER = "PLT-••••••••.••••••••";

export interface SignatureContext extends LetterheadTextContext {
  authorship?: {
    authorName?: string | null;
    publicIdentifier?: string | null;
  } | null;
  /** Publication date (ISO). Absent = not published yet: `now` is used. */
  publishedAt?: string | null;
  now?: Date | number;
}

export interface ResolvedSignature {
  label: string;
  name: string;
  /** authorship.publicIdentifier, or the placeholder before publishing. */
  identifier: string;
  /** dd/mm/aaaa (pt-BR, America/Sao_Paulo). */
  date: string;
  organization: string | null;
}

const DATE_FORMAT = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  // Fixed zone: same day on the server (public page) and in the browser.
  timeZone: "America/Sao_Paulo",
});

/** pt-BR date only (dd/mm/aaaa). Invalid or missing date = "". */
export function formatSignatureDate(
  value: string | number | Date | null | undefined,
): string {
  if (value === null || value === undefined || value === "") return "";
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "" : DATE_FORMAT.format(date);
}

function clean(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

export function resolveSignature(context: SignatureContext): ResolvedSignature {
  return {
    label: SIGNATURE_LABEL,
    name:
      clean(context.authorship?.authorName) ||
      clean(context.author?.displayName) ||
      clean(context.author?.username),
    identifier:
      clean(context.authorship?.publicIdentifier) || SIGNATURE_CODE_PLACEHOLDER,
    date: formatSignatureDate(
      context.publishedAt || (context.now ?? Date.now()),
    ),
    organization: clean(context.organization?.name) || null,
  };
}
