import { cn } from "@/lib/utils";

export default function Prose({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-[760px]",
        "prose-headings:font-display prose-a:text-accent-strong",
        className,
      )}
      // HTML is pre-sanitized server-side in `renderMarkdown` (DOMPurify)
      // before it reaches this sink.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
