import React from 'react'
import { cn } from '@/lib/utils'

// ─── Input ────────────────────────────────────────────────────────────────────

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: React.ReactNode
}

export function AdminInput({
  label,
  error,
  hint,
  icon,
  className,
  id,
  ...props
}: AdminInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans"
        >
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-primary/30">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl border bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:bg-white transition-all duration-200',
            error
              ? 'border-red-300 focus:border-red-400'
              : 'border-navy-primary/12 focus:border-gold-primary',
            icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-[11px] text-red-500 font-sans">{error}</p>}
      {hint && !error && <p className="text-[11px] text-navy-primary/35 font-sans">{hint}</p>}
    </div>
  )
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

interface AdminTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export function AdminTextarea({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: AdminTextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans"
        >
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-xl border bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:bg-white transition-all duration-200 resize-y min-h-[100px]',
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-navy-primary/12 focus:border-gold-primary',
          className
        )}
        {...props}
      />
      {error && <p className="text-[11px] text-red-500 font-sans">{error}</p>}
      {hint && !error && <p className="text-[11px] text-navy-primary/35 font-sans">{hint}</p>}
    </div>
  )
}

// ─── Select ───────────────────────────────────────────────────────────────────

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export function AdminSelect({
  label,
  error,
  hint,
  options,
  placeholder,
  className,
  id,
  ...props
}: AdminSelectProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans"
        >
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        id={inputId}
        className={cn(
          'w-full px-4 py-2.5 rounded-xl border bg-[#F8F9FB] text-navy-primary text-[13px] font-sans focus:outline-none focus:bg-white transition-all duration-200 appearance-none cursor-pointer',
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-navy-primary/12 focus:border-gold-primary',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-red-500 font-sans">{error}</p>}
      {hint && !error && <p className="text-[11px] text-navy-primary/35 font-sans">{hint}</p>}
    </div>
  )
}

// ─── Toggle ───────────────────────────────────────────────────────────────────

interface AdminToggleProps {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
  id?: string
}

export function AdminToggle({ label, description, checked, onChange, id }: AdminToggleProps) {
  const toggleId = id ?? label.toLowerCase().replace(/\s+/g, '-')

  return (
    <div
      className="flex items-start gap-3 py-1 cursor-pointer select-none"
      onClick={() => onChange(!checked)}
    >
      <button
        id={toggleId}
        role="switch"
        aria-checked={checked}
        type="button"
        className={cn(
          'relative w-9 h-5 rounded-full transition-all duration-200 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-primary mt-0.5 border',
          checked
            ? 'bg-navy-primary border-navy-primary'
            : 'bg-navy-primary/[0.04] border-navy-primary/18'
        )}
      >
        <span
          className={cn(
            'absolute top-[1.5px] left-[1.5px] w-3.5 h-3.5 rounded-full bg-white shadow-[0_1.5px_3px_rgba(11,35,65,0.25)] transition-transform duration-200',
            checked ? 'translate-x-4' : 'translate-x-0'
          )}
        />
      </button>
      <div className="space-y-0.5">
        <p className="text-[12px] font-sans font-medium text-navy-primary leading-tight">
          {label}
        </p>
        {description && (
          <p className="text-[10px] font-sans text-navy-primary/40 leading-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
