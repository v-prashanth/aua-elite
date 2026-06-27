"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";

// ─── Process Steps ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Site Visit",
    body: "We come to your property. Our technicians measure water pressure at source, test your groundwater hardness, and inspect your electrical panel phase load — before we recommend anything.",
  },
  {
    num: "02",
    title: "Sizing Assessment",
    body: "We map your simultaneous usage patterns — how many bathrooms, whether you have rain showers, tubs, or wellness fixtures. Every recommendation is derived from engineering data, never intuition.",
  },
  {
    num: "03",
    title: "Brand-Independent Recommendation",
    body: "We are not dealers for any single manufacturer. We select the best-fit system from trusted global brands based purely on what your property needs.",
  },
  {
    num: "04",
    title: "Professional Installation",
    body: "Our own certified full-time technicians install. No third-party subcontractors, no handoffs. Every connection is pressure-tested before we leave.",
  },
  {
    num: "05",
    title: "Testing & Commissioning",
    body: "We run the system under full load, verify thermal performance, check every electrical connection, and hand over a written commissioning report.",
  },
  {
    num: "06",
    title: "After-Sales Support",
    body: "We remain your local contact for the life of the system — annual scale-cleaning, warranty coordination, and rapid response if anything requires attention.",
  },
];

const BRANDS = [
  {
    name: "Stiebel Eltron",
    origin: "Germany · Est. 1924",
    note: "Global leader in tankless heating and air-source heat pumps.",
  },
  {
    name: "A.O. Smith",
    origin: "USA · Est. 1874",
    note: "Pioneer in glass-lined storage geysers and safety engineering.",
  },
  {
    name: "ZeroB",
    origin: "India · Est. 1985",
    note: "Residential water softeners and advanced filtration systems.",
  },
  {
    name: "Zanskar",
    origin: "India · Est. 2020",
    note: "Smart, centralised eco-friendly thermal loop integrations.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* ──────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────── */}
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
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-6">
              Who We Are
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-medium leading-[1.12] tracking-tight text-white mb-8">
              We started as{" "}
              <br className="hidden sm:block" />
              field technicians.
            </h1>
            <p className="text-[13px] sm:text-[15px] text-white/55 leading-relaxed max-w-lg font-sans">
              We built this company because we saw homeowners buying expensive
              systems that were never sized correctly for their property. That
              problem is entirely solvable — and it is what we do.
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ──────────────────────────────────────────────────────────
          OUR STORY — editorial text, no cards
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-purewhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
            <div className="pt-1">
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                Our Background
              </p>
              <h2 className="font-display text-[1.5rem] sm:text-[1.8rem] font-medium text-navy-primary leading-tight tracking-tight">
                Built from the ground up
              </h2>
            </div>
            <div className="space-y-6 text-[13px] sm:text-[14px] text-silver leading-[1.9] font-sans">
              <p>
                Aqua Elite Solutions was founded by hands-on service technicians
                who spent years inside Hyderabad&apos;s luxury residential
                developments — Jubilee Hills, Gachibowli, Banjara Hills —
                installing and repairing water systems.
              </p>
              <p>
                We spent those years troubleshooting leaking geysers, calcified
                showerheads, and burnt-out electrical elements. We noticed a
                consistent pattern: retail showrooms were selling expensive,
                high-capacity water heaters without checking whether the
                customer&apos;s property could support them.
              </p>
              <p className="text-navy-primary font-medium">
                Homeowners were buying premium products and experiencing
                constant temperature drops, low pressure, and electrical faults
                — because no one had sized the system to the property.
              </p>
              <p>
                We started this company to fix exactly that. We are not a
                manufacturer, not a showroom, and not a dealer. We are
                independent technical advisors who size the system to your home,
                recommend the best product, install it with our own team, and
                stay available for the life of the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          HOW WE WORK — numbered, clean, no timeline rail
      ────────────────────────────────────────────────────────── */}
      <section id="process" className="py-20 md:py-28 bg-offwhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

          <div className="mb-16">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
              Our Process
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight">
              How we work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-navy-primary/6">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className="bg-offwhite p-8 md:p-10 hover:bg-purewhite transition-colors duration-300 group"
              >
                <span className="font-display text-[11px] font-bold text-gold-primary tracking-[0.2em] block mb-6">
                  {step.num}
                </span>
                <h3 className="font-display text-[1.1rem] sm:text-[1.2rem] font-medium text-navy-primary mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[12px] sm:text-[13px] text-silver leading-[1.85] font-sans">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          BRANDS — typographic list (matches products page)
      ────────────────────────────────────────────────────────── */}
      <section id="brands" className="py-20 md:py-28 bg-purewhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

          <div className="max-w-xl mb-14">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
              Independent Advisory
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight mb-4">
              Brands we work with
            </h2>
            <p className="text-[13px] text-silver leading-relaxed font-sans">
              We are not tied to any manufacturer. We select the best option for
              your property — based on your requirements, not sales targets.
            </p>
          </div>

          <div className="divide-y divide-navy-primary/8">
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="py-6 md:py-8 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2 md:gap-8 items-baseline"
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
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          COMPLETED PROJECTS — editorial, no cards
      ────────────────────────────────────────────────────────── */}
      <section id="projects" className="py-20 md:py-28 bg-offwhite">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

          <div className="mb-16">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
              Completed Work
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight">
              Selected projects
            </h2>
          </div>

          {/* Full-bleed editorial project rows */}
          <div className="space-y-20 md:space-y-28">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start"
              >
                {/* Image — large, dominant */}
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-navy-primary/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {/* Content — clean, no labels, no badges */}
                <div className={`pt-2 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-4">
                    {project.location}
                  </p>
                  <h3 className="font-display text-[1.5rem] sm:text-[1.8rem] font-medium text-navy-primary leading-tight tracking-tight mb-5">
                    {project.title}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-silver leading-[1.9] font-sans mb-8">
                    {project.description}
                  </p>

                  {/* Products as plain text — no chips, no labels */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {project.productsUsed.map((p, i) => (
                      <span
                        key={p}
                        className="text-[11px] font-sans font-semibold text-navy-primary/50 uppercase tracking-wider"
                      >
                        {i > 0 && <span className="mr-4 text-navy-primary/20">·</span>}
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          CONSULTATION CTA
      ────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-navy-dark text-white">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-5">
              Start here
            </p>
            <h2 className="font-display text-[2rem] sm:text-[2.6rem] md:text-[3rem] font-medium text-white leading-tight tracking-tight mb-6">
              Tell us about your property.
            </h2>
            <p className="text-[13px] sm:text-[14px] text-white/50 leading-relaxed mb-10 font-sans max-w-md">
              We&apos;ll schedule a site visit, audit your electrical panel and water
              supply, and provide a written sizing recommendation — no obligation.
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
