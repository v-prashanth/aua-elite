"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { MessageSquare, MapPin, PackageCheck, HeartHandshake } from "lucide-react";

export const AquaEliteApproach: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Understand Your Requirements",
      description: "We start by listening. We ask the right questions about your property, your water usage, and your expectations — so we can recommend what genuinely fits, not what is easiest to sell."
    },
    {
      num: "02",
      icon: <MapPin className="w-5 h-5" />,
      title: "Site Visit & Assessment",
      description: "Our team visits your property to check the water supply, plumbing layout, and electrical setup. This helps us recommend the right product for your specific situation."
    },
    {
      num: "03",
      icon: <PackageCheck className="w-5 h-5" />,
      title: "Supply & Professional Installation",
      description: "We supply products from trusted brands and install them properly. Our installation specialists handle everything — from piping to electrical connections — cleanly and safely."
    },
    {
      num: "04",
      icon: <HeartHandshake className="w-5 h-5" />,
      title: "After-Sales Support",
      description: "Our job does not end at installation. We are available for maintenance, check-ups, and any service you need. We want your system to work well for years to come."
    }
  ];

  return (
    <section id="advisory-approach" className="py-14 md:py-20 lg:py-28 bg-offwhite border-y border-navy-primary/5" aria-label="How We Work">
      <Container className="max-w-5xl">
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary block text-center">
              How We Work
            </span>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight text-balance text-center">
              We Recommend. We Install. We Support.
            </h2>
          </Reveal>
          
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed max-w-2xl mx-auto text-center">
              We are not a shop that sells products off a shelf. We understand your needs first, recommend the right solution, install it properly, and stay available after.
            </p>
          </Reveal>
        </div>

        {/* Premium Unified Grid with Fine Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-navy-primary/8 dark:border-white/8 rounded-xl overflow-hidden bg-purewhite">
          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.1} className="h-full">
              <div className={cn(
                "p-6 sm:p-8 bg-purewhite transition-colors duration-300 hover:bg-offwhite/40 relative overflow-hidden group text-left h-full flex flex-col justify-between",
                idx < 3 ? "border-b border-navy-primary/8 dark:border-white/8" : "",
                idx === 0 ? "md:border-r md:border-b" : "",
                idx === 1 ? "md:border-b md:border-r-0" : "",
                idx === 2 ? "md:border-r md:border-b-0" : "",
                idx === 3 ? "md:border-r-0 md:border-b-0" : ""
              )}>
                <div>
                  {/* Subtle number overlay */}
                  <div className="absolute top-0 right-0 p-6 font-display text-4xl sm:text-5xl font-black text-[rgba(201,165,76,0.08)] select-none transition-colors duration-300 group-hover:text-[rgba(201,165,76,0.18)]">
                    {step.num}
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="p-2.5 border border-[rgba(201,165,76,0.1)] rounded-lg bg-offwhite text-gold-primary">
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
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust note */}
        <Reveal delay={0.4} className="border-t border-[rgba(201,165,76,0.15)] pt-8 mt-12 text-center max-w-2xl mx-auto">
          <p className="font-display italic text-xs sm:text-sm text-navy-primary/75 leading-relaxed text-balance text-center">
            &ldquo;Every property is different. We take the time to understand yours before recommending anything. That is how we build trust.&rdquo;
          </p>
        </Reveal>
      </Container>
    </section>
  );
};
