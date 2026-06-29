"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertTriangle, Phone, Mail, MapPin, ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const E = [0.76, 0, 0.24, 1] as [number, number, number, number];

// ── Trust Points ─────────────────────────────────────────────────────────────
const TRUST_POINTS = [
  { label: "Free Site Inspection", desc: "We visit your property at no cost to assess your setup." },
  { label: "Requirement Assessment", desc: "We understand exactly what your property needs." },
  { label: "Product Recommendation", desc: "Honest, brand-independent advice based on your requirements." },
  { label: "Transparent Pricing", desc: "Clear quotes — no hidden fees, no surprises." },
  { label: "Installation Planning", desc: "Full coordination and scheduling by our specialist team." },
];

// ── Form logic ──────────────────────────────────────────────────────────────
function ConsultationFormContent() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    propertyType: "villa" as "villa" | "apartment" | "commercial" | "builder" | "other",
    bathrooms: "",
    message: "",
    isConsultation: true,
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (interestParam) {
      let defaultMsg = "";
      let defaultProp: "villa" | "apartment" | "commercial" | "builder" | "other" = "villa";
      if (interestParam.startsWith("property-")) {
        const type = interestParam.replace("property-", "");
        if (type === "bathrooms") {
          defaultProp = "other";
          defaultMsg = "Interested in a bespoke luxury bathroom configuration.";
        } else if (type === "villas") {
          defaultProp = "villa";
          defaultMsg = "Interested in a full-villa hot water and softening integration.";
        } else if (type === "apartments") {
          defaultProp = "apartment";
          defaultMsg = "Interested in a premium apartment utility setup.";
        } else if (type === "hotels") {
          defaultProp = "commercial";
          defaultMsg = "Interested in hotel central heating systems.";
        } else if (type === "commercial") {
          defaultProp = "commercial";
          defaultMsg = "Interested in commercial water systems.";
        }
      } else {
        defaultMsg = `Interested in: ${interestParam.replace(/-/g, " ")}`;
      }
      setFormData((prev) => ({
        ...prev,
        propertyType: defaultProp,
        message: defaultMsg,
      }));
    }
  }, [interestParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const cleanPhone = formData.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: cleanPhone,
          propertyType: formData.propertyType,
          bathrooms: formData.bathrooms || "",
          message: formData.message,
          isConsultation: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit consultation request.");

      setSuccess(true);
      setFormData({
        fullName: "", email: "", phone: "",
        propertyType: "villa", bathrooms: "", message: "",
        isConsultation: true,
      });
    } catch (err) {
      setError((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 text-center space-y-6"
      >
        <div className="w-14 h-14 rounded-full border border-gold-primary/30 flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7 text-gold-primary" strokeWidth={1.5} />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-[1.3rem] font-medium text-navy-primary">Request received.</h3>
          <p className="text-[13px] text-silver font-sans max-w-xs mx-auto leading-relaxed">
            We&apos;ll call you within 4 hours during business hours to arrange your site visit.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="text-[10px] font-bold uppercase tracking-[0.18em] text-navy-primary/40 hover:text-navy-primary transition-colors"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-0 text-left font-sans" noValidate>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mb-6 flex gap-3 items-start p-4 bg-red-50 border border-red-200/60 rounded text-red-700 text-[12px] font-sans">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Name */}
      <FormField label="Full Name" required>
        <input
          id="fullName" type="text" required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Your full name"
          className={inputClass}
        />
      </FormField>

      {/* Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <FormField label="Mobile Number" required>
          <input
            id="phone" type="tel" required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit number"
            className={inputClass}
          />
        </FormField>
        <FormField label="Email Address" required>
          <input
            id="email" type="email" required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@domain.com"
            className={`${inputClass} sm:pl-6`}
          />
        </FormField>
      </div>

      {/* Property Type + Bathrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <FormField label="Property Type" required>
          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as typeof formData.propertyType })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="villa">Villa (Independent)</option>
            <option value="apartment">Apartment / Penthouse</option>
            <option value="commercial">Commercial (Hotel/Gym/Spa)</option>
            <option value="builder">Builder / Developer</option>
            <option value="other">Other</option>
          </select>
        </FormField>
        <FormField label="No. of Bathrooms">
          <input
            id="bathrooms" type="text"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            placeholder="e.g. 4 bathrooms"
            className={`${inputClass} sm:pl-6`}
          />
        </FormField>
      </div>

      {/* Message */}
      <FormField label="Requirements" required>
        <textarea
          id="message" required rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Describe your property, water heating needs, or any specific requirements."
          className={`${inputClass} resize-none leading-relaxed`}
        />
      </FormField>

      {/* Submit */}
      <div className="pt-10">
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={!loading ? { y: -2 } : {}}
          whileTap={!loading ? { scale: 0.97 } : {}}
          transition={{ duration: 0.25, ease: E }}
          className={`inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${
            loading
              ? "bg-navy-primary/30 text-purewhite/50 cursor-not-allowed"
              : "bg-navy-primary text-purewhite hover:bg-gold-primary hover:text-navy-brand"
          }`}
        >
          {loading ? "Submitting…" : "Schedule Free Site Visit"}
          {!loading && <ArrowRight size={13} strokeWidth={2.5} />}
        </motion.button>
        <p className="text-[10px] text-silver/60 mt-3 font-sans">
          Free, no-obligation. We will call you within 4 hours.
        </p>
      </div>
    </form>
  );
}

