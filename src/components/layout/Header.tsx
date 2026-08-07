"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { navItems } from "@/components/layout/nav-items";

export function Header() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 transition-[background-color,padding,border-color] duration-300 ${
          scrolled
            ? "border-b border-border bg-bg/80 py-3 backdrop-blur-md"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Ink Studio
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-text"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/booking" size="md">
              {t("cta")}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label={t("menu")}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text lg:hidden"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 4.5H17M1 9H17M1 13.5H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
