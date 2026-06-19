"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = React.useState<"light" | "dark" | null>(null);

  React.useEffect(() => {
    // Read from localStorage or default matches
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  if (theme === null) return null; // Avoid hydration flash

  return (
    <div className="fixed bottom-6 left-6 z-40 select-none">
      <motion.button
        onClick={toggleTheme}
        className={cn(
          "glass-cta rounded-full flex items-center space-x-2.5 px-4 py-2.5 border border-gold-primary/30",
          "shadow-floating text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 hover:border-gold-primary/60"
        )}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative w-4 h-4 flex items-center justify-center text-gold-primary">
          <motion.div
            initial={false}
            animate={{ rotate: theme === "light" ? 0 : 180, scale: theme === "light" ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sun size={14} />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ rotate: theme === "light" ? -180 : 0, scale: theme === "light" ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Moon size={14} />
          </motion.div>
        </div>
        <span className="text-navy-primary font-sans leading-none font-bold">
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </span>
      </motion.button>
    </div>
  );
};
