"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import type { BookingStatus } from "@/types/database";

export type AdminBooking = {
  id: string;
  clientName: string;
  phone: string | null;
  telegram: string | null;
  artistName: string;
  serviceName: string;
  date: string;
  time: string;
  comment: string | null;
  status: BookingStatus;
  createdAt: string;
};

export async function getBookingsAdmin(): Promise<AdminBooking[]> {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("bookings")
    .select("*, artists(name), services(name_en)")
    .order("booking_date", { ascending: true })
    .order("booking_time", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    clientName: row.client_name,
    phone: row.phone,
    telegram: row.telegram,
    artistName: row.artists?.name ?? "—",
    serviceName: row.services?.name_en ?? "—",
    date: row.booking_date,
    time: row.booking_time,
    comment: row.comment,
    status: row.status,
    createdAt: row.created_at,
  }));
}

export async function updateBookingStatus(
  id: string,
  status: BookingStatus,
): Promise<void> {
  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) throw error;

  revalidatePath("/admin/bookings");
}
