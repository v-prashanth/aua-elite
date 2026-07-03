"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

type Solution = {
  id: string;
  label: string;
  sub: string;
  requirements: string[];
};

const SOLUTIONS: Solution[] = [
  {
    id: "kitchen",
    label: "Kitchen & Basins",
    sub: "Instant filtered water, under-sink heaters",
    requirements: ["Kitchen Use"],
  },
  {
    id: "bathroom",
    label: "Single Bathroom",
    sub: "Compact heaters for hand showers and basins",
    requirements: ["Small Bathroom"],
  },
  {
    id: "rain",
    label: "Rain Shower & Luxury Bath",
    sub: "High-flow, temperature-stable systems",
    requirements: ["Rain Shower", "Luxury Bathroom", "Bathtub"],
  },
  {
    id: "villa",
    label: "Villa & Multiple Bathrooms",
    sub: "Centralised heat pumps and thermal loops",
    requirements: ["Large Family Home"],
  },
  {
    id: "hotel",
    label: "Hotel & Commercial",
    sub: "Scalable central systems for high occupancy",
    requirements: ["Hotels & Commercial"],
  },
];

export interface UiProduct {
  id: string;
  slug: string;
  brand: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  requirements: string[];
}

interface UiBrand {
  name: string;
  origin: string;
  note: string;
}

interface ProductsClientProps {
  products: UiProduct[];
  brands: UiBrand[];
}

