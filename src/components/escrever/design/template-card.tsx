"use client";

import { Copy, Pencil, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";

interface TemplateCardProps {
  template: DesignTemplate;
  onEdit: () => void;
  onRename: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function CardAction({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="p-1.5 text-foreground/30 hover:text-foreground hover:bg-secondary/50 rounded-xs transition-colors"
    >
      {children}
    </button>
  );
}

export function TemplateCard({
  template,
  onEdit,
  onRename,
  onDuplicate,
  onDelete,
}: TemplateCardProps) {
  return (
    <div className="group flex flex-col border border-foreground/10 rounded-xs overflow-hidden transition-colors hover:border-foreground/30">
      <button type="button" onClick={onEdit} className="text-left">
        <div
          className="h-20 w-full transition-colors"
          style={{ backgroundColor: template.accentColor }}
        />
        <div className="px-3 pt-3 pb-2">
          <p className="text-xs font-mono uppercase tracking-wider truncate text-foreground">
            {template.name}
          </p>
          <p className="text-[10px] font-mono text-foreground/40 mt-1">
            Editado em {formatDate(template.updatedAt)}
          </p>
        </div>
      </button>
      <div className="flex items-center justify-end gap-1 px-2 pb-2 mt-auto">
        <CardAction title="Renomear" onClick={onRename}>
          <Pencil className="w-3.5 h-3.5" />
        </CardAction>
        <CardAction title="Duplicar" onClick={onDuplicate}>
          <Copy className="w-3.5 h-3.5" />
        </CardAction>
        <CardAction title="Excluir" onClick={onDelete}>
          <Trash2 className="w-3.5 h-3.5" />
        </CardAction>
      </div>
    </div>
  );
}
