"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  PlusCircle,
  FolderKanban,
  CheckCircle2,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { toast } from "sonner";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/upcoming-events", label: "Upcoming Events" },
];

const AUTH_DROPDOWN_LINKS = [
  {
    href: "/create-event",
    label: "Create Event",
    icon: PlusCircle,
    description: "Organize a new community drive",
  },
  {
    href: "/manage-events",
    label: "Manage Events",
    icon: FolderKanban,
    description: "Update or review your events",
  },
  {
    href: "/joined-events",
    label: "Joined Events",
    icon: CheckCircle2,
    description: "Drives you volunteered for",
  },
  {
    href: "/profile",
    label: "My Profile",
    icon: User,
    description: "Manage avatar & personal info",
  },
];

function NavBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 group focus:outline-none"
    >
      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-emerald-600/30 group-hover:bg-emerald-500 transition-colors">
        ঐ
      </div>
      <div className="flex flex-col">
        <span className="font-extrabold text-xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
          Oikyo
        </span>
        <span className="text-[10px] uppercase font-semibold tracking-widest text-emerald-600 dark:text-emerald-400 leading-tight">
          Community Action
        </span>
      </div>
    </Link>
  );
}

function UserDropdownMenu({
  user,
  onLogout,
}: {
  user: { name?: string | null; email?: string | null; image?: string | null; photoURL?: string | null };
  onLogout: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const avatarUrl = user.image || user.photoURL;
  const initial = user.name ? user.name.charAt(0).toUpperCase() : "U";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-1 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={user.name || user.email || "My Profile"}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={user.name || "User Avatar"}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold text-sm flex items-center justify-center">
            {initial}
          </div>
        )}
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400 mr-1 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-900/10 dark:shadow-black/40 py-2 z-50">
          <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Signed in as
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {user.name || "Community Volunteer"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-1">
            {AUTH_DROPDOWN_LINKS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-start gap-3 px-4 py-2.5 text-sm transition-colors ${
                    isActive
                      ? "bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <Icon className="w-4 h-4 mt-0.5 text-zinc-500 dark:text-zinc-400" />
                  <div>
                    <p className="font-medium leading-none">{item.label}</p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                      {item.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="pt-1 mt-1 border-t border-zinc-100 dark:border-zinc-800/80 sm:hidden">
            <button
              type="button"
              onClick={onLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileMenu({
  isOpen,
  pathname,
  user,
}: {
  isOpen: boolean;
  pathname: string;
  user?: { name?: string | null } | null;
}) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg px-4 pt-3 pb-5 space-y-1">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`block px-3 py-2 rounded-lg text-base font-medium ${
            pathname === link.href
              ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold"
              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          {link.label}
        </Link>
      ))}
      {user && (
        <div className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
          <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Organizer Menu
          </p>
          {AUTH_DROPDOWN_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout execution failed:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <NavBrand />

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-zinc-100 dark:bg-zinc-800/80 text-emerald-600 dark:text-emerald-400 font-semibold"
                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <UserDropdownMenu user={user} onLogout={handleLogout} />
              <button
                type="button"
                onClick={handleLogout}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900/60 transition-colors"
                title="Log out of your account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <MobileMenu isOpen={isMobileOpen} pathname={pathname} user={user} />
    </header>
  );
}
