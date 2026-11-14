import { createClient } from '@supabase/supabase-js';

const BUCKET_NAME = 'coach-customizations';

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key',
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

let bucketChecked = false;

async function ensureBucket(supabaseAdmin) {
  if (bucketChecked) return;
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const exists = buckets?.some((b) => b.name === BUCKET_NAME);
    if (!exists) {
      await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: false,
      });
    }
    bucketChecked = true;
  } catch (err) {
    console.error('[CustomWorkoutsStore] Bucket check error:', err);
  }
}

/**
 * Fetches a user's custom_workouts from Supabase Storage (zero JWT cookie bloat).
 * Also automatically migrates and strips any legacy user_metadata.custom_workouts
 * so the user's auth token/cookie stays tiny and never fails on login.
 */
export async function getUserCustomWorkouts(user) {
  if (!user?.id) return {};

  const supabaseAdmin = getSupabaseAdmin();
  await ensureBucket(supabaseAdmin);

  let storedCustomWorkouts = {};

  // 1. Read from Supabase Storage bucket
  try {
    const { data: blob, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .download(`${user.id}.json`);

    if (!error && blob) {
      const text = await blob.text();
      const parsed = JSON.parse(text);
      if (parsed && typeof parsed === 'object') {
        storedCustomWorkouts = parsed;
      }
    }
  } catch {
    // File does not exist yet for this user — normal for standard users
  }

  // 2. If legacy custom_workouts exists in user_metadata, migrate to Storage and purge from user_metadata!
  const legacyCustom = user.user_metadata?.custom_workouts;
  if (legacyCustom && typeof legacyCustom === 'object' && Object.keys(legacyCustom).length > 0) {
    const merged = { ...legacyCustom, ...storedCustomWorkouts };
    try {
      await saveUserCustomWorkouts(user.id, merged);
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          custom_workouts: null,
        },
      });
      return merged;
    } catch (err) {
      console.error('[CustomWorkoutsStore] Legacy migration error:', err);
      return merged;
    }
  } else if (user.user_metadata && 'custom_workouts' in user.user_metadata && user.user_metadata.custom_workouts !== null) {
    // Clean up empty object if present
    try {
      await supabaseAdmin.auth.admin.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          custom_workouts: null,
        },
      });
    } catch {
      // ignore
    }
  }

  return storedCustomWorkouts;
}

/**
 * Saves a user's custom_workouts map into Supabase Storage (`coach-customizations/<userId>.json`)
 * and stores only a tiny array of week numbers (`customized_weeks: [1, 2]`) in user_metadata.
 */
export async function saveUserCustomWorkouts(userId, customWorkoutsMap, existingUserMetadata = null) {
  if (!userId) return {};

  const supabaseAdmin = getSupabaseAdmin();
  await ensureBucket(supabaseAdmin);

  const cleanMap = customWorkoutsMap || {};
  const customizedWeeks = Object.keys(cleanMap)
    .filter((wk) => Array.isArray(cleanMap[wk]) && cleanMap[wk].length > 0)
    .map((wk) => Number(wk))
    .sort((a, b) => a - b);

  const payload = JSON.stringify(cleanMap);
  const { error: uploadError } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(`${userId}.json`, Buffer.from(payload, 'utf-8'), {
      contentType: 'application/json',
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Failed to store custom workouts: ${uploadError.message}`);
  }

  // Update only a tiny summary array `customized_weeks` in user_metadata (and ensure `custom_workouts` is null)
  if (existingUserMetadata) {
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: {
        ...existingUserMetadata,
        custom_workouts: null,
        customized_weeks: customizedWeeks,
      },
    });
  }

  return {
    customWorkouts: cleanMap,
    customizedWeeks,
  };
}
