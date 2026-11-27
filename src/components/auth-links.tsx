"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LABEL =
  "font-mono text-xs uppercase tracking-wider rounded-xs px-3 sm:px-4";

/** Logged-out entry points: sign in and create account, both on /auth. */
export function AuthLinks({
  className,
  compact = false,
}: {
  className?: string;
  /** Below sm, keep only "Entrar" (the /auth page has the sign-up tab). */
  compact?: boolean;
}) {
  const t = useTranslations("auth");
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/auth"
        className={cn(buttonVariants({ variant: "ghost", size: "lg" }), LABEL)}
      >
        {t("signIn")}
      </Link>
      <Link
        href="/auth?mode=register"
        className={cn(
          buttonVariants({ size: "lg" }),
          LABEL,
          compact && "hidden sm:inline-flex",
        )}
      >
        {t("signUp")}
      </Link>
    </div>
  );
}
