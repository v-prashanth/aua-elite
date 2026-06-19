"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

type Props = {
  title: string;
  category: string;
  status: string;
  brand: string;
  colors: string[];
};

export const ProductGallery: React.FC<Props> = ({ title, category, status, brand, colors }) => {
  const [activeColorIdx, setActiveColorIdx] = React.useState(0);

  const finishes = ["Classic White", "Brushed Platinum", "Champagne Gold"];

  return (
    <div className="w-full max-w-sm font-sans">
      <div className="relative w-72 h-[420px] mx-auto bg-gradient-to-b from-white to-[#EAF0F4] rounded-2xl shadow-floating border border-navy-primary/5 p-6 flex flex-col justify-between items-center overflow-hidden group">
        
        {/* Top Header */}
        <div className="w-full flex justify-between items-center">
          <span className="text-[7px] uppercase tracking-widest text-navy-primary/70 font-bold">
            {brand}
          </span>
          <div className="flex gap-1.5 items-center bg-gold-primary/10 border border-gold-primary/20 px-2 py-0.5 rounded-full text-[7px] text-gold-primary uppercase font-bold">
            <Sparkles size={8} /> Precision Engineered
          </div>
        </div>

        {/* Dynamic Display Screen Box */}
        <div className="relative z-10 w-24 h-10 bg-navy-primary rounded-lg border border-gold-primary/30 flex flex-col items-center justify-center shadow-inner">
          <span className="text-[10px] font-bold text-gold-primary leading-tight">
            {category === "tankless" ? "42.0 °C" : category === "heat-pump" ? "55.0 °C" : "SOFT OK"}
          </span>
          <span className="text-[6px] text-purewhite/70 uppercase tracking-wider font-semibold -mt-0.5">
            Active
          </span>
        </div>

        {/* Dynamic Interactive Color Mockup Base */}
        <div className="relative w-44 h-48 flex items-center justify-center">
          {/* Main Case Chassis */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeColorIdx}
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
              transition={{ duration: 0.4 }}
              style={{ backgroundColor: colors[activeColorIdx] || "#EAF0F4" }}
              className="w-28 h-40 rounded-xl border border-navy-primary/5 shadow-raised relative overflow-hidden flex flex-col justify-end p-3"
            >
              {/* Internal subtle geometric lines for CAD/structural feel */}
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_bottom,transparent_95%,rgba(0,0,0,0.1)_95%)] bg-[size:100%_16px]" />
              <div className="absolute inset-y-0 left-4 w-[1px] bg-black/5" />
              <div className="absolute inset-y-0 right-4 w-[1px] bg-white/10" />

              <div className="relative z-10">
                <span className="text-[8px] font-bold text-navy-primary block">
                  {title}
                </span>
                <span className="text-[6px] text-navy-primary/70 uppercase font-semibold block">
                  {status === "available" ? "German Quality Certified" : "Launching Q4 2026"}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Color Finish Selectors */}
        <div className="w-full text-center space-y-2">
          <span className="text-[8px] uppercase tracking-wider text-navy-primary/70 font-semibold">
            Finish: {finishes[activeColorIdx]}
          </span>
          <div className="flex justify-center gap-3">
            {colors.slice(0, 3).map((col, idx) => (
              <button
                key={idx}
                onClick={() => setActiveColorIdx(idx)}
                style={{ backgroundColor: col }}
                className={`w-5 h-5 rounded-full border focus:outline-none transition-all duration-300 ${
                  activeColorIdx === idx
                    ? "ring-2 ring-gold-primary border-purewhite scale-110"
                    : "border-navy-primary/10 hover:scale-105"
                }`}
                aria-label={`Select finish ${finishes[idx]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
