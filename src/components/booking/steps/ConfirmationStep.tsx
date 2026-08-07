"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { artists } from "@/data/artists";
import { services } from "@/data/services";
import { formatDateKey } from "@/lib/booking-datetime";
import type { BookingData } from "@/components/booking/BookingWizard";

type Props = {
  data: BookingData;
  status: "idle" | "submitting" | "error";
  onConfirm: () => void;
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <dt className="text-text-secondary">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

export function ConfirmationStep({ data, status, onConfirm }: Props) {
  const locale = useLocale();
  const t = useTranslations("Booking");
  const tServices = useTranslations("Services");

  const artist = artists.find((a) => a.slug === data.artistSlug);
  const service = services.find((s) => s.slug === data.serviceSlug);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{t("steps.confirm.title")}</h2>

      <dl className="divide-y divide-border rounded-lg border border-border">
        <Row
          label={t("summary.service")}
          value={service ? tServices(`items.${service.slug}.name`) : "—"}
        />
        <Row label={t("summary.artist")} value={artist?.name ?? "—"} />
        <Row
          label={t("summary.date")}
          value={data.date ? formatDateKey(data.date, locale) : "—"}
        />
        <Row label={t("summary.time")} value={data.time ?? "—"} />
        <Row label={t("summary.name")} value={data.contact?.name ?? "—"} />
        {data.contact?.phone && (
          <Row label={t("summary.phone")} value={data.contact.phone} />
        )}
        {data.contact?.telegram && (
          <Row label={t("summary.telegram")} value={data.contact.telegram} />
        )}
        {data.contact?.comment && (
          <Row label={t("summary.comment")} value={data.contact.comment} />
        )}
      </dl>

      {status === "error" && (
        <p className="text-sm text-red-400">{t("errors.submit")}</p>
      )}

      <Button
        type="button"
        onClick={onConfirm}
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? t("submitting") : t("confirm")}
      </Button>
    </div>
  );
}
