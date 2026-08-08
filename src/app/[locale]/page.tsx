import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { Advantages } from "@/components/sections/Advantages";
import { Artists } from "@/components/sections/Artists";
import { Works } from "@/components/sections/Works";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Contacts } from "@/components/sections/Contacts";

// Content (artists/services/works/reviews) is admin-managed and changes
// rarely — statically generate this page and refresh it periodically
// instead of hitting the database on every request. Admin mutations also
// call revalidatePath() for instant updates in between (see src/lib/admin).
export const revalidate = 3600;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Studio />
      <Advantages />
      <Artists />
      <Works />
      <Services />
      <Reviews />
      <FAQ />
      <Contacts />
    </main>
  );
}
