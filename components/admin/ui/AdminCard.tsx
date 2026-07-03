import React from 'react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface AdminCardProps {
  children: React.ReactNode
  className?: string
  padding?: 'sm' | 'md' | 'lg' | 'none'
}

export function AdminCard({ children, className, padding = 'md' }: AdminCardProps) {
  const paddingClass = {
    none: '',
    sm: 'p-4',
    md: 'p-5 lg:p-6',
    lg: 'p-6 lg:p-8',
  }[padding]

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-navy-primary/6 shadow-[0_2px_16px_-2px_rgba(11,35,65,0.06)]',
        paddingClass,
        className
      )}
    >
      {children}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  href?: string
  color?: 'blue' | 'gold' | 'green' | 'red' | 'purple'
}

const colorMap = {
  blue: 'bg-blue-50 text-blue-600',
  gold: 'bg-amber-50 text-amber-600',
  green: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-500',
  purple: 'bg-purple-50 text-purple-600',
}

export function StatCard({ label, value, icon, trend, trendUp, href, color = 'blue' }: StatCardProps) {
  const content = (
    <div className="bg-white rounded-2xl border border-navy-primary/6 shadow-[0_2px_16px_-2px_rgba(11,35,65,0.06)] p-5 hover:shadow-[0_4px_24px_-4px_rgba(11,35,65,0.1)] transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', colorMap[color])}>
          {icon}
        </div>
        {trend && (
          <span
            className={cn(
              'text-[10px] font-semibold px-2 py-1 rounded-full',
              trendUp
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-red-50 text-red-500'
            )}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-[28px] font-sans font-semibold text-navy-primary leading-none mb-1.5">
        {value}
      </p>
      <p className="text-[12px] font-sans text-navy-primary/45 font-medium">{label}</p>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
