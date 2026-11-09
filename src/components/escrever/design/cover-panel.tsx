"use client";

import { Image, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import {
  CoverImageEditor,
  DEFAULT_COVER_SETTINGS,
} from "@/components/document/cover-image-editor";
import { CoverUrlDialog } from "@/components/document/cover-url-dialog";
import type { DesignContext } from "./layout";

const DEFAULT_COVER_OPTIONS = [
  {
    id: "gradient-dark",
    name: "Gradiente Escuro",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231a1a2e'/%3E%3Cstop offset='100%25' stop-color='%234a4a6e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='200' fill='url(%23g)'/%3E%3C/svg%3E",
  },
  {
    id: "gradient-aurora",
    name: "Aurora",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='0%25'%3E%3Cstop offset='0%25' stop-color='%230077B6'/%3E%3Cstop offset='100%25' stop-color='%2300B4D8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='200' fill='url(%23g)'/%3E%3C/svg%3E",
  },
  {
    id: "gradient-warm",
    name: "Tom Quente",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23FF6B35'/%3E%3Cstop offset='100%25' stop-color='%23F7C948'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='200' fill='url(%23g)'/%3E%3C/svg%3E",
  },
  {
    id: "solid-dark",
    name: "Fundo Escuro",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Crect width='800' height='200' fill='%231A1A1A'/%3E%3C/svg%3E",
  },
  {
    id: "solid-light",
    name: "Fundo Claro",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Crect width='800' height='200' fill='%23F5F5F5'/%3E%3C/svg%3E",
  },
  {
    id: "texture-dots",
    name: "Pontilhado",
    url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='200'%3E%3Cdefs%3E%3Cpattern id='dots' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='%23ffffff' opacity='0.15'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='800' height='200' fill='%23222222'/%3E%3Crect width='800' height='200' fill='url(%23dots)'/%3E%3C/svg%3E",
  },
];

export function CoverPanel({ design }: DesignContext) {
  const {
    coverImage,
    setCoverImage,
    coverSettings,
    setCoverSettings,
    paperColors,
  } = design;

  const [showUrlInput, setShowUrlInput] = useState(false);
  const [showSelector, setShowSelector] = useState(!coverImage);

  const handleCoverUpload = useCallback(() => {
    setShowUrlInput(true);
  }, []);

  const handleCoverSubmit = useCallback(
    (url: string) => {
      setCoverImage(url);
      setShowSelector(false);
    },
    [setCoverImage],
  );

  const handleCoverRemove = useCallback(() => {
    setCoverImage(null);
    setCoverSettings({ ...DEFAULT_COVER_SETTINGS });
    setShowSelector(true);
  }, [setCoverImage, setCoverSettings]);

  const handleSelectDefault = useCallback(
    (url: string) => {
      setCoverImage(url);
      setShowSelector(false);
    },
    [setCoverImage],
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Image className="w-4 h-4 text-foreground/40" />
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
          Imagem de Capa
        </span>
      </div>

      <p className="text-[10px] font-mono text-foreground/30 leading-relaxed">
        Adicione uma imagem de capa ao documento. Escolha entre imagens padrao
        ou insira uma URL personalizada.
      </p>

      {/* Cover selector (shown when no cover) */}
      {showSelector && !coverImage && (
        <div className="flex flex-col gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
            Escolha uma capa
          </span>
          <div className="grid grid-cols-3 gap-2">
            {DEFAULT_COVER_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectDefault(option.url)}
                className="flex flex-col gap-1.5 border border-border rounded-xs overflow-hidden hover:border-muted-foreground transition-colors group"
              >
                {/* biome-ignore lint/performance/noImgElement: arbitrary external URL (user cover/avatar or demo asset); next/image would need remotePatterns for every host */}
                <img
                  src={option.url}
                  alt={option.name}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/50 px-2 pb-2">
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowUrlInput(true)}
            className="flex items-center justify-center gap-1.5 px-3 py-2 border border-dashed border-border rounded-xs text-[10px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground hover:border-muted-foreground transition-colors"
          >
            <Plus className="w-3 h-3" />
            URL personalizada
          </button>
        </div>
      )}

      {/* Active cover */}
      {coverImage && !showSelector && (
        <div className="flex flex-col gap-2">
          <CoverImageEditor
            coverImage={coverImage}
            onCoverChange={handleCoverUpload}
            onCoverRemove={handleCoverRemove}
            settings={coverSettings}
            onSettingsChange={setCoverSettings}
            paperColors={paperColors}
            accordion
          />
          <button
            type="button"
            onClick={() => setShowSelector(true)}
            className="self-start px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors"
          >
            Trocar imagem padrao
          </button>
        </div>
      )}

      <CoverUrlDialog
        isOpen={showUrlInput}
        onClose={() => setShowUrlInput(false)}
        onSubmit={handleCoverSubmit}
      />
    </div>
  );
}
