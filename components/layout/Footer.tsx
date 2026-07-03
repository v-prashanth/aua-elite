"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useSettings } from "@/components/shared/SettingsProvider";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const settings = useSettings();

  return (
    <footer className="bg-[#0B2341] dark:bg-[#121316] text-[#FFFFFF] dark:text-[#F3F4F6] border-t border-gold-primary/20 pt-16 pb-8 font-sans">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="font-display text-xl font-semibold tracking-wide text-[#FFFFFF] dark:text-[#F3F4F6]">
                AQUA ELITE
              </span>
              <span className="text-[10px] uppercase tracking-widest text-gold-primary -mt-0.5">
                Water Heating &amp; Water Treatment
              </span>
            </Link>
            <p className="text-xs text-silver leading-relaxed max-w-xs">
              Water heating and water treatment solutions for homes and commercial properties in Hyderabad. We supply products from trusted brands, install them properly, and provide long-term support.
            </p>
            <div className="text-[10px] font-semibold text-gold-primary uppercase tracking-wider">
              Stiebel Eltron ● AO Smith ● ZeroB ● Zanskar
            </div>
            <div className="flex items-center space-x-3 pt-1">
              {settings.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-silver hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors flex items-center space-x-1.5 text-xs"
                  aria-label="Aqua Elite Solutions on Instagram"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width={14}
                    height={14}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gold-primary shrink-0"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>@{settings.instagram_url.replace(/\/$/, '').split('/').pop() || 'aquaelitesolution'}</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-primary mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-silver">
              <li>
                <Link href="/" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Happy Customers
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors font-medium text-gold-primary/90 hover:text-gold-primary">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions Profiles */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-primary mb-4">
              What We Do
            </h4>
            <ul className="space-y-2.5 text-xs text-silver">
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Water Heating
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Heat Pump Systems
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Water Softening
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Water Purification
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  Residential Installations
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gold-primary mb-4">
              Contact & Experience Center
            </h4>
            <ul className="space-y-3 text-xs text-silver">
              <li className="flex items-start space-x-2.5">
                <MapPin size={14} className="text-gold-primary shrink-0 mt-0.5" />
                <a
                  href={settings.google_maps_url || "https://maps.app.goo.gl/ZyP87vtqo5odNARb8?g_st=aw"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors duration-200"
                >
                  {settings.address_line1},<br />
                  {settings.address_line2}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={14} className="text-gold-primary shrink-0" />
                <a href={`tel:${settings.phone_primary.replace(/[^0-9+]/g, "")}`} className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  {settings.phone_primary}
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={14} className="text-gold-primary shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  {settings.email}
                </a>
              </li>
              <li className="pt-2 border-t border-silver/10 text-[11px] text-silver/80">
                <strong>Hours:</strong> {settings.business_hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-silver/10 pt-8 mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-silver/70">
          <div className="space-y-1 text-left">
            <p>
              &copy; {currentYear} Aqua Elite Solutions. All rights reserved.
            </p>
            <p className="text-[10px] text-silver/50">
              Authorized Stiebel Eltron Sales & Service Partner.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://www.stiebel-eltron.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors flex items-center space-x-0.5"
            >
              <span>Stiebel Eltron India</span>
              <ExternalLink size={10} />
            </a>
            <span className="text-silver/20 hidden md:inline">|</span>
            <a
              href="https://prashanthv.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors text-silver/50 text-[10px]"
            >
              Website by Prashanth V
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};
