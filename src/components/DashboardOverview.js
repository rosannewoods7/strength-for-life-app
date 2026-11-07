'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ReadinessAudit from '@/components/ReadinessAudit';
import ModalityTracker from '@/components/ModalityTracker';
import WeeklyChallengeCard from '@/components/WeeklyChallengeCard';
import { weeklyData } from '@/lib/weeklyData';
import styles from '@/app/(protected)/dashboard/page.module.css';

export default function DashboardOverview({ isSubscribed }) {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const totalWeeks = isSubscribed ? 24 : 12;

  useEffect(() => {
    // Read the current week from local storage
    const savedWeek = localStorage.getItem('eh_current_week');
    if (savedWeek) {
      const parsedWeek = parseInt(savedWeek, 10);
      const maxWeek = isSubscribed ? 24 : 12;
      if (!isNaN(parsedWeek) && parsedWeek >= 1 && parsedWeek <= maxWeek) {
        setCurrentWeek(parsedWeek);
      } else if (parsedWeek > maxWeek) {
        setCurrentWeek(maxWeek); // Cap it if they downgraded or something
      }
    }
    setIsLoaded(true);
  }, [isSubscribed]);

  const progressPercentage = Math.round((currentWeek / totalWeeks) * 100);
  
  // Get dynamic data for the current week
  const weekData = weeklyData[currentWeek] || weeklyData[1];
  
  const getPhaseInfo = (week) => {
    if (week <= 4) return { num: 1, title: 'Neural Adaptation' };
    if (week <= 8) return { num: 2, title: 'Strength Building' };
    if (week <= 12) return { num: 3, title: 'Strength & Power' };
    if (week <= 16) return { num: 4, title: 'Muscular Endurance & Work Capacity' };
    if (week <= 20) return { num: 5, title: 'Maximum Strength' };
    return { num: 6, title: 'Strength + Power' };
  };

  const phase = getPhaseInfo(currentWeek);

  if (!isLoaded) {
    return <div className={styles.gridContainer} style={{ opacity: 0.5 }}>Loading your progress...</div>;
  }

  return (
    <div className={styles.gridContainer}>
      {/* Mini Progress Overview Banner */}
      <section className={styles.miniProgressCard}>
        <div className={styles.miniProgressHeader}>
          <span className={styles.miniProgressTitle}>Your Progress: Week {currentWeek} of {totalWeeks}</span>
          <span className={styles.miniProgressPhase}>Phase {phase.num}: {phase.title}</span>
        </div>
        <div className={styles.progressBarWrapper}>
          <div 
            className={styles.progressBarFill} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </section>

      {/* Daily Readiness Audit */}
      <section className={styles.auditWrapper}>
        <ReadinessAudit />
      </section>

      <div className={styles.rightColumn}>
        {/* Weekly Challenge Card or Advanced Program link */}
        <section className={styles.card} style={{ marginBottom: '2rem' }}>
          {currentWeek <= 12 ? (
            <WeeklyChallengeCard challenges={weekData.weeklyChallenge} weekNumber={currentWeek} />
          ) : (
            <div>
              <h3 style={{ color: 'var(--color-deep-plum)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>
                Month {Math.ceil(currentWeek / 4)} Training
              </h3>
              <p style={{ marginBottom: '1rem', color: 'var(--color-deep-espresso)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                You are in Phase {phase.num}. This phase focuses on {phase.title.toLowerCase()}. Maintain your consistency and track your Readiness Audit above.
              </p>
            </div>
          )}
          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <Link href={`/program/week-${currentWeek}`}>
              <button className={styles.primaryButton}>Go to Week {currentWeek} Program</button>
            </Link>
          </div>
        </section>

        {/* Modality Tracker */}
        <section className={styles.card}>
          <ModalityTracker />
        </section>
      </div>
    </div>
  );
}
