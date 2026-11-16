import { create } from "zustand";

interface CommandMenuState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useCommandMenuStore = create<CommandMenuState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
