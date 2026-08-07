import { getLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { getServices } from "@/lib/data/services";

export async function Services() {
  const locale = await getLocale();
  const services = await getServices(locale);

  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <ServicesGrid services={services} />
      </Container>
    </section>
  );
}
