"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, BadgeIndianRupee, Star, Wrench } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ─── Ribbon items (duplicated for seamless loop) ───────────────────────────────
const RIBBON_ITEMS = [
  { icon: ClipboardCheck, label: "Free Site Inspection"       },
  { icon: BadgeIndianRupee, label: "Competitive Pricing"      },
  { icon: Star,            label: "Expert Recommendation"     },
  { icon: Wrench,          label: "Professional Installation" },
];

// Triple-duplicate so the loop is always visually filled
const TICKER = [...RIBBON_ITEMS, ...RIBBON_ITEMS, ...RIBBON_ITEMS];

// ─── Marquee ribbon ────────────────────────────────────────────────────────────
function FlashRibbon() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 overflow-hidden"
      style={{
        background: "var(--navy-brand)",
        borderTop: "1px solid rgba(201,165,76,0.2)",
      }}
      aria-hidden
    >
      {/* Left fade edge */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "80px",
          background: "linear-gradient(to right, var(--navy-brand), transparent)",
        }}
      />
      {/* Right fade edge */}
      <div
        className="absolute right-0 top-0 bottom-0 z-10 pointer-events-none"
        style={{
          width: "80px",
          background: "linear-gradient(to left, var(--navy-brand), transparent)",
        }}
      />

      {/* Scrolling track */}
      <motion.div
        className="flex items-center"
        style={{ width: "max-content" }}
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {TICKER.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2.5 shrink-0"
              style={{ padding: "10px 28px" }}
            >
              <Icon
                size={11}
                strokeWidth={2}
                style={{ color: "var(--gold-primary)", flexShrink: 0 }}
              />
              <span
                className="font-sans font-semibold uppercase tracking-[0.14em] whitespace-nowrap"
                style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)" }}
              >
                {item.label}
              </span>
              {/* Separator diamond */}
              <span
                className="ml-2"
                style={{
                  width: "3px",
                  height: "3px",
                  borderRadius: "1px",
                  background: "rgba(201,165,76,0.4)",
                  transform: "rotate(45deg)",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

interface HeroProps {
  content?: {
    heading: string;
    subheading: string;
    tagline: string;
    cta_text: string;
    cta_link: string;
  } | null;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section
      className="relative flex flex-col bg-offwhite overflow-hidden"
      style={{ minHeight: "calc(100vh - var(--navbar-h))" }}
      aria-label="Hero Section"
    >
      {/* Radial gold accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 18% 45%, rgba(201,165,76,0.055) 0%, transparent 100%)",
        }}
      />

      {/* Blueprint grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          opacity: 0.018,
        }}
      />

      {/* ── Content wrapper — grows to fill, leaves room for ribbon ── */}
      <div className="relative z-10 flex-1 flex items-center w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 xl:px-16 py-12 sm:py-14 md:py-16 lg:py-10"
        style={{ paddingBottom: "52px" /* ribbon height */ }}
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* ────────────────────────────────────────────
              LEFT — copy + CTAs (no trust items here)
          ──────────────────────────────────────────── */}
          <div className="flex flex-col justify-center text-left">

            {/* Eyebrow */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="block text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.38em] mb-5"
              style={{ color: "var(--gold-primary)" }}
            >
              {content?.tagline || "Aqua Elite Solutions · Hyderabad"}
            </motion.span>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: EASE, delay: 0.08 }}
              className="font-display font-medium tracking-tight text-navy-primary leading-[1.06] mb-5"
              style={{ fontSize: "clamp(2.1rem, 5.2vw, 3.75rem)" }}
            >
              {(() => {
                const heading = content?.heading || "The Right Water Solution — Chosen, Installed & Supported.";
                if (heading.includes("—")) {
                  const parts = heading.split("—");
                  return (
                    <>
                      {parts[0]} —{" "}
                      <br className="hidden sm:block" />
                      <span
                        className="italic font-serif font-normal"
                        style={{ color: "var(--gold-primary)" }}
                      >
                        {parts.slice(1).join("—")}
                      </span>
                    </>
                  );
                }
                return heading;
              })()}
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}
              className="font-sans leading-relaxed text-navy-primary/65 mb-8 max-w-[500px]"
              style={{ fontSize: "clamp(13px, 1.5vw, 15px)" }}
            >
              {content?.subheading || "We visit your property, measure your requirements, and recommend the exact water heating or treatment system — sized correctly, installed properly, and supported long-term."}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: EASE, delay: 0.28 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <Link href={content?.cta_link || "/consultation"}>
                <motion.button
                  whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(201,165,76,0.28)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] w-full sm:w-auto"
                  style={{ background: "var(--gold-primary)", color: "#fff" }}
                >
                  {content?.cta_text || "Book Consultation"}
                  <ArrowRight size={13} strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.22, ease: EASE }}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] border transition-all duration-300 w-full sm:w-auto"
                  style={{
                    border: "1.5px solid var(--navy-primary)",
                    color: "var(--navy-primary)",
                  }}
                >
                  View Products
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* ────────────────────────────────────────────
              RIGHT — hero image
          ──────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
            className="relative w-full order-first md:order-last"
            style={{ height: "clamp(260px, 46vw, 500px)" }}
          >
            {/* Floating wrapper */}
            <motion.div
              className="absolute inset-0"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Image frame */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(201,165,76,0.18)",
                  boxShadow: "0 20px 60px rgba(11,35,65,0.1), 0 2px 8px rgba(11,35,65,0.06)",
                }}
              >
                <Image
                  src="/images/hero_villa.png"
                  alt="Premium residential villa — water heating and treatment installation by Aqua Elite Solutions"
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,35,65,0.2) 0%, rgba(11,35,65,0.03) 40%, transparent 70%)",
                  }}
                />
              </div>
            </motion.div>

            {/* Gold corner accents */}
            <motion.div
              className="absolute -top-px -left-px pointer-events-none"
              style={{
                width: "72px", height: "3px",
                background: "linear-gradient(to right, var(--gold-primary), transparent)",
              }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
            />
            <motion.div
              className="absolute -top-px -left-px pointer-events-none"
              style={{
                width: "3px", height: "72px",
                background: "linear-gradient(to bottom, var(--gold-primary), transparent)",
              }}
              initial={{ scaleY: 0, transformOrigin: "top" }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
            />
          </motion.div>

        </div>
      </div>

      {/* ── Flash ribbon — pinned to bottom of hero ── */}
      <FlashRibbon />
    </section>
  );
};
