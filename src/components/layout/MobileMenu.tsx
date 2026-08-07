"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { navItems } from "@/components/layout/nav-items";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: Props) {
  const t = useTranslations("Nav");

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("menu")}
      className={`fixed inset-0 z-[70] flex flex-col bg-bg transition-opacity duration-300 lg:hidden ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase">
          Ink Studio
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 1L15 15M15 1L1 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <nav
        aria-label="Mobile"
        className="flex flex-1 flex-col items-start justify-center gap-6 px-8"
      >
        {navItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            onClick={onClose}
            className="font-display text-3xl"
          >
            {t(item.key)}
          </Link>
        ))}
      </nav>

      <div className="px-8 pb-10">
        <Button
          href="/booking"
          size="lg"
          className="w-full"
          onClick={onClose}
        >
          {t("cta")}
        </Button>
      </div>
    </div>
  );
}
