"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type DeleteButtonProps = {
  collection: string;
  id: string;
  title: string;
};

export function DeleteButton({ collection, id, title }: DeleteButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/${collection}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success(`Deleted "${title}"`);
      router.refresh();
    } catch {
      toast.error(`Failed to delete "${title}"`);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded p-1 text-gray-400 transition-colors hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
