import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { faqs as localFaqs } from "@/data/faqs";
import { FAQList, FAQItem } from "@/components/faq/FAQList";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 3600; // Cache for 1 hour, auto-revalidated by server actions

export default async function FAQPage() {
  let displayFaqs: FAQItem[] = localFaqs;

  try {
    const supabase = await createClient();
    const { data: dbFaqs, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (!error && dbFaqs && dbFaqs.length > 0) {
      displayFaqs = dbFaqs;
    }
  } catch (err) {
    console.warn("Failed to fetch FAQs from Supabase. Falling back to local data.", err);
  }

  return (
    <div className="relative min-h-screen pb-16 md:pb-24 bg-offwhite text-left">
      <PageHeader
        tagline="Support Center"
        title="Frequently Asked Questions"
        description="Find simple, straightforward answers regarding plumbing pressure, three-phase power loads, water hardness solutions, and manufacturer warranties."
        containerClassName="max-w-4xl"
      />

      <Container className="max-w-4xl py-12">
        {/* Accordion list */}
        <FAQList initialFaqs={displayFaqs} />

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
                href="tel:+918555998216"
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
