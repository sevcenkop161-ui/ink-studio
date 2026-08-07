"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Contacts() {
  const t = useTranslations("Contacts");

  return (
    <section
      id="contacts"
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
            </div>

            <motion.dl variants={fadeUp} className="space-y-6 text-sm">
              <div>
                <dt className="text-text-secondary">{t("addressLabel")}</dt>
                <dd className="mt-1">{t("address")}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">{t("hoursLabel")}</dt>
                <dd className="mt-1">{t("hours")}</dd>
              </div>
              <div>
                <dt className="text-text-secondary">{t("socialsLabel")}</dt>
                <dd className="mt-1 flex gap-4">
                  <a
                    href="https://t.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover"
                  >
                    Telegram
                  </a>
                  <a
                    href="https://instagram.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover"
                  >
                    Instagram
                  </a>
                </dd>
              </div>
            </motion.dl>

            <motion.div variants={fadeUp}>
              <Button href="/booking" size="lg">
                {t("cta")}
              </Button>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            <PlaceholderVisual index={2} className="aspect-square" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
