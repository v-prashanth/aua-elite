import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'

/**
 * Browser-side Supabase client.
 * Uses the public anon key — safe to expose in the browser.
 * Only use this in Client Components ('use client').
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
