"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[MarketingError]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-offwhite dark:bg-[#03050c] flex items-center justify-center px-6 py-24">
      {/* Background grid */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-lg text-center">
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-primary block mb-6">
          Aqua Elite Solutions
        </span>

        <p
          className="font-display font-medium text-navy-primary/[0.06] dark:text-white/[0.04] select-none leading-none mb-6"
          style={{ fontSize: "clamp(5rem, 18vw, 9rem)" }}
          aria-hidden
        >
          Oops
        </p>

        <h1 className="font-display font-medium text-2xl sm:text-3xl text-navy-primary dark:text-white tracking-tight mb-4 -mt-4">
          Something Went Wrong
        </h1>

        <p className="text-sm text-silver dark:text-white/50 font-sans leading-relaxed mb-10 max-w-sm mx-auto">
          An unexpected error occurred on this page. Please try refreshing or
          navigate back to continue.
        </p>

        <div className="w-12 h-[2px] bg-gold-primary/40 mx-auto mb-10 rounded-full" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold-primary text-navy-brand hover:bg-navy-primary hover:text-white transition-colors duration-300 w-full sm:w-auto"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border border-navy-primary/20 dark:border-white/15 text-navy-primary dark:text-white hover:border-gold-primary hover:text-gold-primary transition-colors duration-300 w-full sm:w-auto"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
