"use client";

import { useState } from "react";

type SectionProps = {
  label: string;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
};

export function Section({
  label,
  children,
  collapsible = false,
  defaultOpen = false,
  icon,
}: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div className="flex flex-col gap-2 p-3 border border-border rounded-xs bg-secondary/10">
        <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/30">
          {label}
        </span>
        {children}
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xs">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-secondary/30 transition-colors"
      >
        {icon}
        <span className="text-xs font-medium flex-1">{label}</span>
        <span
          className={`text-muted-foreground text-[10px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          {"▾"}
        </span>
      </button>
      {open && (
        <div className="px-3 pb-3 flex flex-col gap-3 border-t border-border pt-3">
          {children}
        </div>
      )}
    </div>
  );
}
