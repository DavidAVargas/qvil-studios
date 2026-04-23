"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";

const MOBILE_FOCAL_KEY = "hero-mobile-focal";

export function HeroV2() {
  const [focalX, setFocalX] = useState(50);
  const [focalY, setFocalY] = useState(50);
  const [isMobile, setIsMobile] = useState(false);
  const [editing, setEditing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/check-admin")
        .then((res) => res.json())
        .then((data) => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false));
    } else {
      setIsAdmin(false);
    }
  }, [isSignedIn]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(MOBILE_FOCAL_KEY);
    if (saved) {
      const { x, y } = JSON.parse(saved);
      setFocalX(x);
      setFocalY(y);
    }
  }, []);

  function updateFromEvent(e: React.MouseEvent | React.TouchEvent) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    const x = Math.round(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100)));
    setFocalX(x);
    setFocalY(y);
  }

  function handleSave() {
    localStorage.setItem(MOBILE_FOCAL_KEY, JSON.stringify({ x: focalX, y: focalY }));
    setEditing(false);
    setDragging(false);
  }

  function handleCancel() {
    const saved = localStorage.getItem(MOBILE_FOCAL_KEY);
    if (saved) {
      const { x, y } = JSON.parse(saved);
      setFocalX(x);
      setFocalY(y);
    } else {
      setFocalX(50);
      setFocalY(50);
    }
    setEditing(false);
    setDragging(false);
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated noise background */}
      <div className="noise-bg" />

      {/* Hero background image */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ cursor: editing ? "crosshair" : "default" }}
        onMouseDown={editing ? (e) => { setDragging(true); updateFromEvent(e); } : undefined}
        onMouseMove={editing && dragging ? updateFromEvent : undefined}
        onMouseUp={editing ? () => setDragging(false) : undefined}
        onMouseLeave={editing ? () => setDragging(false) : undefined}
        onTouchStart={editing ? (e) => { setDragging(true); updateFromEvent(e); } : undefined}
        onTouchMove={editing && dragging ? updateFromEvent : undefined}
        onTouchEnd={editing ? () => setDragging(false) : undefined}
      >
        <Image
          src="/images/new-bg.PNG"
          alt="Hero background"
          fill
          className="object-cover"
          style={{ objectPosition: isMobile ? `${focalX}% ${focalY}%` : "50% 50%" }}
          priority
          draggable={false}
        />

        {/* Crosshair — mobile edit mode only */}
        {editing && isMobile && (
          <div
            className="absolute pointer-events-none z-10"
            style={{ left: `${focalX}%`, top: `${focalY}%`, transform: "translate(-50%, -50%)" }}
          >
            <div className="absolute w-px h-8 bg-white/80 left-1/2 -translate-x-1/2 -translate-y-full" />
            <div className="absolute w-px h-8 bg-white/80 left-1/2 -translate-x-1/2 top-1/2" />
            <div className="absolute h-px w-8 bg-white/80 top-1/2 -translate-y-1/2 -translate-x-full" />
            <div className="absolute h-px w-8 bg-white/80 top-1/2 -translate-y-1/2 left-1/2" />
            <div className="w-4 h-4 rounded-full border-2 border-white bg-white/30 shadow-lg" />
          </div>
        )}

        {editing && isMobile && (
          <div className="absolute inset-0 bg-black/30 pointer-events-none z-0" />
        )}
      </div>

      {/* Subtle dark red glow accents */}
      <div
        className="absolute top-0 left-0 w-1/3 h-1/3 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(127,29,29,0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-1/3 h-1/3 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(127,29,29,0.15) 0%, transparent 70%)" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-center">
            <Image
              src="/images/qvils-logo.jpg"
              alt="QVIL Studios"
              width={600}
              height={300}
              priority
              className="w-full max-w-[520px] md:max-w-3xl lg:max-w-4xl h-auto drop-shadow-2xl"
            />
          </div>

          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest max-w-3xl mx-auto leading-relaxed">
            <span className="text-gray-200">FASHION IN DISTORTION</span>
            <br />
            <span className="text-white text-lg italic mt-2 block">By Justin J Vargas</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-6 w-full px-4 sm:px-0">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-red-950 text-white hover:bg-red-900 px-8 py-3 text-lg font-semibold rounded-none border-2 border-red-800/50 uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
              asChild
            >
              <Link href="/archives">View Archives</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-red-900/50 text-red-900 hover:bg-red-950/30 hover:text-white hover:border-red-800/70 px-12 py-3 text-lg font-semibold rounded-none uppercase tracking-widest transition-all duration-300"
              asChild
            >
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 100%)" }}
      />
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-black/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/30 to-transparent pointer-events-none" />

      {/* Mobile-only focal point editor — admin only */}
      {isMobile && isAdmin && (
        editing ? (
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/80 border border-white/20 px-4 py-3 backdrop-blur-sm"
          >
            <span className="text-white/60 text-xs uppercase tracking-widest">
              Drag · {focalX}% / {focalY}%
            </span>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-red-950 border border-red-800/50 text-white text-xs uppercase tracking-widest hover:bg-red-900 transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-1.5 border border-white/20 text-white/60 text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="absolute bottom-6 right-6 z-20 px-3 py-1.5 bg-black/60 border border-white/20 text-white/50 text-xs uppercase tracking-widest hover:text-white hover:border-white/40 transition-colors backdrop-blur-sm"
          >
            Edit Position
          </button>
        )
      )}
    </section>
  );
}
