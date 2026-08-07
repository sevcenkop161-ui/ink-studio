"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin-client";
import { serviceSchema } from "@/lib/validations/admin";
import type { ServiceRow } from "@/types/database";

export async function getServicesAdmin(): Promise<ServiceRow[]> {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("created_at");

  if (error) throw error;
  return data ?? [];
}

export type ServiceActionState = { error?: string; success?: boolean };

function parseServiceForm(formData: FormData) {
  return serviceSchema.safeParse({
    slug: formData.get("slug"),
    name_en: formData.get("name_en"),
    name_ru: formData.get("name_ru"),
    description_en: formData.get("description_en"),
    description_ru: formData.get("description_ru"),
    duration_display_en: formData.get("duration_display_en"),
    duration_display_ru: formData.get("duration_display_ru"),
    price_from: Number(formData.get("price_from")),
    duration_minutes: Number(formData.get("duration_minutes")),
  });
}

export async function createService(
  _prevState: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase.from("services").insert(parsed.data);

  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/services");
  return { success: true };
}

export async function updateService(
  id: string,
  _prevState: ServiceActionState,
  formData: FormData,
): Promise<ServiceActionState> {
  const parsed = parseServiceForm(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }

  const supabase = await createAdminClient();
  const { error } = await supabase
    .from("services")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return {
      error: error.code === "23505" ? "That slug is already in use." : error.message,
    };
  }

  revalidatePath("/admin/services");
  return { success: true };
}
