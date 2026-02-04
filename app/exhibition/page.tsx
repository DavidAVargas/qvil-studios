import { Metadata } from "next";
import Image from "next/image";
import { getUpcomingExhibition, getPastExhibitions } from "@/lib/payload";
import { AdminEditButton } from "@/components/Admin/AdminEditButton";

export const metadata: Metadata = {
  title: "Exhibition",
  description:
    "Upcoming and past fashion events, runway shows, and presentations by QVIL Studios",
};

export default async function ExhibitionPage() {
  const upcomingEvent = await getUpcomingExhibition();
  const pastEvents = await getPastExhibitions();

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

      {/* LIVE / Upcoming Event Hero Section */}
      {upcomingEvent ? (
        <section className="relative group">
          {/* Dark overlay for dramatic effect */}
          <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={upcomingEvent.coverImage}
              alt={upcomingEvent.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Admin Edit Button */}
          <AdminEditButton
            href={`/admin/exhibitions/${upcomingEvent.id}`}
            className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity"
          />

          {/* Content */}
          <div className="relative z-20 px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
            <div className="max-w-4xl mx-auto">
              {/* LIVE Badge */}
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="relative flex items-center gap-2 px-3 py-1.5 bg-red-600 dark:bg-red-700">
                  {/* Pulsing dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                  </span>
                  <span className="text-xs font-medium text-white uppercase tracking-widest">
                    Upcoming Event
                  </span>
                </div>
              </div>

              {/* Event Title */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight mb-4 sm:mb-6">
                {upcomingEvent.title}
              </h1>

              {/* Date & Time - Prominent */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg sm:text-xl text-white font-light">
                    {upcomingEvent.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-lg sm:text-xl text-white font-light">
                    {upcomingEvent.time}
                  </span>
                </div>
              </div>

              {/* Venue Info */}
              <div className="border-l-2 border-red-600 dark:border-red-700 pl-4 sm:pl-6 mb-8 sm:mb-10">
                <div className="flex items-start gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-xl sm:text-2xl text-white font-light">
                      {upcomingEvent.venue.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {upcomingEvent.venue.address}, {upcomingEvent.venue.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed max-w-2xl mb-8 sm:mb-10">
                {upcomingEvent.description}
              </p>

              {/* Venue Description */}
              <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-4 sm:p-6 max-w-2xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-widest text-gray-500">
                    About the Venue
                  </p>
                  {upcomingEvent.venue.link && (
                    <a
                      href={upcomingEvent.venue.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Visit Website
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  {upcomingEvent.venue.description}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent z-20" />
        </section>
      ) : (
        /* No Upcoming Event - Display placeholder */
        <section className="relative px-4 sm:px-6 py-16 sm:py-24 lg:py-32 border-b border-gray-200 dark:border-red-900/20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 mb-6 sm:mb-8">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-widest">
                Stay Tuned
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-900 dark:text-white tracking-tight mb-6">
              No Upcoming Events
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
              We&apos;re currently planning our next exhibition. Check back soon for updates on upcoming events and runway shows.
            </p>
          </div>
        </section>
      )}

      {/* Past Events Header */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16 text-center border-b border-gray-200 dark:border-red-900/20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-3">
          Past Events
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase tracking-widest">
          Exhibition History
        </p>
      </section>

      {/* Past Events Grid */}
      <section className="relative px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="group relative bg-gray-50 dark:bg-black border border-gray-200 dark:border-red-900/20 overflow-hidden"
              >
                {/* Admin Edit Button */}
                <AdminEditButton
                  href={`/admin/exhibitions/${event.id}`}
                  className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                />

                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.coverImage}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />

                  {/* Year Badge */}
                  <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-sm">
                    <span className="text-xs text-white uppercase tracking-widest">
                      {event.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  {/* Title & Date */}
                  <div className="mb-4">
                    <h3 className="text-2xl sm:text-3xl font-light text-gray-900 dark:text-white tracking-wide mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {event.date} at {event.time}
                    </p>
                  </div>

                  {/* Venue */}
                  <div className="mb-4">
                    <div className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm font-light text-gray-900 dark:text-white">
                          {event.venue.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.venue.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Venue Info - Expandable on hover */}
                  <div className="border-t border-gray-200 dark:border-red-900/20 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs uppercase tracking-widest text-gray-500">
                        Venue Partner
                      </p>
                      {event.venue.link && (
                        <a
                          href={event.venue.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-red-700 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                        >
                          Visit
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 font-light leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {event.venue.description}
                    </p>
                  </div>

                  {/* Corner accents on hover */}
                  <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-4 right-4 w-8 h-px bg-gray-900 dark:bg-red-700" />
                    <div className="absolute bottom-4 right-4 w-px h-8 bg-gray-900 dark:bg-red-700" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Section - CTA or info */}
      <section className="relative px-4 sm:px-6 py-16 sm:py-24 border-t border-gray-200 dark:border-red-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-4">
            Venue Partnerships
          </p>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
            QVIL Studios collaborates with exceptional venues to create
            immersive fashion experiences. Interested in hosting an event? Get
            in touch.
          </p>
        </div>
      </section>
    </div>
  );
}
