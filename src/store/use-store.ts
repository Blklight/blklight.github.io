import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user: any) => set({ user }),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
