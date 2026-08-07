"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { createBrowserClient } from "@/lib/supabase/client";
import type { ArtistWithLocale } from "@/lib/data/artists";
import { TIME_SLOTS } from "@/lib/booking-datetime";

type Props = {
  artistSlug: string | null;
  date: string | null;
  artists: ArtistWithLocale[];
  selected: string | null;
  onSelect: (time: string) => void;
};

type FetchResult =
  | { key: string; status: "loaded"; times: string[] }
  | { key: string; status: "error" };

export function TimeStep({ artistSlug, date, artists, selected, onSelect }: Props) {
  const t = useTranslations("Booking");
  const [result, setResult] = useState<FetchResult | null>(null);

  const artist = artists.find((a) => a.slug === artistSlug);
  const requestKey = artist && date ? `${artist.id}:${date}` : null;

  useEffect(() => {
    const currentArtist = artists.find((a) => a.slug === artistSlug);
    if (!currentArtist || !date) return;

    const key = `${currentArtist.id}:${date}`;
    let cancelled = false;

    const supabase = createBrowserClient();
    supabase
      .rpc("get_booked_times", { p_artist_id: currentArtist.id, p_date: date })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setResult({ key, status: "error" });
        } else {
          setResult({
            key,
            status: "loaded",
            times: (data ?? []).map((row) => row.booking_time.slice(0, 5)),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [artistSlug, date, artists]);

  const isCurrent = result !== null && result.key === requestKey;
  const loading = !isCurrent;
  const loadError = isCurrent && result.status === "error";
  const bookedTimes = isCurrent && result.status === "loaded" ? result.times : [];

  return (
    <div className="space-y-6">
      <h2 className="font-display text-2xl">{t("steps.time.title")}</h2>

      {loading && (
        <p className="text-sm text-text-secondary">{t("loadingTimes")}</p>
      )}
      {!loading && loadError && (
        <p className="text-sm text-red-400">{t("errors.loadTimes")}</p>
      )}

      {!loading && !loadError && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {TIME_SLOTS.map((time) => {
            const isTaken = bookedTimes.includes(time);
            const isSelected = selected === time;
            return (
              <button
                key={time}
                type="button"
                onClick={() => onSelect(time)}
                disabled={isTaken}
                aria-pressed={isSelected}
                className={`rounded-md border py-3 text-sm transition-colors duration-200 ${
                  isTaken
                    ? "cursor-not-allowed border-border text-text-secondary/40 line-through"
                    : isSelected
                      ? "border-accent bg-accent text-white"
                      : "border-border text-text-secondary hover:border-border-hover hover:text-text"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
