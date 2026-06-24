"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const TrustedBrands: React.FC = () => {
  const brands = [
    {
      name: "Stiebel Eltron",
      origin: "Germany",
      established: "1924",
      focus: "Thermal Heating",
      description: "A global pioneer in instantaneous hot water. Famous for scale-resistant bare-wire heating elements and high-performance central heat pumps that cut energy costs by up to 75%."
    },
    {
      name: "AO Smith",
      origin: "USA",
      established: "1874",
      focus: "Premium Storage",
      description: "World leaders in high-capacity storage boilers. Their glass-lined tank designs protect heating systems against pressure and corrosion for long-term luxury residential durability."
    },
    {
      name: "ZeroB",
      origin: "India",
      established: "1985",
      focus: "Smart Softening",
      description: "Ion Exchange's premier brand. Offers intelligent, automated volumetric softeners engineered specifically to counter Hyderabad's high TDS water hardness profiles."
    },
    {
      name: "Zanskar",
      origin: "India",
      established: "2020",
      focus: "Thermal Loops",
      description: "Advanced developers of central heat pumps and hot water loops, optimizing ecological footprint and reliability for modern high-flow villa requirements."
    }
  ];

  return (
    <section id="trusted-brands" className="py-14 md:py-20 bg-offwhite border-t border-navy-primary/5" aria-label="Brands We Work With">
      <Container className="max-w-5xl text-center">
        <Reveal>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-3 block">
            Trusted Brands We Work With
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy-primary leading-tight max-w-2xl mx-auto mb-6 text-balance">
            We Recommend. We Integrate. We Support.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed max-w-2xl mx-auto mb-10">
            We work with trusted brands to supply the right products for your home. We recommend based on what suits your situation — not based on what is easiest for us to sell.
          </p>
        </Reveal>

        {/* Elegant Brand Profiles Grid - 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {brands.map((brand, idx) => (
            <Reveal key={idx} delay={0.2 + idx * 0.1}>
              <div className="flex flex-col justify-between p-6 sm:p-8 border-t-2 border-t-[rgba(201,165,76,0.6)] border-x border-b border-navy-primary/5 rounded-xl bg-purewhite h-full elevation-resting relative overflow-hidden group hover:border-[rgba(201,165,76,0.3)] transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex flex-col border-b border-navy-primary/5 pb-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-sm tracking-wide text-navy-primary uppercase">
                        {brand.name}
                      </h3>
                      <span className="px-2 py-0.5 bg-offwhite border border-navy-primary/5 rounded font-sans text-[7px] font-bold text-gold-primary uppercase tracking-wide">
                        {brand.focus}
                      </span>
                    </div>
                    <span className="text-[8px] text-navy-primary/60 uppercase tracking-widest font-sans font-bold">
                      {brand.origin} &bull; Est. {brand.established}
                    </span>
                  </div>

                  <p className="text-xs text-navy-primary/70 leading-relaxed font-sans">
                    {brand.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
};