export function ProductsClient({ products, brands }: ProductsClientProps) {
  const [activeSolution, setActiveSolution] = React.useState<string | null>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);

  const matchedProducts = React.useMemo(() => {
    if (!activeSolution) return [];
    const sol = SOLUTIONS.find((s) => s.id === activeSolution);
    if (!sol) return [];
    return products.filter((p) =>
      sol.requirements.some((r) => p.requirements.includes(r))
    );
  }, [products, activeSolution]);

  const collections = React.useMemo(() => {
    return [
      {
        id: "tankless",
        label: "01",
        title: "Tankless Water Heaters",
        body: "Germany's standard for instantaneous water heating. Delivers uninterrupted hot water the moment a tap opens — no storage, no standby loss, no waiting.",
        image: "/images/products/dhb-e-11-13.jpg",
        href: "/products/dhb-e-11-13-electronic-control",
        models: products.filter((p) => p.category.startsWith("tankless")),
      },
      {
        id: "heat-pump",
        label: "02",
        title: "Heat Pumps",
        body: "Centralized thermal systems engineered for villas and estates. Extracts ambient heat from outdoor air to serve multiple bathrooms with up to 75% energy savings.",
        image: "/images/products/wwk-302-h.jpg",
        href: "/products/wwk-302-h-heat-pump",
        models: products.filter((p) => p.category === "heat-pump"),
      },
      {
        id: "filtration",
        label: "03",
        title: "Drinking Water Purifiers",
        body: "Premium German-engineered ultrafiltration systems. Delivers 100% bacteria-free, pure drinking water directly to your kitchen — operating completely without electricity or wastewater.",
        image: "/images/products/fountain-7s.jpg",
        href: "/products/fountain-7s-water-filter",
        models: products.filter((p) => p.category === "water-filter"),
      },
    ];
  }, [products]);

  function handleSelect(id: string) {
    if (activeSolution === id) {
      setActiveSolution(null);
    } else {
      setActiveSolution(id);
      setTimeout(() => {
        drawerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
    }
  }

  return (
    <div className="min-h-screen bg-offwhite font-sans">
      {/* HERO */}
      <section className="bg-navy-dark text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-28 md:py-36">
          <div className="max-w-2xl">
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-6">
                Water Heating & Treatment · Hyderabad
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-medium leading-[1.12] tracking-tight text-white mb-8">
                Not every system <br className="hidden sm:block" />
                fits every property.
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[13px] sm:text-[15px] text-white/55 leading-relaxed max-w-lg font-sans font-normal mb-10">
                We visit your site, measure your requirements, and recommend
                the exact system — sized correctly, installed properly, and
                supported long-term.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <Link href="/consultation">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-gold-primary text-navy-brand px-7 py-3.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
                >
                  Book a Site Visit
                  <ArrowRight size={13} strokeWidth={2.5} />
                </motion.button>
              </Link>
            </Reveal>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* FIND YOUR SOLUTION */}
      <section id="solutions" className="pt-20 pb-16 md:pb-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                Find Your Solution
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight">
                What are you solving for?
              </h2>
            </Reveal>
          </div>

          <div className="border-t border-navy-primary/10">
            {SOLUTIONS.map((sol, i) => {
              const isActive = activeSolution === sol.id;
              return (
                <React.Fragment key={sol.id}>
                  <Reveal delay={i * 0.05}>
                    <button
                      onClick={() => handleSelect(sol.id)}
                      className={cn(
                        "w-full text-left border-b border-navy-primary/10 group transition-all duration-300 outline-none",
                        "grid grid-cols-[1fr_auto] items-center gap-4",
                        "py-5 md:py-6 px-0",
                        isActive ? "bg-transparent" : "hover:bg-navy-primary/[0.02]"
                      )}
                    >
                      <div className="flex items-baseline gap-5 md:gap-8">
                        <span className={cn(
                          "font-display text-[11px] font-bold tabular-nums transition-colors duration-300 w-5 shrink-0",
                          isActive ? "text-gold-primary" : "text-navy-primary/25 group-hover:text-gold-primary/60"
                        )}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <span className={cn(
                            "font-display text-[1.1rem] sm:text-[1.3rem] md:text-[1.5rem] font-medium tracking-tight transition-colors duration-300 block",
                            isActive ? "text-navy-primary" : "text-navy-primary/75 group-hover:text-navy-primary"
                          )}>
                            {sol.label}
                          </span>
                          <span className={cn(
                            "text-[11px] font-sans transition-colors duration-300 block mt-0.5",
                            isActive ? "text-silver" : "text-silver/60 group-hover:text-silver"
                          )}>
                            {sol.sub}
                          </span>
                        </div>
                      </div>
                      <div className={cn(
                        "w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 shrink-0",
                        isActive
                          ? "border-navy-primary bg-navy-primary text-white rotate-45"
                          : "border-navy-primary/20 text-navy-primary/40 group-hover:border-navy-primary/50 group-hover:text-navy-primary"
                      )}>
                        <ArrowRight size={12} strokeWidth={2} />
                      </div>
                    </button>
                  </Reveal>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        ref={drawerRef}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="py-8 px-0 md:pl-[52px]">
                          <div className="flex items-center justify-between mb-6">
                            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold">
                              Recommended for {sol.label}
                            </p>
                            <button
                              onClick={() => setActiveSolution(null)}
                              className="text-[9px] uppercase tracking-wider font-bold text-navy-primary/40 hover:text-navy-primary flex items-center gap-1.5 transition-colors"
                            >
                              <X size={10} /> Close
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {matchedProducts.map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-navy-primary/6 hover:border-gold-primary/30 hover:shadow-raised transition-all duration-300"
                              >
                                <div className="relative w-12 h-16 shrink-0 rounded bg-[#F2F3F5] overflow-hidden">
                                  {product.image ? (
                                    <Image
                                      src={product.image}
                                      alt={product.title}
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-navy-primary/5 text-navy-primary/10">
                                      ?
                                    </div>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block mb-0.5">
                                    {product.brand}
                                  </span>
                                  <h3 className="font-display text-[13px] font-semibold text-navy-primary truncate">
                                    {product.title}
                                  </h3>
                                  <p className="text-[10px] text-silver line-clamp-1 mt-0.5 font-sans">
                                    {product.subtitle}
                                  </p>
                                </div>
                                <ArrowUpRight
                                  size={14}
                                  className="shrink-0 text-navy-primary/20 group-hover:text-gold-primary transition-colors duration-200"
                                />
                              </Link>
                            ))}
                          </div>

                          {matchedProducts.length === 0 && (
                            <p className="text-sm text-silver">
                              No specific products matched. Book a consultation — we&apos;ll size it for you.
                            </p>
                          )}

                          <div className="mt-6">
                            <Link href={`/consultation?requirement=${sol.id}`}>
                              <motion.button
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 bg-navy-primary text-purewhite px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] hover:bg-gold-primary hover:text-navy-brand transition-colors duration-300"
                              >
                                Get a Custom Recommendation
                                <ArrowRight size={12} />
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="py-20 md:py-28 bg-purewhite border-t border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                System Architecture
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight">
                Three categories of solution
              </h2>
            </Reveal>
          </div>

          <div className="space-y-24 md:space-y-32">
            {collections.map((col, idx) => (
              <Reveal key={col.id} delay={idx * 0.1}>
                <div
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center",
                    idx % 2 === 1 ? "lg:[direction:rtl]" : ""
                  )}
                >
                  <div className={cn(
                    "relative rounded-2xl overflow-hidden bg-offwhite border border-navy-primary/5 aspect-[4/3] group",
                    idx % 2 === 1 ? "lg:[direction:ltr]" : ""
                  )}>
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-5 left-5">
                      <span className="font-display text-[10px] font-bold text-navy-primary/30 uppercase tracking-[0.2em]">
                        {col.label}
                      </span>
                    </div>
                  </div>

                  <div className={cn(idx % 2 === 1 ? "lg:[direction:ltr]" : "")}>
                    <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-4">
                      {col.label} / {col.title}
                    </p>
                    <h3 className="font-display text-[1.8rem] sm:text-[2.2rem] font-medium text-navy-primary leading-tight tracking-tight mb-5">
                      {col.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-silver leading-relaxed mb-8 max-w-md font-sans">
                      {col.body}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {col.models.map((m) => (
                        <Link
                          key={m.id}
                          href={`/products/${m.slug}`}
                          className="px-3 py-1.5 rounded-full border border-navy-primary/12 text-[10px] font-sans font-semibold text-navy-primary/65 hover:border-gold-primary/40 hover:text-navy-primary hover:bg-gold-primary/5 transition-all duration-200"
                        >
                          {m.title}
                        </Link>
                      ))}
                    </div>

                    <Link href={col.href}>
                      <motion.button
                        whileHover={{ x: 3 }}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-primary hover:text-gold-primary transition-colors duration-200 group"
                      >
                        View Details
                        <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section id="brands" className="py-20 md:py-28 bg-offwhite border-t border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl mb-14 text-left">
            <Reveal>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                Independent Advisory
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight mb-4">
                Brands we work with
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="text-[13px] text-silver leading-relaxed font-sans">
                We are not tied to any single manufacturer. We recommend based on
                your property&apos;s requirements — nothing else.
              </p>
            </Reveal>
          </div>

          <div className="divide-y divide-navy-primary/8">
            {brands.map((brand, i) => (
              <Reveal key={brand.name} delay={i * 0.05}>
                <div
                  className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 md:gap-8 items-baseline group text-left"
                >
                  <span className="font-display text-[1.25rem] sm:text-[1.45rem] font-medium text-navy-primary tracking-tight">
                    {brand.name}
                  </span>
                  <span className="text-[11px] text-silver/70 font-sans uppercase tracking-wider font-medium">
                    {brand.origin}
                  </span>
                  <span className="text-[12px] text-silver font-sans leading-relaxed max-w-xs md:text-right">
                    {brand.note}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 md:py-32 bg-navy-dark text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-5">
              Ready to proceed?
            </p>
            <h2 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-medium text-white leading-tight tracking-tight mb-6">
              Tell us about your property.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed mb-10 font-sans max-w-md">
              We&apos;ll schedule a site visit, audit your electrical panel and
              water supply, and recommend the exact system — with a written
              sizing report included.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-gold-primary text-navy-brand px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
                >
                  Book a Site Visit
                  <ArrowRight size={13} strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 border border-white/20 text-white/80 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] hover:border-white/50 hover:text-white transition-all duration-300"
                >
                  Call Us First
                  </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
