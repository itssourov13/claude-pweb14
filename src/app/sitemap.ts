import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

// Static routes only for now — work/[slug] and writing/[slug] entries are
// added in Phase P3 once the content collections exist.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${siteConfig.domain}`;
  const routes = ["", "/work", "/writing", "/about", "/services", "/contact"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}
