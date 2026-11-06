/**
 * API Client Utility
 * Handles communication with the Express backend and manages JWT authentication tokens.
 */

/**
 * Resolves the backend server API URL dynamically.
 * Prioritizes explicit NEXT_PUBLIC_SERVER_API_URL, then live production Vercel backend, then local dev.
 */
export function getServerUrl(): string {
  if (process.env.NEXT_PUBLIC_SERVER_API_URL) {
    return process.env.NEXT_PUBLIC_SERVER_API_URL;
  }
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
  ) {
    return "https://social-events-server-rho.vercel.app";
  }
  return "http://localhost:5000";
}

/**
 * Obtains a signed JWT token from the backend for the authenticated user.
 */
export async function getBackendToken(
  emailOrUser: string | { email: string; name?: string },
  name?: string
): Promise<string | null> {
  try {
    const email =
      typeof emailOrUser === "string" ? emailOrUser : emailOrUser.email;
    const userName =
      typeof emailOrUser === "string" ? name : emailOrUser.name;

    const serverBase = getServerUrl();
    const res = await fetch(`${serverBase}/api/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name: userName }),
    });

    if (res.ok) {
      const data = await res.json();
      return data.token || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to acquire backend JWT token:", error);
    return null;
  }
}

/**
 * Helper to get tomorrow's date formatted as YYYY-MM-DD for HTML input min attributes.
 */
export function getTomorrowOrTodayDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

/**
 * Returns a guaranteed valid local fallback image for any event category.
 */
export function getEventFallbackImage(eventType?: string): string {
  switch (eventType?.toLowerCase()) {
    case "cleanup":
      return "/images/events/lake-cleanup.jpg";
    case "plantation":
      return "/images/events/tree-plantation.jpg";
    case "donation":
      return "/images/events/winter-relief.jpg";
    case "healthcare":
      return "/images/events/healthcare-camp.jpg";
    case "education":
      return "/images/events/slum-education.jpg";
    case "relief":
      return "/images/events/food-relief.jpg";
    default:
      return "/images/events/lake-cleanup.jpg";
  }
}
