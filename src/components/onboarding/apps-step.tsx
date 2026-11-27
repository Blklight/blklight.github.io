"use client";

import { RotateCw, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { SimpleFlipCard } from "@/components/onboarding/simple-flip-card";
import { Button } from "@/components/ui/button";
import type { PlatformApp } from "@/types/api.types";
import { useAppMeta } from "./app-meta";
import { StepFooter } from "./step-footer";

interface Props {
  apps: PlatformApp[];
  /**
   * Previously selected apps, identified by slug (the same key the API
   * expects on POST /api/v1/platform-apps/me).
   */
  initial: string[];
  onConfirm: (slugs: string[]) => void;
  onBack: () => void;
}

const SEARCH_THRESHOLD = 6;

export const AppsStep = ({ apps, initial, onConfirm, onBack }: Props) => {
  const t = useTranslations("onboarding");
  const appMeta = useAppMeta();
  const [query, setQuery] = useState("");

  // Available apps first; "em breve" ones stay visible but can't be picked.
  const openApps = useMemo(
    () =>
      apps
        .filter((a) => a.accessMode === "open")
        .sort(
          (a, b) => Number(appMeta(b).available) - Number(appMeta(a).available),
        ),
    [apps, appMeta],
  );
  const [selected, setSelected] = useState<Set<string>>(
    () =>
      new Set(
        initial.filter((slug) =>
          openApps.some((a) => a.slug === slug && appMeta(a).available),
        ),
      ),
  );

  // Selection is keyed by slug, not id: the onboarding API
  // (POST /api/v1/platform-apps/me) activates apps by slug, and the ConfirmStep
  // resolves the selection back to the catalog the same way.
  const toggle = (slug: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return openApps;
    return openApps.filter((a) => {
      const meta = appMeta(a);
      return [a.name, meta.tagline, meta.description]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [query, openApps, appMeta]);

  const count = selected.size;

  return (
    <div className="flex-1 flex flex-col px-6 md:px-10 pt-12 animate-fade-in">
      <div className="mb-10 max-w-2xl">
        <h1 className="font-sans text-4xl md:text-5xl font-bold tracking-tight mb-4">
          {t("appsTitle")}
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          {t.rich("appsLead", {
            icon: () => (
              <RotateCw
                aria-label={t("flipButton")}
                className="inline size-4 align-[-0.15em] text-foreground"
              />
            ),
          })}
        </p>
      </div>

      {openApps.length > SEARCH_THRESHOLD && (
        <div className="relative mb-8 max-w-md">
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchApp")}
            aria-label={t("searchApps")}
            className="w-full bg-card border border-border rounded-xs pl-9 pr-3 py-2.5 text-sm placeholder:text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
          />
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-10">
          {filtered.map((app) => (
            <SimpleFlipCard
              key={app.id}
              app={app}
              selected={selected.has(app.slug)}
              onToggle={() => toggle(app.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="border border-border rounded-xs p-8 mb-10 flex flex-col items-start gap-4">
          <p className="text-sm text-muted-foreground">
            {t("noAppsFor", { query })}
          </p>
          <Button variant="outline" onClick={() => setQuery("")}>
            {t("clearSearch")}
          </Button>
        </div>
      )}

      <StepFooter
        onBack={onBack}
        status={
          count === 0 ? t("selectAtLeastOne") : t("selectedCount", { count })
        }
        label={t("continue")}
        disabled={count === 0}
        onNext={() => onConfirm(Array.from(selected))}
      />
    </div>
  );
};
