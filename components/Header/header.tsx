"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

    return (
        <>
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

                <div className="relative z-10 mx-auto flex max-w-7xl items-center px-4 sm:px-6 py-4 sm:py-5">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/images/qvils-og-nobg1.png"
                            alt="Qvil Studios"
                            width={120}
                            height={32}
                            priority
                            className="h-7 sm:h-8 w-auto dark:drop-shadow-[0_0_10px_rgba(220,38,38,0.3)]"
                        />
                    </Link>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden md:flex flex-1 justify-center items-center gap-10 text-sm tracking-widest uppercase">
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

                    {/* Spacer for desktop to balance logo */}
                    <div className="hidden md:block w-[120px]"></div>

                    {/* Mobile Menu Button - Hamburger/X toggle in same position */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden ml-auto p-2 text-gray-900 dark:text-white relative z-50"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>

                </div>
            </header>

            {/* Mobile Navigation - Full Screen Overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${
                    mobileMenuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                }`}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-gray-50 dark:bg-black" />

                {/* Close Button - Same position as hamburger */}
                <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-4 right-4 sm:right-6 p-2 text-gray-900 dark:text-white z-50"
                    aria-label="Close menu"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Menu Content */}
                <nav className="relative h-full flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center gap-8">
                        <Link
                            href="/"
                            className={`text-2xl uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-300 transform ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '100ms' }}
                        >
                            Home
                        </Link>
                        <Link
                            href="/archives"
                            className={`text-2xl uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-300 transform ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '150ms' }}
                        >
                            Archives
                        </Link>
                        <Link
                            href="/exhibition"
                            className={`text-2xl uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-300 transform ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '200ms' }}
                        >
                            Exhibition
                        </Link>
                        <Link
                            href="/about"
                            className={`text-2xl uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-300 transform ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '250ms' }}
                        >
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-2xl uppercase tracking-[0.3em] text-gray-900 dark:text-white hover:text-gray-500 dark:hover:text-gray-400 transition-all duration-300 transform ${
                                mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Decorative line */}
                    <div className={`mt-12 w-16 h-px bg-gray-300 dark:bg-red-900/50 transition-all duration-500 ${
                        mobileMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`} style={{ transitionDelay: '350ms' }} />
                </nav>
            </div>
        </>
    );
}
