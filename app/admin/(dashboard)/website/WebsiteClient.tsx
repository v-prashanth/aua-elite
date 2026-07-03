'use client'

import React from 'react'
import { updateHeroContent, updateSiteSetting } from '@/app/admin/actions/content'
import Link from 'next/link'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminTextarea } from '@/components/admin/ui/AdminInput'
import type { HeroContent } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { Globe, ExternalLink } from 'lucide-react'

interface WebsiteClientProps {
  initialHero: HeroContent | null
  initialQuote: string
}

export function WebsiteClient({ initialHero, initialQuote }: WebsiteClientProps) {
  const [saving, setSaving] = React.useState(false)
  const [hero, setHero] = React.useState({
    heading: initialHero?.heading ?? '',
    subheading: initialHero?.subheading ?? '',
    tagline: initialHero?.tagline ?? '',
    cta_text: initialHero?.cta_text ?? '',
    cta_link: initialHero?.cta_link ?? '',
  })
  const [quote, setQuote] = React.useState(initialQuote)

  async function handleSave() {
    if (!hero.heading.trim()) {
      toast.error('Hero heading is required.')
      return
    }
    setSaving(true)

    const [heroResult, quoteResult] = await Promise.all([
      updateHeroContent(hero),
      updateSiteSetting('how_we_work_quote', quote),
    ])

    if (heroResult?.error || quoteResult?.error) {
      toast.error(heroResult?.error || quoteResult?.error || 'An error occurred while saving.')
    } else {
      toast.success('Website content updated. Changes are live.')
    }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
            Website Content
          </h2>
          <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
            Edit landing page and general website text content.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-navy-primary/12 text-[12px] font-sans text-navy-primary/50 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
          >
            <ExternalLink size={13} />
            View Homepage
          </a>
          <AdminButton loading={saving} onClick={handleSave}>
            Save Changes
          </AdminButton>
        </div>
      </div>

      {/* Info banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5">
        <div className="flex items-start gap-3">
          <Globe size={15} className="text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="text-[12px] font-sans font-semibold text-blue-700">Content Only</p>
            <p className="text-[11px] font-sans text-blue-600 mt-0.5 leading-relaxed">
              This editor controls text content only. The layout, typography, animations, and design
              of the website are handled by the development team and cannot be accidentally changed here.
            </p>
          </div>
        </div>
      </div>

      {/* Hero section */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-gold-primary rounded-full" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">
            Hero Section
          </h3>
        </div>
        <div className="space-y-4">
          <AdminTextarea
            label="Hero Heading"
            value={hero.heading}
            onChange={e => setHero(h => ({ ...h, heading: e.target.value }))}
            placeholder="Premium Water Systems for Discerning Homes"
            hint="The main headline displayed at the top of the homepage."
            rows={3}
            required
          />
          <AdminTextarea
            label="Hero Subheading"
            value={hero.subheading}
            onChange={e => setHero(h => ({ ...h, subheading: e.target.value }))}
            placeholder="We assess your property and recommend the exact system…"
            hint="The description text below the headline."
            rows={3}
          />
          <AdminInput
            label="Tagline"
            value={hero.tagline}
            onChange={e => setHero(h => ({ ...h, tagline: e.target.value }))}
            placeholder="Water Heating · Softening · Purification"
            hint="The small text above the headline (e.g., category label)."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="CTA Button Text"
              value={hero.cta_text}
              onChange={e => setHero(h => ({ ...h, cta_text: e.target.value }))}
              placeholder="Book a Site Visit"
            />
            <AdminInput
              label="CTA Button Link"
              value={hero.cta_link}
              onChange={e => setHero(h => ({ ...h, cta_link: e.target.value }))}
              placeholder="/consultation"
              hint="Use /path for internal links."
            />
          </div>
        </div>
      </AdminCard>

      {/* How We Work Section */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-5 bg-gold-primary rounded-full" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">
            How We Work Section
          </h3>
        </div>
        <div className="space-y-4">
          <AdminTextarea
            label="Section Trust Quote"
            value={quote}
            onChange={e => setQuote(e.target.value)}
            placeholder="Every property is different. We take the time to understand yours before recommending anything. That is how we build trust."
            hint="The quote statement displayed at the bottom of the advisory approach section."
            rows={3}
          />
        </div>
      </AdminCard>

      {/* Contact info section - link to settings */}
      <AdminCard>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-sans font-semibold text-navy-primary mb-0.5">
              Contact Information
            </h3>
            <p className="text-[12px] font-sans text-navy-primary/40">
              Phone, WhatsApp, email, address, and business hours.
            </p>
          </div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 text-[12px] font-sans font-semibold text-navy-primary/50 hover:text-navy-primary transition-colors"
          >
            Edit in Settings →
          </Link>
        </div>
      </AdminCard>
    </div>
  )
}
