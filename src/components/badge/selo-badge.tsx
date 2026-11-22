"use client";

import type { ReactNode } from "react";
import {
  GearStamp,
  LabelStamp,
  WaxStamp,
} from "@/components/stamps/org-stamps";
import { BadgeFlip, BadgeLogo, Portrait } from "./badge-flip";
import { memberStamp } from "./postal-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const ORANGE = "#ff6a13";

const Tile = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => (
  <div className={`relative rounded-2xl bg-[#2b2826] p-3 ${className ?? ""}`}>
    {children}
  </div>
);

/** Seal: four dark tiles meeting under a big wax seal with the member's name; orange label on the back. */
export const SeloBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberId } = data;
  const stamp = memberStamp(data, status);
  const seal = { ...stamp, name, city: `@${handle}`, handle: memberId };

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-2xl bg-[#0c0c0c]"
      front={
        <div className="relative grid size-full grid-cols-2 grid-rows-2 gap-1.5 p-1.5 font-mono text-[0.6rem] uppercase tracking-wider text-[#d6d3cf]">
          <Tile>
            <span className="flex items-center gap-1.5">
              <BadgeLogo tone="light" size={12} />
              Blklight {stamp.since}
            </span>
          </Tile>
          <Tile className="flex justify-end">
            <Portrait
              name={name}
              avatarUrl={avatarUrl}
              className="size-14 rounded-lg"
              fallbackClassName="bg-[#3a3734] text-xl"
            />
          </Tile>
          <Tile className="flex items-end">Membro</Tile>
          <Tile className="flex items-end justify-end normal-case">
            blklight.dev/{handle}
          </Tile>

          {/* Crosshair lines from the seal to each edge, like the reference tiles. */}
          <span
            aria-hidden
            className="absolute inset-x-1/2 top-10 h-12 w-px bg-current/60"
          />
          <span
            aria-hidden
            className="absolute inset-x-1/2 bottom-10 h-12 w-px bg-current/60"
          />
          <span
            aria-hidden
            className="absolute inset-y-1/2 left-6 h-px w-8 bg-current/60"
          />
          <span
            aria-hidden
            className="absolute inset-y-1/2 right-6 h-px w-8 bg-current/60"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <WaxStamp
              data={seal}
              worn={false}
              className="w-48 rounded-[2.5rem] bg-[#0c0c0c] text-[#eceae6]"
            />
          </div>
        </div>
      }
      back={
        <div
          className="flex size-full flex-col p-5 text-[#fff4ea]"
          style={{ background: ORANGE }}
        >
          <p className="font-sans text-3xl font-medium tracking-tight">
            Blklight
          </p>
          <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider opacity-80">
            Carimbo de membro
          </p>
          <div className="mt-6 flex items-start justify-between gap-3">
            <LabelStamp
              data={{ ...stamp, city: "blklight.dev", name: `@${handle}` }}
              className="w-40 border-2"
            />
            <GearStamp data={stamp} rotate={8} className="w-24 shrink-0" />
          </div>
          <div className="mt-auto">
            {data.socials && data.socials.length > 0 && (
              <SocialRow links={data.socials} onDark />
            )}
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-wider">
              Uso pessoal e intransferível · {memberId}
            </p>
          </div>
        </div>
      }
    />
  );
};
