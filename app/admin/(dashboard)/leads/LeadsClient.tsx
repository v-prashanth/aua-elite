'use client'

import React from 'react'
import { updateLeadStatus, updateLeadNotes, deleteLead, type LeadStatus } from '@/app/admin/actions/leads'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import { AdminTextarea, AdminSelect } from '@/components/admin/ui/AdminInput'
import { AdminModal, ConfirmDialog } from '@/components/admin/ui/AdminModal'
import { AdminBadge } from '@/components/admin/ui/AdminBadge'
import { AdminEmptyState } from '@/components/admin/ui/AdminEmptyState'
import type { Lead } from '@/lib/supabase/database.types'
import toast from 'react-hot-toast'
import {
  Users,
  Search,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Trash2,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'inspection_scheduled', label: 'Inspection Scheduled' },
  { value: 'quotation_sent', label: 'Quotation Sent' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' },
]

const SOURCE_OPTIONS = [
  { value: 'all', label: 'All Sources' },
  { value: 'contact', label: 'Contact Form' },
  { value: 'consultation', label: 'Consultation' },
]

const PAGE_SIZE = 15

function formatDate(str: string): string {
  return new Date(str).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

interface LeadsClientProps {
  initialLeads: Lead[]
}

export function LeadsClient({ initialLeads }: LeadsClientProps) {
  const [leads, setLeads] = React.useState<Lead[]>(initialLeads)
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [sourceFilter, setSourceFilter] = React.useState<string>('all')
  const [page, setPage] = React.useState(1)
  const [selectedLead, setSelectedLead] = React.useState<Lead | null>(null)
  const [deleteId, setDeleteId] = React.useState<string | null>(null)
  const [notes, setNotes] = React.useState('')
  const [savingNotes, setSavingNotes] = React.useState(false)
  const [deleting, setDeleting] = React.useState(false)
  const [updatingStatus, setUpdatingStatus] = React.useState<string | null>(null)

  // Filtered leads
  const filtered = React.useMemo(() => {
    return leads.filter(lead => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        lead.name?.toLowerCase().includes(q) ||
        lead.phone?.toLowerCase().includes(q) ||
        lead.email?.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter
      const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter
      return matchesSearch && matchesStatus && matchesSource
    })
  }, [leads, search, statusFilter, sourceFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  // Reset page when filters change
  React.useEffect(() => { setPage(1) }, [search, statusFilter, sourceFilter])

  async function handleStatusChange(leadId: string, status: LeadStatus) {
    setUpdatingStatus(leadId)
    setLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, status } : l))
    )
    const result = await updateLeadStatus(leadId, status)
    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Status updated.')
    }
    setUpdatingStatus(null)
  }

  async function handleSaveNotes() {
    if (!selectedLead) return
    setSavingNotes(true)
    const result = await updateLeadNotes(selectedLead.id, notes)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setLeads(prev =>
        prev.map(l => (l.id === selectedLead.id ? { ...l, notes } : l))
      )
      toast.success('Notes saved.')
    }
    setSavingNotes(false)
  }

  async function handleDelete() {
    if (!deleteId) return
    setDeleting(true)
    const result = await deleteLead(deleteId)
    if (result?.error) {
      toast.error(result.error)
    } else {
      setLeads(prev => prev.filter(l => l.id !== deleteId))
      setSelectedLead(null)
      toast.success('Lead deleted.')
    }
    setDeleting(false)
    setDeleteId(null)
  }

  function handleExportCSV() {
    const headers = ['Name', 'Phone', 'Email', 'Source', 'Status', 'Property', 'Message', 'Created At']
    const rows = filtered.map(l => [
      l.name,
      l.phone ?? '',
      l.email ?? '',
      l.source,
      l.status,
      l.property_type ?? '',
      (l.message ?? '').replace(/"/g, '""'),
      formatDate(l.created_at),
    ])
    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Exported ${filtered.length} leads.`)
  }

  return (
    <>
      <div className="space-y-5 max-w-[1100px]">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-[20px] font-sans font-semibold text-navy-primary">
              Leads ({leads.length})
            </h2>
            <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
              Every enquiry and consultation request from the website.
            </p>
          </div>
          <AdminButton
            variant="outline"
            onClick={handleExportCSV}
            icon={<Download size={14} />}
          >
            Export CSV
          </AdminButton>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[180px] max-w-[280px]">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-primary/30" />
            <input
              type="search"
              placeholder="Search name, phone, email…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-navy-primary/12 bg-white text-[13px] font-sans text-navy-primary placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-navy-primary/12 bg-white text-[12px] font-sans text-navy-primary focus:outline-none focus:border-gold-primary transition-colors cursor-pointer"
          >
            <option value="all">All Statuses</option>
            {STATUS_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={e => setSourceFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-navy-primary/12 bg-white text-[12px] font-sans text-navy-primary focus:outline-none focus:border-gold-primary transition-colors cursor-pointer"
          >
            {SOURCE_OPTIONS.map(s => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {(search || statusFilter !== 'all' || sourceFilter !== 'all') && (
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setSourceFilter('all') }}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-[12px] font-sans text-navy-primary/50 hover:text-navy-primary hover:bg-navy-primary/5 transition-colors"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Table */}
        <AdminCard padding="none">
          {paginated.length === 0 ? (
            <AdminEmptyState
              icon={<Users size={24} strokeWidth={1.5} />}
              title={filtered.length === 0 && leads.length > 0 ? 'No results match your filters' : 'No leads yet'}
              description={
                leads.length === 0
                  ? 'Leads will appear here when contact forms are submitted on your website.'
                  : 'Try adjusting your search or filter.'
              }
            />
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-navy-primary/8">
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-navy-primary/35 px-5 py-3.5 font-sans">Name</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-navy-primary/35 px-3 py-3.5 font-sans">Contact</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-navy-primary/35 px-3 py-3.5 font-sans">Source</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-navy-primary/35 px-3 py-3.5 font-sans">Status</th>
                      <th className="text-left text-[10px] font-bold uppercase tracking-wider text-navy-primary/35 px-3 py-3.5 font-sans">Date</th>
                      <th className="px-3 py-3.5" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy-primary/6">
                    {paginated.map(lead => (
                      <tr
                        key={lead.id}
                        className="hover:bg-navy-primary/[0.015] cursor-pointer transition-colors"
                        onClick={() => { setSelectedLead(lead); setNotes(lead.notes ?? '') }}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-navy-primary/8 flex items-center justify-center shrink-0">
                              <span className="text-[11px] font-bold text-navy-primary/50">
                                {lead.name?.charAt(0)?.toUpperCase() ?? '?'}
                              </span>
                            </div>
                            <div>
                              <p className="text-[13px] font-sans font-semibold text-navy-primary">{lead.name}</p>
                              {lead.property_type && (
                                <p className="text-[10px] text-navy-primary/35 font-sans capitalize">{lead.property_type}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <div className="space-y-0.5">
                            {lead.phone && (
                              <p className="text-[12px] font-sans text-navy-primary/60">{lead.phone}</p>
                            )}
                            {lead.email && (
                              <p className="text-[11px] font-sans text-navy-primary/35 truncate max-w-[160px]">{lead.email}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-3.5">
                          <span className="text-[11px] font-sans text-navy-primary/50 capitalize">
                            {lead.source}
                          </span>
                        </td>
                        <td className="px-3 py-3.5" onClick={e => e.stopPropagation()}>
                          <select
                            value={lead.status}
                            onChange={e => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                            disabled={updatingStatus === lead.id}
                            className="text-[11px] font-sans bg-transparent border-0 text-navy-primary/70 focus:outline-none cursor-pointer pr-1"
                          >
                            {STATUS_OPTIONS.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-3 py-3.5">
                          <p className="text-[11px] font-sans text-navy-primary/35 whitespace-nowrap">
                            {new Date(lead.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        </td>
                        <td className="px-3 py-3.5">
                          <button
                            onClick={e => { e.stopPropagation(); setDeleteId(lead.id) }}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-navy-primary/20 hover:text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-navy-primary/6">
                {paginated.map(lead => (
                  <div
                    key={lead.id}
                    className="p-4 hover:bg-navy-primary/[0.015] cursor-pointer"
                    onClick={() => { setSelectedLead(lead); setNotes(lead.notes ?? '') }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <p className="text-[13px] font-sans font-semibold text-navy-primary">{lead.name}</p>
                      <AdminBadge variant={lead.status} />
                    </div>
                    <div className="flex flex-wrap gap-3 text-[11px] font-sans text-navy-primary/45">
                      {lead.phone && <span className="flex items-center gap-1"><Phone size={10} />{lead.phone}</span>}
                      {lead.email && <span className="flex items-center gap-1"><Mail size={10} />{lead.email}</span>}
                      <span className="capitalize">{lead.source}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-navy-primary/8">
                  <p className="text-[11px] font-sans text-navy-primary/40">
                    {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-navy-primary/12 text-navy-primary/50 hover:text-navy-primary disabled:opacity-30 transition-colors"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <span className="text-[12px] font-sans text-navy-primary/60">
                      {page} / {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-lg border border-navy-primary/12 text-navy-primary/50 hover:text-navy-primary disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </AdminCard>
      </div>

      {/* Lead detail modal */}
      <AdminModal
        open={selectedLead !== null}
        onClose={() => setSelectedLead(null)}
        title={selectedLead?.name ?? 'Lead Details'}
        size="lg"
        footer={
          <>
            <AdminButton
              variant="danger"
              size="sm"
              onClick={() => setDeleteId(selectedLead!.id)}
              icon={<Trash2 size={13} />}
            >
              Delete
            </AdminButton>
            <AdminButton
              variant="ghost"
              onClick={() => setSelectedLead(null)}
            >
              Close
            </AdminButton>
            <AdminButton
              loading={savingNotes}
              onClick={handleSaveNotes}
            >
              Save Notes
            </AdminButton>
          </>
        }
      >
        {selectedLead && (
          <div className="space-y-5">
            {/* Contact info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                {[
                  { label: 'Phone', value: selectedLead.phone, icon: <Phone size={13} /> },
                  { label: 'Email', value: selectedLead.email, icon: <Mail size={13} /> },
                  { label: 'Source', value: selectedLead.source, icon: <MessageSquare size={13} /> },
                  { label: 'Property Type', value: selectedLead.property_type },
                  { label: 'Bathrooms', value: selectedLead.bathrooms },
                  { label: 'Interested In', value: selectedLead.interested_product },
                  { label: 'Date', value: formatDate(selectedLead.created_at) },
                ].map(item => item.value ? (
                  <div key={item.label}>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-navy-primary/35 font-sans mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[13px] font-sans text-navy-primary capitalize">
                      {item.value}
                    </p>
                  </div>
                ) : null)}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-navy-primary/35 font-sans mb-2">
                  Status
                </p>
                <AdminSelect
                  options={STATUS_OPTIONS}
                  value={selectedLead.status}
                  onChange={async e => {
                    const newStatus = e.target.value as LeadStatus
                    setSelectedLead(prev => prev ? { ...prev, status: newStatus } : prev)
                    await handleStatusChange(selectedLead.id, newStatus)
                  }}
                />
              </div>
            </div>

            {/* Message */}
            {selectedLead.message && (
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-navy-primary/35 font-sans mb-2">
                  Message
                </p>
                <div className="bg-navy-primary/3 rounded-xl px-4 py-3.5">
                  <p className="text-[13px] font-sans text-navy-primary/70 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              </div>
            )}

            {/* Notes */}
            <AdminTextarea
              label="Internal Notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Add internal notes about this lead…"
              hint="Only visible to admins. Not sent to the customer."
              rows={4}
            />
          </div>
        )}
      </AdminModal>

      {/* Delete confirm */}
      <ConfirmDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Lead"
        message="This lead will be permanently deleted. This action cannot be undone."
        confirmLabel="Delete Lead"
        danger
        loading={deleting}
      />
    </>
  )
}
