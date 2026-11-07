import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type')
  const next = searchParams.get('next') ?? '/dashboard'

  // If Supabase sends a code (PKCE flow), try exchanging it
  const code = searchParams.get('code')
  
  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // If Supabase sends a token_hash (Standard Magic Link flow, safe for cross-device)
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    } else {
      console.error('Supabase verifyOtp error:', error)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Invalid_or_expired_link`)
}
