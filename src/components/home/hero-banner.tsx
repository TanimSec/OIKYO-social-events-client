"use client";

import * as React from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";

export function HeroBanner() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Autoplay policy handled silently
      });
    }
  }, []);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextState = !isMuted;
    videoRef.current.muted = nextState;
    setIsMuted(nextState);
  };

  return (
    <section className="relative overflow-hidden bg-zinc-950 text-white border-b border-zinc-800/80 py-12 sm:py-16 lg:py-20">
      {/* Subtle Background Radial Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Clean, Uncluttered Headline & Copy */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tri-Color Civic Accents */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-1.5 rounded-full bg-rose-500" />
              <span className="w-7 h-1.5 rounded-full bg-amber-400" />
              <span className="w-7 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-1.5">
                Dhaka Civic Action Network
              </span>
            </div>

            {/* Impactful Condensed Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none">
                Giving Hope.
              </h1>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-emerald-400 leading-none">
                Building Futures.
              </h1>
            </div>

            {/* Clean, Concise 1-Sentence Subtitle */}
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal max-w-md">
              A transparent non-profit platform uniting volunteers across Dhaka for emergency winter relief, lake cleanups, and community empowerment.
            </p>

            {/* Two Focused Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/upcoming-events"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-400/20 transition-all"
              >
                <span>Volunteer Now</span>
              </Link>

              <Link
                href="/create-event"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider backdrop-blur-xs transition-all"
              >
                <span>Host Initiative</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Prominently Placed Video Showcase */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/15 bg-zinc-900 shadow-2xl shadow-emerald-950/40">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster="/images/events/slum-education.jpg"
                className="w-full h-full object-cover"
              >
                <source src="/videos/Oikyo_heroVid.mp4" type="video/mp4" />
                <source src="/videos/hero.mp4" type="video/mp4" />
              </video>

              {/* Live Civic Action Pill */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 text-[11px] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Dhaka Community in Action</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={toggleSound}
                className="absolute bottom-4 right-4 z-20 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg"
                title={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
                aria-label={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Sound Off</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sound On</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
