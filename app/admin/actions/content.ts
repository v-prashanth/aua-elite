'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { Database, Json } from '@/lib/supabase/database.types'

type BrandInsert = Database['public']['Tables']['brands']['Insert']
type BrandUpdate = Database['public']['Tables']['brands']['Update']

async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function createBrand(data: BrandInsert) {
  await requireAuth()
  const admin = createAdminClient()

  const { count } = await admin
    .from('brands')
    .select('*', { count: 'exact', head: true })

  const { error } = await admin.from('brands').insert({
    ...data,
    display_order: (count ?? 0) + 1,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/brands')
  revalidatePath('/')
  revalidatePath('/products')
  return { success: true }
}

export async function updateBrand(id: string, data: BrandUpdate) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('brands').update(data).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/brands')
  revalidatePath('/')
  revalidatePath('/products')
  return { success: true }
}

export async function deleteBrand(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('brands').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/brands')
  revalidatePath('/')
  revalidatePath('/products')
  return { success: true }
}

export async function toggleBrandVisibility(id: string, visible: boolean) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('brands').update({ visible }).eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/brands')
  revalidatePath('/')
  return { success: true }
}

// ─── Gallery actions ──────────────────────────────────────────────────────────

export async function addGalleryImage(data: {
  image: string
  caption?: string
  category?: string
}) {
  await requireAuth()
  const admin = createAdminClient()

  const { count } = await admin
    .from('gallery_images')
    .select('*', { count: 'exact', head: true })

  const { error } = await admin.from('gallery_images').insert({
    ...data,
    display_order: (count ?? 0) + 1,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/customers')
  revalidatePath('/projects')
  return { success: true }
}

export async function updateGalleryImage(
  id: string,
  data: { caption?: string; category?: string; visible?: boolean }
) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('gallery_images')
    .update(data)
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/customers')
  revalidatePath('/projects')
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin.from('gallery_images').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/customers')
  revalidatePath('/projects')
  return { success: true }
}

// ─── Website / Hero actions ───────────────────────────────────────────────────

export async function updateHeroContent(data: {
  heading: string
  subheading?: string
  tagline?: string
  cta_text?: string
  cta_link?: string
}) {
  await requireAuth()
  const admin = createAdminClient()

  const { data: existing } = await admin
    .from('hero_content')
    .select('id')
    .limit(1)
    .single()

  let error
  if (existing) {
    ;({ error } = await admin.from('hero_content').update(data).eq('id', existing.id))
  } else {
    ;({ error } = await admin.from('hero_content').insert({ ...data, heading: data.heading }))
  }

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/website')
  return { success: true }
}

// ─── Settings actions ─────────────────────────────────────────────────────────

export async function updateContactInfo(entries: { key: string; value: string }[]): Promise<{ success: boolean; error?: string }> {
  await requireAuth()
  const admin = createAdminClient()

  try {
    const updates = entries.map(({ key, value }) =>
      admin
        .from('contact_info')
        .upsert({ key, value }, { onConflict: 'key' })
    )

    const results = await Promise.all(updates)
    const errorResult = results.find(r => r.error)
    if (errorResult?.error) {
      return { success: false, error: errorResult.error.message }
    }

    revalidatePath('/admin/settings')
    revalidatePath('/')
    revalidatePath('/contact')
    revalidatePath('/consultation')
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to update contact info'
    return { success: false, error: message }
  }
}

export async function updateSiteSetting(key: string, value: Json) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('site_settings')
    .upsert({ key, value }, { onConflict: 'key' })

  if (error) return { error: error.message }

  revalidatePath('/admin/settings')
  revalidatePath('/')
  return { success: true }
}

// ─── SEO actions ──────────────────────────────────────────────────────────────

export async function updateSeoSettings(
  pagePath: string,
  data: {
    title?: string
    description?: string
    og_image?: string
    keywords?: string[]
    robots?: string
    canonical?: string
  }
) {
  await requireAuth()
  const admin = createAdminClient()

  const { error } = await admin
    .from('seo_settings')
    .upsert({ page_path: pagePath, ...data }, { onConflict: 'page_path' })

  if (error) return { error: error.message }

  revalidatePath('/admin/seo')
  revalidatePath(pagePath)
  return { success: true }
}
