"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const FAQ_KEYS = [
  "prepare",
  "duration",
  "consultation",
  "chooseArtist",
  "howBooking",
  "cancel",
] as const;

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-border py-24 sm:py-32"
    >
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-xl space-y-4">
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

          <motion.div
            variants={fadeUp}
            className="mt-10 max-w-3xl divide-y divide-border border-t border-b border-border"
          >
            {FAQ_KEYS.map((key, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={key}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-medium">
                      {t(`items.${key}.question`)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex-none text-xl text-text-secondary transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm text-text-secondary">
                      {t(`items.${key}.answer`)}
                    </p>
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
