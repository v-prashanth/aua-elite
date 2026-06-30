"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Process Steps ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: "01",
    title: "Site Visit",
    body: "We visit your property. Our installation specialists inspect your water supply, check the plumbing layout, and assess your electrical setup — before we recommend anything.",
  },
  {
    num: "02",
    title: "Requirement Assessment",
    body: "We map your hot water requirements — how many bathrooms, your fixture types, your daily usage patterns. Every recommendation is based on what your property actually needs.",
  },
  {
    num: "03",
    title: "Independent Recommendation",
    body: "We are not dealers for any single manufacturer. We select the right system from trusted brands based purely on your property requirements — nothing else.",
  },
  {
    num: "04",
    title: "Professional Installation",
    body: "Our own experienced installation specialists handle everything. No handoffs, no subcontractors. Every connection is properly tested before we leave.",
  },
  {
    num: "05",
    title: "Testing & Handover",
    body: "We run the system, verify the installation, and walk you through everything before we hand over. We want you to feel confident about what has been installed.",
  },
  {
    num: "06",
    title: "After-Sales Support",
    body: "We remain your contact for the life of the system — maintenance, warranty coordination, and prompt response whenever you need assistance.",
  },
];

const BRANDS = [
  {
    name: "Stiebel Eltron",
    origin: "Germany · Est. 1924",
    note: "Global leader in tankless water heating and air-source heat pumps.",
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
              Consultation first.{" "}
              <br className="hidden sm:block" />
              Installation second.
            </h1>
            <p className="text-[13px] sm:text-[15px] text-white/55 leading-relaxed max-w-lg font-sans">
              We are an independent consultation and installation company. We understand
              your requirements, visit your property, recommend the right products, and
              install them properly.
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
          WHO WE ARE — editorial text with team photo
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-purewhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side: Editorial text */}
            <div className="space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                  Our Background
                </p>
                <h2 className="font-display text-[1.8rem] sm:text-[2.2rem] font-medium text-navy-primary leading-tight tracking-tight mb-6">
                  Why consultation matters
                </h2>
              </div>
              <div className="space-y-6 text-[13px] sm:text-[14px] text-silver leading-[1.9] font-sans">
                <p>
                  Aqua Elite Solutions was started by a hands-on field technician who saw firsthand
                  how homeowners were routinely overpaying for poorly matched water systems. Having
                  spent years on-site fixing incorrectly configured systems, our founder realized
                  that what families needed wasn&apos;t a standard sales pitch — it was honest,
                  professional guidance and direct, fair pricing.
                </p>
                <p>
                  The industry was filled with retailers selling expensive systems that did not perform
                  as expected because nobody assessed the property&apos;s actual water quality, hardness,
                  or plumbing setup beforehand.
                </p>
                <p className="text-navy-primary font-medium">
                  We believe the right product for the wrong property is still the wrong product. That
                  is why we start with a site visit — not a catalog — to deliver a custom-fit solution
                  at realistic, transparent rates.
                </p>
                <p>
                  We are not a manufacturer or a dealer tied to any single brand. We are an independent
                  advisory and service-first company. We assess your requirements, select from multiple
                  trusted brands, install it with our own team, and stay available for the life of the system.
                </p>
              </div>
            </div>
            {/* Right side: Premium image with corner accents */}
            <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px]">
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  border: "1px solid rgba(201,165,76,0.18)",
                  boxShadow: "0 20px 60px rgba(11,35,65,0.08), 0 2px 8px rgba(11,35,65,0.04)",
                }}
              >
                <Image
                  src="/images/professional_team.png"
                  alt="Aqua Elite Solutions expert technician team"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(11,35,65,0.15) 0%, transparent 60%)",
                  }}
                />
              </div>
              {/* Corner accents */}
              <div
                className="absolute -top-px -left-px w-[60px] h-[3px]"
                style={{ background: "linear-gradient(to right, var(--gold-primary), transparent)" }}
              />
              <div
                className="absolute -top-px -left-px w-[3px] h-[60px]"
                style={{ background: "linear-gradient(to bottom, var(--gold-primary), transparent)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          HOW WE WORK — numbered, clean
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
          TRUST IN ACTION — expert installation and happy customer
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-offwhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
              Trust in Action
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-[2.2rem] font-medium text-navy-primary leading-tight tracking-tight">
              Real Work. Real Relationships.
            </h2>
            <p className="text-[13px] text-silver mt-4 font-sans leading-relaxed">
              We don&apos;t use subcontractors or cut corners. Every team member you meet is an in-house expert committed to your system&apos;s longevity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Card 1: Expert Installation */}
            <div className="bg-purewhite rounded-2xl overflow-hidden border border-navy-primary/5 shadow-raised hover:border-gold-primary/20 transition-all duration-300 flex flex-col">
              <div className="relative w-full h-[260px] sm:h-[320px]">
                <Image
                  src="/images/technician_working.png"
                  alt="Aqua Elite technician performing a professional water filtration system installation"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-primary to-transparent" />
              </div>
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-gold-primary uppercase tracking-wider block mb-2">
                    Expert Installation
                  </span>
                  <h3 className="font-display text-[1.25rem] font-medium text-navy-primary mb-4 leading-tight">
                    Professional, clean, and compliant work
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-silver leading-[1.85] font-sans">
                    Our technicians are certified professionals who take pride in neat layouts and secure plumbing connections. We map out service zones carefully, ensuring that your filtration or heating systems are both easy to access and completely out of sight.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Happy Homeowner */}
            <div className="bg-purewhite rounded-2xl overflow-hidden border border-navy-primary/5 shadow-raised hover:border-gold-primary/20 transition-all duration-300 flex flex-col">
              <div className="relative w-full h-[260px] sm:h-[320px]">
                <Image
                  src="/images/happy_customer.png"
                  alt="Aqua Elite technician explaining water softener metrics to a happy customer"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold-primary to-transparent" />
              </div>
              <div className="p-8 sm:p-10 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-gold-primary uppercase tracking-wider block mb-2">
                    Customer Centricity
                  </span>
                  <h3 className="font-display text-[1.25rem] font-medium text-navy-primary mb-4 leading-tight">
                    Honest advice you can rely on
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-silver leading-[1.85] font-sans">
                    Building long-term trust starts with open communication. We walk you through system configurations, explain exact water hardness levels, and show you how to manage filters and settings. You will always know what is recommended and why.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          WHAT WE OFFER — trust pillars without invented claims
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-purewhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
            <div className="pt-1">
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
                What You Get
              </p>
              <h2 className="font-display text-[1.5rem] sm:text-[1.8rem] font-medium text-navy-primary leading-tight tracking-tight">
                Our commitment to you
              </h2>
            </div>
            <div className="divide-y divide-navy-primary/8">
              {[
                {
                  title: "Free Site Inspection",
                  body: "We visit your property at no charge to assess your water supply, plumbing layout, and electrical capacity before recommending anything.",
                },
                {
                  title: "Honest Recommendation",
                  body: "We recommend based on what your property needs — not based on what is easiest to sell. We work with multiple trusted brands.",
                },
                {
                  title: "Professional Installation",
                  body: "Our experienced installation specialists handle the complete installation — from pipework to electrical connections — cleanly and correctly.",
                },
                {
                  title: "Competitive Pricing",
                  body: "We provide transparent pricing with no hidden costs. You will know exactly what you are paying for before any work begins.",
                },
                {
                  title: "After-Sales Support",
                  body: "We remain your contact for the life of your system. Maintenance, warranty queries, and any follow-up service — we are available.",
                },
              ].map((item) => (
                <div key={item.title} className="py-7">
                  <h3 className="font-display text-[1rem] sm:text-[1.1rem] font-medium text-navy-primary mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-silver leading-[1.85] font-sans">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────
          BRANDS — typographic list
      ────────────────────────────────────────────────────────── */}
      <section id="brands" className="py-20 md:py-28 bg-offwhite border-b border-navy-primary/5">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">

          <div className="max-w-xl mb-14">
            <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-3">
              Independent Advisory
            </p>
            <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight mb-4">
              Brands we work with
            </h2>
            <p className="text-[13px] text-silver leading-relaxed font-sans">
              We are not tied to any single manufacturer. We recommend based on your
              property&apos;s requirements — nothing else.
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
              Book a free site visit. We&apos;ll assess your property and provide a written
              recommendation — no obligation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/consultation">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 bg-gold-primary text-navy-brand px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] hover:bg-white transition-colors duration-300"
                >
                  Book a Free Site Visit
                  <ArrowRight size={13} strokeWidth={2.5} />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 border border-white/20 text-white/80 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] hover:border-white/50 hover:text-white transition-all duration-300"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
