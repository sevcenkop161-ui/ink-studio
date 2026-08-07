"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
        <div
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
          aria-hidden="true"
        />
      </motion.div>

      <Container className="relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl space-y-6 pt-24"
        >
          <motion.p
            variants={item}
            className="text-sm tracking-[0.2em] text-text-secondary uppercase"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            variants={item}
            className="font-display text-6xl leading-[1.05] sm:text-7xl lg:text-8xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-md text-lg text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4 pt-2">
            <Button href="/booking" size="lg">
              {t("ctaPrimary")}
            </Button>
            <Button href="/#works" variant="secondary" size="lg">
              {t("ctaSecondary")}
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
