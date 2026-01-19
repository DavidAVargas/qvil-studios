import Image from "next/image";
import Link from "next/link";

export function Header() {
    return (
        <header className="relative w-full border-b border-gray-300 dark:border-red-900/30 bg-gray-50 dark:bg-black overflow-hidden">
            {/* Animated noise background - light mode (subtle) and dark mode */}
            <div className="header-noise z-[1] opacity-70 dark:opacity-90" />

            {/* Subtle scratch lines - only in dark mode */}
            <div className="absolute inset-0 pointer-events-none opacity-0 dark:opacity-20 z-[2]">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1920 80" fill="none">
                    <path d="M 0 40 L 200 38 L 400 42" stroke="rgba(220,38,38,0.3)" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M 600 40 L 800 38 L 1000 42" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" strokeLinecap="round" />
                    <path d="M 1200 40 L 1400 38 L 1600 42" stroke="rgba(220,38,38,0.25)" strokeWidth="0.7" strokeLinecap="round" />
                </svg>
            </div>

            {/* Dark red glow accent - only in dark mode */}
            <div
                className="absolute top-0 left-0 w-1/4 h-full blur-2xl opacity-0 dark:opacity-20 z-[2]"
                style={{
                    background: 'radial-gradient(ellipse, rgba(127,29,29,0.3) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <Image
                        src="/images/qvils-og-nobg1.png"
                        alt="Qvil Studios"
                        width={120}
                        height={32}
                        priority
                        className="h-8 w-auto dark:drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                    />
                </Link>

                {/* Navigation - theme aware */}
                <nav className="flex items-center gap-10 text-sm tracking-widest uppercase">
                    <Link
                        href="/archives"
                        className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 relative group dark:[text-shadow:0_0_8px_rgba(220,38,38,0.2)]"
                    >
                        Archives
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-800 dark:bg-red-800 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="/exhibition"
                        className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 relative group dark:[text-shadow:0_0_8px_rgba(220,38,38,0.2)]"
                    >
                        Exhibition
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-800 dark:bg-red-800 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="/about"
                        className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 relative group dark:[text-shadow:0_0_8px_rgba(220,38,38,0.2)]"
                    >
                        About
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-800 dark:bg-red-800 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                    <Link
                        href="/contact"
                        className="text-black dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-all duration-300 relative group dark:[text-shadow:0_0_8px_rgba(220,38,38,0.2)]"
                    >
                        Contact
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-800 dark:bg-red-800 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                </nav>

                {/* Theme Toggle */}
                <div className="flex items-center">
                </div>

            </div>
        </header>
    );
}
