"use client";

import * as React from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export function NewsletterSection() {
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubscribed(true);
    toast.success("Subscribed to the Oikyo Community Dispatch!");
    setEmail("");
  };

  return (
    <section className="py-16 sm:py-20 bg-linear-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 sm:p-12 lg:p-16 shadow-xl shadow-zinc-950/5 text-center max-w-4xl mx-auto">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <Mail className="w-6 h-6" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Stay Informed on Local Drives
            </h2>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Get weekly roundups of emergency winter blanket distributions, river cleanups, and tree plantation events taking place across Dhaka.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span>You are subscribed to the weekly dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 shrink-0"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Zero spam. Unsubscribe at any time with a single click.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

