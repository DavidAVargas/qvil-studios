import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with QVIL Studios for collaborations, inquiries, and press",
};

export default function ContactPage() {
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
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-gray-900 dark:text-white mb-4">
          Contact
        </h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-light max-w-md mx-auto">
          For inquiries, collaborations, and press
        </p>
      </section>

      {/* Contact Content */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Email Section */}
          <div className="border-t border-gray-200 dark:border-red-900/20 py-12 sm:py-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
              General Inquiries
            </p>
            <a
              href="mailto:hello@qvilstudios.com"
              className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              contact@qvilstudios.com
            </a>
          </div>

          {/* Press Section */}
          <div className="border-t border-gray-200 dark:border-red-900/20 py-12 sm:py-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
              Press & Media
            </p>
            <a
              href="mailto:press@qvilstudios.com"
              className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              media@qvilstudios.com
            </a>
          </div>

          {/* Social Section */}
          <div className="border-t border-gray-200 dark:border-red-900/20 py-12 sm:py-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-6">
              Follow
            </p>
            <div className="flex gap-8">
              <a
                href="https://instagram.com/qvilstudios"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="text-sm text-gray-900 dark:text-white font-light border-b border-transparent group-hover:border-gray-900 dark:group-hover:border-white pb-0.5 transition-colors">
                  Instagram
                </span>
              </a>
              <a
                href="https://tiktok.com/@qvilstudios"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3"
              >
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
                <span className="text-sm text-gray-900 dark:text-white font-light border-b border-transparent group-hover:border-gray-900 dark:group-hover:border-white pb-0.5 transition-colors">
                  TikTok
                </span>
              </a>
            </div>
          </div>

          {/* Location Section */}
          <div className="border-t border-gray-200 dark:border-red-900/20 py-12 sm:py-16">
            <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
              Based In
            </p>
            <p className="text-xl sm:text-2xl font-light text-gray-900 dark:text-white">
              New York City
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-light mt-1">
              Available worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Bottom decorative border */}
      <div className="border-t border-gray-200 dark:border-red-900/20" />
    </div>
  );
}
