import Reveal from "@/components/motion/Reveal";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

const capabilities = [
  {
    title: "Product design",
    description:
      "End-to-end UX/UI: research, flows, high-fidelity design, and a design system your team can actually maintain.",
  },
  {
    title: "Front-end engineering",
    description:
      "Production React/Next.js — accessible, performant, and typed, not just a pretty prototype.",
  },
  {
    title: "Design systems",
    description:
      "Token-based systems that keep a product consistent as it grows past the first few screens.",
  },
];

export default function Capabilities() {
  return (
    <Section className="bg-surface-2">
      <p className="text-overline text-accent-strong mb-2">What I do</p>
      <h2 className="text-display-2 mb-10 max-w-lg">
        Design and engineering, from the same person.
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {capabilities.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <Card className="bg-bg h-full">
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-muted">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
