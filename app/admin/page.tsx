import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { SurpriseNote } from "@/components/Admin/SurpriseNote";

async function getStats() {
  const payload = await getPayload({ config });

  const [runwayShows, exhibitions, media] = await Promise.all([
    payload.count({ collection: "runway-shows" }),
    payload.count({ collection: "exhibitions" }),
    payload.count({ collection: "media" }),
  ]);

  return {
    runwayShows: runwayShows.totalDocs,
    exhibitions: exhibitions.totalDocs,
    media: media.totalDocs,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      title: "Runway Shows",
      count: stats.runwayShows,
      href: "/admin/runway-shows",
      description: "Manage runway show collections",
    },
    {
      title: "Exhibitions",
      count: stats.exhibitions,
      href: "/admin/exhibitions",
      description: "Manage events and exhibitions",
    },
    {
      title: "Media",
      count: stats.media,
      href: "/admin/media",
      description: "Manage uploaded images",
    },
  ];

  return (
    <div>
      {/* Surprise message for the owner */}
      <SurpriseNote />

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Manage your QVIL Studios content
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-red-900/50 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-900/50"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {card.title}
              </h2>
              <span className="text-3xl font-bold text-red-900">
                {card.count}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {card.description}
            </p>
            <div className="mt-4 text-sm font-medium text-red-900 opacity-0 transition-opacity group-hover:opacity-100">
              Manage &rarr;
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
