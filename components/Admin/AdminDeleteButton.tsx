"use client";

import { Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type AdminDeleteButtonProps = {
  collection: string;
  id: string;
  title: string;
  redirectTo?: string;
  className?: string;
};

export function AdminDeleteButton({
  collection,
  id,
  title,
  redirectTo,
  className = "",
}: AdminDeleteButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/check-admin")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    }
  }, [isSignedIn]);

  if (!isAdmin) return null;

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/${collection}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success(`Deleted "${title}"`);

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch {
      toast.error(`Failed to delete "${title}"`);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className={`inline-flex items-center gap-1 rounded bg-red-600/90 px-2 py-1 text-xs font-medium text-white shadow-lg backdrop-blur transition-all hover:bg-red-600 ${className}`}
    >
      <Trash2 className="h-3 w-3" />
      Delete
    </button>
  );
}
