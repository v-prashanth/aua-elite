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
  category: "tankless-3ph" | "tankless-1ph" | "heat-pump" | "water-filter";
  title: string;
  subtitle: string;
  brand: string; // "Stiebel Eltron" etc.
  overview: string;
  bestSuited: string;
  benefits: string[];
  features: string[];
  applications: string[];
  specifications: Record<string, string>;
  status: "available" | "coming-soon";
  showerUse?: string;
  powerType: "three-phase" | "single-phase" | "none";
  heroColor?: string;
  galleryColors?: string[];
  techBlueprint?: ProductHotspot[];
  relatedProducts?: string[];
  image: string;
  requirements: string[];
};

export const products: Product[] = [
  // --- 1. Three-Phase Tankless (Stiebel Eltron) - 5 products ---
  {
    id: "dhb-e-11-13",
    image: "/images/product_excel_D6.jpg",
    requirements: ["Kitchen Use", "Small Bathroom", "Rain Shower"],

    slug: "dhb-e-11-13-electronic-control",
    category: "tankless-3ph",
    title: "DHB-E 11/13 LCD",
    subtitle: "Compact Under-Sink Electronic Instantaneous Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. This instantaneous water heater with electronic control delivers accurate hot water temperature from 20°C to 60°C with advanced 3i technology. Designed for situations where moderate three-phase capacity is preferred.",
    bestSuited: "Premium kitchen islands, utility basins, powder rooms, and small hand shower applications.",
    benefits: [
      "No standby energy losses: heats water only when the tap is active.",
      "Ultra-compact under-sink footprint, leaving vanity cabinets empty and clean.",
      "Constant temperature control prevents cold water fluctuations during use."
    ],
    features: [
      "3i technology electronic control system for high energy efficiency.",
      "Flexible power options: switchable output between 11 kW and 13 kW during installation.",
      "Bare-wire heating element is scale-resistant and highly durable."
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
      "Temperature Range": "20 °C – 60 °C",
      "Inlet Flow Activation": "2.5 Liters/min",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Basic Hand Shower",
    powerType: "three-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "bare-wire", title: "Bare-Wire Element", x: 50, y: 70, description: "Scale-resistant heating coils that shed minerals dynamically." },
      { id: "logic-board", title: "Microprocessor Logic", x: 50, y: 25, description: "Computes flow rates and power needs 50 times per second for exact temp control." },
      { id: "flow-sensor", title: "Turbine Flow Sensor", x: 30, y: 85, description: "Triggers instant activation when flow exceeds 2.5 Liters per minute." }
    ],
    relatedProducts: ["dhb-e-18-24", "dhe-18-21-24"]
  },
  {
    id: "dhb-e-18-24",
    image: "/images/product_excel_D6.jpg",
    requirements: ["Rain Shower", "Luxury Bathroom"],

    slug: "dhb-e-18-24-comfort-series",
    category: "tankless-3ph",
    title: "DHB-E 18/21/24 LCD",
    subtitle: "Precision Electronic Whole-Bathroom Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. This instantaneous water heater with electronic control delivers accurate hot water temperature from 20°C to 60°C with advanced 3i technology. Features multi-output power options to supply standard rain showers.",
    bestSuited: "Luxury bathrooms running standard rain showers, multi-outlet setups, or soaking tubs.",
    benefits: [
      "Continuous hot water: never runs out, regardless of shower duration.",
      "Eliminates bulky geyser cabinets on walls, allowing clean visual layout plans.",
      "Saves up to 30% on electricity compared to traditional storage geysers."
    ],
    features: [
      "Digital LCD interface allows precise temperature selections between 20°C and 60°C.",
      "Dynamic flow rate controller dampens sudden mains pressure fluctuations.",
      "Internal safety cut-out system for maximum overheating protection."
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
      "Temperature Range": "20 °C – 60 °C",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Basic Rain Shower / Large Rain Shower",
    powerType: "three-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "bare-wire", title: "Composite Bare-Wire Block", x: 50, y: 70, description: "Highly efficient switchable bare-wire heating element." },
      { id: "logic-board", title: "Electronic Board", x: 50, y: 25, description: "Regulates energy use to lock temperature stability." },
      { id: "scald-thermo", title: "Scald Limiter", x: 70, y: 45, description: "Safety cutoff triggers if temperature spikes above safety threshold." }
    ],
    relatedProducts: ["dhb-e-27", "dhe-18-21-24"]
  },
  {
    id: "dhb-e-27",
    image: "/images/product_excel_D6.jpg",
    requirements: ["Luxury Bathroom", "Bathtub"],

    slug: "dhb-e-27-ultra-capacity",
    category: "tankless-3ph",
    title: "DHB-E 27 LCD",
    subtitle: "High-Capacity Power Tankless Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. High-capacity instantaneous water heater with electronic control. Delivers accurate hot water temperature from 20°C to 60°C with 3i technology, offering 27 kW of power to handle heavy-demand fixtures.",
    bestSuited: "Large master suites running custom rain showers, body jets, or luxury tubs.",
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
      "Parallel bathroom plumbing loops"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "27.0 kW",
      "Temperature Range": "20 °C – 60 °C",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Body Jets / Tubs",
    powerType: "three-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "bare-wire", title: "Heavy Duty Bare-Wire element", x: 50, y: 70, description: "Powerful heating element block designed for flow rates up to 15L/min." },
      { id: "logic-board", title: "Precise Logic Processor", x: 50, y: 25, description: "Ensures temperature accuracy during parallel shower activations." },
      { id: "safety-trip", title: "High-Temperature Trip", x: 70, y: 45, description: "Cuts power automatically in case of flow obstruction." }
    ],
    relatedProducts: ["dhb-e-18-24", "dhe-27"]
  },
  {
    id: "dhe-18-21-24",
    image: "/images/product_excel_D10.jpeg",
    requirements: ["Rain Shower", "Luxury Bathroom", "Hotels & Commercial"],

    slug: "dhe-18-21-24-premium",
    category: "tankless-3ph",
    title: "DHE 18/21/24",
    subtitle: "Premium Full-Electronic Multi-Power Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. Premium instantaneous water heater with full electronic control. Provides precise hot water temperature from 20°C to 60°C with advanced 4i technology, compensating automatically for pressure and inlet fluctuations.",
    bestSuited: "Ultra-luxury bathrooms running rain showers, multiple body jets, or wellness tubs.",
    benefits: [
      "Absolute temperature stability: 4i technology maintains temp down to the degree.",
      "Maximum energy efficiency: saves up to 30% water and energy over storage units.",
      "High-end diagnostic display showing temperature, flow rates, and savings stats."
    ],
    features: [
      "Full electronic control with motor-driven valve to keep output temperature constant.",
      "Quick temperature memory buttons for customized comfort profiles.",
      "Bare wire heating system suitable for both hard and soft water areas."
    ],
    applications: [
      "Villas and Penthouses with Rain Showers",
      "Ensuite Luxury Bathrooms",
      "Wellness Zones and Spas"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "18.0 / 21.0 / 24.0 kW",
      "Temperature Range": "20 °C – 60 °C",
      "Control Technology": "4i Technology (Fully Electronic)",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Basic Rain Shower / Large Rain Shower",
    powerType: "three-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "4i-technology", title: "4i Control Board", x: 50, y: 25, description: "Precise microprocessor tracking of flow and temp sensors for absolute consistency." },
      { id: "motor-valve", title: "Motor-Driven Flow Valve", x: 70, y: 45, description: "Dynamically regulates water volume to maintain selected output temperature." },
      { id: "bare-wire-dhe", title: "Advanced Bare-Wire Block", x: 50, y: 70, description: "Premium scale-resistant elements designed for rapid thermal exchange." }
    ],
    relatedProducts: ["dhe-27", "dhb-e-18-24"]
  },
  {
    id: "dhe-27",
    image: "/images/product_excel_D10.jpeg",
    requirements: ["Luxury Bathroom", "Bathtub", "Hotels & Commercial"],

    slug: "dhe-27-premium",
    category: "tankless-3ph",
    title: "DHE 27",
    subtitle: "Ultimate Full-Electronic High-Capacity Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. The ultimate in instantaneous water heating power and precision. The 27 kW DHE model utilizes full electronic control and 4i technology to maintain perfect temperature stability at maximum flow rates.",
    bestSuited: "Large luxury villas with high-flow custom rain panels, body jets, or soaking tubs.",
    benefits: [
      "4i technology ensures zero temperature drops even under heavy concurrent loads.",
      "Fully electronic flow control matches energy output to exact hot water demand.",
      "Premium glass-front look with clear digital interface."
    ],
    features: [
      "German engineered bare-wire heating element designed for heavy duty cycles.",
      "ECO mode for highly efficient water-saving and energy-saving operation.",
      "Stepless temperature selection from 20°C to 60°C."
    ],
    applications: [
      "Jacuzzis and Soak Tubs",
      "High-flow Multi-nozzle Shower Systems",
      "Large Scale Residential Suites"
    ],
    specifications: {
      "Rated Voltage": "400 V (Three-Phase Connection Required)",
      "Rated Output": "27.0 kW",
      "Temperature Range": "20 °C – 60 °C",
      "Control Technology": "4i Technology (Fully Electronic)",
      "IP Rating": "IP 25 (Jet-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Body Jets / Tubs",
    powerType: "three-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "4i-technology", title: "4i Control Board", x: 50, y: 25, description: "Precise microprocessor tracking of flow and temp sensors for absolute consistency." },
      { id: "motor-valve", title: "Motor-Driven Flow Valve", x: 70, y: 45, description: "Dynamically regulates water volume to maintain selected output temperature." },
      { id: "bare-wire-dhe", title: "Advanced Bare-Wire Block", x: 50, y: 70, description: "Premium scale-resistant elements designed for rapid thermal exchange." }
    ],
    relatedProducts: ["dhe-18-21-24", "dhb-e-27"]
  },

  // --- 2. Single-Phase Tankless (Stiebel Eltron) - 7 products ---
  {
    id: "dce-x-6-8",
    image: "/images/product_excel_D13.jpg",
    requirements: ["Small Bathroom"],

    slug: "dce-x-6-8-premium",
    category: "tankless-1ph",
    title: "DCE-X 6/8 Premium",
    subtitle: "Compact German Single-Phase Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. Instantaneous water heater with full electronic control. Provides precise hot temperature up to 60°C with 4i technology, allowing single-phase households to enjoy premium comfort without fluctuations.",
    bestSuited: "Small-to-medium bathrooms, guest ensuites, and dedicated hand shower points.",
    benefits: [
      "Compact German chassis fits inside narrow vanity units, saving storage space.",
      "Eliminates standard pre-heating cycles, delivering immediate hot water.",
      "4i technology ensures stable temperatures even under pressure variations."
    ],
    features: [
      "Electronic flow rate control and temperature sensors.",
      "Switchable output between 6.0 kW and 8.0 kW depending on local electrical setups.",
      "Digital display screen for precise control."
    ],
    applications: [
      "Small Bathroom Showers",
      "Guest Ensuites",
      "Utility Basins"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "6.0 / 8.0 kW",
      "Temperature Range": "20 °C – 60 °C",
      "Control Technology": "4i Technology (Fully Electronic)",
      "IP Rating": "IP 24 (Splash-Proof)",
      "Country of Origin": "Germany"
    },
    status: "available",
    showerUse: "Small Shower",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "4i-technology", title: "4i Control Board", x: 50, y: 25, description: "Precise microprocessor tracking of flow and temp sensors for absolute consistency." },
      { id: "bare-wire", title: "Bare-Wire Element", x: 50, y: 70, description: "Scale-resistant heating coils that shed minerals dynamically." }
    ],
    relatedProducts: ["dce-x-10-12", "ddp-6-ec"]
  },
  {
    id: "dce-x-10-12",
    image: "/images/product_excel_D13.jpg",
    requirements: ["Small Bathroom", "Rain Shower"],

    slug: "dce-x-10-12-premium",
    category: "tankless-1ph",
    title: "DCE-X 10/12 Premium",
    subtitle: "High-Capacity Single-Phase Instant Water Heater",
    brand: "Stiebel Eltron",
    overview: "Made in Germany. High-output instantaneous water heater with full electronic control. Provides precise hot temperature up to 60°C with 4i technology, offering switchable 10 kW / 12 kW output for reliable hot water at higher flow rates.",
    bestSuited: "Medium-sized bathrooms, master suites without three-phase capacity, and utility sinks.",
    benefits: [
      "Highest capacity single-phase instant water heater available.",
      "Eliminates the need for 400V cabling while supplying medium-flow shower requirements.",
      "4i technology ensures temperature consistency even with water pressure shifts."
    ],
    features: [
      "Variable temperature selection up to 60°C.",
      "German built bare-wire element block for maximum heat transfer.",
      "Sleek, minimalist design fits unobtrusively in vanity layouts."
    ],
    applications: [
      "Medium-Capacity Showers",
      "Large Kitchen Basins",
      "Premium Powder Rooms"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "10.0 / 12.0 kW",
      "Temperature Range": "20 °C – 60 °C",
      "Control Technology": "4i Technology",
      "IP Rating": "IP 24",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "4i-technology", title: "4i Control Board", x: 50, y: 25, description: "Precise microprocessor tracking of flow and temp sensors for absolute consistency." },
      { id: "bare-wire", title: "Bare-Wire Element", x: 50, y: 70, description: "Scale-resistant heating coils that shed minerals dynamically." }
    ],
    relatedProducts: ["dce-x-6-8", "ddp-6-ec"]
  },
  {
    id: "dhc-6-ec",
    image: "/images/product_excel_D15.jpeg",
    requirements: ["Kitchen Use", "Small Bathroom"],

    slug: "dhc-6-ec-in",
    category: "tankless-1ph",
    title: "DHC 6 EC (IN)",
    subtitle: "Compact Under-Sink Basin Water Heater",
    brand: "Stiebel Eltron",
    overview: "Electronically controlled water heater with compact, space-saving design. Delivers reliable, instant hot water with a 3-step temperature selection (40°C, 50°C, 60°C) backed by 3i technology.",
    bestSuited: "Kitchen sinks, utility areas, and handwashing basins in premium homes.",
    benefits: [
      "Extremely small footprint fits inside tiny under-sink cabinets.",
      "Easy 3-step temperature settings (40°C, 50°C, 60°C) for washing comfort.",
      "Scale-resistant design is highly suited to Indian groundwater."
    ],
    features: [
      "3i technology electronic control system prevents temperature spikes.",
      "Toughened copper heating cylinder for long-term durability.",
      "Built-in earth leakage safety device (ELSD)."
    ],
    applications: [
      "Premium Kitchen Sinks",
      "Utility Washpoints",
      "Executive Restrooms"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "6.0 kW",
      "Temperature Settings": "40 °C, 50 °C, 60 °C",
      "Control Technology": "3i Technology",
      "Country of Origin": "India"
    },
    status: "available",
    showerUse: "Kitchen Sink",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "copper-cylinder", title: "Copper Cylinder Block", x: 50, y: 70, description: "Heavy-duty pressure-tested copper tank designed to prevent scaling." },
      { id: "elsd", title: "Integrated ELSD", x: 30, y: 30, description: "Cuts power automatically if any earth leakage is detected." }
    ],
    relatedProducts: ["dhc-8-ec", "dhc-6-xg"]
  },
  {
    id: "dhc-8-ec",
    image: "/images/product_excel_D15.jpeg",
    requirements: ["Kitchen Use", "Small Bathroom"],

    slug: "dhc-8-ec-in",
    category: "tankless-1ph",
    title: "DHC 8 EC (IN)",
    subtitle: "High-Capacity Under-Sink Utility Water Heater",
    brand: "Stiebel Eltron",
    overview: "Electronically controlled water heater with compact, space-saving design. Provides 8 kW of heating capacity with a 3-step temperature selection (40°C, 50°C, 60°C) with 3i technology.",
    bestSuited: "Kitchens with heavy dishwashing loads, pantry bars, and utility washpoints.",
    benefits: [
      "Instant 8 kW heating speeds up washing and disinfection tasks.",
      "Heats water only on demand, eliminating hot water reservoir energy waste.",
      "Safe and robust construction designed to handle local voltage shifts."
    ],
    features: [
      "3i technology electronic control for temperature accuracy.",
      "3-step temperature settings (40°C, 50°C, 60°C) for ease of use.",
      "Robust copper heating cylinder."
    ],
    applications: [
      "High-usage Kitchen Sinks",
      "Pantry Washing Points",
      "Executive Restrooms"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "8.0 kW",
      "Temperature Settings": "40 °C, 50 °C, 60 °C",
      "Control Technology": "3i Technology",
      "Country of Origin": "India"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    relatedProducts: ["dhc-6-ec", "dhc-8-xg"]
  },
  {
    id: "dhc-6-xg",
    image: "/images/product_excel_D17.jpg",
    requirements: ["Kitchen Use", "Small Bathroom"],

    slug: "dhc-6-xg-in",
    category: "tankless-1ph",
    title: "DHC 6 XG (IN)",
    subtitle: "Slimline Stepless Control Water Heater",
    brand: "Stiebel Eltron",
    overview: "Instantaneous water heater with an extra slimline design. Features stepless power adjustment to dial in the exact heating level required, highly optimized for low flow applications.",
    bestSuited: "Slim vanity cabinets and low pressure plumbing setups.",
    benefits: [
      "Stepless adjustment dial provides fine-tuned heating control.",
      "Extra-thin profile occupies minimum space behind vanity counters.",
      "Activates at very low flow rates, ideal for low-pressure supply lines."
    ],
    features: [
      "Manual stepless temperature/power knob on front panel.",
      "Slimline chassis construction.",
      "Durable copper heating block."
    ],
    applications: [
      "Slim Under-sink Vanities",
      "Compact Powder Rooms",
      "Secondary Basin Points"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "6.0 kW",
      "Temperature Control": "Stepless manual dial",
      "Flow Activation": "Low Flow Optimized",
      "Country of Origin": "India"
    },
    status: "available",
    showerUse: "Kitchen Sink",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    techBlueprint: [
      { id: "stepless-dial", title: "Stepless Dial Knob", x: 50, y: 30, description: "Enables manual fine-tuning of electrical power output." },
      { id: "slimline-case", title: "Ultra Slim Casing", x: 50, y: 70, description: "Minimizes installation depth for tight layout restrictions." }
    ],
    relatedProducts: ["dhc-8-xg", "dhc-6-ec"]
  },
  {
    id: "dhc-8-xg",
    image: "/images/product_excel_D17.jpg",
    requirements: ["Kitchen Use", "Small Bathroom"],

    slug: "dhc-8-xg-in",
    category: "tankless-1ph",
    title: "DHC 8 XG (IN)",
    subtitle: "Slimline 8kW Stepless Basin Water Heater",
    brand: "Stiebel Eltron",
    overview: "Instantaneous water heater with an extra slimline design. Features stepless power adjustment to dial in the exact heating level required, delivering 8 kW of instant single-phase heating.",
    bestSuited: "Kitchen sinks and utility areas requiring higher temperature rises under low flow.",
    benefits: [
      "Powerful 8 kW heating output within a compact slim chassis.",
      "No standby tank losses, preserving energy efficiency.",
      "Robust mechanical controls built to last."
    ],
    features: [
      "Stepless power knob for precise flow matching.",
      "Flame-retardant casing design.",
      "Built-in thermal cut-out safety switch."
    ],
    applications: [
      "Modern Kitchen Pantries",
      "High-usage Basin Lines"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "8.0 kW",
      "Temperature Control": "Stepless manual dial",
      "Country of Origin": "India"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    relatedProducts: ["dhc-6-xg", "dhc-8-ec"]
  },
  {
    id: "ddp-6-ec",
    image: "/images/product_excel_D19.jpeg",
    requirements: ["Small Bathroom"],

    slug: "ddp-6-ec-in",
    category: "tankless-1ph",
    title: "DDP 6 EC (IN)",
    subtitle: "Compact Automatic Instant Water Heater",
    brand: "Stiebel Eltron",
    overview: "Compact, space-saving instantaneous water heater with automatic on/off control via an integrated flow switch. Equipped with anti-scalding protection, a heat-resistant copper tank, and an ELCB for enhanced safety.",
    bestSuited: "Basins and single-point compact wash areas.",
    benefits: [
      "High safety performance: integrated ELCB checks for electrical faults instantly.",
      "No manual activation required: automatically heats when water flow is detected.",
      "Long-lasting copper tank resists thermal strain."
    ],
    features: [
      "Automatic flow switch trigger.",
      "Thermal cut-out prevents scalding and element damage.",
      "Built-in ELCB (Earth Leakage Circuit Breaker)."
    ],
    applications: [
      "Utility Washbasins",
      "Secondary Restrooms",
      "Pantry Basins"
    ],
    specifications: {
      "Rated Voltage": "220 - 240 V (Single-Phase)",
      "Rated Output": "6.0 kW",
      "Tank Material": "High-Pressure Copper Tank",
      "Safety Protection": "ELCB & Overheating Cut-out",
      "Country of Origin": "India"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-blue-50 to-[#EAF0F4]",
    galleryColors: ["#EAF0F4", "#D5E1E9", "#BDD2DE"],
    relatedProducts: ["dhc-6-ec", "dce-x-6-8"]
  },

  // --- 3. Air-to-Water Heat Pumps (Stiebel Eltron) - 3 products ---
  {
    id: "wwk-302-h",
    image: "/images/product_excel_D21.jpg",
    requirements: ["Large Family Home", "Hotels & Commercial"],

    slug: "wwk-302-h-heat-pump",
    category: "heat-pump",
    title: "WWK 302 H",
    subtitle: "German High-Efficiency Monoblock Heat Pump",
    brand: "Stiebel Eltron",
    overview: "Engineered by Germany’s market leader. This monoblock heat pump features a spring-loaded roll-bond heat exchanger for maximum efficiency up to 98% and a whisper-quiet, encased compressor.",
    bestSuited: "Central hot water loops in premium villas and high-occupancy luxury homes.",
    benefits: [
      "Up to 75% operational cost reduction compared to traditional electrical boilers.",
      "Operates independent of sunlight, clouds, or rain — unlike solar panels.",
      "Whisper-quiet compressor cabinet enables installation near residential patios."
    ],
    features: [
      "Monoblock design with spring-loaded roll-bond heat exchanger.",
      "Electronic corrosion prevention anode requires zero maintenance.",
      "Sleek cylindrical form factor suitable for clean utility areas."
    ],
    applications: [
      "Villa Central Hot Water Loops",
      "Eco-Friendly Green Homes",
      "Multi-bathroom Residential Layouts"
    ],
    specifications: {
      "Cylinder Capacity": "300 Liters",
      "COP (Coefficient of Performance)": "3.22",
      "Power Connection": "230 V (Single Phase)",
      "Refrigerant Type": "R134a",
      "Sound Level (at 1m)": "45 dB(A)",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-emerald-50 to-[#E6F4EA]",
    galleryColors: ["#E6F4EA", "#CCE8D5", "#AEDCBD"],
    techBlueprint: [
      { id: "evaporator", title: "Ambient Evaporator Coil", x: 50, y: 15, description: "Extracts heat energy from outdoor air currents, operating even in monsoons." },
      { id: "compressor", title: "Inverter Compressor", x: 30, y: 80, description: "Uses minimal electricity to compress refrigerant, elevating thermal output." },
      { id: "tank-anode", title: "Electronic Anode", x: 70, y: 50, description: "Self-monitoring corrosion prevention shield protecting the inner cylinder." }
    ],
    relatedProducts: ["wwk-303-electronic", "wwk-223-electronic"]
  },
  {
    id: "wwk-223-electronic",
    image: "/images/product_excel_D22.jpg",
    requirements: ["Large Family Home"],

    slug: "wwk-223-electronic-heat-pump",
    category: "heat-pump",
    title: "WWK 223 electronic",
    subtitle: "Smart Monoblock Heat Pump for Indian Properties",
    brand: "Stiebel Eltron",
    overview: "Engineered by Germany’s market leader. This monoblock heat pump features a spring-loaded roll-bond heat exchanger for maximum efficiency up to 98% and a quiet, encased compressor. Specially designed and configured for Indian environments.",
    bestSuited: "Medium villas and large apartments requiring a reliable central water heating cycle.",
    benefits: [
      "Specifically tuned to handle Indian grid stability and temperature profiles.",
      "Reduces electrical loads for water heating by up to 75%.",
      "Provides comfortable 220 L hot water reserve for high peak hours."
    ],
    features: [
      "Electronic controller interface for quick temp setting changes.",
      "High-efficiency roll-bond thermal exchange coil.",
      "Encased compressor cabin dampens sound."
    ],
    applications: [
      "Medium Villa Central Loops",
      "Premium Penthouses"
    ],
    specifications: {
      "Cylinder Capacity": "220 Liters",
      "COP": "3.1",
      "Power Connection": "230 V (Single Phase)",
      "Refrigerant Type": "R134a",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-emerald-50 to-[#E6F4EA]",
    galleryColors: ["#E6F4EA", "#CCE8D5", "#AEDCBD"],
    techBlueprint: [
      { id: "evaporator", title: "Ambient Evaporator Coil", x: 50, y: 15, description: "Extracts heat energy from outdoor air currents, operating even in monsoons." },
      { id: "compressor", title: "Inverter Compressor", x: 30, y: 80, description: "Uses minimal electricity to compress refrigerant, elevating thermal output." },
      { id: "tank-anode", title: "Electronic Anode", x: 70, y: 50, description: "Self-monitoring corrosion prevention shield protecting the inner cylinder." }
    ],
    relatedProducts: ["wwk-302-h", "wwk-303-electronic"]
  },
  {
    id: "wwk-303-electronic",
    image: "/images/product_excel_D22.jpg",
    requirements: ["Large Family Home", "Hotels & Commercial"],

    slug: "wwk-303-electronic-heat-pump",
    category: "heat-pump",
    title: "WWK 303 electronic",
    subtitle: "Premium High-Capacity Monoblock Heat Pump",
    brand: "Stiebel Eltron",
    overview: "Engineered by Germany’s market leader. High-capacity monoblock heat pump featuring electronic controls, a quiet encased compressor, and 300 L storage. Delivers constant domestic hot water with top efficiency.",
    bestSuited: "Large villas, guest houses, and high-flow multi-bathroom layouts.",
    benefits: [
      "Highest capacity 300 L tank ensures hot water for up to 6-8 continuous showers.",
      "Reduces villa energy consumption for thermal heating by up to three quarters.",
      "Designed for extreme weather reliability, working rain or shine."
    ],
    features: [
      "Advanced electronic controller module.",
      "Maintenance-free active electronic anode protection.",
      "Robust roll-bond thermal exchanger wraps around cylinder exterior."
    ],
    applications: [
      "Large Family Villas",
      "Eco-Resorts & Guest Suites"
    ],
    specifications: {
      "Cylinder Capacity": "300 Liters",
      "COP": "3.22",
      "Power Connection": "230 V (Single Phase)",
      "Refrigerant Type": "R134a",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "single-phase",
    heroColor: "from-emerald-50 to-[#E6F4EA]",
    galleryColors: ["#E6F4EA", "#CCE8D5", "#AEDCBD"],
    techBlueprint: [
      { id: "evaporator", title: "Ambient Evaporator Coil", x: 50, y: 15, description: "Extracts heat energy from outdoor air currents, operating even in monsoons." },
      { id: "compressor", title: "Inverter Compressor", x: 30, y: 80, description: "Uses minimal electricity to compress refrigerant, elevating thermal output." },
      { id: "tank-anode", title: "Electronic Anode", x: 70, y: 50, description: "Self-monitoring corrosion prevention shield protecting the inner cylinder." }
    ],
    relatedProducts: ["wwk-302-h", "wwk-223-electronic"]
  },

  // --- 4. Powerless Water Filters - 2 products ---
  {
    id: "fountain-7s",
    image: "/images/product_excel_D25.jpg",
    requirements: ["Kitchen Use"],

    slug: "fountain-7s-water-filter",
    category: "water-filter",
    title: "Fountain 7S",
    subtitle: "Premium 7-in-1 Ultrafiltration Water Filter",
    brand: "Stiebel Eltron",
    overview: "German designed. A comprehensive 7-in-1 ultrafiltration system that removes 100% of bacteria. Certified under NSF 42 & 53 for safe, high-quality drinking water. Operates completely without electricity or storage tanks, avoiding stagnant pools.",
    bestSuited: "Kitchen counter spaces, custom home wet bars, and beverage stations.",
    benefits: [
      "100% bacterial and cyst removal for premium drinking water safety.",
      "Zero electrical requirement: works even during power cuts.",
      "Zero waste water: completely preserves source water (unlike RO systems)."
    ],
    features: [
      "NSF 42 & 53 certified filter materials.",
      "Smart mechanical filter replacement indicator.",
      "360° flexible dispenser neck for easy filling."
    ],
    applications: [
      "Luxury Home Kitchens",
      "Pantry Bars & Dry Pantries",
      "Executive Boardrooms"
    ],
    specifications: {
      "Filtration System": "7-in-1 Ultrafiltration",
      "Power Connection": "None (Powerless Operation)",
      "Certifications": "NSF 42 & 53",
      "Waste Water Ratio": "Zero Waste (100% Recovery)",
      "Dispenser Range": "360° Flexible",
      "Valve Construction": "Durable Ceramic Valve",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "none",
    heroColor: "from-sky-50 to-[#E8F1F5]",
    galleryColors: ["#E8F1F5", "#D2E2EC", "#B5D1E1"],
    techBlueprint: [
      { id: "uf-membrane", title: "Ultrafiltration Membrane", x: 50, y: 65, description: "0.01-micron hollow fiber membrane that filters out 100% of bacteria and cysts." },
      { id: "silver-ion", title: "Silver Ion Bed", x: 30, y: 80, description: "Antibacterial protection to prevent secondary bacterial growth inside filter." },
      { id: "carbon-block", title: "Activated Carbon Block", x: 50, y: 25, description: "High-grade carbon that absorbs chlorine, bad taste, and organic chemicals." }
    ],
    relatedProducts: ["stream-5s"]
  },
  {
    id: "stream-5s",
    image: "/images/product_excel_D26.jpg",
    requirements: ["Kitchen Use"],

    slug: "stream-5s-water-filter",
    category: "water-filter",
    title: "Stream 5S",
    subtitle: "Compact Under-Sink 5-Stage Water Filter",
    brand: "Stiebel Eltron",
    overview: "German designed. Features a 5-stage filtration pipeline with a 0.01-micron UF membrane for 100% bacteria-free water. Equipped with antibacterial silver ions and large carbon layers for purified, fresh tasting drinking water.",
    bestSuited: "Under-sink installations in luxury kitchens, home wet bars, and kitchen island counters.",
    benefits: [
      "Concealed under-sink installation preserves luxury counter aesthetics.",
      "Push & Click encapsulated filter cartridges allow instant, tool-free replacement.",
      "Double protection with antibacterial silver ions coating the filter block."
    ],
    features: [
      "0.01-micron ultrafiltration membrane.",
      "Active carbon block layers for taste improvement and odor removal.",
      "Zero wastewater production, making it highly eco-friendly."
    ],
    applications: [
      "Kitchen Under-sink Installations",
      "Beverage & Bar Counters"
    ],
    specifications: {
      "Filtration System": "5-Stage Ultrafiltration",
      "Membrane Rating": "0.01 micron",
      "Power Connection": "None (Powerless Operation)",
      "Filter Mechanism": "Push & Click Casing",
      "Waste Water Ratio": "Zero Waste (100% Recovery)",
      "Country of Origin": "Germany"
    },
    status: "available",
    powerType: "none",
    heroColor: "from-sky-50 to-[#E8F1F5]",
    galleryColors: ["#E8F1F5", "#D2E2EC", "#B5D1E1"],
    techBlueprint: [
      { id: "uf-membrane", title: "Ultrafiltration Membrane", x: 50, y: 65, description: "0.01-micron hollow fiber membrane that filters out 100% of bacteria and cysts." },
      { id: "silver-ion", title: "Silver Ion Bed", x: 30, y: 80, description: "Antibacterial protection to prevent secondary bacterial growth inside filter." },
      { id: "carbon-block", title: "Activated Carbon Block", x: 50, y: 25, description: "High-grade carbon that absorbs chlorine, bad taste, and organic chemicals." }
    ],
    relatedProducts: ["fountain-7s"]
  }
];
