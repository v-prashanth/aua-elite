"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const SunIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = ({ size, className }: { size: number; className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [mounted, setMounted] = React.useState(false);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (!stored && prefersDark);
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  // Render a placeholder of same size during SSR/hydration to avoid layout shift
  if (!mounted) {
    return <div className="w-[44px] h-[24px] rounded-full bg-navy-primary/10 flex-shrink-0" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={cn(
        "relative flex-shrink-0 flex items-center w-[44px] h-[24px] rounded-full p-[3px]",
        "transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2",
        isDark
          ? "bg-navy-primary/80 dark:bg-navy-dark"
          : "bg-navy-primary/15",
        className
      )}
    >
      {/* Track label icons */}
      <span className="absolute left-[6px] flex items-center justify-center text-gold-primary/80 pointer-events-none">
        <SunIcon size={10} />
      </span>
      <span className="absolute right-[6px] flex items-center justify-center text-silver pointer-events-none">
        <MoonIcon size={9} />
      </span>

      {/* Sliding thumb */}
      <span
        className={cn(
          "absolute top-[3px] w-[18px] h-[18px] rounded-full shadow-sm flex items-center justify-center flex-shrink-0",
          "transition-[left,background-color] duration-300 ease-out",
          isDark
            ? "bg-gold-primary left-[23px]"
            : "bg-white left-[3px]"
        )}
      >
        {isDark ? (
          <MoonIcon size={9} className="text-[#0B2341]" />
        ) : (
          <SunIcon size={9} className="text-gold-primary" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
