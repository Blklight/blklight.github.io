"use client";

import { create } from "zustand";

// Global UI flag: true while a full-screen/overlay editor surface is open in
// a page (e.g. the theme sheet or design overlay in /escrever). Lets the root
// Navbar step out of the way (lower z-index) instead of painting over them.
// Defaults to false so no other route is affected.
interface EditorOverlaysState {
  overlaysOpen: boolean;
  setOverlaysOpen: (open: boolean) => void;
}

export const useEditorOverlaysStore = create<EditorOverlaysState>((set) => ({
  overlaysOpen: false,
  setOverlaysOpen: (overlaysOpen) => set({ overlaysOpen }),
}));
