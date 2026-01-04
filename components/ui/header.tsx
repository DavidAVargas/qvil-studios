import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/DarkLightMode/theme-toggle";
import Image from "next/image";

export function Header() {
    return (
        <header className="w-full border-b border-border bg-background">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <Image
                        src="/images/qvils-og-nobg1.png"
                        alt="Qvil Studios"
                        width={120}
                        height={32}
                        priority
                        className="h-8 w-auto"
                    />
                </div>

                {/* Navigation */}
                <nav className="flex items-center gap-8 text-sm tracking-wide">
                    <a href="/gallery" className="hover:opacity-70 transition">
                        Gallery
                    </a>
                    <a href="/events" className="hover:opacity-70 transition">
                        Events
                    </a>
                    <a href="/about" className="hover:opacity-70 transition">
                        About
                    </a>
                    <a href="/contact" className="hover:opacity-70 transition">
                        Contact
                    </a>
                </nav>

                {/* Theme Toggle */}
                <div className="flex items-center"></div>

            </div>
        </header>
    );
}

