'use client';

import { useState, useEffect } from 'react';
import styles from './WeeklyChallengeCard.module.css';

export default function WeeklyChallengeCard({ challenges, weekNumber }) {
  // Use state to track checked status
  const [checkedItems, setCheckedItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved progress for the current week
  useEffect(() => {
    if (!weekNumber) return;
    const saved = localStorage.getItem(`eh_challenge_week_${weekNumber}`);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved challenges", e);
      }
    } else {
      setCheckedItems({});
    }
    setIsLoaded(true);
  }, [weekNumber]);

  // Handle checking/unchecking a challenge
  const handleCheck = (index) => {
    const newChecked = {
      ...checkedItems,
      [index]: !checkedItems[index]
    };
    setCheckedItems(newChecked);
    if (weekNumber) {
      localStorage.setItem(`eh_challenge_week_${weekNumber}`, JSON.stringify(newChecked));
    }
  };

  if (!challenges || challenges.length === 0) {
    return null;
  }

  return (
    <div className={styles.challengeCard}>
      <h3>🎯 Weekly Challenge</h3>
      <ul className={styles.challengeList}>
        {challenges.map((challenge, index) => (
          <li key={index}>
            <label className={styles.challengeItem}>
              <input 
                type="checkbox" 
                className={styles.challengeCheckbox} 
                checked={isLoaded ? !!checkedItems[index] : false}
                onChange={() => handleCheck(index)}
              />
              <span>{challenge}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
