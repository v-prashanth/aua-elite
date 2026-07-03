import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

/**
 * Admin Supabase client using the service_role key.
 * This bypasses Row Level Security — use ONLY in Server Actions.
 * NEVER import this in Client Components or expose it to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) {
    throw new Error(
      '[supabase/admin] NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'Add these to your .env.local file.'
    )
  }

  return createClient<Database>(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
