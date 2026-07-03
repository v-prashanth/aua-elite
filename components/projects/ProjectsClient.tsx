"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight, X, ChevronLeft, ChevronRight as ChevronRightIcon, MessageCircle } from "lucide-react";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

type SlideItem = { src: string; title: string; type: string; col?: string; row?: string };

const GRID_LAYOUTS = [
  { col: "1 / 3", row: "1 / 3" },
  { col: "3 / 4", row: "1 / 2" },
  { col: "4 / 5", row: "1 / 2" },
  { col: "3 / 5", row: "2 / 3" },
  { col: "1 / 2", row: "3 / 4" },
  { col: "2 / 4", row: "3 / 4" },
  { col: "4 / 5", row: "3 / 5" },
  { col: "1 / 3", row: "4 / 5" },
  { col: "3 / 4", row: "4 / 5" },
  { col: "1 / 2", row: "5 / 6" },
  { col: "2 / 4", row: "5 / 6" },
  { col: "4 / 5", row: "5 / 6" },
];

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
            className="flex flex-col sm:flex-row sm:items-center justify-between w-full mt-4 px-1 gap-4 text-left"
          >
            <div>
              <p className="font-display font-medium text-white" style={{ fontSize: "clamp(14px, 2vw, 20px)" }}>{slide.title}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "var(--gold-primary)" }}>{slide.type}</span>
              </div>
            </div>

            {/* Social Redirect Buttons Capsule */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/918555998216?text=${encodeURIComponent(
                  `Hi, I saw your project "${slide.title}" (${slide.type}) on your website and would like to know more about it.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-full transition-all duration-200 hover:scale-105 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-white"
              >
                <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                <span className="font-sans font-bold tracking-wider uppercase text-[9px] text-[#25D366] whitespace-nowrap hidden sm:inline">Enquire on WhatsApp</span>
              </a>

              <a
                href="https://instagram.com/aquaelitesolution"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-full transition-all duration-200 hover:scale-105 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/30 text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  width={14}
                  height={14}
                  fill="none"
                  stroke="#E1306C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
                <span className="font-sans font-bold tracking-wider uppercase text-[9px] text-[#E1306C] whitespace-nowrap hidden sm:inline">Instagram</span>
              </a>
            </div>

            <p className="font-display text-white/20 sm:text-right" style={{ fontSize: "clamp(18px, 2.5vw, 26px)" }}>
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

      {/* Close button Top-Right */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white/10"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
        aria-label="Close lightbox"
      >
        <X size={16} className="text-white" />
      </button>

      <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(201,165,76,0.4), transparent)" }} />
    </motion.div>
  );
}

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
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
        style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
      />
    </section>
  );
}

function GridCell({ item, index, onOpen }: { item: SlideItem; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = React.useState(false);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const layout = GRID_LAYOUTS[index % 12];

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
        gridColumn: isDesktop ? (item.col || layout.col) : "auto",
        gridRow: isDesktop ? (item.row || layout.row) : "auto",
        height: isDesktop ? "auto" : "280px",
      }}
    >
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

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: "linear-gradient(to top, rgba(11,35,65,0.92) 0%, rgba(11,35,65,0.3) 50%, transparent 100%)",
          opacity: hovered ? 1 : 0.75,
        }}
      />

      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{ background: "var(--gold-primary)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: E }}
      />

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

export function ProjectsClient({ images }: { images: SlideItem[] }) {
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);
  const close = () => setLightboxIndex(null);
  const prev  = () => setLightboxIndex((p) => p === null ? null : (p - 1 + images.length) % images.length);
  const next  = () => setLightboxIndex((p) => p === null ? null : (p + 1) % images.length);

  return (
    <div className="font-sans overflow-x-hidden">
      <HeroSection />
      
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
          <div className="mb-10">
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
          </div>

          {/* Divider */}
          <div
            className="mb-10 h-px bg-navy-primary/8"
          />

          {/* Asymmetric collage grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            style={{ gridAutoRows: "clamp(240px, 20vw, 340px)" }}
          >
            {images.map((item, i) => (
              <GridCell key={i} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
            ))}
          </div>

          {/* Trust statement */}
          <p className="mt-16 text-center font-sans text-[13px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto text-silver">
            Our installation specialists have completed installations for homes, villas, apartments, commercial spaces, hotels, and offices.
          </p>
        </div>

        <AnimatePresence>
          {lightboxIndex !== null && (
            <Lightbox
              slide={images[lightboxIndex]}
              index={lightboxIndex}
              total={images.length}
              onClose={close}
              onPrev={prev}
              onNext={next}
            />
          )}
        </AnimatePresence>
      </section>

      {/* CTA Strip */}
      <section
        className="relative overflow-hidden bg-navy-brand py-12 md:py-20"
      >
        <div className="absolute pointer-events-none right-[-5%] top-[-50%] w-[40%] h-[200%] bg-[radial-gradient(ellipse,rgba(201,165,76,0.1)_0%,transparent_70%)]" />

        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] mb-3 text-gold-primary">
                Start Your Project
              </p>
              <h2 className="font-display font-medium text-white leading-tight text-xl sm:text-2xl md:text-3xl max-w-[420px]">
                Book a free site assessment.
              </h2>
              <p className="mt-3 font-sans leading-relaxed text-xs sm:text-[13px] text-white/40 max-w-[360px]">
                Our specialists visit, assess your property, and recommend the right system — before you commit to anything.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="/consultation"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.22em] transition-all duration-300 group bg-gold-primary text-white hover:scale-[1.02]"
              >
                Book a Free Assessment
                <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-bold text-[10px] uppercase tracking-[0.22em] border border-white/12 text-white/50 hover:text-white transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
