import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { artists, getArtistBySlug } from "@/data/artists";
import { getWorksByArtist } from "@/data/works";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    artists.map((artist) => ({ locale, slug: artist.slug })),
  );
}

type Params = { locale: string; slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return {};

  const t = await getTranslations({ locale, namespace: "Artists" });

  return {
    title: `${artist.name} — Ink Studio`,
    description: t(`items.${slug}.description`),
  };
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const index = artists.findIndex((a) => a.slug === slug);
  const t = await getTranslations("Artists");
  const tWorks = await getTranslations("Works");
  const artistWorks = getWorksByArtist(slug);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <PlaceholderVisual index={index} className="aspect-[4/5]" />

          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-sm tracking-[0.2em] text-text-secondary uppercase">
                {t(`items.${slug}.specialization`)}
              </p>
              <h1 className="font-display text-5xl">{artist.name}</h1>
            </div>

            <div className="flex gap-10 border-y border-border py-6 text-sm">
              <div>
                <p className="text-text-secondary">
                  {t("experienceLabel")}
                </p>
                <p className="mt-1">
                  {artist.experienceYears} {t("yearsSuffix")}
                </p>
              </div>
              <div>
                <p className="text-text-secondary">
                  {t("specializationLabel")}
                </p>
                <p className="mt-1">{t(`items.${slug}.specialization`)}</p>
              </div>
            </div>

            <p className="max-w-md text-text-secondary">
              {t(`items.${slug}.bio`)}
            </p>

            <Button href={`/booking?artist=${slug}`} size="lg">
              {t("bookWithArtist", { name: artist.name })}
            </Button>
          </div>
        </div>

        {artistWorks.length > 0 && (
          <div className="mt-20 border-t border-border pt-16">
            <h2 className="font-display text-3xl">
              {t("worksHeading", { name: artist.name })}
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3">
              {artistWorks.map((work, workIndex) => (
                <div key={work.slug}>
                  <PlaceholderVisual
                    index={workIndex}
                    className="aspect-square"
                  />
                  <div className="mt-3">
                    <p className="text-sm font-medium">{work.title}</p>
                    <p className="text-sm text-text-secondary">
                      {tWorks(`filters.${work.category}`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
