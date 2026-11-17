"use client";

type SliderFieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
};

export function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 48,
  step = 1,
  unit = "px",
}: SliderFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-foreground/60">
          {label}
        </span>
        <span className="text-xs font-mono text-foreground/60">
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-foreground h-1"
      />
    </div>
  );
}
