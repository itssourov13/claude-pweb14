import { describe, expect, it } from "vitest";

import { getAllNotes, getAllWork } from "@/lib/content";

describe("content loader", () => {
  it("reads and validates the sample work case studies", () => {
    const work = getAllWork();
    expect(work.length).toBeGreaterThan(0);
    expect(work.every((item) => item.title.length > 0)).toBe(true);
  });

  it("reads and validates the sample writing posts", () => {
    const notes = getAllNotes();
    expect(notes.length).toBeGreaterThan(0);
    expect(notes.every((note) => note.readingTimeMinutes >= 1)).toBe(true);
  });
});
