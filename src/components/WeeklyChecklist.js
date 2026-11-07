'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './WeeklyChecklist.module.css';

export default function WeeklyChecklist({ weekNumber, totalWeeks = 12 }) {
  const router = useRouter();
  const storageKey = `eh_week_${weekNumber}_progress`;
  
  const initialTasks = {
    'Workout A': null,
    'Workout B': null,
    'Workout C': null,
    'Active Recovery 1': null,
    'Active Recovery 2': null,
    'Rest Day 1': null,
    'Rest Day 2': null,
  };

  const [tasks, setTasks] = useState(initialTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setTasks({ ...initialTasks, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
    setIsLoaded(true);
  }, [storageKey]);

  const updateTask = (taskName, status) => {
    const updated = { ...tasks, [taskName]: status };
    setTasks(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  const allCompleted = Object.values(tasks).every((status) => status !== null);
  const isFinalWeek = weekNumber === totalWeeks;

  const handleUnlockNextWeek = () => {
    if (isFinalWeek) return;
    
    const nextWeek = weekNumber + 1;
    const currentMaxWeek = parseInt(localStorage.getItem('eh_current_week') || '1', 10);
    
    if (nextWeek > currentMaxWeek) {
      localStorage.setItem('eh_current_week', nextWeek.toString());
    }
    
    // Redirect to the new week
    router.push(`/program/${nextWeek}`);
  };

  if (!isLoaded) return null;

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Weekly Accountability Checklist</h3>
      <p className={styles.subtitle}>Check off all required days below to unlock the next week of your program.</p>
      
      <div className={styles.taskList}>
        {Object.entries(tasks).map(([taskName, status]) => {
          const isWorkout = taskName.includes('Workout');
          
          return (
            <div key={taskName} className={`${styles.taskItem} ${status ? styles.completed : ''}`}>
              <div className={styles.taskInfo}>
                <span className={styles.taskName}>{taskName}</span>
                {status && (
                  <span className={`${styles.badge} ${status === 'skipped' ? styles.skippedBadge : styles.completedBadge}`}>
                    {status === 'skipped' ? 'Skipped' : 'Completed'}
                  </span>
                )}
              </div>
              
              <div className={styles.actions}>
                {/* Complete Button */}
                <button 
                  className={`${styles.actionBtn} ${status === 'completed' ? styles.activeBtn : ''}`}
                  onClick={() => updateTask(taskName, status === 'completed' ? null : 'completed')}
                >
                  ✓ {status === 'completed' ? 'Done' : 'Complete'}
                </button>
                
                {/* Skip Button (only for workouts) */}
                {isWorkout && (
                  <button 
                    className={`${styles.skipBtn} ${status === 'skipped' ? styles.activeSkipBtn : ''}`}
                    onClick={() => updateTask(taskName, status === 'skipped' ? null : 'skipped')}
                  >
                    ⏭ {status === 'skipped' ? 'Skipped' : 'Skip'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {allCompleted && (
        <div className={styles.completionBanner}>
          <h4>🎉 Week {weekNumber} Complete!</h4>
          {!isFinalWeek ? (
            <button className={styles.unlockBtn} onClick={handleUnlockNextWeek}>
              Unlock Week {weekNumber + 1}
            </button>
          ) : (
            <p>Congratulations! You have completed the 12-week program!</p>
          )}
        </div>
      )}
    </div>
  );
}
