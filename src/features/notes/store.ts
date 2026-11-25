import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Annotation } from "./types";

type NewAnnotation = Omit<Annotation, "id" | "createdAt" | "updatedAt">;

interface NotesState {
  notes: Annotation[];
  /** Highlighter on: selecting text offers to mark it. */
  marking: boolean;
  setMarking: (on: boolean) => void;
  add: (note: NewAnnotation) => Annotation;
  update: (
    id: string,
    patch: Partial<Pick<Annotation, "text" | "color" | "sectionId">>,
  ) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  remove: (id: string) => void;
}

/** shortcut: kept in localStorage for testing; swap for the API when notes persist server side. */
export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      marking: false,
      setMarking: (marking) => set({ marking }),
      add: (input) => {
        const now = new Date().toISOString();
        const note: Annotation = {
          ...input,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        };
        set((s) => ({ notes: [...s.notes, note] }));
        return note;
      },
      update: (id, patch) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id
              ? { ...n, ...patch, updatedAt: new Date().toISOString() }
              : n,
          ),
        })),
      move: (id, x, y) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, board: { x, y } } : n,
          ),
        })),
      resize: (id, w, h) =>
        set((s) => ({
          notes: s.notes.map((n) =>
            n.id === id ? { ...n, size: { w, h } } : n,
          ),
        })),
      remove: (id) =>
        set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
    }),
    { name: "blklight-notes", storage: createJSONStorage(() => localStorage) },
  ),
);
