export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Talk to Us",
    description: "Connect via phone, WhatsApp, or email. We schedule an initial conversation at your convenience."
  },
  {
    number: "02",
    title: "Understand Your Needs",
    description: "We analyze your water source, pressure profiles, electrical constraints, and usage patterns."
  },
  {
    number: "03",
    title: "Recommend the Right Solution",
    description: "We present a tailored system blueprint, explaining exactly why we chose each brand and model."
  },
  {
    number: "04",
    title: "Professional Installation",
    description: "Our in-house engineers manage the hydraulics and electrical connection to match German precision standards."
  },
  {
    number: "05",
    title: "Support When You Need It",
    description: "We provide ongoing maintenance, salt replenishments, and direct warranty assistance."
  }
];
