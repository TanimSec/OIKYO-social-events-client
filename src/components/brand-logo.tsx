import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function BrandLogo({
  className = "",
  size = "md",
  showTagline = true,
}: BrandLogoProps) {
  const iconDimensions = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  }[size];

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      aria-label="Oikyo Social Development Platform Home"
    >
      {/* Precision Interlocking Unity Emblem SVG */}
      <div
        className={`${iconDimensions} rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 p-2 text-white shadow-md shadow-emerald-950/20 group-hover:shadow-emerald-600/30 group-hover:scale-102 transition-all duration-200 flex items-center justify-center`}
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
          aria-hidden="true"
        >
          {/* Interlocking Unity Nodes: Community Gathering & Solidarity */}
          <circle cx="16" cy="8" r="3" fill="currentColor" fillOpacity="0.95" />
          <circle cx="9" cy="20" r="3" fill="currentColor" fillOpacity="0.95" />
          <circle cx="23" cy="20" r="3" fill="currentColor" fillOpacity="0.95" />
          <path
            d="M16 11V15M16 15L11 18M16 15L21 18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 24C8.5 26.5 12 28 16 28C20 28 23.5 26.5 25.5 24"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />
        </svg>
      </div>

      <div className="flex flex-col">
        <span
          className={`font-black tracking-tight leading-none text-zinc-900 dark:text-zinc-50 ${titleSizes}`}
        >
          Oikyo<span className="text-emerald-600 dark:text-emerald-400">.</span>
        </span>
        {showTagline && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5">
            Social Development
          </span>
        )}
      </div>
    </Link>
  );
}

