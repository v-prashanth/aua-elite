-- ============================================================
-- AQUA ELITE SOLUTIONS — SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── Brands ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  slug          text UNIQUE,
  description   text,
  logo          text,
  website       text,
  origin        text,
  note          text,
  display_order int DEFAULT 0,
  visible       boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ─── Products ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  name            text NOT NULL,
  subtitle        text,
  brand_id        uuid REFERENCES brands(id) ON DELETE SET NULL,
  brand_name      text,
  category        text NOT NULL,
  description     text,
  best_suited     text,
  benefits        text[] DEFAULT '{}',
  features        text[] DEFAULT '{}',
  applications    text[] DEFAULT '{}',
  requirements    text[] DEFAULT '{}',
  specifications  jsonb DEFAULT '{}',
  power_type      text,
  shower_use      text,
  status          text DEFAULT 'available',
  featured        boolean DEFAULT false,
  display_order   int DEFAULT 0,
  image           text,
  gallery_images  text[] DEFAULT '{}',
  hero_color      text,
  gallery_colors  text[] DEFAULT '{}',
  related_slugs   text[] DEFAULT '{}',
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

-- ─── Hero Content ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hero_content (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  heading     text NOT NULL DEFAULT 'Premium Water Systems for Discerning Homes',
  subheading  text,
  tagline     text,
  cta_text    text DEFAULT 'Book a Site Visit',
  cta_link    text DEFAULT '/consultation',
  bg_image    text,
  updated_at  timestamptz DEFAULT now()
);

-- Ensure only one hero row exists
INSERT INTO hero_content (heading, subheading, tagline, cta_text, cta_link)
VALUES (
  'Premium Water Systems for Discerning Homes',
  'We assess your property and recommend the exact system — sized correctly, installed properly, supported long-term.',
  'Water Heating · Softening · Purification',
  'Book a Site Visit',
  '/consultation'
)
ON CONFLICT DO NOTHING;

-- ─── FAQs ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS faqs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question      text NOT NULL,
  answer        text NOT NULL,
  category      text DEFAULT 'General',
  display_order int DEFAULT 0,
  visible       boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ─── Gallery (Happy Customers) ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS gallery_images (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image         text NOT NULL,
  caption       text,
  category      text DEFAULT 'residential',
  display_order int DEFAULT 0,
  visible       boolean DEFAULT true,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

-- ─── Leads ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS leads (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name                text NOT NULL,
  phone               text,
  email               text,
  message             text,
  property_type       text,
  bathrooms           text,
  interested_product  text,
  preferred_date      date,
  source              text DEFAULT 'contact',
  status              text DEFAULT 'new',
  notes               text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

-- ─── SEO Settings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_settings (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path     text UNIQUE NOT NULL,
  title         text,
  description   text,
  og_image      text,
  keywords      text[] DEFAULT '{}',
  robots        text DEFAULT 'index, follow',
  canonical     text,
  updated_at    timestamptz DEFAULT now()
);

-- ─── Contact Info ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_info (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key         text UNIQUE NOT NULL,
  value       text,
  updated_at  timestamptz DEFAULT now()
);

-- Seed default contact info
INSERT INTO contact_info (key, value) VALUES
  ('phone_primary', '+91 98490 00000'),
  ('phone_secondary', '+91 98491 00000'),
  ('whatsapp', '+91 98490 00000'),
  ('email', 'hello@aquaelitesolutions.in'),
  ('address_line1', 'Jubilee Hills'),
  ('address_line2', 'Hyderabad, Telangana 500033'),
  ('business_hours', 'Mon–Sat: 9:00 AM – 6:00 PM'),
  ('google_maps_url', ''),
  ('instagram_url', ''),
  ('linkedin_url', '')
ON CONFLICT (key) DO NOTHING;

-- ─── Site Settings ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key         text UNIQUE NOT NULL,
  value       jsonb DEFAULT '{}',
  updated_at  timestamptz DEFAULT now()
);

INSERT INTO site_settings (key, value) VALUES
  ('business_name', '"Aqua Elite Solutions"'),
  ('logo', '"null"'),
  ('favicon', '"null"'),
  ('footer_copyright', '"© 2025 Aqua Elite Solutions. All rights reserved."'),
  ('footer_tagline', '"Premium Water Heating & Treatment Systems — Hyderabad"'),
  ('how_we_work_quote', '"Every property is different. We take the time to understand yours before recommending anything. That is how we build trust."')
ON CONFLICT (key) DO NOTHING;

-- ─── Updated At Triggers ─────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_brands_updated_at BEFORE UPDATE ON brands FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_leads_updated_at BEFORE UPDATE ON leads FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_gallery_updated_at BEFORE UPDATE ON gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_seo_updated_at BEFORE UPDATE ON seo_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_contact_updated_at BEFORE UPDATE ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_hero_updated_at BEFORE UPDATE ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- Public READ policies (for public website)
CREATE POLICY "Public can read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public can read brands" ON brands FOR SELECT USING (visible = true);
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (visible = true);
CREATE POLICY "Public can read gallery" ON gallery_images FOR SELECT USING (visible = true);
CREATE POLICY "Public can read contact_info" ON contact_info FOR SELECT USING (true);
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Public can read seo_settings" ON seo_settings FOR SELECT USING (true);

-- Admin WRITE policies — authenticated users only (service_role bypasses RLS automatically)
CREATE POLICY "Authenticated users can manage products" ON products FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage brands" ON brands FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage faqs" ON faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage gallery" ON gallery_images FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage leads" ON leads FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage seo" ON seo_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage contact_info" ON contact_info FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage site_settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can manage hero_content" ON hero_content FOR ALL TO authenticated USING (true) WITH CHECK (true);
-- Allow inserting leads from anonymous (contact form)
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);

-- ─── Storage Buckets (run separately in Supabase Dashboard → Storage) ─────────
-- Create these buckets manually in Storage:
--   products   (public)
--   gallery    (public)
--   brands     (public)
--   media      (public)
--   settings   (public)
