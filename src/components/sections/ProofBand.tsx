import MetricCounter from "@/components/motion/MetricCounter";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

export default function ProofBand() {
  return (
    <Section className="border-border grid grid-cols-1 gap-8 border-y py-12 sm:grid-cols-3">
      {siteConfig.metrics.map((metric) => (
        <div key={metric.label}>
          <p className="text-display-2 text-accent-strong">
            <MetricCounter value={metric.value} suffix={metric.suffix} />
          </p>
          <p className="text-muted mt-1 text-sm">{metric.label}</p>
        </div>
      ))}
    </Section>
  );
}
