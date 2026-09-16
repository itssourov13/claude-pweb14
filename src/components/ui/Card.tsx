import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "border-border bg-surface rounded-md border p-6 shadow-sm md:p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
