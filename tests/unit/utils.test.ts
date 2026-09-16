import { describe, expect, it } from "vitest";

import { cn, readingTime } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class values and drops falsy ones", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("readingTime", () => {
  it("estimates at least 1 minute for short text", () => {
    expect(readingTime("hello world")).toBe(1);
  });

  it("scales roughly with word count at 200wpm", () => {
    const text = Array(400).fill("word").join(" ");
    expect(readingTime(text)).toBe(2);
  });
});
