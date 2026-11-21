"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import type { PlatformApp } from "@/types/api.types";
import { appMeta } from "./app-meta";
import { CornerBrackets } from "./corner-brackets";
import { FichaFace } from "./simple-flip-card";

interface Props {
  name: string;
  handle: string;
  avatarUrl?: string | null;
  /** ISO date the account was created. */
  memberSince: string;
  memberId: string;
  apps?: PlatformApp[];
  confirmed?: boolean;
  className?: string;
}

const SINCE = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const initials = (name: string) =>
  name
    .replace(/^@/, "")
    .split(/[\s_.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("") || "?";

/**
 * The member badge: built live on the first step, stamped on the last. Same
 * stock as the app fichas so the onboarding reads as one object being filled in.
 */
export const MemberBadge = ({
  name,
  handle,
  avatarUrl,
  memberSince,
  memberId,
  apps = [],
  confirmed = false,
  className,
}: Props) => {
  const reduceMotion = useReducedMotion();
  const since = SINCE.format(new Date(memberSince)).replace(".", "");

  return (
    <Tilt
      maxTilt={8}
      perspective={1000}
      className={cn("w-72 max-w-full", className)}
    >
      <TiltContent className="relative h-[27rem]">
        <FichaFace corner="br" paper="bg-light" selected>
          <span
            aria-hidden
            className="mx-auto -mt-2 mb-4 block h-2.5 w-14 rounded-full bg-dark/80 shadow-[inset_0_1px_2px_rgb(0_0_0/0.5)]"
          />

          <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider">
            <span className="font-semibold">Blklight</span>
            <span className="opacity-70">Nº {memberId}</span>
          </div>

          <div className="relative mt-4 size-28 p-1.5">
            <CornerBrackets size="size-3" className="opacity-80" />
            {avatarUrl ? (
              // biome-ignore lint/performance/noImgElement: avatar can come from any OAuth host, not in next/image remotePatterns
              <img
                src={avatarUrl}
                alt=""
                className="size-full object-cover grayscale-[0.2]"
              />
            ) : (
              <span className="flex size-full flex-col items-center justify-center bg-blklight-300 background-texture">
                <span className="font-mono text-4xl font-medium">
                  {initials(name)}
                </span>
                <span className="mt-1 font-mono text-[0.6rem] uppercase opacity-70">
                  foto em breve
                </span>
              </span>
            )}
          </div>

          <p className="mt-4 font-sans text-2xl font-bold tracking-tight leading-tight wrap-anywhere line-clamp-2">
            {name}
          </p>
          <p className="font-mono text-sm wrap-anywhere">@{handle}</p>
          <p className="mt-0.5 font-mono text-xs opacity-70 wrap-anywhere">
            blklight.dev/{handle}
          </p>

          <div className="mt-auto border-t-2 border-dashed border-dark/40 pt-3">
            <p className="mb-2 font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
              Apps
            </p>
            {apps.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {apps.map((app, i) => (
                  <motion.li
                    key={app.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.2 }}
                    className={cn(
                      "rounded-xs px-1.5 py-0.5 font-mono text-[0.7rem] uppercase background-texture",
                      appMeta(app).accent.paper,
                    )}
                  >
                    {app.name}
                  </motion.li>
                ))}
              </ul>
            ) : (
              <ul aria-label="Seus apps aparecem aqui" className="flex gap-1.5">
                {[0, 1, 2].map((slot) => (
                  <li
                    key={slot}
                    className="h-5 w-14 rounded-xs border border-dashed border-dark/50"
                  />
                ))}
              </ul>
            )}
            <p className="mt-3 flex justify-between font-mono text-[0.65rem] uppercase tracking-wider opacity-70">
              <span>{confirmed ? "Membro desde" : "Em montagem"}</span>
              <span>{since}</span>
            </p>
          </div>

          {confirmed && (
            <motion.p
              initial={
                reduceMotion ? false : { opacity: 0, scale: 1.6, rotate: -14 }
              }
              animate={{ opacity: 1, scale: 1, rotate: -14 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="absolute right-4 top-24 border-[3px] border-blklight-600 px-2 py-1 font-mono text-sm font-bold uppercase tracking-widest text-blklight-600 mix-blend-multiply"
            >
              Confirmado
            </motion.p>
          )}
        </FichaFace>
      </TiltContent>
    </Tilt>
  );
};
