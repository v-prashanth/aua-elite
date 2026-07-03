'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

// ─── Verify admin auth ────────────────────────────────────────────────────────

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

// ─── Create FAQ ───────────────────────────────────────────────────────────────

export async function createFaq(data: {
  question: string
  answer: string
  category?: string
}) {
  await requireAuth()
  const admin = createAdminClient()

  const { count } = await admin
    .from('faqs')
    .select('*', { count: 'exact', head: true })

  const { error } = await admin.from('faqs').insert({
    question: data.question.trim(),
    answer: data.answer.trim(),
    category: data.category?.trim() ?? 'General',
    display_order: (count ?? 0) + 1,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  return { success: true }
}

// ─── Update FAQ ───────────────────────────────────────────────────────────────

export async function updateFaq(
  id: string,
  data: { question: string; answer: string; category?: string }
) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('faqs')
    .update({
      question: data.question.trim(),
      answer: data.answer.trim(),
      category: data.category?.trim() ?? 'General',
    })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  return { success: true }
}

// ─── Delete FAQ ───────────────────────────────────────────────────────────────

export async function deleteFaq(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('faqs').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  return { success: true }
}

// ─── Toggle FAQ visibility ────────────────────────────────────────────────────

export async function toggleFaqVisibility(id: string, visible: boolean) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('faqs')
    .update({ visible })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  return { success: true }
}

// ─── Reorder FAQs ─────────────────────────────────────────────────────────────

export async function reorderFaqs(orderedIds: string[]) {
  await requireAuth()
  const admin = createAdminClient()

  const updates = orderedIds.map((id, index) =>
    admin.from('faqs').update({ display_order: index + 1 }).eq('id', id)
  )

  await Promise.all(updates)

  revalidatePath('/admin/faq')
  revalidatePath('/faq')
  return { success: true }
}
