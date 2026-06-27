"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const Hero: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="relative min-h-[calc(100vh-var(--navbar-h))] flex items-center bg-offwhite overflow-hidden"
      aria-label="Hero Section"
    >
      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(201,165,76,0.04)_0%,transparent_60%)] pointer-events-none" />

      {/* Premium subtle blueprint grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--navy-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--navy-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <Container className="relative z-10 w-full py-10 sm:py-12 md:py-16 lg:py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col justify-center text-left space-y-5 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 sm:space-y-5"
            >
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.35em] text-gold-primary block">
                Aqua Elite Solutions
              </span>

              <h1 className="text-[2.4rem] sm:text-5xl md:text-[3rem] lg:text-[3.4rem] xl:text-[3.8rem] font-display font-medium tracking-tight text-navy-primary leading-[1.07]">
                The Right Water Solution
                <br />
                <span className="text-gold-primary italic font-serif font-normal">
                  Chosen, Installed & Supported.
                </span>
              </h1>

              <p className="text-sm sm:text-[15px] text-navy-primary/70 font-sans leading-relaxed max-w-[520px]">
                We understand your requirements, visit your site, recommend the right products from trusted brands, handle the installation, and provide support long after the job is done.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1"
            >
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push("/consultation")}
                className="w-full sm:w-auto text-[10px] sm:text-xs font-bold tracking-wider uppercase px-7 py-3.5 shadow-none"
              >
                Book Consultation
                <ArrowRight size={13} className="ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => router.push("/products")}
                className="w-full sm:w-auto text-[10px] sm:text-xs font-bold tracking-wider uppercase px-7 py-3.5"
              >
                View Our Products
              </Button>
            </motion.div>
          </div>

          {/* ── Right: Image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[440px] xl:h-[480px] rounded-xl overflow-hidden border border-gold-primary/20 shadow-raised bg-purewhite"
          >
            <Image
              src="/images/hero_villa.png"
              alt="Premium modern residential villa interior"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-primary/15 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
