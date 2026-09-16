"use client";

import Reveal from "./Reveal";
import type { ReactNode } from "react";

export default function StaggerGroup({
  children,
  staggerMs = 80,
  className,
}: {
  children: ReactNode[];
  staggerMs?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal key={index} delay={(index * staggerMs) / 1000}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
