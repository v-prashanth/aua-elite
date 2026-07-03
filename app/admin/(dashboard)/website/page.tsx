import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { WebsiteClient } from './WebsiteClient'

export const metadata: Metadata = { title: 'Website' }

export default async function WebsitePage() {
  const supabase = await createClient()

  const [heroResult, quoteResult] = await Promise.all([
    supabase
      .from('hero_content')
      .select('*')
      .maybeSingle(),
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'how_we_work_quote')
      .maybeSingle(),
  ])

  const hero = heroResult.data
  const quote = typeof quoteResult.data?.value === 'string' ? quoteResult.data.value : ''

  return <WebsiteClient initialHero={hero} initialQuote={quote} />
}
