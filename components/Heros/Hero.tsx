import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated noise background */}
      <div className="noise-bg" />

      {/* Base black background with subtle dark red tint */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0000] to-black opacity-80" />
      
      {/* Subtle dark red glow accents */}
      <div 
        className="absolute top-0 left-0 w-1/3 h-1/3 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(127,29,29,0.2) 0%, transparent 70%)',
        }}
      />
      <div 
        className="absolute bottom-0 right-0 w-1/3 h-1/3 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(127,29,29,0.15) 0%, transparent 70%)',
        }}
      />

      {/* Rough pencil scratch overlays - cutting through effect - darker and more prominent */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Scratch 1 - Top left diagonal - darker */}
        <svg className="absolute top-20 left-10 w-96 h-96 opacity-70" viewBox="0 0 400 400" fill="none">
          <path 
            d="M 50 80 Q 120 150, 200 120 T 350 100" 
            stroke="rgba(220,38,38,0.6)" 
            strokeWidth="2" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 60 90 Q 130 160, 210 130 T 360 110" 
            stroke="rgba(255,255,255,0.7)" 
            strokeWidth="1.5" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 55 85 Q 125 155, 205 125 T 355 105" 
            stroke="rgba(127,29,29,0.5)" 
            strokeWidth="1.2" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Scratch 2 - Center vertical - more prominent */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[800px] opacity-60" viewBox="0 0 600 800" fill="none">
          <path 
            d="M 300 50 Q 280 200, 300 400 T 320 750" 
            stroke="rgba(220,38,38,0.7)" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 295 60 Q 275 210, 295 410 T 315 760" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1.8" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 305 55 Q 285 205, 305 405 T 325 755" 
            stroke="rgba(127,29,29,0.5)" 
            strokeWidth="1.5" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Scratch 3 - Bottom right - darker */}
        <svg className="absolute bottom-20 right-10 w-[500px] h-[400px] opacity-55" viewBox="0 0 500 400" fill="none">
          <path 
            d="M 50 300 Q 150 250, 250 280 T 450 320" 
            stroke="rgba(220,38,38,0.6)" 
            strokeWidth="2.2" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path 
            d="M 55 310 Q 155 260, 255 290 T 455 330" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1.5" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Scratch 4 - Top right horizontal */}
        <svg className="absolute top-40 right-20 w-[400px] h-[200px] opacity-50" viewBox="0 0 400 200" fill="none">
          <path 
            d="M 50 100 Q 150 80, 250 100 T 350 90" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1.5" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Scratch 5 - Left side vertical */}
        <svg className="absolute top-1/3 left-5 w-[300px] h-[500px] opacity-45" viewBox="0 0 300 500" fill="none">
          <path 
            d="M 100 50 Q 80 200, 100 350 T 120 450" 
            stroke="rgba(255,255,255,0.6)" 
            strokeWidth="1.3" 
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Additional fine scratches - darker with red accents */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1920 1080" fill="none">
          <path d="M 200 300 L 400 280 L 600 310" stroke="rgba(220,38,38,0.6)" strokeWidth="1" strokeLinecap="round" />
          <path d="M 1200 200 L 1400 180 L 1600 210" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" />
          <path d="M 300 800 L 500 780 L 700 810" stroke="rgba(220,38,38,0.5)" strokeWidth="1" strokeLinecap="round" />
          <path d="M 1000 700 L 1200 680 L 1400 710" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeLinecap="round" />
          <path d="M 600 500 L 800 480 L 1000 510" stroke="rgba(127,29,29,0.5)" strokeWidth="0.9" strokeLinecap="round" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <div className="space-y-12">
          {/* Main name - Big and bold */}
          <div className="space-y-6">
            <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none">
              <span 
                className="block text-white mb-2"
                style={{
                  textShadow: '0 0 20px rgba(220,38,38,0.3), 0 0 40px rgba(220,38,38,0.15), 0 0 60px rgba(0,0,0,0.5), 2px 2px 4px rgba(0,0,0,0.8)',
                  letterSpacing: '-0.08em',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                QVIL
              </span>
              <span 
                className="block text-gray-300 text-4xl md:text-6xl font-light tracking-[0.3em] uppercase"
                style={{
                  letterSpacing: '0.4em',
                  fontWeight: 300,
                  textShadow: '0 0 15px rgba(220,38,38,0.2), 0 0 30px rgba(0,0,0,0.6)',
                }}
              >
                STUDIOS
              </span>
            </h1>
            
            {/* Elegant divider - darker with red accent */}
            <div className="flex items-center justify-center gap-3 pt-4">
              <div className="h-px w-20 bg-red-900/40"></div>
              <div className="h-px w-32 bg-red-800/60"></div>
              <div className="h-px w-20 bg-red-900/40"></div>
            </div>
          </div>

          {/* Subtitle - darker emo vibe */}
          <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest max-w-3xl mx-auto leading-relaxed">
            <span className="text-gray-200">FASHION IN DISTORTION</span>
            <br />
            <span className="text-gray-500 text-lg italic mt-2 block">By Justin J Vargas</span>
          </p>

          {/* CTA Buttons - darker emo style */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12">
            <Button 
              size="lg" 
              className="bg-red-950 text-white hover:bg-red-900 px-12 py-8 text-lg font-semibold rounded-none border-2 border-red-800/50 uppercase tracking-widest transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.4)]"
            >
              View Work
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-red-900/50 text-red-900 hover:bg-red-950/30 hover:text-white hover:border-red-800/70 px-12 py-8 text-lg font-semibold rounded-none uppercase tracking-widest transition-all duration-300"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* Vignette overlay - darker */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      
      {/* Additional dark corners */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-black/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-black/40 to-transparent pointer-events-none" />
    </section>
  );
}


