"use client";

import { useCallback, useEffect, useState } from "react";
import { userScopedKey } from "@/lib/user-storage";
import type { CustomPaperColor, SavedLetterheadStyle } from "./types";

const STORAGE_KEYS = {
  colors: "blklight-paper-colors",
  letterheadStyles: "blklight-letterhead-styles",
  legacyLetterheadStyles: "blklight-banner-styles",
} as const;

export interface SavedPresetsReturn {
  savedColors: CustomPaperColor[];
  savedLetterheadStyles: SavedLetterheadStyle[];
  handleSaveColor: (color: CustomPaperColor) => void;
  handleDeleteColor: (id: string) => void;
  handleSaveLetterheadStyle: (style: SavedLetterheadStyle) => void;
  handleDeleteLetterheadStyle: (id: string) => void;
}

function loadFromStorage<T>(key: string, fallback: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch {
    console.error(`Failed to parse ${key} from localStorage`);
  }
  return fallback;
}

function saveToStorage<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

function migrateUnscopedKey(base: string): string {
  const scoped = userScopedKey(base);
  if (scoped === base) return scoped;
  const legacy = localStorage.getItem(base);
  if (legacy !== null && localStorage.getItem(scoped) === null) {
    localStorage.setItem(scoped, legacy);
    localStorage.removeItem(base);
  }
  return scoped;
}

export function useSavedPresets(): SavedPresetsReturn {
  const [savedColors, setSavedColors] = useState<CustomPaperColor[]>([]);
  const [savedLetterheadStyles, setSavedLetterheadStyles] = useState<
    SavedLetterheadStyle[]
  >([]);

  // Load from the signed-in user's keys on mount. Older builds used global
  // keys; move those into the first account that opens the design UI.
  useEffect(() => {
    setSavedColors(
      loadFromStorage<CustomPaperColor>(
        migrateUnscopedKey(STORAGE_KEYS.colors),
        [],
      ),
    );
    const letterheadKey = migrateUnscopedKey(STORAGE_KEYS.letterheadStyles);
    const current = loadFromStorage<SavedLetterheadStyle>(letterheadKey, []);
    if (current.length > 0) {
      setSavedLetterheadStyles(current);
      return;
    }
    const legacy = loadFromStorage<SavedLetterheadStyle>(
      STORAGE_KEYS.legacyLetterheadStyles,
      [],
    );
    if (legacy.length > 0) {
      saveToStorage(letterheadKey, legacy);
      localStorage.removeItem(STORAGE_KEYS.legacyLetterheadStyles);
    }
    setSavedLetterheadStyles(legacy);
  }, []);

  const handleSaveColor = useCallback((color: CustomPaperColor) => {
    setSavedColors((prev) => {
      const updated = [...prev, color];
      saveToStorage(userScopedKey(STORAGE_KEYS.colors), updated);
      return updated;
    });
  }, []);

  const handleDeleteColor = useCallback((id: string) => {
    setSavedColors((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveToStorage(userScopedKey(STORAGE_KEYS.colors), updated);
      return updated;
    });
  }, []);

  const handleSaveLetterheadStyle = useCallback(
    (style: SavedLetterheadStyle) => {
      setSavedLetterheadStyles((prev) => {
        const updated = [...prev, style];
        saveToStorage(userScopedKey(STORAGE_KEYS.letterheadStyles), updated);
        return updated;
      });
    },
    [],
  );

  const handleDeleteLetterheadStyle = useCallback((id: string) => {
    setSavedLetterheadStyles((prev) => {
      const updated = prev.filter((s) => s.id !== id);
      saveToStorage(STORAGE_KEYS.letterheadStyles, updated);
      return updated;
    });
  }, []);

  return {
    savedColors,
    savedLetterheadStyles,
    handleSaveColor,
    handleDeleteColor,
    handleSaveLetterheadStyle,
    handleDeleteLetterheadStyle,
  };
}
