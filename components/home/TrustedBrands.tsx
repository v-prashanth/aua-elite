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
      description: "A global pioneer in electrical hot water. Renowned for bare-wire element technology and intelligent central heat pumps that extract ambient air energy to cut heating costs by up to 75%."
    },
    {
      name: "Pentair",
      origin: "USA",
      established: "1966",
      focus: "Bespoke Filtration",
      description: "Industry leaders in water pre-treatment. Pentair high-flow carbon and sediment filtration systems isolate chemical impurities, chlorine, and silt before water enters your main lines."
    },
    {
      name: "Aqua Elite Softeners",
      origin: "India",
      established: "2022",
      focus: "Volumetric Softening",
      description: "Engineered specifically to counter Hyderabad's extreme borewell water scaling challenges. Our smart volumetric ion-exchange softeners protect high-flow rain showers and fixtures."
    }
  ];

  return (
    <section id="trusted-brands" className="py-16 md:py-24 bg-offwhite border-t border-navy-primary/5" aria-label="Brands We Work With">
      <Container className="max-w-5xl text-center">
        <Reveal>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-3 block">
            Curated Manufacturing Partners
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy-primary leading-tight max-w-2xl mx-auto mb-6 text-balance">
            We Recommend. We Integrate. We Support.
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed max-w-2xl mx-auto mb-12">
            We are not manufacturer-locked. We select hardware components based strictly on your site layout, phase power availability, and water chemistry diagnostics.
          </p>
        </Reveal>

        {/* Elegant Brand Profiles Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {brands.map((brand, idx) => (
            <Reveal key={idx} delay={0.2 + idx * 0.1}>
              <div className="flex flex-col justify-between p-6 sm:p-8 border-t-2 border-t-gold-primary/60 border-x border-b border-navy-primary/5 rounded-xl bg-purewhite h-full elevation-resting relative overflow-hidden group hover:border-gold-primary/30 transition-all duration-300">
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
