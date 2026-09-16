import { cn } from "@/lib/utils";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface-2 animate-pulse rounded-sm motion-reduce:animate-none",
        className,
      )}
      aria-hidden="true"
    />
  );
}
