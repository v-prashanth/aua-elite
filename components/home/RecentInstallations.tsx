"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle, Calendar } from "lucide-react";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

export const RecentInstallations: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Happy Customers & Project Consultation"
      style={{
        paddingTop: "clamp(64px, 8vw, 110px)",
        paddingBottom: "clamp(64px, 8vw, 110px)",
        background: "var(--offwhite)",
      }}
    >
      {/* Background blueprint grid overlay matching upper sections */}
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
          right: "-10%",
          top: "-20%",
          width: "60%",
          height: "140%",
          background:
            "radial-gradient(ellipse, rgba(201,165,76,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Gold bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(201,165,76,0.25), transparent)",
        }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: E }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Portfolio Redirection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: E }}
            className="lg:col-span-6 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-4">
              <span
                className="block text-[9px] font-bold uppercase tracking-[0.35em]"
                style={{ color: "var(--gold-primary)" }}
              >
                Happy Customers
              </span>

              <h2
                className="font-display font-medium tracking-tight leading-[1.1] text-navy-primary"
                style={{
                  fontSize: "clamp(28px, 3.8vw, 46px)",
                }}
              >
                Completed Installations.<br />
                <span style={{ color: "var(--gold-primary)" }}>Real Trust.</span>
              </h2>

              <p
                className="font-sans leading-relaxed pt-2"
                style={{
                  fontSize: "clamp(12px, 1.3vw, 13.5px)",
                  color: "var(--silver)",
                  maxWidth: "500px",
                }}
              >
                Every photograph is a completed installation carried out by our own certified technicians across Hyderabad — villas, apartments, hotels, and commercial spaces. No subcontractors, no compromises.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/projects"
                className="inline-flex items-center gap-3 group"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-primary transition-opacity duration-300 group-hover:opacity-70">
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
            </div>
          </motion.div>

          {/* RIGHT: Start Your Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: E, delay: 0.12 }}
            className="lg:col-span-6 flex flex-col justify-between rounded-xl overflow-hidden group"
            style={{
              background: "var(--purewhite)",
              border: "1px solid rgba(11, 35, 65, 0.05)",
              padding: "clamp(24px, 4vw, 40px)",
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
            whileHover={{
              borderColor: "rgba(201, 165, 76, 0.25)",
              boxShadow: "0 12px 30px -4px rgba(11, 35, 65, 0.04)",
            }}
          >
            {/* Subtle internal card hover glow */}
            <div
              className="absolute pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{
                left: "10%",
                top: "-20%",
                width: "80%",
                height: "100%",
                background:
                  "radial-gradient(circle, rgba(201,165,76,0.03) 0%, transparent 60%)",
              }}
            />

            <div className="space-y-4 relative z-10">
              <span
                className="block text-[8px] font-bold uppercase tracking-[0.3em]"
                style={{ color: "var(--gold-primary)" }}
              >
                Start Your Project
              </span>

              <h3
                className="font-display font-medium text-navy-primary leading-tight"
                style={{
                  fontSize: "clamp(20px, 2.8vw, 30px)",
                }}
              >
                Design a custom water system for your property.
              </h3>

              <p
                className="font-sans leading-relaxed pt-1"
                style={{
                  fontSize: "clamp(11.5px, 1.25vw, 13px)",
                  color: "var(--silver)",
                  maxWidth: "480px",
                }}
              >
                Speak with our service team to assess your property and find the right water solution for your home.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8 relative z-10">
              <Link href="/consultation">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-gold-primary text-white px-6 py-3.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-navy-primary"
                >
                  <Calendar size={12} strokeWidth={2.5} />
                  Book Consultation
                </motion.button>
              </Link>

              <a
                href="https://wa.me/918555998216"
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-navy-primary/10 text-navy-primary px-6 py-3.5 rounded-sm text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:border-navy-primary/30"
                >
                  <MessageCircle size={12} strokeWidth={2.5} className="text-[#25D366]" />
                  Chat via WhatsApp
                </motion.button>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
