import { notFound } from "next/navigation";
import { ArtistForm } from "@/components/admin/ArtistForm";
import { getArtistsAdmin, updateArtist } from "@/lib/admin/artists";

export default async function EditArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artists = await getArtistsAdmin();
  const artist = artists.find((a) => a.id === id);

  if (!artist) notFound();

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">Edit {artist.name}</h1>
      <ArtistForm
        action={updateArtist.bind(null, id)}
        defaultValues={artist}
        submitLabel="Save changes"
      />
    </div>
  );
}
