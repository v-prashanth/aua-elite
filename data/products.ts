export type ProductHotspot = {
  id: string;
  title: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
};

export type Product = {
  id: string;
  slug: string;
  category: "tankless" | "heat-pump" | "water-softener";
  title: string;
  subtitle: string;
  brand: string; // "Stiebel Eltron" or "Aqua Elite Solutions"
  overview: string;
  bestSuited: string;
  benefits: string[];
  features: string[];
  applications: string[];
  specifications: Record<string, string>;
  status: "available" | "coming-soon";
  heroColor?: string;
  galleryColors?: string[];
  techBlueprint?: ProductHotspot[];
  relatedProducts?: string[];
};

export const products: Product[] = [
  {
    id: "dhb-e-11-13",
    slug: "dhb-e-11-13-electronic-control",
    category: "tankless",
    title: "DHB-E 11/13 LCD",
    subtitle: "Compact Under-Sink Electronic Instantaneous Water Heater",
    brand: "Stiebel Eltron",
    overview: "Designed for spaces where high-capacity three-phase power is not feasible or unnecessary. This German tankless unit delivers hot water efficiently directly to a single outlet.",
    bestSuited: "Premium kitchen islands, utility basins, powder rooms, and small single-shower apartments.",
    benefits: [
      "No standby losses: heats water only when the tap is turned on.",
      "Requires minimal under-sink space, leaving vanity cabinets empty and clean.",
      "Constant temperature control prevents cold water fluctuations during wash cycles."
    ],
    features: [
      "Electronic flow controller dynamically adjusts heating element based on pressure.",
      "Flexible power options: switchable output between 11 kW and 13 kW during installation.",
      "Bare-wire heating element inside composite pressure block is highly scale-resistant."
    ],
    applications: [
      "Premium Kitchen Sinks",
      "Powder Room Vanities",
      "Utility Washing Basins",
      "Single Bathroom Hand Wash Points"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "11.0 / 13.1 kW",
      "Rated Current": "18.5 / 20.0 A",
      "Temperature Settings": "35 °C, 45 °C, 55 °C",
      "Inlet Flow Activation": "2.5 Liters/min",
      "Max Operating Pressure": "10 Bar (1.0 MPa)",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Dimensions (H x W x D)": "470 x 225 x 110 mm",
      "Weight (wet)": "3.6 kg",
      "Country of Origin": "Germany"
    },
    status: "available",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "bare-wire", title: "Bare-Wire Element", x: 50, y: 70, description: "Scale-resistant heating coils that shed minerals dynamically." },
      { id: "logic-board", title: "Microprocessor Logic", x: 50, y: 25, description: "Computes flow rates and power needs 50 times per second for exact temp control." },
      { id: "flow-sensor", title: "Turbine Flow Sensor", x: 30, y: 85, description: "Triggers instant activation when flow exceeds 2.5 Liters per minute." }
    ],
    relatedProducts: ["ae-softflow-pro"]
  },
  {
    id: "dhb-e-18-24",
    slug: "dhb-e-18-24-comfort-series",
    category: "tankless",
    title: "DHB-E 18/21/24 LCD",
    subtitle: "Precision Electronic Whole-Bathroom Water Heater",
    brand: "Stiebel Eltron",
    overview: "Our most popular integration solution. It delivers continuous, temperature-locked hot water to master bathrooms, fully concealed inside vanity units or service shafts.",
    bestSuited: "Luxury bathrooms running high-flow rain showers, multi-outlet setups, or soaking tubs simultaneously.",
    benefits: [
      "Endless hot water: never runs out, regardless of shower duration.",
      "Eliminates geyser cabinets on walls, allowing architects clean visual layout plans.",
      "Saves up to 30% on electricity compared to storage geysers."
    ],
    features: [
      "Digital LCD interface allows precise temperature selections between 20°C and 60°C.",
      "Dynamic flow rate controller dampens sudden mains pressure fluctuations.",
      "Internal scald thermostat limits hot water to a safe maximum of 43°C."
    ],
    applications: [
      "Multi-outlet Luxury Bathrooms",
      "Private Villa Master Showers",
      "Wellness Soak Tubs",
      "High-Flow Vanity Ensuites"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "18.0 / 21.0 / 24.0 kW",
      "Rated Current": "29.0 / 31.0 / 35.0 A",
      "Temperature Range": "20 °C – 60 °C (Variable)",
      "Flow Rate at 38 °C": "9.9 / 11.6 / 13.2 Liters/min",
      "Max Operating Pressure": "10 Bar (1.0 MPa)",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Dimensions (H x W x D)": "470 x 225 x 110 mm",
      "Weight (wet)": "3.6 kg",
      "Country of Origin": "Germany"
    },
    status: "available",
    heroColor: "from-amber-50 to-[#F6F1E5]",
    galleryColors: ["#F6F1E5", "#EBE0CD", "#DCC9A8"],
    techBlueprint: [
      { id: "bare-wire", title: "Composite Bare-Wire Block", x: 50, y: 70, description: "Highly efficient switchable bare-wire heating element." },
      { id: "logic-board", title: "Electronic Board", x: 50, y: 25, description: "Regulates energy use to lock temperature stability." },
      { id: "scald-thermo", title: "Scald Limiter", x: 70, y: 45, description: "Safety cutoff triggers if temperature spikes above safety threshold." }
    ],
    relatedProducts: ["ae-softflow-pro"]
  },
  {
    id: "dhb-e-27",
    slug: "dhb-e-27-ultra-capacity",
    category: "tankless",
    title: "DHB-E 27 LCD",
    subtitle: "High-Capacity Power Tankless Water Heater",
    brand: "Stiebel Eltron",
    overview: "Built for massive hot water demands. This high-capacity 27 kW German unit provides endless water flow without temperature drops, even when supplying multiple fixtures simultaneously.",
    bestSuited: "Large master suites running massive custom rain showers (15+ Liters/min), body jets, or large wellness jacuzzi pools.",
    benefits: [
      "Heavy-duty instant heating: handles multiple high-volume outlets simultaneously.",
      "Compact German chassis fits inside standard vanity cabinets, out of sight.",
      "Completely eliminates stagnant water storage, protecting against bacterial growth."
    ],
    features: [
      "Microprocessor checks incoming temperature and flow rates 50 times per second.",
      "High-output Bare Wire element delivers rapid temperature adjustments under high pressure.",
      "Dual-pole safety cutout switches off element power in microseconds in case of anomalies."
    ],
    applications: [
      "Villas with high-capacity customized rain domes",
      "Jacuzzis and Spa Wellness zones",
      "Parallel bathroom plumbing loops",
      "Premium Commercial Dressing Rooms"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "27.0 kW",
      "Rated Current": "39.0 A",
      "Temperature Range": "20 °C – 60 °C",
      "Flow Rate at 38 °C": "14.8 Liters/min",
      "Max Operating Pressure": "10 Bar",
      "IP Rating": "IP 25",
      "Dimensions (H x W x D)": "470 x 225 x 110 mm",
      "Weight (wet)": "3.6 kg",
      "Country of Origin": "Germany"
    },
    status: "available",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "bare-wire", title: "Heavy Duty Bare-Wire element", x: 50, y: 70, description: "Powerful heating element block designed for flow rates up to 15L/min." },
      { id: "logic-board", title: "Precise Logic Processor", x: 50, y: 25, description: "Ensures temperature accuracy during parallel shower activations." },
      { id: "safety-trip", title: "High-Temperature Trip", x: 70, y: 45, description: "Cuts power automatically in case of flow obstruction." }
    ],
    relatedProducts: ["ae-softflow-pro"]
  },
  {
    id: "hpa-o-300-l",
    slug: "hpa-o-300-l-heat-pump",
    category: "heat-pump",
    title: "HPA-O 300 L Premium",
    subtitle: "Central Air-Source Thermal Heat Pump",
    brand: "Stiebel Eltron",
    overview: "An eco-efficient central hot water system. It extracts thermal energy from the ambient air to heat a centralized water storage cylinder, reducing energy use significantly.",
    bestSuited: "Full-villa central hot water supply where single-point high-amperage power is not preferred on secondary outlets.",
    benefits: [
      "Up to 75% running cost reduction compared to standard electric boilers.",
      "Operates 24/7/365, independent of weather conditions, clouds, or monsoons.",
      "Integrates with smart solar grids to utilize surplus local power."
    ],
    features: [
      "Enamelled steel cylinder with maintenance-free electronic protection anode.",
      "Inverter compressor regulates output based on surrounding air temperature.",
      "Low sound profile suitable for installations in luxury residential settings."
    ],
    applications: [
      "Full-Villa Central Hot Water Loops",
      "Luxury Boutiques & Wellness Retreats",
      "High-occupancy residential properties",
      "Sports Club Dressing Rooms"
    ],
    specifications: {
      "Cylinder Capacity": "300 Liters",
      "COP (Coefficient of Performance)": "3.22 (at A20 / W10-55)",
      "Hot Water Temperature": "Up to 65 °C",
      "Refrigerant Type": "R134a",
      "Sound Level (at 1m)": "45 dB(A)",
      "Power Connection": "230 V (Single Phase)",
      "Weight (dry)": "135 kg",
      "Cylinder Material": "Enamelled Steel with PU insulation",
      "Country of Origin": "Germany"
    },
    status: "available",
    heroColor: "from-emerald-50 to-[#E6F4EA]",
    galleryColors: ["#E6F4EA", "#CCE8D5", "#AEDCBD"],
    techBlueprint: [
      { id: "evaporator", title: "Ambient Evaporator Coil", x: 50, y: 15, description: "Extracts heat energy from outdoor air currents, operating even in monsoons." },
      { id: "compressor", title: "Inverter Compressor", x: 30, y: 80, description: "Uses minimal electricity to compress refrigerant, elevating thermal output." },
      { id: "tank-anode", title: "Electronic Anode", x: 70, y: 50, description: "Self-monitoring corrosion prevention shield protecting the inner cylinder." }
    ],
    relatedProducts: ["ae-softflow-pro"]
  },
  {
    id: "ae-softflow-pro",
    slug: "ae-softflow-pro-water-softener",
    category: "water-softener",
    title: "AE SoftFlow Pro 500",
    subtitle: "Smart Automated Ion-Exchange Water Softener",
    brand: "Aqua Elite Solutions",
    overview: "Engineered specifically for Hyderabad's high TDS groundwater profiles. This automated softener reduces mineral hardness to zero, protecting pipes, fixtures, and skin.",
    bestSuited: "Whole-home water softening to prevent scaling in rain showers, under-sink heaters, and luxury glass enclosures.",
    benefits: [
      "100% scale prevention: extends the lifespan of tankless heaters and designer brassware.",
      "Gentler on skin and hair by eliminating harsh calcium and magnesium minerals.",
      "Reduces soap and detergent consumption by up to 50% by increasing lather efficiency."
    ],
    features: [
      "Volumetric control valve triggers resin regeneration based on water usage, not time.",
      "Intelligent salt level monitor provides visual alerts when salt refills are needed.",
      "Durable structural pressure vessel housed inside a sleek, premium protective casing."
    ],
    applications: [
      "Whole-Villa Main Inlet Softening",
      "Upstream Protection for Tankless Systems",
      "Premium Ensuites and Kitchen Lines",
      "Spa Filtration Networks"
    ],
    specifications: {
      "Flow Rate Capacity": "2.5 m³/hour",
      "Resin Tank Volume": "25 Liters",
      "Hardness Reduction Limit": "Up to 1000 ppm",
      "Regeneration Valve": "Volumetric Automation",
      "Power Connection": "220 V / 50 Hz",
      "Operating Pressure Range": "1.5 – 6.0 Bar",
      "Salt Chamber Capacity": "50 kg",
      "Warranty": "5 Years on Vessel, 2 Years on Valve"
    },
    status: "available",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "resin-tank", title: "Ion-Exchange Resin Bed", x: 50, y: 65, description: "Captures calcium and magnesium minerals as water passes through." },
      { id: "smart-valve", title: "Volumetric Control Valve", x: 50, y: 15, description: "Automatically triggers regeneration only after processing target water volume." },
      { id: "brine-tank", title: "Dual Salt Chamber", x: 30, y: 80, description: "Holds up to 50kg of salt to regenerate resin capacity automatically." }
    ],
    relatedProducts: ["dhb-e-18-24", "hpa-o-300-l"]
  }
];
