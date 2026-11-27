"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ProfileNotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t("profileKicker")}
      </p>
      <h1 className="text-2xl font-bold">{t("profileTitle")}</h1>
      <p className="text-sm text-muted-foreground max-w-md">
        {t("profileText")}
      </p>
      <Link
        href="/feed"
        className="mt-2 text-xs font-mono uppercase tracking-widest border border-foreground/20 px-4 py-2 hover:border-accent/60 transition-colors"
      >
        {t("seeFeed")}
      </Link>
    </div>
  );
}
