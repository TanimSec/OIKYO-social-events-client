"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getBackendToken, getServerUrl, getEventFallbackImage } from "@/lib/api";
import { SocialEvent } from "@/components/events/event-card";
import Swal from "sweetalert2";
import { toast } from "sonner";
import {
  CalendarDays,
  MapPin,
  Clock,
  ArrowLeft,
  Users,
  Share2,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Mail,
  UserCheck,
  HeartHandshake,
} from "lucide-react";

function EventDetailsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 animate-pulse">
      <div className="h-6 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-8" />
      <div className="h-[380px] w-full bg-zinc-200 dark:bg-zinc-800 rounded-3xl mb-10" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-10 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          <div className="h-5 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
        </div>
        <div className="h-80 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
      </div>
    </div>
  );
}

function EventNotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
          Event Not Found
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">
          The civic event you are looking for does not exist or may have been concluded. Browse our active community drives.
        </p>
      </div>
      <Link
        href="/upcoming-events"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Upcoming Events</span>
      </Link>
    </div>
  );
}

function EventGuidelines({ eventType }: { eventType: string }) {
  const guidelinesMap: Record<string, string[]> = {
    Cleanup: [
      "Wear sturdy footwear and comfortable clothing.",
      "Biodegradable gloves and trash bags are provided at the reporting point.",
      "Bring a reusable water bottle to reduce single-use plastic waste.",
    ],
    Plantation: [
      "Saplings and gardening trowels are distributed on arrival.",
      "Wear earth-friendly boots or washable sneakers.",
      "Briefing on soil preparation and post-planting care begins 15 mins prior.",
    ],
    Donation: [
      "Items should be neatly packaged, clean, and pre-sorted.",
      "Inventory recording takes place at the community reception desk.",
      "Digital acknowledgement receipts are issued to donors.",
    ],
    Healthcare: [
      "Free general physician consultation and basic vitals screening.",
      "Volunteer nurses and medical students facilitate queue coordination.",
      "Prescription assistance and OTC basic medicines distributed on-site.",
    ],
    Education: [
      "Notebooks, pencils, and storybooks provided for primary students.",
      "Volunteer mentors lead 45-minute interactive reading circles.",
      "Parents and guardians are encouraged to attend the orientation session.",
    ],
    Relief: [
      "Coordinated ration packaging and distribution zone.",
      "Priority assistance given to elderly residents, mothers, and persons with disabilities.",
      "Follow field coordinator directions for safe and orderly distribution.",
    ],
  };

  const tips = guidelinesMap[eventType] || guidelinesMap["Cleanup"];

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-6 space-y-4">
      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-500" />
        <span>Volunteer Preparation & Guidelines</span>
      </h3>
      <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
        {tips.map((tip, idx) => (
          <li key={idx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function EventHero({
  thumbnail,
  title,
  eventType,
}: {
  thumbnail?: string;
  title: string;
  eventType: string;
}) {
  const fallbackImg = getEventFallbackImage(eventType);
  const [imgSrc, setImgSrc] = React.useState<string>(thumbnail || fallbackImg);

  return (
    <div className="relative w-full h-[280px] sm:h-[420px] rounded-3xl overflow-hidden mb-10 shadow-sm border border-zinc-200/80 dark:border-zinc-800">
      <Image
        src={imgSrc}
        alt={title}
        fill
        priority
        unoptimized={typeof imgSrc === "string" && imgSrc.startsWith("http")}
        sizes="(max-width: 1200px) 100vw, 1200px"
        className="object-cover"
        onError={() => setImgSrc(fallbackImg)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs mb-3">
          {eventType}
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white drop-shadow-sm">
          {title}
        </h1>
      </div>
    </div>
  );
}

function EventDetailsDescription({
  description,
  eventType,
}: {
  description: string;
  eventType: string;
}) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          About This Initiative
        </h2>
        <div className="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line space-y-3">
          {description}
        </div>
      </div>

      <EventGuidelines eventType={eventType} />
    </div>
  );
}

interface SidebarProps {
  event: SocialEvent;
  isJoining: boolean;
  onJoin: () => void;
  onShare: () => void;
}

function EventDetailsSidebar({
  event,
  isJoining,
  onJoin,
  onShare,
}: SidebarProps) {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-xs space-y-6 sticky top-24">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-xs uppercase font-bold tracking-wider text-zinc-400">
              Admission
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>Free Civic Participation</span>
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                <CalendarDays className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Scheduled Date</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {formattedDate}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Reporting Time</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  09:00 AM (BST)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Meeting Point</p>
                <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  {event.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={onJoin}
            disabled={isJoining}
            className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {isJoining ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registering Spot...</span>
              </>
            ) : (
              <>
                <HeartHandshake className="w-4 h-4" />
                <span>Join This Event</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onShare}
            className="w-full py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Initiative</span>
          </button>
        </div>

        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
          <p className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">
            Initiated By
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate">
                {event.creatorName || "Dhaka Community Host"}
              </p>
              <p className="text-[11px] text-zinc-500 truncate flex items-center gap-1">
                <Mail className="w-3 h-3" />
                <span>{event.creatorEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const eventId = params?.id as string;
  const { data: session } = useSession();

  const [event, setEvent] = React.useState<SocialEvent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isJoining, setIsJoining] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchEventDetails() {
      if (!eventId) return;
      setIsLoading(true);
      try {
        const serverUrl = getServerUrl();
        const res = await fetch(`${serverUrl}/api/events/${eventId}`, {
          cache: "no-store",
        });

        if (res.status === 404 || res.status === 400) {
          if (isMounted) setNotFound(true);
          return;
        }

        if (res.ok) {
          const data = await res.json();
          if (isMounted) setEvent(data.event);
        } else {
          if (isMounted) setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading event details:", error);
        if (isMounted) setNotFound(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchEventDetails();
    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Event link copied to clipboard!");
    }
  };

  const showScheduleConfirmation = (
    title: string,
    message: string,
    iconType: "info" | "success"
  ) => {
    Swal.fire({
      title,
      text: message,
      icon: iconType,
      confirmButtonColor: "#059669",
      confirmButtonText: "View Joined Events",
      showCancelButton: true,
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/joined-events");
      }
    });
  };

  const handleJoinEvent = async () => {
    if (!session?.user) {
      toast.info("Please log in to register as a participant");
      router.push(`/login?callbackUrl=/events/${eventId}`);
      return;
    }

    if (!event) return;

    setIsJoining(true);
    try {
      const serverUrl = getServerUrl();
      const token = await getBackendToken(
        session.user.email,
        session.user.name
      );

      if (!token) {
        toast.error("Authentication handshake failed. Please re-login.");
        return;
      }

      const res = await fetch(`${serverUrl}/api/joined-events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          userName: session.user.name,
        }),
      });

      const data = await res.json();

      if (res.status === 409) {
        showScheduleConfirmation(
          "Already Registered",
          "You have already joined this community initiative! Check your schedule in Joined Events.",
          "info"
        );
        return;
      }

      if (res.ok && data.success) {
        showScheduleConfirmation(
          "You're Registered!",
          `You have successfully joined "${event.title}". Thank you for contributing to our civic progress!`,
          "success"
        );
      } else {
        toast.error(data.message || "Failed to join event. Please try again.");
      }
    } catch (error) {
      console.error("Join event error:", error);
      toast.error("Network error while trying to join the event.");
    } finally {
      setIsJoining(false);
    }
  };

  if (isLoading) return <EventDetailsSkeleton />;
  if (notFound || !event) return <EventNotFound />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Link
        href="/upcoming-events"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-emerald-600 dark:hover:text-emerald-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Upcoming Events</span>
      </Link>

      <EventHero
        thumbnail={event.thumbnail}
        title={event.title}
        eventType={event.eventType}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <EventDetailsDescription
          description={event.description}
          eventType={event.eventType}
        />

        <div className="lg:col-span-1">
          <EventDetailsSidebar
            event={event}
            isJoining={isJoining}
            onJoin={handleJoinEvent}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
}

export default function EventDetailsPage() {
  return (
    <React.Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetailsContent />
    </React.Suspense>
  );
}
