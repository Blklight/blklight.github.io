"use client";
import { ArrowLeft, Plus } from "lucide-react";
import type * as React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useActionCard } from "./action-card-context";

interface ActionFlipCardProps {
  id: string;
  title: string;
  description: string | string[];
  backContent?: React.ReactNode;
  styles: {
    card: string;
    content: string;
    badge: string;
    title: string;
    description: string;
    button: string;
  };
  disabled?: boolean;
}

export const ActionFlipCard = ({
  id,
  title,
  description,
  backContent,
  styles,
  disabled = false,
}: ActionFlipCardProps) => {
  const { activeCardId, setActiveCardId } = useActionCard();
  const isActive = activeCardId === id;
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (activeCardId !== id && isFlipped) {
      setIsFlipped(false);
    }
  }, [activeCardId, id, isFlipped]);
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Handle clicks on the card.
   * If the card is not disabled and not flipped, toggle the active card state.
   */
  /*******  ecf0289b-a82e-4feb-8443-101c250b5edc  *******/ const handleCardClick =
    () => {
      console.log("handleCardClick id", id);
      if (!disabled && !isFlipped) {
        setActiveCardId(isActive ? null : id);
      }
    };

  const handleAction = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (isActive && !disabled) {
      setIsFlipped(true);
    }
  };

  const handleBackClick = (): void => {
    setIsFlipped(false);
  };

  return (
    <div
      className="relative w-full"
      style={{
        perspective: "1000px",
        minHeight: "500px",
      }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente do Card */}
        <div
          className="absolute inset-0 w-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: demo; ativação por teclado fica no verso */}
          <div
            className={cn(
              "flex flex-col gap-5 relative rounded-xs p-5 border hover:border-background/50 bg-light dark:bg-dark book:bg-sepia hover:ring-4 hover:ring-foreground/20 cursor-pointer min-h-[450px] h-[500px] shadow-lg",
              isActive && `ring-4 cursor-default ${styles.card}`,
            )}
            onClick={handleCardClick}
          >
            <div
              className={cn(
                "flex flex-col flex-1 gap-3 relative pt-6 px-5 pb-12 rounded-lg border background-texture background-noise min-h-[375px]",
                isActive && styles.content,
              )}
            >
              <div className="">
                <div
                  className={cn(
                    "inline-block rounded-md border bg-background text-dark dark:text-light px-2 py-1",
                    isActive && styles.badge,
                  )}
                >
                  Gerenciamento de projetos
                </div>
              </div>

              <h1
                className={cn(
                  "font-bold text-3xl mb-2",
                  isActive && styles.title,
                )}
              >
                {title}
              </h1>
              <div className="w-5/6">
                {Array.isArray(description) ? (
                  <ul
                    className={cn(
                      "list-disc list-inside space-y-2.5 ",
                      isActive && styles.description,
                    )}
                  >
                    {description.map((item, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: lista estática de demo
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={cn(isActive && styles.description)}>
                    {description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex mt-auto">
              <Button
                variant={"outline"}
                className={cn("w-full", isActive && styles.button)}
                onClick={handleAction}
                disabled={!isActive || disabled}
              >
                <Plus className="h-4 w-4" />
                {title}
              </Button>
            </div>
          </div>
        </div>

        {/* Verso do Card */}
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
              isActive && `ring-4 cursor-default ${styles.card}`,
            )}
          >
            <div
              className={cn(
                "flex flex-col flex-1 gap-3 relative pt-6 px-5 pb-8 rounded-lg border background-texture background-noise h-full",
                isActive && styles.content,
              )}
            >
              <div className="flex items-center gap-3 mb-2">
                <Button
                  onClick={handleBackClick}
                  variant="ghost"
                  size="icon"
                  className="  text-light hover:bg-orange-400"
                >
                  <ArrowLeft size={16} />
                </Button>
              </div>

              <div className={cn("flex-grow", isActive && styles.description)}>
                {backContent || (
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Conteúdo do verso
                    </h2>
                    <p className="mb-4">
                      Aqui você pode colocar qualquer conteúdo personalizado
                      para o verso do card.
                    </p>
                    <div className="space-y-2">
                      <p>• Informações detalhadas</p>
                      <p>• Formulários</p>
                      <p>• Configurações</p>
                      <p>• Qualquer outro conteúdo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
