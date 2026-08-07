import { ArtistForm } from "@/components/admin/ArtistForm";
import { createArtist } from "@/lib/admin/artists";

export default function NewArtistPage() {
  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl">New artist</h1>
      <ArtistForm action={createArtist} submitLabel="Create artist" />
    </div>
  );
}
