"use client";

import { SINCE } from "./classic-badge";
import { HoloCard } from "./holo-card/holo-card";
import type { BadgeModelProps } from "./types";

/**
 * Holo card from ui.heygaia.io (adapted in ./holo-card), fed with badge data.
 * The member's photo is the card art; `accent` tints it like the original's color variants.
 */
export const HoloCardBadge = ({ data, status, className }: BadgeModelProps) => {
  const apps = data.apps ?? [];
  return (
    <HoloCard
      className={className}
      data={{
        name: data.name,
        subtitle: `@${data.handle}`,
        description:
          apps.length > 0
            ? `Apps: ${apps.map((a) => a.name).join(", ")}.`
            : "Nenhum app ainda.",
        primaryId: data.memberId,
        secondaryInfo: SINCE.format(new Date(data.memberSince)).replace(
          ".",
          "",
        ),
        badge: status === "draft" ? "Rascunho" : "Membro",
        backgroundImage: data.avatarUrl ?? undefined,
        overlayColor: data.accent,
        overlayOpacity: 35,
      }}
    />
  );
};
