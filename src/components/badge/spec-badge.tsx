"use client";

import type { ReactNode } from "react";
import { BadgeFlip, Portrait, statusLabel } from "./badge-flip";
import { SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

const NEON = "#22e31a";
const DASH = "border-dashed border-dark/70";

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-baseline gap-1 font-mono text-[0.65rem] uppercase">
    <dt className="shrink-0">{label}</dt>
    <span
      aria-hidden
      className="min-w-4 flex-1 -translate-y-1 border-b-2 border-dotted border-current opacity-60"
    />
    <dd className="max-w-[55%] shrink-0 truncate">{children}</dd>
  </div>
);

/** Spec sheet: white and neon green, dashed rules, a dotted-leader data table. */
export const SpecBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const since = SINCE.format(new Date(memberSince)).replace(".", "");

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-xs border border-dark bg-light text-dark"
      front={
        <div className="flex size-full flex-col">
          <div className="flex items-start justify-between gap-3 p-4">
            <span className="bg-dark px-2 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-light">
              Membro: {statusLabel(status)}
            </span>
            <Portrait
              name={name}
              avatarUrl={avatarUrl}
              className="size-20 shrink-0"
              fallbackClassName="text-3xl"
            />
          </div>
          <p className="px-4 font-sans text-3xl font-black leading-[0.95] tracking-tighter wrap-anywhere line-clamp-2">
            {name}
          </p>
          <p className="px-4 pt-1 font-mono text-xs">@{handle}</p>
          <div
            className={`mt-4 flex flex-1 flex-col border-t ${DASH} p-4`}
            style={{ background: NEON }}
          >
            <dl className="grid gap-1">
              <Row label="Perfil">blklight.dev/{handle}</Row>
              <Row label="Desde">{since}</Row>
              <Row label="ID">{memberId}</Row>
              <Row label="Apps">{apps.length}</Row>
              <Row label="Status">{statusLabel(status)}</Row>
            </dl>
            <div
              className={`mt-auto flex items-end justify-between border-t ${DASH} pt-3`}
            >
              <span
                aria-hidden
                className="font-sans text-4xl font-black leading-none tracking-[-0.15em]"
              >
                &gt;&gt;&gt;&gt;
              </span>
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full border-[3px] border-dark font-sans text-sm font-black"
              >
                R
              </span>
            </div>
          </div>
        </div>
      }
      back={
        <div className="flex size-full flex-col">
          <p
            className="bg-dark px-4 py-2 font-mono text-xs uppercase tracking-wider"
            style={{ color: NEON }}
          >
            Terminal de dados – {memberId}
          </p>
          <p className="px-4 pt-4 font-sans text-2xl font-black tracking-tighter">
            Módulos
          </p>
          <dl className={`mx-4 mt-2 grid gap-1 border-y ${DASH} py-2`}>
            {apps.map((app, i) => (
              <Row key={app.id} label={`[M${String(i + 1).padStart(2, "0")}]`}>
                {app.name}
              </Row>
            ))}
            {apps.length === 0 && <Row label="[M00]">Nenhum</Row>}
          </dl>
          <div className="mt-auto p-4" style={{ background: NEON }}>
            {data.socials && data.socials.length > 0 && (
              <SocialRow links={data.socials} />
            )}
            <p className="mt-3 font-mono text-[0.6rem] uppercase">
              Uso pessoal e intransferível
            </p>
          </div>
        </div>
      }
    />
  );
};
