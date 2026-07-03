'use client'

import React from 'react'
import { login } from '@/app/admin/actions/auth'
import { Droplets, Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const result = await login(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4 relative">
      {/* Background subtle grid */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #0B2341 1px, transparent 1px), linear-gradient(to bottom, #0B2341 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-[350px]">
        {/* Brand Logo & Header (Floating above card, very neat) */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-navy-primary text-gold-primary mb-3 shadow-[0_4px_12px_rgba(11,35,65,0.15)]">
            <Droplets className="w-5 h-5" strokeWidth={2} />
          </div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-navy-primary/40 font-bold font-sans">
            Aqua Elite Solutions
          </p>
          <h1 className="text-navy-primary font-display text-[1.25rem] font-medium tracking-tight mt-1">
            Admin Portal
          </h1>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-navy-primary/6 shadow-[0_8px_32px_-4px_rgba(11,35,65,0.06)] p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3">
                <AlertCircle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                <p className="text-[11px] text-red-600 font-sans leading-relaxed">{error}</p>
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2.5 rounded-xl border border-navy-primary/10 bg-[#F8F9FB] text-navy-primary text-[12px] font-sans placeholder:text-navy-primary/20 focus:outline-none focus:border-gold-primary focus:bg-white transition-all duration-150"
                placeholder="name@aquaelite.in"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-[10px] font-semibold uppercase tracking-wider text-navy-primary/45 font-sans"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2.5 pr-9 rounded-xl border border-navy-primary/10 bg-[#F8F9FB] text-navy-primary text-[12px] font-sans placeholder:text-navy-primary/20 focus:outline-none focus:border-gold-primary focus:bg-white transition-all duration-150"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-primary/30 hover:text-navy-primary/60 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-primary hover:bg-navy-dark text-white font-sans font-semibold text-[12px] py-2.5 rounded-xl transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2 shadow-[0_2px_8px_rgba(11,35,65,0.1)] active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1.5">
                  <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating…
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>

        {/* Watermark */}
        <p className="text-center text-[9px] text-navy-primary/20 font-sans mt-8 uppercase tracking-widest">
          Restricted Space · Secure Auth Configured
        </p>
      </div>
    </div>
  )
}
