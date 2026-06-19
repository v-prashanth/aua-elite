export type Project = {
  id: string;
  title: string;
  location: string;
  productsUsed: string[];
  description: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "jubilee-hills-villa",
    title: "Luxury Modernist Villa Integration",
    location: "Jubilee Hills, Hyderabad",
    productsUsed: ["DHB-E 27 LCD", "AE SoftFlow Pro 500"],
    description: "Full-home hot water and softening integration for a 12,000 sq. ft. private residence. Engineered to support five simultaneous high-flow rain showers and an outdoor Jacuzzi. The tankless design allowed the architect to eliminate all external wall niches and keep vanity storage completely clean.",
    image: "/images/projects/jubilee-1.png"
  },
  {
    id: "banjara-hills-hotel",
    title: "Eco-Boutique Hotel Central Heating",
    location: "Banjara Hills, Hyderabad",
    productsUsed: ["HPA-O 300 L Premium", "DHB-E 18/24 LCD"],
    description: "Replaced an aging, inefficient boiler system with a hybrid system using three HPA-O air-source heat pumps for central storage and inline DHB-E heaters at the penthouse suites. Reduced the hotel's hot water heating energy bills by 68% while delivering zero-latency constant hot water to 25 luxury suites.",
    image: "/images/projects/banjara-1.png"
  },
  {
    id: "kokapet-penthouse",
    title: "Sky Villa Penthouse Wellness System",
    location: "Kokapet, Hyderabad",
    productsUsed: ["DHB-E 18/24 LCD", "AE SoftFlow Pro 500"],
    description: "Designed a bespoke wellness heating installation for a duplex penthouse. A whole-house water softener protects the user's skin, hair, and designer matte-black bath fixtures, while a concealed 24kW Stiebel Eltron tankless unit drives a master bathroom steam cabinet and high-flow rainfall dome.",
    image: "/images/projects/kokapet-1.png"
  }
];
