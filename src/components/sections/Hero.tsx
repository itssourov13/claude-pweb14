import Link from "next/link";

import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { siteConfig } from "@/lib/site.config";

export default function Hero() {
  return (
    <Section className="bg-grain flex min-h-[85vh] flex-col justify-center gap-6 pt-24 md:pt-32">
      <Link href={siteConfig.availability.href} className="w-fit">
        <Badge tone="accent">{siteConfig.availability.label}</Badge>
      </Link>

      <h1 className="text-display-1 max-w-3xl">
        Independent product designer &amp; engineer, working with founders who
        care about the details.
      </h1>

      <p className="text-muted max-w-xl text-lg">
        I design and build premium digital products end to end — from the first
        sketch to the shipped, measured result.
      </p>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="/contact"
          className="bg-accent hover:bg-accent-strong min-h-11 rounded-full px-5 py-2.5 font-medium text-white"
        >
          Start a project
        </Link>
        <Link
          href="/work"
          className="border-border bg-surface hover:bg-surface-2 min-h-11 rounded-full border px-5 py-2.5 font-medium"
        >
          See the work
        </Link>
      </div>
    </Section>
  );
}
