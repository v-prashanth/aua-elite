'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { updateProduct, deleteProduct } from '@/app/admin/actions/products'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminTextarea, AdminSelect, AdminToggle } from '@/components/admin/ui/AdminInput'
import { ConfirmDialog } from '@/components/admin/ui/AdminModal'
import type { Product } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { ArrowLeft, Trash2, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'

const CATEGORY_OPTIONS = [
  { value: 'tankless-3ph', label: 'Tankless (Three-Phase)' },
  { value: 'tankless-1ph', label: 'Tankless (Single-Phase)' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'water-filter', label: 'Water Filter' },
]

const POWER_OPTIONS = [
  { value: 'three-phase', label: 'Three-Phase (400V)' },
  { value: 'single-phase', label: 'Single-Phase (220-240V)' },
  { value: 'none', label: 'No Power Required' },
]

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'coming-soon', label: 'Coming Soon' },
]

interface ProductEditorProps {
  product: Product | null
  isNew: boolean
}

export function ProductEditor({ product, isNew }: ProductEditorProps) {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)

  // Form state
  const [form, setForm] = React.useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    subtitle: product?.subtitle ?? '',
    brand_name: product?.brand_name ?? '',
    category: product?.category ?? 'tankless-3ph',
    power_type: product?.power_type ?? 'three-phase',
    status: product?.status ?? 'available',
    description: product?.description ?? '',
    best_suited: product?.best_suited ?? '',
    shower_use: product?.shower_use ?? '',
    featured: product?.featured ?? false,
    image: product?.image ?? '',
    benefits: (product?.benefits ?? []).join('\n'),
    features: (product?.features ?? []).join('\n'),
    applications: (product?.applications ?? []).join('\n'),
    requirements: (product?.requirements ?? []).join('\n'),
    specifications: Object.entries(product?.specifications as Record<string, string> ?? {})
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  })

  function handleChange(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(value: string) {
    setForm(f => ({
      ...f,
      name: value,
      // Auto-generate slug only for new products
      slug: isNew ? slugify(value) : f.slug,
    }))
  }

  function parseLines(text: string): string[] {
    return text
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean)
  }

  function parseSpecifications(text: string): Record<string, string> {
    const result: Record<string, string> = {}
    text.split('\n').forEach(line => {
      const idx = line.indexOf(':')
      if (idx > 0) {
        const key = line.slice(0, idx).trim()
        const value = line.slice(idx + 1).trim()
        if (key && value) result[key] = value
      }
    })
    return result
  }

  async function handleSave() {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error('Product name and slug are required.')
      return
    }
    setSaving(true)

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      subtitle: form.subtitle.trim() || null,
      brand_name: form.brand_name.trim() || null,
      category: form.category,
      power_type: form.power_type || null,
      status: form.status,
      description: form.description.trim() || null,
      best_suited: form.best_suited.trim() || null,
      shower_use: form.shower_use.trim() || null,
      featured: form.featured,
      image: form.image.trim() || null,
      benefits: parseLines(form.benefits),
      features: parseLines(form.features),
      applications: parseLines(form.applications),
      requirements: parseLines(form.requirements),
      specifications: parseSpecifications(form.specifications),
    }

    const result = await updateProduct(product!.id, payload)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Product saved.')
    }
    setSaving(false)
  }

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteProduct(product!.id)
    if (result?.error) {
      toast.error(result.error)
      setDeleting(false)
    } else {
      toast.success('Product deleted.')
      router.push('/admin/products')
    }
  }

  return (
    <>
      <div className="space-y-6 max-w-[900px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-navy-primary/12 text-navy-primary/40 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
            >
              <ArrowLeft size={15} />
            </Link>
            <div>
              <h2 className="text-[18px] font-sans font-semibold text-navy-primary">
                {isNew ? 'New Product' : form.name || 'Edit Product'}
              </h2>
              {product?.slug && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-sans text-navy-primary/35">
                    /products/{product.slug}
                  </span>
                  <a
                    href={`/products/${product.slug}`}
                    target="_blank"
                    className="text-navy-primary/25 hover:text-gold-primary transition-colors"
                  >
                    <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isNew && (
              <AdminButton
                variant="danger"
                onClick={() => setDeleteOpen(true)}
                icon={<Trash2 size={13} />}
                size="sm"
              >
                Delete
              </AdminButton>
            )}
            <AdminButton
              loading={saving}
              onClick={handleSave}
              disabled={isNew}
            >
              {isNew ? 'Create in DB first' : 'Save Changes'}
            </AdminButton>
          </div>
        </div>

        {isNew && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5">
            <p className="text-[12px] font-sans text-amber-700">
              <strong>Note:</strong> Creating new products requires Supabase to be connected. Once connected, fill in the form and save — it will be created in the database automatically.
            </p>
          </div>
        )}

        {/* Basic Info */}
        <AdminCard>
          <h3 className="text-[13px] font-sans font-semibold text-navy-primary mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AdminInput
              label="Product Name"
              value={form.name}
              onChange={e => handleNameChange(e.target.value)}
              placeholder="DHB-E 18/21/24 LCD"
              required
            />
            <AdminInput
              label="URL Slug"
              value={form.slug}
              onChange={e => handleChange('slug', e.target.value)}
              placeholder="dhb-e-18-21-24-comfort-series"
              hint="Used in the product URL. No spaces."
              required
            />
            <AdminInput
              label="Subtitle"
              value={form.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)}
              placeholder="Precision Electronic Whole-Bathroom Water Heater"
            />
            <AdminInput
              label="Brand Name"
              value={form.brand_name}
              onChange={e => handleChange('brand_name', e.target.value)}
              placeholder="Stiebel Eltron"
            />
            <AdminSelect
              label="Category"
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              options={CATEGORY_OPTIONS}
            />
            <AdminSelect
              label="Power Type"
              value={form.power_type}
              onChange={e => handleChange('power_type', e.target.value)}
              options={POWER_OPTIONS}
            />
            <AdminSelect
              label="Status"
              value={form.status}
              onChange={e => handleChange('status', e.target.value)}
              options={STATUS_OPTIONS}
            />
            <AdminInput
              label="Shower Use"
              value={form.shower_use}
              onChange={e => handleChange('shower_use', e.target.value)}
              placeholder="Basic Rain Shower / Large Rain Shower"
              hint="Displayed in the product detail page."
            />
          </div>

          <div className="mt-4 pt-4 border-t border-navy-primary/8">
            <AdminToggle
              label="Featured Product"
              description="Show this product in the homepage featured section."
              checked={form.featured}
              onChange={v => handleChange('featured', v)}
            />
          </div>
        </AdminCard>

        {/* Image */}
        <AdminCard>
          <h3 className="text-[13px] font-sans font-semibold text-navy-primary mb-4">
            Product Image
          </h3>
          <ImageUploader
            bucket="products"
            value={form.image}
            onChange={url => handleChange('image', url)}
            hint="Upload a clean product shot. JPG, PNG or WEBP up to 5MB."
          />
        </AdminCard>

        {/* Description */}
        <AdminCard>
          <h3 className="text-[13px] font-sans font-semibold text-navy-primary mb-4">
            Content
          </h3>
          <div className="space-y-4">
            <AdminTextarea
              label="Overview / Description"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Made in Germany. This instantaneous water heater…"
              rows={4}
            />
            <AdminTextarea
              label="Best Suited For"
              value={form.best_suited}
              onChange={e => handleChange('best_suited', e.target.value)}
              placeholder="Luxury bathrooms running standard rain showers…"
              rows={2}
            />
          </div>
        </AdminCard>

        {/* Lists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { field: 'benefits', label: 'Benefits', placeholder: 'One benefit per line\nContinuous hot water…\nSaves up to 30% energy…' },
            { field: 'features', label: 'Features', placeholder: 'One feature per line\nDigital LCD interface…\nDynamic flow rate controller…' },
            { field: 'applications', label: 'Applications', placeholder: 'One application per line\nMulti-outlet Luxury Bathrooms\nPrivate Villa Master Showers' },
            { field: 'requirements', label: 'Requirements (for finder)', placeholder: 'One tag per line\nRain Shower\nLuxury Bathroom' },
          ].map(item => (
            <AdminCard key={item.field}>
              <AdminTextarea
                label={item.label}
                value={form[item.field as keyof typeof form] as string}
                onChange={e => handleChange(item.field, e.target.value)}
                placeholder={item.placeholder}
                hint="One item per line."
                rows={5}
              />
            </AdminCard>
          ))}
        </div>

        {/* Specifications */}
        <AdminCard>
          <AdminTextarea
            label="Specifications"
            value={form.specifications}
            onChange={e => handleChange('specifications', e.target.value)}
            placeholder="Rated Voltage: 400 V (Three-Phase Connection Required)&#10;Rated Output: 18.0 / 21.0 / 24.0 kW&#10;Temperature Range: 20 °C – 60 °C"
            hint="One specification per line. Format: Key: Value"
            rows={7}
          />
        </AdminCard>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`"${form.name}" will be permanently deleted from the website and database. This cannot be undone.`}
        confirmLabel="Delete Product"
        danger
        loading={deleting}
      />
    </>
  )
}

