"use client";

import { useTranslations } from "next-intl";
import { TIME_SLOTS } from "@/lib/booking-datetime";

type Props = {
  selected: string | null;
  onSelect: (time: string) => void;
};

export function TimeStep({ selected, onSelect }: Props) {
  const t = useTranslations("Booking");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{t("steps.time.title")}</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {TIME_SLOTS.map((time) => {
          const isSelected = selected === time;
          return (
            <button
              key={time}
              type="button"
              onClick={() => onSelect(time)}
              aria-pressed={isSelected}
              className={`rounded-md border py-3 text-sm transition-colors duration-200 ${
                isSelected
                  ? "border-accent bg-accent text-white"
                  : "border-border text-text-secondary hover:border-border-hover hover:text-text"
              }`}
            >
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
}
