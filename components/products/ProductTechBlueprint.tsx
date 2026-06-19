"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { ProductHotspot } from "@/data/products";
import { motionTokens } from "@/lib/animations";

type Props = {
  blueprint: ProductHotspot[];
  category: "tankless" | "heat-pump" | "water-softener" | "purifier";
};

export const ProductTechBlueprint: React.FC<Props> = ({ blueprint, category }) => {
  const [selectedId, setSelectedId] = React.useState<string>(blueprint[0]?.id || "");

  if (!blueprint || blueprint.length === 0) return null;

  const activeHotspot = blueprint.find((h) => h.id === selectedId) || blueprint[0];

  // Render Category Specific CAD Overlay
  const renderCADSchematic = () => {
    switch (category) {
      case "tankless":
        return (
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 320 400" fill="none">
            {/* Outline box */}
            <rect x="60" y="40" width="200" height="320" rx="6" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Heating coils paths */}
            <path d="M 120 160 Q 140 140 160 160 T 200 160 T 200 240 T 160 240 T 120 240" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="110" y="140" width="100" height="120" rx="3" stroke="#FFFFFF" strokeWidth="1" />
            {/* Pipe connections */}
            <path d="M 100 360 L 100 260" stroke="#FFFFFF" strokeWidth="1" />
            <path d="M 220 360 L 220 260" stroke="#FFFFFF" strokeWidth="1" />
            {/* Microprocessor card */}
            <rect x="100" y="60" width="120" height="60" rx="2" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="160" cy="90" r="10" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );
      case "heat-pump":
        return (
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 320 400" fill="none">
            {/* Outer tall tank cylinder */}
            <rect x="80" y="30" width="160" height="340" rx="80" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Heat exchanger coil surrounding tank */}
            <path d="M 80 160 L 240 180 M 80 200 L 240 220 M 80 240 L 240 260 M 80 280 L 240 300" stroke="#FFFFFF" strokeWidth="1.2" />
            {/* Upper fan section */}
            <rect x="90" y="45" width="140" height="70" rx="4" stroke="#FFFFFF" strokeWidth="1" />
            <circle cx="160" cy="80" r="25" stroke="#FFFFFF" strokeWidth="1" />
            {/* Compressor block */}
            <rect x="125" y="310" width="70" height="40" rx="3" stroke="#FFFFFF" strokeWidth="1.5" />
          </svg>
        );
      case "water-softener":
        return (
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 320 400" fill="none">
            {/* Resin Tank Column */}
            <rect x="70" y="60" width="80" height="300" rx="20" stroke="#FFFFFF" strokeWidth="1.5" />
            <line x1="110" y1="60" x2="110" y2="350" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="4 4" />
            
            {/* Brine Tank Column */}
            <rect x="170" y="100" width="80" height="260" rx="10" stroke="#FFFFFF" strokeWidth="1.5" />
            <rect x="180" y="160" width="60" height="180" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />

            {/* Connecting Valve block */}
            <rect x="90" y="30" width="40" height="30" rx="2" stroke="#FFFFFF" strokeWidth="1.5" />
            <path d="M 110 60 L 110 30 M 130 45 L 170 45 L 170 100" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
        );
      default:
        return (
          <svg className="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" viewBox="0 0 320 400" fill="none">
            {/* Purifier cartridges */}
            <rect x="60" y="40" width="200" height="40" rx="4" stroke="#FFFFFF" strokeWidth="1.2" />
            <rect x="60" y="90" width="200" height="40" rx="4" stroke="#FFFFFF" strokeWidth="1.2" />
            <rect x="60" y="140" width="200" height="40" rx="4" stroke="#FFFFFF" strokeWidth="1.2" />
            <rect x="60" y="190" width="200" height="40" rx="4" stroke="#FFFFFF" strokeWidth="1.2" />
            
            {/* Buffer Tank cylinder */}
            <circle cx="160" cy="300" r="50" stroke="#FFFFFF" strokeWidth="1.5" />
            {/* Connecting lines */}
            <path d="M 160 230 L 160 250" stroke="#FFFFFF" strokeWidth="1" />
          </svg>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto font-sans">
      {/* Left Column CAD Interactive Blueprint */}
      <div className="lg:col-span-5 flex justify-center">
        <div className="relative w-80 h-[400px] bg-navy-primary rounded-xl border border-gold-primary/25 shadow-inner overflow-hidden p-6">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #8A94A6 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />

          {renderCADSchematic()}

          {/* Hotspot Pins */}
          {blueprint.map((spot) => {
            const isActive = spot.id === selectedId;
            return (
              <button
                key={spot.id}
                onMouseEnter={() => setSelectedId(spot.id)}
                onClick={() => setSelectedId(spot.id)}
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                className="absolute z-10 -translate-x-1/2 -translate-y-1/2 group focus:outline-none"
                aria-label={`Highlight ${spot.title}`}
              >
                <div className="relative flex items-center justify-center">
                  <motion.div
                    className="absolute w-8 h-8 rounded-full bg-gold-primary/25 pointer-events-none"
                    animate={isActive ? { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] } : { scale: 1, opacity: 0.3 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border shadow-raised transition-colors duration-300 ${
                      isActive
                        ? "bg-gold-primary border-purewhite text-navy-primary font-bold text-[10px]"
                        : "bg-navy-dark border-gold-primary/40 text-gold-primary font-bold text-[9px] group-hover:bg-gold-primary group-hover:text-navy-primary"
                    }`}
                  >
                    ✦
                  </div>
                </div>
              </button>
            );
          })}

          <div className="absolute bottom-4 left-0 right-0 text-center text-[7px] tracking-widest text-silver/50 uppercase font-semibold">
            Interactive Engineering Blueprint
          </div>
        </div>
      </div>

      {/* Right Column Specifications Sheet */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHotspot.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.gentle }}
            className="bg-purewhite border border-navy-primary/5 rounded-xl p-8 shadow-raised min-h-[280px] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-gold-primary mb-3">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-navy-primary/70">
                  Internal Engineering System
                </span>
              </div>
              <h3 className="text-xl font-display font-medium text-navy-primary mb-3">
                {activeHotspot.title}
              </h3>
              <p className="text-xs text-navy-primary/75 leading-relaxed">
                {activeHotspot.description}
              </p>
            </div>

            <div className="text-[9px] text-navy-primary/70 border-t border-navy-primary/5 pt-4 mt-6">
              Move your mouse over the blue dots on the schematic diagram to inspect other mechanical sub-assemblies.
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
