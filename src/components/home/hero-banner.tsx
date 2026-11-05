import Link from "next/link";
import { HeartHandshake, Users, CalendarDays } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-black text-white">
      {/* Background Video with Dramatic Photo Fallback Poster */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/events/slum-education.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 sm:opacity-50 filter contrast-125 brightness-90"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Radial Shadow Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
        <div className="max-w-3xl space-y-7">
          {/* Tri-Color Accent Bars (Inspired by GenocideEdu NGO Design) */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-1.5 rounded-full bg-rose-500" />
            <span className="w-8 h-1.5 rounded-full bg-amber-400" />
            <span className="w-8 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 ml-2">
              Dhaka Civic Action Network
            </span>
          </div>

          {/* Bold Impactful Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Giving Hope.
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
              Restoring Dignity.
            </h1>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-emerald-400 leading-[0.95]">
              Building Futures.
            </h1>
          </div>

          {/* Editorial Subtitle with High Readability */}
          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-normal">
            Oikyo (ঐক্য) is a non-profit civic platform committed to uniting volunteers across Dhaka to provide immediate humanitarian relief, lake cleanups, urban greenery, and sustainable empowerment for a better tomorrow.
          </p>

          {/* Action Button Trio */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-400/20 transition-all"
            >
              <span>Volunteer</span>
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-rose-500/20 transition-all"
            >
              <span>Host Initiative</span>
            </Link>

            <Link
              href="#what-we-do"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-600/20 transition-all"
            >
              <span>Our Programs</span>
            </Link>
          </div>

          {/* Social Proof Pill Badges */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" />
              <span>
                <strong className="text-white font-bold">5,400+</strong> Active Volunteers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-400" />
              <span>
                <strong className="text-white font-bold">140+</strong> Verified Community Drives
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>
                <strong className="text-white font-bold">24,000+</strong> Citizens Supported
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Copyright / Watermark in Bottom Right */}
      <div className="absolute bottom-5 right-6 z-10 hidden sm:block text-[11px] text-zinc-400/80 tracking-wide font-medium">
        © Oikyo Social Development Platform · Dhaka, Bangladesh
      </div>
    </section>
  );
}
