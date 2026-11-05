"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  LogIn,
} from "lucide-react";

interface SocialLoginsProps {
  isLoading: boolean;
  socialLoading: string | null;
  onLogin: (provider: "google" | "github") => void;
}

function SocialLogins({ isLoading, socialLoading, onLogin }: SocialLoginsProps) {
  const providers = [
    {
      id: "google" as const,
      name: "Google",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      ),
    },
    {
      id: "github" as const,
      name: "GitHub",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {providers.map((p) => {
        const isCurrentLoading = socialLoading === p.id;
        return (
          <button
            key={p.id}
            type="button"
            onClick={() => onLogin(p.id)}
            disabled={socialLoading !== null || isLoading}
            className="w-full py-2.5 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-60 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {isCurrentLoading ? (
              <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              p.icon
            )}
            <span>{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn.email({
        email: email.trim().toLowerCase(),
        password,
        fetchOptions: {
          onError: (ctx) => {
            const errorMsg = ctx.error.message || "Invalid email or password";
            toast.error(errorMsg);
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Invalid credentials. Please verify your email and password.");
        setIsLoading(false);
        return;
      }

      await Swal.fire({
        title: "Welcome Back!",
        text: "You have signed in successfully. Happy volunteering!",
        icon: "success",
        confirmButtonColor: "#059669",
        timer: 1800,
        showConfirmButton: false,
        customClass: {
          popup: "rounded-2xl dark:bg-zinc-900 dark:text-zinc-100",
        },
      });

      router.push(callbackUrl);
      router.refresh();
    } catch (error) {
      console.error("Login attempt error:", error);
      toast.error("An unexpected error occurred. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);
    try {
      await signIn.social({
        provider,
        callbackURL: callbackUrl,
      });
    } catch (error) {
      console.error(`${provider} OAuth authentication error:`, error);
      toast.error(`Failed to initiate ${provider} sign-in.`);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-2 shadow-xs">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Sign in to manage your events and coordinate volunteer activities across Dhaka.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xl shadow-zinc-950/5 p-6 sm:p-8 backdrop-blur-xs space-y-6">
          <SocialLogins
            isLoading={isLoading}
            socialLoading={socialLoading}
            onLogin={handleSocialLogin}
          />

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
            <span className="bg-white dark:bg-zinc-900 px-3 text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold absolute">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-email"
                  type="email"
                  required
                  placeholder="volunteer@dhaka.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="login-password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Don&apos;t have an account yet?{" "}
            <Link
              href="/register"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
