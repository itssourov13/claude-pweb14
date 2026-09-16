import { NextResponse } from "next/server";

import { getAllNotes } from "@/lib/content";
import { siteConfig } from "@/lib/site.config";

export function GET() {
  const notes = getAllNotes();
  const siteUrl = `https://${siteConfig.domain}`;

  const items = notes
    .map(
      (note) => `
    <item>
      <title><![CDATA[${note.title}]]></title>
      <link>${siteUrl}/writing/${note.slug}</link>
      <guid>${siteUrl}/writing/${note.slug}</guid>
      <pubDate>${new Date(note.published).toUTCString()}</pubDate>
      <description><![CDATA[${note.summary}]]></description>
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${siteConfig.name} — Writing</title>
    <link>${siteUrl}/writing</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
