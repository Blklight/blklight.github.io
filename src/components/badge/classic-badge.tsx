"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { appMeta } from "@/components/onboarding/app-meta";
import { CornerBrackets } from "@/components/onboarding/corner-brackets";
import { FLAT } from "@/components/onboarding/simple-flip-card";
import { cn } from "@/lib/utils";
import { ConfirmStamp } from "./confirm-stamp";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

export const SINCE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const initials = (name: string) =>
  name
    .replace(/^@/, "")
    .split(/[\s_.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

/**
 * Classic badge: rounded plastic card with a lanyard slot. Front carries the
 * person, back carries the apps; a click turns it over.
 */
export const ClassicBadge = ({ data, status, className }: BadgeModelProps) => {
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const confirmed = status === "confirmed";
  const draft = status === "draft";
  const [flipped, setFlipped] = useState(false);
  const since = SINCE.format(new Date(memberSince)).replace(".", "");

  return (
    <div className={cn("w-72 max-w-full", className)}>
      <Tilt maxTilt={8} perspective={1000} style={FLAT}>
        <TiltContent className="perspective-1000 relative h-[28rem]">
          {/* biome-ignore lint/a11y/useSemanticElements: both faces hold block content, which a <button> can't contain */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setFlipped((f) => !f);
              }
            }}
            aria-label={
              flipped
                ? "Virar crachá para a frente"
                : "Virar crachá para o verso"
            }
            className="relative block size-full cursor-pointer rounded-[1.4rem] text-left preserve-3d transition-transform duration-500 ease-out outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            <Face hidden={flipped}>
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider">
                <span className="font-semibold">Membro</span>
                <span className="opacity-70">Nº {memberId}</span>
              </div>

              <div className="relative mx-auto mt-5 size-32 p-1.5">
                <CornerBrackets size="size-3" className="opacity-80" />
                {avatarUrl ? (
                  // biome-ignore lint/performance/noImgElement: avatar can come from any OAuth host, not in next/image remotePatterns
                  <img
                    src={avatarUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full flex-col items-center justify-center bg-blklight-300 text-dark background-texture">
                    <span className="font-mono text-4xl font-medium">
                      {initials(name)}
                    </span>
                    <span className="mt-1 font-mono text-[0.6rem] uppercase opacity-70">
                      foto em breve
                    </span>
                  </span>
                )}
              </div>

              <div className="mt-5 text-center">
                <p className="font-sans text-2xl font-bold tracking-tight leading-tight wrap-anywhere line-clamp-2">
                  {name}
                </p>
                <p className="mt-1 font-mono text-sm wrap-anywhere">
                  @{handle}
                </p>
              </div>

              {/* Confirmed badges trade the social row for the stamp, in the same slot. */}
              {confirmed ? (
                <ConfirmStamp
                  date={memberSince}
                  className="mx-auto mt-auto -mb-1 size-24"
                />
              ) : (
                data.socials &&
                data.socials.length > 0 && (
                  <SocialRow
                    links={data.socials}
                    onDark="auto"
                    className="mt-auto mb-3 justify-center"
                  />
                )
              )}
              <div className="mt-auto flex items-center justify-between border-t-2 border-dashed border-dark/40 dark:border-light/40 pt-3">
                <span className="flex items-center gap-1.5">
                  <Image
                    src="/blklight-black.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="dark:invert"
                  />
                  <span className="font-sans text-sm font-bold tracking-tight">
                    Blklight
                  </span>
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
                  Verso ↻
                </span>
              </div>
            </Face>

            <Face back hidden={!flipped}>
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider">
                <span className="font-semibold">Verso</span>
                <span className="opacity-70">Nº {memberId}</span>
              </div>

              <dl className="mt-6 grid gap-3 font-mono text-xs">
                <Row label="Perfil">blklight.dev/{handle}</Row>
                <Row label={draft ? "Situação" : "Membro desde"}>
                  {draft ? "Em montagem" : since}
                </Row>
              </dl>

              <div className="relative mt-6 flex-1 p-3">
                <CornerBrackets size="size-3" className="opacity-80" />
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
                  Apps
                </p>
                {apps.length > 0 ? (
                  <ul className="flex flex-col gap-1.5">
                    {apps.map((app) => (
                      <li
                        key={app.id}
                        className={cn(
                          "flex items-center justify-between rounded-xs px-2 py-1 font-mono text-xs uppercase text-dark background-texture",
                          appMeta(app).accent.paper,
                        )}
                      >
                        {app.name}
                        <span className="text-[0.6rem] opacity-70">
                          {appMeta(app).tagline}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-1.5">
                    {[0, 1, 2].map((slot) => (
                      <li
                        key={slot}
                        className="h-6 rounded-xs border border-dashed border-dark/50 dark:border-light/50"
                      />
                    ))}
                    <li className="mt-1 font-mono text-[0.65rem] opacity-70">
                      {draft
                        ? "Seus apps entram aqui no próximo passo."
                        : "Nenhum app ativo."}
                    </li>
                  </ul>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between border-t-2 border-dashed border-dark/40 dark:border-light/40 pt-3 font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
                <span>Frente ↻</span>
                <span>
                  {draft ? "Rascunho" : confirmed ? "Confirmado" : "Membro"}
                </span>
              </div>
            </Face>
          </div>
        </TiltContent>
      </Tilt>
    </div>
  );
};

export const Row = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <div>
    <dt className="text-[0.65rem] uppercase tracking-wider opacity-70">
      {label}
    </dt>
    <dd className="mt-0.5 wrap-anywhere">{children}</dd>
  </div>
);

// Rounded plastic card with an ink rim and a lanyard slot, like a real badge.
// In the dark theme it inverts: dark stock, light rim and ink.
const Face = ({
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
      "absolute inset-0 block rounded-[1.4rem] bg-dark p-[3px] backface-hidden dark:bg-light/85",
      back && "rotate-y-180",
      hidden && "pointer-events-none",
    )}
  >
    <div className="relative flex h-full flex-col rounded-[1.25rem] bg-light p-6 pt-4 text-dark background-texture dark:bg-dark dark:text-light">
      <span
        aria-hidden
        className="mx-auto mb-4 block h-2.5 w-14 shrink-0 rounded-full bg-dark/80 shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)] dark:bg-light/70"
      />
      {children}
    </div>
  </div>
);
