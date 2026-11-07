"use client";

type ColorFieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function ColorField({ label, value, onChange }: ColorFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/40">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 border border-border rounded-xs cursor-pointer shrink-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-2 py-1 text-[10px] font-mono bg-secondary border border-border rounded-xs"
        />
      </div>
    </div>
  );
}
