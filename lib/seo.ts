import { Metadata } from "next";

type MetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openGraph?: Record<string, any>;
};

export const siteConfig = {
  name: "Aqua Elite Solutions",
  description: "Complete Water & Heating Solutions - Authorized Stiebel Eltron Dealer in Hyderabad. Offering premium German tankless water heaters, heat pumps, and water softeners.",
  url: "https://aquaelitesolutions.com",
};

/**
 * Helper to generate page metadata with consistent structure and SEO rules.
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  openGraph = {},
}: MetadataInput): Metadata {
  const fullTitle = `${title} | ${siteConfig.name} — Premium Water & Heating`;
  
  return {
    title: fullTitle,
    description,
    keywords: [
      "Stiebel Eltron Hyderabad",
      "premium water heater Hyderabad",
      "tankless water heaters",
      "luxury heat pump Hyderabad",
      "water softener Hyderabad",
      "luxury home water solutions",
      ...keywords,
    ],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: fullTitle,
      description,
      url: "./",
      siteName: siteConfig.name,
      type: "website",
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
export const defaultMetadata: Metadata = generateMetadata({
  title: "Complete Water & Heating Solutions",
  description: siteConfig.description,
});
