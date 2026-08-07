"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const statKeys = ["experience", "artists", "works"] as const;

export function Studio() {
  const t = useTranslations("Studio");

  return (
    <section
      id="studio"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24"
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.p
                variants={fadeUp}
                className="text-sm tracking-[0.2em] text-text-secondary uppercase"
              >
                {t("eyebrow")}
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-4xl sm:text-5xl">
                {t("heading")}
              </motion.h2>
              <motion.p variants={fadeUp} className="max-w-md text-text-secondary">
                {t("body")}
              </motion.p>
            </div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-6 border-t border-border pt-8"
            >
              {statKeys.map((key) => (
                <div key={key}>
                  <p className="font-display text-3xl sm:text-4xl">
                    {t(`stats.${key}.value`)}
                  </p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {t(`stats.${key}.label`)}
                  </p>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} className="text-xs text-text-secondary">
              {t("statsDisclaimer")}
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            aria-hidden="true"
            className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.14),transparent_65%)]" />
            <div className="absolute inset-0 bg-gradient-to-br from-card via-bg to-card" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
