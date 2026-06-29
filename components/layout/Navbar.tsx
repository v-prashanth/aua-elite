"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { label: "Solutions", href: "/products" },
  { label: "Our Work", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Track scroll + screen size (pill only on desktop)
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    onScroll();
    onResize();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Lock scroll on mobile menu open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape key to close
  React.useEffect(() => {
    if (!mobileOpen) return;
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [mobileOpen]);

  React.useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      {/* ── Wrapper — sticky, full-width, transparent background ─────── */}
      <div className="sticky top-0 z-50 w-full flex justify-center pointer-events-none">
        <motion.header
          layout
          role="banner"
          // Pill effect ONLY on desktop; mobile stays full-width flat
          animate={scrolled && isDesktop ? "scrolled" : "top"}
          variants={{
            top: {
              width: "100%",
              marginTop: 0,
              borderRadius: 0,
              paddingLeft: 0,
              paddingRight: 0,
              boxShadow: "none",
            },
            scrolled: {
              width: "calc(100% - 48px)",
              marginTop: 16,
              borderRadius: 9999,
              paddingLeft: 8,
              paddingRight: 8,
              boxShadow: "0 8px 32px -4px rgba(11,35,65,0.14), 0 2px 8px -2px rgba(11,35,65,0.08)",
            },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className={cn(
            "pointer-events-auto overflow-hidden",
            "transition-colors duration-300",
            scrolled
              ? "bg-white/90 dark:bg-[#0E0F13]/90 backdrop-blur-2xl border border-navy-primary/8 dark:border-white/8"
              : "bg-white/80 dark:bg-[#0E0F13]/80 backdrop-blur-md border-b border-navy-primary/6 dark:border-white/6"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300",
              "px-6 lg:px-10",
              scrolled ? "h-[60px] lg:h-[68px]" : "h-[72px] lg:h-[84px]"
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Aqua Elite Solutions — Home"
              className="flex-shrink-0 group outline-none"
            >
              <motion.div animate={scrolled ? { scale: 0.95 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <span className="font-display font-semibold tracking-[0.18em] uppercase text-[13px] sm:text-[14px] block transition-colors duration-300 text-navy-primary dark:text-white group-hover:text-gold-primary">
                  Aqua Elite
                </span>
                <span className="block text-[7px] tracking-[0.22em] uppercase font-sans font-medium text-silver mt-[2px] transition-colors duration-300 whitespace-nowrap">
                  Water Heating & Treatment
                </span>
              </motion.div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-10 xl:gap-14" aria-label="Primary navigation">
              {NAV_LINKS.map(({ label, href }) => {
                const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "relative text-[10px] xl:text-[11px] font-sans font-bold uppercase tracking-[0.2em] transition-colors duration-300 outline-none group py-1",
                      isActive
                        ? "text-navy-primary dark:text-white"
                        : "text-navy-primary/45 dark:text-white/45 hover:text-navy-primary dark:hover:text-white"
                    )}
                  >
                    {label}
                    {/* Active gold dot */}
                    <motion.span
                      initial={false}
                      animate={isActive ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gold-primary origin-left rounded-full"
                    />
                    {/* Hover preview line */}
                    {!isActive && (
                      <span className="absolute -bottom-0.5 left-0 right-0 h-[1px] bg-navy-primary/20 dark:bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side — toggle + CTA + hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Dark/Light toggle */}
              <ThemeToggle />

              {/* Book CTA — desktop */}
              <Link href="/consultation" className="hidden sm:block">
                <motion.button
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  animate={{ scale: scrolled ? 0.92 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.16em] bg-gold-primary text-navy-brand hover:bg-navy-primary hover:text-white dark:hover:bg-white dark:hover:text-navy-primary transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold-primary whitespace-nowrap px-6 py-2.5"
                >
                  Book Consultation
                </motion.button>
              </Link>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                className="flex lg:hidden items-center justify-center w-11 h-11 rounded-full text-navy-primary/60 dark:text-white/60 hover:text-navy-primary dark:hover:text-white hover:bg-navy-primary/5 dark:hover:bg-white/5 transition-all duration-200 -mr-2"
              >
                <Menu size={20} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </motion.header>
      </div>

      {/* ── Mobile Fullscreen Drawer ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer slides in from right */}
            <motion.div
              key="drawer"
              ref={menuRef}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-[340px] bg-white dark:bg-[#0E0F13] flex flex-col shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-navy-primary/5 dark:border-white/5">
                <div className="flex flex-col">
                  <span className="font-display font-semibold tracking-[0.18em] uppercase text-[13px] text-navy-primary dark:text-white">
                    Aqua Elite
                  </span>
                  <span className="text-[7px] tracking-[0.22em] uppercase font-sans font-medium text-silver mt-[1px]">
                    Water Heating & Treatment
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close navigation"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-navy-primary/40 dark:text-white/40 hover:text-navy-primary dark:hover:text-white hover:bg-navy-primary/5 dark:hover:bg-white/5 transition-all -mr-2"
                >
                  <X size={20} strokeWidth={1.75} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-grow flex flex-col justify-center px-8">
                <div className="space-y-0">
                  {NAV_LINKS.map(({ label, href }, i) => {
                    const isActive = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
                    return (
                      <motion.div
                        key={href}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07, type: "spring", stiffness: 300, damping: 28 }}
                      >
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={cn(
                            "block py-5 font-sans text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] border-b border-navy-primary/6 dark:border-white/6 transition-colors duration-200",
                            isActive
                              ? "text-gold-primary"
                              : "text-navy-primary/65 dark:text-white/65 hover:text-navy-primary dark:hover:text-white"
                          )}
                        >
                          {label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom panel */}
              <div className="px-8 pb-10 space-y-4">
                <div className="flex items-center justify-between py-4 border-t border-navy-primary/6 dark:border-white/6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-silver font-bold">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>
                <button
                  onClick={() => { setMobileOpen(false); router.push("/consultation"); }}
                  className="w-full py-4 rounded-full bg-gold-primary text-navy-primary text-[10px] font-sans font-bold uppercase tracking-[0.18em] hover:bg-navy-primary hover:text-white transition-colors duration-300"
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
