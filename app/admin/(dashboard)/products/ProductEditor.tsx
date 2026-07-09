'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct, deleteProduct } from '@/app/admin/actions/products'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminTextarea, AdminSelect, AdminToggle } from '@/components/admin/ui/AdminInput'
import { ConfirmDialog } from '@/components/admin/ui/AdminModal'
import type { Product } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { ArrowLeft, Trash2, ExternalLink, Plus, X, ChevronDown, ChevronUp, Pencil } from 'lucide-react'
import Link from 'next/link'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'

const CATEGORY_OPTIONS = [
  { value: 'tankless-3ph', label: 'Tankless Water Heater (Three-Phase)' },
  { value: 'tankless-1ph', label: 'Tankless Water Heater (Single-Phase)' },
  { value: 'heat-pump', label: 'Heat Pump' },
  { value: 'water-filter', label: 'Water Filter / Purifier' },
]

const POWER_OPTIONS = [
  { value: 'three-phase', label: 'Three-Phase (400V)' },
  { value: 'single-phase', label: 'Single-Phase (220-240V)' },
  { value: 'none', label: 'No Power Required' },
]

const STATUS_OPTIONS = [
  { value: 'available', label: 'Available (Visible on website)' },
  { value: 'coming-soon', label: 'Coming Soon (Greyed out)' },
]

// All the tags customers can filter products by
const REQUIREMENT_TAGS = [
  'Kitchen Use',
  'Small Bathroom',
  'Rain Shower',
  'Luxury Bathroom',
  'Bathtub',
  'Large Family Home',
  'Hotels & Commercial',
]

interface ProductEditorProps {
  product: Product | null
  isNew: boolean
}

