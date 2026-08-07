"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/slugify";
import type { ArtistActionState } from "@/lib/admin/artists";
import type { ArtistRow } from "@/types/database";

type Props = {
  action: (
    prevState: ArtistActionState,
    formData: FormData,
  ) => Promise<ArtistActionState>;
  defaultValues?: ArtistRow;
  submitLabel: string;
};

export function ArtistForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues));

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          defaultValue={defaultValues?.name}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
        />
        <Input
          label="Slug"
          name="slug"
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          pattern="[a-z0-9-]+"
          title="Lowercase letters, numbers, and hyphens only — this becomes part of the page address, e.g. /artists/jane-doe"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Specialization (EN)"
          name="specialization_en"
          defaultValue={defaultValues?.specialization_en ?? ""}
          required
        />
        <Input
          label="Specialization (RU)"
          name="specialization_ru"
          defaultValue={defaultValues?.specialization_ru ?? ""}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Textarea
          label="Bio (EN)"
          name="bio_en"
          defaultValue={defaultValues?.bio_en ?? ""}
          required
        />
        <Textarea
          label="Bio (RU)"
          name="bio_ru"
          defaultValue={defaultValues?.bio_ru ?? ""}
          required
        />
      </div>
      <Input
        label="Experience (years)"
        name="experience_years"
        type="number"
        min={0}
        defaultValue={defaultValues?.experience_years ?? 0}
        required
      />
      <label className="flex items-center gap-2 text-sm text-text-secondary">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={defaultValues?.is_active ?? true}
          className="h-4 w-4 rounded border-border"
        />
        Active (visible on the public site)
      </label>

      {state?.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state?.success && (
        <p className="text-sm text-accent">Saved successfully.</p>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
