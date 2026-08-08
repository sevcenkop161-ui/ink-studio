import { describe, expect, it } from "vitest";
import { artistSchema, serviceSchema } from "./admin";

const validArtist = {
  name: "Alex Turner",
  slug: "alex-turner",
  bio_en: "Bio",
  bio_ru: "Био",
  specialization_en: "Blackwork",
  specialization_ru: "Блэкворк",
  experience_years: 8,
  is_active: true,
};

describe("artistSchema", () => {
  it("accepts a valid artist", () => {
    expect(artistSchema.safeParse(validArtist).success).toBe(true);
  });

  it("rejects a slug with uppercase or spaces", () => {
    expect(
      artistSchema.safeParse({ ...validArtist, slug: "Alex Turner" }).success,
    ).toBe(false);
  });

  it("rejects a slug with Cyrillic characters left untransliterated", () => {
    // This is the real bug: the admin form used to let a raw Cyrillic
    // name through to this field before the slugify auto-fill existed.
    expect(
      artistSchema.safeParse({ ...validArtist, slug: "александра" }).success,
    ).toBe(false);
  });

  it("rejects an unreasonably long bio (defense-in-depth length cap)", () => {
    expect(
      artistSchema.safeParse({ ...validArtist, bio_en: "a".repeat(2001) })
        .success,
    ).toBe(false);
  });

  it("rejects negative experience years", () => {
    expect(
      artistSchema.safeParse({ ...validArtist, experience_years: -1 }).success,
    ).toBe(false);
  });
});

const validService = {
  slug: "fine-line",
  name_en: "Fine Line",
  name_ru: "Тонкие линии",
  description_en: "Description",
  description_ru: "Описание",
  duration_display_en: "1-2 hours",
  duration_display_ru: "1-2 часа",
  price_from: 80,
  duration_minutes: 90,
};

describe("serviceSchema", () => {
  it("accepts a valid service", () => {
    expect(serviceSchema.safeParse(validService).success).toBe(true);
  });

  it("accepts a free (zero price) service", () => {
    expect(
      serviceSchema.safeParse({ ...validService, price_from: 0 }).success,
    ).toBe(true);
  });

  it("rejects a negative price", () => {
    expect(
      serviceSchema.safeParse({ ...validService, price_from: -10 }).success,
    ).toBe(false);
  });
});
