"use client";

import * as React from "react";
import Link from "next/link";
import { MessageSquare, Phone, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export const GlobalCTA: React.FC = () => {
  const whatsappNumber = "919849012345";
  const whatsappText = encodeURIComponent(
    "Hello Aqua Elite, I would like to enquire about water heating/softener solutions for my residence."
  );

  return (
    <section className="py-20 bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] relative overflow-hidden border-t border-gold-primary/20">
      {/* Background visual highlight */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(201,165,76,0.08)_0%,transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 max-w-4xl text-center">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center"
        >
          <motion.span
            variants={fadeInUp}
            className="text-xs font-semibold uppercase tracking-widest text-gold-primary mb-3"
          >
            Design Your System
          </motion.span>

          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 max-w-2xl text-balance text-[#FFFFFF] dark:text-[#F3F4F6]"
          >
            Ready to design the perfect solution for your home?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-sm md:text-base text-[#FFFFFF]/80 dark:text-[#F3F4F6]/80 max-w-xl mb-10 leading-relaxed text-balance"
          >
            Our engineering team in Jubilee Hills is ready to assess your property specifications and design a bespoke hydraulic system.
          </motion.p>

          {/* Core Conversion Stack */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-stretch sm:flex-row sm:items-center justify-center gap-4 w-full max-w-md sm:max-w-none animate-none"
          >
            {/* 1. Book Consultation */}
            <Link href="/contact?type=consultation" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-semibold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3.5 bg-gold-primary text-navy-primary hover:bg-gold-primary/95 rounded-full transition-all duration-300 shadow-resting hover:shadow-raised">
                Book Consultation
                <ArrowRight size={14} className="ml-2" />
              </button>
            </Link>

            {/* 2. WhatsApp Direct */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <button className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-semibold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3.5 border border-whatsapp text-whatsapp hover:bg-whatsapp/5 rounded-full transition-all duration-300">
                <MessageSquare size={14} className="mr-2" />
                WhatsApp Us
              </button>
            </a>

            {/* 3. Phone */}
            <a href="tel:+919849012345" className="flex-1 sm:flex-none">
              <button className="w-full sm:w-auto inline-flex items-center justify-center font-sans font-semibold text-xs sm:text-sm px-6 py-2.5 sm:px-8 sm:py-3.5 border border-[#FFFFFF]/15 dark:border-[#F3F4F6]/15 text-[#FFFFFF] dark:text-[#F3F4F6] hover:bg-purewhite/5 rounded-full transition-all duration-300">
                <Phone size={14} className="mr-2" />
                Call +91 98490 12345
              </button>
            </a>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[11px] text-[#FFFFFF]/60 dark:text-[#F3F4F6]/60 mt-8 font-sans"
          >
            No obligations ● Custom sizing proposal ● Authorized Stiebel Eltron Partner
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
};
