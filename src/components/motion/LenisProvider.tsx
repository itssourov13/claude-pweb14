"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/** Smooth scroll, gated to desktop pointer + no-reduced-motion per
 * tech-stack.md (D-004) and animation-plan.md. Renders nothing. */
export default function LenisProvider() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    let frame: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
