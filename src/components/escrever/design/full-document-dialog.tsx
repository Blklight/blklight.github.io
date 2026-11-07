"use client";

import {
  DocumentPreview,
  type PreviewDesignProps,
} from "@/components/document/preview";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FullDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  design: PreviewDesignProps;
}

export function FullDocumentDialog({
  isOpen,
  onClose,
  design,
}: FullDocumentDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl my-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <DocumentPreview {...design} />
      </DialogContent>
    </Dialog>
  );
}
