"use client";

import { Palette, SwatchBook, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { useDocumentDesign } from "@/components/document/use-document-design";
import { useSavedPresets } from "@/components/document/use-saved-presets";
import { ColorsPanel } from "@/components/escrever/design/colors-panel";
import { CoverPanel } from "@/components/escrever/design/cover-panel";
import { FontPanel } from "@/components/escrever/design/font-panel";
import { GrainPanel } from "@/components/escrever/design/grain-panel";
import type { DesignContext } from "@/components/escrever/design/layout";
import { LetterheadLinkPanel } from "@/components/escrever/design/letterhead-link-panel";
import {
  DESIGN_TABS,
  type DesignTab,
} from "@/components/escrever/design/sidebar";
import { SignaturePanel } from "@/components/escrever/design/signature-panel";
import { TexturePanel } from "@/components/escrever/design/texture-panel";
import type { SignatureContext } from "@/features/documents/design/signature";
import { cn } from "@/lib/utils";
import type { DocumentDesignStore } from "@/store/create-document-design-store";

export type SidePanel = "themes" | "design";

const SIDE_TABS: { id: SidePanel; icon: ReactNode }[] = [
  { id: "themes", icon: <SwatchBook /> },
  { id: "design", icon: <Palette /> },
];

/**
 * Tabs for the side panel. Vertical: pinned to the paper's right edge on wide
 * screens. Horizontal: chips in the bar's right tab on narrow ones.
 */
export function SideTabs({
  open,
  onToggle,
  vertical = false,
  className,
}: {
  open: SidePanel | null;
  onToggle: (panel: SidePanel) => void;
  vertical?: boolean;
  className?: string;
}) {
  const t = useTranslations("design");
  return (
    <fieldset
      aria-label={t("sidePanel")}
      className={cn("flex gap-1", vertical && "flex-col", className)}
    >
      {SIDE_TABS.map((tab) => (
        <button
          key={tab.id}
          type="button"
          aria-pressed={open === tab.id}
          onClick={() => onToggle(tab.id)}
          className={cn(
            "flex items-center gap-1.5 border border-foreground font-mono text-xs uppercase tracking-wider transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground [&_svg]:size-3.5",
            vertical
              ? "-ml-px rounded-r-xs px-1.5 py-3 [writing-mode:vertical-rl]"
              : "h-6 rounded-full border-current/25 px-2.5",
            // Same inverted, grained surface as the paper bars; the open panel's tab flips back.
            vertical &&
              "relative letterhead-grain-noise letterhead-grain-overlay",
            open === tab.id
              ? "bg-background text-foreground"
              : vertical
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "hover:bg-current/10",
          )}
        >
          {tab.icon}
          <span className={vertical ? undefined : "sr-only sm:not-sr-only"}>
            {t(`sideTabs.${tab.id}`)}
          </span>
        </button>
      ))}
    </fieldset>
  );
}

/** Shell of the side panel: title, close button and a scrolling body. */
export function SidePanelFrame({
  title,
  closeLabel,
  onClose,
  children,
}: {
  title: string;
  closeLabel?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const t = useTranslations("design");
  return (
    <section
      aria-label={title}
      className="flex h-full min-h-0 flex-col border border-foreground bg-background"
    >
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-foreground px-4 py-2.5">
        <h2 className="font-mono text-xs uppercase tracking-wider">{title}</h2>
        <button
          type="button"
          aria-label={closeLabel ?? t("closePanel")}
          title={closeLabel ?? t("closePanel")}
          onClick={onClose}
          className="inline-flex size-7 items-center justify-center rounded-xs hover:bg-secondary outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <X className="size-4" />
        </button>
      </header>
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </section>
  );
}

/** Design controls for one part of the document, reusing the design panels. */
export function DesignPanel({
  designStore,
  tab,
  onTabChange,
  tabs,
  signatureContext,
}: {
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>;
  tab: DesignTab;
  onTabChange: (tab: DesignTab) => void;
  /** Subset of parts this panel edits; all of them when absent. */
  tabs?: DesignTab[];
  signatureContext?: SignatureContext | null;
}) {
  const t = useTranslations("design");
  const design = useDocumentDesign(designStore);
  const presets = useSavedPresets();
  const ctx: DesignContext = {
    design,
    presets,
    signatureContext: signatureContext ?? undefined,
  };

  const panel = () => {
    switch (tab) {
      case "colors":
        return <ColorsPanel {...ctx} />;
      case "texture":
        return <TexturePanel {...ctx} />;
      case "grain":
        return <GrainPanel {...ctx} />;
      case "font":
        return <FontPanel {...ctx} />;
      case "cover":
        return <CoverPanel {...ctx} />;
      case "letterhead":
        return <LetterheadLinkPanel design={design} />;
      case "signature":
        return <SignaturePanel {...ctx} />;
    }
  };

  return (
    <div className="flex flex-col">
      <nav
        aria-label={t("parts")}
        className="flex flex-wrap gap-1 border-b border-border p-3"
      >
        {DESIGN_TABS.filter((item) => !tabs || tabs.includes(item.id)).map(
          (item) => (
            <button
              key={item.id}
              type="button"
              aria-current={tab === item.id ? "true" : undefined}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-xs px-2 py-1 text-xs transition-colors outline-none focus-visible:ring-2 focus-visible:ring-foreground [&_svg]:size-3.5",
                tab === item.id
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              {item.icon}
              {t(`tabs.${item.id}`)}
            </button>
          ),
        )}
      </nav>
      <div className="p-4">{panel()}</div>
    </div>
  );
}

/**
 * A part of the paper that can be picked in design mode: dashed outline and
 * label on hover, solid when it is the part being edited. Outside design mode
 * it renders only its children.
 */
export function DesignRegion({
  active,
  tab,
  label: labelProp,
  selected,
  onSelect,
  className,
  children,
}: {
  active: boolean;
  tab: DesignTab;
  label?: string;
  selected: boolean;
  onSelect: (tab: DesignTab) => void;
  className?: string;
  children?: ReactNode;
}) {
  const t = useTranslations("design");
  if (!active) return <div className={className}>{children}</div>;
  const label = labelProp ?? t(`tabs.${tab}`);
  return (
    <div className={cn("group/region relative", className)}>
      {children}
      <button
        type="button"
        aria-label={t("editRegion", { part: label.toLowerCase() })}
        aria-pressed={selected}
        onClick={() => onSelect(tab)}
        className={cn(
          "absolute -inset-2 z-20 rounded-xs outline-offset-0 transition-[outline-color] outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-current",
          selected
            ? "outline-2 outline-solid outline-current"
            : "outline-1 outline-dashed outline-transparent hover:outline-current",
        )}
      >
        <span
          className={cn(
            "absolute -top-2.5 left-2 bg-foreground px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wider text-background transition-opacity",
            selected
              ? "opacity-100"
              : "opacity-0 group-hover/region:opacity-100 group-focus-within/region:opacity-100",
          )}
        >
          {label}
        </span>
      </button>
    </div>
  );
}
