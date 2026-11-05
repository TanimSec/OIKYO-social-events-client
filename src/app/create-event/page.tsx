"use client";

import { ProtectedRoute } from "@/components/protected-route";
import { PlusCircle } from "lucide-react";

export default function CreateEventPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Create a Community Event
            </h1>
            <p className="text-sm text-zinc-500">
              Host a new social development drive in your neighborhood.
            </p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

