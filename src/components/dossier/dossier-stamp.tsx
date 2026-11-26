import type { Stamp } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

const TONE: Record<Stamp["tone"], string> = {
  ok: "text-emerald-700 dark:text-emerald-400",
  warn: "text-amber-700 dark:text-amber-400",
  danger: "text-red-700 dark:text-red-400",
  neutral: "text-foreground/70",
};

export function DossierStamp({
  stamp,
  rotate = -6,
  className,
}: {
  stamp: Stamp;
  rotate?: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-current px-2 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] opacity-80",
        TONE[stamp.tone],
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {stamp.label}
    </span>
  );
}
