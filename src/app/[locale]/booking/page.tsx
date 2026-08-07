import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { getArtists } from "@/lib/data/artists";
import { getServices } from "@/lib/data/services";

export default async function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [artists, services] = await Promise.all([
    getArtists(locale),
    getServices(locale),
  ]);

  return (
    <main className="flex-1 pt-32 pb-24">
      <Container className="max-w-2xl">
        <Suspense fallback={null}>
          <BookingWizard artists={artists} services={services} />
        </Suspense>
      </Container>
    </main>
  );
}
