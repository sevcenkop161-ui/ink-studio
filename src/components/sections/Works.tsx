import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { WorksGallery } from "@/components/sections/WorksGallery";
import { getWorks } from "@/lib/data/works";

export async function Works() {
  const locale = await getLocale();
  const works = await getWorks(locale);

  return (
    <section
      id="works"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <WorksGallery works={works} />
      </Container>
    </section>
  );
}
