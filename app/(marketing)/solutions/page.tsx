"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { solutions } from "@/data/solutions";
import { products } from "@/data/products";
import { Sparkles, Home, Building, Hotel, Building2, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Home,
  Building,
  Hotel,
  Building2,
};

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = React.useState<string>("bathrooms");
  const selectedSolution = solutions.find((s) => s.id === activeTab) || solutions[0];

  // Match recommends slugs to full products data
  const recommendedProducts = selectedSolution.recommendations.map((slug) =>
    products.find((p) => p.slug === slug)
  ).filter(Boolean);

  return (
    <div className="relative min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 bg-offwhite">
      <Container className="max-w-5xl">
        {/* Header Block */}
        <div className="text-left max-w-2xl mb-12">
          <Reveal>
            <span className="text-[8px] font-bold tracking-widest text-gold-primary uppercase block mb-3">
              Tailored Integrations
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Bespoke Systems Designed for Your Property
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-silver font-sans leading-relaxed mt-4">
              We design water and heating layouts around your space, flow rates, and occupancy, rather than trying to sell generic hardware. Select your property profile below to review recommended configurations.
            </p>
          </Reveal>
        </div>

        {/* Tab Selector */}
        <div className="border-b border-navy-primary/5 mb-12 overflow-x-auto scrollbar-none flex space-x-2 pb-1">
          {solutions.map((sol) => {
            const Icon = iconMap[sol.icon] || Home;
            const isActive = activeTab === sol.id;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveTab(sol.id)}
                className={cn(
                  "flex items-center space-x-2 px-5 py-3.5 border-b-2 text-[10px] uppercase font-bold tracking-wider transition-all duration-200 shrink-0 outline-none",
                  isActive
                    ? "border-gold-primary text-navy-primary font-bold"
                    : "border-transparent text-silver hover:text-navy-primary"
                )}
              >
                <Icon size={12} className={isActive ? "text-gold-primary" : "text-silver"} />
                <span>{sol.audience}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left Column: Context & Pain Points */}
          <div className="lg:col-span-5 min-w-0 flex flex-col space-y-6">
            <Reveal>
              <h2 className="text-sm font-display font-medium text-navy-primary">
                Why Standard Systems Fail Here
              </h2>
            </Reveal>

            <div className="space-y-4">
              {selectedSolution.problems.map((problem, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="flex gap-4 items-start bg-purewhite p-5 rounded border border-navy-primary/5">
                    <div className="flex items-center justify-center w-5 h-5 rounded bg-gold-muted text-gold-primary font-sans text-[10px] font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-[11px] text-navy-primary leading-relaxed font-sans">
                      {problem}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="bg-navy-primary text-purewhite p-6 rounded border border-gold-muted/30">
                <h3 className="font-display text-xs font-semibold tracking-wide text-gold-primary mb-2">
                  Our Advisory Commitment
                </h3>
                <p className="text-[10px] text-purewhite/70 leading-relaxed font-sans">
                  We don&apos;t manufacture products. Our engineers visit your premises to inspect pressure lines, measure water hardness, analyze power availability, and recommend the correct system setup.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Recommendations & Deep Links */}
          <div className="lg:col-span-7 min-w-0 flex flex-col space-y-6">
            <Reveal>
              <h2 className="text-sm font-display font-medium text-navy-primary">
                Recommended System Components
              </h2>
            </Reveal>

            <div className="space-y-6">
              {recommendedProducts.map((product, idx) => {
                if (!product) return null;
                return (
                  <Reveal key={product.id} delay={idx * 0.15}>
                    <div className="bg-purewhite p-6 rounded border border-navy-primary/5 hover:border-gold-primary/20 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                      <div className="space-y-2 text-left">
                        <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold">
                          {product.brand} &bull; {product.category.replace("-", " ")}
                        </span>
                        <h3 className="font-display text-base font-medium text-navy-primary leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-[11px] text-silver font-sans leading-relaxed max-w-md">
                          {product.subtitle}
                        </p>
                      </div>
                      
                      <Link href={`/products/${product.slug}`} className="shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-[9px] uppercase tracking-wider font-bold"
                        >
                          View Tech Specs
                          <ArrowRight size={10} className="ml-1.5" />
                        </Button>
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* General Action button */}
            <Reveal delay={0.3} className="pt-4">
              <div className="bg-offwhite p-6 rounded border border-gold-primary/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
                <div>
                  <h4 className="font-sans text-xs font-bold text-navy-primary">
                    Ready to blueprint your property?
                  </h4>
                  <p className="text-[10px] text-silver font-sans mt-1">
                    Book an engineering consultation at your convenient time.
                  </p>
                </div>
                <Link href={`/consultation?interest=property-${selectedSolution.id}`}>
                  <Button
                    variant="primary"
                    size="md"
                    className="text-[10px] uppercase font-bold tracking-wider w-full sm:w-auto shrink-0"
                  >
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </div>
  );
}
