import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.DB_NAME || "socialEventsDB";

const client = new MongoClient(uri);
const db = client.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "social_development_events_better_auth_secret_2026",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Per assignment rules: do not enforce email verification
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!process.env.GOOGLE_CLIENT_ID,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: !!process.env.GITHUB_CLIENT_ID,
    },
  },
  plugins: [
    jwt({
      jwt: {
        expirationTime: "7d",
      },
    }),
  ],
  user: {
    additionalFields: {
      photoURL: {
        type: "string",
        required: false,
        defaultValue: "",
      },
    },
  },
});

