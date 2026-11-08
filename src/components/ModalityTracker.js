'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import styles from './ModalityTracker.module.css';

export default function ModalityTracker() {
  const { progress, isLoading, updateProgress, resetWeek } = useProgress();
  const [currentWeek, setCurrentWeek] = useState(1);

  useEffect(() => {
    const savedWeek = localStorage.getItem('eh_current_week');
    if (savedWeek) {
      const parsedWeek = parseInt(savedWeek, 10);
      if (!isNaN(parsedWeek) && parsedWeek >= 1 && parsedWeek <= 12) {
        setCurrentWeek(parsedWeek);
      }
    }
  }, []);

  if (isLoading) {
    return <div className={styles.trackerContainer} style={{ opacity: 0.5 }}>Loading checklist...</div>;
  }

  const weekProgress = progress[currentWeek];

  return (
    <div className={styles.trackerContainer}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Weekly Modality Checklist</h3>
        <button onClick={() => resetWeek(currentWeek)} className={styles.resetButton}>Reset Week</button>
      </div>
      
      <div className={styles.modalitySection}>
        <div className={styles.modalityHeader}>
          <h4>Cardiorespiratory Training</h4>
          <span className={styles.target}>(Target: 2-3x / week)</span>
        </div>
        <div className={styles.checkboxGroup}>
          {weekProgress.jump.map((isDone, idx) => (
            <label key={`jump-${idx}`} className={`${styles.checkboxLabel} ${isDone ? styles.done : ''}`}>
              <input 
                type="checkbox" 
                checked={isDone} 
                onChange={(e) => updateProgress(currentWeek, 'jump', idx, e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Session {idx + 1}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.modalitySection}>
        <div className={styles.modalityHeader}>
          <h4>Flexibility/Mobility Training</h4>
          <span className={styles.target}>(Target: 1-2x / week)</span>
        </div>
        <div className={styles.checkboxGroup}>
          {weekProgress.sit.map((isDone, idx) => (
            <label key={`sit-${idx}`} className={`${styles.checkboxLabel} ${isDone ? styles.done : ''}`}>
              <input 
                type="checkbox" 
                checked={isDone} 
                onChange={(e) => updateProgress(currentWeek, 'sit', idx, e.target.checked)}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              Session {idx + 1}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
