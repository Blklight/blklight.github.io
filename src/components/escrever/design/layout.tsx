"use client";

import { ArrowLeft, Eye, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { EditorStyles } from "@/components/document/editor-styles";
import type { PreviewDesignProps } from "@/components/document/preview";
import { useDocumentDesign } from "@/components/document/use-document-design";
import { useSavedPresets } from "@/components/document/use-saved-presets";
import { Button } from "@/components/ui/button";
import type { SignatureContext } from "@/features/documents/design/signature";
import type { DocumentDesignStore } from "@/store/create-document-design-store";
import { useCurrentAuthorContext } from "../use-current-author-context";
import { ColorsPanel } from "./colors-panel";
import { CoverPanel } from "./cover-panel";
import { FontPanel } from "./font-panel";
import { FullDocumentDialog } from "./full-document-dialog";
import { GrainPanel } from "./grain-panel";
import { LetterheadLinkPanel } from "./letterhead-link-panel";
import { RenameTemplateDialog } from "./rename-template-dialog";
import { DesignSidebar, type DesignTab } from "./sidebar";
import { SignaturePanel } from "./signature-panel";
import { TexturePanel } from "./texture-panel";

export interface DesignContext {
  design: ReturnType<typeof useDocumentDesign>;
  presets: ReturnType<typeof useSavedPresets>;
  /** Author/document data for the automatic signature (Assinatura tab). */
  signatureContext?: SignatureContext;
}

interface DesignLayoutProps {
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>;
  templateName: string;
  onBack: () => void;
  onRename: (name: string) => void;
  onSave: () => void;
}

export function DesignLayout({
  designStore,
  templateName,
  onBack,
  onRename,
  onSave,
}: DesignLayoutProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<DesignTab>("colors");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setIsPreviewOpen(false);
      setIsRenameOpen(false);
    };
  }, []);

  const design = useDocumentDesign(designStore);
  const presets = useSavedPresets();

  // /design edits a template (no document): author only, today's date.
  const currentAuthor = useCurrentAuthorContext();
  const ctx: DesignContext = {
    design,
    presets,
    signatureContext: { author: currentAuthor },
  };

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
    <div className={`min-h-screen bg-background ${design.fontClass}`}>
      <EditorStyles />

      <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Galeria
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-sm font-semibold uppercase tracking-widest truncate">
              {templateName}
            </h1>
            <button
              type="button"
              title="Renomear template"
              onClick={() => setIsRenameOpen(true)}
              className="p-1 text-foreground/40 hover:text-foreground transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" onClick={onSave}>
              Salvar
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onSave();
                router.push("/escrever");
              }}
            >
              Salvar e Ir para o Editor
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-8 items-start">
        <DesignSidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div
            className="border border-foreground/10 p-6 relative overflow-hidden rounded-xs"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(0,0,0,0.015) 14px, rgba(0,0,0,0.015) 15px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,0,0,0.015) 14px, rgba(0,0,0,0.015) 15px)",
            }}
          >
            <div className="relative z-10">{renderPanel()}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-foreground/40" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
                Documento completo
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors underline underline-offset-2"
            >
              Ver preview
            </button>
          </div>

          <FullDocumentDialog
            isOpen={isPreviewOpen}
            onClose={() => setIsPreviewOpen(false)}
            design={previewDesign}
          />
        </div>
      </div>

      <RenameTemplateDialog
        isOpen={isRenameOpen}
        initialName={templateName}
        onClose={() => setIsRenameOpen(false)}
        onConfirm={(name) => {
          onRename(name);
          setIsRenameOpen(false);
        }}
      />
    </div>
  );
}
