import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { FAQClient } from './FAQClient'

export const metadata: Metadata = { title: 'FAQ' }

export default async function FAQPage() {
  const supabase = await createClient()

  const { data: faqs } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true })

  return <FAQClient initialFaqs={faqs ?? []} />
}
