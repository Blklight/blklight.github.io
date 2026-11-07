import * as React from "react";

import { cn } from "@/lib/utils";
import { useActionCardStyles } from "./action-card-styles-context";

export interface ActionCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Badge text to display */
  badge?: string;
  /** Title text */
  title?: string;
  /** Title class name */
  titleClassName?: string;
  /** Badge class name */
  badgeClassName?: string;
}

const ActionCardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isActive, styles } = useActionCardStyles();
  return (
    <div
      ref={ref}
      className={cn(
        "inline-block rounded-xs border bg-background text-dark dark:text-light px-2 py-1",
        isActive && styles.badge,
        className,
      )}
      {...props}
    />
  );
});
ActionCardBadge.displayName = "ActionCardBadge";

const ActionCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const { isActive, styles } = useActionCardStyles();
  return (
    <h1
      ref={ref}
      className={cn(
        "font-bold text-3xl mb-2",
        isActive && styles.title,
        className,
      )}
      {...props}
    />
  );
});
ActionCardTitle.displayName = "ActionCardTitle";

const ActionCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { isActive, styles } = useActionCardStyles();
  return (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        isActive && styles.description,
        className,
      )}
      {...props}
    />
  );
});
ActionCardDescription.displayName = "ActionCardDescription";

const ActionCardHeader = React.forwardRef<
  HTMLDivElement,
  ActionCardHeaderProps
>(
  (
    {
      className,
      badge,
      title,
      badgeClassName,
      titleClassName,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-slot="action-card-header"
        className={cn("flex flex-col gap-1", className)}
        {...props}
      >
        {badge && (
          <ActionCardBadge className={badgeClassName}>{badge}</ActionCardBadge>
        )}
        {title && (
          <ActionCardTitle className={titleClassName}>{title}</ActionCardTitle>
        )}
        {children}
      </div>
    );
  },
);
ActionCardHeader.displayName = "ActionCardHeader";

export {
  ActionCardHeader,
  ActionCardBadge,
  ActionCardTitle,
  ActionCardDescription,
};
