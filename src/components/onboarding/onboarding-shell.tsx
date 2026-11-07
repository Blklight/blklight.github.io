import type { ReactNode } from "react";
import type { Step } from "@/app/onboarding/page";

const STEPS: { id: Step; label: string }[] = [
  { id: "welcome", label: "BOAS-VINDAS" },
  { id: "apps", label: "ESCOLHER APPS" },
  { id: "done", label: "PRONTO" },
];

interface Props {
  step: Step;
  children: ReactNode;
}

export const OnboardingShell = ({ step, children }: Props) => {
  const idx = STEPS.findIndex((s) => s.id === step);
  const total = STEPS.length;

  return (
    <div className="text-foreground flex flex-col">
      {/* skip link p/ acessibilidade */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-ink focus:text-background focus:px-3 focus:py-2 focus:text-xs focus:uppercase focus:tracking-widest"
      >
        pular para o conteúdo
      </a>

      {/* progress bar */}
      <div className="h-1 w-full bg-surface" aria-hidden="true">
        <div
          className="h-full bg-ink transition-all duration-500 ease-out"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>

      {/* header */}
      <header className="px-6 md:px-10 py-6 flex items-center justify-between gap-4 border-b hairline">
        <div className="text-xs md:text-sm tracking-tight">
          <span className="font-bold">BLKLIGHT</span>
        </div>
        <div className="text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground">
          [ {String(idx + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")} ]
          <span className="hidden md:inline"> · {STEPS[idx].label}</span>
        </div>
      </header>

      {/* main */}
      <main id="main" className="flex-1 flex flex-col">
        {children}
      </main>

      {/* footer */}
      {/* <footer className="px-6 md:px-10 py-4 border-t hairline text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground flex justify-between">
        <span>{"> conceito demonstrativo"}</span>
        <span>v0.1 — paper &amp; ink</span>
      </footer> */}
    </div>
  );
};
