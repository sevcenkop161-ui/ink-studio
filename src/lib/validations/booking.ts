import { z } from "zod";

export const contactSchema = z
  .object({
    name: z.string().trim().min(2).max(80),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
    telegram: z.string().trim().max(50).optional().or(z.literal("")),
    comment: z.string().trim().max(500).optional().or(z.literal("")),
    // Honeypot: real visitors never see or fill this field. If it has a
    // value, the submission is treated as spam and silently dropped.
    company: z.string().max(0).optional().or(z.literal("")),
  })
  .refine((data) => Boolean(data.phone) || Boolean(data.telegram), {
    message: "contactRequired",
    path: ["phone"],
  });

export type ContactFormData = z.infer<typeof contactSchema>;

export const bookingSchema = z.object({
  serviceSlug: z.string().min(1),
  artistSlug: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  contact: contactSchema,
});

export type BookingFormData = z.infer<typeof bookingSchema>;
