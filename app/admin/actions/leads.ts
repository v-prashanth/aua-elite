'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

/**
 * Validates that the request is authenticated.
 * Throws an error if no active session is found.
 */
async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

/**
 * The possible progression states of a sales lead.
 */
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'inspection_scheduled'
  | 'quotation_sent'
  | 'completed'
  | 'closed'

// ─── Update lead status ───────────────────────────────────────────────────────

/**
 * Updates the progression status of a user lead/enquiry.
 * 
 * @param id - The UUID of the lead.
 * @param status - The new status to apply.
 */
export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('leads')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  // Revalidate admin pages that show active/new leads counts
  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')
  return { success: true }
}

// ─── Update lead notes ────────────────────────────────────────────────────────

/**
 * Appends or edits internal admin notes associated with a lead.
 * 
 * @param id - The UUID of the lead.
 * @param notes - The text notes.
 */
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

/**
 * Deletes a lead record from the database.
 * 
 * @param id - The UUID of the lead to delete.
 */
export async function deleteLead(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('leads').delete().eq('id', id)

  if (error) return { error: error.message }

  // Revalidate admin dashboards to sync deleted lead counters
  revalidatePath('/admin/leads')
  revalidatePath('/admin/dashboard')
  return { success: true }
}
