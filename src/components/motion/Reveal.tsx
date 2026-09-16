"use client";

import {
  motion,
  useReducedMotion as useMotionReducedMotion,
} from "motion/react";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li";
}) {
  const prefersReducedMotion = useMotionReducedMotion();
  const MotionTag = as === "li" ? motion.li : motion.div;

  if (prefersReducedMotion) {
    const StaticTag = as;
    return <StaticTag>{children}</StaticTag>;
  }

  return (
    <MotionTag
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
