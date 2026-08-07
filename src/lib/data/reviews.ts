import { createServerClient } from "@/lib/supabase/server";
import type { ReviewRow } from "@/types/database";

export type ReviewWithLocale = {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatarUrl: string | null;
  artistSlug: string | null;
};

type ReviewRowWithArtist = ReviewRow & {
  artists: { slug: string } | null;
};

export async function getReviews(locale: string): Promise<ReviewWithLocale[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("reviews")
    .select("*, artists(slug)")
    .order("created_at");

  if (error) throw error;

  const isRu = locale === "ru";
  return ((data ?? []) as ReviewRowWithArtist[]).map((row) => ({
    id: row.id,
    name: row.name,
    text: isRu ? row.text_ru : row.text_en,
    rating: row.rating,
    avatarUrl: row.avatar_url,
    artistSlug: row.artists?.slug ?? null,
  }));
}
