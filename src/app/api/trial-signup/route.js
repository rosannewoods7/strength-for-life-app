import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
  try {
    const body = await req.json();
    const firstName = (body.firstName || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';

    if (!firstName || !email || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Please provide your first name, a valid email, and a password (at least 6 characters).' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingList } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });
    const existingUser = existingList?.users?.find(
      (u) => u.email?.toLowerCase() === email
    );

    if (existingUser) {
      return NextResponse.json(
        {
          error: 'An account with this email already exists. Please click "Member Login" below to sign in!',
          existingAccount: true,
        },
        { status: 409 }
      );
    }

    // Create confirmed trial user so they can sign in immediately with zero email delay
    const { data, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        first_name: firstName,
        full_name: firstName,
        is_trial_user: true,
        full_access: false,
        trial_started_at: new Date().toISOString(),
      },
    });

    if (createError) {
      return NextResponse.json({ error: createError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, userId: data.user?.id });
  } catch (err) {
    console.error('[Trial Signup Error]:', err);
    return NextResponse.json(
      { error: 'Something went wrong starting your trial. Please try again.' },
      { status: 500 }
    );
  }
}
