"use client";

import { Check, Wand2 } from "lucide-react";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";

interface TemplatePickerItemProps {
  template: DesignTemplate;
  isApplied: boolean;
  onApply: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function TemplatePickerItem({
  template,
  isApplied,
  onApply,
}: TemplatePickerItemProps) {
  return (
    <div className="group flex flex-col border border-foreground/10 rounded-xs overflow-hidden transition-colors hover:border-foreground/30">
      <button
        type="button"
        onClick={onApply}
        disabled={isApplied}
        className="text-left disabled:cursor-default"
      >
        <div
          className="h-20 w-full relative"
          style={{ backgroundColor: template.accentColor }}
        >
          {isApplied && (
            <span className="absolute top-2 right-2 flex items-center gap-1 bg-background/90 text-foreground px-1.5 py-0.5 rounded-xs font-mono text-[9px] uppercase tracking-wider">
              <Check className="w-3 h-3 text-accent" />
              Aplicado
            </span>
          )}
        </div>
        <div className="px-3 pt-3 pb-2">
          <p className="text-xs font-mono uppercase tracking-wider truncate text-foreground">
            {template.name}
          </p>
          <p className="text-[10px] font-mono text-foreground/40 mt-1">
            Editado em {formatDate(template.updatedAt)}
          </p>
        </div>
      </button>
      <div className="flex items-center justify-end px-2 pb-2 mt-auto">
        <button
          type="button"
          onClick={onApply}
          disabled={isApplied}
          className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors disabled:opacity-40 disabled:hover:text-foreground/60 disabled:cursor-default"
        >
          <Wand2 className="w-3 h-3" />
          {isApplied ? "Tema ativo" : "Aplicar"}
        </button>
      </div>
    </div>
  );
}
