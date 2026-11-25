"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { HoloSeal } from "@/components/stamps/org-stamps";
import type {
  DossierCoverData,
  DossierSection,
  DossierSheetData,
} from "@/features/dossier/types";
import {
  type DossierState,
  useDossierState,
} from "@/features/dossier/use-dossier-state";
import { cn } from "@/lib/utils";
import { DossierCover, DossierProgress } from "./dossier-cover";
import { DossierFocus } from "./dossier-focus";
import { DossierSheet } from "./dossier-sheet";
import { DossierSidebar } from "./dossier-sidebar";
import { DossierStack } from "./dossier-stack";
import { DossierTabs, Ear } from "./dossier-tabs";
import {
  EAR_W,
  PANEL_PAD_X,
  PANEL_W,
  SHEET_BOTTOM,
  SHEET_TOP,
  SHEET_W,
  SPREAD_W,
} from "./geometry";

export interface DossierCardContext {
  index: number;
  titleId: string;
  open: () => void;
}

export interface DossierProps<T> {
  cover: DossierCoverData;
  sections: DossierSection[];
  sheets: DossierSheetData<T>[];
  readIds: ReadonlySet<string>;
  initialState?: DossierState;
  renderCard: (
    sheet: DossierSheetData<T>,
    ctx: DossierCardContext,
  ) => ReactNode;
  renderDocument: (
    sheet: DossierSheetData<T>,
    parts: { title: ReactNode; body: ReactNode },
  ) => ReactNode;
  /** The folder's back, under the last sheet: where notes are kept. */
  renderNotes: () => ReactNode;
  /** Pinned next to the index inside the cover (e.g. the reader's badge). */
  coverAttachment?: ReactNode;
  /** Must return the same promise for the same sheet (cached loader). */
  getBody: (sheet: DossierSheetData<T>) => Promise<string>;
  onFocusChange?: (sheet: DossierSheetData<T> | undefined) => void;
}

const EASE = "ease-[cubic-bezier(.25,.8,.25,1)]";

/** Real size laid out once; scaled as one piece to the stage width, filling its height. */
function useFit() {
  const ref = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ scale: number; height: number }>();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const scale = Math.min(1, width / SPREAD_W);
      setFit({ scale, height: height / scale });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, fit] as const;
}

