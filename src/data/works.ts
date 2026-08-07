export type WorkCategory =
  | "blackwork"
  | "fine-line"
  | "realism"
  | "minimal"
  | "color";

export type WorkSize = "square" | "tall" | "wide";

export type Work = {
  slug: string;
  title: string;
  artistSlug: string;
  category: WorkCategory;
  size: WorkSize;
};

export const workCategories: WorkCategory[] = [
  "blackwork",
  "fine-line",
  "realism",
  "minimal",
  "color",
];

export const works: Work[] = [
  {
    slug: "shadow-wolf",
    title: "Shadow Wolf",
    artistSlug: "alex",
    category: "blackwork",
    size: "tall",
  },
  {
    slug: "botanical-line",
    title: "Botanical Line",
    artistSlug: "mia",
    category: "fine-line",
    size: "square",
  },
  {
    slug: "portrait-study",
    title: "Portrait Study",
    artistSlug: "noah",
    category: "realism",
    size: "wide",
  },
  {
    slug: "phoenix-rising",
    title: "Phoenix Rising",
    artistSlug: "eva",
    category: "color",
    size: "tall",
  },
  {
    slug: "geometric-stag",
    title: "Geometric Stag",
    artistSlug: "alex",
    category: "blackwork",
    size: "square",
  },
  {
    slug: "single-line-wave",
    title: "Single Line Wave",
    artistSlug: "mia",
    category: "minimal",
    size: "wide",
  },
  {
    slug: "koi-in-color",
    title: "Koi in Color",
    artistSlug: "noah",
    category: "color",
    size: "tall",
  },
  {
    slug: "traditional-rose",
    title: "Traditional Rose",
    artistSlug: "eva",
    category: "color",
    size: "square",
  },
  {
    slug: "linework-portrait",
    title: "Linework Portrait",
    artistSlug: "mia",
    category: "fine-line",
    size: "tall",
  },
  {
    slug: "realistic-lion",
    title: "Realistic Lion",
    artistSlug: "noah",
    category: "realism",
    size: "square",
  },
  {
    slug: "minimal-mountain",
    title: "Minimal Mountain",
    artistSlug: "mia",
    category: "minimal",
    size: "wide",
  },
  {
    slug: "blackwork-mandala",
    title: "Blackwork Mandala",
    artistSlug: "alex",
    category: "blackwork",
    size: "wide",
  },
];

export function getWorksByArtist(artistSlug: string): Work[] {
  return works.filter((work) => work.artistSlug === artistSlug);
}
