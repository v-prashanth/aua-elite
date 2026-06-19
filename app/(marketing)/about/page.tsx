"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "lucide-react";

export default function AboutPage() {
  const standards = [
    {
      title: "In-House Technician Assembly",
      description: "We do not hire temporary sub-contractors. Our on-ground installations are completed exclusively by our trained, full-time engineering technicians."
    },
    {
      title: "10-Bar Pressure Testing",
      description: "Hyderabad's high-pressure booster systems stress plumbing lines. We pressure-test every pipe connection to a minimum of 10 Bar for 24 hours before wall closure."
    },
    {
      title: "Electrical Phase Load Checks",
      description: "High-capacity heaters require three-phase connections. We perform total phase load calculations to prevent circuit overloads or voltage dips."
    }
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-16 bg-offwhite text-left">
      
      {/* 1. Narrative Hero */}
      <section className="pb-12 md:pb-16" aria-label="About Page Hero">
        <Container className="max-w-3xl">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-3 block">
              Our Origin
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight text-navy-primary leading-[1.15] text-balance">
              From Service Shafts to Precision Integration
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-xs sm:text-sm text-silver max-w-xl mt-6 leading-relaxed font-sans text-balance">
              Aqua Elite Solutions was founded not by corporate sales executives, but by on-ground technicians who spent years fixing water system failures in Hyderabad&apos;s luxury developments.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 2. Editorial Narrative - Story Focus */}
      <section className="py-12 md:py-20 bg-purewhite border-y border-navy-primary/5" aria-label="The Story">
        <Container className="max-w-2xl text-left space-y-8">
          <Reveal>
            <h2 className="font-display text-base font-semibold tracking-wide text-navy-primary mb-2">
              Why We Began
            </h2>
            <p className="text-xs sm:text-sm text-silver leading-relaxed font-sans mb-4">
              Between 2015 and 2021, our founding team worked as on-site technicians across Jubilee Hills, Gachibowli, and Banjara Hills. We spent our days inside service shafts and under-sink vanity cabinets, troubleshooting leaking boilers, cleaning calcified rain showers, and replacing shorted elements.
            </p>
            <p className="text-xs sm:text-sm text-silver leading-relaxed font-sans mb-4">
              We noticed a persistent pattern: homeowners and architects were purchasing generic, off-the-shelf storage geysers or softeners from retail showrooms without any regard for water chemistry, plumbing pipe diameters, or electrical phase loads. Sales representatives were selling hardware models, not sizing math.
            </p>
            <p className="text-xs sm:text-sm text-silver leading-relaxed font-sans">
              We established Aqua Elite Solutions in 2022 to shift the business from hardware sales to engineering integrity. We don&apos;t push products—we recommend solutions. By combining German heating engineering from Stiebel Eltron with our local knowledge of Hyderabad&apos;s high-hardness borewell water, we design systems that work invisibly and reliably.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3. In-House Standards Section */}
      <section className="py-12 md:py-20 bg-offwhite" aria-label="Installation Standards">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="font-display text-base font-semibold tracking-wide text-navy-primary mb-6">
              Our In-House Assembly Benchmarks
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 text-left">
            {standards.map((standard, idx) => (
              <Reveal key={idx} delay={idx * 0.15}>
                <div className="flex flex-col justify-between p-6 bg-purewhite border border-navy-primary/5 rounded-md h-full elevation-resting hover:border-gold-primary/20 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-gold-primary">
                      <Check size={16} />
                      <h3 className="font-display font-semibold text-xs tracking-wider uppercase">
                        {standard.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-silver leading-relaxed font-sans">
                      {standard.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Support Callout */}
      <section className="py-12 md:py-16 bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] border-t border-gold-primary/20" aria-label="About CTA">
        <Container className="max-w-xl text-center">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-display font-medium tracking-tight mb-4">
              Schedule a technical assessment of your property.
            </h2>
            <p className="text-xs sm:text-sm text-[#FFFFFF]/70 dark:text-[#F3F4F6]/70 mb-8 leading-relaxed font-sans max-w-md mx-auto">
              Our engineering team is ready to analyze your plumbing layout blueprints or schedule a physical audit of your Hyderabad premises.
            </p>
            <Link href="/consultation">
              <Button
                variant="primary"
                size="lg"
                className="text-xs font-bold uppercase tracking-wider px-8 py-3.5 bg-gold-primary text-navy-primary hover:bg-gold-primary/95 rounded-full"
              >
                Schedule Sizing Consultation
                <ArrowRight size={14} className="ml-2" />
              </Button>
            </Link>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
