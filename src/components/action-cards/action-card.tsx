"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActionCard } from "./action-card-context";
import { ActionCardStylesProvider } from "./action-card-styles-context";
import type { ActionCardProps, ActionCardStyles } from "./types";
import { defaultActionCardStyles } from "./types";

const ActionCardRoot = React.forwardRef<
  HTMLDivElement,
  ActionCardProps & { styles?: ActionCardStyles }
>(
  (
    {
      id,
      url,
      onAction,
      disabled = false,
      skeleton = false,
      className,
      styles,
      flip = false,
      actionLabel,
      children,
    },
    ref,
  ) => {
    const { isActive, setActiveCardId } = useActionCard();
    const isCardActive = isActive(id);
    const router = useRouter();
    const [isFlipped, setIsFlipped] = React.useState(false);

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

    const frontContent: React.ReactNode[] = [];
    const backContent: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        const childProps = child.props as { back?: boolean };
        if (childProps.back === true) {
          backContent.push(child);
        } else {
          frontContent.push(child);
        }
      } else {
        frontContent.push(child);
      }
    });

    React.useEffect(() => {
      if (!isCardActive && isFlipped) {
        setIsFlipped(false);
      }
    }, [isCardActive, isFlipped]);

    const handleCardClick = React.useCallback(() => {
      if (!disabled && !isFlipped) {
        setActiveCardId(isCardActive ? null : id);
      }
    }, [disabled, id, isCardActive, isFlipped, setActiveCardId]);

    const handleFlip = React.useCallback(() => {
      if (isCardActive && !disabled) {
        setIsFlipped(true);
      }
    }, [isCardActive, disabled]);

    const handleBackClick = React.useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      setIsFlipped(false);
    }, []);

    const handleAction = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (isCardActive && !disabled) {
          if (flip && !isFlipped) {
            handleFlip();
          } else if (onAction) {
            onAction();
          } else if (url) {
            router.push(url);
          }
        }
      },
      [
        isCardActive,
        disabled,
        flip,
        isFlipped,
        handleFlip,
        onAction,
        url,
        router,
      ],
    );

    if (skeleton) {
      return (
        <div
          className={cn(
            "flex flex-col gap-5 relative rounded-xs p-5 border border-dashed bg-light dark:bg-dark book:bg-sepia cursor-default h-[500px]",
            className,
          )}
        >
          <ActionCardStylesProvider isActive={isCardActive} styles={styles}>
            {frontContent}
          </ActionCardStylesProvider>
        </div>
      );
    }

    if (flip) {
      return (
        <div
          ref={ref}
          className={cn("relative w-full", className)}
          style={{ perspective: "1000px", minHeight: "500px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Frente - dois níveis: wrapper com backfaceVisibility + conteúdo */}
            <div
              className="absolute inset-0 w-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <button
                type="button"
                className={cn(
                  "flex flex-col gap-5 relative rounded-xs p-5 border hover:border-background/50 bg-light dark:bg-dark book:bg-sepia hover:ring-4 hover:ring-foreground/20 cursor-pointer min-h-[450px] h-[500px] shadow-lg w-full text-left",
                  isCardActive &&
                    `ring-4 ring-foreground/20 cursor-default ${styles?.card ?? ""}`,
                )}
                onClick={handleCardClick}
                disabled={disabled}
              >
                <div
                  className={cn(
                    "flex flex-col flex-1 gap-3 relative pt-6 px-5 pb-12 rounded-xs border background-texture background-noise min-h-[375px]",
                    isCardActive && styles?.content,
                  )}
                >
                  <ActionCardStylesProvider
                    isActive={isCardActive}
                    styles={styles}
                  >
                    {frontContent}
                  </ActionCardStylesProvider>
                </div>

                <div className="flex mt-auto">
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full rounded-xs",
                      isCardActive && styles?.button,
                    )}
                    onClick={handleAction}
                    disabled={!isCardActive || disabled}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </button>
            </div>

            {/* Verso - dois níveis: wrapper com backfaceVisibility + conteúdo */}
            <div
              className="absolute inset-0 w-full"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div
                className={cn(
                  "flex flex-col gap-5 relative rounded-xs p-5 border hover:border-background/50 bg-light dark:bg-dark book:bg-sepia hover:ring-4 hover:ring-foreground/20 cursor-pointer min-h-[450px] h-[500px]",
                  isCardActive &&
                    `ring-4 ring-foreground/50 cursor-default ${styles?.card ?? ""}`,
                )}
              >
                <div
                  className={cn(
                    "flex flex-col flex-1 gap-3 relative pt-6 px-5 pb-8 rounded-xs border background-texture background-noise h-full",
                    isCardActive && styles?.content,
                  )}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Button
                      onClick={handleBackClick}
                      variant="ghost"
                      size="icon"
                      className="text-light hover:bg-orange-400"
                      aria-label="Voltar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </svg>
                    </Button>
                  </div>

                  <div
                    className={cn(
                      "flex-grow",
                      isCardActive && styles?.description,
                    )}
                  >
                    {backContent.length > 0 ? (
                      backContent
                    ) : (
                      <p>Conteúdo do verso</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      // biome-ignore lint/a11y/useSemanticElements: card com conteúdo em bloco não cabe em <button>
      <div
        ref={ref}
        data-slot="action-card"
        data-active={isCardActive}
        className={cn(
          "flex flex-col gap-4 relative rounded-xs p-5 border hover:border-background/50 bg-light dark:bg-dark book:bg-sepia hover:ring-4 hover:ring-foreground/20 cursor-pointer h-[500px] shadow-lg",
          isCardActive && `ring-4 cursor-default ${mergedStyles.card}`,
          className,
        )}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        <div
          className={cn(
            "flex flex-col flex-1 min-h-0 gap-3 relative pt-6 px-5 pb-4 rounded-xs border background-texture",
            !isCardActive && "background-noise",
            isCardActive && mergedStyles.content,
          )}
        >
          <ActionCardStylesProvider
            isActive={isCardActive}
            styles={mergedStyles}
          >
            {children}
          </ActionCardStylesProvider>
        </div>

        {actionLabel && (
          <div className="flex mt-auto">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full rounded-xs",
                isCardActive && mergedStyles.button,
              )}
              onClick={(e) => {
                e.stopPropagation();
                if (isCardActive && !disabled) {
                  if (onAction) {
                    onAction();
                  } else if (url) {
                    router.push(url);
                  }
                }
              }}
              disabled={!isCardActive || disabled}
            >
              <Plus className="h-4 w-4" />
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    );
  },
);
ActionCardRoot.displayName = "ActionCard";

export const ActionCard = ActionCardRoot;

export type { ActionCardProps, ActionCardStyles };
