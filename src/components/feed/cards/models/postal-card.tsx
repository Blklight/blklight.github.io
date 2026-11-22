"use client";

import type { ReactNode } from "react";
import { type OrgStampData, WaxStamp } from "@/components/stamps/org-stamps";
import { formatSignatureDate } from "@/features/documents/design/signature";
import { cn } from "@/lib/utils";
import type { DocumentCard } from "@/types/api.types";
import { typeTheme } from "../card-theme";
import { AuthorLink, CardTitle, cardFont, TypeTab } from "../parts";
import { type CardProps, Shell, tall, wide } from "../shell";

const PAPER = "#dcdcd6";
const INK = "#4b4b47";

/** The document as a postmark: the organization (or Blklight) stamps the publication date. */
export const documentStamp = (doc: DocumentCard): OrgStampData => {
  const date = formatSignatureDate(doc.publishedAt);
  return {
    name: doc.organization?.name ?? "Blklight",
    handle: doc.author.username,
    city: doc.organization ? `@${doc.organization.orgname}` : "blklight.dev",
    date: date.replace(/\//g, "·"),
    shortDate: date.replace(/(\d{2})\/(\d{2})\/\d{2}(\d{2})/, "$1/$2/$3"),
    ref: doc.authorship?.publicIdentifier ?? doc.slug,
    tagline: typeTheme(doc.typeName).label,
    since: date.slice(-4),
    status: "Publicado",
  };
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-current/30 px-2.5 py-1.5 last:border-b-0">
    <dt className="font-mono text-[0.6rem] uppercase tracking-wider opacity-70">
      {label}:
    </dt>
    <dd className="min-w-0 truncate text-sm">{children}</dd>
  </div>
);

/** Postal: grey card stock, a perforation under the title, address fields and a wax postmark. */
export function PostalCard({ data, size }: CardProps) {
  const stamp = documentStamp(data);
  const name = data.author.displayName || data.author.username;
  return (
    <Shell
      card="postal"
      shape={{ kind: "round" }}
      className="background-texture"
    >
      <div
        className="texture-item flex size-full flex-col"
        style={{ background: PAPER, color: INK }}
      >
        <TypeTab type={data.typeName} tone="ink" inset />
        <div className="px-6 pt-16 pb-4">
          <CardTitle
            doc={data}
            className={cn(
              "font-medium leading-tight",
              tall(size) ? "text-3xl line-clamp-4" : "text-xl line-clamp-2",
              cardFont(data),
            )}
          />
          {data.abstract && tall(size) && (
            <p
              className={cn(
                "mt-3 text-sm opacity-80 line-clamp-4",
                cardFont(data),
              )}
            >
              {data.abstract}
            </p>
          )}
        </div>
        <span
          aria-hidden
          className="block border-t-2 border-dashed border-current/50"
        />
        <div
          className={cn(
            "flex flex-1 gap-3 p-4",
            tall(size) ? "flex-col" : "items-center",
          )}
        >
          <dl
            className={cn(
              "min-w-0 border border-current/40",
              !tall(size) && "flex-1 self-start",
            )}
          >
            <Field label="De">
              <AuthorLink doc={data}>{name}</AuthorLink>
            </Field>
            {(wide(size) || tall(size)) && (
              <Field label="Re">{data.category?.name ?? stamp.tagline}</Field>
            )}
            <Field label="Em">{formatSignatureDate(data.publishedAt)}</Field>
          </dl>
          <WaxStamp
            data={stamp}
            rotate={-8}
            className={cn(
              "shrink-0",
              tall(size) ? "mt-auto w-32 self-end" : "self-center",
              !tall(size) && (wide(size) ? "w-28" : "w-20"),
            )}
          />
        </div>
      </div>
    </Shell>
  );
}
