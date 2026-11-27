"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { typeKey } from "../card-theme";
import {
  AuthorLink,
  CardTitle,
  cardFont,
  TypeTab,
  useFormatDate,
} from "../parts";
import { type CardProps, Shell, tall, wide } from "../shell";

/** Spec sheet: the title beside a numbered table of the document's facts. */
export function FichaCard({ data, size }: CardProps) {
  const tk = useTranslations("kinds");
  const t = useTranslations("feedCard");
  const formatDate = useFormatDate();
  const name = data.author.displayName || data.author.username;
  const rows = [
    [t("type"), tk(`${typeKey(data.typeName)}.label`)],
    [
      t("author"),
      <AuthorLink key="a" doc={data}>
        {name}
      </AuthorLink>,
    ],
    [t("date"), formatDate(data.publishedAt)],
    [t("category"), data.category?.name ?? "—"],
    [t("likesTitle"), String(data.likesCount)],
  ] as const;
  const shown = size === "1x1" ? rows.slice(0, 3) : rows;
  return (
    <Shell
      card="ficha"
      shape={{ kind: "flat" }}
      className="bg-card text-card-foreground"
    >
      <TypeTab type={data.typeName} tone="auto" />
      <div
        className={cn(
          "h-full flex gap-5 p-5 pt-11",
          wide(size) ? "flex-row" : "flex-col",
        )}
      >
        <div className={cn("flex flex-col min-w-0", wide(size) && "w-1/2")}>
          <CardTitle
            doc={data}
            className={cn(
              "leading-[1.05]",
              tall(size) ? "text-3xl line-clamp-4" : "text-2xl line-clamp-2",
              cardFont(data),
            )}
          />
          {data.abstract && size !== "1x1" && (
            <p
              className={cn(
                "mt-3 text-sm text-muted-foreground",
                tall(size) ? "line-clamp-4" : "line-clamp-3",
                cardFont(data),
              )}
            >
              {data.abstract}
            </p>
          )}
        </div>
        <dl className="mt-auto w-full border-t-2 border-foreground font-mono text-[0.7rem] uppercase tracking-wider">
          {shown.map(([label, value], i) => (
            <div
              key={label}
              className="grid grid-cols-[2rem_auto_1fr] gap-2 border-b border-foreground/30 py-1"
            >
              <span aria-hidden className="text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="truncate text-right">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Shell>
  );
}
