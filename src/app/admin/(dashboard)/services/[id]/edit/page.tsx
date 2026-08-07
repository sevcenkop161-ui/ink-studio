import { notFound } from "next/navigation";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { getServicesAdmin, updateService } from "@/lib/admin/services";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const services = await getServicesAdmin();
  const service = services.find((s) => s.id === id);

  if (!service) notFound();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">Edit {service.name_en}</h1>
      <ServiceForm
        action={updateService.bind(null, id)}
        defaultValues={service}
        submitLabel="Save changes"
      />
    </div>
  );
}
