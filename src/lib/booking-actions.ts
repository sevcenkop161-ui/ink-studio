"use server";

import { createServerClient } from "@/lib/supabase/server";
import { notifyTelegramNewBooking } from "@/lib/telegram";
import { bookingSchema, type BookingFormData } from "@/lib/validations/booking";

export type SubmitBookingResult =
  | { success: true }
  | { success: false; error: "conflict" | "invalid" | "unknown" };

export async function submitBooking(
  data: BookingFormData,
): Promise<SubmitBookingResult> {
  // Honeypot: a filled "company" field means a bot filled every input.
  // Pretend success without touching the database.
  if (data.contact.company) {
    return { success: true };
  }

  const parsed = bookingSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: "invalid" };
  }

  const supabase = createServerClient();

  const [{ data: artist }, { data: service }] = await Promise.all([
    supabase
      .from("artists")
      .select("id, name")
      .eq("slug", parsed.data.artistSlug)
      .maybeSingle(),
    supabase
      .from("services")
      .select("id, name_en")
      .eq("slug", parsed.data.serviceSlug)
      .maybeSingle(),
  ]);

  if (!artist || !service) {
    return { success: false, error: "invalid" };
  }

  const { error } = await supabase.from("bookings").insert({
    client_name: parsed.data.contact.name,
    phone: parsed.data.contact.phone || null,
    telegram: parsed.data.contact.telegram || null,
    artist_id: artist.id,
    service_id: service.id,
    booking_date: parsed.data.date,
    booking_time: parsed.data.time,
    comment: parsed.data.contact.comment || null,
  });

  if (error) {
    // 23505 = unique_violation — the DB's partial unique index on
    // (artist_id, booking_date, booking_time) caught a double-booking.
    if (error.code === "23505") {
      return { success: false, error: "conflict" };
    }
    console.error("[booking] insert failed:", error);
    return { success: false, error: "unknown" };
  }

  await notifyTelegramNewBooking({
    clientName: parsed.data.contact.name,
    phone: parsed.data.contact.phone || null,
    telegram: parsed.data.contact.telegram || null,
    serviceName: service.name_en,
    artistName: artist.name,
    date: parsed.data.date,
    time: parsed.data.time,
    comment: parsed.data.contact.comment || null,
  });

  return { success: true };
}
