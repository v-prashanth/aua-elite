"use client";

import * as React from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export interface FAQItem {
  id: string;
  category?: string | null;
  question: string;
  answer: string;
}

interface FAQListProps {
  initialFaqs: FAQItem[];
}

export function FAQList({ initialFaqs }: FAQListProps) {
  const [openId, setOpenId] = React.useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Group FAQs by category
  const categories = Array.from(new Set(initialFaqs.map((faq) => faq.category || "General")));

  return (
    <div className="space-y-10">
      {categories.map((category, catIdx) => {
        const catFaqs = initialFaqs.filter((faq) => (faq.category || "General") === category);
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
  );
}
