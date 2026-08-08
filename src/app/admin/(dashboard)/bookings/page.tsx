import Link from "next/link";
import { getBookingsAdmin } from "@/lib/admin/bookings";
import { StatusSelect } from "@/components/admin/StatusSelect";
import type { BookingStatus } from "@/types/database";

const FILTERS: Array<{ label: string; value: BookingStatus | "all" }> = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const bookings = await getBookingsAdmin();
  const filtered =
    status && status !== "all"
      ? bookings.filter((b) => b.status === status)
      : bookings;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl">Bookings</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {filtered.length} of {bookings.length} bookings
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter) => {
          const isActive = (status ?? "all") === filter.value;
          return (
            <Link
              key={filter.value}
              href={
                filter.value === "all"
                  ? "/admin/bookings"
                  : `/admin/bookings?status=${filter.value}`
              }
              className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                isActive
                  ? "border-accent-solid bg-accent-solid text-white"
                  : "border-border text-text-secondary hover:border-border-hover hover:text-text"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="px-4 py-3 font-medium">Date &amp; time</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium">Artist</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((booking) => (
              <tr key={booking.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 whitespace-nowrap">
                  {booking.date} {booking.time.slice(0, 5)}
                </td>
                <td className="px-4 py-3">{booking.clientName}</td>
                <td className="px-4 py-3 text-text-secondary">
                  {[booking.phone, booking.telegram].filter(Boolean).join(" · ") || "—"}
                </td>
                <td className="px-4 py-3">{booking.serviceName}</td>
                <td className="px-4 py-3">{booking.artistName}</td>
                <td className="px-4 py-3">
                  <StatusSelect id={booking.id} status={booking.status} />
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-text-secondary">
                  No bookings here yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
