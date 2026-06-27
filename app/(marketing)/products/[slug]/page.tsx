"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!product) {
    notFound();
  }

  const isGerman = product.specifications["Country of Origin"] === "Germany" || 
                   product.overview.toLowerCase().includes("germany") || 
                   product.overview.toLowerCase().includes("german");

  // Define the set of possible use cases and their applicability
  const allUseCases = [
    {
      name: "Kitchen",
      applies: product.requirements.includes("Kitchen Use") || product.showerUse === "Kitchen Sink" || product.category === "water-filter",
      label: "Concealed under-sink kitchen tap & purity systems."
    },
    {
      name: "Apartment",
      applies: product.category === "tankless-1ph" || product.category === "water-filter" || product.requirements.includes("Small Bathroom"),
      label: "Optimized for single-phase electrical and compact spaces."
    },
    {
      name: "Standard Shower",
      applies: product.requirements.includes("Small Bathroom") || product.showerUse === "Small Shower" || product.showerUse === "Basic Hand Shower",
      label: "Provides stable hot water for hand showers and individual bathrooms."
    },
    {
      name: "Rain Shower",
      applies: product.requirements.includes("Rain Shower") || product.requirements.includes("Luxury Bathroom") || product.showerUse?.includes("Rain Shower") || product.showerUse?.includes("Body Jets"),
      label: "Sized for high-flow overhead rain domes and multi-outlet flow."
    },
    {
      name: "Villa",
      applies: product.category === "heat-pump" || product.category === "tankless-3ph" || product.requirements.includes("Large Family Home") || product.requirements.includes("Hotels & Commercial"),
      label: "Centralized loop or high-capacity system integration."
    },
    {
      name: "Hotel",
      applies: product.requirements.includes("Hotels & Commercial") || product.category === "heat-pump" || product.title.includes("27"),
      label: "Sized for high-occupancy commercial and hospitality demands."
    },
    {
      name: "Bathtub",
      applies: product.requirements.includes("Bathtub") || product.showerUse?.includes("Tubs") || product.title.includes("27"),
      label: "High-kilowatt rapid filling capacity for soaking tubs."
    }
  ];

  // ONLY show applicable items based on Excel data as requested
  const applicableUseCases = allUseCases.filter(u => u.applies);

  const displayCategory = product.category.startsWith("tankless")
    ? "Tankless Water Heater"
    : product.category === "heat-pump"
    ? "Centralized Heat Pump"
    : "Water Treatment Purifier";

  return (
    <div className="relative min-h-screen bg-offwhite text-left font-sans pb-24 selection:bg-gold-primary/10">
      
      {/* ABOVE THE FOLD: Two-Column Layout */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-purewhite border-b border-navy-primary/5">
        <Container className="max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Large Product Image (Uncropped portrait geyser in studio Stage) */}
            <div className="lg:col-span-6 relative w-full h-[320px] sm:h-[420px] rounded-2xl bg-gradient-to-b from-offwhite to-purewhite border border-navy-primary/5 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,0,0,0.1)_95%)] bg-[size:100%_12px]" />
              <div className="relative w-40 h-[280px] sm:w-48 sm:h-[360px] flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 80vw, 40vw"
                  priority
                />
              </div>
            </div>

            {/* Right: Premium Information */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold border border-gold-primary/20 px-2 py-0.5 rounded bg-offwhite">
                  {product.brand} &bull; Sized & Verified
                </span>
                
                {isGerman && (
                  <span className="text-[8px] uppercase tracking-widest font-bold bg-navy-primary/5 text-navy-primary px-2 py-0.5 rounded">
                    Made in Germany
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-silver font-bold block">
                  {displayCategory}
                </span>
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-navy-primary leading-tight">
                  {product.title}
                </h1>
                <p className="text-xs sm:text-sm text-silver leading-relaxed font-sans font-medium text-balance">
                  {product.subtitle}
                </p>
              </div>

              {/* Short Explanation */}
              <div className="space-y-4 text-xs text-silver font-sans leading-relaxed text-balance">
                <p>{product.overview}</p>
              </div>

              {/* Suitable Applications Statement */}
              <div className="p-5 border border-gold-primary/15 rounded-xl bg-offwhite space-y-2">
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                  Suitable Application
                </span>
                <p className="text-[11px] sm:text-xs text-navy-primary font-sans leading-relaxed">
                  {product.bestSuited}
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href={`/consultation?interest=${product.slug}`} className="flex-grow">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center text-xs font-bold uppercase tracking-wider px-8 py-3.5 bg-navy-primary text-purewhite hover:bg-gold-primary hover:text-navy-brand rounded-full border-transparent"
                  >
                    Book Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
                
                <Link href={`/consultation?interest=${product.slug}&action=enquiry`} className="flex-grow">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full justify-center text-xs font-bold uppercase tracking-wider px-8 py-3.5 border-navy-primary/15 text-navy-primary hover:border-navy-primary rounded-full bg-purewhite"
                  >
                    Enquire Now
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* SECTION 2 — PERFECT FOR (Only applicable items shown) */}
      <section className="py-20 bg-offwhite border-b border-navy-primary/5" id="suitability">
        <Container className="max-w-4xl">
          <Reveal>
            <div className="mb-12 space-y-3 text-left">
              <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                Engineering Sizing
              </span>
              <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                Perfect For
              </h2>
              <p className="text-[11px] sm:text-xs text-silver leading-relaxed">
                This specific model is sized, verified, and recommended for the following applications:
              </p>
            </div>
          </Reveal>

          {/* Sizing Grid showing ONLY applicable use cases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {applicableUseCases.map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-xl border bg-purewhite border-gold-primary/20 text-navy-primary shadow-resting flex flex-col justify-between min-h-[110px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-gold-primary">
                    Sized & Verified
                  </span>
                  <Check size={12} className="text-gold-primary" />
                </div>
                <div>
                  <h3 className="font-display text-xs font-semibold uppercase tracking-wide">
                    {item.name}
                  </h3>
                  <span className="text-[9px] font-sans text-silver block mt-0.5">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 3 — WHY CUSTOMERS CHOOSE THIS (Max 4 reasons) */}
      <section className="py-20 bg-purewhite border-b border-navy-primary/5" id="benefits">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="mb-16 space-y-3 text-left">
              <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                Performance highlights
              </span>
              <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                Why Customers Choose This
              </h2>
            </div>
          </Reveal>

          {/* Up to 4 reasons, premium icon-based, large spacing */}
          <div className="space-y-12 text-left">
            {product.benefits.slice(0, 4).map((benefit, idx) => (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="flex gap-6 items-start">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gold-primary/10 text-gold-primary font-display text-xs font-bold shrink-0 mt-0.5">
                    0{idx + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-navy-primary leading-relaxed font-sans">
                      {benefit}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4 — KEY SPECIFICATIONS (Compact Layout) */}
      <section className="py-20 bg-offwhite border-b border-navy-primary/5" id="specifications">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="mb-12 space-y-3 text-left">
              <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                Technical Specifications
              </span>
              <h2 className="font-display text-lg sm:text-xl font-medium text-navy-primary">
                Key Specifications
              </h2>
              <p className="text-[11px] sm:text-xs text-silver">
                Essential engineering parameters required for safe integration with your Hyderabad property.
              </p>
            </div>
          </Reveal>

          {/* Compact specifications rows */}
          <Reveal delay={0.05}>
            <div className="border border-navy-primary/5 rounded-xl overflow-hidden bg-purewhite shadow-resting">
              <table className="w-full text-left font-sans text-[11px] border-collapse">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr 
                      key={key} 
                      className={cn(
                        "border-b border-navy-primary/5 last:border-0",
                        idx % 2 === 0 ? "bg-offwhite/50" : "bg-purewhite"
                      )}
                    >
                      <td className="px-6 py-4 font-bold text-navy-primary w-1/3 border-r border-navy-primary/5 uppercase text-[9px] tracking-wider">{key}</td>
                      <td className="px-6 py-4 text-silver font-medium">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* SECTION 5 — NEED HELP CHOOSING? (Stop page here) */}
      <section className="py-20 bg-navy-dark text-white border-t border-gold-primary/20" id="consult-cta">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <div className="space-y-6">
              <h2 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-white leading-snug">
                Need Help Sizing Your System?
              </h2>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-sans max-w-md mx-auto text-balance">
                Every property has a unique cabling layout and hot water demand. Speak with a technical specialist today to plan a customized, zero-fault sizing.
              </p>
              <div className="pt-4">
                <Link href="/consultation">
                  <Button
                    variant="primary"
                    size="lg"
                    className="text-xs font-bold uppercase tracking-wider px-8 py-3.5 bg-gold-primary text-navy-brand hover:bg-gold-primary/95 border-transparent rounded-full"
                  >
                    Book Consultation
                    <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

    </div>
  );
}
