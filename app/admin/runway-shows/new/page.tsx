import { RunwayShowForm } from "@/components/Admin/RunwayShowForm";

export default function NewRunwayShowPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create Runway Show
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Add a new runway show collection
        </p>
      </div>

      <RunwayShowForm />
    </div>
  );
}
