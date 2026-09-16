import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/sections/PageHeader";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Services",
  description: "How engagements are scoped and what's included.",
};

const services = [
  {
    title: "Product design sprint",
    description:
      "2–4 weeks. Research, flows, and high-fidelity screens for a new product or feature, ready to hand to engineering.",
  },
  {
    title: "Design + build",
    description:
      "6–14 weeks. Full ownership from design through a shipped, production Next.js build.",
  },
  {
    title: "Design system",
    description:
      "3–6 weeks. Tokens, component library, and documentation so your team can move fast without drifting.",
  },
];

const faqs = [
  {
    question: "How do engagements start?",
    answer:
      "A short call to understand scope, timeline, and budget, followed by a written proposal — no discovery-fee surprises.",
  },
  {
    question: "Do you work with early-stage founders?",
    answer:
      "Yes — a good chunk of past work has been pre-seed to Series A teams shipping a first real version of their product.",
  },
  {
    question: "What's not a good fit?",
    answer:
      "Large, multi-team engineering orgs looking to backfill a full-time role, or projects with no room for design input.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="A few ways to work together."
        description="Every engagement is scoped in writing before it starts — no open-ended retainers."
      />
      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} className="flex h-full flex-col gap-3">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="text-muted">{service.description}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="border-border border-t pt-16">
        <h2 className="text-display-2 mb-8 max-w-lg">
          Frequently asked questions.
        </h2>
        <dl className="divide-border divide-y">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-5">
              <dt className="font-medium">{faq.question}</dt>
              <dd className="text-muted mt-1">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <Link
          href="/contact"
          className="mt-10 inline-block min-h-11 rounded-full bg-accent px-6 py-3 font-medium text-white hover:bg-accent-strong"
        >
          Start a project
        </Link>
      </Section>
    </>
  );
}
