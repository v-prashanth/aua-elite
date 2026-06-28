"use client";

import * as React from "react";
import { useScroll, useSpring, useReducedMotion } from "framer-motion";

export const WaterRibbon: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Viscous, springy progress animation mimicking fluid movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 18,
    restDelta: 0.001
  });

  React.useEffect(() => {
    setMounted(true);
    return smoothProgress.on("change", (latest) => {
      setProgress(latest);
    });
  }, [smoothProgress]);

  if (!mounted) return null;

  // Spline path total length
  const totalLength = 8200;
  const dashOffset = shouldReduceMotion ? 0 : totalLength * (1 - progress);

  return (
    <div
      ref={containerRef}
      className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0 overflow-hidden hidden md:block"
    >
      {/* Dynamic Keyframes for fluid current particle animation */}
      <style jsx global>{`
        @keyframes waterFlowAnim {
          0% {
            stroke-dashoffset: ${totalLength};
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .water-current-particle {
          animation: waterFlowAnim 24s linear infinite;
        }
      `}</style>

      <svg
        className="w-full h-full"
        viewBox="0 0 1200 8000"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 
            Premium Gradient Map:
            Starts as cool water blue (#2E6F95), transitions to gold (#C9A54C) mid-way,
            and culminates in warm Stiebel heating orange (#E08A24) at the bottom.
          */}
          <linearGradient id="premium-flow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2E6F95" />
            <stop offset="25%" stopColor="#2E6F95" />
            <stop offset="55%" stopColor="#C9A54C" />
            <stop offset="80%" stopColor="#E08A24" />
            <stop offset="100%" stopColor="#D96E14" />
          </linearGradient>
        </defs>

        {/* 1. Subtle Guide Trace Line (Faint background trail) */}
        <path
          d="M 600 0 C 650 400, 300 800, 350 1200 C 400 1600, 900 2000, 850 2400 C 800 2800, 200 3200, 250 3600 C 300 4000, 1000 4400, 950 4800 C 900 5200, 250 5600, 300 6000 C 350 6400, 850 6800, 800 7200 C 750 7600, 600 7900, 600 8000"
          stroke="url(#premium-flow-grad)"
          strokeOpacity="0.06"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* 2. Constant Current Particle Flow (Independent fluid segment moving down the path) */}
        {!shouldReduceMotion && (
          <path
            d="M 600 0 C 650 400, 300 800, 350 1200 C 400 1600, 900 2000, 850 2400 C 800 2800, 200 3200, 250 3600 C 300 4000, 1000 4400, 950 4800 C 900 5200, 250 5600, 300 6000 C 350 6400, 850 6800, 800 7200 C 750 7600, 600 7900, 600 8000"
            stroke="url(#premium-flow-grad)"
            strokeOpacity="0.3"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="160 1400"
            className="water-current-particle"
            style={{
              filter: "blur(1px)",
            }}
          />
        )}

        {/* 3. Main Scroll-Linked Active Path (Draws/erases as user scrolls) */}
        <path
          d="M 600 0 C 650 400, 300 800, 350 1200 C 400 1600, 900 2000, 850 2400 C 800 2800, 200 3200, 250 3600 C 300 4000, 1000 4400, 950 4800 C 900 5200, 250 5600, 300 6000 C 350 6400, 850 6800, 800 7200 C 750 7600, 600 7900, 600 8000"
          stroke="url(#premium-flow-grad)"
          strokeOpacity="0.85"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-150 ease-out"
          style={{
            filter: "drop-shadow(0 0 6px rgba(46, 111, 149, 0.2))",
          }}
        />
      </svg>
    </div>
  );
};
