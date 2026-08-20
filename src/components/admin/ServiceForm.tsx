"use client";

import { useActionState, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { slugify } from "@/lib/slugify";
import type { ServiceActionState } from "@/lib/admin/services";
import type { ServiceRow } from "@/types/database";

type Props = {
  action: (
    prevState: ServiceActionState,
    formData: FormData,
  ) => Promise<ServiceActionState>;
  defaultValues?: ServiceRow;
  submitLabel: string;
};

export function ServiceForm({ action, defaultValues, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, {});
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(defaultValues));

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name (EN)"
          name="name_en"
          defaultValue={defaultValues?.name_en}
          onChange={(e) => {
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          required
        />
        <Input label="Name (RU)" name="name_ru" defaultValue={defaultValues?.name_ru} required />
      </div>
      <Input
        label="Slug"
        name="slug"
        value={slug}
        onChange={(e) => {
          setSlugTouched(true);
          setSlug(e.target.value);
        }}
        pattern="[a-z0-9-]+"
        title="Lowercase letters, numbers, and hyphens only — used in ?service= links"
        required
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Textarea
          label="Description (EN)"
          name="description_en"
          defaultValue={defaultValues?.description_en ?? ""}
          required
        />
        <Textarea
          label="Description (RU)"
          name="description_ru"
          defaultValue={defaultValues?.description_ru ?? ""}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Duration display (EN)"
          name="duration_display_en"
          defaultValue={defaultValues?.duration_display_en ?? ""}
          placeholder="~2 hours"
          required
        />
        <Input
          label="Duration display (RU)"
          name="duration_display_ru"
          defaultValue={defaultValues?.duration_display_ru ?? ""}
          placeholder="~2 часа"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Price from (₽, 0 = free)"
          name="price_from"
          type="number"
          min={0}
          step="0.01"
          defaultValue={defaultValues?.price_from ?? 0}
          required
        />
        <Input
          label="Typical duration (minutes)"
          name="duration_minutes"
          type="number"
          min={0}
          defaultValue={defaultValues?.duration_minutes ?? 0}
          required
        />
      </div>

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
