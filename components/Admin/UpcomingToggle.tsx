"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UpcomingToggleProps = {
  id: string;
  isUpcoming: boolean;
};

export function UpcomingToggle({ id, isUpcoming }: UpcomingToggleProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(isUpcoming);

  async function handleToggle() {
    setLoading(true);
    const newValue = !checked;

    try {
      const res = await fetch(`/api/exhibitions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isUpcoming: newValue }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }

      setChecked(newValue);
      toast.success(newValue ? "Set as upcoming" : "Moved to past");
      router.refresh();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-900 focus:ring-offset-2 disabled:opacity-50 ${
        checked ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
      title={checked ? "Click to mark as past" : "Click to mark as upcoming"}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
