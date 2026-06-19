export type Solution = {
  id: string;
  audience: string; // "Bespoke Luxury Bathrooms" | "Large Villas" | "Boutique Hotels & Resorts" | "Premium Apartments" | "High-End Commercial"
  icon: string;
  problems: string[];
  recommendations: string[]; // product slugs
  cta: string;
};

export const solutions: Solution[] = [
  {
    id: "bathrooms",
    audience: "Bespoke Luxury Bathrooms",
    icon: "Sparkles",
    problems: [
      "Hard water scaling ruining expensive designer brassware and custom glass enclosures.",
      "Water pressure changes altering shower temperature mid-experience.",
      "Bulky heating appliances taking up premium bathroom layout real estate."
    ],
    recommendations: [
      "dhb-e-18-24-comfort-series",
      "ae-softflow-pro-water-softener"
    ],
    cta: "Design Your Perfect Bath"
  },
  {
    id: "villas",
    audience: "Large Villas",
    icon: "Home",
    problems: [
      "Traditional geysers running out of hot water during family shower rushes.",
      "Large, ugly storage tanks ruining modern rooftop and utility design concepts.",
      "High electricity bills from keeping large volumes of water heated constantly."
    ],
    recommendations: [
      "dhb-e-18-24-comfort-series",
      "hpa-o-300-l-heat-pump",
      "ae-softflow-pro-water-softener"
    ],
    cta: "Optimize Villa Water Comfort"
  },
  {
    id: "apartments",
    audience: "Premium Apartments",
    icon: "Building",
    problems: [
      "Limited utility space or vanity cabinets preventing large storage cylinders.",
      "Lack of three-phase electrical loads or strict structural restrictions.",
      "Low main pressure and temperature drops at peak morning hours."
    ],
    recommendations: [
      "dhb-e-11-13-electronic-control",
      "ae-softflow-pro-water-softener"
    ],
    cta: "Configure Apartment Systems"
  },
  {
    id: "hotels",
    audience: "Boutique Hotels & Resorts",
    icon: "Hotel",
    problems: [
      "Guest complaints about hot water latency or temperature fluctuations.",
      "Excessive heating overhead during off-peak occupancy seasons.",
      "High roof space footprint taken by bulky solar panels and storage units."
    ],
    recommendations: [
      "hpa-o-300-l-heat-pump",
      "dhb-e-27-ultra-capacity"
    ],
    cta: "Upgrade Guest Experience"
  },
  {
    id: "commercial",
    audience: "High-End Commercial Spaces",
    icon: "Building2",
    problems: [
      "Hygiene concerns regarding bacterial contamination in stored water.",
      "Rigid electrical setups requiring high maintenance overhead.",
      "High-flow demands at key hours in gyms, corporate bars, and executive lounges."
    ],
    recommendations: [
      "dhb-e-11-13-electronic-control",
      "dhb-e-27-ultra-capacity"
    ],
    cta: "Consult Commercial Division"
  }
];
