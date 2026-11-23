"use client";

import { ImageUp } from "lucide-react";
import { useRef, useState } from "react";
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
import { IMAGE_ACCEPT, uploadWithToast } from "@/features/uploads/api";

interface CoverUrlDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  initialUrl?: string;
}

export function CoverUrlDialog({
  isOpen,
  onClose,
  onSubmit,
  initialUrl = "",
}: CoverUrlDialogProps) {
  const [url, setUrl] = useState(initialUrl);
  const fileInput = useRef<HTMLInputElement>(null);

  // Covers are stored whole (no crop): the article and every card crop it with CSS.
  const handleFile = async (file: File) => {
    onClose();
    const uploaded = await uploadWithToast(file, "editor", {
      loading: "Enviando capa…",
      success: "Capa enviada",
    });
    if (uploaded) onSubmit(uploaded.url);
  };

  const handleSubmit = () => {
    if (url.trim()) {
      onSubmit(url.trim());
    }
    setUrl("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar imagem de capa</DialogTitle>
          <DialogDescription>
            Envie um arquivo (otimizado automaticamente) ou cole a URL de uma
            imagem para usar como capa do documento.
          </DialogDescription>
        </DialogHeader>
        <input
          ref={fileInput}
          type="file"
          accept={IMAGE_ACCEPT}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (file) void handleFile(file);
          }}
        />
        <Button variant="outline" onClick={() => fileInput.current?.click()}>
          <ImageUp className="size-4" />
          Enviar arquivo
        </Button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          ou
          <span className="h-px flex-1 bg-border" />
        </div>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
          aria-label="URL da capa"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim()}>
            Adicionar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
