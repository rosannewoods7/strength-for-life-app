'use client';

import { useState } from 'react';
import styles from './HabitChecklist.module.css';

export default function HabitChecklist({ habits }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleHabit = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const progress = Math.round((Object.values(checkedItems).filter(Boolean).length / habits.length) * 100) || 0;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Daily Non-Negotiables</h3>
        <span className={styles.progressText}>{progress}% Complete</span>
      </div>
      
      <div className={styles.progressBarWrapper}>
        <div 
          className={styles.progressBarFill} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <ul className={styles.habitList}>
        {habits.map((habit, index) => (
          <li 
            key={index} 
            className={`${styles.habitItem} ${checkedItems[index] ? styles.completed : ''}`}
            onClick={() => toggleHabit(index)}
          >
            <div className={styles.checkbox}>
              {checkedItems[index] && <span className={styles.checkmark}>&#10003;</span>}
            </div>
            <span className={styles.habitText}>{habit}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
