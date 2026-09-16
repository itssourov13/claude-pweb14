import type { ReactNode } from "react";

import Section from "@/components/ui/Section";

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <Section className="pt-32 pb-12 md:pt-40">
      {eyebrow ? (
        <p className="text-overline text-accent-strong mb-3">{eyebrow}</p>
      ) : null}
      <h1 className="text-display-2 max-w-2xl">{title}</h1>
      {description ? (
        <p className="text-muted mt-4 max-w-xl text-lg">{description}</p>
      ) : null}
      {children}
    </Section>
  );
}
