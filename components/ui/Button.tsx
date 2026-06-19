"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { motionTokens } from "@/lib/animations";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center font-sans font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary focus-visible:ring-offset-2 ring-offset-offwhite disabled:pointer-events-none disabled:opacity-50";
    
    const variants = {
      primary: "bg-gold-primary text-[#0B2341] hover:bg-gold-primary/90 rounded-full shadow-resting hover:shadow-raised",
      secondary: "bg-navy-primary text-purewhite hover:bg-navy-dark rounded-full",
      outline: "border border-gold-primary text-gold-primary hover:bg-gold-primary/10 rounded-full",
      ghost: "text-navy-primary hover:bg-navy-primary/5 dark:text-purewhite dark:hover:bg-purewhite/5 rounded-full",
    };

    const sizes = {
      sm: "px-[14px] py-[7px] text-[10px] min-h-[30px] tracking-wide",
      md: "px-[20px] py-[9px] text-[10px] sm:text-[11px] min-h-[34px]",
      lg: "px-[26px] py-[11px] text-[11px] min-h-[38px]",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        whileHover={{ scale: 1.015, y: -1 }}
        whileTap={{ scale: 0.985, y: 0 }}
        transition={{
          duration: motionTokens.duration.fast,
          ease: motionTokens.ease.fluid,
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
