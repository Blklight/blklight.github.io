"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseAutosaveOptions<T> {
  /** Values to keep saved; compared by their JSON serialization. */
  values: T;
  /** Autosave runs only while true (e.g. once the document exists on the server). */
  enabled: boolean;
  /** Persists the current values; resolves true on success. */
  onSave: () => Promise<boolean>;
  delay?: number;
}

/**
 * Debounced autosave against the last saved snapshot, not a dirty flag: every
 * change after a save schedules another save, and edits typed while a save is
 * in flight are saved by the next round.
 */
export function useAutosave<T>({
  values,
  enabled,
  onSave,
  delay = 1800,
}: UseAutosaveOptions<T>) {
  const serialized = JSON.stringify(values);
  const savedRef = useRef<string | null>(null);
  const serializedRef = useRef(serialized);
  serializedRef.current = serialized;
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;
  const [, setSavedVersion] = useState(0);

  const markSaved = useCallback((snapshot: T) => {
    savedRef.current = JSON.stringify(snapshot);
    setSavedVersion((v) => v + 1);
  }, []);

  // The values present when autosave turns on are the saved baseline (the
  // document was just loaded or just created).
  useEffect(() => {
    if (!enabled) {
      savedRef.current = null;
      return;
    }
    if (savedRef.current === null) {
      savedRef.current = serializedRef.current;
      setSavedVersion((v) => v + 1);
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled || savedRef.current === null) return;
    if (serialized === savedRef.current) return;
    const timeout = setTimeout(async () => {
      // A manual save may have caught up with these values meanwhile.
      if (savedRef.current === serialized) return;
      if (await onSaveRef.current()) {
        savedRef.current = serialized;
        setSavedVersion((v) => v + 1);
      }
    }, delay);
    return () => clearTimeout(timeout);
  }, [enabled, serialized, delay]);

  const hasUnsavedChanges = enabled && savedRef.current !== serialized;

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [hasUnsavedChanges]);

  return { hasUnsavedChanges, markSaved };
}
