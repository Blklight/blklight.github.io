"use client";

import { ImageUp } from "lucide-react";
import { useTranslations } from "next-intl";
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
import {
  IMAGE_ACCEPT,
  uploadWithToast,
  useUploadToast,
} from "@/features/uploads/api";

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
  const t = useTranslations("cover");
  const tc = useTranslations("common");
  const [url, setUrl] = useState(initialUrl);
  const fileInput = useRef<HTMLInputElement>(null);
  const uploadToast = useUploadToast("cover");

  // Covers are stored whole (no crop): the article and every card crop it with CSS.
  const handleFile = async (file: File) => {
    onClose();
    const uploaded = await uploadWithToast(file, "editor", uploadToast);
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
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
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
          {tc("uploadFile")}
        </Button>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="h-px flex-1 bg-border" />
          {tc("or")}
          <span className="h-px flex-1 bg-border" />
        </div>
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={t("urlPlaceholder")}
          aria-label={t("urlLabel")}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {tc("cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={!url.trim()}>
            {t("add")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
