import type { DossierSection, DossierTab } from "@/features/dossier/types";
import { cn } from "@/lib/utils";

const EAR =
  "font-mono text-[0.65rem] uppercase tracking-widest focus-visible:outline-2 focus-visible:outline-ring";

/** Phase 1: flat lists. Ear placement along the side/top rail comes later. */
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
  onTab: (id: string | undefined) => void;
}) {
  return (
    <>
      <nav
        aria-label="Divisórias"
        className="absolute top-12 left-full flex flex-col gap-1"
      >
        {sections.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-current={s.id === activeSectionId ? "true" : undefined}
            onClick={() => onSection(s.id)}
            className={cn(
              EAR,
              "rounded-r-md px-2 py-3 text-left [writing-mode:vertical-rl]",
              s.id === activeSectionId ? "text-background" : "text-foreground",
            )}
            style={{
              background: s.id === activeSectionId ? s.color : undefined,
              borderLeft: `3px solid ${s.color ?? "currentColor"}`,
            }}
          >
            {s.title}
          </button>
        ))}
      </nav>
      <div
        role="tablist"
        aria-label="Abas do dossiê"
        className="absolute right-6 bottom-full flex gap-1"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={t.id === activeTab}
            onClick={() => onTab(t.id === activeTab ? undefined : t.id)}
            className={cn(
              EAR,
              "rounded-t-md px-3 py-1.5",
              t.id === activeTab
                ? "bg-card text-card-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </>
  );
}
