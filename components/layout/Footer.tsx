"use client";

import * as React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

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
                <span>
                  Jubilee Hills, Road No. 36,<br />
                  Hyderabad, Telangana - 500033
                </span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={14} className="text-gold-primary shrink-0" />
                <a href="tel:+919849012345" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  +91 98490 12345
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={14} className="text-gold-primary shrink-0" />
                <a href="mailto:info@aquaelite.in" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
                  info@aquaelite.in
                </a>
              </li>
              <li className="pt-2 border-t border-silver/10 text-[11px] text-silver/80">
                <strong>Hours:</strong> Mon - Sat: 9:00 AM - 7:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-silver/10 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-silver/70">
          <p>
            &copy; {currentYear} Aqua Elite Solutions. All rights reserved. Authorized Stiebel Eltron Sales & Service Partner.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/#privacy" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/#terms" className="hover:text-[#FFFFFF] dark:hover:text-[#F3F4F6] transition-colors">
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
          </div>
        </div>
      </Container>
    </footer>
  );
};
