"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Layers } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Reveal } from "@/components/ui/Reveal";
import { products } from "@/data/products";
import { comparisons } from "@/data/comparisons";
import { faqs } from "@/data/faqs";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { revealMask, rippleHover } from "@/lib/animations";

export default function DesignTest() {
  const [activeTab, setActiveTab] = React.useState<"products" | "comparisons" | "faqs" | "solutions" | "projects">("products");

  return (
    <div className="bg-offwhite min-h-screen py-12">
      <Container>
        {/* Intro */}
        <div className="border-b border-navy-primary/10 pb-8 mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold-primary mb-2 block">
            System Checkpoint
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-medium text-navy-primary mb-3">
            Design & Motion System Playground
          </h1>
          <p className="text-sm text-silver max-w-xl">
            This route verifies that the design tokens, fonts, glass presets, button matrix, and dynamic motion elements align with the premium engineering constitution of Aqua Elite.
          </p>
        </div>

        {/* Section 1: Colors */}
        <section className="mb-16">
          <SectionHeader
            title="Color System Swatches"
            tagline="Token Color Palette"
            description="Our palette centers on deep navy surfaces, warm off-white backgrounds, and sparse champagne gold details. Pure black or clinical white surfaces are restricted."
            align="left"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mt-6">
            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-navy-primary rounded-md border border-navy-primary/10 flex items-end p-2 text-purewhite text-[10px] font-sans font-bold">
                #0B2341
              </div>
              <span className="text-xs font-semibold text-navy-primary">Navy Primary</span>
              <span className="text-[10px] text-silver">Background & Text</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-navy-dark rounded-md border border-navy-primary/10 flex items-end p-2 text-purewhite text-[10px] font-sans font-bold">
                #0F2D52
              </div>
              <span className="text-xs font-semibold text-navy-primary">Navy Dark</span>
              <span className="text-[10px] text-silver">Card Surface</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-navy-light rounded-md border border-navy-primary/10 flex items-end p-2 text-purewhite text-[10px] font-sans font-bold">
                #15396B
              </div>
              <span className="text-xs font-semibold text-navy-primary">Navy Light</span>
              <span className="text-[10px] text-silver">Hover Layering</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-gold-primary rounded-md border border-navy-primary/10 flex items-end p-2 text-navy-primary text-[10px] font-sans font-bold">
                #C9A54C
              </div>
              <span className="text-xs font-semibold text-navy-primary">Champagne Gold</span>
              <span className="text-[10px] text-silver">Primary Accent</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-offwhite rounded-md border border-navy-primary/10 flex items-end p-2 text-navy-primary text-[10px] font-sans font-bold">
                #F7F8FA
              </div>
              <span className="text-xs font-semibold text-navy-primary">Off-White</span>
              <span className="text-[10px] text-silver">Global Surface 0</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-purewhite rounded-md border border-navy-primary/10 flex items-end p-2 text-navy-primary text-[10px] font-sans font-bold">
                #FFFFFF
              </div>
              <span className="text-xs font-semibold text-navy-primary">Pure White</span>
              <span className="text-[10px] text-silver">Content Highlights</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-silver rounded-md border border-navy-primary/10 flex items-end p-2 text-purewhite text-[10px] font-sans font-bold">
                #8A94A6
              </div>
              <span className="text-xs font-semibold text-navy-primary">Silver / Grey</span>
              <span className="text-[10px] text-silver">Secondary Details</span>
            </div>

            <div className="flex flex-col space-y-2">
              <div className="h-24 w-full bg-water rounded-md border border-navy-primary/10 flex items-end p-2 text-purewhite text-[10px] font-sans font-bold">
                #2E6F95
              </div>
              <span className="text-xs font-semibold text-navy-primary">Water Blue</span>
              <span className="text-[10px] text-silver">Flow Animation ONLY</span>
            </div>
          </div>
        </section>

        {/* Section 2: Typography */}
        <section className="mb-16">
          <SectionHeader
            title="Typography Hierarchy & Scale"
            tagline="Fraunces & Inter"
            description="Our typography is strictly dual-font: Fraunces (Display Serif) for confident headlines, and Inter (Geometric Sans) for readable UI elements, navigation, and body copy."
            align="left"
          />
          <div className="border border-navy-primary/10 rounded-lg p-6 bg-purewhite space-y-6">
            <div className="border-b border-navy-primary/5 pb-4">
              <span className="text-xs text-silver block mb-1">text-7xl - Display Headline (Fraunces)</span>
              <h2 className="text-7xl font-display font-medium text-navy-primary tracking-tight">
                Comfort. Trust. Precision.
              </h2>
            </div>
            <div className="border-b border-navy-primary/5 pb-4">
              <span className="text-xs text-silver block mb-1">text-5xl - Headline Large (Fraunces)</span>
              <h3 className="text-5xl font-display font-medium text-navy-primary tracking-tight">
                German Engineering, Purely Premium.
              </h3>
            </div>
            <div className="border-b border-navy-primary/5 pb-4">
              <span className="text-xs text-silver block mb-1">text-3xl - Sub-section Headline (Fraunces)</span>
              <h4 className="text-3xl font-display font-medium text-navy-primary tracking-tight">
                Unlimited Hot Water, Heated on Demand.
              </h4>
            </div>
            <div className="border-b border-navy-primary/5 pb-4">
              <span className="text-xs text-silver block mb-1">text-base - Body Lead (Inter)</span>
              <p className="text-base text-navy-primary leading-relaxed max-w-4xl">
                Stiebel Eltron instantaneous water heaters represent the pinnacle of home hot water solutions. Unlike traditional tanks that heat and store water constantly, these systems heat water dynamically.
              </p>
            </div>
            <div>
              <span className="text-xs text-silver block mb-1">text-xs - UI / Labels / Small details (Inter)</span>
              <div className="text-xs text-navy-primary font-medium tracking-widest uppercase">
                AUTHORIZED STIEBEL ELTRON DEALER ● JUBILEE HILLS, HYDERABAD
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Glass Presets */}
        <section className="mb-16">
          <SectionHeader
            title="Frosted Glass System Presets"
            tagline="Architectural Glass Presets"
            description="Explicitly limited to 3 distinct presets to prevent visual overload. Shown below in contrast on both off-white light surfaces and deep navy dark surfaces."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Light Surface View */}
            <div className="bg-[#DFE2E6] border border-navy-primary/10 rounded-xl p-8 relative space-y-6 flex flex-col justify-center min-h-[300px]">
              <span className="text-xs font-bold text-navy-primary uppercase absolute top-4 left-4 tracking-wider">
                Light Background Contrast
              </span>

              {/* glass-nav */}
              <GlassPanel preset="nav" className="p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-primary block mb-1">
                  glass-nav preset
                </span>
                <span className="text-[11px] text-navy-primary/80">
                  Used exclusively for the sticky navigation header layout on scroll.
                </span>
              </GlassPanel>

              {/* glass-card */}
              <GlassPanel preset="card" className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-navy-primary block mb-1">
                  glass-card preset
                </span>
                <span className="text-[11px] text-navy-primary/70">
                  Used for configurator panels, float overlays, and hover details.
                </span>
              </GlassPanel>

              {/* glass-cta */}
              <GlassPanel preset="cta" className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-primary block mb-1">
                  glass-cta preset
                </span>
                <span className="text-[11px] text-navy-primary/80">
                  Used for floating high-emphasis book consultation widgets.
                </span>
              </GlassPanel>
            </div>

            {/* Dark Surface View */}
            <div className="bg-navy-primary border border-navy-primary/10 rounded-xl p-8 relative space-y-6 flex flex-col justify-center min-h-[300px]">
              <span className="text-xs font-bold text-purewhite uppercase absolute top-4 left-4 tracking-wider">
                Dark Background Contrast
              </span>

              {/* glass-nav */}
              <GlassPanel preset="nav" className="p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-purewhite block mb-1">
                  glass-nav preset
                </span>
                <span className="text-[11px] text-purewhite/75">
                  Used exclusively for the sticky navigation header layout on scroll.
                </span>
              </GlassPanel>

              {/* glass-card */}
              <GlassPanel preset="card" className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-purewhite block mb-1">
                  glass-card preset
                </span>
                <span className="text-[11px] text-purewhite/70">
                  Used for configurator panels, float overlays, and hover details.
                </span>
              </GlassPanel>

              {/* glass-cta */}
              <GlassPanel preset="cta" className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-primary block mb-1">
                  glass-cta preset
                </span>
                <span className="text-[11px] text-purewhite/95 font-medium">
                  Used for floating high-emphasis book consultation widgets.
                </span>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* Section 4: Buttons */}
        <section className="mb-16">
          <SectionHeader
            title="Premium Button Matrix"
            tagline="Interaction Primitives"
            description="Our buttons feature precise geometric shapes, strong letter-spacing, and subtle hover translations to communicate engineering quality."
            align="left"
          />
          <div className="border border-navy-primary/10 rounded-lg p-6 bg-purewhite">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
              <div>
                <span className="text-xs text-silver block mb-2">Primary CTA (Gold)</span>
                <Button variant="primary">Book Consultation</Button>
              </div>
              <div>
                <span className="text-xs text-silver block mb-2">Secondary CTA (Navy)</span>
                <Button variant="secondary">View Product Line</Button>
              </div>
              <div>
                <span className="text-xs text-silver block mb-2">Outline Button</span>
                <Button variant="outline">Compare Models</Button>
              </div>
              <div>
                <span className="text-xs text-silver block mb-2">Ghost Button</span>
                <Button variant="ghost">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Motions & Reveals */}
        <section className="mb-16">
          <SectionHeader
            title="Animation Easing & Unveiling"
            tagline="Motion System Showcase"
            description="Verify the behavior of our two core motion tokens: fadeInUp (using gentle easing) and revealMask (clip-path image reveal with fluid casing)."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* fadeInUp */}
            <div className="border border-navy-primary/10 rounded-lg p-8 bg-purewhite flex flex-col justify-center min-h-[260px]">
              <span className="text-xs font-bold text-gold-primary uppercase tracking-wider mb-2">
                fadeInUp & Reveal Wrapper
              </span>
              <Reveal>
                <div className="space-y-4">
                  <h3 className="text-2xl font-display font-medium text-navy-primary">
                    An elegant, staggered entrance
                  </h3>
                  <p className="text-xs text-silver leading-relaxed">
                    This text block is nested within the &lt;Reveal /&gt; component. It animates opacity 0→1 and translates y from 24→0 using the gentle motion easing profile to simulate liquid weight.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Trigger Again (Refresh page)
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* revealMask & rippleHover */}
            <div className="border border-navy-primary/10 rounded-lg p-8 bg-purewhite flex flex-col justify-center min-h-[260px]">
              <span className="text-xs font-bold text-gold-primary uppercase tracking-wider mb-2">
                Image Reveal Mask & Ripple Hover
              </span>
              <div className="space-y-4">
                {/* Simulated Reveal Image */}
                <motion.div
                  variants={revealMask}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="h-32 w-full bg-navy-primary rounded-md relative overflow-hidden flex items-center justify-center text-purewhite font-display text-lg tracking-wider"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-navy-primary to-navy-dark z-0" />
                  <span className="relative z-10 italic">Premium Unveiling Mask</span>
                </motion.div>

                {/* Card with rippleHover */}
                <motion.div
                  variants={rippleHover}
                  initial="initial"
                  whileHover="hover"
                  className="p-4 border border-gold-primary/20 rounded-md cursor-pointer text-center"
                >
                  <span className="text-xs text-navy-primary font-semibold block mb-1">
                    Card &lt;motion.div&gt; with rippleHover
                  </span>
                  <span className="text-[11px] text-silver">
                    Hover this card to verify the radial gradient scale transition.
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Dynamic Content Database Check */}
        <section className="mb-16">
          <SectionHeader
            title="Content Architecture Integrity"
            tagline="Structured Data Verification"
            description="Verify that the project data files (products, comparisons, FAQs, solutions, and projects) map to TypeScript configurations with 100% real content."
            align="left"
          />

          {/* Tab Menu */}
          <div className="flex flex-wrap border-b border-navy-primary/10 gap-2 mb-6">
            {(["products", "comparisons", "faqs", "solutions", "projects"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 text-xs uppercase tracking-wider font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-gold-primary text-gold-primary"
                    : "border-transparent text-silver hover:text-navy-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Render Tab Contents */}
          <div className="border border-navy-primary/10 rounded-lg p-6 bg-purewhite min-h-[350px]">
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl text-navy-primary">
                    Products ({products.length} entries)
                  </h4>
                  <span className="text-[10px] bg-gold-primary/10 text-gold-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    Stiebel Eltron Catalog
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {products.map((prod) => (
                    <Card key={prod.id} elevation="resting" className="flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] text-gold-primary uppercase font-bold tracking-widest">
                            {prod.category}
                          </span>
                          <span
                            className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              prod.status === "available"
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {prod.status}
                          </span>
                        </div>
                        <h5 className="font-display font-medium text-lg text-navy-primary mb-1">
                          {prod.title}
                        </h5>
                        <p className="text-[11px] text-silver mb-3 italic">
                          {prod.subtitle}
                        </p>
                        <div className="border-t border-navy-primary/5 pt-2">
                          <span className="text-[9px] font-bold uppercase tracking-wide text-navy-light block mb-1">
                            Key Specifications:
                          </span>
                          <ul className="text-[10px] text-silver space-y-1">
                            {Object.entries(prod.specifications)
                              .slice(0, 3)
                              .map(([key, val]) => (
                                <li key={key}>
                                  <strong className="text-navy-primary">{key}:</strong> {val}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "comparisons" && (
              <div className="space-y-6">
                <h4 className="font-display text-xl text-navy-primary">
                  Comparisons ({comparisons.length} matrices)
                </h4>
                <div className="grid grid-cols-1 gap-6">
                  {comparisons.map((comp) => (
                    <div key={comp.id} className="border border-navy-primary/5 rounded-md p-4">
                      <h5 className="text-sm font-semibold text-navy-primary mb-3">
                        {comp.title}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {comp.options.map((opt, idx) => (
                          <div key={idx} className="bg-offwhite p-3 rounded-md">
                            <span className="text-xs font-bold text-navy-primary block mb-2 border-b border-navy-primary/5 pb-1">
                              {opt.label}
                            </span>
                            <ul className="space-y-2">
                              {opt.points.map((pt, pIdx) => (
                                <li key={pIdx} className="flex items-start gap-2 text-[11px]">
                                  <span
                                    className={`shrink-0 text-xs ${
                                      pt.sentiment === "positive"
                                        ? "text-emerald-500"
                                        : pt.sentiment === "negative"
                                        ? "text-rose-500"
                                        : "text-silver"
                                    }`}
                                  >
                                    ●
                                  </span>
                                  <span className="text-navy-primary/80">{pt.text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "faqs" && (
              <div className="space-y-6">
                <h4 className="font-display text-xl text-navy-primary">
                  Frequently Asked Questions ({faqs.length} entries)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {faqs.map((faq) => (
                    <div key={faq.id} className="p-4 bg-offwhite rounded-md border border-navy-primary/5">
                      <span className="text-[9px] uppercase tracking-widest text-gold-primary font-bold block mb-1">
                        {faq.category}
                      </span>
                      <h5 className="text-xs font-semibold text-navy-primary mb-2">
                        Q: {faq.question}
                      </h5>
                      <p className="text-[11px] text-silver leading-relaxed">
                        A: {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "solutions" && (
              <div className="space-y-6">
                <h4 className="font-display text-xl text-navy-primary">
                  Customer Solutions & Audiences ({solutions.length} segments)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {solutions.map((sol, idx) => (
                    <div key={idx} className="p-4 bg-offwhite rounded-md border border-navy-primary/5 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-navy-primary flex items-center gap-2 mb-2">
                          <Layers size={14} className="text-gold-primary" /> {sol.audience}
                        </span>
                        <ul className="text-[11px] text-silver space-y-1.5 mb-4">
                          {sol.problems.map((prob, pIdx) => (
                            <li key={pIdx} className="flex gap-1.5">
                              <span className="text-rose-500 shrink-0">✕</span>
                              <span>{prob}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-center">
                        {sol.cta}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <h4 className="font-display text-xl text-navy-primary">
                  Hyderabad Case Studies ({projects.length} entries)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {projects.map((proj) => (
                    <div key={proj.id} className="border border-navy-primary/5 rounded-md p-4 bg-offwhite flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] uppercase tracking-widest text-gold-primary font-bold block mb-1">
                          {proj.location}
                        </span>
                        <h5 className="text-sm font-semibold text-navy-primary mb-2">
                          {proj.title}
                        </h5>
                        <p className="text-[10px] text-silver leading-relaxed mb-3">
                          {proj.description}
                        </p>
                      </div>
                      <div className="border-t border-navy-primary/5 pt-2 mt-2">
                        <span className="text-[9px] font-bold text-navy-light block uppercase mb-1">
                          Systems Integrated:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {proj.productsUsed.map((p, idx) => (
                            <span key={idx} className="text-[9px] bg-navy-primary/5 text-navy-primary px-1.5 py-0.5 rounded">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </Container>
    </div>
  );
}