// ── Dynamic list editor (for Benefits, Features, Applications) ──────────────
function ListEditor({
  label,
  hint,
  placeholder,
  items,
  onChange,
}: {
  label: string
  hint?: string
  placeholder: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  function handleItemChange(index: number, value: string) {
    const updated = [...items]
    updated[index] = value
    onChange(updated)
  }
  function handleAdd() {
    onChange([...items, ''])
  }
  function handleRemove(index: number) {
    onChange(items.filter((_, i) => i !== index))
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === 'Enter') {
      e.preventDefault()
      onChange([...items.slice(0, index + 1), '', ...items.slice(index + 1)])
    }
    if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault()
      handleRemove(index)
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-end justify-between mb-2">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans">
            {label}
          </span>
          {hint && <span className="text-[10px] text-navy-primary/30 font-sans mt-0.5 block">{hint}</span>}
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold-primary hover:text-navy-primary transition-colors font-sans"
        >
          <Plus size={11} />
          Add
        </button>
      </div>
      <div className="space-y-1.5">
        {items.length === 0 && (
          <button
            type="button"
            onClick={handleAdd}
            className="w-full border border-dashed border-navy-primary/15 rounded-lg py-3 text-[11px] text-navy-primary/30 font-sans hover:border-gold-primary/40 hover:text-gold-primary transition-colors"
          >
            + Click to add {label.toLowerCase()}
          </button>
        )}
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 group">
            <span className="w-4 text-[10px] text-navy-primary/20 font-sans tabular-nums shrink-0 text-right">
              {i + 1}.
            </span>
            <input
              type="text"
              value={item}
              onChange={e => handleItemChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(e, i)}
              placeholder={placeholder}
              className="flex-1 text-[12px] font-sans text-navy-primary bg-navy-primary/[0.03] border border-navy-primary/10 rounded-lg px-3 py-2 outline-none focus:border-gold-primary/50 focus:bg-white transition-all placeholder:text-navy-primary/25"
            />
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="w-6 h-6 flex items-center justify-center rounded-md text-navy-primary/20 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Specification key-value editor ──────────────────────────────────────────
function SpecEditor({
  specs,
  onChange,
}: {
  specs: Record<string, string>
  onChange: (specs: Record<string, string>) => void
}) {
  const entries = Object.entries(specs)

  function handleKeyChange(oldKey: string, newKey: string) {
    const updated: Record<string, string> = {}
    for (const [k, v] of Object.entries(specs)) {
      updated[k === oldKey ? newKey : k] = v
    }
    onChange(updated)
  }

  function handleValueChange(key: string, value: string) {
    onChange({ ...specs, [key]: value })
  }

  function handleAdd() {
    const newKey = `Spec ${entries.length + 1}`
    onChange({ ...specs, [newKey]: '' })
  }

  function handleRemove(key: string) {
    const updated = { ...specs }
    delete updated[key]
    onChange(updated)
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-end justify-between mb-2">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans">
            Technical Specifications
          </span>
          <span className="text-[10px] text-navy-primary/30 font-sans mt-0.5 block">
            e.g. Rated Output → 18 kW, Country of Origin → Germany
          </span>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold-primary hover:text-navy-primary transition-colors font-sans"
        >
          <Plus size={11} />
          Add Row
        </button>
      </div>
      <div className="space-y-1.5">
        {entries.length === 0 && (
          <button
            type="button"
            onClick={handleAdd}
            className="w-full border border-dashed border-navy-primary/15 rounded-lg py-3 text-[11px] text-navy-primary/30 font-sans hover:border-gold-primary/40 hover:text-gold-primary transition-colors"
          >
            + Click to add a specification row
          </button>
        )}
        {entries.map(([key, value]) => (
          <div key={key} className="flex items-center gap-2 group">
            <input
              type="text"
              value={key}
              onChange={e => handleKeyChange(key, e.target.value)}
              placeholder="Property name"
              className="w-[38%] shrink-0 text-[12px] font-sans font-medium text-navy-primary bg-navy-primary/[0.03] border border-navy-primary/10 rounded-lg px-3 py-2 outline-none focus:border-gold-primary/50 focus:bg-white transition-all placeholder:text-navy-primary/25"
            />
            <span className="text-navy-primary/20 text-[11px] shrink-0">→</span>
            <input
              type="text"
              value={value}
              onChange={e => handleValueChange(key, e.target.value)}
              placeholder="Value"
              className="flex-1 text-[12px] font-sans text-navy-primary bg-navy-primary/[0.03] border border-navy-primary/10 rounded-lg px-3 py-2 outline-none focus:border-gold-primary/50 focus:bg-white transition-all placeholder:text-navy-primary/25"
            />
            <button
              type="button"
              onClick={() => handleRemove(key)}
              className="w-6 h-6 flex items-center justify-center rounded-md text-navy-primary/20 hover:text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shrink-0"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Requirements tag picker ──────────────────────────────────────────────────
function RequirementsPicker({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (tags: string[]) => void
}) {
  function toggle(tag: string) {
    if (selected.includes(tag)) {
      onChange(selected.filter(t => t !== tag))
    } else {
      onChange([...selected, tag])
    }
  }

  return (
    <div>
      <span className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans mb-1.5">
        Suitable For (Product Finder Tags)
      </span>
      <span className="text-[10px] text-navy-primary/30 font-sans block mb-3">
        These tags control which customer scenarios match this product in the &quot;Find Your Solution&quot; section.
      </span>
      <div className="flex flex-wrap gap-2">
        {REQUIREMENT_TAGS.map(tag => {
          const active = selected.includes(tag)
          return (
            <button
              key={tag}
              type="button"
              onClick={() => toggle(tag)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-sans font-semibold border transition-all duration-200 ${
                active
                  ? 'bg-navy-primary text-white border-navy-primary'
                  : 'bg-transparent text-navy-primary/50 border-navy-primary/15 hover:border-navy-primary/40 hover:text-navy-primary'
              }`}
            >
              {active ? '✓ ' : ''}{tag}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main ProductEditor ───────────────────────────────────────────────────────
export function ProductEditor({ product, isNew }: ProductEditorProps) {
  const router = useRouter()
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [deleteOpen, setDeleteOpen] = React.useState(false)
  const [showSlugEdit, setShowSlugEdit] = React.useState(false)
  const [showAdvanced, setShowAdvanced] = React.useState(false)

  // Parse specs from DB (JSON object) to editable state
  const parseSpecs = (raw: unknown): Record<string, string> => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {}
    return raw as Record<string, string>
  }

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
    // Rich editors: arrays instead of raw strings
    benefits: product?.benefits ?? [] as string[],
    features: product?.features ?? [] as string[],
    applications: product?.applications ?? [] as string[],
    requirements: product?.requirements ?? [] as string[],
    specifications: parseSpecs(product?.specifications),
  })

  function handleChange(field: string, value: string | boolean) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleArrayChange(field: string, value: string[]) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSpecsChange(specs: Record<string, string>) {
    setForm(f => ({ ...f, specifications: specs }))
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
      slug: isNew ? slugify(value) : f.slug,
    }))
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error('Product name is required.')
      return
    }
    if (!form.slug.trim()) {
      toast.error('URL slug is required.')
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
      benefits: form.benefits.filter(Boolean),
      features: form.features.filter(Boolean),
      applications: form.applications.filter(Boolean),
      requirements: form.requirements.filter(Boolean),
      specifications: form.specifications,
    }

    let result
    try {
      result = isNew
        ? await createProduct(payload)
        : await updateProduct(product!.id, payload)
    } catch (err) {
      const isRedirect =
        typeof err === 'object' &&
        err !== null &&
        'digest' in err &&
        typeof (err as { digest: unknown }).digest === 'string' &&
        (err as { digest: string }).digest.startsWith('NEXT_REDIRECT')
      if (!isRedirect) {
        setSaving(false)
      }
      throw err
    }

    if (result?.error) {
      toast.error(result.error)
      setSaving(false)
    } else {
      toast.success(isNew ? 'Product created.' : 'Product saved.')
      if (!isNew) {
        setSaving(false)
      }
    }
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
      <div className="space-y-5 max-w-[900px]">

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
              disabled={saving}
            >
              {isNew ? 'Create Product' : 'Save Changes'}
            </AdminButton>
          </div>
        </div>

        {/* ── Step 1: Core Details ───────────────────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">1</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Core Details</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="sm:col-span-2">
              <AdminInput
                label="Product Name"
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                placeholder="e.g. DHB-E 18/21/24 LCD"
                required
                hint="The full model name shown on the website."
              />
              {/* Slug row — hidden by default */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-navy-primary/30 font-sans">
                  Page URL: <span className="font-mono text-navy-primary/50">/products/{form.slug || '…'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSlugEdit(v => !v)}
                  className="text-[10px] text-navy-primary/30 hover:text-gold-primary transition-colors inline-flex items-center gap-1"
                >
                  <Pencil size={9} /> Edit
                </button>
              </div>
              {showSlugEdit && (
                <div className="mt-2">
                  <AdminInput
                    label="URL Slug (Advanced)"
                    value={form.slug}
                    onChange={e => handleChange('slug', e.target.value)}
                    placeholder="dhb-e-18-21-24-comfort-series"
                    hint="Lowercase letters, numbers, and hyphens only. Changes the product URL."
                  />
                </div>
              )}
            </div>

            <AdminInput
              label="Short Description (Subtitle)"
              value={form.subtitle}
              onChange={e => handleChange('subtitle', e.target.value)}
              placeholder="e.g. Precision Electronic Whole-Bathroom Water Heater"
              hint="One line that appears under the product name."
            />

            <AdminInput
              label="Brand Name"
              value={form.brand_name}
              onChange={e => handleChange('brand_name', e.target.value)}
              placeholder="e.g. Stiebel Eltron"
            />

            <AdminSelect
              label="Product Type"
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              options={CATEGORY_OPTIONS}
            />

            <AdminSelect
              label="Status"
              value={form.status}
              onChange={e => handleChange('status', e.target.value)}
              options={STATUS_OPTIONS}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-navy-primary/8">
            <AdminToggle
              label="Feature on Homepage"
              description="Show this product in the homepage featured products section."
              checked={form.featured}
              onChange={v => handleChange('featured', v)}
            />
          </div>
        </AdminCard>

        {/* ── Step 2: Product Image ──────────────────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">2</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Product Image</h3>
          </div>
          <ImageUploader
            bucket="products"
            value={form.image}
            onChange={url => handleChange('image', url)}
            hint="Upload a clean product photo. JPG, PNG or WEBP up to 5MB."
          />
        </AdminCard>

        {/* ── Step 3: Description ───────────────────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">3</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Description</h3>
          </div>
          <div className="space-y-4">
            <AdminTextarea
              label="Product Overview"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="Write a short paragraph about this product — what it does, who it's made by, and why it's good."
              rows={4}
            />
            <AdminTextarea
              label="Best Suited For"
              value={form.best_suited}
              onChange={e => handleChange('best_suited', e.target.value)}
              placeholder="e.g. Luxury bathrooms running standard rain showers in villas and apartments."
              rows={2}
              hint="One sentence describing the ideal customer or property type."
            />
          </div>
        </AdminCard>

        {/* ── Step 4: Benefits & Features ───────────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-5">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">4</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Benefits &amp; Features</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ListEditor
              label="Key Benefits"
              hint="Why is this product a good choice? (Customer-facing)"
              placeholder="e.g. Continuous hot water"
              items={form.benefits}
              onChange={v => handleArrayChange('benefits', v)}
            />
            <ListEditor
              label="Technical Features"
              hint="What does it have? (Specs and capabilities)"
              placeholder="e.g. Digital LCD display"
              items={form.features}
              onChange={v => handleArrayChange('features', v)}
            />
          </div>
        </AdminCard>

        {/* ── Step 5: Requirements (finder tags) ────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">5</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Suitable For</h3>
          </div>
          <RequirementsPicker
            selected={form.requirements}
            onChange={v => handleArrayChange('requirements', v)}
          />
        </AdminCard>

        {/* ── Step 6: Technical Specifications ─────────────────────────── */}
        <AdminCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-5 h-5 rounded-full bg-navy-primary text-white text-[9px] font-bold flex items-center justify-center shrink-0">6</span>
            <h3 className="text-[13px] font-sans font-semibold text-navy-primary">Technical Specifications</h3>
          </div>
          <SpecEditor
            specs={form.specifications}
            onChange={handleSpecsChange}
          />
        </AdminCard>

        {/* ── Advanced Settings (collapsed) ─────────────────────────────── */}
        <div>
          <button
            type="button"
            onClick={() => setShowAdvanced(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-navy-primary/10 hover:bg-navy-primary/[0.02] transition-colors text-left"
          >
            <span className="text-[12px] font-sans font-semibold text-navy-primary/50">
              Advanced Settings
            </span>
            {showAdvanced ? <ChevronUp size={14} className="text-navy-primary/30" /> : <ChevronDown size={14} className="text-navy-primary/30" />}
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-4">
              <AdminCard>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <AdminSelect
                    label="Power Supply Type"
                    value={form.power_type}
                    onChange={e => handleChange('power_type', e.target.value)}
                    options={POWER_OPTIONS}
                  />
                  <AdminInput
                    label="Shower Type Compatibility"
                    value={form.shower_use}
                    onChange={e => handleChange('shower_use', e.target.value)}
                    placeholder="e.g. Basic Rain Shower / Large Rain Shower"
                    hint="Shown in the product detail page."
                  />
                </div>
              </AdminCard>

              <AdminCard>
                <ListEditor
                  label="Where It's Used (Applications)"
                  hint="List locations or property types where this product is installed."
                  placeholder="e.g. Private Villa Master Showers"
                  items={form.applications}
                  onChange={v => handleArrayChange('applications', v)}
                />
              </AdminCard>
            </div>
          )}
        </div>

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
