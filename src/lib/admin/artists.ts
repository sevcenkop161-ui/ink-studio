"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { artistSchema } from "@/lib/validations/admin";
import type { ArtistRow } from "@/types/database";

export async function getArtistsAdmin(): Promise<ArtistRow[]> {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("artists")
    .select("*")
    .order("created_at");

  if (error) throw error;
  return data ?? [];
}

export type ArtistActionState = { error?: string; success?: boolean };

function parseArtistForm(formData: FormData) {
  return artistSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    bio_en: formData.get("bio_en"),
    bio_ru: formData.get("bio_ru"),
    specialization_en: formData.get("specialization_en"),
    specialization_ru: formData.get("specialization_ru"),
    experience_years: Number(formData.get("experience_years")),
    is_active: formData.get("is_active") === "on",
  });
}

export async function createArtist(
  _prevState: ArtistActionState,
  formData: FormData,
): Promise<ArtistActionState> {
  const parsed = parseArtistForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("artists").insert(parsed.data);

  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/artists");
  return { success: true };
}

export async function updateArtist(
  id: string,
  _prevState: ArtistActionState,
  formData: FormData,
): Promise<ArtistActionState> {
  const parsed = parseArtistForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("artists")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/artists");
  return { success: true };
}
