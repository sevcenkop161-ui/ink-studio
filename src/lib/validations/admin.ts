import { z } from "zod";

const slugField = z
  .string()
  .trim()
  .min(1)
  .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers, and hyphens only.");

export const artistSchema = z.object({
  name: z.string().trim().min(1),
  slug: slugField,
  bio_en: z.string().trim().min(1),
  bio_ru: z.string().trim().min(1),
  specialization_en: z.string().trim().min(1),
  specialization_ru: z.string().trim().min(1),
  experience_years: z.number().int().min(0),
  is_active: z.boolean(),
});

export type ArtistFormData = z.infer<typeof artistSchema>;

export const serviceSchema = z.object({
  slug: slugField,
  name_en: z.string().trim().min(1),
  name_ru: z.string().trim().min(1),
  description_en: z.string().trim().min(1),
  description_ru: z.string().trim().min(1),
  duration_display_en: z.string().trim().min(1),
  duration_display_ru: z.string().trim().min(1),
  price_from: z.number().min(0),
  duration_minutes: z.number().int().min(0),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;
