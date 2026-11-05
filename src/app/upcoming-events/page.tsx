"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { EventCard, EventCardSkeleton, SocialEvent } from "@/components/events/event-card";
import {
  Search,
  Filter,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  PlusCircle,
} from "lucide-react";

const EVENT_CATEGORIES = [
  "All",
  "Cleanup",
  "Plantation",
  "Donation",
  "Healthcare",
  "Education",
  "Relief",
];

function UpcomingEventsHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Community Service Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Upcoming Community Events
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Discover verified volunteer drives across Dhaka. All events are scheduled for future dates and welcome civic participation.
        </p>
      </div>

      <Link
        href="/create-event"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors self-start md:self-auto shrink-0"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Host New Event</span>
      </Link>
    </div>
  );
}

interface FilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
  displayedCount: number;
  totalCount: number;
}

function UpcomingEventsFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onReset,
  displayedCount,
  totalCount,
}: FilterProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-4 sm:p-5 shadow-xs mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
        <div className="md:col-span-7 relative">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by initiative title or neighborhood (e.g. Mirpur, Dhanmondi)..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="md:col-span-3 relative">
          <Filter className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          >
            {EVENT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "All" ? "All Categories" : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={onReset}
            className="w-full py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            Showing{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">
              {displayedCount}
            </strong>{" "}
            of{" "}
            <strong className="text-zinc-800 dark:text-zinc-200">
              {totalCount}
            </strong>{" "}
            upcoming initiatives
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {EVENT_CATEGORIES.map((cat) => (
            <button
              key={`pill-${cat}`}
              type="button"
              onClick={() => onCategoryChange(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                category === cat
                  ? "bg-emerald-600 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingEventsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, index) => {
          const pageNumber = index + 1;
          const isCurrent = pageNumber === currentPage;
          return (
            <button
              key={`page-${pageNumber}`}
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors ${
                isCurrent
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
        aria-label="Next Page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function UpcomingEventsEmpty({
  query,
  onReset,
}: {
  query: string;
  onReset: () => void;
}) {
  return (
    <div className="p-16 text-center rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 space-y-4">
      <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center">
        <Search className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
          No matching upcoming events found
        </h3>
        <p className="text-xs text-zinc-500 max-w-sm mx-auto">
          We couldn&apos;t find any events matching &ldquo;{query}&rdquo;. Try clearing filters or searching for another neighborhood.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset All Filters</span>
      </button>
    </div>
  );
}

function UpcomingEventsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("eventType") || "All";

  const [events, setEvents] = React.useState<SocialEvent[]>([]);
  const [totalEvents, setTotalEvents] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  const [category, setCategory] = React.useState(initialCategory);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    let isMounted = true;
    async function loadUpcomingEvents() {
      setIsLoading(true);
      try {
        const serverUrl =
          process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "6",
        });

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }
        if (category && category !== "All") {
          params.append("eventType", category);
        }

        const res = await fetch(`${serverUrl}/api/events/upcoming?${params.toString()}`, {
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setEvents(data.events || []);
            setTotalEvents(data.totalEvents || 0);
            setTotalPages(data.totalPages || 1);
          }
        }
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUpcomingEvents();
    return () => {
      isMounted = false;
    };
  }, [currentPage, debouncedSearch, category]);

  const handleResetFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCategory("All");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <UpcomingEventsHeader />

      <UpcomingEventsFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={(val) => {
          setCategory(val);
          setCurrentPage(1);
        }}
        onReset={handleResetFilters}
        displayedCount={events.length}
        totalCount={totalEvents}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={`skeleton-${i}`} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <UpcomingEventsEmpty
          query={debouncedSearch || category}
          onReset={handleResetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      <UpcomingEventsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default function UpcomingEventsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="w-8 h-8 mx-auto border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UpcomingEventsContent />
    </React.Suspense>
  );
}
