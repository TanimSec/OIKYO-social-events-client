"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { ShieldAlert, Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Guarantees SPA & reload safety:
 * 1. Never redirects to /login while the session check is in-flight (isPending === true).
 * 2. Displays a sleek brand loader during authentication hydration.
 * 3. Preserves target route via callbackUrl query param for seamless post-login return.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    // Only redirect once session verification has definitively resolved
    if (!isPending && !session?.user) {
      const redirectUrl = `/login?callbackUrl=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }
  }, [isPending, session, pathname, router]);

  // Loading state: Keep user on page with clean skeleton (NO redirect on reload)
  if (isPending) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            Verifying Community Credentials
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Checking session integrity with MongoDB Atlas...
          </p>
        </div>
      </div>
    );
  }

  // If unauthenticated after check completes, render safe transitional shell while router transitions
  if (!session?.user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-3">
        <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
          <ShieldAlert className="w-5 h-5" />
        </div>
        <p className="text-xs text-zinc-500">Redirecting to login portal...</p>
      </div>
    );
  }

  // User is confirmed authenticated: Render protected contents
  return <>{children}</>;
}

