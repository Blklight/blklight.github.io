import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Step } from "@/app/onboarding/page";

const STEPS: { id: Step; label: string }[] = [
  { id: "welcome", label: "Boas-vindas" },
  { id: "apps", label: "Escolher apps" },
  { id: "done", label: "Pronto" },
];

interface Props {
  step: Step;
  children: ReactNode;
}

export const OnboardingShell = ({ step, children }: Props) => {
  const idx = STEPS.findIndex((s) => s.id === step);
  const total = STEPS.length;

  return (
    <div className="relative z-10 text-foreground flex flex-col min-h-[calc(100dvh-1.125rem)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-foreground focus:text-background focus:px-3 focus:py-2 focus:text-xs focus:rounded-xs"
      >
        Pular para o conteúdo
      </a>

      <header className="px-6 md:px-10 pt-6 pb-5 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
        >
          <Image
            src="/blklight-black.svg"
            alt=""
            width={22}
            height={22}
            className="dark:invert"
          />
          <span className="font-sans text-lg font-bold tracking-tight">
            Blklight
          </span>
        </Link>
        <p className="text-xs text-muted-foreground">
          Etapa {idx + 1} de {total}
          <span className="hidden sm:inline"> · {STEPS[idx].label}</span>
        </p>
      </header>

      <div
        className="mx-6 md:mx-10 grid gap-1.5"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        role="progressbar"
        aria-label="Progresso do onboarding"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={idx + 1}
      >
        {STEPS.map((s, i) => (
          <div
            key={s.id}
            className={`h-1 rounded-full transition-colors duration-500 ${
              i <= idx ? "bg-blklight-500 dark:bg-blklight-400" : "bg-border"
            }`}
          />
        ))}
      </div>

      <main id="main" className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
