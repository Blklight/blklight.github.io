import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ProgressState {
  /** Documents read, by id (shared across trails). */
  read: string[];
  /** Last document read in each trail. */
  last: Record<string, string>;
  markRead: (docId: string, scopeId: string) => void;
}

/** shortcut: kept in localStorage for testing; swap for the API when progress persists server side. */
export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      read: [],
      last: {},
      markRead: (docId, scopeId) =>
        set((s) =>
          s.last[scopeId] === docId && s.read.includes(docId)
            ? s
            : {
                read: s.read.includes(docId) ? s.read : [...s.read, docId],
                last: { ...s.last, [scopeId]: docId },
              },
        ),
    }),
    {
      name: "blklight-progress",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
