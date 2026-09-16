import type { MetadataRoute } from "next";

import { getAllNotes, getAllWork } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteConfig.domain}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/writing`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/services`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = getAllWork().map((item) => ({
    url: `${base}/work/${item.slug}`,
    lastModified: new Date(item.published),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const noteRoutes: MetadataRoute.Sitemap = getAllNotes().map((note) => ({
    url: `${base}/writing/${note.slug}`,
    lastModified: new Date(note.updated ?? note.published),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...noteRoutes];
}
