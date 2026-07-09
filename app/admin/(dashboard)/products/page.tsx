import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { ProductsListClient } from './ProductsListClient'

export const metadata: Metadata = { title: 'Products' }

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, subtitle, brand_name, category, status, featured, display_order, image')
    .order('display_order', { ascending: true })

  return (
    <ProductsListClient initialProducts={products ?? []} />
  )
}
