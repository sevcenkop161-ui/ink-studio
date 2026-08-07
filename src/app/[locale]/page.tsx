import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { Advantages } from "@/components/sections/Advantages";
import { Artists } from "@/components/sections/Artists";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Studio />
      <Advantages />
      <Artists />
    </main>
  );
}
