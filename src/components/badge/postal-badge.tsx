"use client";

import type { ReactNode } from "react";
import {
  HoloSeal,
  type OrgStampData,
  TriangleStamp,
  WaxStamp,
} from "@/components/stamps/org-stamps";
import { formatSignatureDate } from "@/features/documents/design/signature";
import { BadgeFlip, BadgeLogo, Portrait, statusLabel } from "./badge-flip";
import { SocialRow } from "./social-row";
import type { BadgeData, BadgeModelProps, BadgeStatus } from "./types";

const PAPER = "#dcdcd6";
const INK = "#4b4b47";
const CHARCOAL = "#2b2b2b";

/** The member as a postmark: Blklight stamps the account's start date. */
export const memberStamp = (
  data: BadgeData,
  status?: BadgeStatus,
): OrgStampData => {
  const date = formatSignatureDate(data.memberSince);
  return {
    name: "Blklight",
    handle: data.handle,
    city: "blklight.dev",
    date: date.replace(/\//g, "·"),
    shortDate: date.replace(/(\d{2})\/(\d{2})\/\d{2}(\d{2})/, "$1/$2/$3"),
    ref: data.memberId,
    tagline: "Escrita e identidade",
    since: date.slice(-4),
    status: status === "draft" ? "Em montagem" : "Membro ativo",
  };
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="border-b border-current/30 px-2.5 py-1.5 last:border-b-0">
    <dt className="font-mono text-[0.6rem] uppercase tracking-wider opacity-70">
      {label}:
    </dt>
    <dd className="truncate text-right text-sm">{children}</dd>
  </div>
);

const Pair = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-baseline justify-between gap-3 font-mono text-[0.65rem] uppercase">
    <dt className="opacity-60">{label}:</dt>
    <dd className="truncate">{children}</dd>
  </div>
);

/** Postal: grey card with a perforation, address fields, a wax stamp and a holo date seal; charcoal back. */
export const PostalBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberId, apps = [] } = data;
  const stamp = memberStamp(data, status);

  return (
    <BadgeFlip
      className={className}
      faceClassName="rounded-xl"
      front={
        <div
          className="flex size-full flex-col"
          style={{ background: PAPER, color: INK }}
        >
          <p className="px-5 pt-5 pb-4 font-sans text-2xl font-medium tracking-tight">
            Membro via Blklight
          </p>
          <span
            aria-hidden
            className="block border-t-2 border-dashed border-current/50"
          />

          <div className="grid grid-cols-[1fr_auto] gap-2 px-4 pt-5">
            <dl className="min-w-0 border border-current/40">
              <Field label="Para">{name}</Field>
              <Field label="Perfil">@{handle}</Field>
              <Field label="Status">{statusLabel(status)}</Field>
            </dl>
            <div className="relative flex w-24 items-center justify-center border border-current/40">
              <Portrait
                name={name}
                avatarUrl={avatarUrl}
                className="size-20 opacity-90"
                fallbackClassName="bg-current/10 text-3xl"
              />
            </div>
          </div>

          <div className="relative mx-4 mt-4 flex-1 border border-current/40 px-3 pt-2 pb-3">
            <div aria-hidden className="flex justify-between">
              {Array.from({ length: 6 }, (_, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: fixed decorative holes
                  key={i}
                  className="size-2.5 rounded-full border border-current/50"
                />
              ))}
            </div>
            <pre className="mt-3 overflow-hidden font-mono text-[0.65rem] leading-relaxed whitespace-pre-wrap">
              {`fetch("/${handle}")\n  .then(membro => membro.apps)\n  // ${apps.map((app) => app.name).join(", ") || "nenhum app"}`}
            </pre>
            <WaxStamp
              data={stamp}
              rotate={-8}
              className="absolute right-3 bottom-2 w-28 opacity-85"
            />
            <HoloSeal
              data={stamp}
              rotate={-6}
              className="absolute -top-7 right-3 w-24"
            />
          </div>

          <div className="flex justify-between px-5 py-3 font-mono text-[0.6rem] uppercase tracking-wider">
            <span>Postado</span>
            <span>{memberId}</span>
          </div>
        </div>
      }
      back={
        <div
          className="flex size-full flex-col items-center px-5 py-6 text-[#cfcfca]"
          style={{ background: CHARCOAL }}
        >
          <TriangleStamp data={stamp} className="w-36" worn={false} />
          <dl className="mt-5 grid w-full grid-cols-2 gap-x-5 gap-y-1">
            <Pair label="ID">{memberId}</Pair>
            <Pair label="Desde">{stamp.since}</Pair>
            <Pair label="Apps">{apps.length}</Pair>
            <Pair label="Status">{statusLabel(status)}</Pair>
          </dl>

          <div className="mt-auto flex w-full flex-col items-center">
            <span aria-hidden className="block h-px w-40 bg-current/60" />
            <p className="flex items-center gap-2 py-2 font-mono text-4xl leading-none uppercase tracking-tight">
              <BadgeLogo tone="light" size={28} />
              Blklight
            </p>
            <span aria-hidden className="block h-px w-40 bg-current/60" />
            <p className="mt-3 font-mono text-[0.6rem] uppercase tracking-wider opacity-70">
              Blklight \ transmissão nº {memberId}
            </p>
            {data.socials && data.socials.length > 0 && (
              <SocialRow links={data.socials} onDark className="mt-4" />
            )}
          </div>
        </div>
      }
    />
  );
};
