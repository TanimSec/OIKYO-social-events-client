"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarDays,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import { EventCard, EventCardSkeleton, SocialEvent } from "@/components/events/event-card";

export function RecentUpcomingEvents() {
  const [events, setEvents] = React.useState<SocialEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"carousel" | "grid">("carousel");
  const [activeSlide, setActiveSlide] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    async function fetchEvents() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/api/events/upcoming?limit=6`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data.events && Array.isArray(data.events)) {
            setEvents(data.events);
          }
        }
      } catch (error) {
        console.error("Failed to fetch recent upcoming events:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.85;
      const targetScroll =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const onScrollContainer = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveSlide(Math.max(0, Math.min(index, events.length - 1)));
    }
  };

  return (
    <section className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with View Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Next 6 Upcoming Drives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Recent Upcoming Events
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Chronologically scheduled community drives happening across Dhaka. Reserve your spot as a volunteer before dates fill up.
            </p>
          </div>

          {/* Action Row: Carousel / Grid Switcher + View All */}
          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* View Mode Toggle */}
            <div className="p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "carousel"
                    ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
                title="Carousel View"
                aria-label="Switch to Carousel View"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
                title="Grid View"
                aria-label="Switch to Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Arrows for Carousel */}
            {viewMode === "carousel" && !isLoading && events.length > 0 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
                  aria-label="Previous Events Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
                  aria-label="Next Events Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Render: Skeletons vs Data */}
        {isLoading ? (
          /* Skeletons Loader (Optional Task #1) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 space-y-3">
            <p className="text-zinc-500 text-sm">No upcoming events found.</p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <span>Be the first to host one</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : viewMode === "grid" ? (
          /* Standard 3-Column Equal Height Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          /* Interactive Carousel View (UI/UX Pro Max) */
          <div className="relative">
            <div
              ref={scrollRef}
              onScroll={onScrollContainer}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none scroll-smooth"
              aria-label="Upcoming Events Carousel"
            >
              {events.map((event) => (
                <div
                  key={event._id}
                  className="snap-start shrink-0 w-[88vw] sm:w-[45vw] lg:w-[calc(33.333%-1rem)]"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-1.5 mt-6">
              {events.map((event, idx) => (
                <button
                  key={`dot-${event._id}`}
                  type="button"
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: idx * (scrollRef.current.clientWidth * 0.85),
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeSlide === idx
                      ? "w-7 bg-emerald-600 dark:bg-emerald-400"
                      : "w-1.5 bg-zinc-300 dark:bg-zinc-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* View All Events Button */}
        <div className="mt-12 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300 text-zinc-800 dark:text-zinc-200 font-semibold text-sm transition-colors shadow-xs"
          >
            <span>Explore All Upcoming Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

