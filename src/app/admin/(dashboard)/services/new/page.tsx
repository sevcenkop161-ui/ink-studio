import { ServiceForm } from "@/components/admin/ServiceForm";
import { createService } from "@/lib/admin/services";

export default function NewServicePage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">New service</h1>
      <ServiceForm action={createService} submitLabel="Create service" />
    </div>
  );
}
