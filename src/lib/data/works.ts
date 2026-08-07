import { createServerClient } from "@/lib/supabase/server";
import type { WorkCategory, WorkRow, WorkSize } from "@/types/database";

export type WorkWithLocale = {
  id: string;
  title: string;
  artistId: string;
  artistSlug: string;
  artistName: string;
  category: WorkCategory;
  size: WorkSize;
  description: string;
  imageUrl: string | null;
};

type WorkRowWithArtist = WorkRow & {
  artists: { slug: string; name: string } | null;
};

function resolveWork(row: WorkRowWithArtist, locale: string): WorkWithLocale {
  const isRu = locale === "ru";
  return {
    id: row.id,
    title: row.title,
    artistId: row.artist_id,
    artistSlug: row.artists?.slug ?? "",
    artistName: row.artists?.name ?? "",
    category: row.category,
    size: row.size,
    description: (isRu ? row.description_ru : row.description_en) ?? "",
    imageUrl: row.image_url,
  };
}

export async function getWorks(locale: string): Promise<WorkWithLocale[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("works")
    .select("*, artists(slug, name)")
    .order("created_at");

  if (error) throw error;
  return ((data ?? []) as WorkRowWithArtist[]).map((row) =>
    resolveWork(row, locale),
  );
}

export async function getWorksByArtistSlug(
  artistSlug: string,
  locale: string,
): Promise<WorkWithLocale[]> {
  const works = await getWorks(locale);
  return works.filter((work) => work.artistSlug === artistSlug);
}
