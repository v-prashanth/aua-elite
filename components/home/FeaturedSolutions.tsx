"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export const FeaturedSolutions: React.FC = () => {
  return (
    <section id="solutions-showcase" className="py-14 md:py-20 lg:py-28 bg-purewhite border-t border-navy-primary/5 space-y-14 md:space-y-20 lg:space-y-28" aria-label="Solutions Showcase">
      
      {/* 1. Tankless Showcase - Classic Sophisticated Split */}
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
        {/* Left Side: Editorial context */}
        <div className="lg:col-span-5 min-w-0 flex flex-col text-left space-y-6 lg:pr-4">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold-primary uppercase block">
              Water Heating
            </span>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Tankless Water Heaters
            </h3>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed">
              Hot water the moment you turn on the tap — no waiting, no storage tank. Stiebel Eltron tankless heaters deliver a continuous supply of hot water, installed neatly inside vanity cabinets or service shafts so nothing interrupts your bathroom design.
            </p>
          </Reveal>
          
          <Reveal delay={0.25}>
            <ul className="space-y-3 text-xs text-navy-primary font-medium font-sans">
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0 mt-1.5" />
                <span className="text-navy-primary/80">Endless hot water — no cold surprises mid-shower.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0 mt-1.5" />
                <span className="text-navy-primary/80">Compact units fit out of sight, keeping your space clean.</span>
              </li>
            </ul>
          </Reveal>
          
          <Reveal delay={0.3} className="pt-2">
            <Link 
              href="/products" 
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-navy-primary transition-colors outline-none group"
            >
              See Products
              <ArrowRight size={12} className="ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:col-span-7 min-w-0 relative w-full h-[260px] sm:h-[380px] md:h-[440px] rounded-xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised hover:border-gold-primary/45 transition-colors duration-500 group">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-navy-primary/5 bg-offwhite">
            <Reveal delay={0.1} className="w-full">
              <div className="relative w-full h-[250px] sm:h-[370px] md:h-[430px]">
                <Image
                  src="/images/projects/project-wap-5.jpg"
                  alt="Premium bathroom vanity layout concealing Stiebel Eltron tankless heating unit"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>

      {/* 2. Heat Pump Showcase - Asymmetric Overlap Layout */}
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-center w-full relative">
        {/* Left Side: Large image container */}
        <div className="lg:col-span-8 min-w-0 relative w-full h-[260px] sm:h-[380px] md:h-[460px] rounded-xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised hover:border-gold-primary/45 transition-colors duration-500 lg:z-0 group">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-navy-primary/5 bg-offwhite">
            <Reveal delay={0.1} className="w-full">
              <div className="relative w-full h-[250px] sm:h-[370px] md:h-[450px]">
                <Image
                  src="/images/projects/project-wap-18.jpg"
                  alt="Central thermal heat pump installation on a high-end villa terrace"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/20 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Right Side: Floating Text Card overlapping the image on desktop */}
        <div className="lg:col-span-4 min-w-0 flex flex-col text-left space-y-6 lg:-ml-16 lg:z-10 bg-purewhite p-6 sm:p-8 md:p-10 rounded-xl border border-navy-primary/5 shadow-raised">
          <Reveal>
            <span className="text-[10px] font-bold tracking-[0.25em] text-gold-primary uppercase block">
              Heat Pump Systems
            </span>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h3 className="text-2xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Central Heat Pumps
            </h3>
          </Reveal>
          
          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed">
              A heat pump heats water for your entire home using energy from the air — at a fraction of the running cost of a conventional boiler. It operates quietly in the background, around the clock, regardless of weather.
            </p>
          </Reveal>
          
          <Reveal delay={0.25}>
            <ul className="space-y-2.5 text-xs text-navy-primary font-medium font-sans">
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0 mt-1.5" />
                <span className="text-navy-primary/80">Significantly lower electricity bills compared to conventional heaters.</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0 mt-1.5" />
                <span className="text-navy-primary/80">Works year-round — unaffected by seasons or power cuts.</span>
              </li>
            </ul>
          </Reveal>
          
          <Reveal delay={0.3} className="pt-2">
            <Link 
              href="/products" 
              className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-navy-primary transition-colors outline-none group"
            >
              See Products
              <ArrowRight size={12} className="ml-1.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </Container>

      {/* 3. Water Softeners Showcase - Editorial Landscape Layout */}
      <Container className="flex flex-col w-full text-left space-y-8 sm:space-y-10">
        {/* Top: Asymmetrical Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
          <div className="lg:col-span-5 space-y-4">
            <Reveal>
              <span className="text-[10px] font-bold tracking-[0.25em] text-gold-primary uppercase block">
                Water Treatment
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
                Water Softeners & Purification
              </h3>
            </Reveal>
          </div>
          
          <div className="lg:col-span-7 space-y-4 lg:pl-10">
            <Reveal delay={0.2}>
              <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed">
                Hard water leaves scale on pipes, heaters, and fixtures. A water softener removes these minerals before they cause damage, protecting your appliances and keeping your water clean and gentle.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-xs text-navy-primary font-medium font-sans">
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                  <span className="text-navy-primary/80">Protects pipes, heaters, and taps from scale damage.</span>
                </span>
                <span className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-primary shrink-0" />
                  <span className="text-navy-primary/80">Gentler on skin and hair.</span>
                </span>
                <Link 
                  href="/products" 
                  className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-navy-primary transition-colors outline-none group sm:ml-auto"
                >
                  See Products
                  <ArrowRight size={12} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-xl p-1 bg-purewhite border border-gold-primary/20 shadow-resting hover:border-gold-primary/45 transition-colors duration-500 group">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-navy-primary/5 bg-offwhite">
            <Reveal delay={0.1} className="w-full">
              <div className="relative w-full h-[190px] sm:h-[290px] md:h-[390px]">
                <Image
                  src="/images/projects/project-wap-12.jpg"
                  alt="Clean glass of pure drinking water in a premium Indian kitchen layout"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/15 via-transparent to-transparent pointer-events-none" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};
