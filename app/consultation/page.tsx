"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CheckCircle, AlertTriangle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";

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
          defaultMsg = "Interested in boutique hotel central heating loops.";
        } else if (type === "commercial") {
          defaultProp = "commercial";
          defaultMsg = "Interested in high-end commercial systems.";
        }
      } else {
        defaultMsg = `Interested in integrating: ${interestParam.replace(/-/g, " ").toUpperCase()}`;
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

    // Validate phone: strip spaces and dashes, check for 10 digits
    const cleanPhone = formData.phone.replace(/[\s\-+]/g, "").replace(/^91/, "");
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setError("Please enter a valid 10-digit Indian mobile number (e.g. 8555998216).");
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
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit consultation request.");
      }

      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        propertyType: "villa",
        bathrooms: "",
        message: "",
        isConsultation: true,
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center space-y-5"
      >
        <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
          <CheckCircle className="w-8 h-8 text-gold-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold text-navy-primary">Audit Request Received</h3>
          <p className="text-xs text-silver font-sans leading-relaxed max-w-xs">
            Our service team will review your details and get back to you within 4 business hours.
          </p>
        </div>
        <button
          onClick={() => setSuccess(false)}
          className="text-[10px] font-bold uppercase tracking-wider text-gold-primary hover:text-navy-primary transition-colors mt-2 outline-none"
        >
          Submit another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left font-sans" noValidate>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 items-start p-3 rounded-md border border-red-300/40 bg-red-50 text-red-700 text-xs"
          >
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 1: Full Name */}
      <div className="space-y-1">
        <label htmlFor="fullName" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
          Full Name <span className="text-gold-primary">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          placeholder="Your full name"
          className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs placeholder-silver/50 focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors"
        />
      </div>

      {/* Row 2: Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="phone" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
            Phone <span className="text-gold-primary">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="10-digit mobile number"
            className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs placeholder-silver/50 focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="email" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
            Email Address <span className="text-gold-primary">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@domain.com"
            className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs placeholder-silver/50 focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors"
          />
        </div>
      </div>

      {/* Row 3: Property Type + Bathrooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label htmlFor="propertyType" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
            Property Type <span className="text-gold-primary">*</span>
          </label>
          <select
            id="propertyType"
            value={formData.propertyType}
            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as typeof formData.propertyType })}
            className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors"
          >
            <option value="villa">Villa (Independent)</option>
            <option value="apartment">Apartment / Penthouse</option>
            <option value="commercial">Commercial (Hotel/Gym/Spa)</option>
            <option value="builder">Builder / Developer</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor="bathrooms" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
            No. of Bathrooms
          </label>
          <input
            id="bathrooms"
            type="text"
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
            placeholder="e.g. 4 bathrooms"
            className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs placeholder-silver/50 focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors"
          />
        </div>
      </div>

      {/* Row 4: Message */}
      <div className="space-y-1">
        <label htmlFor="message" className="font-bold text-navy-primary uppercase tracking-widest text-[9px]">
          Requirements <span className="text-gold-primary">*</span>
        </label>
        <textarea
          id="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          placeholder="Describe your system goals, number of floors, known TDS level, or any specific requirements."
          className="w-full px-3 py-2.5 rounded-md border border-navy-primary/10 bg-offwhite text-navy-primary text-xs placeholder-silver/50 focus:outline-none focus:border-gold-primary focus:bg-purewhite transition-colors resize-none leading-relaxed"
        />
      </div>

      {/* Submit */}
      <div className="pt-1">
        <Button
          type="submit"
          disabled={loading}
          variant="primary"
          size="lg"
          className="w-full justify-center text-xs uppercase tracking-wider font-bold"
        >
          {loading ? "Submitting…" : "Schedule Free Site Audit"}
          {!loading && <ArrowRight size={14} className="ml-2" />}
        </Button>
        <p className="text-[9px] text-silver text-center mt-2 font-sans">
          Free, no-obligation. Our service team will call you within 4 hours.
        </p>
      </div>
    </form>
  );
}

// ── Page layout ─────────────────────────────────────────────────────────────
export default function ConsultationPage() {
  return (
    <div className="relative min-h-screen bg-offwhite">
      <PageHeader
        tagline="Free Consultation"
        title="Book a Free Site Audit"
        description="Our service team will visit your property, assess your water and electrical setup, and recommend the right solution — before you spend a rupee."
        theme="dark"
        align="center"
        containerClassName="max-w-4xl"
      />

      {/* Main Content: 2-column on desktop */}
      <Container className="max-w-4xl py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* LEFT: Form */}
          <div className="lg:col-span-7 min-w-0">
            <div className="bg-purewhite border border-navy-primary/8 rounded-lg p-5 sm:p-6 elevation-raised">
              <h2 className="font-display text-sm font-semibold text-navy-primary mb-1">
                Book a Consultation
              </h2>
              <p className="text-[11px] text-silver font-sans mb-5 leading-relaxed">
                Fill in your details and we will schedule a site visit at your convenience.
              </p>

              <React.Suspense fallback={
                <div className="py-10 text-center text-silver text-xs font-sans">
                  Loading form…
                </div>
              }>
                <ConsultationFormContent />
              </React.Suspense>
            </div>
          </div>

          {/* RIGHT: Info sidebar */}
          <div className="lg:col-span-5 min-w-0 space-y-4">

            {/* What we audit */}
            <div className="bg-purewhite border border-navy-primary/8 rounded-lg p-5">
              <h3 className="font-display text-xs font-semibold text-navy-primary uppercase tracking-wider mb-4">
                What Our Audit Covers
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Water TDS Analysis", desc: "We measure Hyderabad borewell hardness on-site." },
                  { label: "Plumbing Sizing", desc: "Pipe diameters, inlet pressure, and flow rate math." },
                  { label: "Electrical Phase Check", desc: "Three-phase load calculations for safety compliance." },
                  { label: "Architecture Fit", desc: "Confirm equipment fits inside service shafts or vanities." },
                  { label: "System Recommendation", desc: "Unbiased hardware spec for your exact layout." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-primary mt-1.5 shrink-0" />
                    <div>
                      <span className="font-sans text-[11px] font-semibold text-navy-primary">{item.label}</span>
                      <span className="font-sans text-[10px] text-silver block leading-relaxed">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact card */}
            <div className="bg-navy-primary text-purewhite rounded-lg p-5 border border-gold-primary/10">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-gold-primary mb-4">
                Prefer to Call Us?
              </h3>
              <ul className="space-y-3 text-[11px] font-sans">
                <li className="flex items-center gap-2.5">
                  <Phone size={13} className="text-gold-primary shrink-0" />
                  <a href="tel:+918555998216" className="hover:text-gold-primary transition-colors">+91 85559 98216</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={13} className="text-gold-primary shrink-0" />
                  <a href="mailto:aquaelitesolution@gmail.com" className="hover:text-gold-primary transition-colors">aquaelitesolution@gmail.com</a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={13} className="text-gold-primary shrink-0 mt-0.5" />
                  <a
                    href="https://maps.app.goo.gl/ZyP87vtqo5odNARb8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-primary transition-colors duration-200 text-purewhite/70"
                  >
                    Hema Nagar, Boduppal,<br />
                    Hyderabad — 500039
                  </a>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-purewhite/10 text-[10px] text-purewhite/50">
                Mon–Sat: 9:00 AM – 7:00 PM
              </div>
            </div>

          </div>
        </div>
      </Container>
    </div>
  );
}
