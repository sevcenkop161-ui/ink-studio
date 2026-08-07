import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex flex-1 items-center py-24">
      <Container className="flex flex-col gap-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.2em] text-text-secondary">
            Design system preview
          </p>
          <h1 className="font-display text-6xl">{t("title")}</h1>
          <p className="max-w-md text-text-secondary">
            Luxury minimalism, editorial, dark digital.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button href="/booking">Записаться</Button>
          <Button href="/works" variant="secondary">
            Смотреть работы
          </Button>
          <Button variant="ghost">Ghost</Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <h3 className="font-medium">Individual Design</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Индивидуальный подход к каждой работе.
            </p>
          </Card>
          <Card>
            <h3 className="font-medium">Experienced Artists</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Мастера с разными стилями и специализациями.
            </p>
          </Card>
          <Card>
            <h3 className="font-medium">Premium Materials</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Качественные материалы и оборудование.
            </p>
          </Card>
        </div>
      </Container>
    </main>
  );
}
