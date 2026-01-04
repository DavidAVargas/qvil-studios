import Image from "next/image";
import { Hero } from "@/components/Heros/Hero";

export default function Home() {
  return (
    <div className="flex h-full grow flex-col">
      <Hero />
    </div>
  );
}
