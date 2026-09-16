type ClassValue = string | number | false | null | undefined;

/**
 * Minimal classname combiner. Kept dependency-free (no clsx/tailwind-merge)
 * until real conflicts justify the extra bytes — record in decision log if
 * that changes (D-016).
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / wordsPerMinute));
}
