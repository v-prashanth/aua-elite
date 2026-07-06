import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-offwhite dark:bg-[#03050c] flex flex-col items-center justify-center px-6 py-24 text-center">
      {/* Background grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-lg">
        {/* Eyebrow */}
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-primary block mb-6">
          Aqua Elite Solutions
        </span>

        {/* Error code */}
        <p
          className="font-display font-medium text-navy-primary/10 dark:text-white/5 select-none leading-none mb-6"
          style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
          aria-hidden
        >
          404
        </p>

        {/* Heading */}
        <h1 className="font-display font-medium text-2xl sm:text-3xl text-navy-primary dark:text-white tracking-tight mb-4 -mt-8">
          Page Not Found
        </h1>

        {/* Body */}
        <p className="text-sm text-silver dark:text-white/50 font-sans leading-relaxed mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let us help you find what you need.
        </p>

        {/* Gold divider */}
        <div className="w-12 h-[2px] bg-gold-primary/40 mx-auto mb-10 rounded-full" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] bg-gold-primary text-navy-brand hover:bg-navy-primary hover:text-white transition-colors duration-300 w-full sm:w-auto"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] border border-navy-primary/20 dark:border-white/15 text-navy-primary dark:text-white hover:border-gold-primary hover:text-gold-primary transition-colors duration-300 w-full sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
