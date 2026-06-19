"use client";

import * as React from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { products } from "@/data/products";
import { faqs } from "@/data/faqs";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronDown, ArrowRight, AlertCircle, ShoppingCart, Check } from "lucide-react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductTechBlueprint } from "@/components/products/ProductTechBlueprint";

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = React.useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

  const product = products.find(
    (p) => p.slug === params.slug || p.id === params.slug
  );

  if (!product) {
    notFound();
  }

  const toggleFAQ = (id: string) => {
    setOpenFAQ((prev) => (prev === id ? null : id));
  };

  const matchedFAQs = faqs.filter((faq) => {
    if (product.category === "tankless" && (faq.category === "Electrical" || faq.category === "Water Hardness" || faq.category === "Technology")) {
      return true;
    }
    if (product.category === "heat-pump" && faq.category === "Technology") {
      return true;
    }
    if (product.category === "water-softener" && faq.category === "Water Hardness") {
      return true;
    }
    return false;
  });

  return (
    <div className="relative min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 bg-offwhite text-left">
      {/* 1. Large Image / Product Hero */}
      <section className="pb-12" aria-label="Product Hero Showcase">
        <Container className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full">
          <div className="lg:col-span-7 min-w-0 w-full h-[260px] sm:h-[360px] lg:h-[420px] relative rounded-lg overflow-hidden border border-navy-primary/5 bg-purewhite p-6 flex items-center justify-center">
            <ProductGallery 
              title={product.title}
              category={product.category}
              status={product.status}
              brand={product.brand}
              colors={product.galleryColors || ["#F7F8FA"]} 
            />
          </div>
          
          <div className="lg:col-span-5 min-w-0 flex flex-col text-left space-y-5">
            <Reveal>
              <span className="text-[8px] font-bold tracking-widest text-gold-primary uppercase block">
                {product.brand} &bull; Curated Sizing Selection
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="text-xl sm:text-2xl font-display font-medium tracking-tight text-navy-primary leading-tight">
                {product.title}
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xs sm:text-sm text-silver font-sans leading-relaxed">
                {product.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => router.push(`/consultation?interest=${product.slug}`)}
                  className="flex-1 justify-center text-xs uppercase tracking-wider font-bold"
                >
                  Verify Integration Specs
                </Button>
                
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="justify-center text-xs uppercase tracking-wider font-bold border-navy-primary/20 hover:border-gold-primary hover:bg-purewhite/5 text-navy-primary"
                >
                  <ShoppingCart size={12} className="mr-1.5" />
                  Buy Component
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 2. Overview */}
      <section className="py-12 md:py-16 bg-purewhite border-y border-navy-primary/5" aria-label="Product Overview">
        <Container className="max-w-3xl text-left">
          <Reveal>
            <h2 className="text-xs uppercase tracking-wider text-gold-primary font-bold mb-4 font-sans">
              System Overview
            </h2>
            <p className="text-xs sm:text-sm text-navy-primary leading-relaxed font-sans text-balance">
              {product.overview}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3. Best Suited For (Callout Block) */}
      <section className="py-8 md:py-12 bg-offwhite" aria-label="System Suitability">
        <Container className="max-w-3xl text-left">
          <Reveal>
            <div className="flex gap-4 items-start p-6 border border-gold-primary/20 rounded-md bg-purewhite">
              <div className="p-2 border border-gold-primary/10 rounded-md bg-offwhite">
                <AlertCircle className="w-5 h-5 text-gold-primary" />
              </div>
              <div>
                <h3 className="font-sans text-xs font-bold text-navy-primary mb-2">
                  Best Suited For
                </h3>
                <p className="text-[11px] sm:text-xs text-silver leading-relaxed font-sans font-medium">
                  {product.bestSuited}
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 4. Benefits (Before Specifications) */}
      <section className="py-12 md:py-16 bg-purewhite border-t border-navy-primary/5" aria-label="Benefits">
        <Container className="max-w-3xl text-left">
          <Reveal>
            <h2 className="text-xs uppercase tracking-wider text-gold-primary font-bold mb-8 font-sans">
              Key Integration Benefits
            </h2>
          </Reveal>

          <div className="space-y-6">
            {product.benefits.map((benefit, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gold-primary/10 text-gold-primary font-sans text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-[11px] sm:text-xs text-navy-primary leading-relaxed font-sans">
                    {benefit}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Specifications */}
      <section className="py-12 md:py-16 bg-offwhite border-t border-navy-primary/5" aria-label="Specifications">
        <Container className="max-w-3xl text-left">
          <Reveal>
            <h2 className="text-xs uppercase tracking-wider text-gold-primary font-bold mb-8 font-sans">
              Technical Specifications
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-navy-primary/5 rounded-md overflow-hidden bg-purewhite">
              <table className="w-full text-left font-sans text-[11px]">
                <tbody>
                  {Object.entries(product.specifications).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? "bg-offwhite/50" : "bg-purewhite"}>
                      <td className="px-6 py-4 font-bold text-navy-primary w-1/3 border-b border-navy-primary/5">{key}</td>
                      <td className="px-6 py-4 text-silver border-b border-navy-primary/5">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 6. Technical Blueprint Gallery */}
      {product.techBlueprint && (
        <section className="py-12 md:py-20 bg-purewhite border-y border-navy-primary/5" aria-label="Interactive Blueprint">
          <Container className="max-w-4xl text-center">
            <Reveal>
              <SectionHeader
                tagline="Engineering Details"
                title="Bespoke System Schematic Layout"
                description="Hover over hotspots to understand internal components, safety limits, and technical configurations."
                align="center"
                className="mb-12"
              />
            </Reveal>
            
            <Reveal delay={0.1}>
              <div className="border border-navy-primary/5 rounded-lg bg-offwhite p-6 max-w-2xl mx-auto">
                <ProductTechBlueprint blueprint={product.techBlueprint} category={product.category} />
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* 7. Matched Product FAQs */}
      {matchedFAQs.length > 0 && (
        <section className="py-12 md:py-20 bg-offwhite" aria-label="Frequently Asked Questions">
          <Container className="max-w-3xl text-left">
            <Reveal>
              <SectionHeader
                tagline="Help & Guidance"
                title="FAQ Regarding This Solution"
                description="Short, simple answers to help you understand plumbing and electrical parameters."
                align="left"
                className="mb-12"
              />
            </Reveal>

            <div className="space-y-4">
              {matchedFAQs.slice(0, 4).map((faq) => {
                const isOpen = openFAQ === faq.id;
                return (
                  <Reveal key={faq.id}>
                    <div className="border border-navy-primary/5 rounded-md overflow-hidden bg-purewhite">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left font-display text-sm font-semibold tracking-wide text-navy-primary hover:text-gold-primary transition-colors outline-none focus-visible:text-gold-primary"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          size={16}
                          className={`text-gold-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6 pt-2 border-t border-navy-primary/5">
                          <p className="text-[11px] text-silver leading-relaxed font-sans">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* 8. Book Consultation (Final CTA) */}
      <section className="py-12 md:py-16 bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] border-t border-gold-primary/20" aria-label="Request Site Audit">
        <Container className="max-w-2xl text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-display font-medium tracking-tight mb-4 text-balance">
              Interested in integrating this system?
            </h2>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/70 dark:text-[#F3F4F6]/70 mb-10 leading-relaxed font-sans text-balance">
              Let our Jubilee Hills technicians inspect your space and design the correct piping and phase layout for your property.
            </p>
            <Link href={`/consultation?interest=${product.slug}`}>
              <Button
                variant="primary"
                size="lg"
                className="text-xs sm:text-sm font-semibold px-8 py-3.5 bg-gold-primary text-navy-primary hover:bg-gold-primary/95 rounded-full"
              >
                Schedule Site Audit
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* Future-Ready Checkout Overlay Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 bg-navy-primary/40 backdrop-blur-md flex items-center justify-center p-4">
          <Reveal className="bg-purewhite border border-gold-primary/20 rounded-lg max-w-md w-full p-6 sm:p-8 text-left shadow-floating relative">
            <h3 className="font-display text-base font-semibold text-navy-primary mb-3">
              Direct Order &mdash; {product.title}
            </h3>
            
            <p className="text-xs text-silver font-sans leading-relaxed mb-6">
              To guarantee performance, this system requires a phase calculation and plumbing sizing audit before purchase. 
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 bg-offwhite p-4 rounded border border-navy-primary/5">
                <Check className="w-4 h-4 text-gold-primary shrink-0 mt-0.5" />
                <p className="text-[10px] text-navy-primary font-medium font-sans">
                  Online transaction pipeline is ready. Sizing reviews will occur automatically during consultation.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/consultation?interest=${product.slug}`} className="flex-1">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center text-[10px] uppercase font-bold tracking-wider"
                >
                  Schedule Sizing Audit
                </Button>
              </Link>
              <Button
                variant="outline"
                size="md"
                onClick={() => setIsCheckoutOpen(false)}
                className="w-full sm:w-auto justify-center text-[10px] uppercase font-bold tracking-wider"
              >
                Cancel
              </Button>
            </div>
          </Reveal>
        </div>
      )}
    </div>
  );
}
