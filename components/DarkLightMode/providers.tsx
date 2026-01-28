"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import { useState, useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <ClerkProvider>{children}</ClerkProvider>;
  }
  return (
    <ClerkProvider>
      <ThemeProvider enableSystem attribute="class" defaultTheme="system">
        {children}
        <ToasterProvider />
        <div className="fixed right-6 bottom-6 z-50">
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
