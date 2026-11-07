"use client";

import * as React from "react";
import type { ActionCardStyles } from "./types";
import { defaultActionCardStyles } from "./types";

interface ActionCardStylesContextValue {
  isActive: boolean;
  styles: ActionCardStyles;
}

const ActionCardStylesContext =
  React.createContext<ActionCardStylesContextValue>({
    isActive: false,
    styles: defaultActionCardStyles,
  });

interface ActionCardStylesProviderProps {
  isActive: boolean;
  styles?: ActionCardStyles;
  children: React.ReactNode;
}

export const ActionCardStylesProvider: React.FC<
  ActionCardStylesProviderProps
> = ({ isActive, styles, children }) => {
  const mergedStyles: ActionCardStyles = React.useMemo(
    () => ({
      card: styles?.card ?? defaultActionCardStyles.card,
      content: styles?.content ?? defaultActionCardStyles.content,
      badge: styles?.badge ?? defaultActionCardStyles.badge,
      title: styles?.title ?? defaultActionCardStyles.title,
      description: styles?.description ?? defaultActionCardStyles.description,
      button: styles?.button ?? defaultActionCardStyles.button,
    }),
    [styles],
  );

  return (
    <ActionCardStylesContext.Provider
      value={{ isActive, styles: mergedStyles }}
    >
      {children}
    </ActionCardStylesContext.Provider>
  );
};

export const useActionCardStyles = (): ActionCardStylesContextValue => {
  return React.useContext(ActionCardStylesContext);
};
