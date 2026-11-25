"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type {
  DossierCoverData,
  DossierSection,
  DossierSheetData,
  DossierTab,
} from "@/features/dossier/types";
import {
  type DossierState,
  useDossierState,
} from "@/features/dossier/use-dossier-state";
import { cn } from "@/lib/utils";
import { DossierClip } from "./dossier-clip";
import { BOARD_CLIP, DossierCover } from "./dossier-cover";
import { DossierFocus } from "./dossier-focus";
import { DossierSheet } from "./dossier-sheet";
import { DossierSidebar } from "./dossier-sidebar";
import { DossierStack } from "./dossier-stack";
import { DossierTabs } from "./dossier-tabs";

export interface DossierCardContext {
  index: number;
  titleId: string;
  open: () => void;
}

export interface DossierProps<T> {
  cover: DossierCoverData;
  sections: DossierSection[];
  sheets: DossierSheetData<T>[];
  /** Extra inner tabs; "Sumário" is built in. */
  tabs?: DossierTab[];
  readIds: ReadonlySet<string>;
  initialState?: DossierState;
  renderCard: (
    sheet: DossierSheetData<T>,
    ctx: DossierCardContext,
  ) => ReactNode;
  renderTab?: (tabId: string, ctx: { index: number }) => ReactNode;
  renderDocument: (
    sheet: DossierSheetData<T>,
    parts: { title: ReactNode; body: ReactNode },
  ) => ReactNode;
  /** Must return the same promise for the same sheet (cached loader). */
  getBody: (sheet: DossierSheetData<T>) => Promise<string>;
  onFocusChange?: (sheet: DossierSheetData<T> | undefined) => void;
}

const SUMARIO: DossierTab = { id: "sumario", label: "Sumário" };

/**
 * Height is the viewport minus the navbar and the ears; width follows the
 * paper ratio, capped so the open spread (two boards) fits the screen.
 */
const SIZE = {
  "--dh": "min(calc(100dvh - 9rem), calc((100vw - 9rem) * 22 / 34))",
  "--dw": "calc(var(--dh) * 17 / 22)",
} as CSSProperties;

const EASE = "ease-[cubic-bezier(.25,.8,.25,1)]";

function Paperclip({ className }: { className?: string }) {
  return (
    <svg
      role="presentation"
      aria-hidden
      viewBox="0 0 24 64"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M7 20v28a5 5 0 0 0 10 0V12a8 8 0 0 0-16 0v38a11 11 0 0 0 22 0V22" />
    </svg>
  );
}

