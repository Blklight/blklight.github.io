"use client";

import type { PersistStorage, StorageValue } from "zustand/middleware";
import { normalizeLetterheadStyle } from "@/components/document/types";
import { userScopedKey } from "@/lib/user-storage";
import {
  type DesignInput,
  type DesignState,
  defaultDocumentDesign,
  mergeDesignState,
  normalizePaperStyle,
  toDesignInput,
} from "@/store/create-document-design-store";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";

export const LEGACY_DESIGN_KEY = "blklight-document-design";

export interface DesignTemplatesState {
  templates: DesignTemplate[];
  migratedFromLegacy: boolean;
}

// Storage boundary for the template library. Today it reads/writes
// localStorage; a future API swap only needs to reimplement these three
// methods (and the legacy/migration reads) without touching components.
function readRaw(key: string): unknown | null {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeRaw(key: string, value: unknown) {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const designTemplatesStorage: PersistStorage<DesignTemplatesState> = {
  getItem: (name) => {
    const parsed = readRaw(userScopedKey(name));
    if (parsed === null) return null;
    const stored = parsed as StorageValue<DesignTemplatesState>;
    if (stored?.state?.templates) {
      stored.state.templates = stored.state.templates.map((template) => ({
        ...template,
        snapshot: {
          ...template.snapshot,
          paperStyle: normalizePaperStyle(template.snapshot.paperStyle),
          documentHeader: {
            ...template.snapshot.documentHeader,
            style: normalizeLetterheadStyle(
              template.snapshot.documentHeader.style,
            ),
          },
          documentFooter: {
            ...template.snapshot.documentFooter,
            style: normalizeLetterheadStyle(
              template.snapshot.documentFooter.style,
            ),
          },
        },
      }));
    }
    return stored;
  },
  setItem: (name, value) => {
    writeRaw(userScopedKey(name), value);
  },
  removeItem: (name) => {
    if (typeof localStorage === "undefined") return;
    localStorage.removeItem(userScopedKey(name));
  },
};

export function makeTemplateId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  return `tpl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function cloneSnapshot<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value)) as T;
}

export function deriveAccentColor(snapshot: DesignInput): string {
  const { documentHeader, documentFooter } = snapshot;
  const paper = normalizePaperStyle(snapshot.paperStyle);
  if (paper.mode === "custom" && paper.bg) {
    return paper.bg;
  }
  const header = normalizeLetterheadStyle(documentHeader.style);
  const footer = normalizeLetterheadStyle(documentFooter.style);
  const headerBg =
    header.mode === "custom" ? header.gradientFrom || header.bg : null;
  if (headerBg) return headerBg;
  const footerBg =
    footer.mode === "custom" ? footer.gradientFrom || footer.bg : null;
  if (footerBg) return footerBg;
  return "hsl(var(--foreground))";
}

export function readLegacyDesignState(): Partial<DesignState> | null {
  const parsed = readRaw(LEGACY_DESIGN_KEY);
  if (!parsed || typeof parsed !== "object") return null;
  const state = (parsed as { state?: Partial<DesignState> }).state;
  if (!state || typeof state !== "object") return null;
  return state;
}

export function migrateLegacyDesign(): DesignTemplate | null {
  const legacy = readLegacyDesignState();
  if (!legacy) return null;
  const snapshot = toDesignInput(
    mergeDesignState(legacy, defaultDocumentDesign),
  );
  const now = new Date().toISOString();
  return {
    id: makeTemplateId(),
    name: "Tema padrão",
    snapshot,
    createdAt: now,
    updatedAt: now,
    accentColor: deriveAccentColor(snapshot),
  };
}
