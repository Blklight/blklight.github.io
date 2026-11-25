import type { DossierSection, DossierTab } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

const EAR_TEXT =
  "font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Divider ears on the outer edge and inner tabs on the top edge, both cut on
 * the diagonal. They stick out of the folder, so they show even when closed.
 * shortcut: fixed slots by percentage; the measured side→top rail with "+N" comes in phase 3.
 */
export function DossierTabs({
  sections,
  activeSectionId,
  onSection,
  tabs,
  activeTab,
  onTab,
}: {
  sections: DossierSection[];
  activeSectionId?: string;
  onSection: (id: string) => void;
  tabs: DossierTab[];
  activeTab?: string;
  onTab: (id: string) => void;
}) {
  const slot = Math.min(13, 84 / Math.max(sections.length, 1));
  return (
    <>
      <nav aria-label="Divisórias" className="contents">
        {sections.map((s, i) => {
          const active = s.id === activeSectionId;
          return (
            <button
              key={s.id}
              type="button"
              aria-current={active ? "true" : undefined}
              onClick={() => onSection(s.id)}
              className={cn(
                EAR_TEXT,
                "background-texture absolute left-full flex items-center justify-center text-[oklch(0.18_0_0)] transition-[width,filter] duration-200 [writing-mode:vertical-rl] [clip-path:polygon(0_0,100%_0.9rem,100%_calc(100%-0.9rem),0_100%)] hover:brightness-110",
                active ? "w-9" : "w-7 brightness-[0.8]",
              )}
              style={{
                top: `${6 + i * slot}%`,
                height: `${slot - 1}%`,
                backgroundColor: s.color,
              }}
            >
              {s.title}
            </button>
          );
        })}
      </nav>
      <div
        role="tablist"
        aria-label="Abas do dossiê"
        className="absolute right-[8%] bottom-full flex gap-0.5"
      >
        {tabs.map((t) => {
          const active = t.id === activeTab;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onTab(t.id)}
              className={cn(
                EAR_TEXT,
                "px-6 pt-1.5 pb-1 [clip-path:polygon(0.7rem_0,calc(100%-0.7rem)_0,100%_100%,0_100%)]",
                active
                  ? "paper-grain-overlay relative isolate text-foreground"
                  : "dossier-board-inside",
              )}
            >
              <span className="relative z-10">{t.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
