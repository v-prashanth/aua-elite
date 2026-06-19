export type ComparisonOption = {
  label: string;
  points: {
    icon: string;
    text: string;
    sentiment: "negative" | "neutral" | "positive";
  }[];
};

export type Comparison = {
  id: string;
  title: string;
  options: ComparisonOption[];
};

export const comparisons: Comparison[] = [
  {
    id: "instant-vs-storage",
    title: "Traditional Storage vs Stiebel Eltron Tankless Heaters",
    options: [
      {
        label: "Traditional Storage Geysers",
        points: [
          { icon: "ShieldAlert", text: "Stagnant hot water creates breeding ground for bacteria (Legionella)", sentiment: "negative" },
          { icon: "AlertTriangle", text: "Limited capacity: Hot water runs out mid-shower, requiring reheating time", sentiment: "negative" },
          { icon: "Coins", text: "Constant standby energy loss to keep water hot 24/7", sentiment: "negative" },
          { icon: "FolderLock", text: "Bulky aesthetic that ruins premium bathroom wall design", sentiment: "negative" }
        ]
      },
      {
        label: "Stiebel Eltron Tankless Heaters",
        points: [
          { icon: "ShieldCheck", text: "Absolute hygiene: Water is heated instantly in a single pass with zero stagnation", sentiment: "positive" },
          { icon: "Zap", text: "Endless comfort: Continuous hot water flow for as long as you need it", sentiment: "positive" },
          { icon: "TrendingDown", text: "Saves up to 30% electricity by heating water only on demand", sentiment: "positive" },
          { icon: "Sparkles", text: "Compact German chassis fits inside vanity cabinets or small niches", sentiment: "positive" }
        ]
      }
    ]
  },
  {
    id: "hygiene-tank-vs-tankless",
    title: "Hygiene & Safety: Storage Tanks vs Instant Flow",
    options: [
      {
        label: "Traditional Storage Tanks",
        points: [
          { icon: "Activity", text: "Internal corrosion and rust accumulate sediment inside the container", sentiment: "negative" },
          { icon: "Thermometer", text: "Standby temps below 60 °C accelerate bacterial colonization", sentiment: "negative" },
          { icon: "AlertCircle", text: "Requires regular flushing and chemical anode replacement", sentiment: "neutral" }
        ]
      },
      {
        label: "Stiebel Eltron Bare-Wire Systems",
        points: [
          { icon: "Shield", text: "Limescale resistant bare wire elements prevent internal debris build-up", sentiment: "positive" },
          { icon: "Lock", text: "Heats dynamic water to precise targeted temps instantly, bypassing stagnation", sentiment: "positive" },
          { icon: "UserCheck", text: "Maintenance-free design without anode rod replacement hassles", sentiment: "positive" }
        ]
      }
    ]
  },
  {
    id: "solar-vs-heat-pump",
    title: "Eco-Heating: Solar Water Heaters vs Air-Source Heat Pumps",
    options: [
      {
        label: "Solar Water Heaters",
        points: [
          { icon: "CloudSun", text: "Completely weather dependent; performs poorly on cloudy or monsoon days", sentiment: "negative" },
          { icon: "Wrench", text: "Glass tubes and panels on roof require periodic cleaning and break easily", sentiment: "negative" },
          { icon: "EyeOff", text: "Bulky frame ruins architectural rooflines and terrace layouts", sentiment: "negative" },
          { icon: "AlertCircle", text: "High auxiliary electrical backup usage in winter season", sentiment: "neutral" }
        ]
      },
      {
        label: "Stiebel Eltron Heat Pumps",
        points: [
          { icon: "Sun", text: "Flawless operation 24/7/365, regardless of rain, clouds, or night-time ambient temps", sentiment: "positive" },
          { icon: "Cpu", text: "Generates 4 units of thermal heat energy for every 1 unit of electricity consumed", sentiment: "positive" },
          { icon: "Layout", text: "Chic modern cylinder footprint takes very little terrace space", sentiment: "positive" },
          { icon: "Coins", text: "Up to 75% energy cost reduction compared to standard electrical heaters", sentiment: "positive" }
        ]
      }
    ]
  }
];
