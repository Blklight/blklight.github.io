"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { CornerBrackets } from "@/components/onboarding/corner-brackets";
import { FLAT } from "@/components/onboarding/simple-flip-card";
import { cn } from "@/lib/utils";
import { initials, SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

// Brushed steel: fine horizontal grain over a cool gradient.
const STEEL =
  "repeating-linear-gradient(0deg, rgb(255 255 255 / 0.05) 0 1px, transparent 1px 3px), linear-gradient(160deg, #d9dde1 0%, #aeb4ba 45%, #c9ced3 70%, #9aa1a8 100%)";
const HAZARD =
  "repeating-linear-gradient(-45deg, #f5c400 0 10px, #1d1d1d 10px 20px)";

/** Bars from the member id: each character sets a bar width, so every badge has its own code. */
const Barcode = ({ value }: { value: string }) => (
  <span aria-hidden className="flex h-7 items-stretch gap-[2px]">
    {Array.from(`${value}${value}`).map((char, i) => (
      <span
        // biome-ignore lint/suspicious/noArrayIndexKey: bars are positional and never reorder
        key={i}
        className="bg-dark"
        style={{ width: `${(char.charCodeAt(0) % 3) + 1}px` }}
      />
    ))}
  </span>
);

const Rivet = ({ className }: { className: string }) => (
  <span
    aria-hidden
    className={cn(
      "absolute size-2.5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#f4f5f6,#7d848b_60%,#4b5056)] shadow-[0_1px_0_rgb(255_255_255/0.5),inset_0_-1px_1px_rgb(0_0_0/0.4)]",
      className,
    )}
  />
);

/**
 * Industrial badge: chamfered steel plate with rivets, a hazard stripe,
 * stencil type and a barcode. Same data and flip as the other models.
 */
export const IndustrialBadge = ({
  data,
  status,
  className,
}: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const [flipped, setFlipped] = useState(false);
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const toggle = () => setFlipped((f) => !f);

  return (
    <div className={cn("w-72 max-w-full", className)}>
      <Tilt maxTilt={6} perspective={1000} style={FLAT}>
        <TiltContent className="perspective-1000 relative h-[28rem]">
          {/* biome-ignore lint/a11y/useSemanticElements: both faces hold block content, which a <button> can't contain */}
          <div
            role="button"
            tabIndex={0}
            onClick={toggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
              }
            }}
            aria-label={
              flipped
                ? "Virar crachá para a frente"
                : "Virar crachá para o verso"
            }
            className="relative block size-full cursor-pointer preserve-3d transition-transform duration-500 ease-out outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            <Plate hidden={flipped}>
              <div className="flex items-center justify-between font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                <span>Acesso · Membro</span>
                <span>Nº {memberId}</span>
              </div>

              <div className="mt-4 flex gap-4">
                <div className="relative size-24 shrink-0 p-1">
                  <CornerBrackets size="size-2.5" />
                  {avatarUrl ? (
                    // biome-ignore lint/performance/noImgElement: avatar can come from any OAuth host, not in next/image remotePatterns
                    <img
                      src={avatarUrl}
                      alt=""
                      className="size-full object-cover grayscale contrast-125"
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center bg-dark font-mono text-3xl font-bold text-[#f5c400]">
                      {initials(name)}
                    </span>
                  )}
                </div>
                <dl className="grid content-start gap-1.5 font-mono text-[0.6rem] uppercase tracking-wider">
                  <Spec label="Setor">Escrita</Spec>
                  <Spec label="Nível">
                    {status === "draft" ? "Provisório" : "Pleno"}
                  </Spec>
                  <Spec label="Emitido">{since}</Spec>
                </dl>
              </div>

              <p className="mt-5 font-mono text-2xl font-black uppercase leading-none tracking-tight wrap-anywhere line-clamp-2">
                {name}
              </p>
              <p className="mt-1 font-mono text-xs tracking-wider">@{handle}</p>

              {data.socials && data.socials.length > 0 && (
                <SocialRow links={data.socials} className="mt-auto mb-3" />
              )}

              <div className="mt-auto flex items-end justify-between border-t-2 border-dark pt-2.5">
                <span className="flex items-center gap-1.5">
                  <Image
                    src="/blklight-black.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                  <span className="font-mono text-xs font-black uppercase tracking-[0.15em]">
                    Blklight
                  </span>
                </span>
                <Barcode value={memberId} />
              </div>
            </Plate>

            <Plate back hidden={!flipped}>
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                Especificações
              </p>
              <dl className="mt-3 grid gap-px border-2 border-dark bg-dark font-mono text-[0.65rem] uppercase">
                <SpecRow label="Titular">{name}</SpecRow>
                <SpecRow label="Perfil">blklight.dev/{handle}</SpecRow>
                <SpecRow label="Emitido">{since}</SpecRow>
                <SpecRow label="Situação">
                  {status === "draft" ? "Em montagem" : "Ativo"}
                </SpecRow>
              </dl>

              <p className="mt-4 mb-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                Módulos
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {apps.map((app, i) => (
                  <li
                    key={app.id}
                    className="border-2 border-dark px-1.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase"
                  >
                    {String(i + 1).padStart(2, "0")} · {app.name}
                  </li>
                ))}
                {apps.length === 0 && (
                  <li className="font-mono text-[0.65rem] uppercase opacity-70">
                    Nenhum módulo
                  </li>
                )}
              </ul>

              <p className="mt-auto border-t-2 border-dark pt-2 font-mono text-[0.55rem] uppercase leading-relaxed tracking-wider opacity-80">
                Uso pessoal e intransferível. Em caso de perda, devolver ao
                titular em blklight.dev/{handle}.
              </p>
            </Plate>
          </div>
        </TiltContent>
      </Tilt>
    </div>
  );
};

const Spec = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <dt className="opacity-60">{label}</dt>
    <dd className="font-bold">{children}</dd>
  </div>
);

const SpecRow = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] bg-[#c9ced3]">
    <dt className="border-r-2 border-dark px-2 py-1 font-bold">{label}</dt>
    <dd className="truncate px-2 py-1">{children}</dd>
  </div>
);

// Chamfered steel plate: dark rim, hazard stripe on top, four rivets.
const Plate = ({
  back,
  hidden,
  children,
}: {
  back?: boolean;
  hidden?: boolean;
  children: ReactNode;
}) => (
  <div
    inert={hidden}
    className={cn(
      "chamfer chamfer-all chamfer-lg absolute inset-0 bg-dark p-[3px] backface-hidden",
      back && "rotate-y-180",
      hidden && "pointer-events-none",
    )}
  >
    <div
      className="chamfer chamfer-all relative flex h-full flex-col text-dark [--c:22px]"
      style={{ backgroundImage: STEEL }}
    >
      <span
        aria-hidden
        className="h-4 shrink-0 border-b-2 border-dark"
        style={{ backgroundImage: HAZARD }}
      />
      <Rivet className="left-5 top-7" />
      <Rivet className="right-5 top-7" />
      <Rivet className="bottom-4 left-5" />
      <Rivet className="bottom-4 right-5" />
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8">{children}</div>
    </div>
  </div>
);
