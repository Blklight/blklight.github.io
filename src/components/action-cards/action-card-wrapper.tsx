"use client";

import { motion, type Variants } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
};

export const gridVariants: Variants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

export interface ActionCardWrapperProps {
  children: React.ReactNode;
  className?: string;
  variants?: "card" | "grid";
  customVariants?: Variants;
  whileTap?: boolean;
  whileHover?: boolean;
  initial?: "initial" | false;
  animate?: "in" | false;
}

export const ActionCardWrapper = React.forwardRef<
  HTMLDivElement,
  ActionCardWrapperProps
>(
  (
    {
      children,
      className,
      variants = "card",
      customVariants,
      whileTap = true,
      whileHover = false,
      initial = "initial",
      animate = "in",
    },
    ref,
  ) => {
    const selectedVariants =
      customVariants ?? (variants === "card" ? cardVariants : gridVariants);

    return (
      <motion.div
        ref={ref}
        className={cn("h-full", className)}
        variants={selectedVariants}
        initial={initial}
        animate={animate}
        exit="out"
        whileTap={whileTap ? { scale: 0.98 } : undefined}
        whileHover={whileHover ? { scale: 1.02 } : undefined}
      >
        {children}
      </motion.div>
    );
  },
);
ActionCardWrapper.displayName = "ActionCardWrapper";
