"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BadgeFlip, BadgeLogo, Portrait, statusLabel } from "./badge-flip";
import { initials, SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const HAZARD =
  "repeating-linear-gradient(-45deg, var(--color-dark) 0 7px, transparent 7px 14px)";
const LINES =
  "repeating-linear-gradient(to bottom, var(--color-dark) 0 1px, transparent 1px 5px)";

const Cell = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => <div className={cn("border-dark", className)}>{children}</div>;

const Dots = () => (
  <span aria-hidden className="grid grid-cols-3 gap-1">
    {Array.from({ length: 6 }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: static decoration
      <span key={i} className="size-1.5 rounded-full bg-dark" />
    ))}
  </span>
);

/** Factory panel: orange plate, hairline cells, the handle in dotted pixel type on a black band. */
export const FactoryBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const year = new Date(memberSince).getFullYear();
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const frame = (children: ReactNode) => (
    <div className="flex size-full flex-col border border-dark text-dark">
      <div className="flex items-stretch border-b border-dark font-mono text-[0.6rem] uppercase tracking-wider">
        <span className="flex-1 px-2 py-1.5 truncate">
          Membro {"//"} {memberId}
        </span>
        <span className="flex items-center gap-1.5 bg-dark px-2 py-1.5 text-orange-500">
          <BadgeLogo tone="light" size={12} />
          Blklight
        </span>
      </div>
      <div
        aria-hidden
        className="h-2 border-b border-dark"
        style={{ background: LINES }}
      />
      {children}
    </div>
  );

  return (
    <BadgeFlip
      className={className}
      faceClassName="bg-orange-500 p-2.5"
      front={frame(
        <>
          <div className="flex items-center justify-between gap-2 border-b border-dark px-3 py-2">
            <Dots />
            <span className="font-sans text-sm font-black uppercase tracking-tighter">
              Blklight crew
            </span>
            <Dots />
          </div>
          <div className="border-b border-dark px-2 py-1 font-mono text-[0.6rem] uppercase tracking-wider">
            Sys.status: {statusLabel(status)} -- 0 falhas
          </div>
          <p className="bg-dark px-3 py-3 font-pixel-circle text-4xl uppercase leading-none text-orange-500 wrap-anywhere line-clamp-2">
            {handle}
          </p>
          <div className="grid flex-1 grid-cols-2 grid-rows-[auto_1fr]">
            <Cell className="col-span-2 border-b px-3 py-2">
              <p className="font-sans text-lg font-black uppercase leading-none tracking-tighter line-clamp-2">
                {name}
              </p>
            </Cell>
            <Cell className="relative border-r">
              <Portrait
                name={name}
                avatarUrl={avatarUrl}
                className="absolute inset-0 size-full mix-blend-multiply"
                fallbackClassName="text-5xl"
              />
            </Cell>
            <div className="flex flex-col">
              <Cell className="bg-dark px-2 py-1 text-center font-mono text-[0.6rem] uppercase text-orange-500">
                [[ desde {since} ]]
              </Cell>
              <Cell className="flex flex-1 items-center justify-center border-b font-sans text-3xl font-black tracking-tighter">
                © {year}
              </Cell>
              <div className="grid grid-cols-2">
                <Cell className="h-10 border-r">
                  <span
                    aria-hidden
                    className="block size-full"
                    style={{ background: HAZARD }}
                  />
                </Cell>
                <Cell className="grid place-items-center">
                  <span className="grid size-8 place-items-center rounded-full border-2 border-dark font-sans text-sm font-black">
                    {initials(name).charAt(0)}
                  </span>
                </Cell>
              </div>
            </div>
          </div>
        </>,
      )}
      back={frame(
        <div className="flex flex-1 flex-col gap-3 p-3">
          <p className="bg-dark px-2 py-2 font-pixel-circle text-2xl uppercase text-orange-500">
            Módulos
          </p>
          <ul className="grid gap-1 font-mono text-xs uppercase">
            {apps.map((app, i) => (
              <li
                key={app.id}
                className="flex justify-between border-b border-dark py-1"
              >
                <span>Unit {String(i + 1).padStart(2, "0")}</span>
                <span className="font-bold">{app.name}</span>
              </li>
            ))}
            {apps.length === 0 && <li>Nenhum módulo</li>}
          </ul>
          <p className="font-mono text-[0.6rem] uppercase leading-relaxed tracking-wider">
            Perfil: blklight.dev/{handle}
            <br />
            Missão pronta &gt;
          </p>
          <div
            aria-hidden
            className="h-8 border border-dark"
            style={{ background: HAZARD }}
          />
          {data.socials && data.socials.length > 0 && (
            <SocialRow links={data.socials} className="mt-auto" />
          )}
        </div>,
      )}
    />
  );
};
