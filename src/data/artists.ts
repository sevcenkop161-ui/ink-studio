export type Artist = {
  slug: string;
  name: string;
  experienceYears: number;
};

export const artists: Artist[] = [
  { slug: "alex", name: "Alex", experienceYears: 7 },
  { slug: "mia", name: "Mia", experienceYears: 5 },
  { slug: "noah", name: "Noah", experienceYears: 9 },
  { slug: "eva", name: "Eva", experienceYears: 6 },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((artist) => artist.slug === slug);
}
