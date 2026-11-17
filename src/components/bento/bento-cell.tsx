"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  index: number;
  className?: string;
  animate?: boolean;
  children: ReactNode;
}

export function BentoCell({
  index,
  className,
  animate = true,
  children,
}: Props) {
  if (!animate)
    return <div className={cn("min-w-0", className)}>{children}</div>;
  return (
    <motion.div
      className={cn("min-w-0", className)}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(index, 8) * 0.06,
      }}
    >
      {children}
    </motion.div>
  );
}
