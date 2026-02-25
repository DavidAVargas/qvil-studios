import { Metadata } from "next";
import { getRunwayShows } from "@/lib/payload";
import { RunwayShowsList } from "@/components/Archives/RunwayShowsList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Archives",
  description: "Explore the QVIL Studios fashion collection and portfolio",
};

export default async function ArchivesPage() {
  const runwayShows = await getRunwayShows();

  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Header */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-3">
          Archives
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Runway Collections
        </p>
      </section>

      {/* Runway Shows */}
      <section className="relative px-4 sm:px-6 pb-20">
        <RunwayShowsList shows={runwayShows} />
      </section>
    </div>
  );
}
