import React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-navy-primary text-white hover:bg-navy-dark active:scale-[0.98] shadow-sm',
  secondary:
    'bg-navy-primary/6 text-navy-primary hover:bg-navy-primary/10 active:scale-[0.98]',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:scale-[0.98] shadow-sm',
  ghost:
    'text-navy-primary/50 hover:text-navy-primary hover:bg-navy-primary/5 active:scale-[0.98]',
  outline:
    'border border-navy-primary/15 text-navy-primary hover:border-navy-primary/30 hover:bg-navy-primary/3 active:scale-[0.98]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[11px] rounded-lg gap-1.5',
  md: 'px-4 py-2.5 text-[12px] rounded-xl gap-2',
  lg: 'px-5 py-3 text-[13px] rounded-xl gap-2',
}

export function AdminButton({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: AdminButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-sans font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      ) : (
        iconPosition === 'left' && icon
      )}
      {children}
      {!loading && iconPosition === 'right' && icon}
    </button>
  )
}
