"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { fadeUp, staggerContainer } from "@/lib/motion";

const advantageKeys = [
  "individualDesign",
  "experiencedArtists",
  "premiumMaterials",
  "personalApproach",
] as const;

export function Advantages() {
  const t = useTranslations("Advantages");

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {advantageKeys.map((key) => (
            <motion.div key={key} variants={fadeUp}>
              <Card className="h-full">
                <h3 className="font-medium">{t(`${key}.title`)}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {t(`${key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
