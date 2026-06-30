"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export const FeaturedProducts: React.FC = () => {
  // Curate exactly 3 flagship products
  const featuredIds = ["dhb-e-18-24", "wwk-302-h", "fountain-7s"];
  const curatedProducts = products.filter((p) => featuredIds.includes(p.id));
  
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Map products to actual product showcase images (clean filenames)
  const imageMap: Record<string, string> = {
    "dhb-e-18-24": "/images/products/dhb-e-18-24.jpg",
    "wwk-302-h": "/images/products/wwk-302-h.jpg",
    "fountain-7s": "/images/products/fountain-7s.jpg",
  };

  const benefitMap: Record<string, string> = {
    "dhb-e-18-24": "Endless hot water with zero preheating wait, completely concealed inside vanity units.",
    "wwk-302-h": "Saves up to 75% on electricity bills by extracting ambient air energy for full-villa heating.",
    "fountain-7s": "Premium 7-in-1 ultrafiltration removes 100% of bacteria without requiring any electricity.",
  };

  return (
    <section id="featured-products" className="py-14 md:py-20 lg:py-28 bg-purewhite relative overflow-hidden" aria-label="Featured Products">
      {/* Subtle blueprint grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Container className="relative z-10 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Interactive Product List (Col Span 5) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col text-left">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-primary block mb-3">
                Our Products
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-navy-primary leading-tight">
                Products We Supply & Install
              </h2>
              <p className="text-xs sm:text-sm text-silver mt-3 font-sans leading-relaxed">
                We recommend, supply, and professionally install the industry&apos;s leading water technologies.
              </p>
            </div>

            {/* List of products */}
            <div className="space-y-4">
              {curatedProducts.map((product, idx) => {
                const benefit = benefitMap[product.id] || product.subtitle;
                const displayCategory = product.category.startsWith("tankless")
                  ? "Tankless Heater"
                  : product.category === "heat-pump"
                  ? "Heat Pump"
                  : "Water Filter";
                const isActive = activeIndex === idx;

                return (
                  <div
                    key={product.id}
                    className={`relative p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-offwhite border-gold-primary/20 shadow-resting"
                        : "bg-transparent border-navy-primary/5 hover:border-gold-primary/10"
                    }`}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                  >
                    {/* Active side-border indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeProductBorder"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gold-primary rounded-l-xl"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    <div className="flex items-start gap-4">
                      <span className={`font-display text-xs font-bold tracking-wider ${isActive ? "text-gold-primary" : "text-silver/60"}`}>
                        0{idx + 1}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-widest text-gold-primary/80 font-bold block">
                          {displayCategory} · {product.brand}
                        </span>
                        <h3 className="font-display text-xs sm:text-sm font-semibold tracking-wide text-navy-primary">
                          {product.title}
                        </h3>
                        <p className={`text-[11px] text-silver leading-relaxed font-sans transition-all duration-300 ${
                          isActive ? "opacity-100 max-h-20 mt-2" : "opacity-0 max-h-0 overflow-hidden"
                        }`}>
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Button */}
            <div className="pt-2">
              <Link href="/products" className="inline-flex items-center gap-3 group">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-navy-primary transition-opacity duration-300 group-hover:opacity-75">
                  View All Products
                </span>
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-gold-primary transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight size={13} className="text-white" strokeWidth={2.5} />
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Dynamic Visual Showcase Canvas (Col Span 7) */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised overflow-hidden">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-offwhite">
                
                {curatedProducts.map((product, idx) => {
                  const image = imageMap[product.id] || "/images/products/dhb-e-18-24.jpg";
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={product.id}
                      className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? "opacity-100 scale-100 z-10 pointer-events-auto"
                          : "opacity-0 scale-105 z-0 pointer-events-none"
                      }`}
                    >
                      <Image
                        src={`${image}?v=2`}
                        alt={product.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={idx === 0}
                      />
                      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-brand/80 via-navy-brand/20 to-transparent pointer-events-none" />

                      {/* Floating details on image */}
                      <div className="absolute bottom-6 left-6 right-6 text-left text-white z-20 space-y-1">
                        <span className="text-[7px] font-bold uppercase tracking-widest text-gold-primary">
                          Featured System
                        </span>
                        <h4 className="font-display text-sm sm:text-base font-medium">
                          {product.title} by {product.brand}
                        </h4>
                        <Link
                          href={`/products/${product.slug}`}
                          className="inline-flex items-center text-[8px] sm:text-[9px] font-bold uppercase tracking-widest text-gold-primary hover:text-white transition-colors pt-1"
                        >
                          Explore technical specifications
                          <ArrowRight size={10} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  );
                })}

                {/* Decorative corners */}
                <div className="absolute -top-px -left-px w-8 h-px bg-gold-primary/30 z-20" />
                <div className="absolute -top-px -left-px w-px h-8 bg-gold-primary/30 z-20" />
                <div className="absolute -bottom-px -right-px w-8 h-px bg-gold-primary/30 z-20" />
                <div className="absolute -bottom-px -right-px w-px h-8 bg-gold-primary/30 z-20" />
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
