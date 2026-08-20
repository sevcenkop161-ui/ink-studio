"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { ServiceWithLocale } from "@/lib/data/services";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function ServicesGrid({ services }: { services: ServiceWithLocale[] }) {
  const t = useTranslations("Services");

  return (
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

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div key={service.slug} variants={fadeUp}>
            <Card className="flex h-full flex-col justify-between">
              <div>
                <span className="font-display text-2xl text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-xl font-medium">{service.name}</h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between border-t border-border pt-4 text-sm">
                  <div>
                    <p className="text-text-secondary">{t("priceFromLabel")}</p>
                    <p className="mt-1">
                      {!service.priceFrom
                        ? t("free")
                        : `${service.priceFrom.toLocaleString("ru-RU")} ₽`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-text-secondary">{t("durationLabel")}</p>
                    <p className="mt-1">{service.durationDisplay}</p>
                  </div>
                </div>
                <Button
                  href={`/booking?service=${service.slug}`}
                  variant="secondary"
                  className="w-full"
                >
                  {t("ctaTemplate", { name: service.name })}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
