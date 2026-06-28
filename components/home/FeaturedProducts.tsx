"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";

export const FeaturedProducts: React.FC = () => {
  // Curate exactly 3 flagship products
  const featuredIds = ["dhb-e-18-24", "wwk-302-h", "fountain-7s"];
  const curatedProducts = products.filter((p) => featuredIds.includes(p.id));

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
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <Container className="relative z-10 max-w-5xl">
        <Reveal>
          <SectionHeader
            tagline="Our Products"
            title="Products We Supply & Install"
            description="We source products from trusted brands and recommend the right one for your home. Every product we supply, we also install and support."
            align="left"
            className="mb-10"
          />
        </Reveal>

        {/* Curated Grid - 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10">
          {curatedProducts.map((product, idx) => {
            const image = imageMap[product.id] || "/images/products/dhb-e-18-24.jpg";
            const benefit = benefitMap[product.id] || product.subtitle;
            const displayCategory = product.category.startsWith("tankless")
              ? "Tankless Heater"
              : product.category === "heat-pump"
              ? "Heat Pump"
              : "Water Filter";

            return (
              <Reveal key={product.id} delay={idx * 0.15}>
                <div className="flex flex-col h-full bg-purewhite border border-navy-primary/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-primary/20 elevation-resting hover:elevation-raised group">
                  {/* Image wrapper */}
                  <div className="relative w-full h-[200px] bg-offwhite border-b border-navy-primary/5 overflow-hidden">
                    <Image
                      src={`${image}?v=2`}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-w-768px) 100vw, 30vw"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#0B2341] dark:bg-[#16171B] text-[#FFFFFF] dark:text-[#F3F4F6] rounded font-sans text-[7px] font-bold uppercase tracking-widest border border-gold-primary/25">
                      {product.brand}
                    </div>
                  </div>

                  {/* Narrative details */}
                  <div className="flex flex-col justify-between flex-grow p-6 text-left space-y-4">
                    <div className="space-y-2">
                      <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold">
                        {displayCategory}
                      </span>
                      <h3 className="font-display text-sm font-semibold tracking-wide text-navy-primary">
                        {product.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-navy-primary/70 font-sans leading-relaxed">
                        {benefit}
                      </p>
                    </div>

                    <Link href={`/products/${product.slug}`} className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-navy-primary transition-colors outline-none group pt-2">
                      <span>View Details</span>
                      <ArrowRight size={12} className="ml-1.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* View All Products CTA */}
        <Reveal delay={0.3} className="text-center">
          <Link href="/products">
            <Button
              variant="primary"
              size="lg"
              className="text-xs uppercase tracking-wider font-bold"
            >
              View All Products
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};