// ── Field wrapper (bottom-border editorial style, matching contact page) ──────
function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
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

const inputClass =
  "w-full bg-transparent text-navy-primary text-[15px] font-sans placeholder-silver/35 focus:outline-none pb-2 font-medium";

// ── Page layout ──────────────────────────────────────────────────────────────
export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* Hero — dark navy, matching other page heroes */}
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
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <div className="max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-6">
              Free Consultation
            </p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-[3.2rem] font-medium leading-[1.12] tracking-tight text-white mb-6">
              Book a Free{" "}
              <br className="hidden sm:block" />
              Site Visit.
            </h1>
            <p className="text-[13px] sm:text-[15px] text-white/55 leading-relaxed font-sans max-w-md">
              Our installation specialists will visit your property, assess your water and
              electrical setup, and recommend the right solution — before you commit to anything.
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-12 bg-offwhite"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* Main Content — editorial 2-column */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

            {/* LEFT: Trust info */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-8">
                What&apos;s Included
              </p>

              {/* Trust checklist */}
              <div className="space-y-7 mb-12">
                {TRUST_POINTS.map((point) => (
                  <div key={point.label} className="flex gap-4 items-start">
                    <div className="w-5 h-5 rounded-full border border-gold-primary/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-gold-primary" strokeWidth={2.5} />
                    </div>
                    <div>
                      <span className="font-display text-[14px] font-medium text-navy-primary block leading-tight mb-1">
                        {point.label}
                      </span>
                      <span className="font-sans text-[12px] text-silver leading-relaxed">
                        {point.desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-navy-primary/8 pt-8">
                <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-6">
                  Prefer to Call?
                </p>
                <div className="space-y-4 text-[13px] font-sans">
                  <a
                    href="tel:+918555998216"
                    className="flex items-center gap-3 text-navy-primary hover:text-gold-primary transition-colors duration-200 group"
                  >
                    <Phone size={13} className="text-gold-primary shrink-0" />
                    +91 85559 98216
                  </a>
                  <a
                    href="mailto:aquaelitesolution@gmail.com"
                    className="flex items-center gap-3 text-navy-primary hover:text-gold-primary transition-colors duration-200"
                  >
                    <Mail size={13} className="text-gold-primary shrink-0" />
                    aquaelitesolution@gmail.com
                  </a>
                  <div className="flex items-start gap-3 text-silver">
                    <MapPin size={13} className="text-gold-primary shrink-0 mt-0.5" />
                    <a
                      href="https://maps.app.goo.gl/ZyP87vtqo5odNARb8?g_st=aw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-navy-primary transition-colors duration-200"
                    >
                      Hema Nagar, Boduppal<br />
                      Hyderabad, Telangana — 500039
                    </a>
                  </div>
                  <p className="text-[11px] text-silver/60 pt-2 border-t border-navy-primary/6">
                    Mon – Sat: 9:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT: Form */}
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-gold-primary font-bold mb-2">
                Book Your Visit
              </p>
              <h2 className="font-display text-[1.6rem] sm:text-[2rem] font-medium text-navy-primary leading-tight tracking-tight mb-8">
                Tell us about your property.
              </h2>

              <React.Suspense fallback={
                <div className="py-10 text-center text-silver text-[13px] font-sans">
                  Loading form…
                </div>
              }>
                <ConsultationFormContent />
              </React.Suspense>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
