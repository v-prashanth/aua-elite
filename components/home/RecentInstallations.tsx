"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

export const RecentInstallations: React.FC = () => {
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

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
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
            className="font-display font-medium tracking-tight leading-[1.15] text-navy-primary"
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
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
              fontSize: "clamp(12px, 1.4vw, 14.5px)",
              color: "var(--silver)",
            }}
          >
            We design and deliver bespoke water heating and treatment integrations across Hyderabad. Every project is handled end-to-end by our own certified technicians with zero compromises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E, delay: 0.25 }}
            className="pt-4"
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 group"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-primary transition-opacity duration-300 group-hover:opacity-75">
                Explore Our Portfolio
              </span>
              <motion.span
                whileHover={{ x: 3, y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "var(--gold-primary)" }}
              >
                <ArrowUpRight size={13} className="text-white" strokeWidth={2.5} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
