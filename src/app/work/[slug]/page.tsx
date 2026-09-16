import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MetricBand from "@/components/sections/MetricBand";
import RelatedWork from "@/components/sections/RelatedWork";
import Badge from "@/components/ui/Badge";
import Prose from "@/components/ui/Prose";
import Section from "@/components/ui/Section";
import { getAllWork, getWorkBySlug, renderMarkdown } from "@/lib/content";
import { jsonLdScript, workJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllWork().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function WorkCaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  if (!item) notFound();

  const html = await renderMarkdown(item.body);
  const allWork = getAllWork();

  return (
    <>
      <script {...jsonLdScript(workJsonLd(item))} />
      <Section className="pt-32 pb-12 md:pt-40">
        <div className="mb-4 flex flex-wrap gap-2">
          {item.discipline.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <h1 className="text-display-2 max-w-2xl">{item.title}</h1>
        <p className="text-muted mt-4 max-w-xl text-lg">{item.summary}</p>
        <dl className="text-muted mt-8 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-faint">Client</dt>
            <dd>{item.client ?? "Confidential"}</dd>
          </div>
          <div>
            <dt className="text-faint">Role</dt>
            <dd>{item.role}</dd>
          </div>
          <div>
            <dt className="text-faint">Timeline</dt>
            <dd>{item.timeline}</dd>
          </div>
          <div>
            <dt className="text-faint">Year</dt>
            <dd>{item.year}</dd>
          </div>
        </dl>
      </Section>

      <Section className="pt-0">
        <MetricBand outcomes={item.outcomes} />
      </Section>

      <Section className="pt-0">
        <Prose html={html} />
      </Section>

      <RelatedWork items={allWork} currentSlug={item.slug} />
    </>
  );
}
