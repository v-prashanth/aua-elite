"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

/* ─────────────────────────────────────────────
   EASING
───────────────────────────────────────────── */
const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

/* ─────────────────────────────────────────────
   DATA — Real installation photos with honest captions only.
   No invented location names. No invented project names.
───────────────────────────────────────────── */
const GRID_IMAGES = [
  { src: "/images/projects/project-wap-5.jpg",  title: "Residential Villa Installation",    type: "Residential Villa",    col: "1 / 3", row: "1 / 3" },
  { src: "/images/projects/project-wap-12.jpg", title: "Water Heater Installation",          type: "Water Heater",         col: "3 / 4", row: "1 / 2" },
  { src: "/images/projects/project-wap-22.jpg", title: "Commercial Installation",            type: "Commercial",           col: "4 / 5", row: "1 / 2" },
  { src: "/images/projects/project-wap-15.jpg", title: "Residential Installation",           type: "Residential",          col: "3 / 5", row: "2 / 3" },
  { src: "/images/projects/project-wap-18.jpg", title: "Luxury Bathroom Installation",       type: "Luxury Bathroom",      col: "1 / 2", row: "3 / 4" },
  { src: "/images/projects/ZB1.jpg",            title: "Water Softener Installation",        type: "Water Softener",       col: "2 / 4", row: "3 / 4" },
  { src: "/images/projects/project-wap-10.jpg", title: "Hotel Installation",                 type: "Hotel",                col: "4 / 5", row: "3 / 5" },
  { src: "/images/projects/project-wap-8.jpg",  title: "Apartment Installation",             type: "Apartment",            col: "1 / 3", row: "4 / 5" },
  { src: "/images/projects/ZB3.jpg",            title: "Water Treatment Installation",       type: "Water Treatment",      col: "3 / 4", row: "4 / 5" },
  { src: "/images/projects/project-wap-20.jpg", title: "Residential Villa Installation",     type: "Residential Villa",    col: "1 / 2", row: "5 / 6" },
  { src: "/images/projects/project-wap-4.jpg",  title: "Commercial Office Installation",     type: "Commercial Office",    col: "2 / 4", row: "5 / 6" },
  { src: "/images/projects/project-wap-9.jpg",  title: "Luxury Apartment Installation",      type: "Luxury Apartment",     col: "4 / 5", row: "5 / 6" },
];

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
type SlideItem = { src: string; title: string; type: string };

function Lightbox({
  slide, index, total, onClose, onPrev, onNext,
}: {
  slide: SlideItem; index: number; total: number;
  onClose: () => void; onPrev: () => void; onNext: () => void;
}) {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   onPrev();
      if (e.key === "ArrowRight")  onNext();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: E }}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      style={{ background: "rgba(5,10,20,0.96)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: E }}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col items-center"
        style={{ maxWidth: "min(90vw, 1100px)", maxHeight: "90vh", width: "100%" }}
      >
        <div
          className="relative w-full overflow-hidden rounded-lg"
          style={{ aspectRatio: "3/2", maxHeight: "75vh", boxShadow: "0 40px 100px rgba(0,0,0,0.8)", border: "1px solid rgba(201,165,76,0.15)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.38, ease: E }}
              className="absolute inset-0"
            >
              <Image src={slide.src} alt={slide.title} fill className="object-contain" sizes="90vw" priority />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={slide.type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: E }}
            className="flex items-center justify-between w-full mt-4 px-1"
          >
            <div>
              <p className="font-display font-medium text-white" style={{ fontSize: "clamp(14px, 2vw, 20px)" }}>{slide.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--gold-primary)" }}>{slide.type}</span>
              </div>
            </div>
            <p className="font-display text-white/20" style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}>
              {String(index + 1).padStart(2, "0")}
              <span className="text-[10px] font-sans ml-1" style={{ color: "rgba(255,255,255,0.15)" }}>/ {String(total).padStart(2, "0")}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Prev / Next */}
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Previous">
        <ChevronLeft size={18} className="text-white" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Next">
        <ChevronRightIcon size={18} className="text-white" />
      </button>

      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }} aria-label="Close lightbox">
        <X size={16} className="text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,165,76,0.4), transparent)" }} />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-navy-dark text-white relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,165,76,0.45), transparent)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: E, delay: 0.5 }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
          <div className="pt-1">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold mb-4" style={{ color: "var(--gold-primary)" }}>
              Our Work
            </p>
            <h1 className="font-display font-medium leading-[1.1] tracking-tight text-white"
              style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              Real installations,<br />
              across Hyderabad.
            </h1>
          </div>
          <div className="flex flex-col justify-center space-y-5 text-[13px] sm:text-[14px] leading-[1.9] font-sans" style={{ color: "rgba(255,255,255,0.5)" }}>
            <p>
              Every photograph on this page is a completed installation carried out by our
              experienced installation specialists — villas, apartments, hotels, and commercial spaces.
            </p>
            <p className="text-white/70 font-medium">
              We visit your property, recommend the right system, install it properly, and stay available long after.
            </p>
          </div>
        </div>
      </div>

      {/* Clip-path ramp into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────
   GRID CELL
───────────────────────────────────────────── */
function GridCell({ item, index, onOpen }: { item: typeof GRID_IMAGES[number]; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: E, delay: (index % 4) * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onOpen}
      className="relative overflow-hidden cursor-pointer rounded-2xl border border-navy-primary/10 bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-500 group"
      style={{
        gridColumn: isDesktop ? item.col : "auto",
        gridRow: isDesktop ? item.row : "auto",
        height: isDesktop ? "auto" : "280px",
      }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.8, ease: E }}
      >
        <Image
          src={item.src} alt={item.title} fill className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(11,35,65,0.92) 0%, rgba(11,35,65,0.3) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.75,
        }}
      />

      {/* Gold top sweep */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{ background: "var(--gold-primary)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: E }}
      />

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <motion.div
          animate={{ y: hovered ? -6 : 0 }}
          transition={{ duration: 0.4, ease: E }}
          className="flex flex-col gap-2"
        >
          <p className="font-display font-medium text-white leading-none tracking-wide" style={{ fontSize: "clamp(13px, 1.5vw, 17px)" }}>
            {item.title}
          </p>
          <div className="flex">
            <span
              className="text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border border-gold-primary/30"
              style={{
                background: "rgba(201,165,76,0.12)",
                color: "var(--gold-primary)",
                backdropFilter: "blur(4px)"
              }}
            >
              {item.type}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Expand icon */}
      <motion.div
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-white/10 shadow-lg"
        style={{ background: "rgba(201,165,76,0.95)" }}
        initial={{ opacity: 0, scale: 0.6, y: -4 }}
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6, y: hovered ? 0 : -4 }}
        transition={{ duration: 0.3, ease: E }}
      >
        <ArrowUpRight size={14} className="text-white" strokeWidth={2.5} />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PHOTO GRID
