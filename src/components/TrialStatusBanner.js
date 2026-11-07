'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import styles from './TrialStatusBanner.module.css';

export function UnlockProgramButton({ label = 'Unlock Full 12-Week Program ($297 CAD) →', className }) {
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const headers = { 'Content-Type': 'application/json' };
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }

      const res = await fetch('/api/checkout-program', {
        method: 'POST',
        headers,
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Could not start checkout. Please try again.');
        setLoading(false);
      }
    } catch (err) {
      alert('Network error starting checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleUnlock}
      disabled={loading}
      className={className || styles.unlockCtaBtn}
    >
      {loading ? 'Opening Secure Checkout...' : label}
    </button>
  );
}

export function LockedFeatureGate({
  title = 'Included in the Full 12-Week Strength for Life Program',
  description = 'Your 7-Day Free Trial includes full access to Week 1, Getting Started, and your Daily Readiness Audit. Upgrade anytime to unlock Weeks 2–12, Jump Training, SIT Intervals, and the Recovery Vault!',
}) {
  return (
    <div className={styles.lockedCard}>
      <div className={styles.lockIcon}>🔒</div>
      <div className={styles.lockBadge}>FULL PROGRAM FEATURE</div>
      <h2 className={styles.lockedTitle}>{title}</h2>
      <p className={styles.lockedDesc}>{description}</p>
      <div className={styles.lockedPerks}>
        <span>✓ All 12 Weeks of Progressive Strength Training</span>
        <span>✓ Full Jump Training &amp; Sprint Interval (SIT) Modules</span>
        <span>✓ Complete Recovery Vault &amp; Live Check-Ins</span>
      </div>
      <UnlockProgramButton
        label="Unlock Full 12-Week Program ($297 CAD) →"
        className={styles.lockedPrimaryBtn}
      />
    </div>
  );
}

const LOCKED_ROUTE_MESSAGES = {
  '/jump-training': {
    title: 'Jump Training is Locked 🔒',
    description:
      'The complete 12-Week Progressive Jump Training Protocol, coaching videos, and technique demonstrations are included in the Full 12-Week Strength for Life Program. Unlock full access today to start building bone density and explosive power!',
  },
  '/sit-training': {
    title: 'Sprint Interval Training (SIT) is Locked 🔒',
    description:
      'The Strength for Life Sprint Interval Training (SIT) Coaching, video demos, and Beginner-to-Advanced protocols are included in the Full 12-Week Program. Upgrade today to unlock all SIT workouts!',
  },
  '/vault': {
    title: 'The Recovery Vault is Locked 🔒',
    description:
      'The Recovery Vault PDF guides, Weight Selection Guide, Common Mistakes Guide, and Recovery Protocols are reserved for full program members. Unlock the Full 12-Week Strength for Life Program to access the entire vault!',
  },
  '/check-ins': {
    title: 'Live Community Check-Ins are Locked 🔒',
    description:
      'Live coaching check-ins and community Q&As are reserved for full 12-Week Strength for Life members. Upgrade today to join us!',
  },
};

export default function TrialStatusBanner({ accessStatus, children }) {
  const pathname = usePathname();

  if (!accessStatus || accessStatus.hasFullAccess) {
    return <>{children}</>;
  }

  // If 7-day trial is expired, replace page content with full upgrade wall
  if (accessStatus.isTrialExpired) {
    return (
      <div className={styles.expiredWall}>
        <div className={styles.expiredBadge}>7-DAY FREE TRIAL COMPLETE</div>
        <h1 className={styles.expiredTitle}>
          Ready to Continue Your 12-Week Strength for Life Program? 💪
        </h1>
        <p className={styles.expiredText}>
          Your 7-day free trial has ended—and all of your Week 1 workout logs and Readiness Audit history are safely saved in your account! Unlock full access today to continue into Weeks 2–12 and keep building your strength, bone density, and metabolic resilience.
        </p>
        <div className={styles.lockedPerks}>
          <span>✓ Immediate access to Weeks 1–12 Progressive Workouts</span>
          <span>✓ Full Jump Training &amp; Sprint Interval (SIT) Modules</span>
          <span>✓ Complete Recovery Vault, Mobility &amp; Nutrition Guides</span>
          <span>✓ Keep all your logged weights &amp; progress history</span>
        </div>
        <UnlockProgramButton
          label="Unlock Full 12-Week Program Now ($297 CAD) →"
          className={styles.lockedPrimaryBtn}
        />
      </div>
    );
  }

  const lockedRouteConfig = LOCKED_ROUTE_MESSAGES[pathname];

  // Active 7-day trial: show top countdown banner + either locked gate or children
  return (
    <>
      <div className={styles.trialBanner}>
        <div className={styles.trialBannerInfo}>
          <span className={styles.trialPill}>
            ⏳ {accessStatus.daysRemaining}{' '}
            {accessStatus.daysRemaining === 1 ? 'Day' : 'Days'} Left in Free Trial
          </span>
          <span className={styles.trialText}>
            You have full access to <strong>Week 1 &amp; Daily Readiness</strong>. Ready for Weeks 2–12, Jump, SIT &amp; the Recovery Vault?
          </span>
        </div>
        <UnlockProgramButton
          label="Unlock Full Program ($297 CAD) →"
          className={styles.bannerUnlockBtn}
        />
      </div>
      {lockedRouteConfig ? (
        <LockedFeatureGate
          title={lockedRouteConfig.title}
          description={lockedRouteConfig.description}
        />
      ) : (
        children
      )}
    </>
  );
}
