"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActionCardStyles } from "./action-card-styles-context";

export interface ActionCardFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Button label - uses title by default */
  label?: string;
  /** URL for navigation */
  url?: string;
  /** Custom action handler */
  onAction?: () => void;
  /** Disable the button */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Additional className for the button */
  buttonClassName?: string;
}

const ActionCardFooter = React.forwardRef<
  HTMLDivElement,
  ActionCardFooterProps
>(
  (
    {
      className,
      label,
      url,
      onAction,
      disabled = false,
      loading = false,
      buttonClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const router = useRouter();
    const { isActive, styles } = useActionCardStyles();

    const handleAction = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (onAction) {
          onAction();
        } else if (url) {
          router.push(url);
        }
      },
      [onAction, url, router],
    );

    return (
      <div
        ref={ref}
        data-slot="action-card-footer"
        className={cn("flex items-center h-10 px-2.5", className)}
        {...props}
      >
        {children ?? (
          <Button
            type="button"
            variant="outline"
            className={cn(
              "w-full rounded-xs",
              isActive && styles.button,
              buttonClassName,
            )}
            onClick={handleAction}
            disabled={disabled || loading}
          >
            <Plus className="h-4 w-4" />
            {loading ? "Carregando..." : label}
          </Button>
        )}
      </div>
    );
  },
);
ActionCardFooter.displayName = "ActionCardFooter";

export { ActionCardFooter };
