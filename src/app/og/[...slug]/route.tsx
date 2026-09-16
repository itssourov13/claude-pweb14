import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { siteConfig } from "@/lib/site.config";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? siteConfig.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#F7F5F1",
          color: "#191714",
        }}
      >
        <div style={{ fontSize: 28, color: "#B45F3E", fontWeight: 600 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 56, fontWeight: 500, maxWidth: 900, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ fontSize: 24, color: "#6B675F" }}>
          {siteConfig.domain}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
