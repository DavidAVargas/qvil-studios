import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getRunwayShow, getRunwayShowSlugs } from "@/lib/payload";
import { runwayShows } from "@/lib/runway-data";
import { RunwayGallery } from "@/components/Archives/RunwayGallery";
import { AdminEditButton, AdminDeleteButton } from "@/components/Admin";

// Generate static params for all shows
export async function generateStaticParams() {
  // Try to get slugs from Payload, fallback to mock data
  const payloadSlugs = await getRunwayShowSlugs();
  if (payloadSlugs.length > 0) {
    return payloadSlugs.map((slug) => ({ slug }));
  }
  return runwayShows.map((show) => ({ slug: show.slug }));
}

// Generate metadata for each show
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = await getRunwayShow(slug);
  if (!show) {
    return { title: "Not Found" };
  }
  return {
    title: show.title,
    description: show.description,
  };
}

export default async function RunwayShowPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = await getRunwayShow(slug);

  if (!show) {
    notFound();
  }

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

      {/* Back link */}
      <div className="relative px-4 sm:px-6 pt-6 sm:pt-8 flex items-center justify-between">
        <Link
          href="/archives"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <span className="uppercase tracking-widest">Back</span>
        </Link>

        {/* Admin Controls */}
        <div className="flex items-center gap-2">
          <AdminEditButton href={`/admin/runway-shows/${show.id}`} />
          <AdminDeleteButton
            collection="runway-shows"
            id={show.id}
            title={show.title}
            redirectTo="/archives"
          />
        </div>
      </div>

      {/* Header */}
      <section className="relative px-4 sm:px-6 py-10 sm:py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Date */}
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3 sm:mb-4">
            {show.date}
          </p>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light tracking-wide text-gray-900 dark:text-white mb-4 sm:mb-6">
            {show.title}
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-light max-w-2xl mx-auto px-4">
            {show.description}
          </p>

          {/* Red accent line */}
          <div className="mt-8 sm:mt-10 w-12 h-px bg-gray-300 dark:bg-red-900/50 mx-auto" />
        </div>
      </section>

      {/* Client component for interactive gallery */}
      <RunwayGallery show={show} />

      {/* Bottom CTA */}
      <section className="relative px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto text-center border-t border-gray-200 dark:border-red-900/20 pt-10 sm:pt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-xs sm:text-sm">
            Interested in this collection?
          </p>
          <Link
            href="/contact"
            className="inline-block text-xs sm:text-sm uppercase tracking-widest text-gray-900 dark:text-white border-b border-gray-400 dark:border-gray-600 pb-1 hover:border-gray-900 dark:hover:border-white transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
