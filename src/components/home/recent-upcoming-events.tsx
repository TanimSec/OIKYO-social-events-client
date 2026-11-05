"use client";

import * as React from "react";
import Link from "next/link";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  LayoutGrid,
  SlidersHorizontal,
} from "lucide-react";
import {
  EventCard,
  EventCardSkeleton,
  SocialEvent,
} from "@/components/events/event-card";

function ViewModeToggle({
  currentMode,
  onModeChange,
}: {
  currentMode: "carousel" | "grid";
  onModeChange: (mode: "carousel" | "grid") => void;
}) {
  const modes = [
    { mode: "carousel" as const, icon: SlidersHorizontal, title: "Carousel View" },
    { mode: "grid" as const, icon: LayoutGrid, title: "Grid View" },
  ];

  return (
    <div className="p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 flex items-center gap-1">
      {modes.map(({ mode, icon: Icon, title }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onModeChange(mode)}
          className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
            currentMode === mode
              ? "bg-white dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 shadow-xs"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
          title={title}
          aria-label={title}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
}

function CarouselScrollControls({
  onScroll,
}: {
  onScroll: (dir: "left" | "right") => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => onScroll("left")}
        className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
        aria-label="Previous Events Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onScroll("right")}
        className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors shadow-xs"
        aria-label="Next Events Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function RecentEventsHeader({
  viewMode,
  onModeChange,
  onScroll,
  showScroll,
}: {
  viewMode: "carousel" | "grid";
  onModeChange: (mode: "carousel" | "grid") => void;
  onScroll: (dir: "left" | "right") => void;
  showScroll: boolean;
}) {
  return (
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

      <div className="flex items-center gap-3 self-start sm:self-auto">
        <ViewModeToggle currentMode={viewMode} onModeChange={onModeChange} />
        {showScroll && <CarouselScrollControls onScroll={onScroll} />}
      </div>
    </div>
  );
}

export function RecentUpcomingEvents() {
  const [events, setEvents] = React.useState<SocialEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [viewMode, setViewMode] = React.useState<"carousel" | "grid">("carousel");
  const carouselRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isMounted = true;
    async function loadEvents() {
      setIsLoading(true);
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
        const res = await fetch(`${serverUrl}/api/events/upcoming?limit=6`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setEvents(data.events || []);
          }
        }
      } catch (error) {
        console.error("Error fetching recent upcoming events:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = 380;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const showScrollControls =
    viewMode === "carousel" && !isLoading && events.length > 0;

  return (
    <section className="py-16 sm:py-24 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecentEventsHeader
          viewMode={viewMode}
          onModeChange={setViewMode}
          onScroll={handleScroll}
          showScroll={showScrollControls}
        />

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <EventCardSkeleton key={`skeleton-${i}`} />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-3">
            <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
              No upcoming events found
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Check back soon or create the first community drive in your neighborhood.
            </p>
          </div>
        ) : viewMode === "carousel" ? (
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {events.map((event) => (
              <div
                key={event._id}
                className="w-[300px] sm:w-[360px] shrink-0 snap-start h-full"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold shadow-xs transition-colors"
          >
            <span>View All Upcoming Initiatives</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
