"use client";

import {
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import "./dossier.css";
import { DossierFocus } from "./dossier-focus";
import { DossierIndexDrawer } from "./dossier-index-drawer";
import { DossierSheet } from "./dossier-sheet";
import { DossierSidebar } from "./dossier-sidebar";
import { DossierStack } from "./dossier-stack";
import { DossierTabs, Ear } from "./dossier-tabs";
import {
  BOARD_EAR_SLOTS,
  COVER_PAD_X,
  EAR_W,
  LAYER,
  PANEL_PAD_X,
  PANEL_W,
  SHEET_BOTTOM,
  SHEET_TOP,
  SHEET_W,
  SINGLE_BELOW,
  SINGLE_W,
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
  /** Reading mode: right of the document (e.g. margin notes); `root` is the document element. */
  renderAside?: (
    sheet: DossierSheetData<T>,
    root: HTMLElement | null,
  ) => ReactNode;
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
  const [fit, setFit] = useState<{
    scale: number;
    height: number;
    single: boolean;
  }>();
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const single = width < SINGLE_BELOW;
      const scale = Math.min(1, width / (single ? SINGLE_W : SPREAD_W));
      setFit({ scale, height: height / scale, single });
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
  renderAside,
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
  const [indexOpen, setIndexOpen] = useState(false);
  const single = !!fit?.single;

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
      status={cover.statusLabel}
      sections={sections}
      sheets={sheets}
      currentIndex={state.index}
      readIds={readIds}
      expandCurrent={!!focused}
      onSelect={(i) => {
        setIndexOpen(false);
        (focused ? focus : goTo)(i);
      }}
      className={cn(
        "h-full",
        focused &&
          "shadow-[0_24px_48px_-16px_rgb(0_0_0/0.5),0_6px_14px_rgb(0_0_0/0.18)]",
      )}
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
        {single && isOpen && !focused && (
          <div className="mb-3 flex justify-between font-mono text-[0.68rem] uppercase tracking-widest">
            <button
              type="button"
              onClick={() => setIndexOpen(true)}
              className="border border-foreground px-2.5 py-1 focus-visible:outline-2 focus-visible:outline-ring"
            >
              ☰ Sumário
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "close" })}
              className="border border-foreground px-2.5 py-1 focus-visible:outline-2 focus-visible:outline-ring"
            >
              Fechar pasta
            </button>
          </div>
        )}
        <div ref={stageRef} className="relative min-h-0 flex-1">
          {fit && (
            <div
              className={cn(
                "absolute top-0 left-1/2 origin-top",
                single && "overflow-hidden",
              )}
              style={{
                width: single ? SINGLE_W : SPREAD_W,
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
                  left: single ? -PANEL_W : EAR_W,
                  width: PANEL_W * 2,
                  transform:
                    isOpen || single ? "none" : `translateX(${-PANEL_W / 2}px)`,
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
                    turned={isOpen && state.index === notesIndex}
                    onSection={(id) => {
                      const i = sheets.findIndex((s) => s.sectionId === id);
                      if (i >= 0) goTo(i);
                    }}
                  />
                  <Ear
                    slot={0}
                    total={BOARD_EAR_SLOTS}
                    active={isOpen && state.index === notesIndex}
                    label={cover.code}
                    onClick={() => goTo(notesIndex)}
                    className="dossier-ear-inside"
                    style={{ zIndex: LAYER.board }}
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
                    className="absolute bottom-0 flex h-16 items-center justify-between font-mono text-[0.68rem] uppercase tracking-widest text-[oklch(0.92_0.012_85)]"
                    style={{
                      left: PANEL_PAD_X,
                      width: SHEET_W,
                      zIndex: LAYER.nav,
                    }}
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
                      "absolute inset-0 origin-left transition-transform duration-[900ms] [transform-style:preserve-3d] motion-reduce:transition-none",
                      EASE,
                    )}
                    style={{
                      zIndex: LAYER.cover,
                      transform: isOpen ? "rotateY(-180deg)" : "none",
                    }}
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
                        total={BOARD_EAR_SLOTS}
                        active
                        label={<span className="sr-only">{cover.code}</span>}
                        onClick={() => dispatch({ type: "open" })}
                        className="dossier-ear-outside"
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
                          style={{ left: COVER_PAD_X, right: COVER_PAD_X }}
                        />
                        <div
                          className="absolute h-[calc(100%-11rem)] -rotate-[0.6deg]"
                          style={{ top: SHEET_TOP + 48, left: COVER_PAD_X }}
                        >
                          {index}
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
                        total={BOARD_EAR_SLOTS}
                        side="left"
                        label={cover.code}
                        onClick={() =>
                          state.index === notesIndex
                            ? goTo(0)
                            : dispatch({ type: "close" })
                        }
                        className="dossier-ear-inside"
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
          onOpenIndex={() => setIndexOpen(true)}
          aside={renderAside ? (root) => renderAside(focused, root) : undefined}
          sidebar={index}
        />
      )}
      <DossierIndexDrawer open={indexOpen} onOpenChange={setIndexOpen}>
        {index}
      </DossierIndexDrawer>
    </>
  );
}
