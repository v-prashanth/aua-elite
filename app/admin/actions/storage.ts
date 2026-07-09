'use server'

import { createAdminClient } from '@/lib/supabase/admin'

/**
 * Extracts the file path/name from a Supabase public storage URL.
 * 
 * Example URL:
 * https://[project].supabase.co/storage/v1/object/public/products/1689384920439-image.png
 * 
 * Extracts: 1689384920439-image.png
 */
function extractStoragePath(url: string, bucket: string): string | null {
  if (!url) return null
  try {
    const searchString = `/storage/v1/object/public/${bucket}/`
    const index = url.indexOf(searchString)
    if (index !== -1) {
      return decodeURIComponent(url.substring(index + searchString.length))
    }
    
    // Fallback if URL layout is slightly different
    const fallbackSearch = `/${bucket}/`
    const fbIndex = url.indexOf(fallbackSearch)
    if (fbIndex !== -1) {
      return decodeURIComponent(url.substring(fbIndex + fallbackSearch.length))
    }

    // Fallback to last URL path segment
    const parts = url.split('/')
    if (parts.length > 0) {
      return decodeURIComponent(parts[parts.length - 1])
    }
    return null
  } catch (error) {
    console.error(`[extractStoragePath] Failed to extract path for url: ${url}`, error)
    return null
  }
}

/**
 * Deletes files from a specified Supabase Storage bucket by their public URLs.
 */
export async function deleteStorageFiles(bucket: string, urls: (string | null)[]) {
  const admin = createAdminClient()
  const paths = urls
    .map(url => {
      if (!url) return null
      return extractStoragePath(url, bucket)
    })
    .filter((path): path is string => !!path)

  if (paths.length === 0) return

  try {
    const { error } = await admin.storage.from(bucket).remove(paths)
    if (error) {
      console.error(`[deleteStorageFiles] Failed to delete files from storage bucket "${bucket}":`, error.message)
    }
  } catch (err) {
    console.error(`[deleteStorageFiles] Error deleting files from storage bucket "${bucket}":`, err)
  }
}
