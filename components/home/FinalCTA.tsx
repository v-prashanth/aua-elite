"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "lucide-react";

export const FinalCTA: React.FC = () => {
  const router = useRouter();

  return (
    <section 
      className="py-16 md:py-24 lg:py-32 bg-offwhite relative overflow-hidden border-t border-navy-primary/5 text-left md:text-center" 
      aria-label="Book Consultation"
    >
      {/* Background blueprint grid pattern matching other home sections */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Soft circular warm highlight matching premium look */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(201,165,76,0.035)_0%,transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 max-w-3xl">
        <Reveal>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-primary mb-6 block">
            Start Your Project
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mb-6 text-navy-primary leading-[1.15] text-balance">
            Design a custom water system for your property.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-sm sm:text-base text-silver max-w-2xl mx-auto mb-10 leading-relaxed font-sans text-balance">
            Speak with our service team to assess your property and find the right water solution for your home.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start md:justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/consultation")}
              className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase px-8 py-4 shadow-none"
            >
              Book Consultation
              <ArrowRight size={14} className="ml-2 animate-pulse" />
            </Button>
            <a 
              href="https://wa.me/918555998216"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-navy-primary/10 hover:border-navy-primary/30 text-navy-primary text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300 hover:bg-navy-primary/5"
            >
              Chat via WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
