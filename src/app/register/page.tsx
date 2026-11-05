"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Lock,
  ImageIcon,
  Eye,
  EyeOff,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Real-time password criteria verification
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter your full name");
      return;
    }

    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please provide a valid email address");
      return;
    }

    // Strict Assignment Password Validation
    if (!hasUppercase) {
      toast.error("Password must contain at least one uppercase letter (A-Z)");
      return;
    }
    if (!hasLowercase) {
      toast.error("Password must contain at least one lowercase letter (a-z)");
      return;
    }
    if (!hasMinLength) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp.email({
        email: email.trim().toLowerCase(),
        password,
        name: name.trim(),
        image: photoURL.trim() || undefined,
        fetchOptions: {
          onError: (ctx) => {
            const errorMsg = ctx.error.message || "Registration failed";
            toast.error(errorMsg);
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Registration failed. Email may already exist.");
        setIsLoading(false);
        return;
      }

      // Professional SweetAlert2 feedback (Assignment requirement: No native alert)
      await Swal.fire({
        title: "Registration Successful!",
        text: `Welcome to Oikyo, ${name}! Your community organizer account is now active.`,
        icon: "success",
        confirmButtonColor: "#059669",
        confirmButtonText: "Get Started",
        customClass: {
          popup: "rounded-2xl dark:bg-zinc-900 dark:text-zinc-100",
        },
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An unexpected error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 mb-2 shadow-xs">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Join the Community
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create your account to organize and volunteer for social service drives in Dhaka.
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-xl shadow-zinc-950/5 p-6 sm:p-8 backdrop-blur-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="e.g. Tanvir Hossain"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="volunteer@dhaka.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Photo URL */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Photo URL <span className="text-zinc-400 font-normal lowercase">(optional)</span>
              </label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="photoURL"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
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

              {/* Real-time Password Validation Checklist */}
              {password.length > 0 && (
                <div className="mt-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5 text-xs">
                  <div className={`flex items-center gap-2 ${hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-zinc-500"}`}>
                    {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>At least 1 uppercase letter (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-zinc-500"}`}>
                    {hasLowercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>At least 1 lowercase letter (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-2 ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-medium" : "text-zinc-500"}`}>
                    {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5 text-zinc-400" />}
                    <span>At least 6 characters long</span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || (password.length > 0 && !isPasswordValid)}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-60 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Volunteer Account</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link to Login */}
          <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 text-center text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
