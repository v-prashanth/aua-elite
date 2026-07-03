'use client'

import React from 'react'
import { createBrand, updateBrand, deleteBrand, toggleBrandVisibility } from '@/app/admin/actions/content'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminTextarea, AdminToggle } from '@/components/admin/ui/AdminInput'
import { AdminModal, ConfirmDialog } from '@/components/admin/ui/AdminModal'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import type { Brand } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { Award, Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'

interface BrandsClientProps {
  initialBrands: Brand[]
}

export function BrandsClient({ initialBrands }: BrandsClientProps) {
  const [brands, setBrands] = React.useState<Brand[]>(initialBrands)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editBrand, setEditBrand] = React.useState<Brand | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const [form, setForm] = React.useState({
    name: '',
    description: '',
    origin: '',
    note: '',
    logo: '',
    website: '',
    visible: true,
  })

  function openAdd() {
    setForm({ name: '', description: '', origin: '', note: '', logo: '', website: '', visible: true })
    setAddOpen(true)
  }

  function openEdit(brand: Brand) {
    setForm({
      name: brand.name,
      description: brand.description ?? '',
      origin: brand.origin ?? '',
      note: brand.note ?? '',
      logo: brand.logo ?? '',
      website: brand.website ?? '',
      visible: brand.visible,
    })
    setEditBrand(brand)
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast.error('Brand name is required.')
      return
    }
    setSaving(true)

    if (editBrand) {
      const result = await updateBrand(editBrand.id, form)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setBrands(prev => prev.map(b => b.id === editBrand.id ? { ...b, ...form } : b))
        toast.success('Brand updated.')
        setEditBrand(null)
      }
    } else {
      const result = await createBrand(form)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Brand added. Refresh to see it.')
        setAddOpen(false)
      }
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const result = await deleteBrand(deleteId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setBrands(prev => prev.filter(b => b.id !== deleteId))
      toast.success('Brand deleted.')
    }
    setDeleting(false)
    setDeleteId(null)
  }

  async function handleToggle(brand: Brand) {
    const newVisible = !brand.visible
    setBrands(prev => prev.map(b => b.id === brand.id ? { ...b, visible: newVisible } : b))
    const result = await toggleBrandVisibility(brand.id, newVisible)
    if (result?.error) {
      toast.error(result.error)
      setBrands(prev => prev.map(b => b.id === brand.id ? { ...b, visible: brand.visible } : b))
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
              Brands ({brands.length})
            </h2>
            <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
              Brands shown on the homepage and products page.
            </p>
          </div>
          <AdminButton onClick={openAdd} icon={<Plus size={14} />}>
            Add Brand
          </AdminButton>
        </div>

        <AdminCard padding="none">
          {brands.length === 0 ? (
            <AdminEmptyState
              icon={<Award size={24} strokeWidth={1.5} />}
              title="No brands yet"
              description="Add brands to display on the homepage and products page."
              action={<AdminButton onClick={openAdd} icon={<Plus size={14} />}>Add Brand</AdminButton>}
            />
          ) : (
            <div className="divide-y divide-navy-primary/6">
              {brands.map(brand => (
                <div key={brand.id} className="flex items-center gap-4 px-5 py-4 hover:bg-navy-primary/[0.015] group">
                  <div className="w-10 h-10 rounded-xl bg-navy-primary/6 flex items-center justify-center shrink-0">
                    <Award size={16} className="text-navy-primary/30" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-sans font-semibold text-navy-primary" style={{ opacity: brand.visible ? 1 : 0.5 }}>
                        {brand.name}
                      </p>
                      <AdminBadge variant={brand.visible ? 'visible' : 'hidden'} />
                    </div>
                    {brand.origin && (
                      <p className="text-[11px] font-sans text-navy-primary/40 uppercase tracking-wider mt-0.5">
                        {brand.origin}
                      </p>
                    )}
                    {brand.note && (
                      <p className="text-[11px] font-sans text-navy-primary/35 mt-0.5 line-clamp-1">
                        {brand.note}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleToggle(brand)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
                    >
                      {brand.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => openEdit(brand)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteId(brand.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AdminCard>
      </div>

      <AdminModal
        open={addOpen || editBrand !== null}
        onClose={() => { setAddOpen(false); setEditBrand(null) }}
        title={editBrand ? 'Edit Brand' : 'Add Brand'}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => { setAddOpen(false); setEditBrand(null) }} disabled={saving}>Cancel</AdminButton>
            <AdminButton loading={saving} onClick={handleSave}>{editBrand ? 'Save Changes' : 'Add Brand'}</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput label="Brand Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Stiebel Eltron" required />
          <ImageUploader bucket="brands" label="Brand Logo" value={form.logo} onChange={url => setForm(f => ({ ...f, logo: url }))} hint="Upload brand logo. Clear background or transparent logo preferred." />
          <AdminInput label="Origin" value={form.origin} onChange={e => setForm(f => ({ ...f, origin: e.target.value }))} placeholder="Germany · Est. 1924" />
          <AdminInput label="Website URL" value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="https://www.stiebel-eltron.com" />
          <AdminTextarea label="Short Note" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} placeholder="Global leader in tankless heating and air-source heat pumps." rows={2} />
          <AdminTextarea label="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Longer brand description…" rows={3} />
          <AdminToggle label="Visible on Website" description="Show this brand on the homepage and products page." checked={form.visible} onChange={v => setForm(f => ({ ...f, visible: v }))} />
        </div>
      </AdminModal>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Brand"
        message="This brand will be permanently deleted. Any products associated will lose their brand reference."
        confirmLabel="Delete Brand"
        danger
        loading={deleting}
      />
    </>
  )
}

