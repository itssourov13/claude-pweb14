import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";

import { readingTime } from "@/lib/utils";
import {
  noteFrontmatterSchema,
  workFrontmatterSchema,
  type Note,
  type Work,
} from "@/lib/schema";

// DEVIATION FROM tech-stack.md (D-005): the plan calls for Velite. Velite's
// build-time codegen couldn't be installed/verified in the authoring
// environment (no network access), so this is a small, dependency-light
// hand-rolled loader (gray-matter + marked) with the same zod-validated
// contract. Swapping back to Velite later is a drop-in change scoped to this
// file — see project-planning/09-decisions/decision-log.md.

const CONTENT_DIR = path.join(process.cwd(), "content");

function readCollection(collection: "work" | "writing") {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .filter((file) => !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

let workCache: Work[] | null = null;
let noteCache: Note[] | null = null;

export function getAllWork(): Work[] {
  if (workCache) return workCache;

  workCache = readCollection("work")
    .map(({ slug, data, content }) => {
      const parsed = workFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`[content] skipping content/work/${slug}: invalid frontmatter`, parsed.error.flatten());
        return null;
      }
      return { ...parsed.data, slug, body: content };
    })
    .filter((item): item is Work => item !== null)
    .filter((item) => !item.draft)
    .sort((a, b) => (a.published < b.published ? 1 : -1));

  return workCache;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWork().find((item) => item.slug === slug);
}

export function getFeaturedWork(limit = 3): Work[] {
  return getAllWork()
    .filter((item) => item.featured)
    .slice(0, limit);
}

export function getAllNotes(): Note[] {
  if (noteCache) return noteCache;

  noteCache = readCollection("writing")
    .map(({ slug, data, content }) => {
      const parsed = noteFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        console.warn(`[content] skipping content/writing/${slug}: invalid frontmatter`, parsed.error.flatten());
        return null;
      }
      return {
        ...parsed.data,
        slug,
        body: content,
        readingTimeMinutes: readingTime(content),
      };
    })
    .filter((item): item is Note => item !== null)
    .filter((item) => !item.draft)
    .sort((a, b) => (a.published < b.published ? 1 : -1));

  return noteCache;
}

export function getNoteBySlug(slug: string): Note | undefined {
  return getAllNotes().find((item) => item.slug === slug);
}

export function getRelatedNotes(slug: string, limit = 3): Note[] {
  const current = getNoteBySlug(slug);
  if (!current) return [];

  return getAllNotes()
    .filter((note) => note.slug !== slug)
    .filter((note) => note.tags.some((tag) => current.tags.includes(tag)))
    .slice(0, limit);
}

export async function renderMarkdown(body: string): Promise<string> {
  return marked.parse(body, { async: true });
}
