"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import {
  MessageSquare,
  MapPin,
  Wrench,
  Headphones,
  ChevronRight,
  Shield,
  Award,
  Handshake,
} from "lucide-react";

const transitionEase = [0.76, 0, 0.24, 1] as [number, number, number, number];

interface AquaEliteApproachProps {
  quote?: string;
}

export const AquaEliteApproach: React.FC<AquaEliteApproachProps> = ({ quote }) => {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare className="w-4 h-4 text-gold-primary" strokeWidth={1.75} />,
      title: "Understand Requirements",
      description:
        "We start by listening. We ask the right questions about your property, your water usage, and your expectations — so we can recommend what genuinely fits, not what is easiest to sell.",
      image: "/images/how_we_work_1_indian.png",
      alt: "Advisory team consulting with Indian homeowners in Hyderabad",
    },
    {
      num: "02",
      icon: <MapPin className="w-4 h-4 text-gold-primary" strokeWidth={1.75} />,
      title: "Site Assessment",
      description:
        "Our team visits your property to check the water supply, plumbing layout, and electrical setup. This helps us recommend the right product for your specific situation.",
      image: "/images/how_we_work_2_indian.png",
      alt: "Indian technician checking pipe pressure gauges and supply connections",
    },
    {
      num: "03",
      icon: <Wrench className="w-4 h-4 text-gold-primary" strokeWidth={1.75} />,
      title: "Professional Installation",
      description:
        "We supply products from trusted brands and install them properly. Our installation specialists handle everything — cleanly and safely.",
      image: "/images/how_we_work_3_indian.png",
      alt: "Indian plumbing technician installing modern water filtration system components",
    },
    {
      num: "04",
      icon: <Headphones className="w-4 h-4 text-gold-primary" strokeWidth={1.75} />,
      title: "After-Sales Support",
      description:
        "Our job does not end at installation. We are available for maintenance, check-ups, and any service you need. We want your system to work well for years to come.",
      image: "/images/how_we_work_4_indian.png",
      alt: "Friendly Indian technician explaining purifier options and controls",
    },
  ];

  const displayQuote = quote || "Every property is different. We take the time to understand yours before recommending anything. That is how we build trust.";

  return (
    <section
      id="advisory-approach"
      className="relative overflow-hidden bg-offwhite dark:bg-[#03050c] text-left border-y border-navy-primary/5 dark:border-white/5 select-none"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
      }}
      aria-label="How We Work"
    >
      {/* Subtle blueprint watermark */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.01] dark:opacity-[0.005] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0B2341 1px, transparent 1px), linear-gradient(to bottom, #0B2341 1px, transparent 1px)",
          backgroundSize: "75px 75px",
        }}
      />

      <Container className="max-w-[1320px] relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24 space-y-4">
          <Reveal>
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-primary block">
              How We Work
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight text-navy-primary dark:text-white leading-tight">
              We <span className="text-gold-primary font-serif italic">Recommend.</span> We Install. We{" "}
              <span className="text-gold-primary font-serif italic">Support.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-silver dark:text-white/40 font-sans leading-relaxed max-w-xl">
              We are not a retail shop selling products off a shelf. We align sizing and engineering with your property first, install cleanly, and support long-term.
            </p>
          </Reveal>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: transitionEase, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between"
            >
              {/* Blur hover radial light leak */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent dark:from-gold-primary/3 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

              <div>
                {/* Image panel */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-navy-primary/5 dark:bg-[#0A1122]/60 shadow-sm border border-navy-primary/5 dark:border-white/5 transition-all duration-500 group-hover:border-gold-primary/20">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/15 via-transparent to-transparent dark:from-black/45 pointer-events-none" />
                </div>

                {/* Step header numeric & icon details */}
                <div className="flex items-center justify-between mt-6 mb-3 relative">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif italic text-2xl font-light text-gold-primary">
                      {step.num}
                    </span>
                    <div className="p-1.5 rounded-lg bg-navy-primary/5 dark:bg-white/5 text-gold-primary transition-colors duration-300 group-hover:bg-gold-primary/10">
                      {step.icon}
                    </div>
                  </div>
                  
                  {idx < 3 && (
                    <div className="absolute right-[-14px] top-1/2 -translate-y-1/2 hidden lg:flex pointer-events-none">
                      <ChevronRight size={14} className="text-navy-primary/20 dark:text-white/10 group-hover:text-gold-primary transition-colors duration-500" strokeWidth={2} />
                    </div>
                  )}
                </div>

                {/* Accent horizontal divider line */}
                <div className="border-t border-navy-primary/10 dark:border-white/10 group-hover:border-gold-primary/25 transition-colors duration-300 mb-3" />

                {/* Card Title */}
                <h3 className="font-display font-medium text-base text-navy-primary dark:text-white mb-2 transition-colors duration-300 group-hover:text-gold-primary">
                  {step.title}
                </h3>

                {/* Card Description */}
                <p className="font-sans text-xs text-silver dark:text-white/45 leading-relaxed transition-colors duration-300 group-hover:text-navy-primary/90 dark:group-hover:text-white/60">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Minimal Banner Statement */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: transitionEase, delay: 0.2 }}
          className="mt-20 sm:mt-28 pt-8 border-t border-navy-primary/10 dark:border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          {/* Promise indicator */}
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-navy-primary/60 dark:text-white/50">
            <Shield size={12} className="text-gold-primary" />
            <span>Our Promise:</span>
            <span className="text-silver dark:text-white/30 font-medium">Quality · Installation · Support</span>
          </div>

          {/* Pillars List */}
          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {[
              { icon: Shield, label: "Quality" },
              { icon: Award, label: "Expertise" },
              { icon: Handshake, label: "Trust" },
              { icon: Headphones, label: "Support" },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-navy-primary/45 dark:text-white/40 hover:text-gold-primary dark:hover:text-gold-primary transition-colors duration-300"
              >
                <pillar.icon size={11} className="text-gold-primary/70" strokeWidth={2} />
                <span>{pillar.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dynamic Trust Quote Block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: transitionEase, delay: 0.3 }}
          className="mt-12 max-w-2xl mx-auto text-center pt-6"
        >
          <blockquote>
            <p className="font-display italic text-sm sm:text-base text-navy-primary/70 dark:text-white/50 leading-relaxed text-balance">
              &ldquo;{displayQuote}&rdquo;
            </p>
          </blockquote>
        </motion.div>

      </Container>
    </section>
  );
};
