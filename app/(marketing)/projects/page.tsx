"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { ArrowRight, Check } from "lucide-react";

export default function ProjectsPage() {
  // Map project IDs to specific metadata details for authentic storytelling
  const projectCaseDetails: Record<string, { challenge: string; solution: string; outcome: string }> = {
    "jubilee-hills-villa": {
      challenge: "A 12,000 sq. ft. modern villa with five luxury high-flow rain domes requiring parallel, instant hot water without pressure drop-offs or visible rooftop solar tanks.",
      solution: "Concealed 3-phase German tankless heaters at individual bathrooms combined with a main volumetric softener line to prevent Hyderabad borewell calcium scaling.",
      outcome: "Immediate hot water delivery at exact target temperatures. Zero aesthetic impact on the exterior villa architecture, leaving vanity storage spaces empty and clean."
    },
    "banjara-hills-hotel": {
      challenge: "High standby energy utility costs and guest water latency complaints from an aging central oil-fired boiler system serving 25 guest bathrooms.",
      solution: "A hybrid integration using three 300L air-source thermal heat pumps on the terrace loop paired with high-capacity inline heaters at top-tier suites.",
      outcome: "Hot water latency reduced to zero. Replaced fuel heaters completely, resulting in a documented 68% drop in monthly energy heating invoices."
    },
    "kokapet-penthouse": {
      challenge: "Duplex penthouse layout with a custom matte-black master rain dome and steam room cabinet vulnerable to Hyderabad water scale blocks and mineral stains.",
      solution: "Upstream automated volumetric softener protecting custom pipes and element coils, paired with a concealed high-capacity 24kW tankless unit.",
      outcome: "Complete scale prevention on custom matte fixtures and high-end rain glass panels, with stable steam outputs."
    }
  };

  return (
    <div className="relative min-h-screen pt-28 md:pt-36 pb-16 md:pb-24 bg-offwhite text-left">
      <Container className="max-w-5xl">
        {/* Page Header */}
        <div className="text-left max-w-2xl mb-8 md:mb-16">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary block mb-3">
              Case Studies
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Real Integrations. Authentic Work.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-silver font-sans leading-relaxed mt-4">
              We focus on precision execution rather than arbitrary project volume. Explore how we sized, installed, and calibrated heating and softening systems across luxury Hyderabad properties.
            </p>
          </Reveal>
        </div>

        {/* Detailed Projects Layout List */}
        <div className="space-y-8 md:space-y-12">
          {projects.map((project, idx) => {
            const details = projectCaseDetails[project.id] || { challenge: "", solution: "", outcome: "" };
            return (
              <Reveal key={project.id} delay={idx * 0.15}>
                <div className="bg-purewhite border border-navy-primary/5 rounded-lg overflow-hidden elevation-resting p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start text-left">
                  
                  {/* Visual Left/Top column */}
                  <div className="lg:col-span-5 min-w-0 space-y-4">
                    <div className="relative w-full h-[220px] sm:h-[280px] rounded-lg overflow-hidden border border-navy-primary/5 bg-offwhite">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-w-768px) 100vw, 40vw"
                      />
                    </div>
                    
                    <div className="space-y-2.5">
                      <span className="text-[8px] uppercase tracking-widest text-gold-primary font-bold block">
                        Location Parameters
                      </span>
                      <h3 className="font-display font-semibold text-sm text-navy-primary">
                        {project.location}
                      </h3>
                      <p className="text-[10px] text-silver font-sans">
                        {project.title}
                      </p>
                    </div>

                    <div className="border-t border-navy-primary/5 pt-4">
                      <span className="text-[8px] uppercase tracking-widest text-navy-primary/60 font-bold block mb-2">
                        Integrated Hardware
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.productsUsed.map((prod) => (
                          <span 
                            key={prod}
                            className="px-2.5 py-1 bg-offwhite border border-navy-primary/5 rounded font-sans text-[8px] font-bold text-navy-primary tracking-wide"
                          >
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Story Right/Bottom column */}
                  <div className="lg:col-span-7 min-w-0 flex flex-col justify-between h-full space-y-5 border-t border-navy-primary/5 pt-6 mt-2 lg:border-t-0 lg:pt-0 lg:mt-0 lg:border-l lg:border-navy-primary/5 lg:pl-8">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-[9px] uppercase tracking-widest text-navy-primary/70 font-bold font-sans mb-1.5">
                          The Challenge
                        </h4>
                        <p className="text-xs text-silver leading-relaxed font-sans">
                          {details.challenge}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[9px] uppercase tracking-widest text-navy-primary/70 font-bold font-sans mb-1.5">
                          The Integration Solution
                        </h4>
                        <p className="text-xs text-silver leading-relaxed font-sans">
                          {details.solution}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-[9px] uppercase tracking-widest text-navy-primary/70 font-bold font-sans mb-1.5">
                          Measured Outcomes
                        </h4>
                        <p className="text-xs text-navy-primary font-medium leading-relaxed font-sans">
                          {details.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-navy-primary/5 flex items-center justify-between text-[11px] text-silver">
                      <div className="flex items-center gap-2 text-gold-primary">
                        <Check size={14} className="shrink-0" />
                        <span className="font-sans font-bold uppercase tracking-wider text-[8px]">
                          Performance Verified
                        </span>
                      </div>
                      <Link href="/consultation">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-navy-primary hover:text-gold-primary transition-colors flex items-center outline-none">
                          Request Similar Layout
                          <ArrowRight size={10} className="ml-1" />
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Bottom Consultation CTA */}
        <section className="mt-10 py-10 md:py-12 bg-navy-primary text-purewhite rounded-lg border border-gold-muted/30" aria-label="Projects Page CTA">
          <Container className="max-w-2xl text-center">
            <Reveal>
              <h2 className="text-xl sm:text-2xl font-display font-medium tracking-tight mb-4 text-balance">
                Have a specific property integration in mind?
              </h2>
              <p className="text-xs sm:text-sm text-purewhite/70 mb-8 leading-relaxed font-sans max-w-md mx-auto text-balance">
                Our technicians can work with your architect or builder to sizing piping layouts, verify electrical compatibility, and size solutions pre-construction.
              </p>
              <Link href="/consultation">
                <Button
                  variant="primary"
                  size="lg"
                  className="text-xs uppercase font-bold tracking-wider px-8 py-3.5 bg-gold-primary text-navy-primary hover:bg-gold-primary/95 rounded-full"
                >
                  Schedule Engineering Review
                  <ArrowRight size={14} className="ml-2" />
                </Button>
              </Link>
            </Reveal>
          </Container>
        </section>
      </Container>
    </div>
  );
}
