import type { TextareaHTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={6}
    className={cn(
      "border-border bg-surface focus-visible:border-accent rounded-sm border px-3.5 py-3 text-base outline-none",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export default Textarea;
