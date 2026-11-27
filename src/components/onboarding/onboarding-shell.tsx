import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { Step } from "@/app/onboarding/page";
import { cn } from "@/lib/utils";

const STEPS: { id: Step }[] = [
  { id: "welcome" },
  { id: "apps" },
  { id: "done" },
];

interface Props {
  step: Step;
  onStepClick?: (step: Step) => void;
  children: ReactNode;
}

export const OnboardingShell = ({ step, onStepClick, children }: Props) => {
  const t = useTranslations("onboarding");
  const idx = STEPS.findIndex((s) => s.id === step);
  const total = STEPS.length;

  return (
    <div className="relative z-10 text-foreground flex flex-col min-h-[calc(100dvh-1.125rem)]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-foreground focus:text-background focus:px-3 focus:py-2 focus:text-xs focus:rounded-xs"
      >
        {t("skipToContent")}
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
          {t("stepOf", { current: idx + 1, total })}
          <span className="hidden sm:inline">
            {" "}
            · {t(`steps.${STEPS[idx].id}`)}
          </span>
        </p>
      </header>

      <nav aria-label={t("stepsLabel")} className="mx-6 md:mx-10">
        <ol
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {STEPS.map((s, i) => {
            const bar = (
              <span
                className={cn(
                  "block h-1 rounded-full transition-colors duration-500",
                  i <= idx
                    ? "bg-blklight-500 dark:bg-blklight-400"
                    : "bg-border",
                )}
              />
            );
            return (
              <li key={s.id} aria-current={i === idx ? "step" : undefined}>
                {i < idx && onStepClick ? (
                  <button
                    type="button"
                    onClick={() => onStepClick(s.id)}
                    aria-label={t("backTo", { step: t(`steps.${s.id}`) })}
                    className="block w-full py-1.5 cursor-pointer rounded-xs outline-none hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  >
                    {bar}
                  </button>
                ) : (
                  <span className="block py-1.5">
                    {bar}
                    <span className="sr-only">{t(`steps.${s.id}`)}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <main id="main" className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};
