import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookieOptions: {
        maxAge: 60 * 60 * 24 * 365, // 1 year
      },
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            const explicitOptions = { 
              ...options, 
              maxAge: 31536000, 
              expires: new Date(Date.now() + 31536000 * 1000) 
            };
            supabaseResponse.cookies.set(name, value, explicitOptions)
          })
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Require authentication for protected routes
  if (
   !user &&
   !request.nextUrl.pathname.startsWith('/login') &&
   !request.nextUrl.pathname.startsWith('/trial') &&
   !request.nextUrl.pathname.startsWith('/auth') &&
   !request.nextUrl.pathname.startsWith('/api') &&
   request.nextUrl.pathname !== '/manifest.json' &&
   request.nextUrl.pathname !== '/sw.js' &&
   request.nextUrl.pathname !== '/'
  ) {
   // Redirect unauthenticated users to the login page
   const url = request.nextUrl.clone()
   url.pathname = '/login'
   return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from public pages to their dashboard
  if (
    user &&
    (request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/trial')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, manifest.json, sw.js
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest\\.json|sw\\.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
  ],
}
