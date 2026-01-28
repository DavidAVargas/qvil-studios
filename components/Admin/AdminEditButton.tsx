"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

type AdminEditButtonProps = {
  href: string;
  className?: string;
};

export function AdminEditButton({ href, className = "" }: AdminEditButtonProps) {
  const { isSignedIn } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      // Check admin status
      fetch("/api/check-admin")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    }
  }, [isSignedIn]);

  if (!isAdmin) return null;

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 shadow-lg backdrop-blur transition-all hover:bg-white dark:bg-gray-900/90 dark:text-white dark:hover:bg-gray-900 ${className}`}
    >
      <Pencil className="h-3 w-3" />
      Edit
    </Link>
  );
}
