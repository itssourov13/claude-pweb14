import Link from "next/link";

import ArrowUpRight from "@/components/icons/ArrowUpRight";
import Reveal from "@/components/motion/Reveal";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import type { Work } from "@/lib/schema";

export default function SelectedWork({ items }: { items: Work[] }) {
  if (items.length === 0) return null;

  return (
    <Section>
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-overline text-accent-strong mb-2">
            Selected work
          </p>
          <h2 className="text-display-2">A few recent projects.</h2>
        </div>
        <Link
          href="/work"
          className="text-fg hidden items-center gap-1 text-sm font-medium hover:underline sm:inline-flex"
        >
          View all work <ArrowUpRight />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.slug} delay={index * 0.06}>
            <Link href={`/work/${item.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col gap-4 transition-colors group-hover:border-accent">
                <div className="flex flex-wrap gap-2">
                  {item.discipline.slice(0, 2).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted">{item.summary}</p>
                <div className="mt-auto flex items-center gap-1 pt-2 text-sm font-medium">
                  Read the case study{" "}
                  <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
