"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { typeKey } from "../card-theme";
import { CardMeta, CardTitle, cardFont, useFormatDate } from "../parts";
import { type CardProps, Shell, tall } from "../shell";

const Plus = ({ className }: { className: string }) => (
  <span aria-hidden className={cn("absolute size-3", className)}>
    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
    <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
  </span>
);

/** Instrument readout: the cover as a scan with corner telemetry, the title huge beneath. */
export function HudCard({ data, size }: CardProps) {
  const tk = useTranslations("kinds");
  const t = useTranslations("feedCard");
  const formatDate = useFormatDate();
  return (
    <Shell
      card="hud"
      shape={{ kind: "flat" }}
      className="bg-card text-card-foreground"
    >
      <div className="flex h-full flex-col">
        <div className="relative min-h-0 flex-1 overflow-hidden bg-dark text-light">
          {data.coverImageUrl && (
            // biome-ignore lint/performance/noImgElement: covers come from arbitrary hosts; next/image needs a domain allowlist
            <img
              src={data.coverImageUrl}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 size-full object-cover opacity-80 saturate-150 contrast-125 transition-transform duration-700 ease-out group-hover/card:scale-105 motion-reduce:transition-none"
            />
          )}
          <div className="relative flex h-full flex-col justify-between p-4 font-mono text-[0.65rem] uppercase tracking-wider [text-shadow:0_1px_2px_rgb(0_0_0/0.8)]">
            <div className="flex justify-between gap-3">
              <span>
                Sys: {tk(`${typeKey(data.typeName)}.label`)}
                <br />
                {data.category?.name ?? t("noCategory")}
              </span>
              <span className="text-right">
                {formatDate(data.publishedAt)}
                <br />
                Ativo
              </span>
            </div>
            <div className="flex items-end justify-between gap-3">
              <span className="text-3xl font-sans font-light normal-case tracking-tight">
                {data.likesCount}
              </span>
              <span className="w-1/2">
                <span className="block text-right">Curtidas</span>
                <span className="mt-1 block h-1.5 bg-light/30">
                  <span
                    className="block h-full bg-light"
                    style={{ width: `${Math.min(100, data.likesCount)}%` }}
                  />
                </span>
              </span>
            </div>
          </div>
          <Plus className="left-2 top-2" />
          <Plus className="right-2 top-2" />
          <Plus className="bottom-2 left-2" />
          <Plus className="bottom-2 right-2" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          <CardTitle
            doc={data}
            className={cn(
              "font-black uppercase leading-[0.9] tracking-tighter",
              size === "2x2"
                ? "text-5xl line-clamp-2"
                : tall(size)
                  ? "text-3xl line-clamp-3"
                  : "text-2xl line-clamp-1",
              cardFont(data),
            )}
          />
          <CardMeta doc={data} muted="text-muted-foreground" />
        </div>
      </div>
    </Shell>
  );
}