export function Dossier<T>({
  cover,
  sections,
  sheets,
  readIds,
  initialState,
  renderCard,
  renderDocument,
  renderNotes,
  coverAttachment,
  getBody,
  onFocusChange,
}: DossierProps<T>) {
  const uid = useId();
  const notesIndex = sheets.length;
  const [state, dispatch] = useDossierState(sheets.length + 1, initialState);
  const [stageRef, fit] = useFit();
  const sheet = sheets[state.index];
  const isOpen = state.mode !== "closed";
  const focused = state.mode === "focus" && sheet ? sheet : undefined;
  const earTotal = sections.length + 1;
  const readFlags = sheets.map((s) => readIds.has(s.id));

  const focus = (index: number) => {
    dispatch({ type: "focus", index });
    onFocusChange?.(sheets[index]);
  };
  const unfocus = () => {
    dispatch({ type: "unfocus" });
    onFocusChange?.(undefined);
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() =>
      document
        .getElementById(`${uid}-${sheet?.id}`)
        ?.querySelector("button")
        ?.focus(),
    );
  };
  const goTo = (index: number) => dispatch({ type: "goTo", index });

  const keyRef = useRef<(e: KeyboardEvent) => void>(() => {});
  keyRef.current = (e) => {
    if (state.mode === "focus") {
      if (e.key === "Escape") unfocus();
      return;
    }
    if (
      e.target instanceof Element &&
      e.target.closest("input, textarea, select, [contenteditable]")
    )
      return;
    if (["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)) {
      e.preventDefault();
      dispatch({ type: "next" });
    } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      dispatch({ type: "prev" });
    }
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => keyRef.current(e);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const index = (
    <DossierSidebar
      code={cover.code}
      sections={sections}
      sheets={sheets}
      currentIndex={state.index}
      readIds={readIds}
      expandCurrent={!!focused}
      onSelect={focused ? focus : goTo}
      className="h-full"
    />
  );
  const pageLabel =
    state.index === notesIndex
      ? "Anotações"
      : `Doc. ${String(state.index + 1).padStart(2, "0")} de ${String(sheets.length).padStart(2, "0")}`;

  return (
    <>
      <section
        aria-roledescription="dossiê"
        aria-label={cover.title}
        inert={focused ? true : undefined}
        className={cn(
          "flex h-[calc(100dvh-3.5rem)] flex-col px-4 pt-5 pb-4 transition-[filter,transform,opacity] duration-500",
          focused &&
            "pointer-events-none fixed inset-x-0 top-14 bottom-0 z-0 scale-[0.94] opacity-60 blur-[3px] brightness-75",
        )}
      >
        <div ref={stageRef} className="relative min-h-0 flex-1">
          {fit && (
            <div
              className="absolute top-0 left-1/2 origin-top"
              style={{
                width: SPREAD_W,
                height: fit.height,
                transform: `translateX(-50%) scale(${fit.scale})`,
              }}
            >
              <div
                className={cn(
                  "absolute inset-y-0 transition-transform duration-[900ms] [perspective:2800px] motion-reduce:transition-none",
                  EASE,
                )}
                style={{
                  left: EAR_W,
                  width: PANEL_W * 2,
                  transform: isOpen ? "none" : `translateX(${-PANEL_W / 2}px)`,
                }}
              >
                <div
                  className="absolute inset-y-0 right-0"
                  style={{ width: PANEL_W }}
                >
                  <div
                    aria-hidden
                    className="dossier-board-inside absolute inset-0 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
                  />
                  <DossierTabs
                    sections={sections}
                    activeSectionId={
                      isOpen && sheet ? sheet.sectionId : undefined
                    }
                    onSection={(id) => {
                      const i = sheets.findIndex((s) => s.sectionId === id);
                      if (i >= 0) goTo(i);
                    }}
                  />
                  <Ear
                    slot={0}
                    total={earTotal}
                    active={isOpen && state.index === notesIndex}
                    label={cover.code}
                    onClick={() => goTo(notesIndex)}
                    className="dossier-board"
                    style={{ zIndex: 1 }}
                  />
                  <div
                    className="absolute"
                    style={{
                      top: SHEET_TOP,
                      bottom: SHEET_BOTTOM,
                      left: PANEL_PAD_X,
                      width: SHEET_W,
                    }}
                  >
                    <DossierStack
                      sheets={sheets}
                      index={isOpen ? state.index : 0}
                      width={SHEET_W}
                      onNext={() => dispatch({ type: "next" })}
                      onPrev={() => dispatch({ type: "prev" })}
                      bottom={renderNotes()}
                      renderSheet={(s, i) => (
                        <DossierSheet
                          labelledBy={`${uid}-${s.id}`}
                          accent={
                            sections.find((x) => x.id === s.sectionId)?.color
                          }
                        >
                          {renderCard(s, {
                            index: i,
                            titleId: `${uid}-${s.id}`,
                            open: () => focus(i),
                          })}
                        </DossierSheet>
                      )}
                    />
                  </div>
                  <div
                    className="absolute bottom-0 z-30 flex h-16 items-center justify-between font-mono text-[0.68rem] uppercase tracking-widest text-[oklch(0.92_0.012_85)]"
                    style={{ left: PANEL_PAD_X, width: SHEET_W }}
                  >
                    <button
                      type="button"
                      disabled={!isOpen}
                      onClick={() => dispatch({ type: "prev" })}
                      className="px-2 py-1 hover:underline disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-current"
                    >
                      ← Anterior
                    </button>
                    <span aria-live="polite" className="opacity-60">
                      {pageLabel}
                    </span>
                    <button
                      type="button"
                      disabled={state.index === notesIndex}
                      onClick={() => dispatch({ type: "next" })}
                      className="px-2 py-1 hover:underline disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-current"
                    >
                      Próxima →
                    </button>
                  </div>

                  <div
                    className={cn(
                      "absolute inset-0 z-50 origin-left transition-transform duration-[900ms] [transform-style:preserve-3d] motion-reduce:transition-none",
                      EASE,
                    )}
                    style={{ transform: isOpen ? "rotateY(-180deg)" : "none" }}
                  >
                    <div
                      className="absolute inset-0 [backface-visibility:hidden]"
                      aria-hidden={isOpen ? true : undefined}
                      inert={isOpen ? true : undefined}
                    >
                      <DossierCover
                        cover={cover}
                        readFlags={readFlags}
                        onOpen={() => dispatch({ type: "open" })}
                      />
                      <Ear
                        slot={0}
                        total={earTotal}
                        active
                        label={<span className="sr-only">{cover.code}</span>}
                        onClick={() => dispatch({ type: "open" })}
                        className="dossier-board"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-[900ms]"
                        style={{ opacity: isOpen ? 0.6 : 0 }}
                      />
                    </div>
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                      aria-hidden={isOpen ? undefined : true}
                      inert={isOpen ? undefined : true}
                    >
                      <div className="dossier-board-inside absolute inset-0 overflow-hidden">
                        <DossierProgress
                          readFlags={readFlags}
                          className="absolute top-5 opacity-80"
                          style={{ left: PANEL_PAD_X, right: PANEL_PAD_X }}
                        />
                        <div
                          className="absolute h-[calc(100%-11rem)] -rotate-[0.6deg]"
                          style={{ top: SHEET_TOP + 48, left: PANEL_PAD_X }}
                        >
                          {index}
                          <HoloSeal
                            data={{
                              name: "Blklight",
                              handle: "blklight",
                              city: "Arquivo",
                              date: "",
                              shortDate: cover.code,
                              ref: cover.statusLabel,
                              tagline: "",
                              since: "",
                              status: cover.statusLabel,
                            }}
                            rotate={-8}
                            className="absolute -top-8 -right-10 z-20 w-32"
                          />
                        </div>
                        {coverAttachment && (
                          <div className="absolute top-32 right-10 rotate-[2.5deg]">
                            {coverAttachment}
                          </div>
                        )}
                        <div
                          aria-hidden
                          className="dossier-board pointer-events-none absolute inset-x-0 bottom-0 h-40 shadow-[0_-6px_14px_rgb(0_0_0/0.35)] [clip-path:polygon(0_45%,58%_0,100%_38%,100%_100%,0_100%)]"
                        />
                      </div>
                      <Ear
                        slot={0}
                        total={earTotal}
                        side="left"
                        label={cover.code}
                        onClick={() => dispatch({ type: "close" })}
                        className="dossier-board"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {focused && (
        <DossierFocus
          key={focused.id}
          sheet={focused}
          bodyPromise={getBody(focused)}
          renderDocument={(parts) => renderDocument(focused, parts)}
          onClose={unfocus}
          sidebar={index}
        />
      )}
    </>
  );
}
