import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import { defaultMetadata } from "@/lib/seo";
import "./globals.css";

// Inter for body/UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Fraunces for display/headline font (with customized axes per spec)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

export const metadata: Metadata = defaultMetadata;

/**
 * Root layout — shared by ALL routes (marketing + admin).
 * Contains only the HTML shell and font variables.
 *
 * Navbar, Footer, and WhatsApp are in the (marketing)/layout.tsx route group.
 * The admin shell is in app/admin/layout.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen flex flex-col justify-between bg-offwhite text-navy-primary">
        {children}
      </body>
    </html>
  );
}
