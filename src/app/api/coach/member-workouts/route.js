import { NextResponse } from 'next/server';
import { createClient as createServerSupabase } from '@/utils/supabase/server';
import { createClient as createAdminSupabase } from '@supabase/supabase-js';
import { isAdminUser, getAccessStatus } from '@/lib/access';

const supabaseAdmin = createAdminSupabase(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

function formatMemberSummary(u) {
  const meta = u.user_metadata || {};
  const access = getAccessStatus(u);
  const customWorkouts = meta.custom_workouts || {};
  const customizedWeeks = Object.keys(customWorkouts)
    .filter((wk) => Array.isArray(customWorkouts[wk]) && customWorkouts[wk].length > 0)
    .map((wk) => Number(wk))
    .sort((a, b) => a - b);

  return {
    id: u.id,
    email: u.email,
    firstName: meta.first_name || meta.full_name || '',
    createdAt: u.created_at,
    hasFullAccess: access.hasFullAccess,
    isTrialActive: access.isTrialActive,
    daysRemaining: access.daysRemaining,
    isSubscribed: meta.subscription_status === 'active',
    customizedWeeks,
  };
}

function formatMemberDetail(u) {
  const meta = u.user_metadata || {};
  return {
    ...formatMemberSummary(u),
    customWorkouts: meta.custom_workouts || {},
    weights: meta.weights || {},
    exerciseNotes: meta.exercise_notes || {},
    progress: meta.progress || {},
  };
}

export async function GET(request) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Unauthorized. Coach access only.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const emailQuery = (searchParams.get('email') || '').trim().toLowerCase();

    const { data: listData, error: listError } =
      await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const allUsers = listData?.users || [];
    const sortedUsers = [...allUsers].sort(
      (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
    );

    const members = sortedUsers.map(formatMemberSummary);

    if (emailQuery) {
      const targetUser = sortedUsers.find(
        (u) => u.email?.trim().toLowerCase() === emailQuery
      );
      if (!targetUser) {
        return NextResponse.json(
          { error: `No member found with email "${emailQuery}".`, members },
          { status: 404 }
        );
      }
      return NextResponse.json({
        member: formatMemberDetail(targetUser),
        members,
      });
    }

    return NextResponse.json({ members });
  } catch (err) {
    console.error('[Coach API GET Error]:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!isAdminUser(user)) {
      return NextResponse.json({ error: 'Unauthorized. Coach access only.' }, { status: 403 });
    }

    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const weeks = Array.isArray(body.weeks) ? body.weeks : [];
    const workouts = body.workouts;
    const reset = Boolean(body.reset);
    const grantFullAccess = body.grantFullAccess;

    if (!email) {
      return NextResponse.json({ error: 'Member email is required.' }, { status: 400 });
    }

    const { data: listData, error: listError } =
      await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 });

    if (listError) {
      return NextResponse.json({ error: listError.message }, { status: 500 });
    }

    const targetUser = (listData?.users || []).find(
      (u) => u.email?.trim().toLowerCase() === email
    );

    if (!targetUser) {
      return NextResponse.json(
        { error: `No member found with email "${email}".` },
        { status: 404 }
      );
    }

    const existingMeta = targetUser.user_metadata || {};
    const existingCustomWorkouts = { ...(existingMeta.custom_workouts || {}) };

    if (typeof grantFullAccess === 'boolean') {
      const updatedMeta = {
        ...existingMeta,
        full_access: grantFullAccess,
        is_trial_user: !grantFullAccess,
      };
      const { data: updatedData, error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
          user_metadata: updatedMeta,
        });

      if (updateError) {
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        member: formatMemberDetail(updatedData.user),
      });
    }

    if (weeks.length === 0) {
      return NextResponse.json(
        { error: 'Please specify at least one week to update.' },
        { status: 400 }
      );
    }

    weeks.forEach((wk) => {
      const wkKey = String(wk);
      if (reset) {
        delete existingCustomWorkouts[wkKey];
      } else if (Array.isArray(workouts)) {
        // Deep copy so each week has its own clean array
        existingCustomWorkouts[wkKey] = JSON.parse(JSON.stringify(workouts));
      }
    });

    const updatedMeta = {
      ...existingMeta,
      custom_workouts: existingCustomWorkouts,
    };

    const { data: updatedData, error: updateError } =
      await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
        user_metadata: updatedMeta,
      });

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      member: formatMemberDetail(updatedData.user),
    });
  } catch (err) {
    console.error('[Coach API POST Error]:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
