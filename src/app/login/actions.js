'use server'

import { createClient } from '@/utils/supabase/server'

export async function verifyOtpAction(email, token) {
  const supabase = await createClient()

  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email',
  })

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
