"use client";

import { useState } from "react";
import { SignatureBlock } from "@/components/document/signature-block";
import { ARTICLE_TYPE_LABEL, ArticleCard } from "@/components/dossier/article-card";
import { DocumentPaper } from "@/components/dossier/document-paper";
import { Dossier } from "@/components/dossier/dossier";
import { Navbar } from "@/components/navbar";
import { loadArticleBody, prefetchArticleBody } from "@/features/dossier/load-body";
import { ARTICLE_STAMPS, ARTICLES_BY_ID, TRAILS } from "@/features/dossier/mock";
import { trailToDossier } from "@/features/dossier/trail-adapter";
import type { DossierTab } from "@/features/dossier/types";
import { useNotes, useReadProgress } from "@/features/dossier/use-dossier-state";
import { cn } from "@/lib/utils";

const TABS: DossierTab[] = [{ id: "anotacoes", label: "Anotações" }];
const AUTHOR = { displayName: "Equipe Blklight", username: "blklight" };
const PUBLISHED_AT = "2026-11-20T12:00:00-03:00";

function NoteList({
  title,
  notes,
  onAdd,
}: {
  title: string;
  notes: { id: string; text: string }[];
  onAdd: (text: string) => void;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem("nota") as HTMLInputElement;
        if (input.value.trim()) onAdd(input.value.trim());
        input.value = "";
      }}
    >
      <p className="font-mono text-[0.68rem] font-bold uppercase leading-7 tracking-widest">
        {title}
      </p>
      <ol className="font-serif text-lg leading-7">
        {notes.map((n, i) => (
          <li key={n.id}>
            <span className="mr-2 font-mono text-xs text-muted-foreground">{i + 1}.</span>
            {n.text}
          </li>
        ))}
      </ol>
      <input
        name="nota"
        aria-label={`Nova nota: ${title}`}
        placeholder="Escrever nota e Enter…"
        className="h-7 w-full bg-transparent font-serif text-lg italic outline-none placeholder:text-muted-foreground/60"
      />
    </form>
  );
}

export function DossierLab() {
  const [trailId, setTrailId] = useState(TRAILS[0].id);
  const trail = TRAILS.find((t) => t.id === trailId) ?? TRAILS[0];
  const dossier = trailToDossier(trail, ARTICLES_BY_ID);
  const { read, markRead } = useReadProgress();
  const notes = useNotes();
  const sectionTitle = (id?: string) => dossier.sections.find((s) => s.id === id)?.title;

  return (
    <>
      <Navbar />
      <div
        role="group"
        aria-label="Trilha de exemplo"
        className="fixed right-20 bottom-4 z-60 flex gap-1 font-mono text-[0.65rem] uppercase tracking-widest"
      >
        {TRAILS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === trailId}
            onClick={() => setTrailId(t.id)}
            className={cn(
              "border border-foreground bg-background px-2 py-1",
              t.id === trailId && "bg-foreground text-background",
            )}
          >
            {t.code}
          </button>
        ))}
      </div>

      <Dossier
        key={trail.id}
        {...dossier}
        tabs={TABS}
        readIds={read}
        getBody={(sheet) => loadArticleBody(sheet.id)}
        onFocusChange={(sheet) => sheet && markRead(sheet.id)}
        renderCard={(sheet, ctx) => (
          <ArticleCard
            titleId={ctx.titleId}
            sheet={sheet.data}
            index={ctx.index}
            sectionTitle={sectionTitle(sheet.sectionId)}
            author={AUTHOR}
            read={read.has(sheet.id)}
            stamp={ARTICLE_STAMPS[sheet.id]}
            onOpen={ctx.open}
            onPrefetch={() => prefetchArticleBody(sheet.id)}
          />
        )}
        renderDocument={(sheet, { title, body }) => {
          const { article, intro } = sheet.data;
          const context = { author: AUTHOR, typeLabel: ARTICLE_TYPE_LABEL[article.type] };
          return (
            <DocumentPaper as="article" context={context} contentClassName="gap-6 p-8 md:p-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-widest text-muted-foreground">
                {trail.code} · {sectionTitle(sheet.sectionId)} · {article.readingTime} min
              </p>
              {title}
              {intro && <p className="text-xl text-muted-foreground">{intro}</p>}
              <div className="h-px bg-foreground/20" />
              {body}
              <div className="mt-6">
                <SignatureBlock context={{ ...context, publishedAt: PUBLISHED_AT }} />
              </div>
            </DocumentPaper>
          );
        }}
        renderTab={(_tabId, ctx) => {
          const current = dossier.sheets[ctx.index];
          return (
            <div className="space-y-7">
              <NoteList
                title={`Trilha ${trail.code}`}
                notes={notes.trailNotes}
                onAdd={notes.addTrailNote}
              />
              {current && (
                <NoteList
                  title={`Doc. ${String(ctx.index + 1).padStart(2, "0")} · ${current.title}`}
                  notes={notes.articleNotes[current.id] ?? []}
                  onAdd={(text) => notes.addArticleNote(current.id, text)}
                />
              )}
            </div>
          );
        }}
      />
    </>
  );
}
