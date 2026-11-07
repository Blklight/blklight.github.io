"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export function JsonPreviewModal({
  isOpen,
  onClose,
  data,
  action,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: object | null;
  action: "save" | "publish";
}) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-card border border-border w-full max-w-3xl max-h-[80vh] z-10 flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div
              className={`w-2 h-2 rounded-full ${action === "publish" ? "bg-green-500" : "bg-accent"}`}
            />
            <h3 className="font-mono text-sm uppercase tracking-wider">
              {action === "publish"
                ? "Preview de Publicacao"
                : "Preview de Salvamento"}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-secondary/50 border border-border rounded p-4">
            <pre className="text-xs font-mono text-foreground whitespace-pre-wrap overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
            Este JSON seria enviado para o banco de dados
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(data, null, 2));
              }}
              className="font-mono text-xs uppercase tracking-wider"
            >
              Copiar JSON
            </Button>
            <Button
              size="sm"
              onClick={onClose}
              className="font-mono text-xs uppercase tracking-wider"
            >
              Fechar
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
