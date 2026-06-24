import * as React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type PageHeaderProps = {
  tagline?: string;
  title: string;
  description?: string;
  theme?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  tagline,
  title,
  description,
  theme = "light",
  align = "left",
  className,
  containerClassName,
}) => {
  const isDark = theme === "dark";
  const isCenter = align === "center";

  return (
    <section
      className={cn(
        "relative w-full border-b text-left transition-colors duration-300",
        isDark
          ? "bg-navy-primary text-purewhite border-gold-primary/10"
          : "bg-offwhite text-navy-primary border-navy-primary/5",
        "pt-10 pb-8 md:pt-16 md:pb-12",
        className
      )}
    >
      <Container className={cn("max-w-4xl", containerClassName)}>
        <div className={cn("max-w-2xl", isCenter ? "mx-auto text-center" : "text-left")}>
          {tagline && (
            <Reveal width={isCenter ? "fit-content" : "100%"} className={isCenter ? "mx-auto" : ""}>
              <span
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.25em] block mb-3 font-sans",
                  isDark ? "text-gold-primary" : "text-gold-primary"
                )}
              >
                {tagline}
              </span>
            </Reveal>
          )}
          <Reveal width={isCenter ? "fit-content" : "100%"} className={isCenter ? "mx-auto" : ""} delay={0.05}>
            <h1
              className={cn(
                "text-2xl sm:text-3xl md:text-4xl font-display font-medium tracking-tight leading-[1.15] text-balance",
                isDark ? "text-purewhite" : "text-navy-primary"
              )}
            >
              {title}
            </h1>
          </Reveal>
          {description && (
            <Reveal width={isCenter ? "fit-content" : "100%"} className={isCenter ? "mx-auto" : ""} delay={0.1}>
              <p
                className={cn(
                  "text-xs sm:text-sm mt-4 leading-relaxed font-sans text-balance",
                  isDark ? "text-purewhite/70" : "text-navy-primary/70",
                  isCenter ? "mx-auto max-w-lg" : "max-w-xl"
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
};
