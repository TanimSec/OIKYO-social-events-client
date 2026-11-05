import {
  CalendarCheck,
  ShieldCheck,
  Users2,
  TreePine,
  Sparkles,
  MapPinned,
} from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: CalendarCheck,
      title: "Strict Future Date Verification",
      description:
        "Every community drive enforces chronological validation, preventing expired events from cluttering volunteer feeds.",
    },
    {
      icon: Users2,
      title: "Single-Click Volunteer Enrollment",
      description:
        "Join relief operations and tree plantations instantly with duplicate-join safeguards and personal tracking logs.",
    },
    {
      icon: ShieldCheck,
      title: "Decentralized Creator Ownership",
      description:
        "Organizers retain exclusive control over their initiatives with JWT cryptographic verification on updates and cancellations.",
    },
    {
      icon: TreePine,
      title: "Diverse Social Pillars",
      description:
        "Targeted categories covering Winter Relief, Lake Sanitation, Urban Afforestation, Free Healthcare, and Slum Education.",
    },
    {
      icon: MapPinned,
      title: "Hyper-Local Impact Hubs",
      description:
        "Coordinate actions neighborhood-by-neighborhood across Mirpur, Dhanmondi, Uttara, Mohammadpur, and Old Dhaka.",
    },
    {
      icon: Sparkles,
      title: "Zero-Barrier Community Access",
      description:
        "Anyone can view upcoming social events and details without logging in. Registration is only required to join or host.",
    },
  ];

  return (
    <section
      id="what-we-do"
      className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Editorial Two-Column Header (Inspired by GenocideEdu NGO Design) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start border-b border-zinc-100 dark:border-zinc-900 pb-12">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]">
              Meeting <span className="text-rose-500">Immediate Needs</span>, Building Strong Futures
            </h2>
          </div>

          <div className="lg:col-span-6 pt-2">
            <p className="text-base sm:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Our grassroots civic programs are built to deliver both immediate humanitarian relief and lasting social transformation. We address urgent community challenges—such as winter cold waves, lake pollution, and primary healthcare gaps across Dhaka—while equipping citizens with the transparent platform needed to organize sustainable community solutions.
            </p>
          </div>
        </div>

        {/* Equal-Height Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="h-full p-6 sm:p-7 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/60 shadow-xs hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.description}
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
