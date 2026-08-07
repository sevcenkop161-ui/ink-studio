import { createServerClient } from "@/lib/supabase/server";
import type { ServiceRow } from "@/types/database";

export type ServiceWithLocale = {
  id: string;
  slug: string;
  name: string;
  description: string;
  durationDisplay: string;
  priceFrom: number | null;
  durationMinutes: number | null;
};

function resolveService(row: ServiceRow, locale: string): ServiceWithLocale {
  const isRu = locale === "ru";
  return {
    id: row.id,
    slug: row.slug,
    name: isRu ? row.name_ru : row.name_en,
    description: (isRu ? row.description_ru : row.description_en) ?? "",
    durationDisplay:
      (isRu ? row.duration_display_ru : row.duration_display_en) ?? "",
    priceFrom: row.price_from,
    durationMinutes: row.duration_minutes,
  };
}

export async function getServices(locale: string): Promise<ServiceWithLocale[]> {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at");

  if (error) throw error;
  return (data ?? []).map((row) => resolveService(row, locale));
}
