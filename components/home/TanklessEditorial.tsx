"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const FEATURES = [
  {
    num: "01",
    title: "Continuous Hot Water",
    body: "Water is heated instantaneously on demand — a constant, temperature-stable flow for multiple consecutive showers, with zero standby waiting.",
    badge: "Unlimited Flow · 42°C Dynamic Stability",
  },
  {
    num: "02",
    title: "Space-Saving Footprint",
    body: "Concealed behind walls or under-sink cabinets, these units maintain a minimal footprint that keeps your interior architecture clean.",
    badge: "Zero Floor Space · Fully Concealed",
  },
  {
    num: "03",
    title: "Energy & Thermal Efficiency",
    body: "Energy is consumed only while the tap runs, eliminating standby heat loss entirely and maximizing long-term efficiency.",
    badge: "99% Thermal Yield · ERP Class A",
  },
  {
    num: "04",
    title: "Professional Sizing & Engineering",
    body: "Our team performs full site evaluations — pressure, load, and flow — to guarantee seamless performance tailored to your property.",
    badge: "Certified Engineering · Site Analysis",
  },
];

export const TanklessEditorial: React.FC = () => {
  const [activeIdx, setActiveIdx] = React.useState(0);

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-offwhite dark:bg-[#03050c] border-t border-navy-primary/5 dark:border-white/5 overflow-hidden select-none">
      <Container className="relative z-10">
        
        {/* ── HEADER SECTION ── */}
        <div className="max-w-4xl mb-12 sm:mb-16 space-y-4 text-left">
          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-gold-primary block">
            Premium Specialization
          </span>
          <h2 className="font-display font-medium leading-[1.15] tracking-tight text-navy-primary dark:text-white text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]">
            Modern Water Heating Without Compromise
          </h2>
          <p className="text-[14px] sm:text-[15.5px] text-navy-primary/65 dark:text-white/55 font-sans leading-[1.8] max-w-[800px] pt-2">
            Standard storage geysers dictate the terms of your shower and monopolize space. Modern architectural homes transition to tankless solutions to align convenience with aesthetic restraint.
          </p>
        </div>

        {/* ── CONTENT SECTION ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">
          
          {/* Left Column: Image Canvas (42% width) */}
          <div className="w-full lg:w-[42%] shrink-0 lg:min-w-0">
            {/* Outer Border/Card Wrapper */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-gold-primary/20 shadow-[0_16px_50px_-16px_rgba(11,35,65,0.22)] bg-purewhite dark:bg-[#121316] p-1.5 group">
              {/* Inner Image Frame */}
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/tankless_editorial.png"
                  alt="Premium concealed tankless water heater in a modern bathroom"
                  fill
                  priority
                  className="object-cover object-center transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/60 via-navy-brand/20 to-transparent pointer-events-none" />
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-px -left-px w-8 h-px bg-gold-primary/50 z-20" />
              <div className="absolute -top-px -left-px w-px h-8 bg-gold-primary/50 z-20" />
              <div className="absolute -bottom-px -right-px w-8 h-px bg-gold-primary/50 z-20" />
              <div className="absolute -bottom-px -right-px w-px h-8 bg-gold-primary/50 z-20" />
            </div>

            {/* Editorial Caption below the image */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between text-left px-1 gap-2 sm:gap-0">
              <div className="space-y-1 min-w-0">
                <span className="text-[8px] uppercase font-bold tracking-[0.25em] text-gold-primary block">
                  System Specification
                </span>
                <span className="text-[12px] sm:text-[12.5px] font-sans font-medium text-navy-primary/75 dark:text-white/60 leading-tight block truncate">
                  {FEATURES[activeIdx].badge}
                </span>
              </div>
              <div className="h-px bg-gold-primary/20 flex-grow mx-4 hidden sm:block shrink" />
              <span className="text-[9px] font-sans font-bold text-navy-primary/45 dark:text-white/30 hidden sm:block whitespace-nowrap shrink-0">
                Premium Concealed Installation
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Accordion Stack */}
          <div className="flex-grow w-full lg:w-auto lg:min-w-0 flex flex-col gap-2 text-left">
            <div className="space-y-4">
              {FEATURES.map(({ num, title, body }, idx) => {
                const isActive = activeIdx === idx;
                
                return (
                  <div
                    key={title}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="group/item relative cursor-pointer border-b border-navy-primary/5 dark:border-white/5 pb-4 transition-all duration-300"
                    style={{ opacity: isActive ? 1 : 0.45 }}
                  >
                    {/* Vertical gold progress indicator (pure CSS transition) */}
                    <div
                      className={`absolute left-0 top-0 bottom-4 w-[2.5px] bg-gold-primary rounded-full transition-all duration-300 transform origin-top ${
                        isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                      }`}
                    />

                    <div className="pl-6 flex items-start gap-4">
                      {/* Serial number */}
                      <span className={`font-display text-xs font-bold transition-colors duration-300 ${isActive ? "text-gold-primary" : "text-silver/50"}`}>
                        {num}
                      </span>
                      
                      {/* Text content block */}
                      <div className="space-y-2">
                        <h4 className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.2em] text-navy-primary dark:text-white transition-colors duration-300 group-hover/item:text-gold-primary">
                          {title}
                        </h4>
                        
                        {/* Dynamic height expansion */}
                        <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${isActive ? "max-h-[200px] opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                          <p className="text-[12.5px] text-navy-primary/65 dark:text-white/55 font-sans leading-relaxed max-w-[620px]">
                            {body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default TanklessEditorial;
