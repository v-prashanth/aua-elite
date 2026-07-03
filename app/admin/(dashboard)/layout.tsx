import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminShell } from '@/components/admin/AdminShell'

export const metadata: Metadata = {
  title: {
    default: 'Admin — Aqua Elite Solutions',
    template: '%s | Admin — Aqua Elite',
  },
  robots: 'noindex, nofollow',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verify authentication server-side (defence in depth beyond middleware)
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <AdminShell userEmail={user.email}>
      {children}
    </AdminShell>
  )
}
