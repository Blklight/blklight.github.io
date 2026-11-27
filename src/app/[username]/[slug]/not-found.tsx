"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DocumentNotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("documentKicker")}
      </p>
      <h1 className="text-2xl font-bold">{t("documentTitle")}</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        {t("documentText")}
      </p>
      <Link
        href="/"
        className="mt-2 text-xs font-mono uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:border-accent/60 transition-colors"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
