import { describe, expect, it } from "vitest";
import { slugify } from "./slugify";

describe("slugify", () => {
  it("lowercases and hyphenates plain ASCII names", () => {
    expect(slugify("Alex Turner")).toBe("alex-turner");
  });

  it("strips punctuation and collapses repeated separators", () => {
    expect(slugify("  Mia -- O'Neil!!  ")).toBe("mia-o-neil");
  });

  it("transliterates Cyrillic names instead of producing an empty slug", () => {
    // This is the real bug that shipped: a Cyrillic-only name used to
    // strip to nothing because the old regex only handled a-z0-9.
    expect(slugify("Александра")).toBe("aleksandra");
  });

  it("transliterates a mixed Cyrillic full name", () => {
    expect(slugify("Иван Петров")).toBe("ivan-petrov");
  });

  it("drops soft/hard signs without leaving a stray hyphen", () => {
    expect(slugify("Ольга")).toBe("olga");
  });

  it("returns an empty string for input with no representable characters", () => {
    expect(slugify("!!!")).toBe("");
  });
});
