"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Ruler, Compass, Wrench, ShieldCheck } from "lucide-react";

export const AquaEliteApproach: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <Ruler className="w-5 h-5" />,
      title: "Property & Fluid Assessment",
      description: "We conduct site diagnostic audits to measure borewell TDS scaling index, pressure profiles, physical shaft bounds, and peak coincident loads across rain showers and wellness pools."
    },
    {
      num: "02",
      icon: <Compass className="w-5 h-5" />,
      title: "Tailored Recommendation",
      description: "We size systems precisely for your architecture. We source and recommend an unbiased mix of premium hardware components based strictly on diagnostics—never brand-locked."
    },
    {
      num: "03",
      icon: <Wrench className="w-5 h-5" />,
      title: "Architectural Integration",
      description: "Our engineering technicians install systems cleanly within constraints. Every pipe routing, bypass setup, and electrical connection complies with certified quality codes."
    },
    {
      num: "04",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Flow Health Support",
      description: "Continuous flow protection. We provide calibration reviews, seasonal TDS audits, and priority support dispatch to ensure your systems perform reliably year after year."
    }
  ];

  return (
    <section id="advisory-approach" className="py-16 md:py-24 lg:py-32 bg-offwhite border-y border-navy-primary/5" aria-label="Our Advisory Approach">
      <Container className="max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full relative">
          
          {/* Left Column - Sticky Section Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 text-left">
            <Reveal>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary block">
                Our Advisory Method
              </span>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-display font-medium tracking-tight text-navy-primary leading-[1.15] text-balance">
                We Engineer Systems.
                <br />
                We Do Not Sell Hardware.
              </h2>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed max-w-sm">
                A luxury home deserves a custom water blueprint. We analyze parameters first, diagnostics-first, to build around your architectural requirements rather than pushing products.
              </p>
            </Reveal>
            
            {/* Deep Trust Quote */}
            <Reveal delay={0.3} className="border-t border-gold-primary/20 pt-6 mt-8 hidden lg:block">
              <p className="font-display italic text-xs text-navy-primary/75 leading-relaxed text-balance">
                &ldquo;Every villa has a unique layout. Designing a heating loop or softening setup without load sizing calculations is simply a guess. We do not guess with luxury homes.&rdquo;
              </p>
            </Reveal>
          </div>

          {/* Right Column - Timeline Cards Stack */}
          <div className="lg:col-span-7 space-y-6">
            {steps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="p-6 sm:p-8 bg-purewhite border border-navy-primary/5 rounded-xl transition-all duration-300 hover:border-gold-primary/20 elevation-resting hover:elevation-raised relative overflow-hidden group text-left">
                  {/* Subtle number overlay */}
                  <div className="absolute top-0 right-0 p-6 font-display text-4xl sm:text-5xl font-black text-gold-primary/10 select-none transition-colors duration-300 group-hover:text-gold-primary/20">
                    {step.num}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2.5 border border-gold-primary/10 rounded-lg bg-offwhite text-gold-primary">
                      {step.icon}
                    </div>
                    <h3 className="font-display text-sm md:text-base font-semibold tracking-wide text-navy-primary">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-navy-primary/70 leading-relaxed font-sans pr-10">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};
