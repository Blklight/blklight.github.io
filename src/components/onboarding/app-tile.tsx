"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import Link from "next/link";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";
import { CornerBrackets } from "./corner-brackets";
import {
  FichaFace,
  LockedVeil,
  SelectMark,
  SoonStamp,
} from "./simple-flip-card";

interface Props {
  app: Pick<PlatformApp, "id" | "slug" | "name" | "description">;
  /** Shows the checked mark instead of the app icon. */
  selected?: boolean;
  href?: string;
}

/**
 * Small square ficha: the onboarding card's cover at tile size (label and
 * mark on top, name and description inside the brackets), with the same tilt.
 */
export const AppTile = ({ app, selected = false, href }: Props) => {
  const meta = appMeta(app);
  const locked = !meta.available;
  const Icon = meta.icon;

  return (
    <Tilt
      maxTilt={8}
      perspective={800}
      className="group relative aspect-square"
    >
      <TiltContent className="relative size-full">
        <FichaFace
          corner="br"
          size="md"
          paper={meta.accent.paper}
          selected={selected}
          className="p-3.5"
        >
          {locked && <LockedVeil />}
          <div className="relative flex items-start justify-between gap-2">
            <span className="text-[0.65rem] uppercase leading-tight">
              {meta.tagline}
            </span>
            {locked ? (
              <SoonStamp className="px-1 py-0 text-[0.55rem]" />
            ) : selected ? (
              <SelectMark selected className="size-4 [&_svg]:size-2.5" />
            ) : (
              Icon && <Icon className="size-4 shrink-0" strokeWidth={1.75} />
            )}
          </div>
          <div className="relative mt-3 px-2.5 py-2">
            <CornerBrackets size="size-2" className="opacity-80" />
            <p className="font-mono text-sm font-medium uppercase leading-tight wrap-break-word group-hover:underline underline-offset-2">
              {app.name}
            </p>
            <p className="mt-1 text-[0.65rem] leading-snug opacity-80 line-clamp-2">
              {meta.description}
            </p>
          </div>
        </FichaFace>
      </TiltContent>
      {href && (
        <Link
          href={href}
          aria-label={app.name}
          className="absolute inset-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        />
      )}
    </Tilt>
  );
};
