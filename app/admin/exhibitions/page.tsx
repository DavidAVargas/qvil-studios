import Link from "next/link";
import { getPayload } from "payload";
import config from "@payload-config";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/Admin/DeleteButton";
import { UpcomingToggle } from "@/components/Admin/UpcomingToggle";

async function getExhibitions() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "exhibitions",
    sort: "-year",
    depth: 1,
  });

  return result.docs;
}

export default async function ExhibitionsPage() {
  const exhibitions = await getExhibitions();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Exhibitions
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your events and exhibitions
          </p>
        </div>
        <Link
          href="/admin/exhibitions/new"
          className="inline-flex items-center gap-2 rounded-lg bg-red-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800"
        >
          <Plus className="h-4 w-4" />
          New Exhibition
        </Link>
      </div>

      {exhibitions.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No exhibitions yet. Create your first one!
          </p>
          <Link
            href="/admin/exhibitions/new"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-red-900 hover:text-red-800"
          >
            <Plus className="h-4 w-4" />
            Create Exhibition
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Venue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {exhibitions.map((exhibition) => (
                <tr
                  key={String(exhibition.id)}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {exhibition.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      /{exhibition.slug}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {exhibition.venue?.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {exhibition.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UpcomingToggle
                        id={String(exhibition.id)}
                        isUpcoming={Boolean(exhibition.isUpcoming)}
                      />
                      <span className={`text-xs font-medium ${
                        exhibition.isUpcoming
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}>
                        {exhibition.isUpcoming ? "Upcoming" : "Past"}
                      </span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/exhibitions/${String(exhibition.id)}`}
                        className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <DeleteButton
                        collection="exhibitions"
                        id={String(exhibition.id)}
                        title={String(exhibition.title)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
