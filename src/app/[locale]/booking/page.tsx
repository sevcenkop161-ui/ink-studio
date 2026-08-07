import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { BookingWizard } from "@/components/booking/BookingWizard";

export default function BookingPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
      <Container className="max-w-2xl">
        <Suspense fallback={null}>
          <BookingWizard />
        </Suspense>
      </Container>
    </main>
  );
}
