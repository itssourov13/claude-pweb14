import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "border-border bg-surface focus-visible:border-accent min-h-11 rounded-sm border px-3.5 text-base outline-none",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export default Input;
