"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ProtectedRoute } from "@/components/protected-route";
import { getBackendToken } from "@/lib/api";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Calendar,
  MapPin,
  Tag,
  ImageIcon,
  FileText,
  PlusCircle,
  ArrowRight,
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

const LOCAL_PRESET_IMAGES = [
  { label: "Winter Blanket Relief", url: "/images/events/winter-relief.jpg" },
  { label: "Lake Cleanliness", url: "/images/events/lake-cleanup.jpg" },
  { label: "Tree Plantation", url: "/images/events/tree-plantation.jpg" },
  { label: "Healthcare Screening", url: "/images/events/healthcare-camp.jpg" },
  { label: "Slum Children Education", url: "/images/events/slum-education.jpg" },
  { label: "Emergency Food Relief", url: "/images/events/food-relief.jpg" },
];

const TODAY_STR = new Date().toISOString().split("T")[0];

function CreateEventForm() {
  const router = useRouter();
  const { data: session } = useSession();

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [eventType, setEventType] = React.useState("Cleanup");
  const [thumbnail, setThumbnail] = React.useState(LOCAL_PRESET_IMAGES[0].url);
  const [location, setLocation] = React.useState("");
  const [eventDate, setEventDate] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("You must be signed in to create an event");
      return;
    }

    if (!title.trim() || !description.trim() || !location.trim() || !thumbnail.trim() || !eventDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Strict Future Date Validation
    if (eventDate < TODAY_STR) {
      toast.error("Event date must be in the future. Past dates cannot be added.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Acquire JWT Token from Backend
      const token = await getBackendToken(
        session.user.email,
        session.user.name || "Organizer"
      );

      if (!token) {
        toast.error("Authentication handshake failed with server. Please try again.");
        setIsSubmitting(false);
        return;
      }

      // 2. Dispatch POST to Express Backend
      const serverUrl = process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";
      const response = await fetch(`${serverUrl}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          eventType,
          thumbnail: thumbnail.trim(),
          location: location.trim(),
          eventDate,
          creatorName: session.user.name || "Community Leader",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create event. Please check inputs.");
        setIsSubmitting(false);
        return;
      }

      // 3. Success SweetAlert2 Dialog (Assignment requirement: No native alerts)
      await Swal.fire({
        title: "Event Published!",
        text: `"${title}" has been successfully created and published for volunteers across Dhaka.`,
        icon: "success",
        confirmButtonColor: "#059669",
        confirmButtonText: "View Upcoming Events",
        customClass: {
          popup: "rounded-2xl dark:bg-zinc-900 dark:text-zinc-100",
        },
      });

      // 4. Redirect to Upcoming Events page (Assignment requirement)
      router.push("/upcoming-events");
      router.refresh();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("An error occurred while creating the event. Check server connectivity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Page Header */}
      <div className="mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Host a Social Initiative</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create Community Event
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Organize a grassroots volunteer drive in your neighborhood. All dates must be in the future.
        </p>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-950/5 p-6 sm:p-8 backdrop-blur-xs">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="event-title"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Event Title
            </label>
            <input
              id="event-title"
              type="text"
              required
              placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Event Type & Event Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Event Type Select */}
            <div>
              <label
                htmlFor="event-type"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Event Type
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  id="event-type"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                >
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Date (Strict Future Date HTML & JS validation) */}
            <div>
              <label
                htmlFor="event-date"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Event Date <span className="text-emerald-600 font-normal">(Future Date Only)</span>
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="event-date"
                  type="date"
                  required
                  min={TODAY_STR} // HTML5 Past Date Prevention
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="event-location"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Location & Neighborhood
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="event-location"
                type="text"
                required
                placeholder="e.g. Dhanmondi Lake Amphitheater, Dhaka"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Thumbnail Image URL & Quick Preset Selector */}
          <div>
            <label
              htmlFor="event-thumbnail"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Thumbnail Image
            </label>
            <div className="space-y-3">
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="event-thumbnail"
                  type="text"
                  required
                  placeholder="/images/events/... or custom image URL"
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Quick Select from Authentic Local Community Photos */}
              <div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Or choose from verified community photos:</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {LOCAL_PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setThumbnail(preset.url)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        thumbnail === preset.url
                          ? "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-semibold"
                          : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="event-description"
              className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Description & Objectives
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
              <textarea
                id="event-description"
                rows={4}
                required
                placeholder="Explain the scope of the drive, equipment needed, and volunteer instructions..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Organizer Info Snapshot */}
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
            Posting as:{" "}
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {session?.user?.name || "Organizer"} ({session?.user?.email})
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Publish Social Event</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <CreateEventForm />
    </ProtectedRoute>
  );
}
