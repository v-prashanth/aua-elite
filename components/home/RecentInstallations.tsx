"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { projects } from "@/data/projects";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

/* ── Individual parallax card ── */
function WorkCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  const aspectClasses = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 + index * 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, ease: E, delay: index * 0.12 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`relative overflow-hidden rounded-lg cursor-default
        ${index === 1 ? "lg:translate-y-10" : ""}`}
      style={{
        border: "1px solid rgba(11,35,65,0.07)",
      }}
    >
      {/* Parallax image */}
      <div className={`relative w-full overflow-hidden ${aspectClasses[index]}`}>
        <motion.div className="absolute inset-[-8%]" style={{ y: imgY }}>
          <Image
            src={project.image}
            alt={`${project.title} — ${project.location}`}
            fill
            className="object-cover transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(to top, rgba(11,35,65,0.88) 0%, rgba(11,35,65,0.1) 50%, transparent 100%)",
            opacity: hovered ? 1 : 0.75,
          }}
        />

        {/* Hover: gold top line sweep */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] origin-left"
          style={{ background: "var(--gold-primary)" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: E }}
        />

        {/* Top-right arrow indicator */}
        <motion.div
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center"
          style={{ background: "var(--gold-primary)" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: E }}
        >
          <ArrowUpRight size={14} className="text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Index number */}
        <span
          className="absolute top-4 left-4 font-display text-white/8 select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(48px, 8vw, 80px)" }}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.4, ease: E }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin size={9} style={{ color: "var(--gold-primary)" }} />
              <span
                className="text-[8px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "var(--gold-primary)" }}
              >
                {project.location}
              </span>
            </div>

            <h3
              className="font-display font-medium text-white leading-tight"
              style={{ fontSize: "clamp(15px, 2vw, 22px)" }}
            >
              {project.title}
            </h3>

            {/* Animated description on hover */}
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hovered ? 1 : 0,
                height: hovered ? "auto" : 0,
              }}
              transition={{ duration: 0.35, ease: E }}
              className="overflow-hidden text-[10px] font-sans leading-relaxed mt-2.5"
              style={{ color: "rgba(255,255,255,0.52)" }}
            >
              {project.description.slice(0, 120)}…
            </motion.p>

            {/* Products used */}
            <motion.div
              className="flex flex-wrap gap-1.5 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hovered ? 1 : 0,
                height: hovered ? "auto" : 0,
              }}
              transition={{ duration: 0.35, ease: E, delay: 0.05 }}
            >
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.productsUsed.map((prod) => (
                  <span
                    key={prod}
                    className="text-[7px] font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-sm"
                    style={{
                      background: "rgba(201,165,76,0.12)",
                      border: "1px solid rgba(201,165,76,0.25)",
                      color: "rgba(201,165,76,0.85)",
                    }}
                  >
                    {prod}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export const RecentInstallations: React.FC = () => {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Recent Installations"
      style={{
        paddingTop: "clamp(64px, 9vw, 120px)",
        paddingBottom: "clamp(64px, 9vw, 120px)",
        background: "var(--offwhite)",
      }}
    >
      {/* Faint background watermark */}
      <div
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="absolute font-display font-bold text-navy-primary/[0.025] leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(120px, 20vw, 240px)",
            bottom: "-0.15em",
            right: "-0.05em",
          }}
        >
          Work
        </span>
      </div>

      <div className="relative max-w-[1320px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* ── Section header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 lg:mb-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: E }}
              className="block text-[9px] font-bold uppercase tracking-[0.35em] mb-4"
              style={{ color: "var(--gold-primary)" }}
            >
              Happy Customers
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: E, delay: 0.1 }}
              className="font-display font-medium tracking-tight leading-[1.08]"
              style={{
                fontSize: "clamp(28px, 4.5vw, 56px)",
                color: "var(--navy-primary)",
              }}
            >
              Completed<br />
              <span style={{ color: "var(--gold-primary)" }}>Installations.</span>
              <br />Real Trust.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: E, delay: 0.18 }}
            className="max-w-xs"
          >
            <p
              className="font-sans leading-relaxed mb-6"
              style={{
                fontSize: "clamp(11px, 1.3vw, 13px)",
                color: "var(--silver)",
              }}
            >
              A look at some of our completed installations across Hyderabad. Real homes, real results — every photograph taken on-site by our own engineers.
            </p>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2.5 group"
            >
              <span
                className="text-[9px] font-bold uppercase tracking-[0.25em] transition-colors duration-300 group-hover:opacity-70"
                style={{ color: "var(--navy-primary)" }}
              >
                View All Projects
              </span>
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 group-hover:opacity-80"
                style={{ background: "var(--navy-primary)" }}
              >
                <ArrowUpRight size={12} className="text-white" strokeWidth={2.5} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 items-start">
          {projects.slice(0, 3).map((project, idx) => (
            <WorkCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* ── Bottom stat bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: E, delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-6 mt-12 pt-8"
          style={{ borderTop: "1px solid rgba(11,35,65,0.06)" }}
        >
          {[
            { value: "500+", label: "Installations Completed" },
            { value: "100%", label: "In-House Engineers" },
            { value: "4.9★", label: "Average Customer Rating" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span
                className="font-display font-medium"
                style={{
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  color: "var(--navy-primary)",
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-[8px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "var(--silver)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
