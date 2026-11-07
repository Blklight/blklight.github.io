"use client";

import {
  ImageIcon,
  Move,
  RulerIcon,
  Settings2,
  SquareIcon,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "./section";
import type { PaperColors } from "./types";

// ── Cover image settings ──
export interface CoverImageSettings {
  position: string;
  borderRadius: number;
  height: number; // px — min 120, max 600
  filter: CoverFilter;
  filterHoverBehavior: "none" | "apply" | "remove";
}

export type CoverFilter = "none" | "grayscale" | "sepia";

export const DEFAULT_COVER_SETTINGS: CoverImageSettings = {
  position: "center",
  borderRadius: 0,
  height: 280,
  filter: "none",
  filterHoverBehavior: "none",
};

// ── Position presets ──
const POSITION_PRESETS: { id: string; label: string; value: string }[] = [
  { id: "top-left", label: "Sup. Esq.", value: "top left" },
  { id: "top", label: "Superior", value: "top center" },
  { id: "top-right", label: "Sup. Dir.", value: "top right" },
  { id: "left", label: "Esquerda", value: "center left" },
  { id: "center", label: "Centro", value: "center" },
  { id: "right", label: "Direita", value: "center right" },
  { id: "bottom-left", label: "Inf. Esq.", value: "bottom left" },
  { id: "bottom", label: "Inferior", value: "bottom center" },
  { id: "bottom-right", label: "Inf. Dir.", value: "bottom right" },
];

// ── Height presets ──
const HEIGHT_PRESETS: { id: string; label: string; value: number }[] = [
  { id: "xs", label: "120", value: 120 },
  { id: "sm", label: "200", value: 200 },
  { id: "md", label: "280", value: 280 },
  { id: "lg", label: "380", value: 380 },
  { id: "xl", label: "480", value: 480 },
  { id: "full", label: "600", value: 600 },
];

// ── Radius presets ──
const RADIUS_PRESETS: { id: string; label: string; value: number }[] = [
  { id: "none", label: "0", value: 0 },
  { id: "sm", label: "4", value: 4 },
  { id: "md", label: "8", value: 8 },
  { id: "lg", label: "12", value: 12 },
  { id: "xl", label: "16", value: 16 },
  { id: "2xl", label: "24", value: 24 },
  { id: "full", label: "999", value: 999 },
];

// ── Filter presets ──
const FILTER_OPTIONS: { id: CoverFilter; label: string }[] = [
  { id: "none", label: "Nenhum" },
  { id: "grayscale", label: "Grayscale" },
  { id: "sepia", label: "Sepia" },
];

// ── Hover behavior ──
const HOVER_BEHAVIORS: {
  id: CoverImageSettings["filterHoverBehavior"];
  label: string;
  description: string;
}[] = [
  { id: "none", label: "Estatico", description: "Filtro fixo" },
  { id: "apply", label: "Aplicar", description: "Ativa no hover" },
  { id: "remove", label: "Remover", description: "Remove no hover" },
];

// ── Helper: get CSS filter value ──
function getCssFilter(filter: CoverFilter): string {
  switch (filter) {
    case "grayscale":
      return "grayscale(100%)";
    case "sepia":
      return "sepia(100%)";
    default:
      return "none";
  }
}

// ── Main component ──
export function CoverImageEditor({
  coverImage,
  onCoverChange,
  onCoverRemove,
  settings,
  onSettingsChange,
  paperColors,
  accordion = false,
}: {
  coverImage: string | null;
  onCoverChange: () => void;
  onCoverRemove: () => void;
  settings: CoverImageSettings;
  onSettingsChange: (settings: CoverImageSettings) => void;
  paperColors: PaperColors | null;
  accordion?: boolean;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Compute current filter based on hover state and behavior
  const computedFilter = (() => {
    if (settings.filter === "none") return "none";
    const filterValue = getCssFilter(settings.filter);

    if (settings.filterHoverBehavior === "apply") {
      return isHoveringImage ? filterValue : "none";
    } else if (settings.filterHoverBehavior === "remove") {
      return isHoveringImage ? "none" : filterValue;
    }
    return filterValue;
  })();

  // Placeholder state — no cover
  if (!coverImage) {
    return (
      <button
        type="button"
        onClick={onCoverChange}
        className="w-full h-24 border-2 border-dashed transition-colors flex items-center justify-center gap-3 group hover:border-muted-foreground"
        style={{
          borderColor: paperColors?.border || undefined,
          color: paperColors?.muted || undefined,
        }}
      >
        <div className="w-8 h-8 border border-current flex items-center justify-center rounded">
          <ImageIcon className="w-4 h-4" />
        </div>
        <span className="font-mono text-xs uppercase tracking-wider">
          Adicionar capa
        </span>
      </button>
    );
  }

  // Section bodies (shared between flat and accordion layouts)
  const positionBody = (
    <div className="grid grid-cols-3 gap-1">
      {POSITION_PRESETS.map((p) => (
        <button
          key={p.id}
          type="button"
          onClick={() => onSettingsChange({ ...settings, position: p.value })}
          className={`px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider border rounded transition-colors ${
            settings.position === p.value
              ? "border-foreground bg-secondary text-foreground"
              : "border-border text-muted-foreground hover:border-muted-foreground"
          }`}
        >
          {p.label}
        </button>
      ))}
    </div>
  );

  const heightBody = (
    <>
      <div className="flex gap-1">
        {HEIGHT_PRESETS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() => onSettingsChange({ ...settings, height: h.value })}
            className={`flex-1 px-1 py-1.5 text-[10px] font-mono border rounded transition-colors ${
              settings.height === h.value
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground"
            }`}
          >
            {h.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={120}
          max={600}
          step={4}
          value={settings.height}
          onChange={(e) =>
            onSettingsChange({
              ...settings,
              height: Number(e.target.value),
            })
          }
          className="flex-1 accent-foreground h-1"
        />
        <span className="text-[10px] font-mono w-12 text-right text-muted-foreground">
          {settings.height}px
        </span>
      </div>
    </>
  );

  const radiusBody = (
    <>
      <div className="flex gap-1">
        {RADIUS_PRESETS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() =>
              onSettingsChange({
                ...settings,
                borderRadius: r.value,
              })
            }
            className={`flex-1 px-1 py-1.5 text-[10px] font-mono border rounded transition-colors ${
              settings.borderRadius === r.value
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={0}
          max={48}
          step={1}
          value={settings.borderRadius > 48 ? 48 : settings.borderRadius}
          onChange={(e) =>
            onSettingsChange({
              ...settings,
              borderRadius: Number(e.target.value),
            })
          }
          className="flex-1 accent-foreground h-1"
        />
        <span className="text-[10px] font-mono w-12 text-right text-muted-foreground">
          {settings.borderRadius}px
        </span>
      </div>
    </>
  );

  const filterBody = (
    <div className="grid grid-cols-3 gap-2">
      {FILTER_OPTIONS.map((f) => (
        <button
          key={`preview-${f.id}`}
          type="button"
          onClick={() =>
            onSettingsChange({
              ...settings,
              filter: f.id,
              filterHoverBehavior:
                f.id === "none" ? "none" : settings.filterHoverBehavior,
            })
          }
          className={`relative aspect-[16/9] overflow-hidden border rounded transition-all ${
            settings.filter === f.id
              ? "border-foreground ring-1 ring-foreground"
              : "border-border hover:border-muted-foreground"
          }`}
        >
          <img
            src={coverImage}
            alt={f.label}
            className="w-full h-full object-cover"
            style={{
              objectPosition: settings.position,
              filter: getCssFilter(f.id),
            }}
          />
          <span className="absolute bottom-0 inset-x-0 bg-background/80 text-[9px] font-mono uppercase tracking-wider py-0.5 text-center">
            {f.label}
          </span>
        </button>
      ))}
    </div>
  );

  const hoverBody = (
    <>
      <div className="flex gap-1">
        {HOVER_BEHAVIORS.map((h) => (
          <button
            key={h.id}
            type="button"
            onClick={() =>
              onSettingsChange({
                ...settings,
                filterHoverBehavior: h.id,
              })
            }
            className={`flex-1 flex flex-col items-center gap-0.5 px-2 py-2 text-[10px] font-mono border rounded transition-colors ${
              settings.filterHoverBehavior === h.id
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground"
            }`}
          >
            <span className="uppercase tracking-wider">{h.label}</span>
            <span className="text-[8px] opacity-60 normal-case tracking-normal">
              {h.description}
            </span>
          </button>
        ))}
      </div>
      <p className="text-[9px] font-mono italic text-muted-foreground">
        {settings.filterHoverBehavior === "apply"
          ? `O filtro ${settings.filter} sera aplicado ao passar o mouse.`
          : settings.filterHoverBehavior === "remove"
            ? `O filtro ${settings.filter} sera removido ao passar o mouse.`
            : "O filtro permanece fixo sem alteracao no hover."}
      </p>
    </>
  );

  return (
    <>
      {/* Cover Image with top-right action buttons */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="relative overflow-hidden border transition-colors duration-300"
          style={{
            borderColor: paperColors?.border || undefined,
            borderRadius: settings.borderRadius,
            height: settings.height,
          }}
          onMouseEnter={() => setIsHoveringImage(true)}
          onMouseLeave={() => setIsHoveringImage(false)}
        >
          <img
            src={coverImage}
            alt="Capa do artigo"
            className="w-full h-full object-cover"
            style={{
              objectPosition: settings.position,
              filter: computedFilter,
              transition: "filter 0.5s ease, object-position 0.3s ease",
            }}
          />
        </div>

        {/* Action buttons — top right, appear on hover */}
        <AnimatePresence>
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-2 right-2 flex items-center gap-1.5 z-10"
            >
              <Button
                variant="outline"
                size="icon"
                onClick={onCoverChange}
                className="h-7 w-7 bg-background/90 backdrop-blur-sm border-border/60 shadow-sm"
                title="Trocar imagem"
              >
                <Upload className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setDialogOpen(true)}
                className="h-7 w-7 bg-background/90 backdrop-blur-sm border-border/60 shadow-sm"
                title="Editar capa"
              >
                <Settings2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onCoverRemove}
                className="h-7 w-7 bg-background/90 backdrop-blur-sm border-border/60 shadow-sm text-destructive hover:text-destructive"
                title="Remover capa"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Editor Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-mono text-sm uppercase tracking-wider">
              Editar capa
            </DialogTitle>
            <DialogDescription className="text-xs">
              Ajuste posicionamento, altura, bordas e filtros da imagem de capa.
            </DialogDescription>
          </DialogHeader>

          {/* Live preview */}
          <div
            className="relative overflow-hidden border transition-all duration-300"
            style={{
              borderColor: "hsl(var(--border))",
              borderRadius: settings.borderRadius,
              height: Math.min(settings.height, 260),
            }}
          >
            <img
              src={coverImage}
              alt="Preview da capa"
              className="w-full h-full object-cover"
              style={{
                objectPosition: settings.position,
                filter:
                  settings.filter !== "none"
                    ? getCssFilter(settings.filter)
                    : "none",
                transition: "filter 0.4s ease, object-position 0.3s ease",
              }}
            />
          </div>

          {accordion ? (
            <div className="flex flex-col gap-3 mt-1">
              <Section
                label="Posicionamento"
                icon={<Move className="w-3.5 h-3.5" />}
                collapsible
              >
                {positionBody}
              </Section>
              <Section
                label="Altura"
                icon={<RulerIcon className="w-3.5 h-3.5" />}
                collapsible
              >
                {heightBody}
              </Section>
              <Section
                label="Bordas arredondadas"
                icon={<SquareIcon className="w-3.5 h-3.5" />}
                collapsible
              >
                {radiusBody}
              </Section>
              <Section
                label="Filtros"
                icon={<ImageIcon className="w-3.5 h-3.5" />}
                collapsible
              >
                {filterBody}
              </Section>
              {settings.filter !== "none" && (
                <Section label="Comportamento no hover" collapsible>
                  {hoverBody}
                </Section>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5 mt-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Move className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Posicionamento
                  </span>
                </div>
                {positionBody}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <RulerIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Altura
                  </span>
                </div>
                {heightBody}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <SquareIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Bordas arredondadas
                  </span>
                </div>
                {radiusBody}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Filtros
                  </span>
                </div>
                {filterBody}
              </div>

              {settings.filter !== "none" && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                    Comportamento no hover
                  </span>
                  {hoverBody}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
