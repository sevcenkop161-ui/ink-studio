import Link from "next/link";
import { getArtistsAdmin } from "@/lib/admin/artists";
import { Button } from "@/components/ui/Button";

export default async function AdminArtistsPage() {
  const artists = await getArtistsAdmin();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Artists</h1>
        <Link href="/admin/artists/new">
          <Button type="button">New artist</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Slug</th>
              <th className="px-4 py-3 font-medium">Specialization (EN)</th>
              <th className="px-4 py-3 font-medium">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">{artist.name}</td>
                <td className="px-4 py-3 text-text-secondary">{artist.slug}</td>
                <td className="px-4 py-3">{artist.specialization_en}</td>
                <td className="px-4 py-3">{artist.is_active ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/artists/${artist.id}/edit`}
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
