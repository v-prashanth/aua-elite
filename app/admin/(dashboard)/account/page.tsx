'use client'

import React from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard } from '@/components/admin/ui/AdminCard'
import { AdminButton } from '@/components/admin/ui/AdminButton'
import toast from 'react-hot-toast'
import { User, Lock, AlertCircle } from 'lucide-react'

export default function AccountPage() {
  const [loadingPassword, setLoadingPassword] = React.useState(false)
  const [passwordForm, setPasswordForm] = React.useState({
    current: '',
    new: '',
    confirm: '',
  })
  const [error, setError] = React.useState<string | null>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (passwordForm.new.length < 8) {
      setError('New password must be at least 8 characters.')
      return
    }
    if (passwordForm.new !== passwordForm.confirm) {
      setError('New passwords do not match.')
      return
    }

    setLoadingPassword(true)
    const supabase = createClient()

    const { error: authError } = await supabase.auth.updateUser({
      password: passwordForm.new,
    })

    if (authError) {
      setError(authError.message)
    } else {
      toast.success('Password changed successfully.')
      setPasswordForm({ current: '', new: '', confirm: '' })
    }
    setLoadingPassword(false)
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[20px] font-sans font-semibold text-navy-primary">Account</h2>
        <p className="text-[13px] text-navy-primary/40 font-sans mt-0.5">
          Manage your admin account credentials.
        </p>
      </div>

      <div className="max-w-[500px] space-y-6">
        {/* Account info */}
        <AdminCard>
        <div className="flex items-center gap-2 mb-4">
          <User size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Account Info</h3>
        </div>
        <div className="bg-navy-primary/4 rounded-xl px-4 py-3.5">
          <p className="text-[11px] font-sans text-navy-primary/40 uppercase tracking-wider mb-0.5">Admin Role</p>
          <p className="text-[13px] font-sans text-navy-primary">Full Administrator Access</p>
        </div>
        <p className="text-[11px] font-sans text-navy-primary/35 mt-3">
          To change your email address or account permissions, contact your developer.
        </p>
      </AdminCard>

      {/* Change password */}
      <AdminCard>
        <div className="flex items-center gap-2 mb-5">
          <Lock size={15} className="text-navy-primary/40" />
          <h3 className="text-[14px] font-sans font-semibold text-navy-primary">Change Password</h3>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {error && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <AlertCircle size={14} className="text-red-500 mt-0.5 shrink-0" />
              <p className="text-[12px] text-red-600 font-sans">{error}</p>
            </div>
          )}

          {[
            { label: 'New Password', field: 'new', placeholder: '••••••••••' },
            { label: 'Confirm New Password', field: 'confirm', placeholder: '••••••••••' },
          ].map(item => (
            <div key={item.field} className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy-primary/50 font-sans">
                {item.label}
              </label>
              <input
                type="password"
                value={passwordForm[item.field as keyof typeof passwordForm]}
                onChange={e => setPasswordForm(f => ({ ...f, [item.field]: e.target.value }))}
                placeholder={item.placeholder}
                autoComplete="new-password"
                className="w-full px-4 py-2.5 rounded-xl border border-navy-primary/12 bg-[#F8F9FB] text-navy-primary text-[13px] font-sans placeholder:text-navy-primary/25 focus:outline-none focus:border-gold-primary focus:bg-white transition-all"
              />
            </div>
          ))}

          <AdminButton
            type="submit"
            loading={loadingPassword}
            className="w-full justify-center"
          >
            Update Password
          </AdminButton>
        </form>
        </AdminCard>
      </div>
    </div>
  )
}