───────────────────────────────────────────── */
function PhotoGrid() {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const close = () => setLightboxIndex(null);
  const prev  = () => setLightboxIndex((p) => p === null ? null : (p - 1 + GRID_IMAGES.length) % GRID_IMAGES.length);
  const next  = () => setLightboxIndex((p) => p === null ? null : (p + 1) % GRID_IMAGES.length);

  return (
    <section
      aria-label="Installation Gallery"
      style={{
        background: "var(--offwhite)",
        paddingTop: "clamp(56px, 7vw, 96px)",
        paddingBottom: "clamp(56px, 7vw, 96px)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: E }}
          className="mb-10"
        >
          <p className="text-[9px] uppercase tracking-[0.28em] font-bold mb-3" style={{ color: "var(--gold-primary)" }}>
            Happy Customers
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-display font-medium tracking-tight leading-tight"
              style={{ fontSize: "clamp(22px, 3.5vw, 38px)", color: "var(--navy-primary)" }}
            >
              Completed Installations
            </h2>
            <p
              className="font-sans leading-relaxed max-w-xs"
              style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "var(--silver)" }}
            >
              Click any image to view full size.
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="mb-10 h-px"
          style={{ background: "rgba(11,35,65,0.08)" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: E }}
        />

        {/* Asymmetric collage grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ gridAutoRows: "clamp(240px, 20vw, 340px)" }}
        >
          {GRID_IMAGES.map((item, i) => (
            <GridCell key={i} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>

        {/* Trust statement — per brief */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: E, delay: 0.2 }}
          className="mt-16 text-center font-sans text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto"
          style={{ color: "var(--silver)" }}
        >
          Our installation specialists have completed installations for homes, villas, apartments, commercial spaces, hotels, and offices.
        </motion.p>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            slide={GRID_IMAGES[lightboxIndex]}
            index={lightboxIndex}
            total={GRID_IMAGES.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CTA STRIP
───────────────────────────────────────────── */
function CTAStrip() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--navy-brand)",
        paddingTop: "clamp(48px, 6vw, 80px)",
        paddingBottom: "clamp(48px, 6vw, 80px)",
      }}
    >
      <div className="absolute pointer-events-none"
        style={{ right: "-5%", top: "-50%", width: "40%", height: "200%",
          background: "radial-gradient(ellipse, rgba(201,165,76,0.1) 0%, transparent 70%)" }} />

      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,165,76,0.5), transparent)" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: E }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold-primary)" }}>
              Start Your Project
            </p>
            <h2 className="font-display font-medium text-white leading-tight"
              style={{ fontSize: "clamp(20px, 3vw, 36px)", maxWidth: "420px" }}>
              Book a free site assessment.
            </h2>
            <p className="mt-3 font-sans leading-relaxed"
              style={{ fontSize: "clamp(11px, 1.3vw, 13px)", color: "rgba(255,255,255,0.4)", maxWidth: "360px" }}>
              Our specialists visit, assess your property, and recommend the right system — before you commit to anything.
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.22em] transition-all duration-300 group"
              style={{ background: "var(--gold-primary)", color: "#fff" }}
            >
              Book a Free Assessment
              <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.22em] transition-colors duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.45)" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProjectsPage() {
  return (
    <div className="font-sans overflow-x-hidden">
      <HeroSection />
      <PhotoGrid />
      <CTAStrip />
    </div>
  );
}
