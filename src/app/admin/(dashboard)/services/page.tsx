import Link from "next/link";
import { getServicesAdmin } from "@/lib/admin/services";
import { Button } from "@/components/ui/Button";

export default async function AdminServicesPage() {
  const services = await getServicesAdmin();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Services</h1>
        <Link href="/admin/services/new">
          <Button type="button">New service</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="px-4 py-3 font-medium">Name (EN)</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Price from</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{service.name_en}</td>
                <td className="px-4 py-3 text-text-secondary">{service.slug}</td>
                <td className="px-4 py-3">
                  {service.price_from === 0 ? "Free" : `${service.price_from.toLocaleString("ru-RU")} ₽`}
                </td>
                <td className="px-4 py-3">{service.duration_display_en}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/services/${service.id}/edit`}
                    className="text-accent hover:text-accent-hover"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
