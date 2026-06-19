"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { products, Product } from "@/data/products";
import { Settings, Info, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [checkoutProduct, setCheckoutProduct] = React.useState<Product | null>(null);

  const categories = [
    { id: "all", name: "All Systems" },
    { id: "tankless", name: "Tankless Heaters" },
    { id: "heat-pump", name: "Thermal Heat Pumps" },
    { id: "water-softener", name: "Water Softeners" }
  ];

  const filteredProducts = activeTab === "all"
    ? products
    : products.filter((p) => p.category === activeTab);

  // Map products to appropriate showcase images
  const imageMap: Record<string, string> = {
    "dhb-e-11-13": "/images/solutions_tankless.png",
    "dhb-e-18-24": "/images/solutions_tankless.png",
    "dhb-e-27": "/images/solutions_tankless.png",
    "hpa-o-300-l": "/images/solutions_heatpump.png",
    "ae-softflow-pro": "/images/solutions_softener.png",
  };

  const handleRequestSizing = (product: Product) => {
    setCheckoutProduct(product);
  };

  return (
    <div className="relative min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 bg-offwhite">
      <Container className="max-w-5xl">
        {/* Page Header */}
        <div className="text-left max-w-2xl mb-12">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary block mb-3">
              Catalog Showroom
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Premium System Components
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-navy-primary/70 font-sans leading-relaxed mt-4">
              Explore our curated selection of high-capacity water systems. From compact German tankless configurations to whole-villa softening lines, each component supports our consultation-first architecture.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="border-b border-navy-primary/5 mb-12 flex space-x-2 overflow-x-auto scrollbar-none pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={cn(
                "px-5 py-3.5 border-b-2 text-[10px] uppercase font-bold tracking-wider transition-all duration-200 shrink-0 outline-none",
                activeTab === cat.id
                  ? "border-gold-primary text-navy-primary font-bold"
                  : "border-transparent text-silver hover:text-navy-primary"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Brand Showcase Block (Equal treatment) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Reveal>
            <div className="p-6 bg-purewhite border border-navy-primary/5 rounded-lg flex flex-col justify-between h-full text-left">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-1">Germany ● Est. 1924</span>
                <h3 className="font-display font-bold text-sm text-navy-primary uppercase tracking-wider mb-2">Stiebel Eltron</h3>
                <p className="text-[11px] text-navy-primary/70 leading-relaxed font-sans">
                  Precision engineered instantaneous water heaters and central air-source heat pumps built for durability, efficiency, and scale.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="p-6 bg-purewhite border border-navy-primary/5 rounded-lg flex flex-col justify-between h-full text-left">
              <div>
                <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-1">India ● Est. 2022</span>
                <h3 className="font-display font-bold text-sm text-navy-primary uppercase tracking-wider mb-2">Aqua Elite Solutions</h3>
                <p className="text-[11px] text-navy-primary/70 leading-relaxed font-sans">
                  Automated softeners and smart whole-villa pre-filtration lines designed specifically to mitigate Hyderabad&apos;s borewell water hardness.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredProducts.map((product, idx) => {
            const image = imageMap[product.id] || "/images/solutions_tankless.png";
            return (
              <Reveal key={product.id} delay={idx * 0.1}>
                <div className="flex flex-col h-full bg-purewhite border border-navy-primary/5 rounded-lg overflow-hidden transition-all duration-300 hover:border-gold-primary/20 elevation-resting hover:elevation-raised text-left">
                  {/* Image banner */}
                  <div className="relative w-full h-[220px] bg-offwhite border-b border-navy-primary/5">
                    <Image
                      src={image}
                      alt={product.title}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 30vw"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-navy-primary text-purewhite rounded font-sans text-[8px] font-bold uppercase tracking-widest border border-gold-primary/20">
                      {product.brand}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-col justify-between flex-grow p-6 space-y-6">
                    <div className="space-y-3">
                      <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold">
                        {product.category.replace("-", " ")}
                      </span>
                      <h3 className="font-display text-sm font-semibold tracking-wide text-navy-primary">
                        {product.title}
                      </h3>
                      <p className="text-[10px] sm:text-xs text-navy-primary/70 font-sans leading-relaxed">
                        {product.subtitle}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Technical specifications preview */}
                      <div className="bg-offwhite p-3 rounded border border-navy-primary/5">
                        <span className="text-[8px] font-bold tracking-widest text-navy-primary/60 uppercase block mb-1">Key Parameter</span>
                        <span className="text-[10px] text-navy-primary font-medium font-sans">
                          {product.category === "tankless" && `Power Load: ${product.specifications["Rated Output"] || "11-27 kW"}`}
                          {product.category === "heat-pump" && `Cylinder Volume: ${product.specifications["Cylinder Capacity"] || "300 Liters"}`}
                          {product.category === "water-softener" && `Flow Rate: ${product.specifications["Flow Rate Capacity"] || "2.5 m³/hour"}`}
                        </span>
                      </div>

                      {/* Dynamic CTA stack */}
                      <div className="flex gap-2">
                        <Link href={`/products/${product.slug}`} className="flex-1">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-center text-[9px] uppercase tracking-wider font-bold"
                          >
                            <Info size={10} className="mr-1.5" />
                            Details
                          </Button>
                        </Link>
                        
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleRequestSizing(product)}
                          className="flex-1 justify-center text-[9px] uppercase tracking-wider font-bold"
                        >
                          <Settings size={10} className="mr-1.5" />
                          Request Sizing
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {/* Future-Ready Checkout Overlay Modal */}
      {checkoutProduct && (
        <div className="fixed inset-0 z-50 bg-navy-primary/40 backdrop-blur-md flex items-center justify-center p-4">
          <Reveal className="bg-purewhite border border-gold-primary/20 rounded-lg max-w-md w-full p-6 sm:p-8 text-left shadow-floating relative">
            <h3 className="font-display text-base font-semibold text-navy-primary mb-3">
              Sizing Assessment &mdash; {checkoutProduct.title}
            </h3>
            
            <p className="text-xs text-navy-primary/70 font-sans leading-relaxed mb-6">
              To guarantee performance, this system requires a phase calculation and plumbing sizing audit before purchase. Sizing reviews will occur automatically during consultation.
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
              <Link href={`/consultation?interest=${checkoutProduct.slug}`} className="flex-1">
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
                onClick={() => setCheckoutProduct(null)}
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
