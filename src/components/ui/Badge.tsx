import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: "accent" | "neutral";
};

export default function Badge({
  className,
  children,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "text-overline inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        tone === "accent"
          ? "bg-accent-soft text-accent-strong"
          : "border border-border text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
