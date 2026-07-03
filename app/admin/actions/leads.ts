'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'inspection_scheduled'
  | 'quotation_sent'
  | 'completed'
  | 'closed'

// ─── Update lead status ───────────────────────────────────────────────────────

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

// ─── Update lead notes ────────────────────────────────────────────────────────

export async function updateLeadNotes(id: string, notes: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('leads')
    .update({ notes })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/leads')
  return { success: true }
}

// ─── Delete lead ──────────────────────────────────────────────────────────────

export async function deleteLead(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('leads').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')
  return { success: true }
}
