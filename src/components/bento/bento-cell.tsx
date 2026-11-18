"use client";

import { motion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  className?: string;
  style?: CSSProperties;
  animate?: boolean;
  children: ReactNode;
}

// The cell stays put and owns :hover; this inner layer is what lifts, so the
// card never slides out from under the pointer.
const lift = (children: ReactNode) => (
  <div data-bento-lift className="h-full">
    {children}
  </div>
);

export function BentoCell({
  index,
  className,
  style,
  animate = true,
  children,
}: Props) {
  if (!animate)
    return (
      <div data-bento-cell className={cn("min-w-0", className)} style={style}>
        {lift(children)}
      </div>
    );
  return (
    <motion.div
      data-bento-cell
      className={cn("min-w-0", className)}
      style={style}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 8) * 0.06,
      }}
    >
      {lift(children)}
    </motion.div>
  );
}
