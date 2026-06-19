"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GlassPanelProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd"> {
  preset: "nav" | "card" | "cta";
}

export const GlassPanel = React.forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ className, preset, children, ...props }, ref) => {
    const presetClasses = {
      nav: "glass-nav",
      card: "glass-card",
      cta: "glass-cta",
    };

    return (
      <motion.div
        ref={ref}
        className={cn("rounded-md relative overflow-hidden", presetClasses[preset], className)}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

GlassPanel.displayName = "GlassPanel";
