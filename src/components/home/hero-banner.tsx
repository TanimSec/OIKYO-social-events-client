import Link from "next/link";
import { ArrowRight, Calendar, HeartHandshake, MapPin, Users } from "lucide-react";

export function HeroBanner() {
  const stats = [
    { label: "Active Volunteers", value: "5,400+", icon: Users },
    { label: "Community Drives", value: "140+", icon: Calendar },
    { label: "Lives Touched in Dhaka", value: "24,000+", icon: HeartHandshake },
  ];

  return (
    <section className="relative overflow-hidden border-b border-zinc-200/80 dark:border-zinc-800/80 bg-linear-to-b from-emerald-50/40 via-white to-white dark:from-emerald-950/20 dark:via-zinc-950 dark:to-zinc-950 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Geographic Context Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold tracking-wide">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Grassroots Social Action Across Dhaka, Bangladesh</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
            Empowering Citizens to Lead{" "}
            <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-500/30 decoration-wavy decoration-2">
              Social Change
            </span>
          </h1>

          {/* Measure-constrained subtitle for optimal readability */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
            Join thousands of dedicated volunteers organizing warm winter blanket
            distributions in Mirpur, lake ecosystem cleanups in Dhanmondi, urban
            tree plantations in Uttara, and free medical camps in Mohammadpur.
          </p>

          {/* Primary Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span>Explore Upcoming Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-sm shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span>Host an Initiative</span>
            </Link>
          </div>
        </div>

        {/* Live Community Proof Metrics */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xs flex items-center gap-4 shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

