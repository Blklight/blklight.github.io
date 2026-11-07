"use client";

import type { StoreApi } from "zustand";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  type CoverImageSettings,
  DEFAULT_COVER_SETTINGS,
} from "@/components/document/cover-image-editor";
import type {
  DocumentFooter,
  DocumentHeader,
  DocumentSignature,
  PaperStyle,
  PaperTexture,
} from "@/components/document/types";
import { normalizeLetterheadStyle } from "@/components/document/types";
import { defaultDesignState } from "@/features/documents/design/defaults";
import { normalizeGrainSettings } from "@/features/documents/design/grains";

export interface DesignState {
  paperStyle: PaperStyle;
  paperTexture: PaperTexture;
  documentHeader: DocumentHeader;
  documentFooter: DocumentFooter;
  documentSignature: DocumentSignature;
  typography: "sans" | "serif" | "mono";
  coverImage: string | null;
  coverSettings: CoverImageSettings;
  // Editor meta: when true, presetId/mode/style stay in sync between header
  // and footer (but never lines/lineFormats/enabled). NOT part of the saved
  // document payload — excluded from selectDesignState().
  headerFooterLinked: boolean;
}

// The persistable "data" subset of the design (everything except the editor
// meta flag headerFooterLinked). Templates and save payloads are built from
// this shape; the flag is per-editor-session state.
export type DesignInput = Omit<DesignState, "headerFooterLinked">;

/** Strip headerFooterLinked from a full DesignState, producing a safe
 *  snapshot for template storage / save payloads. */
export function toDesignInput(state: DesignState): DesignInput {
  return {
    paperStyle: state.paperStyle,
    paperTexture: state.paperTexture,
    documentHeader: state.documentHeader,
    documentFooter: state.documentFooter,
    documentSignature: state.documentSignature,
    typography: state.typography,
    coverImage: state.coverImage,
    coverSettings: state.coverSettings,
  };
}

export interface DesignActions {
  setPaperStyle: (style: PaperStyle) => void;
  setPaperTexture: (texture: PaperTexture) => void;
  setDocumentHeader: (header: DocumentHeader) => void;
  setDocumentFooter: (footer: DocumentFooter) => void;
  setDocumentSignature: (signature: DocumentSignature) => void;
  setTypography: (font: "sans" | "serif" | "mono") => void;
  setCoverImage: (url: string | null) => void;
  setCoverSettings: (settings: CoverImageSettings) => void;
  setHeaderFooterLinked: (linked: boolean) => void;
  resetDesign: () => void;
  // Bulk replace of all data fields — reserved for future theme switching
  // (applying a saved theme from /design to a document in /escrever). The
  // headerFooterLinked flag is editor meta and is never taken from a snapshot.
  loadDesignSnapshot: (snapshot: DesignInput) => void;
}

export type DocumentDesignStore = DesignState & DesignActions;

type DesignSetState = StoreApi<DocumentDesignStore>["setState"];

export const defaultDocumentDesign: DesignState = defaultDesignState;

// Read-time normalization of PaperStyle with backward compatibility for data
// saved before the rename: mode "theme" is the legacy spelling of "default",
// and customBg/customText are the legacy spelling of bg/text. New writes
// always use the new names; reads accept both. Idempotent.
export function normalizePaperStyle(raw: unknown): PaperStyle {
  const ps = (raw && typeof raw === "object" ? raw : {}) as Record<
    string,
    unknown
  >;
  let grains: string[] | undefined;
  if (Array.isArray(ps.grains)) {
    grains = ps.grains.filter((g): g is string => typeof g === "string");
    if (grains.length === 0) {
      // Preserve empty array? No - store undefined if empty?
      // Better keep as is array but normalize to undefined?
      // But spec says "absent or empty = sem grão".
      // We'll keep undefined for empty to be safe, but also accept array.
      grains = undefined;
    }
  }
  return {
    mode: ps.mode === "preset" || ps.mode === "custom" ? ps.mode : "default",
    presetId: typeof ps.presetId === "string" ? ps.presetId : null,
    bg:
      typeof ps.bg === "string"
        ? ps.bg
        : typeof ps.customBg === "string"
          ? ps.customBg
          : null,
    text:
      typeof ps.text === "string"
        ? ps.text
        : typeof ps.customText === "string"
          ? ps.customText
          : null,
    grains,
    grainSettings: normalizeGrainSettings(ps.grainSettings),
  };
}

