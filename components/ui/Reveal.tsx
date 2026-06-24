"use client";

import * as React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  className?: string;
  delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, width = "100%", className, delay = 0 }) => {
  const ref = React.useRef(null);
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
