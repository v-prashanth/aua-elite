'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'

type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

// ─── Create product ───────────────────────────────────────────────────────────

export async function createProduct(data: ProductInsert) {
  await requireAuth()
  const admin = createAdminClient()

  const { data: product, error } = await admin
    .from('products')
    .insert(data)
    .select('id')
    .single()

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  redirect(`/admin/products/${product.id}`)
}

// ─── Update product ───────────────────────────────────────────────────────────

export async function updateProduct(id: string, data: ProductUpdate) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('products')
    .update(data)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  revalidatePath('/products')
  if (data.slug) {
    revalidatePath(`/products/${data.slug}`)
  }
  return { success: true }
}

// ─── Delete product ───────────────────────────────────────────────────────────

export async function deleteProduct(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('products').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

// ─── Toggle featured ──────────────────────────────────────────────────────────

export async function toggleProductFeatured(id: string, featured: boolean) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('products')
    .update({ featured })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

// ─── Toggle status ────────────────────────────────────────────────────────────

export async function updateProductStatus(
  id: string,
  status: 'available' | 'coming-soon'
) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('products')
    .update({ status })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}
