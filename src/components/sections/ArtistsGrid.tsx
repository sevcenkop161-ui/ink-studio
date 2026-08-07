"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import type { ArtistWithLocale } from "@/lib/data/artists";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ArtistsGrid({ artists }: { artists: ArtistWithLocale[] }) {
  const t = useTranslations("Artists");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-xl space-y-4">
        <motion.p
          variants={fadeUp}
          className="text-sm tracking-[0.2em] text-text-secondary uppercase"
        >
          {t("eyebrow")}
        </motion.p>
        <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl">
          {t("heading")}
        </motion.h2>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {artists.map((artist, index) => (
          <motion.div key={artist.slug} variants={fadeUp}>
            <Link href={`/artists/${artist.slug}`} className="group block">
              <PlaceholderVisual index={index} className="aspect-[3/4]" />
              <div className="mt-4 space-y-1">
                <h3 className="font-medium">{artist.name}</h3>
                <p className="text-sm text-text-secondary">
                  {artist.specialization}
                </p>
                <p className="line-clamp-2 text-sm text-text-secondary">
                  {artist.bio}
                </p>
                <span className="inline-block pt-2 text-sm text-accent transition-colors duration-200 group-hover:text-accent-hover">
                  {t("viewProfile")} →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
