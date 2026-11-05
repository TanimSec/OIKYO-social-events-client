"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useSession } from "@/lib/auth-client";
import { getBackendToken, getServerUrl } from "@/lib/api";
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Search,
  ExternalLink,
} from "lucide-react";

export interface JoinedEvent {
  _id: string;
  eventId: string;
  title: string;
  description: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
  userEmail: string;
  userName: string;
  joinedAt: string;
}

function JoinedEventsSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`joined-skeleton-${i}`}
          className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 animate-pulse"
        >
          <div className="h-44 w-full bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
          <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl pt-2" />
        </div>
      ))}
    </div>
  );
}

function JoinedEventsEmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-12 sm:p-16 text-center space-y-5">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          No Joined Initiatives Yet
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          Your civic journey begins with your first step. Explore scheduled cleanups, relief drives, and healthcare camps across Dhaka to get involved.
        </p>
      </div>
      <Link
        href="/upcoming-events"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
      >
        <Search className="w-4 h-4" />
        <span>Browse Upcoming Events</span>
      </Link>
    </div>
  );
}

function JoinedEventCard({ item }: { item: JoinedEvent }) {
  const formattedDate = new Date(item.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedJoinedDate = item.joinedAt
    ? new Date(item.joinedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col h-full rounded-3xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs hover:shadow-md transition-all group">
      <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={item.thumbnail || "/images/events/dhaka-clean-mirpur.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/90 text-white backdrop-blur-xs shadow-xs">
            {item.eventType}
          </span>
        </div>
        <div className="absolute top-3.5 right-3.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 text-white backdrop-blur-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Registered</span>
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <h3 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
            {item.title}
          </h3>

          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-2">
          {formattedJoinedDate && (
            <span className="text-[11px] text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Joined {formattedJoinedDate}</span>
            </span>
          )}

          <Link
            href={`/events/${item.eventId}`}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
          >
            <span>Details</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function JoinedEventsList() {
  const { data: session } = useSession();
  const [events, setEvents] = React.useState<JoinedEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    async function loadJoinedEvents() {
      if (!session?.user?.email) return;
      setIsLoading(true);
      try {
        const token = await getBackendToken(
          session.user.email,
          session.user.name
        );
        if (!token) return;

        const serverUrl = getServerUrl();
        const res = await fetch(`${serverUrl}/api/joined-events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setEvents(data.joinedEvents || []);
          }
        }
      } catch (error) {
        console.error("Error loading joined events:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadJoinedEvents();
    return () => {
      isMounted = false;
    };
  }, [session?.user?.email, session?.user?.name]);

  if (isLoading) {
    return <JoinedEventsSkeletonGrid />;
  }

  if (events.length === 0) {
    return <JoinedEventsEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <JoinedEventCard key={event._id} item={event} />
      ))}
    </div>
  );
}

export default function JoinedEventsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Civic Participation Roster</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              My Joined Volunteer Events
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
              Grassroots community service drives you have signed up for across Dhaka. Events are sorted chronologically by upcoming date.
            </p>
          </div>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto shrink-0"
          >
            <span>Explore More Drives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <JoinedEventsList />
      </div>
    </ProtectedRoute>
  );
}
