"use client";

import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { useReducedMotion } from "motion/react";
import Image from "next/image";
import { type CSSProperties, type ReactNode, useRef, useState } from "react";
import { useAppMeta } from "@/components/onboarding/app-meta";
import { CornerBrackets } from "@/components/onboarding/corner-brackets";
import { FLAT } from "@/components/onboarding/simple-flip-card";
import { cn } from "@/lib/utils";
import { initials, Row, SINCE } from "./classic-badge";
import { SocialRow } from "./social-row";
import type { BadgeModelProps } from "./types";

// Foil: thin rainbow bands with dark gaps that slide with the pointer.
const FOIL =
  "repeating-linear-gradient(115deg, transparent 0%, rgb(255 126 179 / 0.55) 5%, rgb(255 211 110 / 0.55) 8%, rgb(125 255 176 / 0.55) 11%, rgb(110 195 255 / 0.55) 14%, rgb(183 139 255 / 0.55) 17%, transparent 22%, transparent 30%)";
const GLARE =
  "radial-gradient(circle at var(--mx) var(--my), rgb(255 255 255 / 0.55) 0%, rgb(255 255 255 / 0.12) 25%, transparent 55%)";

/**
 * Holo badge: dark card with a holographic foil that follows the pointer.
 * Same data and flip as the classic model; only the look changes.
 */
export const HoloBadge = ({ data, status, className }: BadgeModelProps) => {
  const appMeta = useAppMeta();
  const { name, handle, avatarUrl, memberSince, memberId, apps = [] } = data;
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const since = SINCE.format(new Date(memberSince)).replace(".", "");
  const draft = status === "draft";

  const track = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduceMotion) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  };

  const toggle = () => setFlipped((f) => !f);

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      style={{ "--mx": "50%", "--my": "30%" } as CSSProperties}
      className={cn("w-80 max-w-full", className)}
    >
      <Tilt maxTilt={12} perspective={900} style={FLAT}>
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
            className="relative block size-full cursor-pointer rounded-[1.4rem] preserve-3d transition-transform duration-500 ease-out outline-none focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none"
            style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
          >
            <Face hidden={flipped} active={active}>
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider text-light/70">
                <span className="text-light">Membro</span>
                <span>Nº {memberId}</span>
              </div>

              <div className="relative mx-auto mt-5 size-32 p-1.5 text-light">
                <CornerBrackets size="size-3" className="opacity-80" />
                {avatarUrl ? (
                  // biome-ignore lint/performance/noImgElement: avatar can come from any OAuth host, not in next/image remotePatterns
                  <img
                    src={avatarUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center bg-light/10 font-mono text-4xl font-medium backdrop-blur-sm">
                    {initials(name)}
                  </span>
                )}
              </div>

              <div className="mt-5 text-center text-light">
                <p className="font-sans text-2xl font-bold tracking-tight leading-tight wrap-anywhere line-clamp-2">
                  {name}
                </p>
                <p className="mt-1 font-mono text-sm text-light/70 wrap-anywhere">
                  @{handle}
                </p>
              </div>

              {data.socials && data.socials.length > 0 && (
                <SocialRow
                  links={data.socials}
                  onDark
                  className="mt-auto mb-3 justify-center"
                />
              )}
              <div className="mt-auto flex items-center justify-between border-t border-light/25 pt-3 text-light">
                <span className="flex items-center gap-1.5">
                  <Image
                    src="/blklight-white.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                  <span className="font-sans text-sm font-bold tracking-tight">
                    Blklight
                  </span>
                </span>
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-light/60">
                  {status === "confirmed" ? "Confirmado" : "Verso ↻"}
                </span>
              </div>
            </Face>

            <Face back hidden={!flipped} active={active}>
              <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider text-light/70">
                <span className="text-light">Verso</span>
                <span>Nº {memberId}</span>
              </div>
              <dl className="mt-6 grid gap-3 font-mono text-xs text-light">
                <Row label="Perfil">blklight.dev/{handle}</Row>
                <Row label={draft ? "Situação" : "Membro desde"}>
                  {draft ? "Em montagem" : since}
                </Row>
              </dl>
              <p className="mt-6 mb-3 font-mono text-[0.65rem] uppercase tracking-wider text-light/60">
                Apps
              </p>
              <ul className="flex flex-col gap-1.5">
                {apps.map((app) => (
                  <li
                    key={app.id}
                    className={cn(
                      "rounded-xs px-2 py-1 font-mono text-xs uppercase text-dark",
                      appMeta(app).accent.paper,
                    )}
                  >
                    {app.name}
                  </li>
                ))}
                {apps.length === 0 && (
                  <li className="font-mono text-xs text-light/60">
                    Nenhum app ainda.
                  </li>
                )}
              </ul>
            </Face>
          </div>
        </TiltContent>
      </Tilt>
    </div>
  );
};

const Face = ({
  back,
  hidden,
  active,
  children,
}: {
  back?: boolean;
  hidden?: boolean;
  active: boolean;
  children: ReactNode;
}) => (
  <div
    inert={hidden}
    className={cn(
      "absolute inset-0 overflow-hidden rounded-[1.4rem] bg-dark ring-1 ring-light/15 backface-hidden",
      back && "rotate-y-180",
      hidden && "pointer-events-none",
    )}
  >
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-screen transition-opacity duration-300",
        active ? "opacity-70" : "opacity-15",
      )}
      style={{
        backgroundImage: FOIL,
        backgroundSize: "300% 300%",
        backgroundPosition: "var(--mx) var(--my)",
      }}
    />
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300",
        active ? "opacity-100" : "opacity-0",
      )}
      style={{ backgroundImage: GLARE }}
    />
    <div className="relative flex h-full flex-col p-6 pt-4 background-texture">
      <span
        aria-hidden
        className="mx-auto mb-4 block h-2.5 w-14 shrink-0 rounded-full bg-light/25 shadow-[inset_0_1px_2px_rgb(0_0_0/0.6)]"
      />
      {children}
    </div>
  </div>
);
