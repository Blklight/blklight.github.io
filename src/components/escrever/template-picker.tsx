"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useState } from "react";
import type { StoreApi, UseBoundStore } from "zustand";
import { useDocumentDesign } from "@/components/document/use-document-design";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  applyTemplateToDocument,
  designFieldsFingerprint,
  isDesignCustomized,
} from "@/lib/apply-design-template";
import type { DocumentDesignStore } from "@/store/create-document-design-store";
import type { DesignTemplate } from "@/store/useDesignTemplatesStore";
import { useDesignTemplatesStore } from "@/store/useDesignTemplatesStore";
import { TemplatePickerItem } from "./template-picker-item";

interface TemplatePickerProps {
  designStore: UseBoundStore<StoreApi<DocumentDesignStore>>;
  onClose: () => void;
}

export function TemplatePicker({ designStore, onClose }: TemplatePickerProps) {
  const templates = useDesignTemplatesStore((s) => s.templates);
  const design = useDocumentDesign(designStore);
  const [pendingTemplate, setPendingTemplate] = useState<DesignTemplate | null>(
    null,
  );

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => setPendingTemplate(null);
  }, []);

  const sorted = useMemo(
    () => [...templates].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [templates],
  );

  const currentFingerprint = designFieldsFingerprint(design);

  const isApplied = (template: DesignTemplate) =>
    currentFingerprint === designFieldsFingerprint(template.snapshot);

  const apply = (template: DesignTemplate) => {
    applyTemplateToDocument(designStore, template);
    setPendingTemplate(null);
    onClose();
  };

  const handleSelect = (template: DesignTemplate) => {
    if (isApplied(template)) return;
    if (isDesignCustomized(designStore)) {
      setPendingTemplate(template);
      return;
    }
    apply(template);
  };

  return (
    <div className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>Escolher tema</SheetTitle>
        <SheetDescription>
          Aplicar um template de design ao documento atual. Sua capa nunca é
          sobrescrita.
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {sorted.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <p className="text-sm font-mono uppercase tracking-wider text-foreground/40">
              Nenhum template ainda
            </p>
            <Link
              href="/design"
              onClick={onClose}
              className="text-xs font-mono uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors underline underline-offset-2"
            >
              Criar primeiro template
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {sorted.map((template) => (
              <TemplatePickerItem
                key={template.id}
                template={template}
                isApplied={isApplied(template)}
                onApply={() => handleSelect(template)}
              />
            ))}
          </div>
        )}
      </div>

      <SheetFooter>
        <Link
          href="/design"
          onClick={onClose}
          className="text-[10px] font-mono uppercase tracking-wider text-foreground/40 hover:text-foreground transition-colors"
        >
          Gerenciar templates
        </Link>
      </SheetFooter>

      <AlertDialog
        open={pendingTemplate !== null}
        onOpenChange={(open) => {
          if (!open) setPendingTemplate(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aplicar tema</AlertDialogTitle>
            <AlertDialogDescription>
              Aplicar &quot;{pendingTemplate?.name}&quot;? O design atual do
              documento será substituído. Sua capa atual será preservada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPendingTemplate(null)}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (pendingTemplate) apply(pendingTemplate);
              }}
            >
              Aplicar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
