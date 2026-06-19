export const colors = {
  navy: {
    primary: "#0B2341", // Deep blue
    dark: "#0F2D52",    // Surface 1
    light: "#15396B",   // Surface 2
  },
  gold: {
    primary: "#C9A54C", // Primary accent
    muted: "rgba(201, 165, 76, 0.15)",
  },
  offwhite: "#F7F8FA",  // Background
  purewhite: "#FFFFFF", // Glass highlights / text
  silver: "#8A94A6",    // Secondary details
  water: "#2E6F95",     // Animation only
  whatsapp: "#25D366",
} as const;

export const spacing = {
  base: 8,
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  "3xl": 64,
  "4xl": 80,
  "5xl": 96,
  "6xl": 128,
  "7xl": 160,
  "8xl": 192,
  "9xl": 256,
} as const;

export const borderRadius = {
  sm: "6px",
  md: "12px",
  lg: "20px",
  xl: "32px",
  full: "9999px",
} as const;

export const shadows = {
  resting: "0 4px 20px -2px rgba(11, 35, 65, 0.04)",
  raised: "0 12px 30px -4px rgba(11, 35, 65, 0.08)",
  floating: "0 20px 50px -6px rgba(11, 35, 65, 0.12)",
} as const;
