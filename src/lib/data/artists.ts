import { createServerClient } from "@/lib/supabase/server";
import type { ArtistRow } from "@/types/database";

export type ArtistWithLocale = {
  id: string;
  slug: string;
  name: string;
  specialization: string;
  bio: string;
  experienceYears: number | null;
  imageUrl: string | null;
};

function resolveArtist(row: ArtistRow, locale: string): ArtistWithLocale {
  const isRu = locale === "ru";
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    specialization: (isRu ? row.specialization_ru : row.specialization_en) ?? "",
    bio: (isRu ? row.bio_ru : row.bio_en) ?? "",
    experienceYears: row.experience_years,
    imageUrl: row.image_url,
  };
}

export async function getArtists(locale: string): Promise<ArtistWithLocale[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("is_active", true)
    .order("created_at");

  if (error) throw error;
  return (data ?? []).map((row) => resolveArtist(row, locale));
}

export async function getArtistBySlug(
  slug: string,
  locale: string,
): Promise<ArtistWithLocale | null> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return resolveArtist(data, locale);
}
