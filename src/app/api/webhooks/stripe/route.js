import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2024-04-10',
});

// Initialize Supabase Admin Client (Bypasses Row Level Security to create users from the backend)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get('Stripe-Signature');

  let event;

  try {
    // 1. Mathematically verify that this request actually came from Stripe
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // 2. We only care about successful checkout sessions
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name;
    const stripeCustomerId = session.customer;
    const supabaseUserId = session.client_reference_id || session.metadata?.supabase_user_id;
    const isSubscription = session.mode === 'subscription';

    try {
      console.log(`[Webhook] Processing successful purchase/subscription for ${customerEmail}`);
      
      // If we have a user ID from the checkout session (they upgraded/subscribed in-app)
      if (supabaseUserId) {
        console.log(`[Webhook] Upgrading existing user ${supabaseUserId} (mode=${session.mode})`);
        
        const { data: { user }, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(supabaseUserId);
        
        if (!fetchError && user) {
          const updatedMeta = {
            ...user.user_metadata,
            stripe_customer_id: stripeCustomerId,
            full_access: true,
            is_trial_user: false,
          };
          if (isSubscription) {
            updatedMeta.subscription_status = 'active';
          }
          await supabaseAdmin.auth.admin.updateUserById(supabaseUserId, {
            user_metadata: updatedMeta,
          });
        }
      } else if (customerEmail) {
        // Fallback for purchase from landing page or Squarespace/Stripe link
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
        const user = existingUsers?.users?.find(u => u.email?.toLowerCase() === customerEmail.toLowerCase());

        if (user) {
           console.log(`[Webhook] User ${customerEmail} already exists, granting full_access...`);
           const updatedMeta = {
             ...user.user_metadata,
             stripe_customer_id: stripeCustomerId,
             full_access: true,
             is_trial_user: false,
           };
           if (isSubscription) {
             updatedMeta.subscription_status = 'active';
           }
           await supabaseAdmin.auth.admin.updateUserById(user.id, {
             user_metadata: updatedMeta
           });
        } else {
           console.log(`[Webhook] Successfully created new user account for ${customerEmail}`);
           const { error: authError } = await supabaseAdmin.auth.admin.createUser({
             email: customerEmail,
             email_confirm: true,
             user_metadata: { 
               full_name: customerName,
               first_name: customerName ? customerName.split(' ')[0] : undefined,
               stripe_customer_id: stripeCustomerId,
               full_access: true,
               is_trial_user: false,
               ...(isSubscription ? { subscription_status: 'active' } : {})
             }
           });
           
           if (authError) {
              console.error(`[Webhook] Error creating user:`, authError.message);
           }
        }
      }
    } catch (err) {
      console.error('[Webhook] Error provisioning user in Supabase:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object;
    const stripeCustomerId = subscription.customer;

    try {
      // Find the user by stripe customer ID
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const user = existingUsers?.users?.find(u => u.user_metadata?.stripe_customer_id === stripeCustomerId);

      if (user) {
        console.log(`[Webhook] Subscription deleted for user ${user.email}. Revoking access...`);
        await supabaseAdmin.auth.admin.updateUserById(user.id, {
          user_metadata: { ...user.user_metadata, subscription_status: 'canceled' }
        });
      }
    } catch (err) {
      console.error('[Webhook] Error handling canceled subscription:', err);
    }
  }

  // Acknowledge receipt of the event to Stripe
  return NextResponse.json({ received: true });
}
