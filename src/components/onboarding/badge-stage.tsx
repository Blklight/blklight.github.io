"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import Grainient from "@/components/Grainient";

/** The colored panel the badge sits on, at the right of the first and last steps. */
export const BadgeStage = ({ children }: { children: ReactNode }) => {
  const reduceMotion = useReducedMotion();
  return (
    <aside
      aria-label="Seu crachá"
      className="relative overflow-hidden rounded-xs text-light lg:sticky lg:top-8"
    >
      <div className="absolute inset-0">
        <Grainient
          color1="#9c40f7"
          color2="#2969ff"
          color3="#252525"
          timeSpeed={reduceMotion ? 0 : 0.25}
          warpAmplitude={50}
          grainAmount={0.1}
          contrast={1.5}
          zoom={0.9}
        />
      </div>
      <div className="relative z-10 flex min-h-[34rem] items-center justify-center p-8">
        {children}
      </div>
    </aside>
  );
};

/** Grid shared by the first and last steps: content on the left, badge stage on the right. */
export const BADGE_LAYOUT =
  "flex-1 w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_25rem] gap-12 lg:gap-16 items-center pb-12";
