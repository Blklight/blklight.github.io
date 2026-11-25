import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DossierSheet({
  labelledBy,
  accent,
  className,
  children,
}: {
  labelledBy: string;
  accent?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={labelledBy}
      className={cn(
        "relative h-full overflow-hidden bg-card text-card-foreground shadow-md",
        className,
      )}
    >
      {accent && (
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5"
          style={{ background: accent }}
        />
      )}
      {children}
    </section>
  );
}
