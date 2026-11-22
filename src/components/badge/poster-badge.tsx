"use client";

import type { ReactNode } from "react";
import { BadgeFlip, Portrait, statusLabel } from "./badge-flip";
import { SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const GRID =
  "linear-gradient(rgb(29 29 29 / 0.35) 1px, transparent 1px) 0 0 / 3rem 3rem, linear-gradient(90deg, rgb(29 29 29 / 0.35) 1px, transparent 1px) 0 0 / 3rem 3rem";
const STRIPES =
  "repeating-linear-gradient(-45deg, var(--color-light) 0 8px, var(--color-orange-500) 8px 16px)";

const Block = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => <div className={`bg-light ${className}`}>{children}</div>;

/** Poster: orange grid, white blocks, a huge portrait, striped spine with the handle. */
export const PosterBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const shell = (children: ReactNode) => (
    <div className="flex size-full text-dark">
      <div
        className="flex min-w-0 flex-1 flex-col gap-3 p-4"
        style={{ background: GRID }}
      >
        {children}
      </div>
      <div className="flex w-10 shrink-0 flex-col border-l border-dark">
        <div className="flex-1" style={{ background: STRIPES }} />
        <p className="bg-dark py-2 text-center font-sans text-xl font-black uppercase leading-none text-light [writing-mode:vertical-rl] rotate-180">
          {handle}
        </p>
      </div>
    </div>
  );

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-xs border border-dark bg-orange-500"
      front={shell(
        <>
          <Block className="p-3">
            <p className="font-sans text-3xl font-black leading-[0.95] tracking-tighter wrap-anywhere line-clamp-2">
              {name}
            </p>
            <p className="mt-2 text-right font-sans text-[0.65rem] font-bold uppercase leading-tight">
              Membro
              <br />
              Blklight
              <br />
              Verificado
            </p>
          </Block>
          <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_auto]">
            <Portrait
              name={name}
              avatarUrl={avatarUrl}
              className="size-full min-h-0"
              fallbackClassName="bg-light text-7xl tracking-tighter"
            />
            <div className="flex w-24 flex-col">
              <Block className="flex flex-1 items-center justify-center">
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full border-[3px] border-dark font-sans text-lg font-black"
                >
                  R
                </span>
              </Block>
              <div className="bg-dark p-2 font-sans text-sm font-black leading-tight text-orange-500">
                Status
                <br />
                {statusLabel(status)}
              </div>
            </div>
          </div>
          <Block className="p-3">
            <p className="font-sans text-xs font-bold leading-snug">
              Escreve, dá forma ao papel e publica em blklight.dev/{handle}.
            </p>
          </Block>
          <div className="flex justify-between font-sans text-[0.6rem] font-black uppercase">
            <span>Desde {since}</span>
            <span>ID {memberId}</span>
          </div>
        </>,
      )}
      back={shell(
        <>
          <Block className="p-3">
            <p className="font-sans text-xl font-black tracking-tighter">
              Ficha
            </p>
            <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 font-sans text-xs">
              <dt className="font-bold">Perfil</dt>
              <dd className="truncate">blklight.dev/{handle}</dd>
              <dt className="font-bold">Desde</dt>
              <dd>{since}</dd>
              <dt className="font-bold">ID</dt>
              <dd>{memberId}</dd>
            </dl>
          </Block>
          <Block className="p-3">
            <p className="mb-2 font-sans text-xs font-black uppercase">Apps</p>
            <ul className="flex flex-wrap gap-1.5">
              {apps.map((app) => (
                <li
                  key={app.id}
                  className="bg-dark px-1.5 py-0.5 font-sans text-xs font-bold text-orange-500"
                >
                  {app.name}
                </li>
              ))}
              {apps.length === 0 && <li className="text-xs">Nenhum app</li>}
            </ul>
          </Block>
          {data.socials && data.socials.length > 0 && (
            <Block className="mt-auto p-3">
              <SocialRow links={data.socials} />
            </Block>
          )}
        </>,
      )}
    />
  );
};
