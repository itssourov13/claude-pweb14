#!/usr/bin/env node
// Reports content frontmatter completeness. Non-fatal by default (P0-P4);
// wire `--fail-on-warning` into CI once real content volume lands (P5+).
import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const collections = ["work", "writing"];
const failOnWarning = process.argv.includes("--fail-on-warning");
let warnings = 0;

for (const collection of collections) {
  const dir = path.join(process.cwd(), "content", collection);
  if (!fs.existsSync(dir)) continue;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".mdx") || file.startsWith("_")) continue;

    const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
    const missing = [];

    if (!data.summary) missing.push("summary");
    if (collection === "work" && data.featured && !data.cover) {
      missing.push("cover (required on featured items)");
    }

    if (missing.length > 0) {
      warnings += 1;
      console.warn(`⚠ ${collection}/${file}: missing ${missing.join(", ")}`);
    }
  }
}

if (warnings > 0) {
  console.log(`\n${warnings} warning(s).`);
  if (failOnWarning) process.exit(1);
} else {
  console.log("Content check passed with no warnings.");
}
