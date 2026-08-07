import { getLocale, getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ReviewsCarousel } from "@/components/sections/ReviewsCarousel";
import { getReviews } from "@/lib/data/reviews";

export async function Reviews() {
  const locale = await getLocale();
  const t = await getTranslations("Reviews");
  const reviews = await getReviews(locale);

  if (reviews.length === 0) return null;

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <div className="max-w-xl space-y-4">
          <p className="text-sm tracking-[0.2em] text-text-secondary uppercase">
            {t("eyebrow")}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl">{t("heading")}</h2>
        </div>

        <div className="mt-12">
          <ReviewsCarousel reviews={reviews} />
        </div>
      </Container>
    </section>
  );
}
