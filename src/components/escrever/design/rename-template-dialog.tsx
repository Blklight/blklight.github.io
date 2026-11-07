"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface RenameTemplateDialogProps {
  isOpen: boolean;
  initialName: string;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export function RenameTemplateDialog({
  isOpen,
  initialName,
  onClose,
  onConfirm,
}: RenameTemplateDialogProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (isOpen) setName(initialName);
  }, [isOpen, initialName]);

  const handleConfirm = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Renomear template</DialogTitle>
          <DialogDescription>
            Dê um nome claro para identificar este template.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleConfirm();
          }}
          autoFocus
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm} disabled={!name.trim()}>
            Renomear
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
