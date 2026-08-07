"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export function SuccessScreen() {
  const t = useTranslations("Booking");

  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="space-y-2">
        <h2 className="font-display text-3xl">{t("success.title")}</h2>
        <p className="max-w-sm text-text-secondary">{t("success.body")}</p>
      </div>
      <Button href="/" variant="secondary">
        {t("success.backHome")}
      </Button>
    </div>
  );
}
