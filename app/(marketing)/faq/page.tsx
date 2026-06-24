"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs } from "@/data/faqs";
import { ChevronDown, ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQPage() {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Group FAQs by category
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  return (
    <div className="relative min-h-screen pb-16 md:pb-24 bg-offwhite text-left">
      <PageHeader
        tagline="Support Center"
        title="Frequently Asked Questions"
        description="Find simple, straightforward answers regarding plumbing pressure, three-phase power loads, water hardness solutions, and manufacturer warranties."
        containerClassName="max-w-4xl"
      />

      <Container className="max-w-4xl py-12">

        {/* FAQs Accordion list */}
        <div className="space-y-10">
          {categories.map((category, catIdx) => {
            const catFaqs = faqs.filter((faq) => faq.category === category);
            return (
              <div key={category} className="space-y-4">
                <Reveal delay={catIdx * 0.05}>
                  <h2 className="font-display text-sm font-semibold tracking-wider text-gold-primary uppercase border-b border-navy-primary/5 pb-2">
                    {category}
                  </h2>
                </Reveal>

                <div className="space-y-3">
                  {catFaqs.map((faq, faqIdx) => {
                    const isOpen = openId === faq.id;
                    return (
                      <Reveal key={faq.id} delay={faqIdx * 0.05}>
                        <div className="border border-navy-primary/5 rounded-lg overflow-hidden bg-purewhite transition-all duration-300 hover:border-gold-primary/20 elevation-resting">
                          <button
                            onClick={() => toggle(faq.id)}
                            className="w-full flex items-center justify-between px-5 py-4 text-left font-display text-xs sm:text-sm font-semibold tracking-wide text-navy-primary hover:text-gold-primary transition-colors outline-none focus-visible:text-gold-primary"
                            aria-expanded={isOpen}
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              size={16}
                              className={`text-gold-primary transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                              >
                                <div className="px-5 pb-5 pt-1 border-t border-navy-primary/[0.05] text-[11px] sm:text-xs text-navy-primary/70 leading-relaxed font-sans">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <Reveal delay={0.3} className="mt-14">
          <div className="bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] rounded-xl p-6 sm:p-8 border border-gold-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2 text-left">
              <h3 className="font-display font-medium text-base text-gold-primary">
                Still have questions about your specific property?
              </h3>
              <p className="text-[11px] sm:text-xs text-[#FFFFFF]/70 dark:text-[#F3F4F6]/70 leading-relaxed max-w-xl font-sans">
                Our technicians can audit your layout plans or visit your site in Hyderabad to check dimensions, TDS, and phase compatibility.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link href="/consultation">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto text-[10px] uppercase font-bold tracking-wider"
                >
                  Book Site Audit
                  <ArrowRight size={12} className="ml-1.5" />
                </Button>
              </Link>
              <a
                href="tel:+919849012345"
                className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 border border-[#FFFFFF]/25 dark:border-[#F3F4F6]/25 hover:border-gold-primary hover:bg-[#FFFFFF]/5 dark:hover:bg-[#F3F4F6]/5 rounded-full font-sans font-bold text-[10px] uppercase tracking-wider text-[#FFFFFF] dark:text-[#F3F4F6] transition-all duration-300"
              >
                <Phone size={12} className="mr-1.5" />
                Call Advisor
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
