import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist",
};

export default function NotFound() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center">
      {/* Background gradient */}
      <div
        className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      <div className="relative text-center px-4">
        {/* 404 Number */}
        <h1 className="text-8xl sm:text-9xl md:text-[12rem] font-light text-gray-200 dark:text-gray-800 tracking-tighter">
          404
        </h1>

        {/* Message */}
        <div className="-mt-8 sm:-mt-12 md:-mt-16">
          <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 dark:text-white mb-4">
            Page Not Found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Back Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-900 dark:text-white border-b border-gray-400 dark:border-gray-600 pb-1 hover:border-gray-900 dark:hover:border-white transition-colors"
          >
            <svg
              className="w-4 h-4 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
