import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export type NavbarState = "landing" | "reading" | "footer";

export function useNavbarState() {
  const pathname = usePathname();
  const [state, setState] = useState<NavbarState>("landing");
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // 1. Scroll and position listener for states (sticky only)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 60;
      
      if (isScrolled) {
        setState("reading");
      } else {
        setState("landing");
      }

      // Clear active hash highlighting when scrolled back near top of homepage
      if (pathname === "/" && scrollY < 200) {
        setActiveSection(null);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check once initially

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // 2. Resolve active link states
  useEffect(() => {
    if (pathname !== "/") {
      setActiveItem(pathname);
      return;
    }

    if (activeSection === "why-tankless") {
      setActiveItem("/#products");
    } else if (activeSection === "solutions") {
      setActiveItem("/#solutions");
    } else {
      setActiveItem(null);
    }
  }, [pathname, activeSection]);

  // 3. Observe homepage sections for highlighting
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["why-tankless", "solutions"];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          root: null,
          rootMargin: "-25% 0px -55% 0px", // Middle screen focus
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [pathname]);

  return {
    state,
    isHidden: false,
    activeItem,
  };
}
