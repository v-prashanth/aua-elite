import { generateMetadata as gm } from "@/lib/seo";
import Link from "next/link";

export const metadata = gm({
  title: "Terms of Service",
  description:
    "Read the terms and conditions that govern use of the Aqua Elite Solutions website and our water heating and treatment consultation, supply, and installation services.",
  keywords: ["terms of service", "terms and conditions", "Aqua Elite Solutions terms"],
});

const LAST_UPDATED = "28 June 2025";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-offwhite font-sans">

      {/* Hero */}
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
              Terms of Service
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
          <div className="space-y-10 text-[13px] sm:text-[14px] text-silver leading-[1.9] font-sans">

            <p className="text-navy-primary font-medium text-[15px] leading-relaxed">
              Please read these Terms of Service carefully before using the Aqua Elite Solutions website or engaging our consultation, supply, or installation services. By accessing our website or making an enquiry, you agree to be bound by these terms.
            </p>

            <TermsSection title="1. About Aqua Elite Solutions">
              <p>
                Aqua Elite Solutions is a professional water heating and water treatment consultation, supply, and installation company based in Hyderabad, Telangana, India. We are not a manufacturer. We are an independent technical service provider that recommends, supplies, and installs products from trusted brands including Stiebel Eltron, A.O. Smith, ZeroB, and Zanskar.
              </p>
            </TermsSection>

            <TermsSection title="2. Use of This Website">
              <ul>
                <li>You must be at least 18 years of age to use this website.</li>
                <li>You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others.</li>
                <li>You must not misuse our contact or consultation forms by submitting false, misleading, or harmful information.</li>
                <li>All content on this website — including text, images, and design — is the property of Aqua Elite Solutions or its licensors. Reproduction without prior written permission is prohibited.</li>
              </ul>
            </TermsSection>

            <TermsSection title="3. Consultation &amp; Site Visits">
              <p>
                When you request a consultation or site visit through our website, WhatsApp, or by phone, you understand the following:
              </p>
              <ul>
                <li>A site visit is a technical assessment conducted by our engineers. It is advisory in nature.</li>
                <li>Our engineers will assess your property&rsquo;s water pressure, electrical capacity, plumbing configuration, and usage patterns before making a recommendation.</li>
                <li>A consultation does not constitute a binding sales agreement. Any supply or installation is subject to a separate written quotation that you must accept.</li>
                <li>We reserve the right to decline a site visit or installation if the property conditions are unsuitable or unsafe for the recommended system.</li>
              </ul>
            </TermsSection>

            <TermsSection title="4. Product Supply &amp; Pricing">
              <ul>
                <li>Product prices quoted verbally or via WhatsApp are indicative and subject to change until a written quotation is issued and accepted.</li>
                <li>All pricing is inclusive of GST unless otherwise stated in writing.</li>
                <li>We source products from authorised distributors. Product availability is subject to stock and manufacturer supply conditions.</li>
                <li>We do not accept returns or exchanges on installed products except where required under applicable consumer protection laws of India.</li>
              </ul>
            </TermsSection>

            <TermsSection title="5. Installation Services">
              <ul>
                <li>All installation work is carried out by our own certified full-time technicians. We do not subcontract installation work to third parties.</li>
                <li>Before installation begins, our team will verify that the site conditions match what was assessed during the consultation. If material differences are found, the installation may be rescheduled or revised.</li>
                <li>The customer is responsible for ensuring access to the installation area, a safe working environment, and any civil or construction work required prior to installation (e.g., drilling, tiling, electrical panel work).</li>
                <li>A commissioning report will be provided upon completion confirming that the system has been tested and is operational.</li>
              </ul>
            </TermsSection>

            <TermsSection title="6. Warranty &amp; After-Sales Support">
              <ul>
                <li>Product warranties are governed by the respective manufacturer&rsquo;s terms and conditions. We will assist with warranty coordination as your local service partner.</li>
                <li>Our installation workmanship carries a 12-month labour warranty from the date of commissioning.</li>
                <li>The warranty does not cover damage caused by misuse, power surges, flooding, tampering by unauthorised personnel, or failure to follow manufacturer usage guidelines.</li>
                <li>Annual maintenance and scale-cleaning services are available on request and are chargeable separately.</li>
              </ul>
            </TermsSection>

            <TermsSection title="7. Payments">
              <ul>
                <li>Payment terms will be stated in the written quotation. Typically, a deposit is required before product procurement and the balance is due upon installation completion.</li>
                <li>Accepted payment methods include bank transfer (NEFT/RTGS/UPI) and cash. Cheque payments are accepted at our discretion.</li>
                <li>All payments must be made in Indian Rupees (INR).</li>
              </ul>
            </TermsSection>

            <TermsSection title="8. Limitation of Liability">
              <p>
                To the fullest extent permitted by applicable law, Aqua Elite Solutions shall not be liable for:
              </p>
              <ul>
                <li>Any indirect, incidental, or consequential damages arising from the use of our website or services.</li>
                <li>Any damage or loss resulting from pre-existing property conditions not disclosed to us at the time of consultation.</li>
                <li>Any interruption of hot water supply caused by municipal water supply failures, power outages, or acts of nature.</li>
              </ul>
              <p>Our total liability in any circumstance shall not exceed the value of the transaction to which the claim relates.</p>
            </TermsSection>

            <TermsSection title="9. Governing Law">
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Hyderabad, Telangana.
              </p>
            </TermsSection>

            <TermsSection title="10. Changes to These Terms">
              <p>
                We reserve the right to modify these Terms of Service at any time. Changes will be published on this page with an updated date. Continued use of our services after any changes constitutes your acceptance of the revised terms.
              </p>
            </TermsSection>

            <TermsSection title="11. Contact">
              <p>For questions about these terms:</p>
              <div className="mt-3 space-y-1 text-navy-primary font-medium">
                <p>Aqua Elite Solutions</p>
                <p>Hema Nagar, Boduppal, Hyderabad, Telangana 500039</p>
                <p><a href="tel:+918555998216" className="text-gold-primary hover:underline">+91 85559 98216</a></p>
                <p><a href="mailto:aquaelitesolution@gmail.com" className="text-gold-primary hover:underline">aquaelitesolution@gmail.com</a></p>
              </div>
            </TermsSection>

            {/* Bottom nav */}
            <div className="pt-6 border-t border-navy-primary/8 flex flex-wrap gap-6">
              <Link href="/privacy" className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-primary/50 hover:text-navy-primary transition-colors">
                Privacy Policy →
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

function TermsSection({ title, children }: { title: string; children: React.ReactNode }) {
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
