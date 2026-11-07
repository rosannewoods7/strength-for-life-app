import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2023-10-16',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
);

const PROGRAM_PRICE_ID = (
  process.env.NEXT_PUBLIC_STRIPE_PROGRAM_PRICE_ID || 'price_1UWkgQEPjK96BF6Bpl81gfsp'
).trim();

export async function POST(request) {
  try {
    let user = null;
    const authHeader = request.headers.get('Authorization');

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabase.auth.getUser(token);
      user = data?.user || null;
    }

    const origin =
      request.headers.get('origin') ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      'https://strength-for-life-app.vercel.app';

    let customerId = user?.user_metadata?.stripe_customer_id;

    if (user && !customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          supabase_user_id: user.id,
        },
      });
      customerId = customer.id;

      await supabase.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          stripe_customer_id: customerId,
        },
      });
    }

    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: [
        {
          price: PROGRAM_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'payment',
      allow_promotion_codes: true,
      success_url: `${origin}/dashboard?unlocked=true`,
      cancel_url: `${origin}/program?canceled=true`,
      metadata: {
        purchase_type: 'full_program_12_week',
        supabase_user_id: user?.id || '',
      },
    };

    if (customerId) {
      sessionConfig.customer = customerId;
    } else if (user?.email) {
      sessionConfig.customer_email = user.email;
    }

    if (user?.id) {
      sessionConfig.client_reference_id = user.id;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Error creating program checkout session:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
