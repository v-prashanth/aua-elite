"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileMenuProps {
  onClose: () => void;
  activeItem: string | null;
}

const backdropVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.3 } }
};

const panelVariants = {
  closed: { 
    clipPath: "circle(0% at 92% 4%)",
    opacity: 0.9,
    transition: {
      type: "tween" as const,
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1] as const
    }
  },
  open: { 
    clipPath: "circle(150% at 92% 4%)",
    opacity: 1,
    transition: {
      type: "tween" as const,
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  closed: { opacity: 0, y: 15 },
  open: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: "spring" as const, 
      stiffness: 130, 
      damping: 16 
    } 
  }
};

export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, activeItem }) => {
  const menuRef = React.useRef<HTMLDivElement>(null);

  // 1. ESC key listener & Focus trapping
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        } else if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Auto-focus first link in list
    if (menuRef.current) {
      const focusable = menuRef.current.querySelector("a");
      if (focusable) {
        (focusable as HTMLElement).focus();
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // 2. Lock body scroll on mount, restore on unmount
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const navLinks = [
    { label: "Solutions", href: "/solutions" },
    { label: "Products", href: "/products" },
    { label: "Projects", href: "/projects" },
    { label: "About", href: "/about" }
  ];

  return (
    <motion.div
      variants={backdropVariants}
      initial="closed"
      animate="open"
      exit="closed"
      className="fixed inset-0 z-50 bg-navy-primary/30 backdrop-blur-md lg:hidden"
      onClick={onClose}
    >
      <motion.div
        variants={panelVariants}
        className="w-full bg-purewhite border-b border-gold-muted/20 shadow-raised flex flex-col pt-6 pb-8 px-6 outline-none"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner panel
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation Menu"
        tabIndex={-1}
      >
        {/* Top bar header inside panel */}
        <div className="flex items-center justify-between pb-6 border-b border-navy-primary/5">
          <div className="flex flex-col">
            <span className="font-display text-base font-semibold tracking-wide text-navy-primary">
              AQUA ELITE
            </span>
            <span className="text-[8px] uppercase tracking-widest text-gold-primary -mt-1 font-sans">
              Complete Water Solutions
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 border border-navy-primary/10 rounded-full hover:bg-navy-primary/5 transition-colors focus-visible:ring-2 focus-visible:ring-gold-primary outline-none"
            aria-label="Close menu"
          >
            <X size={18} className="text-navy-primary" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex flex-col space-y-4 py-8">
          {navLinks.map((link) => {
            const isActive = activeItem === link.href || activeItem?.startsWith(link.href + "/");
            return (
              <motion.div key={link.href} variants={itemVariants}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={`flex items-center justify-between py-2 border-b border-navy-primary/5 font-display text-lg tracking-wide transition-colors outline-none focus-visible:text-gold-primary ${
                    isActive ? "text-gold-primary font-medium" : "text-navy-primary hover:text-gold-primary"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className={isActive ? "text-gold-primary" : "text-navy-primary/40"} />
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Footer info stack */}
        <motion.div variants={itemVariants} className="space-y-6 pt-4 border-t border-navy-primary/5">
          <Link href="/consultation" onClick={onClose} className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center text-[10px] uppercase tracking-wider font-bold"
            >
              Book Consultation
            </Button>
          </Link>
          
          <div className="text-center space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-navy-primary/60 font-bold font-sans">
              Authorized Stiebel Eltron Dealer &mdash; Hyderabad
            </div>
            <div className="text-[9px] text-navy-primary/45">
              Jubilee Hills Road No. 36 &bull; +91 98490 12345
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
