"use client";

import { useLocale, useTranslations } from "next-intl";
import { getUpcomingDates, toDateKey } from "@/lib/booking-datetime";

type Props = {
  selected: string | null;
  onSelect: (date: string) => void;
};

export function DateStep({ selected, onSelect }: Props) {
  const locale = useLocale();
  const t = useTranslations("Booking");
  const dates = getUpcomingDates(21);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{t("steps.date.title")}</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {dates.map((date) => {
          const key = toDateKey(date);
          const isSelected = selected === key;
          const weekday = new Intl.DateTimeFormat(locale, {
            weekday: "short",
          }).format(date);
          const day = new Intl.DateTimeFormat(locale, {
            day: "numeric",
          }).format(date);
          const month = new Intl.DateTimeFormat(locale, {
            month: "short",
          }).format(date);

          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={isSelected}
              className={`flex w-16 flex-none flex-col items-center rounded-md border py-3 text-sm transition-colors duration-200 ${
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-border text-text-secondary hover:border-border-hover hover:text-text"
              }`}
            >
              <span className="text-xs uppercase">{weekday}</span>
              <span className="mt-1 text-lg font-medium">{day}</span>
              <span className="text-xs">{month}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
