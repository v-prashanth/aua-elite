'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

/**
 * Handles administrator authentication by verifying credentials in Supabase.
 * Binds to the standard email/password login form submission.
 * 
 * @param formData - The form data containing 'email' and 'password' fields.
 * @returns An error object if validation or authentication fails, otherwise redirects.
 */
export async function login(formData: FormData) {
  // Initialize the server-side Supabase client with request/cookie context
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Simple runtime validation checks
  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  // Attempt login using Supabase Auth
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })

  if (error) {
    return { error: 'Invalid email or password. Please try again.' }
  }

  // Revalidate the entire admin layout path to refresh authenticated session states
  revalidatePath('/admin', 'layout')
  
  // Redirect the administrator to the dashboard page
  redirect('/admin/dashboard')
}

/**
 * Signs out the current administrator and revokes their active session.
 */
export async function logout() {
  const supabase = await createClient()
  
  // Terminate user session in Supabase Auth
  await supabase.auth.signOut()
  
  // Revalidate cache to clear admin-only states
  revalidatePath('/admin', 'layout')
  
  // Send the user back to the login page
  redirect('/admin/login')
}
