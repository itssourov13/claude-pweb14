import type { Metadata } from "next";
import Link from "next/link";

import PageHeader from "@/components/sections/PageHeader";
import Section from "@/components/ui/Section";
import { getAllNotes } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on design, engineering, and building products.",
};

export default function WritingIndexPage() {
  const notes = getAllNotes();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes on design and building."
        description="Short, specific write-ups — not evergreen listicles."
      />
      <Section className="pt-0">
        {notes.length === 0 ? (
          <p className="text-muted">Notes are coming soon.</p>
        ) : (
          <div className="divide-border divide-y">
            {notes.map((note) => (
              <Link
                key={note.slug}
                href={`/writing/${note.slug}`}
                className="group flex flex-col justify-between gap-2 py-6 sm:flex-row sm:items-center"
              >
                <div>
                  <h2 className="text-lg font-medium group-hover:underline">
                    {note.title}
                  </h2>
                  <p className="text-muted text-sm">{note.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="text-faint text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-faint shrink-0 text-sm">
                  {formatDate(note.published)} · {note.readingTimeMinutes} min
                  read
                </p>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
