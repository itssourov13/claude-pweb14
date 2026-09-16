import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-medium transition-colors " +
  "disabled:pointer-events-none disabled:opacity-50 min-h-11 px-5";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "rounded-full bg-accent text-white hover:bg-accent-strong shadow-sm",
  secondary:
    "rounded-full border border-border bg-surface text-fg hover:bg-surface-2",
  ghost: "rounded-full text-fg hover:bg-surface-2",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "text-sm min-h-9 px-4",
  md: "text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
