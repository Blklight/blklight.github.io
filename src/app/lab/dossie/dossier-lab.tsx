"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Badge, type BadgeData } from "@/components/badge";
import { SignatureBlock } from "@/components/document/signature-block";
import {
  ARTICLE_TYPE_LABEL,
  ArticleCard,
  DOC_ABSTRACT,
  DOC_META,
} from "@/components/dossier/article-card";
import { DocumentPaper } from "@/components/dossier/document-paper";
import { Dossier } from "@/components/dossier/dossier";
import { PANEL_PAD_X, SHEET_BOTTOM } from "@/components/dossier/geometry";
import { Navbar } from "@/components/navbar";
import { HoloSeal } from "@/components/stamps/org-stamps";
import { loadArticleBody, prefetchArticleBody } from "@/features/dossier/load-body";
import { ARTICLE_STAMPS, ARTICLES_BY_ID, TRAILS } from "@/features/dossier/mock";
import { trailToDossier } from "@/features/dossier/trail-adapter";
import { useNotes, useReadProgress } from "@/features/dossier/use-dossier-state";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const AUTHOR = { displayName: "Equipe Blklight", username: "blklight" };
const PUBLISHED_AT = "2026-11-20T12:00:00-03:00";

/** Without a session the lab shows the same mock member as /lab/cracha. */
const MOCK_MEMBER: BadgeData = {
  name: "Marina Alves",
  handle: "marina",
  memberSince: "2026-11-20T12:00:00.000Z",
  memberId: "A1B2C3",
};

/** The reader's badge, scaled down and held still, sealed to the cover. */
function PinnedBadge({ member }: { member: BadgeData }) {
  return (
    <div className="relative h-[20.16rem] w-[14.4rem]">
      <div
        inert
        className="pointer-events-none w-80 origin-top-left scale-[0.72]"
      >
        <Badge data={member} />
      </div>
      <HoloSeal
        data={{
          name: member.name,
          handle: member.handle,
          city: "Membro",
          date: "",
          shortDate: member.memberId,
          ref: "Leitor",
          tagline: "",
          since: "",
          status: "Leitor",
        }}
        rotate={12}
        className="absolute -top-5 -right-6 z-10 w-28"
      />
    </div>
  );
}

function NoteCard({
  title,
  notes,
  onAdd,
  tilt,
  children,
}: {
  title: string;
  notes: { id: string; text: string }[];
  onAdd: (text: string) => void;
  tilt: number;
  children?: React.ReactNode;
}) {
  return (
    <form
      data-no-drag
      onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem("nota") as HTMLInputElement;
        if (input.value.trim()) onAdd(input.value.trim());
        input.value = "";
      }}
      className="paper-grain-overlay relative isolate w-68 border border-foreground/70 p-5 pt-4 text-foreground shadow-[3px_5px_12px_rgb(0_0_0/0.35)]"
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      <div className="relative z-10">
        <p className="font-mono text-[0.65rem] font-bold uppercase leading-7 tracking-widest">
          {title}
        </p>
        {children}
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
          placeholder="Escrever e Enter…"
          className="h-7 w-full bg-transparent font-serif text-lg italic outline-none placeholder:text-muted-foreground/60"
        />
      </div>
    </form>
  );
}

const trailOf = (slug: string | null) =>
  TRAILS.find((t) =>
    t.items.some((it) => ARTICLES_BY_ID.get(it.articleId)?.slug === slug),
  );

/** `?doc=slug` mirrors the document being read, so a reload opens it again. */
function setDocParam(slug?: string) {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set("doc", slug);
  else url.searchParams.delete("doc");
  window.history.replaceState(null, "", url);
}

