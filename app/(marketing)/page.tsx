import * as React from "react";
import { WaterRibbon } from "@/components/shared/WaterRibbon";
import { Hero } from "@/components/home/Hero";
import { FeaturedSolutions } from "@/components/home/FeaturedSolutions";
import { AquaEliteApproach } from "@/components/home/AquaEliteApproach";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { TrustedBrands } from "@/components/home/TrustedBrands";
import { RecentInstallations } from "@/components/home/RecentInstallations";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <WaterRibbon />
      <Hero />
      <FeaturedSolutions />
      <AquaEliteApproach />
      <FeaturedProducts />
      <TrustedBrands />
      <RecentInstallations />
      <FinalCTA />
    </div>
  );
}
