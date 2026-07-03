import React from 'react'
import { cn } from '@/lib/utils'
import { Package } from 'lucide-react'

interface AdminEmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function AdminEmptyState({
  icon,
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 px-6 text-center',
        className
      )}
    >
      <div className="w-14 h-14 rounded-2xl bg-navy-primary/5 flex items-center justify-center mb-4 text-navy-primary/25">
        {icon ?? <Package size={24} strokeWidth={1.5} />}
      </div>
      <h3 className="text-[14px] font-sans font-semibold text-navy-primary mb-1.5">
        {title}
      </h3>
      {description && (
        <p className="text-[12px] font-sans text-navy-primary/40 max-w-xs leading-relaxed mb-5">
          {description}
        </p>
      )}
      {action}
    </div>
  )
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

export function AdminSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-navy-primary/6 rounded-xl', className)} />
  )
}
