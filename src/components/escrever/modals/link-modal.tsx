"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function LinkModal({
  isOpen,
  onClose,
  onSubmit,
  initialUrl = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: backdrop decorativo, fechar por teclado fica no modal */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-card border border-border p-6 w-full max-w-md z-10"
      >
        <h3 className="font-medium text-foreground mb-4">Adicionar Link</h3>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://exemplo.com"
          className="w-full px-4 py-3 bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors text-sm font-mono"
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-wider"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={() => {
              onSubmit(url);
              onClose();
            }}
            className="font-mono text-xs uppercase tracking-wider"
          >
            Adicionar
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
