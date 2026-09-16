import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export default function Section({
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-[1200px] px-5 py-16 md:px-12 md:py-24",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
