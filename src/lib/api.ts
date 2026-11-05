/**
 * API Client Utility
 * Handles communication with the Express backend and manages JWT authentication tokens.
 */

const SERVER_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_API_URL || "http://localhost:5000";

/**
 * Obtains a signed JWT token from the backend for the authenticated user.
 */
export async function getBackendToken(
  email: string,
  name?: string
): Promise<string | null> {
  try {
    const res = await fetch(`${SERVER_BASE_URL}/api/jwt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
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
 * Helper to get the today's date formatted as YYYY-MM-DD for HTML input min attributes.
 */
export function getTomorrowOrTodayDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

