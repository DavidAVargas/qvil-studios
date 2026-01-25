import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { runwayShows } from "@/lib/runway-data";

export const metadata: Metadata = {
  title: "Archives",
  description: "Explore the QVIL Studios fashion collection and portfolio",
};

export default function ArchivesPage() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-50"
        style={{
          background: 'radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.4) 100%)',
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
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
          {runwayShows.map((show, index) => (
            <Link
              key={show.id}
              href={`/archives/${show.slug}`}
              className="group relative block"
            >
              {/* Card - alternating layout on desktop */}
              <div className={`relative flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-gray-50 dark:bg-black border border-gray-200 dark:border-red-900/20 overflow-hidden`}>

                {/* Image Side - Much larger */}
                <div className="relative w-full lg:w-[70%] aspect-[3/2] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[500px] overflow-hidden">
                  <Image
                    src={show.coverImage}
                    alt={show.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 70vw"
                    priority={index === 0}
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
                </div>

                {/* Content Side - Compact */}
                <div className="relative w-full lg:w-[30%] p-5 sm:p-6 lg:p-8 flex flex-col justify-center">

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white tracking-wide mb-1">
                    {show.title}
                  </h2>

                  {/* Date */}
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-5 sm:mb-6">
                    {show.date}
                  </p>

                  {/* View Button */}
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <span className="text-xs uppercase tracking-widest border-b border-gray-400 dark:border-gray-600 pb-1 group-hover:border-gray-900 dark:group-hover:border-white transition-colors">
                      View
                    </span>
                    <svg
                      className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Corner accent on hover - More visible */}
                  <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-5 right-5 w-10 h-px bg-gray-900 dark:bg-red-700" />
                    <div className="absolute bottom-5 right-5 w-px h-10 bg-gray-900 dark:bg-red-700" />
                  </div>

                  {/* Top corner accent on hover */}
                  <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute top-5 left-5 w-10 h-px bg-gray-900 dark:bg-red-700" />
                    <div className="absolute top-5 left-5 w-px h-10 bg-gray-900 dark:bg-red-700" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
