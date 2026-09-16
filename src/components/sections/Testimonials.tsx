import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import type { Testimonial } from "@data/testimonials";

export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Section>
      <p className="text-overline text-accent-strong mb-2">What clients say</p>
      <h2 className="text-display-2 mb-10 max-w-lg">
        A few words from people I&apos;ve worked with.
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.08}>
            <Card className="flex h-full flex-col gap-4">
              <p className="text-fg text-lg">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-auto">
                <p className="font-medium">{item.name}</p>
                <p className="text-muted text-sm">
                  {item.role}, {item.company}
                </p>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
