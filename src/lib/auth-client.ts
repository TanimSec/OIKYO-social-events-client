import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const getClientBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (
    process.env.NEXT_PUBLIC_APP_URL &&
    !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")
  ) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  return "https://oikyo-social-events-client.vercel.app";
};

export const authClient = createAuthClient({
  baseURL: getClientBaseUrl(),
  plugins: [jwtClient()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

