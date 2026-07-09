'use client'

import React from 'react'
import { Reorder } from 'framer-motion'
import { createFaq, updateFaq, deleteFaq, toggleFaqVisibility, reorderFaqs } from '@/app/admin/actions/faq'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminInput, AdminTextarea, AdminSelect } from '@/components/admin/ui/AdminInput'
import { AdminModal, ConfirmDialog } from '@/components/admin/ui/AdminModal'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import { MessageSquare, Plus, Pencil, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react'
import type { FAQ } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'

const CATEGORIES = [
  { value: 'General', label: 'General' },
  { value: 'About Us', label: 'About Us' },
  { value: 'Products', label: 'Products' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Water Hardness', label: 'Water Hardness' },
  { value: 'Maintenance', label: 'Maintenance' },
  { value: 'Brands', label: 'Brands' },
  { value: 'Support', label: 'Support' },
]

interface FAQClientProps {
  initialFaqs: FAQ[]
}

export function FAQClient({ initialFaqs }: FAQClientProps) {
  const [faqs, setFaqs] = React.useState<FAQ[]>(initialFaqs)
  const [addOpen, setAddOpen] = React.useState(false)
  const [editFaq, setEditFaq] = React.useState<FAQ | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [saving, setSaving] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [reordering, setReordering] = React.useState(false)

  // Form state
  const [formData, setFormData] = React.useState({
    question: '',
    answer: '',
    category: 'General',
  })

  function openAdd() {
    setFormData({ question: '', answer: '', category: 'General' })
    setAddOpen(true)
  }

  function openEdit(faq: FAQ) {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category ?? 'General',
    })
    setEditFaq(faq)
  }

  async function handleSave() {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error('Question and answer are required.')
      return
    }
    setSaving(true)

    if (editFaq) {
      const result = await updateFaq(editFaq.id, formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        setFaqs(prev =>
          prev.map(f =>
            f.id === editFaq.id ? { ...f, ...formData } : f
          )
        )
        toast.success('FAQ updated.')
        setEditFaq(null)
      }
    } else {
      const result = await createFaq(formData)
      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success('FAQ added. Refresh to see it.')
        setAddOpen(false)
        // Optimistically add (without real ID — page will rehydrate)
      }
    }
    setSaving(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const result = await deleteFaq(deleteId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setFaqs(prev => prev.filter(f => f.id !== deleteId))
      toast.success('FAQ deleted.')
    }
    setDeleting(false)
    setDeleteId(null)
  }

  async function handleToggleVisibility(faq: FAQ) {
    const newVisible = !faq.visible
    setFaqs(prev =>
      prev.map(f => (f.id === faq.id ? { ...f, visible: newVisible } : f))
    )
    const result = await toggleFaqVisibility(faq.id, newVisible)
    if (result?.error) {
      toast.error(result.error)
      // Rollback
      setFaqs(prev =>
        prev.map(f => (f.id === faq.id ? { ...f, visible: faq.visible } : f))
      )
    }
  }

  async function handleReorder(newOrder: FAQ[]) {
    setFaqs(newOrder)
    setReordering(true)
    await reorderFaqs(newOrder.map(f => f.id))
    setReordering(false)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
              FAQ ({faqs.length})
            </h2>
            <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
              Changes reflect on the website immediately. Use the handle (⠿) to drag and reorder questions.
              {reordering && (
                <span className="ml-2 text-gold-primary font-semibold">Saving new order…</span>
              )}
            </p>
          </div>
          <AdminButton
            onClick={openAdd}
            icon={<Plus size={14} />}
            iconPosition="left"
          >
            Add FAQ
          </AdminButton>
        </div>

        {/* FAQ list */}
        <AdminCard padding="none">
          {faqs.length === 0 ? (
            <AdminEmptyState
              icon={<MessageSquare size={24} strokeWidth={1.5} />}
              title="No FAQs yet"
              description="Add your first FAQ to get started. They'll appear on the website immediately."
              action={
                <AdminButton onClick={openAdd} icon={<Plus size={14} />}>
                  Add FAQ
                </AdminButton>
              }
            />
          ) : (
            <Reorder.Group
              axis="y"
              values={faqs}
              onReorder={handleReorder}
              className="divide-y divide-navy-primary/6"
            >
              {faqs.map((faq, index) => (
                <Reorder.Item
                  key={faq.id}
                  value={faq}
                  className="group"
                >
                  <div className="flex items-start gap-3 px-5 py-4 hover:bg-navy-primary/[0.015] transition-colors">
                    {/* Drag handle */}
                    <button
                      className="mt-0.5 text-navy-primary/20 hover:text-navy-primary/50 cursor-grab active:cursor-grabbing shrink-0"
                      title="Drag to reorder"
                    >
                      <GripVertical size={16} />
                    </button>

                    {/* Number */}
                    <span className="text-[11px] font-bold text-navy-primary/20 w-5 shrink-0 mt-0.5">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <p
                          className="text-[13px] font-sans font-semibold text-navy-primary leading-relaxed"
                          style={{ opacity: faq.visible ? 1 : 0.4 }}
                        >
                          {faq.question}
                        </p>
                        {faq.category && (
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-navy-primary/6 text-navy-primary/40 px-2 py-0.5 rounded-full font-sans shrink-0">
                            {faq.category}
                          </span>
                        )}
                      </div>
                      <p
                        className="text-[12px] font-sans text-navy-primary/45 mt-1 leading-relaxed line-clamp-2"
                        style={{ opacity: faq.visible ? 1 : 0.4 }}
                      >
                        {faq.answer}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <AdminBadge variant={faq.visible ? 'visible' : 'hidden'} />
                      <button
                        onClick={() => handleToggleVisibility(faq)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
                        title={faq.visible ? 'Hide from website' : 'Show on website'}
                      >
                        {faq.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => openEdit(faq)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteId(faq.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-primary/30 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </AdminCard>
      </div>

      {/* Add / Edit Modal */}
      <AdminModal
        open={addOpen || editFaq !== null}
        onClose={() => {
          setAddOpen(false)
          setEditFaq(null)
        }}
        title={editFaq ? 'Edit FAQ' : 'Add FAQ'}
        description="Changes reflect immediately on the public website."
        footer={
          <>
            <AdminButton
              variant="ghost"
              onClick={() => { setAddOpen(false); setEditFaq(null) }}
              disabled={saving}
            >
              Cancel
            </AdminButton>
            <AdminButton
              loading={saving}
              onClick={handleSave}
            >
              {editFaq ? 'Save Changes' : 'Add FAQ'}
            </AdminButton>
          </>
        }
      >
        <div className="space-y-4">
          <AdminInput
            label="Question"
            value={formData.question}
            onChange={e => setFormData(d => ({ ...d, question: e.target.value }))}
            placeholder="What does Aqua Elite Solutions do?"
            required
          />
          <AdminTextarea
            label="Answer"
            value={formData.answer}
            onChange={e => setFormData(d => ({ ...d, answer: e.target.value }))}
            placeholder="We assess your property's plumbing…"
            required
            rows={5}
          />
          <AdminSelect
            label="Category"
            value={formData.category}
            onChange={e => setFormData(d => ({ ...d, category: e.target.value }))}
            options={CATEGORIES}
          />
        </div>
      </AdminModal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete FAQ"
        message="This FAQ will be permanently deleted and removed from the website immediately. This action cannot be undone."
        confirmLabel="Delete FAQ"
        danger
        loading={deleting}
      />
    </>
  )
}
