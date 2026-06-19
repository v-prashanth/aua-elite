"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useNavbarState } from "@/hooks/useNavbarState";
import { MobileMenu } from "./MobileMenu";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useNavbarState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" }
  ];

  return (
    <>
      <header
        className={cn(
          "fixed z-50 left-0 right-0 top-0 w-full flex items-center justify-between transition-[height,background-color,border-color,box-shadow] duration-300 ease-in-out px-6 sm:px-12",
          state === "landing"
            ? "h-14 sm:h-16 bg-transparent border-b border-transparent shadow-none"
            : "h-12 sm:h-14 glass-nav shadow-[0_2px_10px_rgba(11,35,65,0.02)]"
        )}
        role="navigation"
        aria-label="Global Navigation"
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 group outline-none select-none">
          <div className="relative w-7 h-7 flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-gold-primary transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5"
            >
              <path
                d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                fill="currentColor"
                className="opacity-20"
              />
              <motion.path
                d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <motion.path
                d="M12 18c-2.5 0-4.5-2-4.5-4.5 0-1.5 1-2.5 2-3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  y: [0, -1, 0],
                  scaleY: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs md:text-sm font-semibold tracking-wide text-navy-primary group-hover:text-gold-primary transition-colors duration-300">
              AQUA ELITE
            </span>
            <span className="text-[7px] uppercase tracking-widest text-gold-primary -mt-0.5 font-sans font-bold transition-all duration-300 group-hover:tracking-wider">
              Complete Water Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Links (Interactive Hover Pill & Dot) */}
        <nav 
          className="hidden lg:flex items-center space-x-1.5 relative"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className={cn(
                    "font-sans text-[9px] font-bold uppercase tracking-wider transition-all duration-200 outline-none relative py-1 px-3 focus-visible:text-gold-primary rounded-full select-none",
                    isActive ? "text-gold-primary" : "text-navy-primary/85 hover:text-gold-primary"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {/* Sliding Hover Pill */}
                  {hoveredIndex === idx && (
                    <motion.div
                      layoutId="navHoverPill"
                      className="absolute inset-0 rounded-full z-0 bg-navy-primary/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                    />
                  )}
                  {/* Micro-dot active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-gold-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </AnimatePresence>
        </nav>

        {/* Consultation Button & Hamburger */}
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex text-[9px] font-bold tracking-wider uppercase shadow-none px-4 py-2 min-h-[28px]"
            onClick={() => router.push("/consultation")}
          >
            Book Consultation
          </Button>

          {/* Morphing Hamburger Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full border border-navy-primary/10 text-navy-primary hover:bg-navy-primary/5 transition-colors lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary flex items-center justify-center w-8 h-8"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-overlay"
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center relative">
              <span className={cn(
                "w-4 h-[1.5px] bg-current rounded transition-all duration-300 ease-in-out origin-center",
                isMobileMenuOpen ? "rotate-45 translate-y-[5px]" : ""
              )} />
              <span className={cn(
                "w-4 h-[1.5px] bg-current rounded transition-all duration-300 ease-in-out",
                isMobileMenuOpen ? "opacity-0 scale-x-0" : ""
              )} />
              <span className={cn(
                "w-4 h-[1.5px] bg-current rounded transition-all duration-300 ease-in-out origin-center",
                isMobileMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""
              )} />
            </div>
          </button>
        </div>
      </header>

      {/* Full screen mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            activeItem={pathname}
          />
        )}
      </AnimatePresence>
    </>
  );
};
