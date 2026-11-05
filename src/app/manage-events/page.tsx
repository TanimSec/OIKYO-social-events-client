"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useSession } from "@/lib/auth-client";
import { getBackendToken, getTomorrowOrTodayDateString } from "@/lib/api";
import { SocialEvent } from "@/components/events/event-card";
import Swal from "sweetalert2";
import { toast } from "sonner";
import {
  FolderKanban,
  PlusCircle,
  CalendarDays,
  MapPin,
  Pencil,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Healthcare",
  "Education",
  "Relief",
];

function ManageEventsHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <FolderKanban className="w-3.5 h-3.5" />
          <span>Organizer Control Panel</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Manage My Created Events
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
          Review, update details, or remove civic drives you have initiated across Dhaka. You are currently managing{" "}
          <strong className="text-zinc-900 dark:text-zinc-100">{count}</strong>{" "}
          initiative{count === 1 ? "" : "s"}.
        </p>
      </div>

      <Link
        href="/create-event"
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto shrink-0"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Host New Event</span>
      </Link>
    </div>
  );
}

function ManageEventsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`manage-skeleton-${i}`}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 animate-pulse flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="w-full sm:w-36 h-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
          <div className="flex-1 w-full space-y-2">
            <div className="h-5 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
            <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ManageEventsEmpty() {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 p-12 sm:p-16 text-center space-y-5">
      <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          No Created Events Yet
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          You haven&apos;t created any civic initiatives yet. Host your first clean-up drive, tree plantation, or blood donation camp.
        </p>
      </div>
      <Link
        href="/create-event"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs"
      >
        <PlusCircle className="w-4 h-4" />
        <span>Host Your First Event</span>
      </Link>
    </div>
  );
}

interface FormState {
  title: string;
  eventType: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  description: string;
}

function EditFormInputs({
  data,
  onChange,
  minDate,
}: {
  data: FormState;
  onChange: (field: keyof FormState, val: string) => void;
  minDate: string;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Event Title
        </label>
        <input
          type="text"
          required
          value={data.title}
          onChange={(e) => onChange("title", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Category
          </label>
          <select
            value={data.eventType}
            onChange={(e) => onChange("eventType", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Scheduled Date (Future)
          </label>
          <input
            type="date"
            required
            min={minDate}
            value={data.eventDate}
            onChange={(e) => onChange("eventDate", e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Location & Meeting Point
        </label>
        <input
          type="text"
          required
          value={data.location}
          onChange={(e) => onChange("location", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
          Description & Objectives
        </label>
        <textarea
          required
          rows={4}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
}

interface EditModalProps {
  event: SocialEvent;
  onClose: () => void;
  onSuccess: (updated: SocialEvent) => void;
}

function EditEventModal({ event, onClose, onSuccess }: EditModalProps) {
  const { data: session } = useSession();
  const [formData, setFormData] = React.useState<FormState>({
    title: event.title,
    eventType: event.eventType,
    thumbnail: event.thumbnail || "",
    location: event.location,
    eventDate: event.eventDate,
    description: event.description,
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const minDate = getTomorrowOrTodayDateString();

  const handleFieldChange = (field: keyof FormState, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.eventDate || !formData.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.eventDate < minDate) {
      toast.error("Event date must be scheduled in the future.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!session?.user?.email) return;
      const token = await getBackendToken(session.user.email, session.user.name);
      if (!token) {
        toast.error("Session expired. Please log in again.");
        return;
      }

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/api/events/${event._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Event updated successfully!");
        onSuccess(data.event);
        onClose();
      } else {
        toast.error(data.message || "Failed to update event.");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Network error while updating event.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
              <Pencil className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Update Event Details
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <EditFormInputs
            data={formData}
            onChange={handleFieldChange}
            minDate={minDate}
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-2"
            >
              {isSubmitting && (
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface EventItemProps {
  event: SocialEvent;
  onEdit: (event: SocialEvent) => void;
  onDelete: (id: string, title: string) => void;
}

function ManageEventItem({ event, onEdit, onDelete }: EventItemProps) {
  const formattedDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-zinc-300 dark:hover:border-zinc-700">
      <div className="flex items-center gap-4 w-full sm:w-auto overflow-hidden">
        <div className="relative w-20 sm:w-28 h-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
          <Image
            src={event.thumbnail || "/images/events/dhaka-clean-mirpur.jpg"}
            alt={event.title}
            fill
            sizes="120px"
            className="object-cover"
          />
        </div>

        <div className="space-y-1.5 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
              {event.eventType}
            </span>
          </div>
          <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 truncate">
            {event.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
            <span className="flex items-center gap-1 font-medium text-zinc-700 dark:text-zinc-300">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {event.location}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <Link
          href={`/events/${event._id}`}
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          title="View Public Page"
        >
          <ExternalLink className="w-4 h-4" />
        </Link>
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors shadow-xs"
        >
          <Pencil className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
        <button
          type="button"
          onClick={() => onDelete(event._id, event.title)}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-xs font-semibold transition-colors shadow-xs"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

function ManageEventsContent() {
  const { data: session } = useSession();
  const [events, setEvents] = React.useState<SocialEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [editingEvent, setEditingEvent] = React.useState<SocialEvent | null>(null);

  const fetchManagedEvents = React.useCallback(async () => {
    if (!session?.user?.email) return;
    setIsLoading(true);
    try {
      const token = await getBackendToken(session.user.email, session.user.name);
      if (!token) return;

      const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
      const res = await fetch(`${serverUrl}/api/manage-events`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error("Error fetching managed events:", error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.email, session?.user?.name]);

  React.useEffect(() => {
    fetchManagedEvents();
  }, [fetchManagedEvents]);

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to permanently delete "${title}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!session?.user?.email) return;
          const token = await getBackendToken(session.user.email, session.user.name);
          if (!token) return;

          const serverUrl =
            process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
          const res = await fetch(`${serverUrl}/api/events/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await res.json();
          if (res.ok && data.success) {
            setEvents((prev) => prev.filter((e) => e._id !== id));
            Swal.fire("Deleted!", "The event initiative has been removed.", "success");
          } else {
            toast.error(data.message || "Failed to delete event.");
          }
        } catch (error) {
          console.error("Delete event error:", error);
          toast.error("Network error while deleting event.");
        }
      }
    });
  };

  const handleUpdateSuccess = (updated: SocialEvent) => {
    setEvents((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
  };

  return (
    <div className="space-y-8">
      <ManageEventsHeader count={events.length} />

      {isLoading ? (
        <ManageEventsSkeleton />
      ) : events.length === 0 ? (
        <ManageEventsEmpty />
      ) : (
        <div className="space-y-3.5">
          {events.map((event) => (
            <ManageEventItem
              key={event._id}
              event={event}
              onEdit={setEditingEvent}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
}

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <ManageEventsContent />
      </div>
    </ProtectedRoute>
  );
}
