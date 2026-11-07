'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import styles from './page.module.css';

export default function ProgressPage() {
  const { progress, isLoading, isSubscribed, updateProgress } = useProgress();
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const savedWeek = localStorage.getItem('eh_current_week');
    if (savedWeek) {
      const parsedWeek = parseInt(savedWeek, 10);
      const maxWeek = isSubscribed ? 24 : 12;
      if (!isNaN(parsedWeek) && parsedWeek >= 1 && parsedWeek <= maxWeek) {
        setCurrentWeek(parsedWeek);
      }
    }
  }, [isSubscribed]);

  if (isLoading) {
    return <div className={styles.container} style={{ opacity: 0.5 }}>Loading progress...</div>;
  }

  const totalWeeks = isSubscribed ? 24 : 12;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  // Calculate totals
  let totalStrength = 0;
  let totalJump = 0;
  let totalSit = 0;

  weeks.forEach(w => {
    totalStrength += progress[w].strength.filter(Boolean).length;
    totalJump += progress[w].jump.filter(Boolean).length;
    totalSit += progress[w].sit.filter(Boolean).length;
  });

  const getPhase = (w) => {
    if (w <= 4) return 'Phase 1: Foundation';
    if (w <= 8) return 'Phase 2: Strength';
    if (w <= 12) return 'Phase 3: Power';
    if (w <= 16) return 'Phase 4: Build';
    if (w <= 20) return 'Phase 5: Intensify';
    return 'Phase 6: Express';
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Progress</h1>
        <p className={styles.subtitle}>Consistency is the key to metabolic resilience.</p>
        <p className={styles.subtitle} style={{ fontSize: '0.95rem', marginTop: '0.5rem', opacity: 0.7 }}>
          (You can click the dots below to manually check off your workouts)
        </p>
      </header>

      <div className={styles.grid}>
        {weeks.map(w => {
          const weekData = progress[w];
          const isCurrent = w === currentWeek;
          
          return (
            <div key={w} className={`${styles.weekCard} ${isCurrent ? styles.currentWeek : ''}`}>
              <div className={styles.weekHeader}>
                <span className={styles.weekTitle}>Week {w} {isCurrent && '(Current)'}</span>
                <span className={styles.phaseBadge}>{getPhase(w)}</span>
              </div>
              
              <div className={styles.modalityRow}>
                <span className={styles.modalityName}>Strength (3x)</span>
                <div className={styles.dotsContainer}>
                  {weekData.strength.map((isDone, idx) => (
                    <div 
                      key={`str-${idx}`} 
                      className={`${styles.dot} ${styles.strength} ${isDone ? styles.completed : ''} ${styles.interactiveDot}`} 
                      title={`Strength Workout ${idx + 1}`} 
                      onClick={() => updateProgress(w, 'strength', idx, !isDone)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.modalityRow}>
                <span className={styles.modalityName}>Jump (2-3x)</span>
                <div className={styles.dotsContainer}>
                  {weekData.jump.map((isDone, idx) => (
                    <div 
                      key={`jump-${idx}`} 
                      className={`${styles.dot} ${styles.jump} ${isDone ? styles.completed : ''} ${styles.interactiveDot}`} 
                      title={`Jump Session ${idx + 1}`} 
                      onClick={() => updateProgress(w, 'jump', idx, !isDone)}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.modalityRow}>
                <span className={styles.modalityName}>SIT (1-2x)</span>
                <div className={styles.dotsContainer}>
                  {weekData.sit.map((isDone, idx) => (
                    <div 
                      key={`sit-${idx}`} 
                      className={`${styles.dot} ${styles.sit} ${isDone ? styles.completed : ''} ${styles.interactiveDot}`} 
                      title={`SIT Session ${idx + 1}`} 
                      onClick={() => updateProgress(w, 'sit', idx, !isDone)}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.summarySection}>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{totalStrength}</div>
          <div className={styles.statLabel}>Strength Workouts</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{totalJump}</div>
          <div className={styles.statLabel}>Jump Sessions</div>
        </div>
        <div className={styles.statBox}>
          <div className={styles.statNumber}>{totalSit}</div>
          <div className={styles.statLabel}>SIT Sessions</div>
        </div>
      </div>
    </div>
  );
}
