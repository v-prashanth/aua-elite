"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export const WaterRibbon: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress to mimic the viscous fluidity of water
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 15,
    restDelta: 0.001
  });

  // Translate progress into SVG stroke dashoffset
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0 overflow-hidden hidden md:block"
    >
      <svg
        className="w-full h-full text-water/10"
        viewBox="0 0 1200 8000"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* Background Trace Line */}
        <path
          d="M 600 0 
             C 650 400, 300 800, 350 1200 
             C 400 1600, 900 2000, 850 2400 
             C 800 2800, 200 3200, 250 3600 
             C 300 4000, 1000 4400, 950 4800 
             C 900 5200, 250 5600, 300 6000 
             C 350 6400, 850 6800, 800 7200 
             C 750 7600, 600 7900, 600 8000"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Active Flow Line (Scroll Linked) */}
        <motion.path
          d="M 600 0 
             C 650 400, 300 800, 350 1200 
             C 400 1600, 900 2000, 850 2400 
             C 800 2800, 200 3200, 250 3600 
             C 300 4000, 1000 4400, 950 4800 
             C 900 5200, 250 5600, 300 6000 
             C 350 6400, 850 6800, 800 7200 
             C 750 7600, 600 7900, 600 8000"
          stroke="#C9A54C" // Champagne Gold active flow
          strokeWidth="3"
          strokeLinecap="round"
          style={{ pathLength: shouldReduceMotion ? 1 : pathLength }}
          className="drop-shadow-[0_0_8px_rgba(201,165,76,0.3)]"
        />
      </svg>
    </div>
  );
};
