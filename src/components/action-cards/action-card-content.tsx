import * as React from "react";

import { cn } from "@/lib/utils";
import { useActionCardStyles } from "./action-card-styles-context";

export interface ActionCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Marca este conteúdo como verso do card (modo flip) */
  back?: boolean;
  /** Description text or array of items */
  description?: string | string[];
  /** Class name for description */
  descriptionClassName?: string;
}

const ActionCardContent = React.forwardRef<
  HTMLDivElement,
  ActionCardContentProps
>(
  (
    { className, back, description, descriptionClassName, children, ...props },
    ref,
  ) => {
    const { isActive, styles } = useActionCardStyles();
    return (
      <div
        ref={ref}
        data-slot="action-card-content"
        data-back={back}
        className={cn("flex-1 overflow-y-auto scrollbar-none", className)}
        {...props}
      >
        {description ? (
          Array.isArray(description) ? (
            <ul
              className={cn(
                "list-disc list-inside space-y-2.5",
                isActive && styles.description,
                descriptionClassName,
              )}
            >
              {description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p
              className={cn(
                isActive && styles.description,
                descriptionClassName,
              )}
            >
              {description}
            </p>
          )
        ) : (
          children
        )}
      </div>
    );
  },
);
ActionCardContent.displayName = "ActionCardContent";

export { ActionCardContent };
