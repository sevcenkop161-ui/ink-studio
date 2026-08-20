"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import type { ServiceWithLocale } from "@/lib/data/services";

type Props = {
  services: ServiceWithLocale[];
  selected: string | null;
  onSelect: (slug: string) => void;
};

export function ServiceStep({ services, selected, onSelect }: Props) {
  const t = useTranslations("Services");
  const tBooking = useTranslations("Booking");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{tBooking("steps.service.title")}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {services.map((service) => {
          const isSelected = selected === service.slug;
          return (
            <button
              key={service.slug}
              type="button"
              onClick={() => onSelect(service.slug)}
              className="text-left"
              aria-pressed={isSelected}
            >
              <Card
                className={
                  isSelected ? "border-accent" : "hover:border-border-hover"
                }
              >
                <h3 className="font-medium">{service.name}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {service.priceFrom === 0
                    ? t("free")
                    : `${t("priceFromLabel")} ${service.priceFrom.toLocaleString("ru-RU")} ₽`}
                </p>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
