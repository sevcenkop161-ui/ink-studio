import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { Advantages } from "@/components/sections/Advantages";
import { Artists } from "@/components/sections/Artists";
import { Works } from "@/components/sections/Works";
import { Services } from "@/components/sections/Services";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Contacts } from "@/components/sections/Contacts";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Studio />
      <Advantages />
      <Artists />
      <Works />
      <Services />
      <Reviews />
      <FAQ />
      <Contacts />
    </main>
  );
}
