"use client";
 
import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { motion, AnimatePresence } from "framer-motion";

import type { Brand } from "@/lib/supabase/database.types";

interface TrustedBrandsProps {
  initialBrands?: Brand[];
}

const defaultBrands = [
  {
    name: "Stiebel Eltron",
    origin: "Germany",
    established: "1924",
    focus: "Thermal Heating",
    logo: "/logos/Stielbel-Eltron.png",
    description: "A global pioneer in instantaneous hot water. Famous for scale-resistant bare-wire heating elements and high-performance central heat pumps that cut energy costs by up to 75%"
  },
  {
    name: "AO Smith",
    origin: "USA",
    established: "1874",
    focus: "Premium Storage",
    logo: "/logos/aosmith.png",
    description: "World leaders in high-capacity storage boilers. Their glass-lined tank designs protect heating systems against pressure and corrosion for long-term luxury residential durability."
  },
  {
    name: "ZeroB",
    origin: "India",
    established: "1985",
    focus: "Smart Softening",
    logo: "/logos/zeroB.jpg",
    description: "Ion Exchange's premier brand. Offers intelligent, automated volumetric softeners engineered specifically to counter Hyderabad's high TDS water hardness profiles."
  },
  {
    name: "Zanskar",
    origin: "India",
    established: "2020",
    focus: "Thermal Loops",
    logo: "/logos/Zanskar.png",
    description: "Advanced developers of central heat pumps and hot water loops, optimizing ecological footprint and reliability for modern high-flow villa requirements."
  }
];

export const TrustedBrands: React.FC<TrustedBrandsProps> = ({ initialBrands }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  // Map database brands (if any) or fallback to defaults
  const brands = React.useMemo(() => {
    if (initialBrands && initialBrands.length > 0) {
      return initialBrands.map((b) => ({
        name: b.name,
        origin: b.origin || "Integrated",
        established: "Active",
        focus: b.note || "Product Showcase",
        logo: b.logo || "/logos/Stielbel-Eltron.png",
        description: b.description || "Trusted water solutions recommended and integrated.",
      }));
    }
    return defaultBrands;
  }, [initialBrands]);

  // Keep active tab safe if brands list changes
  React.useEffect(() => {
    if (activeTab >= brands.length) {
      setActiveTab(0);
    }
  }, [brands, activeTab]);

  const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

  const logoBg = React.useMemo(() => {
    if (!brands[activeTab]) return "bg-white";
    const name = brands[activeTab].name.toLowerCase();
    if (name.includes("zanskar")) {
      return "bg-[#0B2341]"; // Official brand navy background to contrast the white Zanskar logo
    }
    return "bg-white";
  }, [brands, activeTab]);

  if (brands.length === 0) return null;

  return (
    <section id="trusted-brands" className="py-14 md:py-20 lg:py-28 bg-offwhite dark:bg-[#03050c] border-t border-navy-primary/5 dark:border-white/5 select-none" aria-label="Brands We Work With">
      <Container className="max-w-5xl text-center">
        <Reveal>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-3 block">
            Trusted Brands We Work With
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy-primary dark:text-white leading-tight max-w-2xl mx-auto mb-6 text-balance">
            We Recommend. We Integrate. We Support.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs sm:text-sm text-navy-primary/70 dark:text-white/40 font-sans leading-relaxed max-w-2xl mx-auto mb-12">
            We proudly recommend, install, and support globally trusted brands known for premium tankless water heating systems and advanced water treatment technologies. Our recommendations are strictly based on engineering suitability — not sales targets.
          </p>
        </Reveal>

        {/* Tab Menu */}
        <div className="flex flex-wrap justify-center border-b border-navy-primary/10 dark:border-white/10 mb-10 max-w-2xl mx-auto gap-y-2">
          {brands.map((brand, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => setActiveTab(idx)}
                className={`relative px-5 sm:px-6 py-4 font-display text-xs sm:text-sm font-semibold uppercase tracking-wider transition-colors duration-300 focus:outline-none select-none ${
                  isActive ? "text-gold-primary" : "text-navy-primary/60 dark:text-white/60 hover:text-navy-primary dark:hover:text-white"
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
        <div className="max-w-4xl mx-auto bg-purewhite dark:bg-navy-dark border border-navy-primary/5 dark:border-white/5 rounded-2xl p-8 sm:p-12 shadow-raised relative overflow-hidden text-left h-auto min-h-[260px] md:min-h-[220px]">
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
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-gold-primary">
                    {brands[activeTab].focus}
                  </span>
                  <h3 className="font-display font-medium text-xl sm:text-2xl text-navy-primary dark:text-white leading-none">
                    {brands[activeTab].name}
                  </h3>
                  <span className="text-[10px] text-navy-primary/60 dark:text-white/40 uppercase tracking-widest font-sans font-bold block pt-1">
                    {brands[activeTab].origin} {brands[activeTab].established ? `• Est. ${brands[activeTab].established}` : ''}
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-navy-primary/75 dark:text-white/60 leading-relaxed font-sans pr-4">
                  {brands[activeTab].description}
                </p>
              </div>

              {/* Right Side: Professional rectangular, non-clipping logo card */}
              <div className="md:col-span-5 flex items-center justify-center relative w-full">
                <motion.div
                  key={activeTab}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: E }}
                  className={`w-full h-[140px] sm:h-[160px] md:h-[180px] rounded-2xl border border-navy-primary/8 dark:border-white/8 flex items-center justify-center p-4 shadow-resting transition-colors duration-300 ${logoBg}`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={brands[activeTab].logo}
                      alt={`${brands[activeTab].name} official brand logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 250px, 350px"
                      priority
                    />
                  </div>
                </motion.div>
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
