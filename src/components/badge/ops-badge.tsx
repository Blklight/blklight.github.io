"use client";

import type { ReactNode } from "react";
import { BadgeFlip, Portrait, statusLabel } from "./badge-flip";
import { SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const STRIPES =
  "repeating-linear-gradient(-55deg, #8e9396 0 6px, transparent 6px 14px)";

const Redacted = ({ w }: { w: string }) => (
  <span
    aria-hidden
    className="inline-block h-[0.8em] translate-y-[0.1em] bg-[#8e9396]"
    style={{ width: w }}
  />
);

/** Ops terminal: graphite card, grey ink, pixel name, redacted copy and a log box. */
export const OpsBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const year = new Date(memberSince).getFullYear();
  const frame = (children: ReactNode) => (
    <div className="flex size-full flex-col gap-4 p-5 text-[#8e9396]">
      <div
        aria-hidden
        className="h-10 shrink-0"
        style={{ background: STRIPES }}
      />
      {children}
      <p className="mt-auto font-sans text-[0.65rem] font-bold uppercase tracking-tight">
        Uso pessoal / Blklight / {year}
      </p>
    </div>
  );

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-xs bg-[#1e1f21]"
      front={frame(
        <>
          <div className="grid grid-cols-2 gap-3 font-sans text-xs font-bold leading-tight tracking-tight">
            <p>
              Membro verificado
              <br />
              Status – {statusLabel(status)}
            </p>
            <p>
              Desde {since}
              <br />
              Status – Online
            </p>
          </div>
          <p className="font-pixel text-4xl uppercase leading-[0.9] wrap-anywhere line-clamp-3">
            {name}
          </p>
          <p className="font-mono text-[0.65rem] leading-relaxed">
            @{handle} escreve na <Redacted w="3.5rem" /> Blklight, dá forma ao
            papel e <Redacted w="5rem" /> publica.
          </p>
          <div className="flex border-2 border-[#8e9396]">
            <Portrait
              name={name}
              avatarUrl={avatarUrl}
              className="size-16 shrink-0 opacity-80"
              fallbackClassName="bg-[#8e9396] text-2xl text-[#1e1f21]"
            />
            <div className="flex flex-1 flex-col justify-center border-l-2 border-[#8e9396] px-3 font-sans text-sm font-black tracking-tight">
              <span>Blklight</span>
              <span>Log ID: {memberId}</span>
            </div>
          </div>
          <p className="flex justify-between bg-[#8e9396] px-3 py-1.5 font-sans text-xs font-black tracking-tight text-[#1e1f21]">
            <span>Escrita</span>
            <span aria-hidden>----</span>
            <span>Publicação</span>
          </p>
        </>,
      )}
      back={frame(
        <>
          <p className="font-pixel text-2xl uppercase">Acesso</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[0.7rem] uppercase">
            <dt>Perfil</dt>
            <dd className="truncate text-right">blklight.dev/{handle}</dd>
            <dt>Log ID</dt>
            <dd className="text-right">{memberId}</dd>
            <dt>Desde</dt>
            <dd className="text-right">{since}</dd>
          </dl>
          <ul className="flex flex-wrap gap-1.5">
            {apps.map((app) => (
              <li
                key={app.id}
                className="border border-[#8e9396] px-1.5 py-0.5 font-mono text-[0.65rem] uppercase"
              >
                {app.name}
              </li>
            ))}
            {apps.length === 0 && (
              <li className="font-mono text-[0.65rem] uppercase">Nenhum app</li>
            )}
          </ul>
          {data.socials && data.socials.length > 0 && (
            <SocialRow links={data.socials} onDark className="mt-2" />
          )}
        </>,
      )}
    />
  );
};
