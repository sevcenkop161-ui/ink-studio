import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getArtists } from "@/lib/data/artists";
import { getServices } from "@/lib/data/services";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("booking.title"),
    description: t("booking.description"),
  };
}

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [artists, services, t] = await Promise.all([
    getArtists(locale),
    getServices(locale),
    getTranslations({ locale, namespace: "Metadata" }),
  ]);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container className="max-w-2xl">
        <h1 className="sr-only">{t("booking.title")}</h1>
        <Suspense fallback={null}>
          <BookingWizard artists={artists} services={services} />
        </Suspense>
      </Container>
    </main>
  );
}
