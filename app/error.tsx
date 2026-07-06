"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console in dev; swap for Sentry/Datadog in production
    console.error("[GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col justify-center items-center bg-[#F7F8FA] text-[#0B2341] font-sans px-6 py-24 text-center">
        <div className="max-w-md">
          <span
            className="block font-bold uppercase tracking-[0.4em] mb-6"
            style={{ fontSize: "9px", color: "#C9A54C" }}
          >
            Aqua Elite Solutions
          </span>
          <p
            aria-hidden
            className="select-none leading-none mb-6"
            style={{
              fontSize: "clamp(5rem, 18vw, 10rem)",
              fontWeight: 500,
              color: "rgba(11,35,65,0.06)",
              fontFamily: "serif",
            }}
          >
            500
          </p>
          <h1
            className="font-medium tracking-tight mb-4 -mt-6"
            style={{ fontSize: "clamp(1.4rem, 4vw, 2rem)" }}
          >
            Something Went Wrong
          </h1>
          <p
            className="leading-relaxed mb-10 max-w-sm mx-auto"
            style={{ fontSize: "14px", color: "#8A94A6" }}
          >
            An unexpected error occurred. Our team has been notified. Please
            try again or contact us if the issue persists.
          </p>
          <div
            className="mx-auto mb-10 rounded-full"
            style={{
              width: "48px",
              height: "2px",
              background: "rgba(201,165,76,0.4)",
            }}
          />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold uppercase w-full sm:w-auto transition-colors duration-300"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                background: "#C9A54C",
                color: "#0B2341",
              }}
            >
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold uppercase w-full sm:w-auto transition-colors duration-300"
              style={{
                fontSize: "10px",
                letterSpacing: "0.18em",
                border: "1.5px solid rgba(11,35,65,0.2)",
                color: "#0B2341",
              }}
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
