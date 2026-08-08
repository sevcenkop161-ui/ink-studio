import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

// The public home/booking pages are ISR-cached (see revalidate export on
// those pages) for speed, since content rarely changes. Call this after
// any admin mutation so the change is visible immediately instead of
// waiting for the next scheduled revalidation.
export function revalidatePublicPages(artistSlug?: string) {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/booking`);
    if (artistSlug) {
      revalidatePath(`/${locale}/artists/${artistSlug}`);
    }
  }
}
