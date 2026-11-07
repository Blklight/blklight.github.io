"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  cloneSnapshot,
  type DesignTemplatesState,
  deriveAccentColor,
  designTemplatesStorage,
  makeTemplateId,
  migrateLegacyDesign,
} from "@/lib/design-template-storage";
import { currentUserId, userScopedKey } from "@/lib/user-storage";
import { useAuthStore } from "@/store/useAuthStore";
import {
  type DesignInput,
  defaultDocumentDesign,
  toDesignInput,
} from "./create-document-design-store";

export interface DesignTemplate {
  id: string;
  name: string;
  snapshot: DesignInput;
  createdAt: string;
  updatedAt: string;
  accentColor: string;
}

interface DesignTemplatesActions {
  createTemplate: () => DesignTemplate;
  renameTemplate: (id: string, name: string) => void;
  duplicateTemplate: (id: string) => void;
  deleteTemplate: (id: string) => void;
  saveTemplateSnapshot: (id: string, snapshot: DesignInput) => void;
  runLegacyMigration: () => void;
}

type DesignTemplatesStore = DesignTemplatesState & DesignTemplatesActions;

const now = () => new Date().toISOString();

export const useDesignTemplatesStore = create<DesignTemplatesStore>()(
  persist(
    (set, get) => ({
      templates: [],
      migratedFromLegacy: false,

      createTemplate: () => {
        const existing = get().templates;
        const base = "Sem título";
        let name = base;
        let n = 2;
        while (existing.some((t) => t.name === name)) {
          name = `${base} ${n}`;
          n += 1;
        }
        const snapshot = cloneSnapshot(toDesignInput(defaultDocumentDesign));
        const timestamp = now();
        const template: DesignTemplate = {
          id: makeTemplateId(),
          name,
          snapshot,
          createdAt: timestamp,
          updatedAt: timestamp,
          accentColor: deriveAccentColor(snapshot),
        };
        set({ templates: [...existing, template] });
        return template;
      },

      renameTemplate: (id, name) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set({
          templates: get().templates.map((t) =>
            t.id === id ? { ...t, name: trimmed } : t,
          ),
        });
      },

      duplicateTemplate: (id) => {
        const source = get().templates.find((t) => t.id === id);
        if (!source) return;
        const timestamp = now();
        const copy: DesignTemplate = {
          id: makeTemplateId(),
          name: `${source.name} (cópia)`,
          snapshot: cloneSnapshot(source.snapshot),
          createdAt: timestamp,
          updatedAt: timestamp,
          accentColor: source.accentColor,
        };
        set({ templates: [...get().templates, copy] });
      },

      deleteTemplate: (id) => {
        set({ templates: get().templates.filter((t) => t.id !== id) });
      },

      saveTemplateSnapshot: (id, snapshot) => {
        set({
          templates: get().templates.map((t) =>
            t.id === id
              ? {
                  ...t,
                  snapshot: cloneSnapshot(snapshot),
                  updatedAt: now(),
                  accentColor: deriveAccentColor(snapshot),
                }
              : t,
          ),
        });
      },

      // One-time migration from the legacy singleton store
      // ("blklight-document-design"), gated so it never re-runs even if the
      // list is later emptied. The legacy key is preserved (not removed).
      runLegacyMigration: () => {
        if (get().migratedFromLegacy) return;
        const migrated = migrateLegacyDesign();
        set({
          templates: migrated
            ? [migrated, ...get().templates]
            : get().templates,
          migratedFromLegacy: true,
        });
      },
    }),
    {
      name: "blklight-design-templates",
      storage: designTemplatesStorage,
    },
  ),
);

// Zustand stores live for the whole SPA session. Reload the template library
// when the signed-in user changes so one account never sees another's themes.
if (typeof window !== "undefined") {
  let lastUserId = currentUserId();
  useAuthStore.subscribe((state) => {
    const userId = state.user?.id ?? null;
    if (userId === lastUserId) return;
    lastUserId = userId;

    const baseKey = "blklight-design-templates";
    const scopedKey = userScopedKey(baseKey, userId);
    const legacy = localStorage.getItem(baseKey);
    if (userId && legacy !== null && localStorage.getItem(scopedKey) === null) {
      localStorage.setItem(scopedKey, legacy);
      localStorage.removeItem(baseKey);
    }

    if (localStorage.getItem(scopedKey) !== null) {
      void useDesignTemplatesStore.persist.rehydrate();
      return;
    }
    useDesignTemplatesStore.setState({
      templates: [],
      migratedFromLegacy: false,
    });
  });
}
