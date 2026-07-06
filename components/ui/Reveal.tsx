"use client";

import * as React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

/**
 * Props expected by the Reveal animation container component.
 */
export interface RevealProps {
  /** The content nodes to reveal on scroll. */
  children: React.ReactNode;
  /** Width options for the outer layout wrapper. Defaults to '100%'. */
  width?: "fit-content" | "100%";
  /** Optional additional CSS classes to style the container wrapper. */
  className?: string;
  /** Easing transition delay duration in seconds. Defaults to 0. */
  delay?: number;
}

/**
 * Reveal Component wrapper.
 * Detects when an element scrolls into view via the Intersection Observer API
 * and smoothly animates its opacity and vertical translation (fade-in-up).
 */
export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", className, delay = 0 }) => {
  const ref = React.useRef(null);
  
  // Track visibility with useInView. Triggers once. 
  // Margin offset (-50px) ensures animation fires slightly after the element enters the viewport.
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const mainControls = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      mainControls.start("animate");
    }
  }, [isInView, mainControls]);

  return (
    <div
      ref={ref}
      className={`relative min-w-0 ${width === "fit-content" ? "w-fit" : "w-full"} ${className ?? ""}`}
    >
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate={mainControls}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
};
