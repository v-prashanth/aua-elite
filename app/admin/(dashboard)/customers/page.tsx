import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = { title: 'Happy Customers' }

export default async function CustomersPage() {
  const supabase = await createClient()
  const { data: images } = await supabase
    .from('gallery_images')
    .select('*')
    .order('display_order', { ascending: true })

  return <GalleryClient initialImages={images ?? []} />
}
