"use client";

import { useEffect } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { EditorStyles } from "@/components/document/editor-styles";
import type { PreviewDesignProps } from "@/components/document/preview";
import { DocumentPreview } from "@/components/document/preview";
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
  DesignSidebar,
  type DesignTab,
} from "@/components/escrever/design/sidebar";
import { SignaturePanel } from "@/components/escrever/design/signature-panel";
import { TexturePanel } from "@/components/escrever/design/texture-panel";
import { useExpandableScreen } from "@/components/ui/expandable-screen";
import { Kbd } from "@/components/ui/kbd";
import type { LetterheadTextContext } from "@/features/documents/design/letterhead-text";
import type { SignatureContext } from "@/features/documents/design/signature";
import { cn } from "@/lib/utils";
import type { DocumentDesignStore } from "@/store/create-document-design-store";

interface DesignOverlayProps {
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>;
  activeTab: DesignTab;
  onActiveTabChange: (tab: DesignTab) => void;
  /** Data for letterhead markers in the live preview ({{publicador}}). */
  letterheadContext?: LetterheadTextContext | null;
  /** Data for the automatic signature (preview and Assinatura tab). */
  signatureContext?: SignatureContext | null;
}

export function DesignOverlay({
  designStore,
  activeTab,
  onActiveTabChange,
  letterheadContext,
  signatureContext,
}: DesignOverlayProps) {
  const { collapse } = useExpandableScreen();

  const design = useDocumentDesign(designStore);
  const presets = useSavedPresets();

  const ctx: DesignContext = {
    design,
    presets,
    signatureContext: signatureContext ?? undefined,
  };

  // The ExpandableScreen has no native Escape handling; close from here.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") collapse();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [collapse]);

  const previewDesign: PreviewDesignProps = {
    paperColors: design.paperColors,
    fontClass: design.fontClass,
    textureStyle: design.textureStyle,
    paperTexture: design.paperTexture,
    documentHeader: design.documentHeader,
    documentFooter: design.documentFooter,
    documentSignature: design.documentSignature,
    coverImage: design.coverImage,
    coverSettings: design.coverSettings,
  };

  const renderPanel = () => {
    switch (activeTab) {
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
        return (
          <LetterheadLinkPanel design={ctx.design} focusedSection="header" />
        );
      case "footer":
        return (
          <LetterheadLinkPanel design={ctx.design} focusedSection="footer" />
        );
      case "signature":
        return <SignaturePanel {...ctx} />;
    }
  };

  return (
    <div
      className={`h-full flex flex-col overflow-hidden bg-background ${design.fontClass}`}
    >
      <EditorStyles />

      <header className="shrink-0 border-b-2 border-foreground bg-background">
        {/* 5.5rem tall so the ExpandableScreen close button (top-6, h-10) sits centered in it. */}
        <div className="max-w-[1600px] mx-auto h-[5.5rem] flex items-center justify-between gap-6 px-6 pr-20">
          <div>
            <h1 className="font-sans text-2xl font-bold tracking-tight">
              Editar design
            </h1>
            <p className="text-sm text-muted-foreground">
              Papel, fonte, capa, timbre e assinatura. A prévia acompanha cada
              mudança.
            </p>
          </div>
          <span className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Kbd className="border">esc</Kbd> fechar
          </span>
        </div>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-4 py-6 flex flex-col lg:flex-row gap-8 items-start">
          {/* Tabs + panels */}
          <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
            {/* Mobile: horizontal scrollable tab strip */}
            <div className="lg:hidden flex overflow-x-auto gap-1 pb-1 -mx-1 px-1">
              {DESIGN_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onActiveTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-foreground text-background"
                      : "text-foreground/70 hover:text-foreground hover:bg-secondary",
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex gap-8 items-start">
              <div className="hidden lg:block">
                <DesignSidebar
                  activeTab={activeTab}
                  onTabChange={onActiveTabChange}
                />
              </div>

              <div className="flex-1 min-w-0 rounded-lg border border-border bg-card p-6 relative overflow-hidden">
                <div className="relative z-10">{renderPanel()}</div>
              </div>
            </div>
          </div>

          {/* Live preview (below the panels on mobile) */}
          <div className="w-full lg:w-[45%] lg:max-w-[640px] shrink-0">
            <div className="lg:sticky lg:top-4">
              <p className="mb-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Prévia ao vivo
              </p>
              <DocumentPreview
                {...previewDesign}
                grains={design.paperStyle.grains}
                grainSettings={design.paperStyle.grainSettings}
                textContext={letterheadContext}
                signatureContext={signatureContext}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
