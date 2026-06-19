"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to calculate vertical scroll-based parallax offsets.
 * @param speed Multiplier for scroll offset (positive shifts down, negative shifts up).
 */
export function useParallax(speed: number = 0.2) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return offset;
}
