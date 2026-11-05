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
    <section className="relative min-h-[640px] sm:min-h-[720px] flex items-center justify-center overflow-hidden">
      {/* Background Video Covering ENTIRE Hero Section */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/events/slum-education.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/Oikyo_heroVid.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Balanced Scrim for High Contrast & Text Legibility */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/65 backdrop-brightness-95" />

        {/* Seamless Theme-Adaptive Edge Blends (Fixes Light-Mode Black Box Bug) */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
      </div>

      {/* Centered, Uncluttered Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6 sm:space-y-8">
        {/* Civic Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-white/20 backdrop-blur-md text-white text-xs font-semibold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Dhaka Civic Action Network</span>
        </div>

        {/* Impactful Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-md">
          Together for Dhaka.<br />
          <span className="text-emerald-400">Building Real Change.</span>
        </h1>

        {/* Relevant 1-Sentence Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-100 font-medium leading-relaxed drop-shadow-sm">
          A transparent community platform uniting volunteers across Mirpur, Dhanmondi, Uttara, and Mohammadpur for emergency relief, lake cleanups, and green urban drives.
        </p>

        {/* Two Focused Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-xl hover:shadow-amber-400/25 transition-all"
          >
            <span>Volunteer Now</span>
          </Link>

          <Link
            href="/create-event"
            className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-white/30 bg-white/15 hover:bg-white/25 active:bg-white/30 text-white font-black text-xs uppercase tracking-wider backdrop-blur-md transition-all shadow-xl"
          >
            <span>Host an Initiative</span>
          </Link>
        </div>
      </div>

      {/* Audio Sound Toggle Pill */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-20 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/25 text-xs font-semibold flex items-center gap-2 transition-all shadow-lg hover:scale-105"
        title={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
        aria-label={isMuted ? "Unmute Video Sound" : "Mute Video Sound"}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span>Sound Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Sound On</span>
          </>
        )}
      </button>
    </section>
  );
}
