"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

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
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-2xl space-y-6 pt-24"
        >
          <motion.p
            variants={fadeUp}
            className="text-sm tracking-[0.2em] text-text-secondary uppercase"
          >
            {t("eyebrow")}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-display text-6xl leading-[1.05] sm:text-7xl lg:text-8xl"
          >
            {t("title")}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-md text-lg text-text-secondary"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-2">
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
