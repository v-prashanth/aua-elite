import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { SettingsClient } from './SettingsClient'

export const metadata: Metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createClient()

  const { data: contactInfo } = await supabase
    .from('contact_info')
    .select('*')

  const contactMap = Object.fromEntries(
    (contactInfo ?? []).map(c => [c.key, c.value ?? ''])
  )

  return <SettingsClient initialContact={contactMap} />
}
