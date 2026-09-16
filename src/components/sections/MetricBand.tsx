import type { WorkFrontmatter } from "@/lib/schema";

export default function MetricBand({
  outcomes,
}: {
  outcomes: WorkFrontmatter["outcomes"];
}) {
  if (outcomes.length === 0) return null;

  return (
    <div className="border-border grid grid-cols-1 gap-6 border-y py-8 sm:grid-cols-3">
      {outcomes.map((outcome) => (
        <div key={outcome.label}>
          <p className="text-display-2 text-accent-strong">
            {outcome.value}
            {outcome.suffix}
          </p>
          <p className="text-muted mt-1 text-sm">{outcome.label}</p>
          {outcome.delta ? (
            <p className="text-faint text-xs">{outcome.delta}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
