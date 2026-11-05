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
    <section className="py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <p className="text-xs uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">
            Platform Capabilities
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Built for Transparent Community Impact
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Engineered with modern full-stack safeguards so organizers and volunteers can focus on creating tangible change on the ground.
          </p>
        </div>

        {/* Equal-Height Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="h-full p-6 sm:p-7 rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/80 shadow-xs hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
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

