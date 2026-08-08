"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Modal } from "@/components/ui/Modal";
import { PlaceholderVisual } from "@/components/ui/PlaceholderVisual";
import type { WorkWithLocale } from "@/lib/data/works";
import type { WorkCategory, WorkSize } from "@/types/database";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Filter = "all" | WorkCategory;

const WORK_CATEGORIES: WorkCategory[] = [
  "blackwork",
  "fine-line",
  "realism",
  "minimal",
  "color",
];

const sizeClasses: Record<WorkSize, string> = {
  square: "aspect-square",
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
};

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
        active
          ? "border-accent-solid bg-accent-solid text-white"
          : "border-border text-text-secondary hover:border-border-hover hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}

export function WorksGallery({ works }: { works: WorkWithLocale[] }) {
  const t = useTranslations("Works");
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      filter === "all" ? works : works.filter((work) => work.category === filter),
    [filter, works],
  );

  const selectedWork = works.find((work) => work.id === selectedId) ?? null;

  return (
    <>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
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

        <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>
            {t("filters.all")}
          </FilterButton>
          {WORK_CATEGORIES.map((category) => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {t(`filters.${category}`)}
            </FilterButton>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 columns-2 gap-6 lg:columns-3">
          {filtered.map((work, index) => (
            <button
              key={work.id}
              type="button"
              onClick={() => setSelectedId(work.id)}
              className="group mb-6 block w-full break-inside-avoid text-left"
            >
              <PlaceholderVisual
                index={index}
                className={`${sizeClasses[work.size]} transition-transform duration-300 group-hover:scale-[1.02]`}
              />
              <div className="mt-3">
                <p className="text-sm font-medium">{work.title}</p>
                <p className="text-sm text-text-secondary">
                  {t(`filters.${work.category}`)}
                </p>
              </div>
            </button>
          ))}
        </motion.div>
      </motion.div>

      <Modal
        open={selectedWork !== null}
        onClose={() => setSelectedId(null)}
        closeLabel={t("close")}
        labelledBy="work-modal-title"
      >
        {selectedWork && (
          <div>
            <PlaceholderVisual
              index={works.indexOf(selectedWork)}
              className="aspect-[4/3]"
            />
            <div className="space-y-3 p-6">
              <h3 id="work-modal-title" className="font-display text-2xl">
                {selectedWork.title}
              </h3>
              <p className="text-sm text-text-secondary">
                {t(`filters.${selectedWork.category}`)}
              </p>
              <p className="text-text-secondary">{selectedWork.description}</p>
              {selectedWork.artistSlug && (
                <Link
                  href={`/artists/${selectedWork.artistSlug}`}
                  className="inline-block text-sm text-accent hover:text-accent-hover"
                >
                  {t("byArtist", { name: selectedWork.artistName })} ·{" "}
                  {t("viewProfile")} →
                </Link>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
