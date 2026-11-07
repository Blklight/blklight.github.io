"use client";

import type { StoreApi, UseBoundStore } from "zustand";
import {
  type DesignState,
  type DocumentDesignStore,
  defaultDocumentDesign,
  selectDesignState,
} from "@/store/create-document-design-store";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";
import { cloneSnapshot } from "./design-template-storage";

export type DesignDesignFields = Pick<
  DesignState,
  | "paperStyle"
  | "paperTexture"
  | "documentHeader"
  | "documentFooter"
  | "documentSignature"
  | "typography"
>;

// Fingerprint of the design fields that a template actually applies. Cover
// (coverImage/coverSettings) is deliberately excluded: the cover is never
// overwritten when applying a theme.
export function designFieldsFingerprint(snapshot: DesignDesignFields): string {
  return JSON.stringify({
    paperStyle: snapshot.paperStyle,
    paperTexture: snapshot.paperTexture,
    documentHeader: snapshot.documentHeader,
    documentFooter: snapshot.documentFooter,
    documentSignature: snapshot.documentSignature,
    typography: snapshot.typography,
  });
}

export function isDesignCustomized(
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>,
): boolean {
  const current = selectDesignState(designStore.getState());
  return (
    designFieldsFingerprint(current) !==
    designFieldsFingerprint(defaultDocumentDesign)
  );
}

export function applyTemplateToDocument(
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>,
  template: DesignTemplate,
): void {
  const current = selectDesignState(designStore.getState());
  const snapshot = cloneSnapshot(template.snapshot);
  designStore.getState().loadDesignSnapshot({
    ...snapshot,
    coverImage: current.coverImage,
    coverSettings: current.coverSettings,
  });
}
