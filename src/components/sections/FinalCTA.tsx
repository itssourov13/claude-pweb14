import Link from "next/link";

import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

export default function FinalCTA() {
  return (
    <Section className="bg-surface-2 flex flex-col items-start gap-6 text-left">
      <h2 className="text-display-2 max-w-xl">
        Have a project in mind? Let&apos;s talk about it.
      </h2>
      <p className="text-muted max-w-lg">
        {siteConfig.availability.label} — usually a good time to start a
        conversation about scope and timeline.
      </p>
      <Link
        href="/contact"
        className="bg-accent hover:bg-accent-strong min-h-11 rounded-full px-6 py-3 font-medium text-white"
      >
        Get in touch
      </Link>
    </Section>
  );
}
