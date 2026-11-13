"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";
import { DeleteTemplateDialog } from "./delete-template-dialog";
import { RenameTemplateDialog } from "./rename-template-dialog";
import { TemplateCard } from "./template-card";

interface DesignGalleryProps {
  templates: DesignTemplate[];
  onCreate: () => void;
  onEdit: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

export function DesignGallery({
  templates,
  onCreate,
  onEdit,
  onRename,
  onDuplicate,
  onDelete,
}: DesignGalleryProps) {
  const router = useRouter();
  const [renameTarget, setRenameTarget] = useState<DesignTemplate | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DesignTemplate | null>(null);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setRenameTarget(null);
      setDeleteTarget(null);
    };
  }, []);

  const sorted = useMemo(
    () => [...templates].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [templates],
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => router.push("/escrever")}
            className="flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
          <h1 className="text-sm font-semibold uppercase tracking-widest">
            Galeria de Templates
          </h1>
          <Button size="sm" onClick={onCreate}>
            <Plus className="w-4 h-4" />
            Novo template
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
            <p className="text-sm font-mono uppercase tracking-wider text-foreground/40">
              Nenhum template ainda
            </p>
            <Button size="sm" onClick={onCreate}>
              <Plus className="w-4 h-4" />
              Criar primeiro template
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sorted.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onEdit={() => onEdit(template.id)}
                onRename={() => setRenameTarget(template)}
                onDuplicate={() => onDuplicate(template.id)}
                onDelete={() => setDeleteTarget(template)}
              />
            ))}
          </div>
        )}
      </main>

      <RenameTemplateDialog
        isOpen={renameTarget !== null}
        initialName={renameTarget?.name ?? ""}
        onClose={() => setRenameTarget(null)}
        onConfirm={(name) => {
          if (renameTarget) onRename(renameTarget.id, name);
        }}
      />
      <DeleteTemplateDialog
        isOpen={deleteTarget !== null}
        templateName={deleteTarget?.name ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            onDelete(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
      />
    </div>
  );
}
