"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

export const FinalCTA: React.FC = () => {
  const router = useRouter();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <section 
      className="py-20 md:py-28 lg:py-36 bg-offwhite relative overflow-hidden border-t border-navy-primary/5" 
      aria-label="Book Consultation"
    >
      {/* Background blueprint grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Static premium background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(201,165,76,0.03) 0%, transparent 65%)"
        }}
      />

      <Container className="relative z-10 max-w-4xl">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: E }}
          className="relative overflow-hidden rounded-xl"
          style={{
            background: "var(--purewhite)",
            border: "1px solid rgba(11, 35, 65, 0.05)",
            padding: "clamp(32px, 5vw, 64px) clamp(24px, 4vw, 48px)",
            boxShadow: "0 12px 30px -4px rgba(11, 35, 65, 0.03)",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
          }}
          whileHover={{
            borderColor: "rgba(201, 165, 76, 0.25)",
            boxShadow: "0 24px 50px -6px rgba(11, 35, 65, 0.06)",
          }}
        >
          {/* Dynamic premium spotlight effect following the cursor */}
          {hovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(201,165,76,0.045), transparent 75%)`,
              }}
            />
          )}

          {/* Clean minimal editorial header */}
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-block text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color: "var(--gold-primary)" }}>
              Start Your Project
            </span>

            <h2 
              className="font-display font-medium tracking-tight text-navy-primary text-balance"
              style={{
                fontSize: "clamp(26px, 3.8vw, 44px)",
                lineHeight: 1.15,
              }}
            >
              Ready to find the right water solution for your property?
            </h2>

            <p 
              className="font-sans leading-relaxed text-balance mx-auto"
              style={{
                fontSize: "clamp(12px, 1.35vw, 14px)",
                color: "var(--silver)",
                maxWidth: "520px",
              }}
            >
              Book a free site visit. We assess your property, recommend the right system, and provide a written proposal — no obligation.
            </p>

            {/* Fluid animated CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <motion.button
                onClick={() => router.push("/consultation")}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: E }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gold-primary text-white px-7 py-3.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-navy-primary transition-colors duration-300"
              >
                <Calendar size={12} strokeWidth={2.5} />
                Book Consultation
                <ArrowRight size={12} className="ml-1 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </motion.button>

              <a 
                href="https://wa.me/918555998216"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <motion.button
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: E }}
                  className="w-full inline-flex items-center justify-center gap-2 border border-navy-primary/10 text-navy-primary px-7 py-3.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-navy-primary/30 hover:bg-navy-primary/5"
                >
                  <MessageCircle size={12} strokeWidth={2.5} className="text-[#25D366]" />
                  Chat via WhatsApp
                </motion.button>
              </a>
            </div>

            {/* Subtle, confident trust points */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[9px] font-bold uppercase tracking-[0.25em] text-navy-primary/60 border-t border-navy-primary/5 mt-6 w-full">
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-gold-primary rotate-45" style={{ background: "var(--gold-primary)" }} /> Free Site Inspection
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-gold-primary rotate-45" style={{ background: "var(--gold-primary)" }} /> Best Price Assurance
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-gold-primary rotate-45" style={{ background: "var(--gold-primary)" }} /> Professional Recommendations
              </span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
