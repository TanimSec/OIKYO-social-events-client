"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ProtectedRoute } from "@/components/protected-route";
import { useSession, authClient } from "@/lib/auth-client";
import { getBackendToken, getServerUrl } from "@/lib/api";
import { toast } from "sonner";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Save,
  FolderKanban,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Camera,
} from "lucide-react";

function ProfileHeader() {
  return (
    <div className="space-y-2 mb-8">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold">
        <User className="w-3.5 h-3.5" />
        <span>Volunteer Identity</span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
        My Civic Profile
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
        Manage your volunteer credentials, public avatar, and review your civic community footprint across Dhaka.
      </p>
    </div>
  );
}

interface ProfileStatsProps {
  createdCount: number;
  joinedCount: number;
}

function ProfileStats({ createdCount, joinedCount }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Initiatives Hosted
          </span>
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <FolderKanban className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {createdCount}
          </p>
          <Link
            href="/manage-events"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Manage</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Drives Joined
          </span>
          <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {joinedCount}
          </p>
          <Link
            href="/joined-events"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Roster</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

interface UserIdentityProps {
  name: string;
  email: string;
  image?: string | null;
  createdAt?: string | Date;
}

function UserIdentityCard({ name, email, image, createdAt }: UserIdentityProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "V";

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Active Member";

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-extrabold text-2xl flex items-center justify-center shrink-0 border-2 border-emerald-500/20 shadow-xs">
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              unoptimized={typeof image === "string" && image.startsWith("http")}
              sizes="80px"
              className="object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50 truncate">
              {name || "Civic Contributor"}
            </h2>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              <span>Verified Volunteer</span>
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-400" />
            <span className="truncate">{email}</span>
          </p>

          <p className="text-xs text-zinc-400 flex items-center justify-center sm:justify-start gap-1.5 pt-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Member since {memberSince}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

interface UpdateFormProps {
  initialName: string;
  initialImage: string;
}

function UpdateProfileForm({ initialName, initialImage }: UpdateFormProps) {
  const [name, setName] = React.useState(initialName);
  const [photoURL, setPhotoURL] = React.useState(initialImage);
  const [isUpdating, setIsUpdating] = React.useState(false);

  React.useEffect(() => {
    setName(initialName);
    setPhotoURL(initialImage);
  }, [initialName, initialImage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setIsUpdating(true);
    try {
      const res = await authClient.updateUser({
        name: name.trim(),
        image: photoURL.trim() || undefined,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("An unexpected error occurred while saving profile.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-xs space-y-5">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <Sparkles className="w-4 h-4 text-emerald-500" />
        <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
          Update Profile Information
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            Full Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Tasnim Rahman"
            className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
            <span>Avatar Image URL</span>
            <span className="text-[11px] text-zinc-400 font-normal">Optional</span>
          </label>
          <div className="relative">
            <Camera className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors"
        >
          {isUpdating ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Updating...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

function ProfileContent() {
  const { data: session } = useSession();
  const user = session?.user;

  const [createdCount, setCreatedCount] = React.useState(0);
  const [joinedCount, setJoinedCount] = React.useState(0);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchStats() {
      if (!user?.email) return;
      try {
        const token = await getBackendToken(user.email, user.name);
        if (!token) return;

        const serverUrl = getServerUrl();

        const [manageRes, joinedRes] = await Promise.all([
          fetch(`${serverUrl}/api/manage-events`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }),
          fetch(`${serverUrl}/api/joined-events`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          }),
        ]);

        if (manageRes.ok && isMounted) {
          const data = await manageRes.json();
          setCreatedCount(data.count || 0);
        }
        if (joinedRes.ok && isMounted) {
          const data = await joinedRes.json();
          setJoinedCount(data.count || 0);
        }
      } catch (error) {
        console.error("Error loading user stats:", error);
      }
    }

    fetchStats();
    return () => {
      isMounted = false;
    };
  }, [user?.email, user?.name]);

  if (!user) return null;

  return (
    <div className="space-y-8">
      <ProfileHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UserIdentityCard
            name={user.name || "Volunteer"}
            email={user.email}
            image={user.image}
            createdAt={user.createdAt}
          />

          <UpdateProfileForm
            initialName={user.name || ""}
            initialImage={user.image || ""}
          />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <ProfileStats
            createdCount={createdCount}
            joinedCount={joinedCount}
          />
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <ProfileContent />
      </div>
    </ProtectedRoute>
  );
}
