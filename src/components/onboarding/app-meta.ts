import {
  BookOpen,
  Code,
  type LucideIcon,
  PenTool,
  StickyNote,
} from "lucide-react";
import { type Messages, useTranslations } from "next-intl";
import { useCallback } from "react";
import type { PlatformApp } from "@/types/api.types";

interface Meta {
  icon: LucideIcon;
  /** Whether the app already has screens in this front-end. */
  available: boolean;
  /**
   * Per-app accent: text color on light cards and on the inverted (selected)
   * card; `paper` is the ficha stock, read with ink text in every theme.
   */
  accent: { text: string; inverted: string; badge: string; paper: string };
}

const ACCENTS = {
  blklight: {
    text: "text-blklight-500 dark:text-blklight-400",
    inverted: "text-blklight-400 dark:text-blklight-500",
    badge: "bg-blklight-400 border-blklight-400",
    paper: "bg-blklight-300",
  },
  bluesky: {
    text: "text-bluesky-500 dark:text-bluesky-400",
    inverted: "text-bluesky-400 dark:text-bluesky-500",
    badge: "bg-bluesky-400 border-bluesky-400",
    paper: "bg-bluesky-300",
  },
  orange: {
    text: "text-orange-500 dark:text-orange-400",
    inverted: "text-orange-400 dark:text-orange-500",
    badge: "bg-orange-400 border-orange-400",
    paper: "bg-orange-300",
  },
  magenta: {
    text: "text-magenta-500 dark:text-magenta-400",
    inverted: "text-magenta-400 dark:text-magenta-500",
    badge: "bg-magenta-400 border-magenta-400",
    paper: "bg-magenta-300",
  },
};

// shortcut: copy for known apps lives in the `apps.<slug>` messages until the API seed carries localized tagline, category and descriptions.
const META: Record<string, Meta> = {
  publisher: {
    icon: PenTool,
    available: true,
    accent: ACCENTS.blklight,
  },
  reader: {
    icon: BookOpen,
    available: false,
    accent: ACCENTS.bluesky,
  },
  "dev-tools": {
    icon: Code,
    available: false,
    accent: ACCENTS.orange,
  },
  canvas: {
    icon: StickyNote,
    available: false,
    accent: ACCENTS.magenta,
  },
};

type KnownApp = keyof Messages["apps"];

/** Returns `appMeta(app)`: icon, accent and availability plus copy in the active locale. */
export function useAppMeta() {
  const t = useTranslations("apps");
  return useCallback(
    (
      app: Pick<PlatformApp, "slug" | "description"> &
        Partial<Pick<PlatformApp, "tagline" | "category">>,
    ) => {
      const meta = META[app.slug];
      const known = meta ? (app.slug as KnownApp) : null;
      return {
        icon: meta?.icon ?? null,
        tagline: known
          ? t(`${known}.tagline`)
          : (app.tagline ?? app.category ?? ""),
        description: known
          ? t(`${known}.description`)
          : (app.description ?? ""),
        features: known
          ? [
              t(`${known}.feature1`),
              t(`${known}.feature2`),
              t(`${known}.feature3`),
            ]
          : [],
        idealFor: known ? t(`${known}.idealFor`) : "",
        available: meta?.available ?? false,
        accent: meta?.accent ?? ACCENTS.blklight,
      };
    },
    [t],
  );
}
