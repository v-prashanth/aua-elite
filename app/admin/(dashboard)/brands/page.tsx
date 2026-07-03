import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { BrandsClient } from './BrandsClient'

export const metadata: Metadata = { title: 'Brands' }

export default async function BrandsPage() {
  const supabase = await createClient()
  const { data: brands } = await supabase
    .from('brands')
    .select('*')
    .order('display_order', { ascending: true })

  return <BrandsClient initialBrands={brands ?? []} />
}
