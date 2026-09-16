"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import type { Work } from "@/lib/schema";

export default function WorkFilterList({ items }: { items: Work[] }) {
  const disciplines = useMemo(() => {
    const set = new Set<string>();
    items.forEach((item) => item.discipline.forEach((d) => set.add(d)));
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? items.filter((item) => item.discipline.includes(active))
    : items;

  return (
    <Section className="pt-0">
      {disciplines.length > 0 ? (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by discipline">
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-pressed={active === null}
            className={`min-h-9 rounded-full border px-4 text-sm font-medium ${
              active === null
                ? "border-accent bg-accent-soft text-accent-strong"
                : "border-border text-muted hover:bg-surface-2"
            }`}
          >
            All
          </button>
          {disciplines.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setActive(d)}
              aria-pressed={active === d}
              className={`min-h-9 rounded-full border px-4 text-sm font-medium ${
                active === d
                  ? "border-accent bg-accent-soft text-accent-strong"
                  : "border-border text-muted hover:bg-surface-2"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted">No projects match that filter yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filtered.map((item) => (
            <Link key={item.slug} href={`/work/${item.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col gap-4 transition-colors group-hover:border-accent">
                <div className="flex flex-wrap gap-2">
                  {item.discipline.slice(0, 2).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-muted">{item.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
