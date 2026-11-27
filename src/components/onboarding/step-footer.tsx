"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ReactNode, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChamferButton } from "@/components/ui/chamfer-button";
import { Kbd } from "@/components/ui/kbd";

interface Props {
  status?: ReactNode;
  onBack?: () => void;
  backLabel?: string;
  label: string;
  onNext?: () => void;
  /** Submits this form instead of calling onNext. */
  form?: string;
  disabled?: boolean;
}

const SKIP_ENTER =
  "input, textarea, select, button, a, [role=button], [contenteditable=true]";

/** Fixed action bar shared by every onboarding step: back on the left, the one primary action on the right. */
export const StepFooter = ({
  status,
  onBack,
  backLabel,
  label,
  onNext,
  form,
  disabled = false,
}: Props) => {
  const t = useTranslations("onboarding");
  useEffect(() => {
    if (disabled || form) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || e.defaultPrevented) return;
      if ((e.target as Element | null)?.closest?.(SKIP_ENTER)) return;
      e.preventDefault();
      onNext?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [disabled, form, onNext]);

  return (
    <div className="sticky bottom-0 z-20 mt-auto -mx-6 md:-mx-10 flex flex-col gap-3 border-t border-border bg-background/90 px-6 py-4 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:px-10">
      <div className="flex items-center gap-4 min-w-0">
        {onBack && (
          <Button
            variant="ghost"
            size="lg"
            onClick={onBack}
            className="-ml-3 font-mono text-xs uppercase tracking-wider rounded-xs"
          >
            {backLabel ?? t("back")}
          </Button>
        )}
        {status && (
          <output aria-live="polite" className="text-sm">
            {status}
          </output>
        )}
      </div>
      <div className="flex items-center gap-4">
        {!form && (
          <p className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            {t("or")} <Kbd className="border">Enter</Kbd>
          </p>
        )}
        <ChamferButton
          type={form ? "submit" : "button"}
          form={form}
          size="lg"
          corner="br"
          disabled={disabled}
          onClick={form ? undefined : onNext}
          className="group bg-foreground text-background hover:bg-foreground/85 font-mono text-xs uppercase tracking-wider"
        >
          {label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </ChamferButton>
      </div>
    </div>
  );
};
