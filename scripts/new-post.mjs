#!/usr/bin/env node
// Scaffolds a new work/writing .mdx file from its _template.md.
// Usage: pnpm new-post writing my-new-post-slug
//        pnpm new-post work my-new-case-study-slug
import fs from "node:fs";
import path from "node:path";

const [, , collection, slug] = process.argv;

if (!collection || !slug || !["work", "writing"].includes(collection)) {
  console.error("Usage: pnpm new-post <work|writing> <slug>");
  process.exit(1);
}

const contentDir = path.join(process.cwd(), "content", collection);
const templatePath = path.join(contentDir, "_template.md");
const targetPath = path.join(contentDir, `${slug}.mdx`);

if (fs.existsSync(targetPath)) {
  console.error(`Already exists: ${targetPath}`);
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error(`No template found at ${templatePath}`);
  process.exit(1);
}

fs.copyFileSync(templatePath, targetPath);
console.log(`Created ${targetPath}`);
