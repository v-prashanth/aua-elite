import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SEOClient } from './SEOClient'

export const metadata: Metadata = { title: 'SEO' }

const PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/products', name: 'Products' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/faq', name: 'FAQ' },
  { path: '/consultation', name: 'Consultation' },
  { path: '/projects', name: 'Projects' },
]

export default async function SEOPage() {
  const supabase = await createClient()

  const { data: seoSettings } = await supabase
    .from('seo_settings')
    .select('*')

  const seoMap = Object.fromEntries(
    (seoSettings ?? []).map(s => [s.page_path, s])
  )

  return <SEOClient pages={PAGES} seoMap={seoMap} />
}
