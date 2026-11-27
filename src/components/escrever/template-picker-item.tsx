"use client";

import { Check } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import {
  DocumentFooterRenderer,
  DocumentHeaderRenderer,
} from "@/components/document/letterhead-renderer";
import { PaperSurface } from "@/features/documents/design/paper-surface";
import { derivePaperDesign } from "@/features/documents/document-read";
import { cn } from "@/lib/utils";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";

interface TemplatePickerItemProps {
  template: DesignTemplate;
  isApplied: boolean;
  onApply: () => void;
}

const DATE = { day: "2-digit", month: "2-digit", year: "numeric" } as const;

/** The theme as a tiny page: real paper, letterhead, typeface and footer, scaled down. */
function TemplateThumb({ template }: { template: DesignTemplate }) {
  const t = useTranslations("templates");
  const tk = useTranslations("kinds");
  const sample = {
    author: { displayName: t("sampleAuthor") },
    typeLabel: tk("article.label"),
  };
  const { snapshot } = template;
  const design = derivePaperDesign(snapshot);
  return (
    <div aria-hidden className="relative h-40 overflow-hidden bg-secondary">
      <div className="pointer-events-none absolute top-3 left-1/2 w-[30rem] origin-top -translate-x-1/2 scale-[0.5]">
        <PaperSurface
          paperColors={design.paperColors}
          paperTexture={design.paperTexture}
          textureStyle={design.textureStyle}
          grains={snapshot.paperStyle?.grains}
          className="bg-background"
          contentClassName="p-6"
        >
          {snapshot.documentHeader?.enabled && (
            <DocumentHeaderRenderer
              header={snapshot.documentHeader}
              className="mb-4"
              textContext={sample}
            />
          )}
          <p
            className={cn(
              "text-3xl font-bold tracking-tight",
              design.fontClass,
            )}
            style={{ color: design.paperColors?.text ?? undefined }}
          >
            {t("sampleTitle")}
          </p>
          <p
            className={cn("mt-3 text-base leading-relaxed", design.fontClass)}
            style={{ color: design.paperColors?.muted ?? undefined }}
          >
            {t("sampleText")}
          </p>
          {snapshot.documentFooter?.enabled && (
            <DocumentFooterRenderer
              footer={snapshot.documentFooter}
              className="mt-6"
              textContext={sample}
            />
          )}
        </PaperSurface>
      </div>
    </div>
  );
}

export function TemplatePickerItem({
  template,
  isApplied,
  onApply,
}: TemplatePickerItemProps) {
  const t = useTranslations("templates");
  const format = useFormatter();
  return (
    <button
      type="button"
      onClick={onApply}
      disabled={isApplied}
      aria-pressed={isApplied}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-xs border text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground disabled:cursor-default",
        isApplied
          ? "border-foreground"
          : "border-foreground/15 hover:border-foreground",
      )}
    >
      <TemplateThumb template={template} />
      <span className="flex items-center justify-between gap-3 border-t border-inherit px-3 py-2.5">
        <span className="min-w-0">
          <span className="block truncate font-mono text-xs uppercase tracking-wider">
            {template.name}
          </span>
          <span className="mt-0.5 block font-mono text-[0.65rem] text-foreground/50">
            {t("editedOn", {
              date: format.dateTime(new Date(template.updatedAt), DATE),
            })}
          </span>
        </span>
        <span
          className={cn(
            "flex shrink-0 items-center gap-1 rounded-xs px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider",
            isApplied
              ? "bg-foreground text-background"
              : "text-foreground/60 group-hover:text-foreground",
          )}
        >
          {isApplied && <Check className="size-3" />}
          {isApplied ? t("applied") : t("apply")}
        </span>
      </span>
    </button>
  );
}
