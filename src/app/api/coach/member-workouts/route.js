import { NextResponse } from 'next/server';
import { createClient as createServerSupabase } from '@/utils/supabase/server';
import { createClient as createAdminSupabase } from '@supabase/supabase-js';
import { isAdminUser, getAccessStatus } from '@/lib/access';
import {
  getUserCustomWorkouts,
  saveUserCustomWorkouts,
} from '@/lib/customWorkoutsStore';

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

function formatMemberSummary(u, customWorkoutsOverride = null) {
  const meta = u.user_metadata || {};
  const access = getAccessStatus(u);

  let customizedWeeks = [];
  if (customWorkoutsOverride) {
    customizedWeeks = Object.keys(customWorkoutsOverride)
      .filter(
        (wk) =>
          Array.isArray(customWorkoutsOverride[wk]) &&
          customWorkoutsOverride[wk].length > 0
      )
      .map((wk) => Number(wk))
      .sort((a, b) => a - b);
  } else if (Array.isArray(meta.customized_weeks)) {
    customizedWeeks = [...meta.customized_weeks]
      .map((wk) => Number(wk))
      .sort((a, b) => a - b);
  } else if (meta.custom_workouts && typeof meta.custom_workouts === 'object') {
    customizedWeeks = Object.keys(meta.custom_workouts)
      .filter(
        (wk) =>
          Array.isArray(meta.custom_workouts[wk]) &&
          meta.custom_workouts[wk].length > 0
      )
      .map((wk) => Number(wk))
      .sort((a, b) => a - b);
  }

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

async function formatMemberDetail(u) {
  const meta = u.user_metadata || {};
  const customWorkouts = await getUserCustomWorkouts(u);
  return {
    ...formatMemberSummary(u, customWorkouts),
    customWorkouts,
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
      return NextResponse.json(
        { error: 'Unauthorized. Coach access only.' },
        { status: 403 }
      );
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

    // Automatically migrate & clean any legacy user_metadata.custom_workouts so no user ever has a bloated JWT cookie
    for (const u of sortedUsers) {
      if (u.user_metadata?.custom_workouts) {
        await getUserCustomWorkouts(u);
      }
    }

    const members = sortedUsers.map((u) => formatMemberSummary(u));

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
      const memberDetail = await formatMemberDetail(targetUser);
      return NextResponse.json({
        member: memberDetail,
        members: members.map((m) =>
          m.id === memberDetail.id
            ? { ...m, customizedWeeks: memberDetail.customizedWeeks }
            : m
        ),
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
      return NextResponse.json(
        { error: 'Unauthorized. Coach access only.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const email = (body.email || '').trim().toLowerCase();
    const weeks = Array.isArray(body.weeks) ? body.weeks : [];
    const workouts = body.workouts;
    const reset = Boolean(body.reset);
    const grantFullAccess = body.grantFullAccess;

    if (!email) {
      return NextResponse.json(
        { error: 'Member email is required.' },
        { status: 400 }
      );
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

    if (typeof grantFullAccess === 'boolean') {
      const updatedMeta = {
        ...existingMeta,
        custom_workouts: null,
        full_access: grantFullAccess,
        is_trial_user: !grantFullAccess,
      };
      const { data: updatedData, error: updateError } =
        await supabaseAdmin.auth.admin.updateUserById(targetUser.id, {
          user_metadata: updatedMeta,
        });

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 }
        );
      }

      const memberDetail = await formatMemberDetail(updatedData.user);
      return NextResponse.json({
        success: true,
        member: memberDetail,
      });
    }

    if (weeks.length === 0) {
      return NextResponse.json(
        { error: 'Please specify at least one week to update.' },
        { status: 400 }
      );
    }

    // Load current custom workouts from Supabase Storage (and any legacy metadata)
    const existingCustomWorkouts = {
      ...(await getUserCustomWorkouts(targetUser)),
    };

    weeks.forEach((wk) => {
      const wkKey = String(wk);
      if (reset) {
        delete existingCustomWorkouts[wkKey];
      } else if (Array.isArray(workouts)) {
        existingCustomWorkouts[wkKey] = JSON.parse(JSON.stringify(workouts));
      }
    });

    // Save to Supabase Storage bucket & keep user_metadata tiny (custom_workouts: null)
    const { customWorkouts, customizedWeeks } = await saveUserCustomWorkouts(
      targetUser.id,
      existingCustomWorkouts,
      existingMeta
    );

    return NextResponse.json({
      success: true,
      member: {
        ...formatMemberSummary(targetUser, customWorkouts),
        customizedWeeks,
        customWorkouts,
        weights: existingMeta.weights || {},
        exerciseNotes: existingMeta.exercise_notes || {},
        progress: existingMeta.progress || {},
      },
    });
  } catch (err) {
    console.error('[Coach API POST Error]:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
