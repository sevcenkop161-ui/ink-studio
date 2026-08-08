import { describe, expect, it } from "vitest";
import { formatDateKey, getUpcomingDates, toDateKey } from "./booking-datetime";

describe("getUpcomingDates", () => {
  it("returns the requested number of consecutive days starting today", () => {
    const dates = getUpcomingDates(5);
    expect(dates).toHaveLength(5);
    for (let i = 1; i < dates.length; i++) {
      const diffDays =
        (dates[i].getTime() - dates[i - 1].getTime()) / (1000 * 60 * 60 * 24);
      expect(diffDays).toBe(1);
    }
  });

  it("zeroes out the time so every date is midnight local time", () => {
    const [first] = getUpcomingDates(1);
    expect(first.getHours()).toBe(0);
    expect(first.getMinutes()).toBe(0);
    expect(first.getSeconds()).toBe(0);
  });
});

describe("toDateKey / formatDateKey round-trip", () => {
  it("formats a date as YYYY-MM-DD with zero-padding", () => {
    const date = new Date(2026, 2, 5); // March 5, 2026 (month is 0-indexed)
    expect(toDateKey(date)).toBe("2026-03-05");
  });

  it("parses a date key back into a human-readable label", () => {
    const label = formatDateKey("2026-03-05", "en");
    // Don't assert the exact locale string (ICU formatting can vary by
    // platform); just confirm it round-tripped the right calendar date.
    expect(label).toContain("March");
    expect(label).toContain("5");
  });

  it("keeps the same calendar date across the round trip for every day of a month", () => {
    const dates = getUpcomingDates(31);
    for (const date of dates) {
      const key = toDateKey(date);
      const [year, month, day] = key.split("-").map(Number);
      expect(year).toBe(date.getFullYear());
      expect(month).toBe(date.getMonth() + 1);
      expect(day).toBe(date.getDate());
    }
  });
});
