import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind QVIL Studios and designer Justin J Vargas",
};

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Subtle background gradient */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-60"
        style={{
          background: 'radial-gradient(ellipse at top, transparent 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* EXPERIMENTAL: Fashion designer journal sketches - remove if not liked */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.10] dark:opacity-[0.15]">
        <svg className="w-full h-full text-gray-900 dark:text-gray-100" viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">

          {/* ===== TOP LEFT AREA ===== */}

          {/* Large hoodie - prominent */}
          <g transform="translate(60, 80) rotate(-3)">
            <path d="M0 0 Q40 -25 80 0" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M8 0 L0 85 L35 95 L40 35" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M72 0 L80 85 L45 95 L40 35" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <ellipse cx="40" cy="-8" rx="18" ry="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="90" y="50" fontSize="11" fill="currentColor" fontFamily="serif" fontStyle="italic">oversized?</text>
          </g>

          {/* Small collar sketch */}
          <g transform="translate(200, 50) rotate(5)">
            <path d="M0 0 L15 -10 L30 0 L35 8 L-5 8 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* ===== TOP CENTER ===== */}

          {/* Flowing dress - large */}
          <g transform="translate(500, 60) rotate(-5)">
            <ellipse cx="30" cy="0" rx="20" ry="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 10 L-20 120 Q30 135 80 120 L50 10" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M0 50 Q30 60 60 50" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
            <path d="M-10 85 Q30 100 70 85" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" />
          </g>

          {/* "silhouette" */}
          <text x="680" y="90" fontSize="14" fill="currentColor" fontFamily="serif" fontStyle="italic">silhouette</text>

          {/* Tiny button row */}
          <g transform="translate(750, 140)">
            <circle cx="0" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="18" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <circle cx="36" cy="0" r="5" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* ===== TOP RIGHT ===== */}

          {/* Large coat sketch */}
          <g transform="translate(1050, 50) rotate(4)">
            <path d="M0 0 L10 -15 L50 -15 L60 0" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 0 L-15 150 L20 160" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M60 0 L75 150 L40 160" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <line x1="30" y1="0" x2="30" y2="80" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
            <text x="-25" y="175" fontSize="10" fill="currentColor" fontFamily="serif" fontStyle="italic">long coat</text>
          </g>

          {/* Small vest */}
          <g transform="translate(1250, 120) rotate(-8)">
            <path d="M0 8 L5 0 L30 0 L35 8 L32 50 L17 55 L2 50 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </g>

          {/* ===== LEFT SIDE ===== */}

          {/* Pants sketch - medium */}
          <g transform="translate(80, 280) rotate(2)">
            <path d="M0 0 L50 0 L55 15 Q65 70 50 130 L30 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 0 L-5 15 Q-15 70 0 130 L20 140" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <line x1="25" y1="0" x2="25" y2="50" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
            <text x="60" y="80" fontSize="9" fill="currentColor" fontFamily="serif" fontStyle="italic">wide leg</text>
          </g>

          {/* "tension" vertical */}
          <text x="30" y="500" fontSize="12" fill="currentColor" fontFamily="serif" fontStyle="italic" transform="rotate(-90, 30, 500)">tension</text>

          {/* Cropped jacket */}
          <g transform="translate(100, 550) rotate(-6)">
            <path d="M0 0 L8 -10 L40 -10 L48 0" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M0 0 L-5 45 L20 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M48 0 L53 45 L28 50" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="18" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
            <circle cx="30" cy="15" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </g>

          {/* Small tee */}
          <g transform="translate(50, 720) rotate(8)">
            <path d="M0 5 L8 0 L32 0 L40 5 L36 12 L36 45 L4 45 L4 12 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* ===== CENTER LEFT ===== */}

          {/* Big blazer - very prominent */}
          <g transform="translate(250, 320) rotate(3)">
            <path d="M0 0 L15 -20 L55 -20 L70 0" fill="none" stroke="currentColor" strokeWidth="2.2" />
            <path d="M0 0 L-12 100 L25 110" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M70 0 L82 100 L45 110" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M25 0 L25 60" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M45 0 L45 60" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="30" y1="25" x2="40" y2="25" stroke="currentColor" strokeWidth="0.8" />
            <line x1="30" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* "raw edge" */}
          <text x="200" y="480" fontSize="10" fill="currentColor" fontFamily="serif" fontStyle="italic" transform="rotate(-8, 200, 480)">raw edge</text>

          {/* Sleeve study */}
          <g transform="translate(350, 500) rotate(-12)">
            <path d="M0 0 Q20 8 30 40 L35 80" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M0 0 Q-8 15 0 40 L8 80" fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" />
            <text x="40" y="50" fontSize="8" fill="currentColor" fontFamily="serif" fontStyle="italic">sleeve</text>
          </g>

          {/* ===== CENTER ===== */}

          {/* Dress form / mannequin - large */}
          <g transform="translate(550, 350) rotate(-2)">
            <ellipse cx="0" cy="0" rx="25" ry="15" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M-25 15 Q-35 70 -20 110 M25 15 Q35 70 20 110" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <line x1="0" y1="110" x2="0" y2="140" stroke="currentColor" strokeWidth="1.8" />
            <line x1="-15" y1="140" x2="15" y2="140" stroke="currentColor" strokeWidth="1.5" />
          </g>

          {/* "distortion" */}
          <text x="480" y="520" fontSize="16" fill="currentColor" fontFamily="serif" fontStyle="italic" transform="rotate(-10, 480, 520)">distortion</text>

          {/* Measurement */}
          <g transform="translate(620, 480)">
            <text fontSize="11" fill="currentColor" fontFamily="monospace">32&quot;</text>
            <line x1="0" y1="15" x2="45" y2="15" stroke="currentColor" strokeWidth="0.8" />
            <line x1="0" y1="10" x2="0" y2="20" stroke="currentColor" strokeWidth="0.8" />
            <line x1="45" y1="10" x2="45" y2="20" stroke="currentColor" strokeWidth="0.8" />
          </g>

          {/* Skirt sketch */}
          <g transform="translate(700, 320) rotate(6)">
            <path d="M0 0 L40 0 L55 80 Q20 90 -15 80 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 25 Q20 32 35 25" fill="none" stroke="currentColor" strokeWidth="0.7" strokeDasharray="2 3" />
          </g>

          {/* ===== CENTER RIGHT ===== */}

          {/* Oversized shirt - big */}
          <g transform="translate(900, 280) rotate(-4)">
            <path d="M0 10 L20 0 L60 0 L80 10" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M0 10 L0 90 L80 90 L80 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 10 L-25 25 L-25 50 L0 45" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M80 10 L105 25 L105 50 L80 45" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <line x1="40" y1="20" x2="40" y2="70" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 4" />
          </g>

          {/* "movement" */}
          <text x="1000" y="400" fontSize="11" fill="currentColor" fontFamily="serif" fontStyle="italic" transform="rotate(12, 1000, 400)">movement</text>

          {/* Shoe sketch */}
          <g transform="translate(1100, 350) rotate(-10)">
            <path d="M0 0 Q15 -5 40 0 L50 10 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M50 10 L55 18 L5 18" fill="none" stroke="currentColor" strokeWidth="1" />
          </g>

          {/* ===== RIGHT SIDE ===== */}

          {/* Runway figures */}
          <g transform="translate(1200, 450)">
            <line x1="0" y1="0" x2="120" y2="0" stroke="currentColor" strokeWidth="0.8" />
            <path d="M20 0 L20 -40 M20 -32 L10 -15 M20 -32 L30 -15" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="20" cy="-46" r="6" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M60 0 L60 -35 M60 -28 L52 -12" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="60" cy="-40" r="5" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M95 0 L95 -30" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="95" cy="-35" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <text x="10" y="20" fontSize="9" fill="currentColor" fontFamily="serif" fontStyle="italic">runway</text>
          </g>

          {/* Corset/bodice */}
          <g transform="translate(1280, 550) rotate(5)">
            <path d="M0 0 Q15 -8 30 0 L35 50 Q15 60 -5 50 Z" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <line x1="5" y1="10" x2="25" y2="10" stroke="currentColor" strokeWidth="0.5" />
            <line x1="3" y1="22" x2="27" y2="22" stroke="currentColor" strokeWidth="0.5" />
            <line x1="0" y1="34" x2="30" y2="34" stroke="currentColor" strokeWidth="0.5" />
          </g>

          {/* ===== BOTTOM LEFT ===== */}

          {/* Deconstructed jacket */}
          <g transform="translate(180, 680) rotate(5)">
            <path d="M0 0 L12 -18 L48 -18 L60 0" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 0 L-10 70" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M60 0 L70 70" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M-10 70 L70 70" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          </g>

          {/* Crossed out idea */}
          <g transform="translate(320, 750)">
            <rect x="0" y="0" width="50" height="30" fill="none" stroke="currentColor" strokeWidth="0.8" />
            <line x1="0" y1="0" x2="50" y2="30" stroke="currentColor" strokeWidth="0.6" />
            <line x1="50" y1="0" x2="0" y2="30" stroke="currentColor" strokeWidth="0.6" />
          </g>

          {/* ===== BOTTOM CENTER ===== */}

          {/* Draped top */}
          <g transform="translate(550, 700) rotate(-3)">
            <path d="M0 0 Q30 -15 60 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 0 Q-5 40 15 60 Q30 65 45 60 Q65 40 55 0" fill="none" stroke="currentColor" strokeWidth="1.3" />
            <path d="M15 25 Q30 35 45 25" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <text x="70" y="35" fontSize="9" fill="currentColor" fontFamily="serif" fontStyle="italic">drape</text>
          </g>

          {/* "QVIL" */}
          <text x="720" y="780" fontSize="22" fill="currentColor" fontFamily="sans-serif" fontWeight="300" opacity="0.6" letterSpacing="10">QVIL</text>

          {/* Zipper detail */}
          <g transform="translate(650, 650)">
            <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="1" />
            <path d="M-4 5 L4 10 L-4 15 L4 20 L-4 25 L4 30 L-4 35 L4 40 L-4 45 L4 50" fill="none" stroke="currentColor" strokeWidth="0.6" />
          </g>

          {/* ===== BOTTOM RIGHT ===== */}

          {/* Wide pants - large */}
          <g transform="translate(950, 650) rotate(-2)">
            <path d="M0 0 L70 0" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 0 L-10 120 L25 125" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <path d="M65 0 L80 120 L45 125" fill="none" stroke="currentColor" strokeWidth="1.8" />
            <line x1="35" y1="0" x2="35" y2="40" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 3" />
          </g>

          {/* "structure" */}
          <text x="1100" y="720" fontSize="10" fill="currentColor" fontFamily="serif" fontStyle="italic">structure</text>

          {/* Fabric swatch */}
          <g transform="translate(1200, 700) rotate(15)">
            <rect x="0" y="0" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="0.4" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.4" />
            <line x1="0" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="0.4" />
            <text x="5" y="55" fontSize="8" fill="currentColor" fontFamily="serif">swatch</text>
          </g>

          {/* Collar study */}
          <g transform="translate(1300, 800) rotate(-5)">
            <path d="M0 0 Q12 -12 24 0 Q36 -12 48 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <line x1="12" y1="0" x2="12" y2="20" stroke="currentColor" strokeWidth="0.6" />
            <line x1="36" y1="0" x2="36" y2="20" stroke="currentColor" strokeWidth="0.6" />
          </g>

          {/* ===== SCATTERED SMALL ELEMENTS ===== */}

          {/* Pin marks */}
          <circle cx="400" cy="200" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="850" cy="550" r="4" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="150" cy="450" r="3" fill="none" stroke="currentColor" strokeWidth="0.6" />

          {/* X marks */}
          <g transform="translate(300, 600)">
            <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="0.8" />
            <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="0.8" />
          </g>
          <g transform="translate(1150, 250)">
            <line x1="0" y1="0" x2="8" y2="8" stroke="currentColor" strokeWidth="0.7" />
            <line x1="8" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="0.7" />
          </g>

          {/* Stitch lines */}
          <path d="M450 600 L480 605 L510 598" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" />
          <path d="M800 180 L850 175 L900 182" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />

          {/* Arrows */}
          <g transform="translate(380, 420)">
            <line x1="0" y1="0" x2="30" y2="0" stroke="currentColor" strokeWidth="0.8" />
            <path d="M25 -4 L30 0 L25 4" fill="none" stroke="currentColor" strokeWidth="0.8" />
          </g>

        </svg>
      </div>
      {/* END EXPERIMENTAL */}

      {/* Hero Statement */}
      <section className="relative min-h-[50vh] flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-white mb-6">
            Fashion in Distortion
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-light">
            Where tradition breaks and something new emerges.
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section className="relative px-6 py-20 border-t border-gray-200 dark:border-red-900/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-8">
            The Journey
          </h2>
          <div className="space-y-6 text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            <p>
              QVIL Studios was born from a high school hallway. As Fashion Show President,
              Justin J Vargas didn&apos;t just participate—he transformed. Custom pieces crafted
              for classmates. Shows directed with vision. An award that proved this wasn&apos;t
              just a hobby.
            </p>
            <p>
              Designer and stylist. Justin creates original pieces but also has an eye for
              dressing others—curating looks that bring his vision to life on anyone who
              wears it.
            </p>
            <p>
              Now studying fashion in college, the vision has only sharpened. The hallways
              became runways. The classroom became New York. In 2024, QVIL Studios presented
              its first full show in the city—proof that what starts as passion can become
              something real.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative px-6 py-20 border-t border-gray-200 dark:border-red-900/20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xs font-medium uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-8">
            Philosophy
          </h2>
          <blockquote className="text-2xl md:text-3xl font-light text-gray-800 dark:text-gray-200 leading-relaxed">
            &ldquo;Fashion isn&apos;t about perfection. It&apos;s about tension—the space between
            what&apos;s expected and what&apos;s possible.&rdquo;
          </blockquote>
          <p className="mt-8 text-gray-600 dark:text-gray-400 font-light">
            Each piece is a question, not an answer.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20 border-t border-gray-200 dark:border-red-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            See the work.
          </p>
          <Link
            href="/archives"
            className="inline-block text-sm uppercase tracking-widest text-gray-900 dark:text-white border-b border-gray-900 dark:border-white pb-1 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-600 dark:hover:border-gray-300 transition-colors"
          >
            View Archives
          </Link>
        </div>
      </section>
    </div>
  );
}
