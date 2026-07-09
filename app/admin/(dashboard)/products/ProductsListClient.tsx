'use client'

import React from 'react'
import Link from 'next/link'
import { deleteProduct } from '@/app/admin/actions/products'
import { updateProductStatus } from '@/app/admin/actions/products'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import { ConfirmDialog } from '@/components/admin/ui/AdminModal'
import { Package, Plus, Pencil, Star, Trash2, CheckSquare, Square } from 'lucide-react'
import toast from 'react-hot-toast'

const CATEGORY_LABELS: Record<string, string> = {
  'tankless-3ph': 'Tankless 3-Phase',
  'tankless-1ph': 'Tankless 1-Phase',
  'heat-pump': 'Heat Pump',
  'water-filter': 'Water Filter',
}

type Product = {
  id: string
  slug: string
  name: string
  subtitle: string | null
  brand_name: string | null
  category: string
  status: string
  featured: boolean
  display_order: number | null
  image: string | null
}

interface ProductsListClientProps {
  initialProducts: Product[]
}

// Inline status toggle to keep this file self-contained
function ProductStatusToggle({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [status, setStatus] = React.useState(currentStatus)
  const [loading, setLoading] = React.useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.stopPropagation()
    const newStatus = e.target.value as 'available' | 'coming-soon'
    setLoading(true)
    setStatus(newStatus)
    const result = await updateProductStatus(id, newStatus)
    if (result?.error) {
      toast.error(result.error)
      setStatus(currentStatus)
    }
    setLoading(false)
  }

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={loading}
      onClick={e => e.stopPropagation()}
      className="text-[11px] font-sans bg-transparent border border-navy-primary/12 rounded-lg px-2 py-1 text-navy-primary/60 focus:outline-none focus:border-gold-primary cursor-pointer disabled:opacity-50"
    >
      <option value="available">Available</option>
      <option value="coming-soon">Coming Soon</option>
    </select>
  )
}

export function ProductsListClient({ initialProducts }: ProductsListClientProps) {
  const [products, setProducts] = React.useState<Product[]>(initialProducts)
  const [selected, setSelected] = React.useState<Set<string>>(new Set())
  const [deleteMode, setDeleteMode] = React.useState(false)
  const [confirmBulkDelete, setConfirmBulkDelete] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const allSelected = selected.size === products.length && products.length > 0
  const someSelected = selected.size > 0

  function toggleSelect(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (allSelected) {
      setSelected(new Set())
    } else {
      setSelected(new Set(products.map(p => p.id)))
    }
  }

  function exitDeleteMode() {
    setDeleteMode(false)
    setSelected(new Set())
  }

  async function handleBulkDelete() {
    setDeleting(true)
    const ids = Array.from(selected)
    let errorCount = 0
    for (const id of ids) {
      const result = await deleteProduct(id)
      if (result?.error) errorCount++
    }
    setProducts(prev => prev.filter(p => !selected.has(p.id)))
    if (errorCount > 0) {
      toast.error(`${errorCount} product(s) could not be deleted.`)
    } else {
      toast.success(`${ids.length} product(s) deleted.`)
    }
    setSelected(new Set())
    setConfirmBulkDelete(false)
    setDeleteMode(false)
    setDeleting(false)
  }

  return (
    <>
      <div className="space-y-5 max-w-[1100px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
              Products ({products.length})
            </h2>
            <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
              All changes reflect immediately on the public website.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {!deleteMode ? (
              <>
                {products.length > 0 && (
                  <button
                    onClick={() => setDeleteMode(true)}
                    className="inline-flex items-center gap-2 border border-navy-primary/12 text-navy-primary/40 px-3.5 py-2.5 rounded-xl text-[12px] font-sans font-semibold hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all"
                    title="Select products to delete"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                )}
                <Link
                  href="/admin/products/new"
                  className="inline-flex items-center gap-2 bg-navy-primary text-white px-4 py-2.5 rounded-xl text-[12px] font-sans font-semibold hover:bg-navy-dark transition-colors"
                >
                  <Plus size={14} />
                  Add Product
                </Link>
              </>
            ) : (
              <>
                <span className="text-[12px] font-sans text-navy-primary/40 font-medium">
                  {someSelected ? `${selected.size} selected` : 'Select products to delete'}
                </span>
                <button
                  onClick={exitDeleteMode}
                  className="px-3.5 py-2.5 rounded-xl text-[12px] font-sans font-semibold border border-navy-primary/12 text-navy-primary/50 hover:bg-navy-primary/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setConfirmBulkDelete(true)}
                  disabled={!someSelected}
                  className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl text-[12px] font-sans font-semibold hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <Trash2 size={13} />
                  Delete {someSelected ? `${selected.size}` : ''} Selected
                </button>
              </>
            )}
          </div>
        </div>

        {/* Product list */}
        <AdminCard padding="none">
          {products.length === 0 ? (
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
              {/* Select-all row (only in delete mode) */}
              {deleteMode && (
                <div className="flex items-center gap-4 px-5 py-3 bg-navy-primary/[0.02] border-b border-navy-primary/8">
                  <button
                    onClick={toggleAll}
                    className="flex items-center gap-2 text-[12px] font-sans font-semibold text-navy-primary/50 hover:text-navy-primary transition-colors"
                  >
                    {allSelected ? (
                      <CheckSquare size={16} className="text-navy-primary" />
                    ) : (
                      <Square size={16} />
                    )}
                    {allSelected ? 'Deselect All' : 'Select All'}
                  </button>
                </div>
              )}

              {products.map((product) => {
                const isChecked = selected.has(product.id)
                return (
                  <div
                    key={product.id}
                    className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                      deleteMode
                        ? isChecked
                          ? 'bg-red-50/70 hover:bg-red-50 cursor-pointer'
                          : 'hover:bg-navy-primary/[0.015] cursor-pointer'
                        : 'hover:bg-navy-primary/[0.015]'
                    }`}
                    onClick={deleteMode ? () => toggleSelect(product.id) : undefined}
                  >
                    {/* Checkbox (delete mode) */}
                    {deleteMode && (
                      <div className="shrink-0">
                        {isChecked ? (
                          <CheckSquare size={18} className="text-red-500" />
                        ) : (
                          <Square size={18} className="text-navy-primary/20" />
                        )}
                      </div>
                    )}

                    {/* Product image */}
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

                    {/* Actions (hidden in delete mode) */}
                    {!deleteMode && (
                      <div className="flex items-center gap-2 shrink-0" onClick={e => e.stopPropagation()}>
                        <ProductStatusToggle
                          id={product.id}
                          currentStatus={product.status}
                        />
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-sans font-semibold text-navy-primary/40 border border-navy-primary/10 hover:text-navy-primary hover:bg-navy-primary/5 hover:border-navy-primary/20 transition-all"
                          title="Edit product"
                        >
                          <Pencil size={12} />
                          Edit
                        </Link>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </AdminCard>
      </div>

      <ConfirmDialog
        open={confirmBulkDelete}
        onClose={() => setConfirmBulkDelete(false)}
        onConfirm={handleBulkDelete}
        title={`Delete ${selected.size} Product${selected.size !== 1 ? 's' : ''}?`}
        message={`You are about to permanently delete ${selected.size} product${selected.size !== 1 ? 's' : ''} from the website and database. Their uploaded images will also be removed. This cannot be undone.`}
        confirmLabel={`Delete ${selected.size} Product${selected.size !== 1 ? 's' : ''}`}
        danger
        loading={deleting}
      />
    </>
  )
}
