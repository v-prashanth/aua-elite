'use client'

import React from 'react'
import { updateSeoSettings } from '@/app/admin/actions/content'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import type { SeoSetting } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Page { path: string; name: string }
interface SEOClientProps {
  pages: Page[]
  seoMap: Record<string, SeoSetting>
}

export function SEOClient({ pages, seoMap }: SEOClientProps) {
  const [activePage, setActivePage] = React.useState(pages[0].path)
  const [saving, setSaving] = React.useState(false)
  const currentSeo = seoMap[activePage]

  const [form, setForm] = React.useState({
    title: currentSeo?.title ?? '',
    description: currentSeo?.description ?? '',
    og_image: currentSeo?.og_image ?? '',
    keywords: (currentSeo?.keywords ?? []).join(', '),
    robots: currentSeo?.robots ?? 'index, follow',
    canonical: currentSeo?.canonical ?? '',
  })

  function loadPage(path: string) {
    setActivePage(path)
    const seo = seoMap[path]
    setForm({
      title: seo?.title ?? '',
      description: seo?.description ?? '',
      og_image: seo?.og_image ?? '',
      keywords: (seo?.keywords ?? []).join(', '),
      robots: seo?.robots ?? 'index, follow',
      canonical: seo?.canonical ?? '',
    })
  }

  async function handleSave() {
    setSaving(true)
    const result = await updateSeoSettings(activePage, {
      title: form.title || undefined,
      description: form.description || undefined,
      og_image: form.og_image || undefined,
      keywords: form.keywords ? form.keywords.split(',').map(k => k.trim()).filter(Boolean) : [],
      robots: form.robots || 'index, follow',
      canonical: form.canonical || undefined,
    })
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('SEO settings saved.')
    }
    setSaving(false)
  }

  const titleLength = form.title.length
  const descLength = form.description.length

  return (
    <div className="space-y-6 max-w-[900px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-sans font-semibold text-navy-primary">SEO</h2>
          <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
            Per-page meta tags. Select a page to edit.
          </p>
        </div>
        <AdminButton loading={saving} onClick={handleSave} icon={<Search size={14} />}>
          Save Page SEO
        </AdminButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-5">
        {/* Page list */}
        <AdminCard padding="none">
          <div className="p-2">
            {pages.map(page => (
              <button
                key={page.path}
                onClick={() => loadPage(page.path)}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl text-[13px] font-sans font-medium transition-all duration-150',
                  activePage === page.path
                    ? 'bg-navy-primary/8 text-navy-primary'
                    : 'text-navy-primary/50 hover:text-navy-primary hover:bg-navy-primary/4'
                )}
              >
                {page.name}
                <span className="block text-[10px] font-mono text-navy-primary/25 mt-0.5">
                  {page.path}
                </span>
              </button>
            ))}
          </div>
        </AdminCard>

        {/* SEO form */}
        <AdminCard>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                  Meta Title
                </label>
                <span className={cn(
                  'text-[10px] font-sans',
                  titleLength > 60 ? 'text-red-500' : titleLength > 50 ? 'text-amber-500' : 'text-navy-primary/30'
                )}>
                  {titleLength}/60
                </span>
              </div>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Aqua Elite Solutions — Premium Water Systems Hyderabad"
                className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                  Meta Description
                </label>
                <span className={cn(
                  'text-[10px] font-sans',
                  descLength > 160 ? 'text-red-500' : descLength > 140 ? 'text-amber-500' : 'text-navy-primary/30'
                )}>
                  {descLength}/160
                </span>
              </div>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Aqua Elite Solutions provides premium Stiebel Eltron water heating systems, heat pumps, and water purifiers for villas and apartments in Hyderabad."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-all resize-y"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                  Keywords
                </label>
                <input
                  type="text"
                  value={form.keywords}
                  onChange={e => setForm(f => ({ ...f, keywords: e.target.value }))}
                  placeholder="water heater hyderabad, tankless heater, stiebel eltron"
                  className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-all"
                />
                <p className="text-[10px] font-sans text-navy-primary/30">Comma separated</p>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                  Robots
                </label>
                <select
                  value={form.robots}
                  onChange={e => setForm(f => ({ ...f, robots: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans focus:outline-none focus:border-gold-primary transition-all"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                OG Image URL
              </label>
              <input
                type="text"
                value={form.og_image}
                onChange={e => setForm(f => ({ ...f, og_image: e.target.value }))}
                placeholder="/images/og-default.jpg"
                className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                Canonical URL
              </label>
              <input
                type="text"
                value={form.canonical}
                onChange={e => setForm(f => ({ ...f, canonical: e.target.value }))}
                placeholder="https://aquaelitesolutions.in/"
                className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-all"
              />
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
