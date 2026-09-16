import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // API handlers and the dynamic OG-image endpoint aren't meant for
        // search indexes.
        disallow: ["/api/", "/og/"],
      },
    ],
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
  };
}
