'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'
import { deleteStorageFiles } from './storage'

type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

/**
 * Validates that the request is authenticated.
 * Throws an error if no active session is found.
 * Safe for server action verification.
 */
async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

// ─── Create product ───────────────────────────────────────────────────────────

/**
 * Inserts a new product record into the database.
 * Bypasses public RLS write constraints using the Admin service-role client.
 *
 * @param data - The fields required to create a new product.
 */
export async function createProduct(data: ProductInsert) {
  await requireAuth()
  const admin = createAdminClient()

  const { data: product, error } = await admin
    .from('products')
    .insert(data)
    .select('id')
    .single()

  if (error) return { error: error.message }

  // Clear statically cached pages for lists to reflect the new product immediately
  revalidatePath('/admin/products')
  revalidatePath('/products')
  
  // Navigate back to the admin product edit/details view
  redirect(`/admin/products/${product.id}`)
}

// ─── Update product ───────────────────────────────────────────────────────────

/**
 * Updates an existing product record in the database.
 * 
 * @param id - The UUID of the product to update.
 * @param data - The changed product fields.
 */
export async function updateProduct(id: string, data: ProductUpdate) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('products')
    .update(data)
    .eq('id', id)

  if (error) return { error: error.message }

  // Revalidate specific page caches affected by the update
  revalidatePath('/admin/products')
  revalidatePath(`/admin/products/${id}`)
  revalidatePath('/products')
  
  // If the product slug changed, revalidate the old/new detail route cache
  if (data.slug) {
    revalidatePath(`/products/${data.slug}`)
  }
  return { success: true }
}

// ─── Delete product ───────────────────────────────────────────────────────────

/**
 * Deletes a product record from the database.
 * 
 * @param id - The UUID of the product to delete.
 */
export async function deleteProduct(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  // Fetch the product first to get its image URLs
  const { data: product } = await admin
    .from('products')
    .select('image, gallery_images')
    .eq('id', id)
    .single()

  const { error } = await admin.from('products').delete().eq('id', id)

  if (error) return { error: error.message }

  // Clean up uploaded images from Supabase Storage
  if (product) {
    const urls = [product.image, ...(product.gallery_images || [])]
    await deleteStorageFiles('products', urls)
  }

  // Invalidate list caches so the deleted product is removed from display
  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

// ─── Toggle featured ──────────────────────────────────────────────────────────

/**
 * Toggles whether a product is featured on the homepage solutions section.
 * 
 * @param id - The UUID of the product.
 * @param featured - The boolean featured state to set.
 */
export async function toggleProductFeatured(id: string, featured: boolean) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('products')
    .update({ featured })
    .eq('id', id)

  if (error) return { error: error.message }

  // Revalidate lists (the homepage depends on the products list for showcase)
  revalidatePath('/admin/products')
  revalidatePath('/products')
  return { success: true }
}

// ─── Toggle status ────────────────────────────────────────────────────────────

/**
 * Changes a product's market availability status.
 * 
 * @param id - The UUID of the product.
 * @param status - The availability tier ('available' or 'coming-soon').
 */
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
