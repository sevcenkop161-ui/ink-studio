import type { BookingFormData } from "@/lib/validations/booking";

export type SubmitBookingResult =
  | { success: true }
  | { success: false; error: string };

/**
 * Placeholder for the real booking submission. Phase 11 replaces the body
 * of this function with a Server Action that validates the payload again
 * on the server, inserts it into Supabase, and relies on the DB's unique
 * constraint to reject double-booked slots. The signature stays the same
 * so the wizard UI doesn't need to change when the real logic lands.
 */
export async function submitBooking(
  data: BookingFormData,
): Promise<SubmitBookingResult> {
  if (data.contact.company) {
    // Honeypot tripped — pretend success without doing anything.
    return { success: true };
  }

  await new Promise((resolve) => setTimeout(resolve, 900));
  return { success: true };
}
