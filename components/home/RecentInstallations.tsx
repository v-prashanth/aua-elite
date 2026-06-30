"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

export const RecentInstallations: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const items = [
    {
      src: "/images/professional_team.png",
      alt: "Aqua Elite Solutions professional service technicians team",
      title: "Our Expert Team",
      tag: "Certified Staff",
      desc: "Certified in-house technicians managing your installation end-to-end.",
      floating: "Equipped with proper tools and in-house safety certifications.",
    },
    {
      src: "/images/technician_working.png",
      alt: "Technician installing water softener and heater system carefully",
      title: "Professional Installation",
      tag: "Expert Setup",
      desc: "Clean setup, certified safety standards, and precision system execution.",
      floating: "Neat layouts, secure plumbing connections, and leak-tested lines.",
    },
    {
      src: "/images/happy_customer.png",
      alt: "Satisfied homeowner talking to an Aqua Elite technician",
      title: "Happy Homeowners",
      tag: "Direct Support",
      desc: "Long-term support and complete transparency at every step.",
      floating: "Walkthrough of controls and lifetime support setup complete.",
    },
  ];

  return (
    <section
      className="relative overflow-hidden border-t border-navy-primary/5"
      aria-label="Happy Customers Redirection"
      style={{
        paddingTop: "clamp(64px, 8vw, 110px)",
        paddingBottom: "clamp(64px, 8vw, 110px)",
        background: "var(--offwhite)",
      }}
    >
      {/* Background blueprint grid overlay */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Subtle radial background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(201,165,76,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Trust Items List (Col Span 5) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col text-left">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: E }}
                className="block text-[9px] font-bold uppercase tracking-[0.35em]"
                style={{ color: "var(--gold-primary)" }}
              >
                Happy Customers
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: E, delay: 0.1 }}
                className="font-display font-medium tracking-tight leading-[1.15] text-navy-primary mt-3"
                style={{ fontSize: "clamp(28px, 3.8vw, 42px)" }}
              >
                Completed Installations.<br />
                <span style={{ color: "var(--gold-primary)" }}>Real Trust.</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: E, delay: 0.18 }}
                className="font-sans leading-relaxed text-balance"
                style={{
                  fontSize: "clamp(12px, 1.4vw, 14px)",
                  color: "var(--silver)",
                }}
              >
                We deliver water heating and treatment installations across Hyderabad. Every installation is handled end-to-end by our own team.
              </motion.p>
            </div>

            {/* List of items */}
            <div className="space-y-4">
              {items.map((item, idx) => {
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-purewhite border-gold-primary/20 shadow-resting"
                        : "bg-transparent border-navy-primary/5 hover:border-gold-primary/10"
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {/* Active side-border indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeInstallationBorder"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-primary rounded-l-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <span className={`font-display text-xs font-bold tracking-wider ${isActive ? "text-gold-primary" : "text-silver/60"}`}>
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-gold-primary/80 font-bold block">
                          {item.tag}
                        </span>
                        <h3 className="font-display text-xs sm:text-sm font-semibold tracking-wide text-navy-primary">
                          {item.title}
                        </h3>
                        <p className={`text-[11px] text-silver leading-relaxed font-sans transition-all duration-300 ${
                          isActive ? "opacity-100 max-h-20 mt-2" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: E, delay: 0.28 }}
              className="pt-2"
            >
              <Link href="/projects" className="inline-flex items-center gap-3 group">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-primary transition-opacity duration-300 group-hover:opacity-75">
                  View Our Work
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gold-primary transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowUpRight size={13} className="text-white" strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Dynamic Visual Showcase Canvas (Col Span 7) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-offwhite">
                
                {items.map((item, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "opacity-100 scale-100 z-10 pointer-events-auto"
                          : "opacity-0 scale-105 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/80 via-navy-brand/20 to-transparent pointer-events-none" />

                      {/* Floating details on image */}
                      <div className="absolute bottom-6 left-6 right-6 text-left text-white z-20 space-y-1">
                        <span className="text-[7px] font-bold uppercase tracking-widest text-gold-primary">
                          {item.tag}
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-medium">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-white/80 font-sans leading-relaxed">
                          {item.floating}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Decorative corners */}
                <div className="absolute -top-px -left-px w-8 h-px bg-gold-primary/30 z-20" />
                <div className="absolute -top-px -left-px w-px h-8 bg-gold-primary/30 z-20" />
                <div className="absolute -bottom-px -right-px w-8 h-px bg-gold-primary/30 z-20" />
                <div className="absolute -bottom-px -right-px w-px h-8 bg-gold-primary/30 z-20" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
