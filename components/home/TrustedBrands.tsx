"use client";
 
import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";

export const TrustedBrands: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const brands = [
    {
      name: "Stiebel Eltron",
      origin: "Germany",
      established: "1924",
      focus: "Thermal Heating",
      letter: "S",
      description: "A global pioneer in instantaneous hot water. Famous for scale-resistant bare-wire heating elements and high-performance central heat pumps that cut energy costs by up to 75%."
    },
    {
      name: "AO Smith",
      origin: "USA",
      established: "1874",
      focus: "Premium Storage",
      letter: "A",
      description: "World leaders in high-capacity storage boilers. Their glass-lined tank designs protect heating systems against pressure and corrosion for long-term luxury residential durability."
    },
    {
      name: "ZeroB",
      origin: "India",
      established: "1985",
      focus: "Smart Softening",
      letter: "Z",
      description: "Ion Exchange's premier brand. Offers intelligent, automated volumetric softeners engineered specifically to counter Hyderabad's high TDS water hardness profiles."
    },
    {
      name: "Zanskar",
      origin: "India",
      established: "2020",
      focus: "Thermal Loops",
      letter: "K",
      description: "Advanced developers of central heat pumps and hot water loops, optimizing ecological footprint and reliability for modern high-flow villa requirements."
    }
  ];

  return (
    <section id="trusted-brands" className="py-14 md:py-20 lg:py-28 bg-offwhite border-t border-navy-primary/5" aria-label="Brands We Work With">
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
          <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed max-w-2xl mx-auto mb-12">
            We work with trusted brands to supply the right products for your home. We recommend based on what suits your situation — not based on what is easiest for us to sell.
          </p>
        </Reveal>

        {/* Dynamic Interactive Flex Accordion Showcase */}
        <div className="flex flex-col lg:flex-row gap-5 max-w-4xl mx-auto w-full h-auto lg:h-[320px] text-left">
          {brands.map((brand, idx) => {
            const isActive = activeIndex === idx;

            return (
              <Reveal key={idx} delay={idx * 0.08} className="w-full h-full lg:flex-grow lg:flex-shrink">
                <div
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative flex flex-col justify-between p-6 sm:p-8 rounded-xl border bg-purewhite cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden h-[110px] sm:h-[120px] lg:h-full select-none ${
                    isActive
                      ? "lg:flex-[2.4] flex-grow border-gold-primary/20 shadow-raised"
                      : "lg:flex-[0.8] border-navy-primary/5 bg-purewhite/70 opacity-80"
                  }`}
                >
                  {/* Subtle dynamic background watermark letter */}
                  <span className={`absolute bottom-2 right-4 font-display font-black text-7xl sm:text-8xl select-none pointer-events-none transition-all duration-500 ${
                    isActive ? "text-[rgba(201,165,76,0.065)] scale-110 rotate-3" : "text-[rgba(11,35,65,0.02)] scale-100 rotate-0"
                  }`}>
                    {brand.letter}
                  </span>

                  {/* Active sliding gold top accent indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeBrandGlow"
                      className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-primary to-transparent"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}

                  <div className="w-full">
                    {/* Header info */}
                    <div className="flex items-center justify-between border-b border-navy-primary/5 pb-4 w-full">
                      <div>
                        <h3 className="font-display font-semibold text-xs sm:text-sm tracking-wide text-navy-primary uppercase">
                          {brand.name}
                        </h3>
                        <span className="text-[9px] text-navy-primary/60 uppercase tracking-widest font-sans font-bold mt-1 block">
                          {brand.origin} &bull; Est. {brand.established}
                        </span>
                      </div>
                      <span className={`px-2 py-0.5 bg-offwhite border border-navy-primary/5 rounded font-sans text-[7px] font-bold text-gold-primary uppercase tracking-wide transition-all duration-300 ${
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-95"
                      }`}>
                        {brand.focus}
                      </span>
                    </div>

                    {/* Fading text description */}
                    <div className={`transition-all duration-500 overflow-hidden ${
                      isActive ? "opacity-100 max-h-40 mt-5 sm:mt-6" : "opacity-0 max-h-0"
                    }`}>
                      <p className="text-[11px] sm:text-xs text-navy-primary/70 leading-relaxed font-sans pr-4">
                        {brand.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
};
