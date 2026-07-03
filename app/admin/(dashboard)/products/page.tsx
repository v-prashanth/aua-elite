import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import { Package, Plus, Pencil, Star } from 'lucide-react'
import { ProductStatusToggle } from './ProductStatusToggle'

export const metadata: Metadata = { title: 'Products' }

const CATEGORY_LABELS: Record<string, string> = {
  'tankless-3ph': 'Tankless 3-Phase',
  'tankless-1ph': 'Tankless 1-Phase',
  'heat-pump': 'Heat Pump',
  'water-filter': 'Water Filter',
}

export default async function ProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('id, slug, name, subtitle, brand_name, category, status, featured, display_order, image')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6 max-w-[1100px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
            Products ({products?.length ?? 0})
          </h2>
          <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
            All changes reflect immediately on the public website.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-navy-primary text-white px-4 py-2.5 rounded-xl text-[12px] font-sans font-semibold hover:bg-navy-dark transition-colors"
        >
          <Plus size={14} />
          Add Product
        </Link>
      </div>

      {/* Product list */}
      <AdminCard padding="none">
        {!products || products.length === 0 ? (
          <AdminEmptyState
            icon={<Package size={24} strokeWidth={1.5} />}
            title="No products yet"
            description="Add your first product to start building your catalog."
            action={
              <Link
                href="/admin/products/new"
                className="inline-flex items-center gap-2 bg-navy-primary text-white px-4 py-2.5 rounded-xl text-[12px] font-sans font-semibold hover:bg-navy-dark transition-colors"
              >
                <Plus size={14} />
                Add Product
              </Link>
            }
          />
        ) : (
          <div className="divide-y divide-navy-primary/6">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-navy-primary/[0.015] transition-colors"
              >
                {/* Image */}
                <div className="w-12 h-16 rounded-lg bg-navy-primary/5 overflow-hidden shrink-0 relative">
                  {product.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={18} className="text-navy-primary/15" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-[13px] font-sans font-semibold text-navy-primary">
                      {product.name}
                    </p>
                    {product.featured && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-100 px-1.5 py-0.5 rounded-full">
                        <Star size={8} fill="currentColor" /> Featured
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-sans text-navy-primary/40 mt-0.5 truncate">
                    {product.subtitle ?? '—'}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    {product.brand_name && (
                      <span className="text-[9px] uppercase tracking-wider font-bold text-navy-primary/35 font-sans">
                        {product.brand_name}
                      </span>
                    )}
                    <span className="text-[9px] uppercase tracking-wider font-bold text-navy-primary/25 font-sans">
                      {CATEGORY_LABELS[product.category] ?? product.category}
                    </span>
                    <AdminBadge variant={product.status as string} />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <ProductStatusToggle
                    id={product.id}
                    currentStatus={product.status}
                  />
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
                    title="Edit product"
                  >
                    <Pencil size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </div>
  )
}
