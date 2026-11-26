"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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
import {
  PANEL_GAP_R,
  PANEL_PAD_X,
  SHEET_BOTTOM,
} from "@/components/dossier/geometry";
import { Navbar } from "@/components/navbar";
import { NotesBoard } from "@/components/notes/notes-board";
import { type NoteGroup, NotesPocket } from "@/components/notes/notes-pocket";
import { MarkerToggle, ReadingNotes } from "@/components/notes/reading-notes";
import { HoloSeal } from "@/components/stamps/org-stamps";
import { loadArticleBody, prefetchArticleBody } from "@/features/dossier/load-body";
import {
  ARTICLE_STAMPS,
  ARTICLES_BY_ID,
  TRAIL_REACT,
  TRAILS,
} from "@/features/dossier/mock";
import { DEMO_NOTES } from "./demo-notes";
import { trailToDossier } from "@/features/dossier/trail-adapter";
import { useProgressStore } from "@/features/dossier/progress-store";
import { useNotesStore } from "@/features/notes/store";
import type { Annotation } from "@/features/notes/types";
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

/** Pocket flap height, as % of the notes area. */
const POCKET_H = 30;

const DEMO_FLAG = "blklight-notes-demo-v1";

/** Fills the board with sample notes once, so the lab is not empty. */
function useDemoNotes() {
  const add = useNotesStore((s) => s.add);
  useEffect(() => {
    if (localStorage.getItem(DEMO_FLAG)) return;
    localStorage.setItem(DEMO_FLAG, "1");
    for (const { sectionId, ...note } of DEMO_NOTES)
      add({
        ...note,
        scopeId: TRAIL_REACT.id,
        color: TRAIL_REACT.sections.find((s) => s.id === sectionId)?.color,
      });
  }, [add]);
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
  // the stores read localStorage only on the client; remount once they have
  const [hydrated, setHydrated] = useState(false);
  const [reveal, setReveal] = useState<{ noteId: string; nonce: number }>();
  useEffect(() => setHydrated(true), []);
  const readList = useProgressStore((s) => s.read);
  const read = useMemo(() => new Set(readList), [readList]);
  const markRead = useProgressStore((s) => s.markRead);
  const lastIndex = useProgressStore((s) =>
    dossier.sheets.findIndex((sheet) => sheet.id === s.last[trail.id]),
  );
  const allNotes = useNotesStore((s) => s.notes);
  const [boardOpen, setBoardOpen] = useState<{ tab?: string }>();
  useDemoNotes();
  const user = useAuthStore((s) => s.user);
  const member: BadgeData = user
    ? {
        name: user.username,
        handle: user.username,
        memberSince: user.createdAt,
        memberId: user.id.slice(0, 6).toUpperCase(),
      }
    : MOCK_MEMBER;
  const sectionColor = (id?: string) =>
    dossier.sections.find((s) => s.id === id)?.color;
  const sectionTitle = (id?: string) => dossier.sections.find((s) => s.id === id)?.title;
  const docLabel = (sheet: (typeof dossier.sheets)[number]) =>
    `Doc. ${String(dossier.sheets.indexOf(sheet) + 1).padStart(2, "0")} · ${sectionTitle(sheet.sectionId) ?? ""}`;
  const trailNotes = allNotes.filter((n) => n.scopeId === trail.id);
  const sectionOf = (n: Annotation) =>
    n.sectionId ?? dossier.sheets.find((s) => s.id === n.docId)?.sectionId;
  const noteGroups: NoteGroup[] = [
    ...dossier.sections.map((section) => ({
      id: section.id,
      label: section.title,
      color: section.color,
      notes: trailNotes.filter((n) => sectionOf(n) === section.id),
    })),
    {
      id: "_loose",
      label: "Soltas",
      notes: trailNotes.filter((n) => !sectionOf(n)),
    },
  ];
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
        key={`${trail.id}-${hydrated}-${reveal?.nonce ?? 0}`}
        {...dossier}
        readIds={read}
        coverAttachment={<PinnedBadge member={member} />}
        getBody={(sheet) => loadArticleBody(sheet.id)}
        initialState={
          initialIndex >= 0
            ? { mode: "focus", index: initialIndex }
            : { mode: "closed", index: Math.max(0, lastIndex) }
        }
        onFocusChange={(sheet) => {
          if (sheet) markRead(sheet.id, trail.id);
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
        renderActions={(sheet) => (
          <MarkerToggle color={sectionColor(sheet.sectionId)} />
        )}
        renderAside={(sheet, root) => (
          <ReadingNotes
            key={sheet.id}
            root={root}
            scopeId={trail.id}
            docId={sheet.id}
            color={sectionColor(sheet.sectionId)}
            label={docLabel(sheet)}
            revealId={reveal?.noteId}
          />
        )}
        renderNotes={() => (
          <div className="relative h-full">
            <p className="absolute top-2 left-0 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-[oklch(0.92_0.012_85)] opacity-60">
              {trail.code} · fundo da pasta
            </p>
            <NotesPocket
              pileTop={`calc(${100 - POCKET_H}% + ${SHEET_BOTTOM - 48}px)`}
              groups={noteGroups}
              onOpenBoard={(id) =>
                setBoardOpen({ tab: id === "_loose" ? "" : id })
              }
            />
            <div
              aria-hidden
              className="dossier-board pointer-events-none absolute shadow-[0_-8px_18px_rgb(0_0_0/0.4)] [clip-path:polygon(0_8%,50%_0,100%_8%,100%_100%,0_100%)]"
              style={{
                left: -PANEL_PAD_X,
                right: -PANEL_GAP_R,
                bottom: -SHEET_BOTTOM,
                height: `${POCKET_H}%`,
              }}
            />
            <p className="dossier-emboss absolute bottom-6 left-0 font-mono text-xs uppercase tracking-[0.3em] text-[oklch(0.92_0.012_85)] opacity-70">
              Bolso de anotações
            </p>
          </div>
        )}
      />
      {boardOpen && (
        <NotesBoard
          title={`Quadro · ${trail.code}`}
          scopeId={trail.id}
          groups={noteGroups}
          tabs={dossier.sections}
          initialTab={boardOpen.tab}
          tabOf={(n) => sectionOf(n) ?? ""}
          labelOf={(n) => {
            const sheet = dossier.sheets.find((s) => s.id === n.docId);
            return sheet ? docLabel(sheet) : (sectionTitle(n.sectionId) ?? "Solta");
          }}
          onOpenDoc={(n) => {
            const sheet = dossier.sheets.find((s) => s.id === n.docId);
            if (!sheet) return;
            setBoardOpen(undefined);
            setInitialDoc(sheet.slug);
            setReveal((r) => ({ noteId: n.id, nonce: (r?.nonce ?? 0) + 1 }));
          }}
          onClose={() => setBoardOpen(undefined)}
        />
      )}
    </>
  );
}
