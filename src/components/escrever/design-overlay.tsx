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

      <header className="shrink-0 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 py-3 pr-16">
          <h1 className="text-sm font-semibold uppercase tracking-widest">
            Editar design
          </h1>
          <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40">
            Esc para fechar
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
                    "flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors",
                    activeTab === tab.id
                      ? "bg-secondary text-foreground border border-foreground/20"
                      : "text-foreground/50 hover:text-foreground border border-transparent",
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

              <div
                className="flex-1 min-w-0 border border-foreground/10 p-6 relative overflow-hidden rounded-xs"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(0,0,0,0.015) 14px, rgba(0,0,0,0.015) 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,0,0,0.015) 14px, rgba(0,0,0,0.015) 15px)",
                }}
              >
                <div className="relative z-10">{renderPanel()}</div>
              </div>
            </div>
          </div>

          {/* Live preview (below the panels on mobile) */}
          <div className="w-full lg:w-[45%] lg:max-w-[640px] shrink-0">
            <div className="lg:sticky lg:top-4">
              <div className="text-[10px] font-mono uppercase tracking-wider text-foreground/40 mb-2">
                Prévia ao vivo
              </div>
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
