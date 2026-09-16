import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import {
  noteFrontmatterSchema,
  workFrontmatterSchema,
  type Note,
  type Work,
} from "@/lib/schema";
import { readingTime } from "@/lib/utils";

// Content loader: a small, dependency-light hand-rolled loader
// (gray-matter + marked) with a zod-validated contract. Kept intentionally
// over heavier build-time codegen tooling (e.g. Velite) for simplicity;
// swapping to Velite later is a drop-in change scoped to this file.

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
        console.warn(
          `[content] skipping content/work/${slug}: invalid frontmatter`,
          parsed.error.flatten(),
        );
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
        console.warn(
          `[content] skipping content/writing/${slug}: invalid frontmatter`,
          parsed.error.flatten(),
        );
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

// Extra tags/attributes beyond sanitize-html's safe defaults that markdown
// authors may legitimately use. `javascript:` URLs, event handlers, and
// <script>/<iframe> are stripped by the library's defaults.
const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    ...sanitizeHtml.defaults.allowedTags,
    "img",
    "picture",
    "source",
    "figcaption",
    "figure",
    "video",
    "audio",
  ],
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ["src", "alt", "width", "height", "loading", "srcset", "sizes"],
    source: ["src", "srcset", "type", "media"],
    video: ["src", "controls", "poster", "width", "height"],
    audio: ["src", "controls"],
    a: ["href", "name", "target", "rel"],
  },
};

export async function renderMarkdown(body: string): Promise<string> {
  const raw = await marked.parse(body, { async: true });
  // Defense-in-depth: content is authored locally under our control, but
  // sanitization strips anything that shouldn't reach `dangerouslySetInnerHTML`
  // (event handlers, javascript: URLs, scripts) if a file is ever compromised.
  return sanitizeHtml(raw, SANITIZE_OPTIONS);
}
