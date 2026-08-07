"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { artists } from "@/data/artists";

type Props = {
  selected: string | null;
  onSelect: (slug: string) => void;
};

export function ArtistStep({ selected, onSelect }: Props) {
  const t = useTranslations("Artists");
  const tBooking = useTranslations("Booking");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{tBooking("steps.artist.title")}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map((artist) => {
          const isSelected = selected === artist.slug;
          return (
            <button
              key={artist.slug}
              type="button"
              onClick={() => onSelect(artist.slug)}
              className="text-left"
              aria-pressed={isSelected}
            >
              <Card
                className={
                  isSelected ? "border-accent" : "hover:border-border-hover"
                }
              >
                <h3 className="font-medium">{artist.name}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {t(`items.${artist.slug}.specialization`)}
                </p>
              </Card>
            </button>
          );
        })}
      </div>
    </div>
  );
}
