"use client";

import { motion, useReducedMotion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import { useId } from "react";
import { cn } from "@/lib/utils";

interface Props {
  /** ISO date printed in the middle as dd.mm.yy. */
  date: string;
  className?: string;
}

/**
 * Round rubber stamp: text around the ring, a check and the date in the
 * middle, uneven ink. Lands with a thump when it mounts.
 */
export const ConfirmStamp = ({ date, className }: Props) => {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("badge");
  const format = useFormatter();
  const short = format
    .dateTime(new Date(date), {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replaceAll("/", ".");
  // useId yields characters like ":" that break url(#id) references.
  const id = `stamp${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ring = `${id}-ring`;
  const ink = `${id}-ink`;

  return (
    <motion.svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={t("confirmedOn", { date: short })}
      initial={reduceMotion ? false : { opacity: 0, scale: 1.8, rotate: -4 }}
      animate={{ opacity: 1, scale: 1, rotate: -16 }}
      transition={{ type: "spring", stiffness: 380, damping: 20 }}
      className={cn(
        "pointer-events-none size-32 text-blklight-600 mix-blend-multiply dark:text-blklight-300 dark:mix-blend-screen",
        className,
      )}
    >
      <defs>
        <path
          id={ring}
          d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0"
        />
        {/* Worn rubber: speckled gaps in the ink. */}
        <filter id={ink}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="7"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.45" />
          <feComposite in="SourceGraphic" operator="in" />
        </filter>
      </defs>
      <g filter={`url(#${ink})`} fill="none" stroke="currentColor">
        <circle cx="60" cy="60" r="56" strokeWidth="3.5" />
        <circle cx="60" cy="60" r="50" strokeWidth="1.2" />
        <circle cx="60" cy="60" r="31" strokeWidth="1.2" />
        <text
          fill="currentColor"
          stroke="none"
          className="font-mono"
          fontSize="9.5"
          fontWeight="700"
          letterSpacing="1.3"
        >
          <textPath href={`#${ring}`} startOffset="0">
            {t("stampRing")}
          </textPath>
        </text>
        <path d="M47 58 l9 9 l17 -19" strokeWidth="5" strokeLinecap="square" />
        <text
          x="60"
          y="80"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          className="font-mono uppercase"
          fontSize="8"
          fontWeight="700"
          letterSpacing="0.6"
        >
          {short}
        </text>
      </g>
    </motion.svg>
  );
};
