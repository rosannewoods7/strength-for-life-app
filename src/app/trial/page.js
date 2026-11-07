'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import styles from './page.module.css';

export default function TrialSignupPage() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/dashboard';
      }
    };
    checkSession();
  }, []);

  const handleStartTrial = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/trial-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not start trial.');
        setLoading(false);
        return;
      }

      // Immediately sign in with the newly created credentials
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      window.location.href = '/dashboard?trial=started';
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleBuyFullProgramNow = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout-program', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href =
          'https://www.drrosannewoods.com/get-started';
      }
    } catch {
      window.location.href =
        'https://www.drrosannewoods.com/get-started';
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.brandHeader}>
          <span className={styles.trialBadge}>7-DAY FREE APP TRIAL • NO CARD REQUIRED</span>
          <h1>Experience Strength for Life Free for 7 Days</h1>
          <p>
            Test-drive Week 1 of the Strength for Life protocol, log your workouts, and use the Daily Readiness Audit—completely free for 7 days.
          </p>
        </div>

        <form onSubmit={handleStartTrial} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">Your First Name</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g., Alex"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Create a Password (6+ characters)</label>
            <input
              id="password"
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create your password"
              required
            />
          </div>

          <button type="submit" className={styles.primaryButton} disabled={loading}>
            {loading ? 'Creating Your Free Trial...' : 'Start My 7-Day Free Trial →'}
          </button>

          <ul className={styles.perksList}>
            <li>✓ Instant access to Week 1 Workouts, Video Demos &amp; Coaching</li>
            <li>✓ Full Daily Readiness &amp; Recovery Audit</li>
            <li>✓ No credit card required today — upgrade anytime for $297 CAD</li>
          </ul>

          {error && <div className={styles.errorMessage}>{error}</div>}
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <div className={styles.secondaryBox}>
          <p className={styles.secondaryText}>
            Want immediate access to all 12 Weeks, Jump Training, SIT Intervals &amp; the Recovery Vault?
          </p>
          <button
            type="button"
            onClick={handleBuyFullProgramNow}
            disabled={checkoutLoading}
            className={styles.secondaryButton}
          >
            {checkoutLoading
              ? 'Opening Secure Checkout...'
              : 'Unlock Full 12-Week Program Right Away ($297 CAD)'}
          </button>
        </div>

        <div className={styles.footerLinks}>
          Already have an account? <Link href="/login">Member Login</Link>
        </div>
      </div>
    </div>
  );
}
