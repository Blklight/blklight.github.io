"use client";

import { useState } from "react";
import { ArticleCard } from "@/components/dossier/article-card";
import { Dossier } from "@/components/dossier/dossier";
import { DossierSidebar } from "@/components/dossier/dossier-sidebar";
import { loadArticleBody, prefetchArticleBody } from "@/features/dossier/load-body";
import { ARTICLE_STAMPS, ARTICLES_BY_ID, TRAILS } from "@/features/dossier/mock";
import { trailToDossier } from "@/features/dossier/trail-adapter";
import type { DossierTab } from "@/features/dossier/types";
import { useNotes, useReadProgress } from "@/features/dossier/use-dossier-state";
import { cn } from "@/lib/utils";

const TABS: DossierTab[] = [
  { id: "sumario", label: "Sumário" },
  { id: "anotacoes", label: "Anotações" },
];

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
      className="space-y-2"
    >
      <p className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <ol className="space-y-1 text-sm">
        {notes.map((n) => (
          <li key={n.id} className="border-b border-foreground/10 py-1">
            {n.text}
          </li>
        ))}
      </ol>
      <input
        name="nota"
        aria-label={`Nova nota: ${title}`}
        placeholder="Escrever nota…"
        className="w-full border-b border-foreground/30 bg-transparent py-1 text-sm outline-none focus:border-foreground"
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

  return (
    <div className="py-10">
      <div
        role="group"
        aria-label="Trilha"
        className="mb-10 flex justify-center gap-2 font-mono text-xs uppercase tracking-widest"
      >
        {TRAILS.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={t.id === trailId}
            onClick={() => setTrailId(t.id)}
            className={cn(
              "border px-3 py-1.5",
              t.id === trailId && "bg-foreground text-background",
            )}
          >
            {t.code} · {t.title}
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
            sectionTitle={dossier.sections.find((s) => s.id === sheet.sectionId)?.title}
            read={read.has(sheet.id)}
            stamp={ARTICLE_STAMPS[sheet.id]}
            onOpen={ctx.open}
            onPrefetch={() => prefetchArticleBody(sheet.id)}
          />
        )}
        renderTab={(tabId, ctx) => {
          const current = dossier.sheets[ctx.index];
          return tabId === "sumario" ? (
            <DossierSidebar
              sections={dossier.sections}
              sheets={dossier.sheets}
              currentIndex={ctx.index}
              readIds={read}
              onSelect={ctx.goTo}
            />
          ) : (
            <div className="space-y-8">
              <NoteList
                title={`Trilha ${trail.code}`}
                notes={notes.trailNotes}
                onAdd={notes.addTrailNote}
              />
              {current && (
                <NoteList
                  title={`Artigo · ${current.title}`}
                  notes={notes.articleNotes[current.id] ?? []}
                  onAdd={(text) => notes.addArticleNote(current.id, text)}
                />
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
