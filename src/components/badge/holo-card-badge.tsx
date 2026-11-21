"use client";

import { HoloCard } from "@/components/ui/holo-card";
import { SINCE } from "./classic-badge";
import type { BadgeModelProps } from "./types";

const BRANDING = {
  logo: "/blklight-white.svg",
  logoAlt: "Blklight",
  icon: "/blklight-white.svg",
  iconAlt: "",
};

/**
 * Holo card from ui.heygaia.io (src/components/ui/holo-card.tsx), fed with
 * badge data. Local background and logos; the remote sparkle GIF stays off.
 */
export const HoloCardBadge = ({ data, status, className }: BadgeModelProps) => {
  const apps = data.apps ?? [];
  return (
    <HoloCard
      className={className}
      width={288}
      height={448}
      showSparkles={false}
      branding={BRANDING}
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
        backgroundImage: "/badges/holo-bg.svg",
      }}
    />
  );
};
