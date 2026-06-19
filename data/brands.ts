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
    id: "aqua-elite-solutions",
    name: "Aqua Elite Solutions",
    logoUrl: "/logos/aqua-elite.svg",
    description: "Our in-house premium brand for smart volumetric ion-exchange softeners and custom whole-home filtration systems engineered to handle high TDS hard borewell water in Hyderabad.",
    origin: "India",
    established: "2022"
  }
];
