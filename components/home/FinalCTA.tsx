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
    <section className="py-20 md:py-32 lg:py-40 bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] relative overflow-hidden border-t border-gold-primary/20" aria-label="Book Consultation">
      {/* Soft circular warm highlight matching premium look */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_100%,rgba(201,165,76,0.06)_0%,transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 max-w-3xl text-center">
        <Reveal>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-primary mb-6 block">
            Start Your Project
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight mb-6 text-balance leading-[1.15]">
            Design a custom water system for your property.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-sm sm:text-base text-[#FFFFFF]/75 dark:text-[#F3F4F6]/75 max-w-2xl mx-auto mb-12 leading-relaxed font-sans text-balance">
            Speak with an installation engineer to assess your water pressure, TDS, and electrical connection parameters.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push("/consultation")}
              className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase px-10 py-4 shadow-none"
            >
              Book Consultation
              <ArrowRight size={14} className="ml-2 animate-pulse" />
            </Button>
            <a 
              href="https://wa.me/919849012345"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center px-10 py-4 border border-[#FFFFFF]/20 dark:border-[#F3F4F6]/20 hover:border-gold-primary hover:bg-[#FFFFFF]/5 dark:hover:bg-[#F3F4F6]/5 text-[#FFFFFF] dark:text-[#F3F4F6] text-xs font-bold tracking-wider uppercase rounded-full transition-all duration-300"
            >
              Chat via WhatsApp
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};
