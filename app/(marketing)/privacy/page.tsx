import { generateMetadata as gm } from "@/lib/seo";
import Link from "next/link";

export const metadata = gm({
  title: "Privacy Policy",
  description:
    "Learn how Aqua Elite Solutions collects, uses, and protects your personal information when you use our website or book a consultation.",
  keywords: ["privacy policy", "data protection", "Aqua Elite Solutions privacy"],
});

const LAST_UPDATED = "28 June 2025";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* Hero — dark, matching About / Contact */}
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
        <div className="relative max-w-[1320px] mx-auto px-6 lg:px-12 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-gold-primary font-bold mb-5">
              Legal
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-[3rem] font-medium leading-[1.14] tracking-tight text-white mb-5">
              Privacy Policy
            </h1>
            <p className="text-[13px] text-white/45 font-sans">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </div>
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-10 bg-offwhite"
          style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }}
        />
      </section>

      {/* Body */}
      <section className="py-16 md:py-24">
        <div className="max-w-[860px] mx-auto px-6 lg:px-12">
          <div className="prose-content space-y-10 text-[13px] sm:text-[14px] text-silver leading-[1.9] font-sans">

            <p className="text-navy-primary font-medium text-[15px] leading-relaxed">
              Aqua Elite Solutions (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates{" "}
              <span className="text-gold-primary">aquaelitesolutions.com</span>. This Privacy
              Policy explains what information we collect, how we use it, and how we keep it
              safe when you visit our website or request a consultation.
            </p>

            <PolicySection title="1. Information We Collect">
              <p>We collect information only when you voluntarily provide it to us:</p>
              <ul>
                <li><strong>Contact &amp; Inquiry Forms:</strong> Your full name, mobile number, email address, and a description of your property or requirement.</li>
                <li><strong>Consultation Bookings:</strong> Property address (city/locality), preferred appointment time, and the nature of your installation enquiry.</li>
                <li><strong>WhatsApp Conversations:</strong> If you contact us via WhatsApp, we receive the messages you send. Those conversations are also governed by WhatsApp&rsquo;s own privacy policy.</li>
                <li><strong>Automatic Technical Data:</strong> Standard server logs including your IP address, browser type, pages visited, and timestamps. We do not use third-party analytics trackers.</li>
              </ul>
            </PolicySection>

            <PolicySection title="2. How We Use Your Information">
              <ul>
                <li>To respond to your enquiry or schedule a site visit.</li>
                <li>To recommend the correct water heating or treatment system for your property.</li>
                <li>To send you a confirmation or follow-up related to your booking.</li>
                <li>To improve our website and communication workflows.</li>
              </ul>
              <p>We do <strong>not</strong> use your information for unsolicited marketing, cold calls unrelated to your enquiry, or any form of profiling.</p>
            </PolicySection>

            <PolicySection title="3. Sharing of Information">
              <p>We do not sell, rent, or trade your personal information to any third party.</p>
              <p>We may share your data only in the following limited circumstances:</p>
              <ul>
                <li><strong>Service Partners:</strong> If a site visit requires coordination with a certified technician in your area, we share only the minimum information needed to arrange the appointment.</li>
                <li><strong>Legal Obligation:</strong> If required by law, court order, or regulatory authority in India.</li>
              </ul>
            </PolicySection>

            <PolicySection title="4. Data Storage &amp; Security">
              <p>
                Enquiry and booking data is received via our secure contact form and stored in our internal systems. We apply reasonable organisational and technical measures to protect your information from unauthorised access.
              </p>
              <p>
                No method of electronic storage or transmission is 100% secure. We therefore cannot guarantee absolute security, but we take this responsibility seriously.
              </p>
            </PolicySection>

            <PolicySection title="5. Cookies">
              <p>
                Our website uses only technically necessary cookies required for the site to function correctly. We do not use advertising cookies, tracking pixels, or behavioural analytics cookies.
              </p>
            </PolicySection>

            <PolicySection title="6. Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li>Request access to the personal information we hold about you.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of your information, subject to our legal obligations.</li>
                <li>Withdraw consent for future contact at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href="mailto:aquaelitesolution@gmail.com" className="text-gold-primary hover:underline">
                  aquaelitesolution@gmail.com
                </a>.
              </p>
            </PolicySection>

            <PolicySection title="7. Third-Party Links">
              <p>
                Our website contains links to third-party websites including Stiebel Eltron India, WhatsApp, Instagram, and Google Maps. We are not responsible for the privacy practices of those sites and encourage you to review their respective policies.
              </p>
            </PolicySection>

            <PolicySection title="8. Children&rsquo;s Privacy">
              <p>
                Our services are intended for adults who own or manage residential and commercial properties. We do not knowingly collect information from anyone under 18 years of age.
              </p>
            </PolicySection>

            <PolicySection title="9. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of our website after changes constitutes acceptance of the revised policy.
              </p>
            </PolicySection>

            <PolicySection title="10. Contact Us">
              <p>For any privacy-related questions or requests:</p>
              <div className="mt-3 space-y-1 text-navy-primary font-medium">
                <p>Aqua Elite Solutions</p>
                <p>Hema Nagar, Boduppal, Hyderabad, Telangana 500039</p>
                <p>
                  <a href="tel:+918555998216" className="text-gold-primary hover:underline">+91 85559 98216</a>
                </p>
                <p>
                  <a href="mailto:aquaelitesolution@gmail.com" className="text-gold-primary hover:underline">aquaelitesolution@gmail.com</a>
                </p>
              </div>
            </PolicySection>

            {/* Bottom nav */}
            <div className="pt-6 border-t border-navy-primary/8 flex flex-wrap gap-6">
              <Link href="/terms" className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-primary/50 hover:text-navy-primary transition-colors">
                Terms of Service →
              </Link>
              <Link href="/contact" className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-primary/50 hover:text-navy-primary transition-colors">
                Contact Us →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Reusable section block ─── */
function PolicySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="font-display text-[1.15rem] sm:text-[1.25rem] font-medium text-navy-primary leading-tight tracking-tight">
        {title}
      </h2>
      <div className="space-y-3 [&_ul]:space-y-2 [&_ul]:list-disc [&_ul]:pl-5 [&_strong]:text-navy-primary [&_strong]:font-semibold">
        {children}
      </div>
    </div>
  );
}
