"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { contactSchema, type ContactFormData } from "@/lib/validations/booking";

type Props = {
  defaultValues: ContactFormData | null;
  onSubmit: (data: ContactFormData) => void;
};

export function ContactStep({ defaultValues, onSubmit }: Props) {
  const t = useTranslations("Booking");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: defaultValues ?? {
      name: "",
      phone: "",
      telegram: "",
      comment: "",
      company: "",
    },
  });

  return (
    <form
      id="contact-step-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <h2 className="font-display text-2xl">{t("steps.contact.title")}</h2>

      <div className="space-y-4">
        <Input
          label={t("fields.name")}
          error={errors.name ? t("errors.name") : undefined}
          {...register("name")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label={t("fields.phone")}
            type="tel"
            autoComplete="tel"
            error={errors.phone ? t("errors.contactRequired") : undefined}
            {...register("phone")}
          />
          <Input
            label={t("fields.telegram")}
            placeholder="@username"
            {...register("telegram")}
          />
        </div>

        <Textarea label={t("fields.comment")} {...register("comment")} />

        {/* Honeypot: hidden from real visitors. Bots that fill every
            field will fill this too, marking the submission as spam. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("company")}
          />
        </div>
      </div>
    </form>
  );
}
