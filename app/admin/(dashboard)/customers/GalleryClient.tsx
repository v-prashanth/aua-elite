'use client'

import React from 'react'
import { addGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/app/admin/actions/content'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminSelect, AdminToggle } from '@/components/admin/ui/AdminInput'
import { AdminModal, ConfirmDialog } from '@/components/admin/ui/AdminModal'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import type { GalleryImage } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import { Heart, Plus, Pencil, Trash2, Eye, EyeOff, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ImageUploader } from '@/components/admin/ui/ImageUploader'

const CATEGORY_OPTIONS = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'villa', label: 'Villa' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'office', label: 'Office' },
]

interface GalleryClientProps {
  initialImages: GalleryImage[]
}

export function GalleryClient({ initialImages }: GalleryClientProps) {
  const [images, setImages] = React.useState<GalleryImage[]>(initialImages)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editImage, setEditImage] = React.useState<GalleryImage | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)

  const [form, setForm] = React.useState({
    image: '',
    caption: '',
    category: 'residential',
    visible: true,
  })

  function openAdd() {
    setForm({ image: '', caption: '', category: 'residential', visible: true })
    setAddOpen(true)
  }

  function openEdit(img: GalleryImage) {
    setForm({
      image: img.image,
      caption: img.caption ?? '',
      category: img.category ?? 'residential',
      visible: img.visible,
    })
    setEditImage(img)
  }

  async function handleSave() {
    if (!form.image.trim()) {
      toast.error('Image URL or path is required.')
      return
    }
    setSaving(true)

    if (editImage) {
      const result = await updateGalleryImage(editImage.id, {
        caption: form.caption || undefined,
        category: form.category,
        visible: form.visible,
      })
      if (result?.error) {
        toast.error(result.error)
      } else {
        setImages(prev => prev.map(i => i.id === editImage.id ? { ...i, ...form } : i))
        toast.success('Image updated.')
        setEditImage(null)
      }
    } else {
      const result = await addGalleryImage({
        image: form.image,
        caption: form.caption || undefined,
        category: form.category,
      })
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('Image added. Refresh to see it.')
        setAddOpen(false)
      }
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const result = await deleteGalleryImage(deleteId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setImages(prev => prev.filter(i => i.id !== deleteId))
      toast.success('Image deleted.')
    }
    setDeleting(false)
    setDeleteId(null)
  }

  async function handleToggle(img: GalleryImage) {
    const newVisible = !img.visible
    setImages(prev => prev.map(i => i.id === img.id ? { ...i, visible: newVisible } : i))
    const result = await updateGalleryImage(img.id, { visible: newVisible })
    if (result?.error) {
      toast.error(result.error)
      setImages(prev => prev.map(i => i.id === img.id ? { ...i, visible: img.visible } : i))
    }
  }

  return (
    <>
      <div className="space-y-6 max-w-[1100px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
              Installation Gallery ({images.length})
            </h2>
            <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
              Upload photos of your completed installations. These appear in the Happy Customers gallery on the website.
            </p>
          </div>
          <AdminButton onClick={openAdd} icon={<Plus size={14} />}>
            Add Photo
          </AdminButton>
        </div>

        {/* Gallery grid */}
        {images.length === 0 ? (
          <AdminCard>
            <AdminEmptyState
              icon={<Heart size={24} strokeWidth={1.5} />}
              title="No installation photos yet"
              description="Add photos of your completed installations — they'll appear on the website gallery to build trust with new customers."
              action={<AdminButton onClick={openAdd} icon={<Plus size={14} />}>Add First Photo</AdminButton>}
            />
          </AdminCard>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {images.map(img => (
              <div
                key={img.id}
                className={cn(
                  'group relative rounded-xl overflow-hidden bg-navy-primary/5 aspect-square border border-navy-primary/6',
                  !img.visible && 'opacity-50'
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image}
                  alt={img.caption ?? 'Gallery image'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={e => {
                    const parent = (e.target as HTMLImageElement).parentElement
                    if (parent) {
                      (e.target as HTMLImageElement).style.display = 'none'
                      const placeholder = parent.querySelector('.img-placeholder')
                      if (placeholder) (placeholder as HTMLElement).style.display = 'flex'
                    }
                  }}
                />
                <div
                  className="img-placeholder absolute inset-0 hidden items-center justify-center bg-navy-primary/5"
                >
                  <ImageIcon size={24} className="text-navy-primary/20" />
                </div>

                {/* Category badge */}
                {img.category && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[9px] font-bold uppercase tracking-wider bg-white/90 text-navy-primary/60 px-1.5 py-0.5 rounded-full">
                      {img.category}
                    </span>
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 bg-navy-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleToggle(img)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-navy-primary hover:bg-white transition-colors"
                    title={img.visible ? 'Hide from website' : 'Show on website'}
                  >
                    {img.visible ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button
                    onClick={() => openEdit(img)}
                    className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-navy-primary hover:bg-white transition-colors"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteId(img.id)}
                    className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Caption */}
                {img.caption && (
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-navy-primary/70 to-transparent p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] text-white font-sans line-clamp-2">{img.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <AdminModal
        open={addOpen || editImage !== null}
        onClose={() => { setAddOpen(false); setEditImage(null) }}
        title={editImage ? 'Edit Photo Details' : 'Add Installation Photo'}
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => { setAddOpen(false); setEditImage(null) }} disabled={saving}>Cancel</AdminButton>
            <AdminButton loading={saving} onClick={handleSave}>{editImage ? 'Save Changes' : 'Add Image'}</AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <ImageUploader
            bucket="gallery"
            label="Installation Photo"
            value={form.image}
            onChange={url => setForm(f => ({ ...f, image: url }))}
            hint="Upload a photo of the installed system. Clear, well-lit photos work best."
          />
          <AdminInput
            label="Caption (optional)"
            value={form.caption}
            onChange={e => setForm(f => ({ ...f, caption: e.target.value }))}
            placeholder="e.g. Stiebel Eltron heat pump installed at Jubilee Hills villa"
            hint="A short description shown on hover. Helps customers understand what they're looking at."
          />
          <AdminSelect
            label="Property Type"
            value={form.category}
            onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
            options={CATEGORY_OPTIONS}
          />
          <AdminToggle
            label="Visible on Website"
            description="Turn off to temporarily hide this photo without deleting it."
            checked={form.visible}
            onChange={v => setForm(f => ({ ...f, visible: v }))}
          />
        </div>
      </AdminModal>

      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Photo"
        message="This photo will be permanently removed from the gallery and deleted from storage. This cannot be undone."
        confirmLabel="Delete Photo"
        danger
        loading={deleting}
      />
    </>
  )
}
