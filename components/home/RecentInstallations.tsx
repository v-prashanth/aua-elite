"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export const RecentInstallations: React.FC = () => {
  return (
    <section className="py-12 md:py-20 bg-purewhite border-t border-navy-primary/5" aria-label="Recent Installations">
      <Container className="max-w-5xl">
        <div className="text-left max-w-2xl mb-10 sm:mb-12">
          <Reveal>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-primary block mb-3">
              Showcase Gallery
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-2xl sm:text-3xl font-display font-medium tracking-tight text-navy-primary leading-tight">
              Real Installations. True Integration.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-xs sm:text-sm text-silver font-sans leading-relaxed mt-3">
              Review real integrations designed, installed, and supported by our engineering team in Hyderabad&apos;s premium properties. Authenticity over volume.
            </p>
          </Reveal>
        </div>

        <div className="space-y-10 sm:space-y-14 lg:space-y-20">
          {projects.slice(0, 2).map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center w-full"
              >
                {/* Image panel */}
                <div className={`lg:col-span-7 min-w-0 relative w-full h-[220px] sm:h-[320px] md:h-[380px] rounded-xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised hover:border-gold-primary/45 transition-colors duration-500 group ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-navy-primary/5">
                    <Reveal delay={0.1} className="w-full h-full relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/15 via-transparent to-transparent pointer-events-none" />
                    </Reveal>
                  </div>
                </div>

                {/* Narrative text panel */}
                <div className={`lg:col-span-5 min-w-0 flex flex-col text-left space-y-4 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <Reveal delay={0.15}>
                    <span className="text-[8px] font-bold tracking-widest text-gold-primary uppercase block">
                      {project.location}
                    </span>
                  </Reveal>
                  <Reveal delay={0.2}>
                    <h3 className="text-lg sm:text-xl font-display font-medium text-navy-primary leading-tight">
                      {project.title}
                    </h3>
                  </Reveal>
                  <Reveal delay={0.25}>
                    <p className="text-xs sm:text-sm text-silver font-sans leading-relaxed">
                      {project.description}
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <div className="border-t border-navy-primary/5 pt-4">
                      <span className="text-[8px] font-bold tracking-widest text-navy-primary/60 uppercase block mb-3">
                        Integrated Systems
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
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <Reveal delay={0.3} className="text-center mt-10 sm:mt-14">
          <Link href="/projects">
            <Button
              variant="outline"
              size="lg"
              className="text-xs uppercase tracking-wider font-bold"
            >
              Explore Full Work Showcase
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
};
