import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type Language = "pt-br" | "en-us";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "pt-br",
      setLanguage: (language) => set({ language }),
    }),
    {
      name: "lang-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