function createDesignState(set: DesignSetState): DocumentDesignStore {
  return {
    ...defaultDocumentDesign,

    setPaperStyle: (paperStyle) =>
      set({ paperStyle: normalizePaperStyle(paperStyle) }),
    setPaperTexture: (paperTexture) => set({ paperTexture }),
    // When header/footer are linked, presetId/mode/style are mirrored to the
    // opposite side. lines/lineFormats/enabled are never mirrored. The mirror
    // builds the sibling object directly (no nested set() call), so it cannot
    // re-trigger another mirror (no recursion).
    setDocumentHeader: (documentHeader) =>
      set((state) => {
        const header = {
          ...documentHeader,
          style: normalizeLetterheadStyle(documentHeader.style),
        };
        if (!state.headerFooterLinked) return { documentHeader: header };
        return {
          documentHeader: header,
          documentFooter: {
            ...state.documentFooter,
            presetId: header.presetId,
            mode: header.mode,
            style: header.style,
          },
        };
      }),
    setDocumentFooter: (documentFooter) =>
      set((state) => {
        const footer = {
          ...documentFooter,
          style: normalizeLetterheadStyle(documentFooter.style),
        };
        if (!state.headerFooterLinked) return { documentFooter: footer };
        return {
          documentFooter: footer,
          documentHeader: {
            ...state.documentHeader,
            presetId: footer.presetId,
            mode: footer.mode,
            style: footer.style,
          },
        };
      }),
    setDocumentSignature: (documentSignature) => set({ documentSignature }),
    setTypography: (typography) => set({ typography }),
    setCoverImage: (coverImage) => set({ coverImage }),
    setCoverSettings: (coverSettings) => set({ coverSettings }),
    // Turning the link ON copies the current header presetId/mode/style to the
    // footer (header is the source of truth). Turning it OFF does not touch
    // either side — both simply stop syncing from that point on.
    setHeaderFooterLinked: (linked) =>
      set((state) => {
        if (!linked) return { headerFooterLinked: false };
        return {
          headerFooterLinked: true,
          documentFooter: {
            ...state.documentFooter,
            presetId: state.documentHeader.presetId,
            mode: state.documentHeader.mode,
            style: state.documentHeader.style,
          },
        };
      }),
    resetDesign: () => set({ ...defaultDocumentDesign }),
    loadDesignSnapshot: (snapshot) =>
      set((state) => ({
        ...snapshot,
        headerFooterLinked: state.headerFooterLinked,
        paperStyle: normalizePaperStyle(snapshot.paperStyle),
        documentHeader: {
          ...snapshot.documentHeader,
          style: normalizeLetterheadStyle(snapshot.documentHeader.style),
        },
        documentFooter: {
          ...snapshot.documentFooter,
          style: normalizeLetterheadStyle(snapshot.documentFooter.style),
        },
      })),
  };
}

export interface CreateDocumentDesignStoreOptions {
  name?: string;
}

// Deep-ish merge of a persisted design onto a base state, with the nested
// fields that were extended across versions handled field-by-field.
// Shared by the store persist (backward compat) and the legacy migration.
export function mergeDesignState(
  persisted: Partial<DesignState>,
  current: DesignState,
): DesignState {
  return {
    ...current,
    ...persisted,
    headerFooterLinked:
      persisted.headerFooterLinked ?? current.headerFooterLinked,
    paperStyle: normalizePaperStyle(persisted.paperStyle ?? current.paperStyle),
    documentHeader: {
      ...current.documentHeader,
      ...persisted.documentHeader,
      style: normalizeLetterheadStyle(
        persisted.documentHeader?.style ?? current.documentHeader.style,
      ),
    },
    documentFooter: {
      ...current.documentFooter,
      ...persisted.documentFooter,
      style: normalizeLetterheadStyle(
        persisted.documentFooter?.style ?? current.documentFooter.style,
      ),
    },
    coverSettings: {
      ...DEFAULT_COVER_SETTINGS,
      ...persisted.coverSettings,
    },
  };
}

export function createDocumentDesignStore(
  options: CreateDocumentDesignStoreOptions = {},
) {
  const { name } = options;

  if (name) {
    return create<DocumentDesignStore>()(
      persist(createDesignState, {
        name,
        storage: createJSONStorage(() => localStorage),
        merge: (persisted, current) => ({
          ...current,
          ...mergeDesignState(persisted as Partial<DesignState>, current),
        }),
      }),
    );
  }

  return create<DocumentDesignStore>()(createDesignState);
}

// The subset of the design that is actually persisted/sent. headerFooterLinked
// is editor meta and deliberately NOT included here (it never reaches the
// save payload or the template snapshots).
export function selectDesignState(state: DocumentDesignStore): DesignInput {
  return {
    paperStyle: state.paperStyle,
    paperTexture: state.paperTexture,
    documentHeader: state.documentHeader,
    documentFooter: state.documentFooter,
    documentSignature: state.documentSignature,
    typography: state.typography,
    coverImage: state.coverImage,
    coverSettings: state.coverSettings,
  };
}
