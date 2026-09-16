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
      // Content is authored in local .mdx files under our control (not
      // user-submitted), rendered with `marked` at request time.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
