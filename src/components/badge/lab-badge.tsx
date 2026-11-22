"use client";

import type { ReactNode } from "react";
import { BadgeFlip, BadgeLogo, Portrait, statusLabel } from "./badge-flip";
import { SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const BLUE = "#0447cf";
const SKY = "#0898eb";
const PINK = "#f31b9f";
const HATCH =
  "repeating-linear-gradient(-45deg, var(--color-dark) 0 2px, transparent 2px 7px)";
const CHECKER =
  "repeating-conic-gradient(var(--color-dark) 0 25%, #7b02a7 0 50%) 0 0 / 12px 12px";

const Plus = ({ className }: { className: string }) => (
  <span
    aria-hidden
    className={`absolute font-mono text-sm leading-none ${className}`}
  >
    +
  </span>
);

/** Research lab: blue and magenta panels, hatched blocks, a checker strip, giant initials. */
export const LabBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const frame = (children: ReactNode) => (
    <div className="relative flex size-full flex-col gap-2 p-3 text-dark">
      <div className="flex items-center justify-between">
        <span aria-hidden className="h-4 w-20" style={{ background: HATCH }} />
        <span className="bg-dark px-2 py-0.5 font-sans text-[0.6rem] font-bold uppercase text-light">
          {memberId} · Membro
        </span>
      </div>
      {children}
    </div>
  );

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-xs bg-[#c4c4c4]"
      front={frame(
        <div
          className="grid flex-1 grid-cols-[1fr_4.5rem] grid-rows-[auto_1fr_auto] gap-0 overflow-hidden"
          style={{ background: BLUE }}
        >
          <div className="col-span-2 flex items-start justify-between bg-light p-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 font-sans text-xs font-bold">
                <BadgeLogo size={14} />
                Blklight
              </p>
              <p className="mt-2 font-sans text-3xl font-black leading-[0.95] tracking-tighter wrap-anywhere line-clamp-2">
                {name}
              </p>
            </div>
          </div>
          <div className="relative min-h-0" style={{ background: SKY }}>
            <Portrait
              name={name}
              avatarUrl={avatarUrl}
              className="absolute inset-0 size-full mix-blend-multiply"
              fallbackClassName="text-[6.5rem] leading-none tracking-tighter"
            />
            <Plus className="left-2 top-1.5 text-light" />
            <Plus className="right-2 bottom-1.5 text-light" />
          </div>
          <div className="flex flex-col" style={{ background: PINK }}>
            <p className="flex-1 py-2 text-center font-sans text-2xl font-black uppercase leading-none text-dark/80 [writing-mode:vertical-rl]">
              {handle}
            </p>
            <span aria-hidden className="h-10" style={{ background: HATCH }} />
          </div>
          <div className="col-span-2 flex items-center justify-between bg-light px-3 py-2 font-sans text-[0.65rem] font-bold uppercase">
            <span>Desde {since}</span>
            <span>Status · {statusLabel(status)}</span>
          </div>
          <span
            aria-hidden
            className="col-span-2 h-3"
            style={{ background: CHECKER }}
          />
        </div>,
      )}
      back={frame(
        <div className="flex flex-1 flex-col gap-2">
          <div className="p-3 text-light" style={{ background: BLUE }}>
            <p className="font-sans text-xl font-black tracking-tighter">
              Índice
            </p>
            <ul className="mt-2 space-y-1 font-sans text-sm font-bold">
              {apps.map((app) => (
                <li key={app.id} style={{ color: PINK }}>
                  ▸ {app.name}
                </li>
              ))}
              {apps.length === 0 && <li>Nenhum app</li>}
            </ul>
          </div>
          <div className="flex-1 bg-light p-3 font-sans text-xs">
            <p className="font-bold">blklight.dev/{handle}</p>
            <p className="mt-1 opacity-70">
              Desde {since} · ID {memberId}
            </p>
            {data.socials && data.socials.length > 0 && (
              <SocialRow links={data.socials} className="mt-4" />
            )}
          </div>
          <span aria-hidden className="h-8" style={{ background: HATCH }} />
        </div>,
      )}
    />
  );
};
