import { ThemeToggle } from "@/components/theme-toggle";
import { Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-screen">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-medium">
          <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Milestone C1 Initialized</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Oikyo — Social Development Events Platform
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
          Community-driven social action platform for grassroots volunteer initiatives, winter clothing distribution, tree plantation, and lake cleanups across Dhaka.
        </p>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Next.js App Router
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" /> Tailwind + next-themes
          </span>
        </div>
      </div>
    </main>
  );
}
