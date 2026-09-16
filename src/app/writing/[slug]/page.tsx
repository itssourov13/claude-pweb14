import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Prose from "@/components/ui/Prose";
import Section from "@/components/ui/Section";
import {
  getAllNotes,
  getNoteBySlug,
  getRelatedNotes,
  renderMarkdown,
} from "@/lib/content";
import { articleJsonLd, jsonLdScript } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) return {};
  return { title: note.title, description: note.summary };
}

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNoteBySlug(slug);
  if (!note) notFound();

  const html = await renderMarkdown(note.body);
  const related = getRelatedNotes(slug);

  return (
    <>
      <script {...jsonLdScript(articleJsonLd(note))} />
      <Section className="pt-32 pb-8 md:pt-40">
        <p className="text-overline text-accent-strong mb-3">
          {formatDate(note.published)} · {note.readingTimeMinutes} min read
        </p>
        <h1 className="text-display-2 max-w-2xl">{note.title}</h1>
      </Section>

      <Section className="pt-0">
        <Prose html={html} />
      </Section>

      {related.length > 0 ? (
        <Section className="border-border border-t">
          <p className="text-overline text-accent-strong mb-4">Related notes</p>
          <ul className="flex flex-col gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/writing/${item.slug}`}
                  className="font-medium hover:underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
