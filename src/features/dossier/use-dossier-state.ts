import { useReducer } from "react";

export type DossierMode = "closed" | "open" | "focus";

export interface DossierState {
  mode: DossierMode;
  index: number;
}

export type DossierAction =
  | { type: "open" }
  | { type: "close" }
  | { type: "next" }
  | { type: "prev" }
  | { type: "goTo"; index: number }
  | { type: "focus"; index?: number }
  | { type: "unfocus" };

export function dossierReducer(
  state: DossierState,
  action: DossierAction,
  total: number,
): DossierState {
  const clamp = (i: number) => Math.max(0, Math.min(total - 1, i));
  switch (action.type) {
    case "open":
      return { ...state, mode: "open" };
    case "close":
      return { ...state, mode: "closed" };
    case "next":
      return state.mode === "closed"
        ? { ...state, mode: "open" }
        : { ...state, index: clamp(state.index + 1) };
    case "prev":
      if (state.mode === "open" && state.index === 0)
        return { ...state, mode: "closed" };
      return { ...state, index: clamp(state.index - 1) };
    case "goTo":
      return {
        mode: state.mode === "closed" ? "open" : state.mode,
        index: clamp(action.index),
      };
    case "focus":
      if (total === 0) return state;
      return { mode: "focus", index: clamp(action.index ?? state.index) };
    case "unfocus":
      return { ...state, mode: "open" };
  }
}

export function useDossierState(total: number, initial?: DossierState) {
  return useReducer(
    (state: DossierState, action: DossierAction) =>
      dossierReducer(state, action, total),
    initial ?? { mode: "closed", index: 0 },
  );
}
