'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from './page.module.css';

const ADVANCED_WEEKS = [
  {
    id: 13,
    title: 'You Built Strength. Now Build Capacity.',
    phase: 'Phase 4: Build (Endurance)',
    description: 'Higher repetitions, increased training volume, and purposeful work capacity while maintaining crisp form.',
  },
  {
    id: 14,
    title: 'Muscular Endurance vs. Cardio',
    phase: 'Phase 4: Build (Endurance)',
    description: 'Train local muscular endurance to repeat quality contractions without letting technique deteriorate.',
  },
  {
    id: 15,
    title: "Progress Isn't Always More Weight",
    phase: 'Phase 4: Build (Endurance)',
    description: 'Accumulate more quality repetitions, improve control, and master your current loads at a lower RPE.',
  },
  {
    id: 16,
    title: 'Preparing to Train Heavy',
    phase: 'Phase 4: Build (Endurance)',
    description: 'Consolidate your work capacity gains and prepare your nervous system for heavy submaximal lifting.',
  },
  {
    id: 17,
    title: 'What Does "Heavy" Actually Mean?',
    phase: 'Phase 5: Intensify (Max Strength)',
    description: 'Lower repetitions, heavier resistance, and using repetitions-in-reserve to find your true working loads.',
  },
  {
    id: 18,
    title: 'Rest Is Part of the Prescription',
    phase: 'Phase 5: Intensify (Max Strength)',
    description: 'Use strategic 2–3 minute recovery intervals so your nervous system can produce maximum force every set.',
  },
  {
    id: 19,
    title: "Don't Fear Lower Repetitions",
    phase: 'Phase 5: Intensify (Max Strength)',
    description: 'Move beyond light-weight stereotypes to recruit high-threshold motor units and protect bone density.',
  },
  {
    id: 20,
    title: "Recognize What You've Built",
    phase: 'Phase 5: Intensify (Max Strength)',
    description: 'Peak force production and a comprehensive audit of the strength and confidence you have built.',
  },
  {
    id: 21,
    title: 'Strength + Speed = Power',
    phase: 'Phase 6: Express (Strength + Power)',
    description: 'Choose your personalized Power Track (Foundational, Standard, or Advanced) and learn rapid force production.',
  },
  {
    id: 22,
    title: 'Learn to Stop (Accelerate & Decelerate)',
    phase: 'Phase 6: Express (Strength + Power)',
    description: 'Increase movement velocity while mastering controlled deceleration and the Stick Test.',
  },
  {
    id: 23,
    title: 'Strength and Power Are Not the Same',
    phase: 'Phase 6: Express (Strength + Power)',
    description: 'Progress your power challenge while prioritizing explosive speed and crisp execution over fatigue.',
  },
  {
    id: 24,
    title: 'Your Six-Month Strength Trajectory',
    phase: 'Phase 6: Express (Strength + Power)',
    description: 'Express your highest-quality power and celebrate six months of transformative strength training.',
  },
];

export default function OngoingPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkSubscription() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user?.user_metadata?.subscription_status === 'active') {
        setIsSubscribed(true);
      }
      setIsLoading(false);
    }
    checkSubscription();
  }, [supabase.auth]);

  const handleSubscribe = async () => {
    setIsCheckoutLoading(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Backend Error: ' + (data.error || 'No checkout URL returned'));
        setIsCheckoutLoading(false);
      }
    } catch (err) {
      alert('Network Error: ' + err.message);
      setIsCheckoutLoading(false);
    }
  };

  if (isLoading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.cycleTag}>CYCLE 2 • MONTHS 4–6 (WEEKS 13–24)</div>
        <h1 className={styles.title}>
          {isSubscribed
            ? 'Strength for Life Community (Months 4–6)'
            : 'Month 4+ Cycle 2: Build → Intensify → Express'}
        </h1>
        <p className={styles.subtitle}>
          {isSubscribed
            ? 'Select a week below to access your Cycle 2 coaching lessons, power tracks, and progressive workouts.'
            : 'Preview the 12-week Cycle 2 curriculum below, and unlock full access with the Strength for Life Membership ($49/month).'}
        </p>
      </header>

      {!isSubscribed && (
        <div className={styles.paywallCard}>
          <div className={styles.paywallHeaderRow}>
            <div className={styles.iconWrapper}>⭐</div>
            <div>
              <h2>Unlock the Strength for Life Membership</h2>
              <p>
                You&apos;ve built the foundation in Weeks 1–12. Now step into Cycle 2 (Weeks 13–24) with brand-new exercises, metabolic finishers, heavy strength blocks, and personalized 3-Track Power training.
              </p>
            </div>
          </div>

          <div className={styles.paywallCtaRow}>
            <div className={styles.priceCallout}>
              Maintain your momentum for <strong>$49 CAD / month</strong>
              <span>Cancel anytime • Keep your original 12 weeks forever</span>
            </div>
            <button
              className={styles.subscribeButton}
              onClick={handleSubscribe}
              disabled={isCheckoutLoading}
            >
              {isCheckoutLoading ? 'Opening Checkout...' : 'Subscribe for $49/month →'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.grid}>
        {ADVANCED_WEEKS.map((week) => {
          if (isSubscribed) {
            return (
              <Link
                href={`/program/week-${week.id}`}
                key={week.id}
                className={styles.card}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.weekNumber}>Week {week.id}</span>
                  <span className={styles.phaseLabel}>{week.phase}</span>
                </div>
                <h2 className={styles.cardTitle}>{week.title}</h2>
                <p className={styles.cardDescription}>{week.description}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.actionText}>Enter Module &rarr;</span>
                </div>
              </Link>
            );
          }

          return (
            <div
              key={week.id}
              className={`${styles.card} ${styles.cardLocked}`}
              onClick={handleSubscribe}
              role="button"
              tabIndex={0}
            >
              <div className={styles.cardHeader}>
                <span className={styles.weekNumber}>Week {week.id} 🔒</span>
                <span className={styles.phaseLabel}>{week.phase}</span>
              </div>
              <h2 className={styles.cardTitle}>{week.title}</h2>
              <p className={styles.cardDescription}>{week.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.actionText}>
                  🔒 Unlock with Membership ($49/mo) &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
