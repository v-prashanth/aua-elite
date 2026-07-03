import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ProductEditor } from '../ProductEditor'

export const metadata: Metadata = { title: 'Edit Product' }

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  if (id === 'new') {
    return (
      <ProductEditor
        product={null}
        isNew
      />
    )
  }

  const supabase = await createClient()

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <ProductEditor
      product={product}
      isNew={false}
    />
  )
}
