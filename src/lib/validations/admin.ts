import { z } from "zod";

const slugField = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only.");

export const artistSchema = z.object({
  name: z.string().trim().min(1).max(100),
  slug: slugField,
  bio_en: z.string().trim().min(1).max(2000),
  bio_ru: z.string().trim().min(1).max(2000),
  specialization_en: z.string().trim().min(1).max(200),
  specialization_ru: z.string().trim().min(1).max(200),
  experience_years: z.number().int().min(0).max(100),
  is_active: z.boolean(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;

export const serviceSchema = z.object({
  slug: slugField,
  name_en: z.string().trim().min(1).max(150),
  name_ru: z.string().trim().min(1).max(150),
  description_en: z.string().trim().min(1).max(2000),
  description_ru: z.string().trim().min(1).max(2000),
  duration_display_en: z.string().trim().min(1).max(100),
  duration_display_ru: z.string().trim().min(1).max(100),
  price_from: z.number().min(0).max(1_000_000),
  duration_minutes: z.number().int().min(0).max(100_000),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
