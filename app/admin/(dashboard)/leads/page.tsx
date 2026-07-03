import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { LeadsClient } from './LeadsClient'

export const metadata: Metadata = { title: 'Leads' }

export default async function LeadsPage() {
  const supabase = await createClient()

  const { data: leads } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  return <LeadsClient initialLeads={leads ?? []} />
}
