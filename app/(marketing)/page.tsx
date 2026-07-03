import * as React from "react";
import { Hero } from "@/components/home/Hero";
import { FeaturedSolutions } from "@/components/home/FeaturedSolutions";
import { AquaEliteApproach } from "@/components/home/AquaEliteApproach";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustedBrands } from "@/components/home/TrustedBrands";
import { RecentInstallations } from "@/components/home/RecentInstallations";
import { FinalCTA } from "@/components/home/FinalCTA";
import { WaterRibbon } from "@/components/shared/WaterRibbon";
import { createClient } from "@/lib/supabase/server";
import { Brand } from "@/lib/supabase/database.types";

export const revalidate = 3600; // Cache for 1 hour, auto-revalidated by server actions

export default async function Home() {
  let heroContent = null;
  let howWeWorkQuote = "";
  let brandsData: Brand[] = [];

  try {
    const supabase = await createClient();
    
    // Fetch Hero Content
    const { data: dbHero } = await supabase
      .from("hero_content")
      .select("*")
      .maybeSingle();
    
    if (dbHero) {
      heroContent = {
        heading: dbHero.heading,
        subheading: dbHero.subheading ?? "",
        tagline: dbHero.tagline ?? "",
        cta_text: dbHero.cta_text ?? "",
        cta_link: dbHero.cta_link ?? "",
      };
    }

    // Fetch How We Work Quote
    const { data: dbQuote } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "how_we_work_quote")
      .maybeSingle();

    if (dbQuote && typeof dbQuote.value === "string") {
      howWeWorkQuote = dbQuote.value;
    }

    // Fetch Brands
    const { data: dbBrands } = await supabase
      .from("brands")
      .select("*")
      .eq("visible", true)
      .order("display_order", { ascending: true });

    if (dbBrands) {
      brandsData = dbBrands;
    }
  } catch (err) {
    console.warn("Failed to fetch home page data from Supabase. Using local fallbacks.", err);
  }

  return (
    <div className="relative min-h-screen">
      <WaterRibbon />
      <Hero content={heroContent} />
      <FeaturedSolutions />
      <AquaEliteApproach quote={howWeWorkQuote} />
      <FeaturedProducts />
      <TrustedBrands initialBrands={brandsData} />
      <RecentInstallations />
      <FinalCTA />
    </div>
  );
}
