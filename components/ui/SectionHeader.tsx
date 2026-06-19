"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

export interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  title: string;
  tagline?: string;
  description?: string;
  align?: "left" | "center" | "right";
  theme?: "light" | "dark";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  className,
  title,
  tagline,
  description,
  align = "center",
  theme = "light",
  ...props
}) => {
  const alignments = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const textColors = {
    light: {
      tag: "text-gold-primary",
      title: "text-navy-primary",
      desc: "text-navy-primary/70",
    },
    dark: {
      tag: "text-gold-primary",
      title: "text-purewhite",
      desc: "text-purewhite/70",
    },
  };

  return (
    <motion.div
      className={cn("flex flex-col max-w-3xl mx-auto mb-8 md:mb-10", alignments[align], className)}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      {...props}
    >
      {tagline && (
        <span className={cn("text-xs font-semibold uppercase tracking-widest mb-2", textColors[theme].tag)}>
          {tagline}
        </span>
      )}
      <h2 className={cn("text-3xl md:text-4xl font-display font-medium tracking-tight mb-4 text-balance", textColors[theme].title)}>
        {title}
      </h2>
      {description && (
        <p className={cn("text-sm md:text-base font-sans max-w-2xl leading-relaxed text-balance", textColors[theme].desc)}>
          {description}
        </p>
      )}
    </motion.div>
  );
};
