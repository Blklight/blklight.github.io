"use client";

import {
  Bold,
  CaseSensitive,
  ChevronDown,
  ChevronUp,
  Italic,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { LineFormat } from "@/components/document/types";
import { SliderField } from "./slider-field";

const SIZE_OPTIONS: { id: LineFormat["size"]; label: string }[] = [
  { id: "xs", label: "XS" },
  { id: "sm", label: "SM" },
  { id: "base", label: "MD" },
  { id: "lg", label: "LG" },
  { id: "xl", label: "XL" },
];

const SPACING_OPTIONS: { id: LineFormat["letterSpacing"] }[] = [
  { id: "normal" },
  { id: "wide" },
  { id: "wider" },
  { id: "widest" },
];

export function LineFormatEditor({
  format,
  onChange,
}: {
  format: LineFormat;
  onChange: (f: LineFormat) => void;
}) {
  const tl = useTranslations("letterhead");
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange({ ...format, bold: !format.bold })}
          className={`p-1.5 border rounded-xs transition-colors ${
            format.bold
              ? "border-foreground bg-secondary text-foreground"
              : "border-border text-muted-foreground hover:border-muted-foreground"
          }`}
          title={tl("bold")}
        >
          <Bold className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...format, italic: !format.italic })}
          className={`p-1.5 border rounded-xs transition-colors ${
            format.italic
              ? "border-foreground bg-secondary text-foreground"
              : "border-border text-muted-foreground hover:border-muted-foreground"
          }`}
          title={tl("italic")}
        >
          <Italic className="w-3 h-3" />
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...format, uppercase: !format.uppercase })}
          className={`p-1.5 border rounded-xs transition-colors ${
            format.uppercase
              ? "border-foreground bg-secondary text-foreground"
              : "border-border text-muted-foreground hover:border-muted-foreground"
          }`}
          title={tl("uppercase")}
        >
          <CaseSensitive className="w-3 h-3" />
        </button>
        {SIZE_OPTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange({ ...format, size: s.id })}
            className={`px-1.5 py-1 text-xs font-mono border rounded-xs transition-colors ${
              format.size === s.id
                ? "border-foreground bg-secondary text-foreground"
                : "border-border text-muted-foreground hover:border-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 border border-border text-muted-foreground hover:border-muted-foreground rounded-xs transition-colors ml-auto"
          title={tl("moreOptions")}
        >
          {expanded ? (
            <ChevronUp className="w-3 h-3" />
          ) : (
            <ChevronDown className="w-3 h-3" />
          )}
        </button>
      </div>
      {expanded && (
        <div className="flex flex-col gap-2 pl-1 pt-1">
          <SliderField
            label={tl("opacity")}
            value={format.opacity}
            min={10}
            max={100}
            unit="%"
            onChange={(v) => onChange({ ...format, opacity: v })}
          />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {tl("spacing")}
            </span>
            <div className="flex gap-1">
              {SPACING_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onChange({ ...format, letterSpacing: s.id })}
                  className={`flex-1 px-1 py-1 text-xs font-mono border rounded-xs transition-colors ${
                    format.letterSpacing === s.id
                      ? "border-foreground bg-secondary text-foreground"
                      : "border-border text-muted-foreground hover:border-muted-foreground"
                  }`}
                >
                  {tl(`letterSpacing.${s.id}`)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
