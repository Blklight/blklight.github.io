"use client";

import { Check, FileJson, Save } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export interface FloatingActionBarProps {
  lastSaved: Date | null;
  isSaving: boolean;
  onSave: () => void;
  publishTrigger: ReactNode;
  onPreview: () => void;
}

export function FloatingActionBar({
  lastSaved,
  isSaving,
  onSave,
  publishTrigger,
  onPreview,
}: FloatingActionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 shadow-lg p-2 bg-background"
      style={{
        border: "1px solid hsl(var(--border))",
      }}
    >
      {lastSaved && (
        <span className="text-[10px] font-mono text-muted-foreground hidden md:flex items-center gap-1 px-2">
          <Check className="w-3 h-3 text-accent" />
          {lastSaved.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSave}
        disabled={isSaving}
        data-testid="save-button"
        className="font-mono text-xs uppercase tracking-wider"
      >
        {isSaving ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent animate-spin" />
        ) : (
          <Save className="w-4 h-4" />
        )}
        <span className="ml-2">Salvar</span>
      </Button>
      <div className="w-px h-6 bg-border" />
      <Button
        variant="ghost"
        size="sm"
        onClick={onPreview}
        disabled={isSaving}
        className="font-mono text-xs uppercase tracking-wider"
        title="Visualizar payload JSON"
      >
        <FileJson className="w-4 h-4" />
        <span className="ml-2">Preview</span>
      </Button>
      {publishTrigger}
    </motion.div>
  );
}
