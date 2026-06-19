"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { motionTokens } from "@/lib/animations";

export const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section className="relative min-h-[85vh] flex items-center pt-24 pb-12 sm:pt-28 sm:pb-16 lg:py-32 bg-offwhite overflow-hidden" aria-label="Hero Section">
      {/* Subtle light highlighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(201,165,76,0.03)_0%,transparent_50%)] pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
        {/* Core Narrative / Call To Actions */}
        <div className="lg:col-span-6 min-w-0 flex flex-col justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] text-gold-primary block">
                Aqua Elite Solutions
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3rem] font-display font-medium tracking-tight text-navy-primary leading-[1.08] text-balance">
                Perfect Water.
                <br />
                <span className="text-gold-primary italic font-serif font-normal">Engineered for the Finest Homes.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-navy-primary/75 font-sans leading-relaxed max-w-lg">
              We design and integrate premium German tankless heating, air-source thermal loops, and intelligent softeners tailored around your property architecture, flow requirements, and lifestyle comfort.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/consultation")}
                className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase px-8 py-3.5 shadow-none"
              >
                Book Consultation
                <ArrowRight size={14} className="ml-2 animate-pulse" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/solutions")}
                className="w-full sm:w-auto text-xs font-bold tracking-wider uppercase px-8 py-3.5"
              >
                Explore Solutions
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Premium Architectural Showcase Image - Double frame editorial treatment */}
        <div className="lg:col-span-6 min-w-0 relative w-full h-[280px] sm:h-[400px] md:h-[480px] lg:h-[520px] rounded-xl p-1 bg-purewhite border border-gold-primary/20 shadow-raised hover:border-gold-primary/45 transition-colors duration-500 group">
          <div className="relative w-full h-full rounded-lg overflow-hidden border border-navy-primary/5">
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ 
                opacity: 1, 
                scale: [1.01, 1.04, 1.01],
              }}
              transition={{ 
                opacity: { duration: motionTokens.duration.slow, ease: motionTokens.ease.gentle },
                scale: { duration: 30, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-full h-full relative"
            >
              <Image
                src="/images/hero_villa.png"
                alt="Premium modern residential villa interior with floor-to-ceiling glass and reflection pools"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};
