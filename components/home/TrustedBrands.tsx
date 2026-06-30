"use client";
 
import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";

export const TrustedBrands: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState(0);

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

  const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

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

        {/* Tab Menu */}
        <div className="flex flex-wrap justify-center border-b border-navy-primary/10 mb-10 max-w-2xl mx-auto gap-y-2">
          {brands.map((brand, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => setActiveTab(idx)}
                className={`relative px-5 sm:px-6 py-4 font-display text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 focus:outline-none select-none ${
                  isActive ? "text-gold-primary" : "text-navy-primary/60 hover:text-navy-primary"
                }`}
              >
                {brand.name}
                {isActive && (
                  <motion.div
                    layoutId="activeBrandTabLine"
                    className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gold-primary"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Brand Showcase Details Card */}
        <div className="max-w-4xl mx-auto bg-purewhite border border-navy-primary/5 rounded-2xl p-8 sm:p-12 shadow-raised relative overflow-hidden text-left h-auto min-h-[260px] md:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: E }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side: Brand Details */}
              <div className="md:col-span-8 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gold-primary">
                    {brands[activeTab].focus}
                  </span>
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-navy-primary leading-none">
                    {brands[activeTab].name}
                  </h3>
                  <span className="text-[10px] text-navy-primary/60 uppercase tracking-widest font-sans font-bold block pt-1">
                    {brands[activeTab].origin} &bull; Est. {brands[activeTab].established}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-navy-primary/75 leading-relaxed font-sans pr-4">
                  {brands[activeTab].description}
                </p>
              </div>

              {/* Right Side: Visual Watermark Initials */}
              <div className="md:col-span-4 flex items-center justify-center md:justify-end relative">
                {/* Visual circle frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-gold-primary/15 flex items-center justify-center bg-offwhite shadow-resting">
                  <span className="font-display font-black text-5xl sm:text-6xl text-gold-primary/10 select-none">
                    {brands[activeTab].letter}
                  </span>
                  
                  {/* Fine technical ticks overlay */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-gold-primary/10" />
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gold-primary/5 -translate-x-1/2 pointer-events-none" />
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gold-primary/5 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Decorative corner lines on the card */}
          <div className="absolute -top-px -left-px w-6 h-px bg-gold-primary/30" />
          <div className="absolute -top-px -left-px w-px h-6 bg-gold-primary/30" />
          <div className="absolute -bottom-px -right-px w-6 h-px bg-gold-primary/30" />
          <div className="absolute -bottom-px -right-px w-px h-6 bg-gold-primary/30" />
        </div>
      </Container>
    </section>
  );
};
