"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const clean = formData.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(clean)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, phone: clean, isConsultation: false }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setSuccess(true);
      setFormData({ fullName: "", phone: "", email: "", message: "" });
    } catch (err) {
      setError((err as Error).message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const waLink = `https://wa.me/918555998216?text=${encodeURIComponent(
    "Hello Aqua Elite, I'd like to discuss a water heating or treatment project for my property."
  )}`;

  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* ──────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────── */}
      <section className="bg-navy-dark text-white relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-28 md:py-36">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-6">
              Get In Touch
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.4rem] font-medium leading-[1.12] tracking-tight text-white mb-6">
              Let&apos;s talk about{" "}
              <br className="hidden sm:block" />
              your property.
            </h1>
            <p className="text-[13px] sm:text-[15px] text-white/50 leading-relaxed font-sans">
              Leave your details below and we&apos;ll call you within 4 hours. Or reach us directly.
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* ──────────────────────────────────────────────────────────
          MAIN — info left, form right
      ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

            {/* ── LEFT: Direct contact info ── */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-8">
                Direct Contact
              </p>

              {/* Contact lines — no icons, no cards, just clean text */}
              <div className="divide-y divide-navy-primary/8">
                <div className="py-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60 font-sans font-medium block mb-1.5">
                    Telephone
                  </span>
                  <a
                    href="tel:+918555998216"
                    className="font-display text-[1.35rem] sm:text-[1.55rem] font-medium text-navy-primary hover:text-gold-primary transition-colors duration-200"
                  >
                    +91 85559 98216
                  </a>
                </div>

                <div className="py-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60 font-sans font-medium block mb-1.5">
                    Email
                  </span>
                  <a
                    href="mailto:aquaelitesolution@gmail.com"
                    className="font-display text-[1.1rem] sm:text-[1.25rem] font-medium text-navy-primary hover:text-gold-primary transition-colors duration-200"
                  >
                    aquaelitesolution@gmail.com
                  </a>
                </div>

                <div className="py-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60 font-sans font-medium block mb-1.5">
                    Office
                  </span>
                  <p className="text-[14px] text-navy-primary font-sans leading-relaxed">
                    Jubilee Hills, Road No. 36<br />
                    Hyderabad, Telangana 500033
                  </p>
                </div>

                <div className="py-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60 font-sans font-medium block mb-1.5">
                    Consultation Hours
                  </span>
                  <p className="text-[14px] text-navy-primary font-sans">
                    Monday – Saturday<br />
                    <span className="text-silver">9:00 AM – 7:00 PM</span>
                  </p>
                </div>
              </div>

              {/* WhatsApp — plain text link, no box */}
              <div className="mt-8 pt-8 border-t border-navy-primary/8">
                <p className="text-[12px] text-silver font-sans mb-4 leading-relaxed">
                  Prefer a faster response? Message us directly on WhatsApp.
                </p>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-navy-primary hover:text-gold-primary transition-colors duration-200 group"
                >
                  <span className="w-5 h-5 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M11.989 0C5.368 0 0 5.368 0 11.989c0 2.09.537 4.099 1.558 5.87L0 24l6.3-1.53A11.93 11.93 0 0 0 11.99 24C18.61 24 24 18.632 24 12.011 24 5.39 18.61 0 11.989 0zm.011 21.818a9.842 9.842 0 0 1-5.018-1.37l-.36-.214-3.732.978.995-3.643-.235-.374A9.826 9.826 0 0 1 2.18 12c0-5.418 4.41-9.827 9.82-9.827 5.413 0 9.822 4.41 9.822 9.827 0 5.417-4.41 9.818-9.822 9.818z"/>
                    </svg>
                  </span>
                  WhatsApp Us
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* ── RIGHT: Inquiry form ── */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-8">
                Send an Inquiry
              </p>

              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-16 text-center space-y-5"
                  >
                    <div className="w-12 h-12 rounded-full border border-gold-primary/30 flex items-center justify-center mx-auto">
                      <Check size={20} className="text-gold-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display text-[1.2rem] font-medium text-navy-primary mb-2">
                        Message received.
                      </h3>
                      <p className="text-[13px] text-silver font-sans">
                        We&apos;ll call you within 4 hours during consultation hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSuccess(false)}
                      className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-primary/40 hover:text-navy-primary transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-0"
                  >
                    {/* Error banner */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mb-6 px-4 py-3 rounded bg-red-50 border border-red-200 text-red-700 text-[12px] font-sans">
                            {error}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Fields — bottom border only, clean and editorial */}
                    <Field label="Full Name" required>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={set("fullName")}
                        placeholder="Your full name"
                        className={fieldClass}
                      />
                    </Field>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                      <Field label="Mobile Number" required>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={set("phone")}
                          placeholder="10-digit number"
                          className={fieldClass}
                        />
                      </Field>
                      <Field label="Email Address" required>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={set("email")}
                          placeholder="name@domain.com"
                          className={cn(fieldClass, "sm:pl-6")}
                        />
                      </Field>
                    </div>

                    <Field label="Property & Requirement" required>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={set("message")}
                        placeholder="Describe your property, how many bathrooms, what you need."
                        className={cn(fieldClass, "resize-none leading-relaxed")}
                      />
                    </Field>

                    {/* Submit */}
                    <div className="pt-10">
                      <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={!loading ? { y: -2 } : {}}
                        whileTap={!loading ? { scale: 0.97 } : {}}
                        className={cn(
                          "inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300",
                          loading
                            ? "bg-navy-primary/30 text-purewhite/50 cursor-not-allowed"
                            : "bg-navy-primary text-purewhite hover:bg-gold-primary hover:text-navy-brand"
                        )}
                      >
                        {loading ? "Sending…" : "Send Message"}
                        {!loading && <ArrowRight size={13} strokeWidth={2.5} />}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

// ─── Form Field Wrapper ────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="group pt-8 border-b border-navy-primary/10 pb-1 focus-within:border-navy-primary transition-colors duration-200">
      <label className="block text-[9px] uppercase tracking-[0.28em] text-silver/60 font-sans font-bold mb-2 group-focus-within:text-gold-primary transition-colors duration-200">
        {label}
        {required && <span className="text-gold-primary ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// Bottom-border-only input style — clean, editorial
const fieldClass =
  "w-full bg-transparent text-navy-primary text-[15px] font-sans placeholder-silver/35 focus:outline-none pb-2 font-medium";
