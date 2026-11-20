"use client";

import {
  ArrowRight,
  BookOpen,
  FileSignature,
  Hammer,
  Newspaper,
  StickyNote,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { TYPE_THEME } from "@/components/feed/cards/card-theme";
import { Navbar } from "@/components/navbar";
import { RequireAuth } from "@/components/require-auth";
import { FilletCard } from "@/components/ui/fillet-card";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import {
  DOCUMENT_KINDS,
  type DocumentKind,
} from "@/features/documents/document-kinds";
import { cn } from "@/lib/utils";
import type { DocumentType } from "@/types/api.types";

const ICONS: Record<DocumentType, ReactNode> = {
  article: <Newspaper />,
  tutorial: <BookOpen />,
  project: <Hammer />,
  note: <StickyNote />,
  contract: <FileSignature />,
};

const FEED_KINDS = DOCUMENT_KINDS.filter((k) =>
  ["article", "tutorial", "project"].includes(k.type),
);
const OTHER_KINDS = DOCUMENT_KINDS.filter((k) => !FEED_KINDS.includes(k));

function KindLink({
  kind,
  className,
}: {
  kind: DocumentKind;
  className?: string;
}) {
  return (
    <Link
      href={`/escrever/${kind.slug}`}
      className={cn(
        "group relative flex h-full flex-col gap-3 p-6 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current",
        className,
      )}
    >
      <span className="size-11 rounded-xs border-2 border-dark flex items-center justify-center bg-light text-dark [&_svg]:size-5">
        {ICONS[kind.type]}
      </span>
      <span className="mt-auto font-sans text-3xl font-bold tracking-tight">
        {kind.label}
      </span>
      <span className="text-sm opacity-80 max-w-xs">{kind.description}</span>
      <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider">
        {kind.newLabel}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

function Choose() {
  return (
    <div className="px-4 md:px-8 py-10 animate-fade-in">
      <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95]">
        O que você vai escrever?
      </h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Cada tipo abre o mesmo editor, preparado para ele. Artigos, tutoriais e
        projetos vão para o feed.
      </p>

      <ul className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <li className="min-h-72">
          <FilletCard
            corners={["tr", "bl"]}
            size="lg"
            radius={6}
            rounded={2}
            bordered={false}
            style={{ height: "100%" }}
            className={cn(
              "h-full text-dark background-texture",
              TYPE_THEME.article.solid,
            )}
          >
            <KindLink kind={FEED_KINDS[0]} />
          </FilletCard>
        </li>
        <li className="min-h-72">
          <div
            className={cn(
              "h-full rounded-lg text-dark background-texture",
              TYPE_THEME.tutorial.solid,
            )}
          >
            <KindLink kind={FEED_KINDS[1]} />
          </div>
        </li>
        <li className="min-h-72">
          <div
            className={cn(
              "h-full rounded-none border-2 border-foreground text-dark background-texture",
              TYPE_THEME.project.solid,
            )}
          >
            <KindLink kind={FEED_KINDS[2]} />
          </div>
        </li>
      </ul>

      <h2 className="mt-12 mb-4 font-sans text-xl font-bold tracking-tight pb-2 border-b-2 border-foreground">
        Fora do feed
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {OTHER_KINDS.map((kind) => (
          <li key={kind.slug} className="min-h-44">
            <div className="h-full rounded-[1.25rem] border border-border bg-card background-texture">
              <KindLink kind={kind} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function EscreverPage() {
  return (
    <RequireAuth>
      <Navbar />
      <section className="bg-light book:bg-sepia dark:bg-dark background-texture rounded-xs relative z-0 min-h-[calc(100dvh-4.125rem)]">
        <TextureOverlay texture="grid" className="mix-blend-overlay" />
        <div className="relative z-10">
          <Choose />
        </div>
      </section>
    </RequireAuth>
  );
}
