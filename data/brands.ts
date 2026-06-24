export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
  description: string;
  origin: string;
  established: string;
};

export const brands: Brand[] = [
  {
    id: "stiebel-eltron",
    name: "Stiebel Eltron",
    logoUrl: "/logos/stiebel-eltron.svg",
    description: "Global market leader in instantaneous water heating. Renowned for bare-wire heating element technology and premium air-source heat pumps that deliver continuous hot water with maximum energy efficiency.",
    origin: "Germany",
    established: "1924"
  },
  {
    id: "ao-smith",
    name: "AO Smith",
    logoUrl: "/logos/ao-smith.svg",
    description: "A world-renowned leader in water heating systems, famous for high-durability glass-lined elements and commercial-grade thermal loop solutions.",
    origin: "USA",
    established: "1874"
  },
  {
    id: "zerob",
    name: "ZeroB",
    logoUrl: "/logos/zerob.svg",
    description: "Ion Exchange's flagship residential brand. Renowned for smart, high-capacity water softeners and zero-scaling pre-filtration units designed for borewell water profiles.",
    origin: "India",
    established: "1985"
  },
  {
    id: "zanskar",
    name: "Zanskar",
    logoUrl: "/logos/zanskar.svg",
    description: "Innovators in high-efficiency thermal loops and air-source heat pumps designed specifically to match luxury villa environments and green building standards.",
    origin: "India",
    established: "2020"
  }
];
