// Central helper to determine if a user has Full 12-Week Access vs. a 7-Day Free Trial.
// Anyone created on or before Nov 1, 2026 (or with full_access / subscription_status / stripe_customer_id)
// automatically gets permanent Full Access.

const GRANDFATHER_CUTOFF = new Date('2026-11-01T00:00:00Z');
const TRIAL_DURATION_DAYS = 7;

export function getAccessStatus(user) {
  if (!user) {
    return {
      hasFullAccess: false,
      isTrialActive: false,
      isTrialExpired: false,
      daysRemaining: 0,
    };
  }

  const meta = user.user_metadata || {};

  // 1. Explicit full access, active ongoing subscription, or Stripe customer (unless only created for a trial checkout)
  if (
    meta.full_access === true ||
    meta.subscription_status === 'active' ||
    (meta.stripe_customer_id && !meta.is_trial_user)
  ) {
    return {
      hasFullAccess: true,
      isTrialActive: false,
      isTrialExpired: false,
      daysRemaining: null,
    };
  }

  // 2. Grandfather existing members created before cutoff (unless explicitly marked as trial user)
  const createdAt = user.created_at ? new Date(user.created_at) : new Date();
  if (!meta.is_trial_user && createdAt < GRANDFATHER_CUTOFF) {
    return {
      hasFullAccess: true,
      isTrialActive: false,
      isTrialExpired: false,
      daysRemaining: null,
    };
  }

  // 3. Calculate 7-day trial window
  const trialStartStr = meta.trial_started_at || user.created_at;
  const trialStart = trialStartStr ? new Date(trialStartStr) : new Date();
  const now = new Date();
  const elapsedMs = now.getTime() - trialStart.getTime();
  const totalTrialMs = TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000;
  const remainingMs = totalTrialMs - elapsedMs;
  const daysRemaining = Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));

  const isTrialActive = remainingMs > 0;

  return {
    hasFullAccess: false,
    isTrialActive,
    isTrialExpired: !isTrialActive,
    daysRemaining,
  };
}