export function Dossier<T>({
  cover,
  sections,
  sheets,
  tabs = [],
  readIds,
  initialState,
  renderCard,
  renderTab,
  renderDocument,
  getBody,
  onFocusChange,
}: DossierProps<T>) {
  const uid = useId();
  const [state, dispatch] = useDossierState(sheets.length, initialState);
  const [panel, setPanel] = useState<string>();
  const indexRef = useRef<HTMLDivElement>(null);
  const sheet = sheets[state.index];
  const isOpen = state.mode !== "closed";
  const focused = state.mode === "focus" && sheet ? sheet : undefined;

  const focus = (index: number) => {
    dispatch({ type: "focus", index });
    setPanel(undefined);
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
  const goTo = (index: number) => {
    dispatch({ type: "goTo", index });
    setPanel(undefined);
  };
  const onTab = (id: string) => {
    if (!isOpen) dispatch({ type: "open" });
    if (id === SUMARIO.id) {
      setPanel(undefined);
      requestAnimationFrame(() =>
        indexRef.current?.querySelector<HTMLElement>("[aria-current]")?.focus(),
      );
    } else {
      setPanel((p) => (p === id ? undefined : id));
    }
  };

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
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      dispatch({ type: "next" });
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      dispatch({ type: "prev" });
    } else if (e.key === "Escape" && panel) {
      setPanel(undefined);
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

  return (
    <>
      <section
        aria-roledescription="dossiê"
        aria-label={cover.title}
        inert={focused ? true : undefined}
        style={SIZE}
        className={cn(
          "flex h-[calc(100dvh-3.5rem)] items-center justify-center pt-6 transition-[filter,transform,opacity] duration-500",
          focused &&
            "pointer-events-none fixed inset-x-0 top-14 bottom-0 z-0 scale-[0.94] opacity-60 blur-[3px] brightness-75",
        )}
      >
        <div
          className={cn(
            "relative transition-transform duration-[900ms] [perspective:2600px] motion-reduce:transition-none",
            EASE,
          )}
          style={{
            width: "calc(var(--dw) * 2)",
            height: "var(--dh)",
            transform: isOpen ? "none" : "translateX(calc(var(--dw) * -0.5))",
          }}
        >
          <div
            className="absolute inset-y-0 right-0"
            style={{ width: "var(--dw)" }}
          >
            <div
              aria-hidden
              className="dossier-board-inside absolute inset-0 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)]"
            />
            <DossierTabs
              sections={sections}
              activeSectionId={isOpen ? sheet?.sectionId : undefined}
              onSection={(id) => {
                const i = sheets.findIndex((s) => s.sectionId === id);
                if (i >= 0) goTo(i);
              }}
              tabs={[SUMARIO, ...tabs]}
              activeTab={panel}
              onTab={onTab}
            />
            <div className="absolute inset-x-[6%] top-[5%] bottom-[10%]">
              <DossierStack
                sheets={sheets}
                index={state.index}
                renderSheet={(s, i) => (
                  <DossierSheet
                    labelledBy={`${uid}-${s.id}`}
                    accent={sections.find((x) => x.id === s.sectionId)?.color}
                  >
                    {renderCard(s, {
                      index: i,
                      titleId: `${uid}-${s.id}`,
                      open: () => focus(i),
                    })}
                  </DossierSheet>
                )}
              />
              {panel && renderTab && (
                <div
                  role="tabpanel"
                  aria-label={tabs.find((t) => t.id === panel)?.label}
                  className="paper-grain-overlay dossier-ruled absolute inset-0 z-40 isolate overflow-y-auto border border-foreground/80 p-6 pt-10 text-foreground shadow-xl"
                >
                  <div className="relative z-10">
                    {renderTab(panel, { index: state.index })}
                  </div>
                </div>
              )}
            </div>
            {isOpen && (
              <DossierClip current={state.index + 1} total={sheets.length} />
            )}
            <div className="absolute inset-x-[6%] bottom-[2.5%] z-30 flex items-center text-[oklch(0.92_0.012_85)] justify-between font-mono text-[0.65rem] uppercase tracking-widest">
              <button
                type="button"
                onClick={() => dispatch({ type: "prev" })}
                className="px-2 py-1 hover:underline focus-visible:outline-2 focus-visible:outline-current"
              >
                ↑ Anterior
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "close" })}
                className="px-2 py-1 opacity-70 hover:underline focus-visible:outline-2 focus-visible:outline-current"
              >
                Fechar pasta
              </button>
              <button
                type="button"
                disabled={state.index === sheets.length - 1}
                onClick={() => dispatch({ type: "next" })}
                className="px-2 py-1 hover:underline disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-current"
              >
                Próxima ↓
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
                  readFlags={sheets.map((s) => readIds.has(s.id))}
                  onOpen={() => dispatch({ type: "open" })}
                />
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-black transition-opacity duration-[900ms]",
                    BOARD_CLIP,
                  )}
                  style={{ opacity: isOpen ? 0.6 : 0 }}
                />
              </div>
              <div
                className="dossier-board-inside absolute inset-0 overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)]"
                aria-hidden={isOpen ? undefined : true}
                inert={isOpen ? undefined : true}
              >
                <div
                  ref={indexRef}
                  className="absolute top-[7%] right-[24%] bottom-[12%] left-[12%] -rotate-[0.6deg]"
                >
                  {index}
                  <Paperclip className="absolute -top-5 left-6 z-20 h-14 w-5 text-[oklch(0.78_0.01_250)] drop-shadow-[1px_2px_1px_rgb(0_0_0/0.5)]" />
                </div>
                <div
                  aria-hidden
                  className="dossier-board absolute inset-x-0 bottom-0 h-[20%] shadow-[0_-6px_14px_rgb(0_0_0/0.35)] [clip-path:polygon(0_45%,58%_0,100%_38%,100%_100%,0_100%)]"
                />
                <p className="absolute right-[6%] bottom-[4%] font-mono text-[0.62rem] uppercase tracking-[0.2em] opacity-60">
                  {cover.code} · verso da capa
                </p>
              </div>
            </div>
          </div>
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
