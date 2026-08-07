export type Service = {
  slug: "tattoo" | "piercing" | "consultation";
  priceFrom: number;
  durationMinutes: number;
};

export const services: Service[] = [
  { slug: "tattoo", priceFrom: 80, durationMinutes: 120 },
  { slug: "piercing", priceFrom: 35, durationMinutes: 20 },
  { slug: "consultation", priceFrom: 0, durationMinutes: 20 },
];
