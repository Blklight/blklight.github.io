"use client";

import { Check, ChevronDown, Type } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useLayoutEffect, useState } from "react";
import { FONT_OPTIONS } from "@/components/document/constants";

// Toolbar Button Component
export function ToolbarButton({
  onClick,
  isActive = false,
  disabled = false,
  children,
  title,
}: {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
        isActive
          ? "bg-foreground text-background"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

// Divider
export function ToolbarDivider() {
  return <div className="w-px h-6 bg-border mx-1" />;
}

// Typography Selector - Combobox style with close dropdown
export function TypographySelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // Activity (cacheComponents) hides the page instead of unmounting it: close on hide.
  useLayoutEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const currentFont =
    FONT_OPTIONS.find((f) => f.id === value) || FONT_OPTIONS[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-8 px-2 rounded-xs text-xs transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        <Type className="w-3.5 h-3.5" />
        <span className={`text-sm ${currentFont.family}`}>
          {currentFont.name}
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              aria-hidden="true"
              className="fixed inset-0 z-100"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full left-0 mt-1 bg-card border border-border z-[101] min-w-[180px] shadow-lg rounded"
            >
              {FONT_OPTIONS.map((font) => (
                <button
                  key={font.id}
                  type="button"
                  onClick={() => {
                    onChange(font.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left text-foreground hover:bg-secondary transition-colors first:rounded-t last:rounded-b ${
                    value === font.id ? "bg-secondary font-medium" : ""
                  }`}
                >
                  <span className={`text-base ${font.family}`}>
                    {font.name}
                  </span>
                  {value === font.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
