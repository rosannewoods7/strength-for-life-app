import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-04-10',
});

export async function POST(req) {
  try {
    const cookieStore = await cookies();
    
    // Create a Supabase client to fetch the user
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('Unauthorized portal request');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    const customerId = user.user_metadata?.stripe_customer_id;

    if (!customerId) {
      // If the user doesn't have a Stripe Customer ID, we can't create a portal session.
      // Send them back to the next-steps page with an error parameter.
      console.warn(`No stripe_customer_id found for user ${user.id}`);
      return NextResponse.redirect(new URL('/next-steps?error=no_subscription', req.url));
    }

    // Create the billing portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: new URL('/next-steps', req.url).toString(),
    });

    // Redirect to the Stripe Portal
    return NextResponse.redirect(portalSession.url, 303);
    
  } catch (error) {
    console.error('Error creating portal session:', error);
    return NextResponse.redirect(new URL('/next-steps?error=portal_error', req.url));
  }
}
