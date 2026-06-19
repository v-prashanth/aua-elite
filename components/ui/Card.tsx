"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/animations";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "onDrag" | "onDragStart" | "onDragEnd"> {
  elevation?: "resting" | "raised" | "floating";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, elevation = "resting", hoverEffect = true, children, ...props }, ref) => {
    const elevations = {
      resting: "elevation-resting border border-navy-primary/5 dark:border-purewhite/5",
      raised: "elevation-raised border border-navy-primary/10 dark:border-purewhite/8",
      floating: "elevation-floating border border-navy-primary/15 dark:border-purewhite/12",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "bg-purewhite dark:bg-navy-dark rounded-lg p-6 overflow-hidden relative",
          elevations[elevation],
          hoverEffect && "hover:shadow-raised transition-shadow duration-300",
          className
        )}
        whileHover={hoverEffect ? { y: -4, transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.fluid } } : undefined}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
