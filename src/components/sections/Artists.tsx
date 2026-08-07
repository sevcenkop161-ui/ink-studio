import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ArtistsGrid } from "@/components/sections/ArtistsGrid";
import { getArtists } from "@/lib/data/artists";

export async function Artists() {
  const locale = await getLocale();
  const artists = await getArtists(locale);

  return (
    <section
      id="artists"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <ArtistsGrid artists={artists} />
      </Container>
    </section>
  );
}
