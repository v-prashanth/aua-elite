"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const TanklessEditorial: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-offwhite dark:bg-[#03050c] border-t border-navy-primary/5 dark:border-white/5 select-none">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Side: Editorial Image */}
        <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[420px] md:h-[500px] rounded-2xl overflow-hidden border border-gold-primary/20 shadow-raised group">
          <Image
            src="/images/tankless_editorial.png"
            alt="Concealed wall-mounted premium tankless water heating installation in a modern minimalist bathroom"
            fill
            className="object-cover object-center transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b2341]/25 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Right Side: Editorial Copy */}
        <div className="lg:col-span-6 space-y-8 flex flex-col text-left lg:pl-4">
          <Reveal>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-primary block">
              Premium Specialization
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.2rem] font-medium text-navy-primary dark:text-white leading-tight tracking-tight">
              Modern Water Heating <br />
              Without Compromise
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-navy-primary/75 dark:text-white/60 font-sans leading-relaxed">
              Standard storage geysers dictate the terms of your shower and monopolize valuable space. Modern architectural homes are transitioning to tankless solutions to align convenience with aesthetic restraint.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2 font-sans">
            <Reveal delay={0.2}>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-navy-primary dark:text-white">
                  Continuous Hot Water
                </h4>
                <p className="text-[11px] text-navy-primary/65 dark:text-white/55 leading-relaxed">
                  Water is heated instantaneously on demand. You enjoy a constant, temperature-stable flow for multiple consecutive showers, with zero standby waiting.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-navy-primary dark:text-white">
                  Space-Saving Footprint
                </h4>
                <p className="text-[11px] text-navy-primary/65 dark:text-white/55 leading-relaxed">
                  Concealed behind walls or neatly tucked inside under-sink vanity cabinets, these units maintain a minimal footprint that keeps your interior architecture clean.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-navy-primary dark:text-white">
                  Energy & Thermal Efficiency
                </h4>
                <p className="text-[11px] text-navy-primary/65 dark:text-white/55 leading-relaxed">
                  By eliminating storage tanks, you completely eliminate standby heat loss. Energy is consumed only while the tap is actively running, maximizing long-term efficiency.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-navy-primary dark:text-white">
                  Professional Sizing & Engineering
                </h4>
                <p className="text-[11px] text-navy-primary/65 dark:text-white/55 leading-relaxed">
                  Tankless systems require precise calculations for incoming water pressure and electrical load. Our team performs full site evaluations to guarantee seamless performance.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

      </Container>
    </section>
  );
};
