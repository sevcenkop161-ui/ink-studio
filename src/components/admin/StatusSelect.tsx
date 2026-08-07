"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/lib/admin/bookings";
import type { BookingStatus } from "@/types/database";

const STATUSES: BookingStatus[] = ["new", "confirmed", "completed", "cancelled"];

export function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: BookingStatus;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      value={status}
      disabled={isPending}
      onChange={(event) => {
        const next = event.target.value as BookingStatus;
        startTransition(() => {
          updateBookingStatus(id, next);
        });
      }}
      className="rounded-md border border-border bg-bg-secondary px-2 py-1 text-sm capitalize disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
