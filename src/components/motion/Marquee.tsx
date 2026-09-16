"use client";

import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/** Infinite horizontal scroller (logos/tags). Pauses entirely when
 * prefers-reduced-motion is set, per accessibility-plan.md. */
export default function Marquee({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-12",
          !reducedMotion && "animate-marquee",
        )}
      >
        <div className="flex shrink-0 gap-12">{children}</div>
        {!reducedMotion ? (
          <div className="flex shrink-0 gap-12" aria-hidden="true">
            {children}
          </div>
        ) : null}
      </div>
    </div>
  );
}
