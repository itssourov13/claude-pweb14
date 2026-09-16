import type { Note, Work } from "@/lib/schema";
import { siteConfig } from "@/lib/site.config";

const siteUrl = `https://${siteConfig.domain}`;

/** Serializes a JSON-LD object into the props for a <script> tag. Using a
 * helper (rather than inlining JSON.stringify everywhere) keeps the
 * dangerouslySetInnerHTML usage in one audited place. */
export function jsonLdScript(data: Record<string, unknown>) {
  return {
    type: "application/ld+json",
    suppressHydrationWarning: true,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteUrl,
    jobTitle: siteConfig.tagline,
    email: siteConfig.email,
    sameAs: Object.values(siteConfig.socials).filter((url) =>
      url.startsWith("http"),
    ),
  };
}

export function workJsonLd(item: Work & { slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.summary,
    author: { "@type": "Person", name: siteConfig.name },
    datePublished: item.published,
    url: `${siteUrl}/work/${item.slug}`,
  };
}

export function articleJsonLd(note: Note & { slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    author: { "@type": "Person", name: siteConfig.name },
    datePublished: note.published,
    dateModified: note.updated ?? note.published,
    url: `${siteUrl}/writing/${note.slug}`,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}
