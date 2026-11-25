"use client";

import { type ReactNode, useId, useState } from "react";
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
import { DossierCover } from "./dossier-cover";
import { DossierFocus } from "./dossier-focus";
import { DossierSheet } from "./dossier-sheet";
import { DossierSidebar } from "./dossier-sidebar";
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
  tabs?: DossierTab[];
  readIds: ReadonlySet<string>;
  initialState?: DossierState;
  renderCard: (
    sheet: DossierSheetData<T>,
    ctx: DossierCardContext,
  ) => ReactNode;
  renderTab?: (
    tabId: string,
    ctx: { index: number; goTo: (index: number) => void },
  ) => ReactNode;
  /** Must return the same promise for the same sheet (cached loader). */
  getBody: (sheet: DossierSheetData<T>) => Promise<string>;
  onFocusChange?: (sheet: DossierSheetData<T> | undefined) => void;
}

/** Fixed-height folder: never grows with its content. */
const FOLDER =
  "relative mx-auto aspect-[17/22] h-[min(85vh,900px)] max-w-full rounded-lg bg-foreground p-4";

export function Dossier<T>({
  cover,
  sections,
  sheets,
  tabs = [],
  readIds,
  initialState,
  renderCard,
  renderTab,
  getBody,
  onFocusChange,
}: DossierProps<T>) {
  const uid = useId();
  const [state, dispatch] = useDossierState(sheets.length, initialState);
  const [activeTab, setActiveTab] = useState<string>();
  const sheet = sheets[state.index];
  const done = sheets.filter((s) => readIds.has(s.id)).length;

  const focus = (index: number) => {
    dispatch({ type: "focus", index });
    setActiveTab(undefined);
    onFocusChange?.(sheets[index]);
  };
  const unfocus = () => {
    dispatch({ type: "unfocus" });
    onFocusChange?.(undefined);
  };
  const goTo = (index: number) => {
    dispatch({ type: "goTo", index });
    setActiveTab(undefined);
  };

  const focused = state.mode === "focus" && sheet;

  return (
    <section aria-roledescription="dossiê" aria-label={cover.title}>
      <div
        aria-hidden={focused ? true : undefined}
        inert={focused ? true : undefined}
        className={cn(
          FOLDER,
          focused &&
            "pointer-events-none fixed inset-x-0 top-1/2 -translate-y-1/2 scale-90 opacity-40 blur-[2px]",
        )}
      >
        {state.mode === "closed" || !sheet ? (
          <DossierCover
            cover={cover}
            done={done}
            total={sheets.length}
            onOpen={() => dispatch({ type: "open" })}
          />
        ) : (
          <>
            <DossierClip current={state.index + 1} total={sheets.length} />
            <DossierTabs
              sections={sections}
              activeSectionId={sheet.sectionId}
              onSection={(id) => {
                const i = sheets.findIndex((s) => s.sectionId === id);
                if (i >= 0) goTo(i);
              }}
              tabs={tabs}
              activeTab={activeTab}
              onTab={setActiveTab}
            />
            <div className="h-[calc(100%-2.5rem)]">
              <DossierSheet
                labelledBy={`${uid}-${sheet.id}`}
                accent={sections.find((s) => s.id === sheet.sectionId)?.color}
              >
                {renderCard(sheet, {
                  index: state.index,
                  titleId: `${uid}-${sheet.id}`,
                  open: () => focus(state.index),
                })}
              </DossierSheet>
            </div>
            {activeTab && renderTab && (
              <div
                role="tabpanel"
                aria-label={tabs.find((t) => t.id === activeTab)?.label}
                className="absolute inset-4 z-10 overflow-y-auto bg-card p-8 text-card-foreground shadow-lg"
              >
                {renderTab(activeTab, { index: state.index, goTo })}
              </div>
            )}
            <div className="absolute right-4 bottom-2 left-4 z-20 flex justify-between font-mono text-xs text-background">
              <button
                type="button"
                onClick={() => dispatch({ type: "prev" })}
                className="px-2 py-1 hover:underline"
              >
                ↑ Anterior
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "close" })}
                className="px-2 py-1 hover:underline"
              >
                Fechar pasta
              </button>
              <button
                type="button"
                disabled={state.index === sheets.length - 1}
                onClick={() => dispatch({ type: "next" })}
                className="px-2 py-1 hover:underline disabled:opacity-40"
              >
                Próxima ↓
              </button>
            </div>
          </>
        )}
      </div>

      {focused && (
        <DossierFocus
          key={sheet.id}
          sheet={sheet}
          bodyPromise={getBody(sheet)}
          onClose={unfocus}
          sidebar={
            <DossierSidebar
              sections={sections}
              sheets={sheets}
              currentIndex={state.index}
              readIds={readIds}
              onSelect={focus}
            />
          }
        />
      )}
    </section>
  );
}
