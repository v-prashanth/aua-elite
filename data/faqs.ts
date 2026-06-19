export type FAQ = {
  id: string;
  category: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: "faq-what-we-do",
    category: "About Us",
    question: "What does Aqua Elite Solutions do?",
    answer: "We assess your property's plumbing, pressure, and electrical layout to recommend, install, and service the most efficient water heating and softening systems for your home."
  },
  {
    id: "faq-manufacturer",
    category: "About Us",
    question: "Do you manufacture the products you install?",
    answer: "No. We are independent consulting and installation partners. We recommend and integrate systems from leading global engineering brands, such as Germany's Stiebel Eltron."
  },
  {
    id: "faq-brands",
    category: "Brands",
    question: "Which brands do you work with?",
    answer: "We primarily work with Stiebel Eltron for premium tankless heaters and heat pumps, along with our custom Aqua Elite smart softening systems designed for Hyderabad's water quality."
  },
  {
    id: "faq-three-phase",
    category: "Electrical",
    question: "Do tankless water heaters require a three-phase electrical connection?",
    answer: "Yes, high-capacity tankless heaters for master bathrooms require a 400V three-phase connection to heat water instantly. Compact single-phase heaters are suitable for kitchen sinks or guest basins."
  },
  {
    id: "faq-hard-water",
    category: "Water Hardness",
    question: "How do these systems handle Hyderabad's hard borewell water?",
    answer: "Stiebel Eltron systems use scale-resistant bare-wire heating elements. For very hard borewell water, we install water softeners upstream to protect the heating units and bathroom fixtures."
  },
  {
    id: "faq-booster-pump",
    category: "Plumbing",
    question: "Do I need a pressure booster pump to run tankless heaters?",
    answer: "While they activate at a low flow rate, we recommend a mild booster pump to maintain water pressure of at least 1.5 to 2.0 bar for a premium shower experience."
  },
  {
    id: "faq-tankless-advantage",
    category: "Technology",
    question: "What is the advantage of tankless water heaters over traditional geysers?",
    answer: "Tankless units heat water instantly on demand. This saves up to 30% on electricity, ensures you never run out of hot water, eliminates stagnant pools where bacteria grow, and saves space."
  },
  {
    id: "faq-heat-pump-savings",
    category: "Technology",
    question: "How does an air-source heat pump save energy?",
    answer: "It extracts heat from the surrounding air to heat water. It uses up to 75% less electricity than traditional storage heaters, making it ideal for central villa heating."
  },
  {
    id: "faq-softener-salt",
    category: "Maintenance",
    question: "How often do I need to refill the salt in the water softener?",
    answer: "For a typical villa in Hyderabad, you will need to replenish the salt chamber once every 4 to 6 weeks. The digital control system alerts you when levels run low."
  },
  {
    id: "faq-warranty",
    category: "Support",
    question: "What warranty and service support do you provide?",
    answer: "We provide a comprehensive 2-year warranty on all Stiebel Eltron heaters and heat pumps, backed by our trained Hyderabad engineering team and immediate spare parts support."
  }
];
