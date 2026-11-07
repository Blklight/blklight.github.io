"use client";

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

interface DeleteTemplateDialogProps {
  isOpen: boolean;
  templateName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTemplateDialog({
  isOpen,
  templateName,
  onClose,
  onConfirm,
}: DeleteTemplateDialogProps) {
  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir template</AlertDialogTitle>
          <AlertDialogDescription>
            Excluir &quot;{templateName}&quot;? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
