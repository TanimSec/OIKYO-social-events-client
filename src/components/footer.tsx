import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/brand-logo";

const CURRENT_YEAR = 2026;

const SOCIAL_ITEMS = [
  {
    href: "https://x.com",
    label: "X (formerly Twitter)",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: "https://github.com",
    label: "GitHub",
    path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    path: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.77v8.37H6.46v-8.37M7.85 6.47a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z",
  },
  {
    href: "https://facebook.com",
    label: "Facebook",
    path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
  },
];

function FooterBrand() {
  return (
    <div className="lg:col-span-2 space-y-4">
      <BrandLogo size="md" />
      <p className="text-sm leading-relaxed max-w-sm text-zinc-600 dark:text-zinc-400">
        A transparent, grassroots community service collective empowering citizens
        across Dhaka to organize winter clothes distributions, urban greenery drives,
        healthcare camps, and lake cleanups.
      </p>
      <div className="flex items-center gap-3 pt-2">
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="w-9 h-9 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-xs"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d={item.path} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function FooterSections() {
  const hubs = [
    "Mirpur & Pallabi",
    "Dhanmondi Lake Environs",
    "Uttara Sectors 1–14",
    "Mohammadpur & Town Hall",
    "Old Dhaka & Sadarghat",
  ];

  return (
    <>
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Platform
        </h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link href="/upcoming-events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Upcoming Events
            </Link>
          </li>
          <li>
            <Link href="/create-event" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Host an Initiative
            </Link>
          </li>
          <li>
            <Link href="/joined-events" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              Volunteer Log
            </Link>
          </li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Impact Hubs
        </h3>
        <ul className="space-y-2 text-sm">
          {hubs.map((hub) => (
            <li key={hub} className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500" />
              <span>{hub}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Volunteer Desk
        </h3>
        <div className="space-y-2.5 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
            <span>House 42, Road 7, Dhanmondi, Dhaka-1205</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>volunteer@oikyo-bd.org</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
            <span>+880 1711-234567</span>
          </div>
        </div>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <FooterBrand />
          <FooterSections />
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {CURRENT_YEAR} Oikyo (ঐক্য). Dedicated to grassroots civic progress across Bangladesh.</p>
          <div className="flex items-center gap-1 text-zinc-500">
            <span>Built with care for Dhaka communities</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
          </div>
        </div>
      </div>
    </footer>
  );
}
