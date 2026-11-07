# Checkout & Authentication Integration

The Strength for Life platform uses a Passwordless "Magic Link" authentication system via Supabase. To ensure clients can log in immediately after purchasing on your Squarespace site, we need to bridge the gap between Stripe (your payment processor) and Supabase.

## The Goal
When a client successfully completes checkout via Squarespace (processed by Stripe), their email address is automatically added to the Supabase Authentication database.

## Recommended Approach: Webhooks (No-Code/Low-Code)

Since you are using Squarespace for the frontend checkout and Stripe for the backend processing, the easiest and most robust method is to use a webhook integration platform like **Zapier** or **Make.com**.

### Step-by-Step Flow

1. **Trigger:** A successful payment occurs in Stripe.
2. **Action:** The automation tool (Zapier/Make) extracts the customer's `email` from the Stripe charge object.
3. **Action:** The automation tool makes an API request to your Supabase project to "Invite User" or create a new user profile using that email.

### How to set this up

#### Option A: Using Zapier (Easiest)
1. Create a Zapier account.
2. Set the Trigger to **Stripe: New Charge**.
3. Set the Action to **Webhooks by Zapier (Custom Request)** or use the native **Supabase (Beta)** integration if available.
4. If using Custom Request, send a `POST` request to your Supabase Admin API endpoint (`/auth/v1/admin/users`) passing the `email` field and your `service_role` key (found in Supabase Settings > API).

#### Option B: Direct Stripe Webhook (Developer Route)
If you prefer not to use a third-party tool like Zapier, we can build a dedicated API route in this Next.js app (e.g., `/api/webhooks/stripe`).
1. You configure Stripe to send webhook events to `https://your-course-domain.com/api/webhooks/stripe`.
2. When the app receives the `checkout.session.completed` event, it uses the Supabase Admin SDK to programmatically create the user account and trigger the initial Welcome/Login email.

## Next Steps
Once the app is deployed to a live URL (e.g., Vercel), we will set up **Option B** (Direct Stripe Webhook) natively inside the app, which avoids monthly Zapier fees and keeps everything in one codebase.
