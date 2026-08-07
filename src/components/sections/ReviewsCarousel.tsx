"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Card } from "@/components/ui/Card";
import type { ReviewWithLocale } from "@/lib/data/reviews";
import { fadeUp, staggerContainer } from "@/lib/motion";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 1.5l2.6 5.6 6 .7-4.4 4.2 1.1 6-5.3-3-5.3 3 1.1-6-4.4-4.2 6-.7L10 1.5z"
            fill={i < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: ReviewWithLocale[] }) {
  const t = useTranslations("Reviews");

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3"
    >
      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          variants={fadeUp}
          className="w-[85vw] flex-none snap-start sm:w-auto"
        >
          <Card className="flex h-full flex-col gap-4">
            <div className="flex items-center gap-3">
              <Avatar name={review.name} index={index} />
              <div>
                <p className="font-medium">{review.name}</p>
                <Stars rating={review.rating} />
              </div>
            </div>
            <p className="text-sm text-text-secondary">{review.text}</p>
            {review.artistSlug && (
              <Link
                href={`/artists/${review.artistSlug}`}
                className="mt-auto text-sm text-accent hover:text-accent-hover"
              >
                {t("viewArtist")} →
              </Link>
            )}
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
