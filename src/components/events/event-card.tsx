import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getEventFallbackImage } from "@/lib/api";

export interface SocialEvent {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorName?: string;
  creatorEmail?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Donation: "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800",
  Cleanup: "bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800",
  Plantation: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800",
  Healthcare: "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-300 dark:border-rose-800",
  Education: "bg-purple-100 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300 border-purple-300 dark:border-purple-800",
  Relief: "bg-orange-100 text-orange-800 dark:bg-orange-950/80 dark:text-orange-300 border-orange-300 dark:border-orange-800",
};

export function EventCard({ event }: { event: SocialEvent }) {
  const fallbackImg = getEventFallbackImage(event.eventType);
  const badgeClass =
    CATEGORY_COLORS[event.eventType] ||
    "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700";

  return (
    <div className="group h-full flex flex-col justify-between rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300">
      <div>
        {/* Uniform Aspect-Ratio Image Container */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.thumbnail || fallbackImg}
            alt={event.title}
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== fallbackImg) {
                e.currentTarget.src = fallbackImg;
              }
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          {/* Category Badge Tag */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border shadow-xs backdrop-blur-xs ${badgeClass}`}
            >
              {event.eventType}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Date & Location Metas */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.eventDate}</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span className="truncate">{event.location}</span>
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {event.title}
          </h3>

          {/* Description Snippet */}
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>
      </div>

      {/* Card Footer with View Event Button */}
      <div className="p-5 pt-0">
        <Link
          href={`/events/${event._id}`}
          className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/60 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs group/btn"
        >
          <span>View Event</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="h-full flex flex-col justify-between rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 overflow-hidden p-0 space-y-4">
      <Skeleton className="aspect-16/10 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="p-5 pt-0">
        <Skeleton className="h-9 w-full rounded-xl" />
      </div>
    </div>
  );
}

