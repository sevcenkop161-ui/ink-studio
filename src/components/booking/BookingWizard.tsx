"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BookingProgress } from "@/components/booking/BookingProgress";
import { ServiceStep } from "@/components/booking/steps/ServiceStep";
import { ArtistStep } from "@/components/booking/steps/ArtistStep";
import { DateStep } from "@/components/booking/steps/DateStep";
import { TimeStep } from "@/components/booking/steps/TimeStep";
import { ContactStep } from "@/components/booking/steps/ContactStep";
import { ConfirmationStep } from "@/components/booking/steps/ConfirmationStep";
import { SuccessScreen } from "@/components/booking/SuccessScreen";
import { submitBooking } from "@/lib/booking-actions";
import type { ArtistWithLocale } from "@/lib/data/artists";
import type { ServiceWithLocale } from "@/lib/data/services";
import type { ContactFormData } from "@/lib/validations/booking";

const STEPS = ["service", "artist", "date", "time", "contact", "confirm"] as const;
type Step = (typeof STEPS)[number];
type Status = "idle" | "submitting" | "error" | "success";
type ErrorReason = "conflict" | "generic" | null;

export type BookingData = {
  serviceSlug: string | null;
  artistSlug: string | null;
  date: string | null;
  time: string | null;
  contact: ContactFormData | null;
};

type Props = {
  artists: ArtistWithLocale[];
  services: ServiceWithLocale[];
};

export function BookingWizard({ artists, services }: Props) {
  const searchParams = useSearchParams();
  const t = useTranslations("Booking");

  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<BookingData>(() => ({
    serviceSlug: searchParams.get("service"),
    artistSlug: searchParams.get("artist"),
    date: null,
    time: null,
    contact: null,
  }));
  const [status, setStatus] = useState<Status>("idle");
  const [errorReason, setErrorReason] = useState<ErrorReason>(null);

  const step: Step = STEPS[stepIndex];

  const canGoNext =
    (step === "service" && data.serviceSlug !== null) ||
    (step === "artist" && data.artistSlug !== null) ||
    (step === "date" && data.date !== null) ||
    (step === "time" && data.time !== null);

  function goNext() {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function handleConfirm() {
    if (!data.serviceSlug || !data.artistSlug || !data.date || !data.time || !data.contact) {
      return;
    }

    setStatus("submitting");
    setErrorReason(null);

    const result = await submitBooking({
      serviceSlug: data.serviceSlug,
      artistSlug: data.artistSlug,
      date: data.date,
      time: data.time,
      contact: data.contact,
    });

    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorReason(result.error === "conflict" ? "conflict" : "generic");
    }
  }

  if (status === "success") {
    return <SuccessScreen />;
  }

  return (
    <div className="space-y-10">
      <BookingProgress
        currentIndex={stepIndex}
        total={STEPS.length}
        labels={STEPS.map((s) => t(`steps.${s}.label`))}
      />

      {step === "service" && (
        <ServiceStep
          services={services}
          selected={data.serviceSlug}
          onSelect={(serviceSlug) => setData((d) => ({ ...d, serviceSlug }))}
        />
      )}
      {step === "artist" && (
        <ArtistStep
          artists={artists}
          selected={data.artistSlug}
          onSelect={(artistSlug) => setData((d) => ({ ...d, artistSlug }))}
        />
      )}
      {step === "date" && (
        <DateStep
          selected={data.date}
          onSelect={(date) => setData((d) => ({ ...d, date, time: null }))}
        />
      )}
      {step === "time" && (
        <TimeStep
          artistSlug={data.artistSlug}
          date={data.date}
          artists={artists}
          selected={data.time}
          onSelect={(time) => setData((d) => ({ ...d, time }))}
        />
      )}
      {step === "contact" && (
        <ContactStep
          defaultValues={data.contact}
          onSubmit={(contact) => {
            setData((d) => ({ ...d, contact }));
            goNext();
          }}
        />
      )}
      {step === "confirm" && (
        <ConfirmationStep
          data={data}
          artists={artists}
          services={services}
          errorReason={errorReason}
        />
      )}

      <div className="flex justify-between border-t border-border pt-6">
        <Button
          type="button"
          variant="ghost"
          onClick={goBack}
          disabled={stepIndex === 0}
          className={stepIndex === 0 ? "invisible" : ""}
        >
          {t("back")}
        </Button>

        {step === "contact" && (
          <Button type="submit" form="contact-step-form" size="lg">
            {t("next")}
          </Button>
        )}
        {step !== "contact" && step !== "confirm" && (
          <Button type="button" onClick={goNext} disabled={!canGoNext} size="lg">
            {t("next")}
          </Button>
        )}
        {step === "confirm" && (
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={status === "submitting"}
            size="lg"
          >
            {status === "submitting" ? t("submitting") : t("confirm")}
          </Button>
        )}
      </div>
    </div>
  );
}
