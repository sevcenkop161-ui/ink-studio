import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export default function PrivacyPage() {
  const t = useTranslations("PrivacyPage");

  return (
    <main className="flex-1 py-24">
      <Container className="max-w-3xl space-y-6">
        <h1 className="font-display text-4xl">{t("title")}</h1>
        <p className="text-text-secondary">{t("body")}</p>
      </Container>
    </main>
  );
}
