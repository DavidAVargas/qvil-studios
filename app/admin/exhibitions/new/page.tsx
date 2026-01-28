import { ExhibitionForm } from "@/components/Admin/ExhibitionForm";

export default function NewExhibitionPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create Exhibition
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Add a new event or exhibition
        </p>
      </div>

      <ExhibitionForm />
    </div>
  );
}
