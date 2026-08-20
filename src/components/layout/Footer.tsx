import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { navItems } from "@/components/layout/nav-items";

export function Footer() {
  const t = useTranslations("Nav");
  const tFooter = useTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-10 py-16">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase">
              Ink Studio
            </p>
            <p className="text-sm text-text-secondary">
              {tFooter("eyebrow")}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-secondary"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="transition-colors duration-200 hover:text-text"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2 text-sm text-text-secondary">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-text"
            >
              Telegram
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-text"
            >
              Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-8 text-xs text-text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {tFooter("rights")}
          </p>
          <a
            href="https://t.me/angelqqppp"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-text"
          >
            {tFooter("authorLabel")}
          </a>
          <Link
            href="/privacy"
            className="transition-colors duration-200 hover:text-text"
          >
            {tFooter("privacy")}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
