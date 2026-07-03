import React from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant =
  | 'new'
  | 'contacted'
  | 'inspection_scheduled'
  | 'quotation_sent'
  | 'completed'
  | 'closed'
  | 'available'
  | 'coming-soon'
  | 'visible'
  | 'hidden'
  | 'featured'
  | 'default'

const badgeStyles: Record<BadgeVariant, string> = {
  new: 'bg-blue-50 text-blue-600 border-blue-100',
  contacted: 'bg-amber-50 text-amber-600 border-amber-100',
  inspection_scheduled: 'bg-purple-50 text-purple-600 border-purple-100',
  quotation_sent: 'bg-cyan-50 text-cyan-600 border-cyan-100',
  completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  closed: 'bg-slate-50 text-slate-500 border-slate-100',
  available: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'coming-soon': 'bg-amber-50 text-amber-600 border-amber-100',
  visible: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  hidden: 'bg-slate-50 text-slate-400 border-slate-100',
  featured: 'bg-gold-muted text-amber-700 border-amber-100',
  default: 'bg-navy-primary/5 text-navy-primary/60 border-navy-primary/10',
}

const badgeLabels: Record<BadgeVariant, string> = {
  new: 'New',
  contacted: 'Contacted',
  inspection_scheduled: 'Inspection Scheduled',
  quotation_sent: 'Quotation Sent',
  completed: 'Completed',
  closed: 'Closed',
  available: 'Available',
  'coming-soon': 'Coming Soon',
  visible: 'Visible',
  hidden: 'Hidden',
  featured: 'Featured',
  default: 'Unknown',
}

interface AdminBadgeProps {
  variant: BadgeVariant | string
  label?: string
  className?: string
}

export function AdminBadge({ variant, label, className }: AdminBadgeProps) {
  const v = (variant as BadgeVariant) in badgeStyles ? (variant as BadgeVariant) : 'default'
  const displayLabel = label ?? badgeLabels[v] ?? variant

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold font-sans border whitespace-nowrap',
        badgeStyles[v],
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      {displayLabel}
    </span>
  )
}
