"use client";

import * as React from "react";
import type { ActionCardContextValue } from "./types";

const ActionCardContext = React.createContext<
  ActionCardContextValue | undefined
>(undefined);

interface ActionCardProviderProps {
  children: React.ReactNode;
  /** Allow multiple cards to be active simultaneously */
  multiple?: boolean;
  /** Default active card id */
  defaultActiveId?: string | null;
}

export const ActionCardProvider: React.FC<ActionCardProviderProps> = ({
  children,
  multiple = false,
  defaultActiveId = null,
}) => {
  const [activeCardId, setActiveCardIdState] = React.useState<string | null>(
    defaultActiveId,
  );

  const setActiveCardId = React.useCallback(
    (id: string | null) => {
      if (multiple) {
        setActiveCardIdState((prev) => (prev === id ? null : id));
      } else {
        setActiveCardIdState(id);
      }
    },
    [multiple],
  );

  const isActive = React.useCallback(
    (id: string) => activeCardId === id,
    [activeCardId],
  );

  const value = React.useMemo(
    () => ({
      activeCardId,
      setActiveCardId,
      isActive,
    }),
    [activeCardId, setActiveCardId, isActive],
  );

  return (
    <ActionCardContext.Provider value={value}>
      {children}
    </ActionCardContext.Provider>
  );
};

export const useActionCard = (): ActionCardContextValue => {
  const context = React.useContext(ActionCardContext);
  if (!context) {
    throw new Error("useActionCard must be used within an ActionCardProvider");
  }
  return context;
};
