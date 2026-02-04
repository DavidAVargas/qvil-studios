"use client";

import { useState } from "react";
import { Heart, X, Sparkles } from "lucide-react";

export function SurpriseNote() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Small floating button - positioned to avoid dark/light mode toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-red-800 to-red-900 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
        title="A note for you"
      >
        <Heart className="h-5 w-5" fill="currentColor" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-w-lg w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 shadow-2xl border border-red-900/30">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-red-900/20 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-red-800/20 blur-3xl" />

            {/* Content */}
            <div className="relative">
              {/* Header */}
              <div className="mb-6 flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span className="text-sm uppercase tracking-widest text-red-400">
                  A Message For You
                </span>
                <Sparkles className="h-5 w-5 text-yellow-400" />
              </div>

              {/* Message */}
              <div className="space-y-4 text-center">
                <p className="text-xl font-light leading-relaxed text-white">
                  Hey Doggy,
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Don&apos;t worry, you can do this. Don&apos;t give up. Follow your dreams and fight for them no matter what.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  God will guide you. Great job on everything you&apos;ve accomplished!
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Remember: <span className="text-red-400">failure is learning</span>. It&apos;s all part of the process. If you&apos;re not failing, you&apos;re not trying.
                </p>
                <p className="text-lg font-light leading-relaxed text-gray-300">
                  Celebrate your wins when you win, but never celebrate early even if you think you&apos;re winning.
                </p>
                <div className="pt-4">
                  <p className="text-xl font-medium text-white">
                    I&apos;m super proud of you, truly.
                  </p>
                  <p className="mt-2 text-2xl font-semibold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                    I Love You, Utterlistin
                  </p>
                </div>
              </div>

              {/* Heart decoration */}
              <div className="mt-8 flex justify-center">
                <Heart className="h-8 w-8 text-red-500 animate-pulse" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