export function DossierLab() {
  const searchParams = useSearchParams();
  const [initialDoc, setInitialDoc] = useState(() => searchParams.get("doc"));
  const [trailId, setTrailId] = useState(
    () => (trailOf(initialDoc) ?? TRAILS[0]).id,
  );
  const trail = TRAILS.find((t) => t.id === trailId) ?? TRAILS[0];
  const dossier = trailToDossier(trail, ARTICLES_BY_ID);
  const initialIndex = dossier.sheets.findIndex((s) => s.slug === initialDoc);
  const { read, markRead } = useReadProgress();
  const notes = useNotes();
  const [noteDocId, setNoteDocId] = useState<string>();
  const user = useAuthStore((s) => s.user);
  const member: BadgeData = user
    ? {
        name: user.username,
        handle: user.username,
        memberSince: user.createdAt,
        memberId: user.id.slice(0, 6).toUpperCase(),
      }
    : MOCK_MEMBER;
  const sectionTitle = (id?: string) => dossier.sections.find((s) => s.id === id)?.title;
  const noteDoc = dossier.sheets.find((s) => s.id === noteDocId) ?? dossier.sheets[0];

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
            onClick={() => {
              setDocParam();
              setInitialDoc(null);
              setTrailId(t.id);
            }}
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
        readIds={read}
        coverAttachment={<PinnedBadge member={member} />}
        getBody={(sheet) => loadArticleBody(sheet.id)}
        initialState={
          initialIndex >= 0 ? { mode: "focus", index: initialIndex } : undefined
        }
        onFocusChange={(sheet) => {
          if (sheet) markRead(sheet.id);
          setDocParam(sheet?.slug);
        }}
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
            <DocumentPaper as="article" context={context} contentClassName="p-8 md:p-10">
              <p className={DOC_META}>
                {trail.code} · {sectionTitle(sheet.sectionId)} · {article.readingTime} min
              </p>
              {title}
              {intro && <p className={DOC_ABSTRACT}>{intro}</p>}
              <div className="mb-6 h-px bg-foreground/20" />
              {body}
              <div className="mt-12">
                <SignatureBlock context={{ ...context, publishedAt: PUBLISHED_AT }} />
              </div>
            </DocumentPaper>
          );
        }}
        renderNotes={() => (
          <div className="relative h-full">
            <p className="absolute top-2 left-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[oklch(0.92_0.012_85)] opacity-60">
              {trail.code} · fundo da pasta
            </p>
            <div className="absolute inset-x-0 top-12 flex justify-center gap-6">
              <NoteCard
                title={`Trilha ${trail.code}`}
                notes={notes.trailNotes}
                onAdd={notes.addTrailNote}
                tilt={-2}
              />
              {noteDoc && (
                <NoteCard
                  title="Documento"
                  notes={notes.articleNotes[noteDoc.id] ?? []}
                  onAdd={(text) => notes.addArticleNote(noteDoc.id, text)}
                  tilt={1.5}
                >
                  <select
                    aria-label="Documento da nota"
                    value={noteDoc.id}
                    onChange={(e) => setNoteDocId(e.target.value)}
                    className="mb-1 h-7 w-full bg-transparent font-mono text-xs uppercase outline-none"
                  >
                    {dossier.sheets.map((s, i) => (
                      <option key={s.id} value={s.id}>
                        {String(i + 1).padStart(2, "0")} · {s.title}
                      </option>
                    ))}
                  </select>
                </NoteCard>
              )}
            </div>
            <div
              aria-hidden
              className="dossier-board pointer-events-none absolute h-[45%] shadow-[0_-8px_18px_rgb(0_0_0/0.4)] [clip-path:polygon(0_30%,42%_0,100%_22%,100%_100%,0_100%)]"
              style={{
                left: -PANEL_PAD_X,
                right: 0,
                bottom: -SHEET_BOTTOM,
              }}
            />
            <p className="dossier-emboss absolute bottom-6 left-0 font-mono text-xs uppercase tracking-[0.3em] text-[oklch(0.92_0.012_85)] opacity-70">
              Bolso de anotações
            </p>
          </div>
        )}
      />
    </>
  );
}
