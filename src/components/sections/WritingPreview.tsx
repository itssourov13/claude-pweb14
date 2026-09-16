import Link from "next/link";

import ArrowUpRight from "@/components/icons/ArrowUpRight";
import Reveal from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import type { Note } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

export default function WritingPreview({ items }: { items: Note[] }) {
  return (
    <Section>
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-overline text-accent-strong mb-2">Writing</p>
          <h2 className="text-display-2">Notes on design and building.</h2>
        </div>
        <Link
          href="/writing"
          className="text-fg hidden items-center gap-1 text-sm font-medium hover:underline sm:inline-flex"
        >
          Read all notes <ArrowUpRight />
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">Notes are coming soon — check back shortly.</p>
      ) : (
        <div className="divide-border divide-y">
          {items.map((note, index) => (
            <Reveal key={note.slug} delay={index * 0.06}>
              <Link
                href={`/writing/${note.slug}`}
                className="group flex flex-col justify-between gap-2 py-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="text-lg font-medium group-hover:underline">
                    {note.title}
                  </h3>
                  <p className="text-muted text-sm">{note.summary}</p>
                </div>
                <p className="text-faint shrink-0 text-sm">
                  {formatDate(note.published)}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}
