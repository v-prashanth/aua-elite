import { Variants } from "framer-motion";

export const motionTokens = {
  // Easing — "water-like": viscous, no bounce, no snap
  ease: {
    fluid: [0.4, 0.0, 0.2, 1] as [number, number, number, number],   // primary easing — smooth glide
    gentle: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // for reveals/fades
  },
  
  // Durations
  duration: {
    instant: 0.15,
    fast: 0.3,
    base: 0.6,
    slow: 0.9,
    cinematic: 1.4,
  },

  // Intensity tiers — components reference these by section type
  intensity: {
    hero: "cinematic",         // full scroll-driven narrative, ribbon
    narrative: "story",        // scroll-triggered reveals, parallax
    experience: "interactive", // configurator interactions, tab transitions
    products: "elegant",       // hover states, gentle scale/lift
    utility: "minimal",        // nav, footer, forms — opacity/color only
  },

  // ANIMATION BUDGET (documented per spec)
  budget: {
    hero: 30,
    narrative: 30,
    experience: 15,
    products: 10,
    navFooter: 5,
    formsCTA: 5,
    utilityPages: 5,
  },
} as const;

// Used by: Reveal.tsx, SectionHeader.tsx
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.base,
      ease: motionTokens.ease.gentle,
    },
  },
};

// Used by: WhatsAppButton.tsx
export const whatsAppPulse: Variants = {
  animate: {
    scale: [1, 1.06, 1],
    boxShadow: [
      "0 4px 10px rgba(37, 211, 102, 0.3)",
      "0 4px 25px rgba(37, 211, 102, 0.6)",
      "0 4px 10px rgba(37, 211, 102, 0.3)",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
