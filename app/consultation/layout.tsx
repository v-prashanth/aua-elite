import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { createClient } from "@/lib/supabase/server";
import { SettingsProvider } from "@/components/shared/SettingsProvider";

export const revalidate = 3600;

export default async function ConsultationLayout({ children }: { children: React.ReactNode }) {
  let contactMap: Record<string, string> = {};

  try {
    const supabase = await createClient();
    const { data: contactInfo } = await supabase
      .from("contact_info")
      .select("key, value");

    if (contactInfo) {
      contactMap = Object.fromEntries(
        contactInfo.map((c) => [c.key, c.value ?? ""])
      );
    }
  } catch (err) {
    console.warn("Failed to fetch contact details from Supabase. Using local fallbacks.", err);
  }

  return (
    <SettingsProvider initialSettings={contactMap}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
    </SettingsProvider>
  );
}
