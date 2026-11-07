'use client';

import { useState } from 'react';
import styles from '@/app/(protected)/vault/page.module.css';

export default function ReadinessAudit() {
  const [scores, setScores] = useState({
    sleep: null,
    tissue: null,
    stress: null
  });

  const handleSelect = (category, value) => {
    setScores(prev => ({ ...prev, [category]: value }));
  };

  const calculateTotal = () => {
    if (scores.sleep && scores.tissue && scores.stress) {
      return scores.sleep + scores.tissue + scores.stress;
    }
    return null;
  };

  const totalScore = calculateTotal();

  const getResult = () => {
    if (!totalScore) return null;
    
    if (totalScore >= 8) {
      return {
        light: 'Green Light',
        color: '#2e7d32',
        title: 'Optimal Readiness',
        description: 'Your recovery architecture has successfully restored homeostasis. Your central nervous system is primed for the application of mechanical tension.',
        action: 'Execute your scheduled workout. Proceed with progressive overload and confidently push toward an RPE of 8.'
      };
    } else if (totalScore >= 5) {
      return {
        light: 'Yellow Light',
        color: '#f57f17',
        title: 'Moderate Fatigue',
        description: 'Your recovery capacity is slightly compromised. Cumulative life and physiological stress alters your daily adaptation threshold.',
        action: 'Execute your scheduled workout but cap your intensity at an RPE of 6–7. Do not attempt to increase your weights today. Alternatively, reduce your total workout volume by removing one set from every exercise.'
      };
    } else {
      return {
        light: 'Red Light',
        color: '#c62828',
        title: 'Preservation Mode',
        description: 'Your physiological stress burden is too high. Applying mechanical tension today converts adaptive training into cumulative stress.',
        action: 'Do not lift heavy weights today. Swap your scheduled lifting session for the 10-Minute Connective Tissue Protocol or a gentle walk. Protect your cortisol levels and prioritize sleep tonight.'
      };
    }
  };

  const result = getResult();

  const resetQuiz = () => {
    setScores({ sleep: null, tissue: null, stress: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.auditContainer}>
      <div className={styles.auditHeader}>
        <h2>The Strength for Life Daily Readiness Audit</h2>
        <p>Before every training session, rate your current state across these three biological markers to determine your optimal training intensity for the day.</p>
      </div>

      <div className={styles.questionBlock}>
        <h3>1. Sleep Architecture & Systemic Energy</h3>
        <p className={styles.questionSubtext}>How restorative was your sleep?</p>
        <div className={styles.optionsGrid}>
          <button 
            className={`${styles.optionButton} ${scores.sleep === 3 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('sleep', 3)}
          >
            <strong>3 Points</strong>
            <span>I slept 7–9 hours, woke up feeling restored, and my energy is stable.</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.sleep === 2 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('sleep', 2)}
          >
            <strong>2 Points</strong>
            <span>My sleep was interrupted, or I got less than 7 hours, but my energy is functional.</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.sleep === 1 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('sleep', 1)}
          >
            <strong>1 Point</strong>
            <span>I had severe sleep disruption, felt deeply fatigued, or am relying heavily on caffeine.</span>
          </button>
        </div>
      </div>

      <div className={styles.questionBlock}>
        <h3>2. Connective Tissue & Muscular Fatigue</h3>
        <p className={styles.questionSubtext}>How do your joints and muscles feel today?</p>
        <div className={styles.optionsGrid}>
          <button 
            className={`${styles.optionButton} ${scores.tissue === 3 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('tissue', 3)}
          >
            <strong>3 Points</strong>
            <span>My joints feel mobile, and I have zero delayed onset muscle soreness (DOMS).</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.tissue === 2 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('tissue', 2)}
          >
            <strong>2 Points</strong>
            <span>I have mild muscle soreness or slight morning joint stiffness, but it improves as I move.</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.tissue === 1 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('tissue', 1)}
          >
            <strong>1 Point</strong>
            <span>I have acute joint pain, localized tendon ache, or heavy, lingering muscle soreness.</span>
          </button>
        </div>
      </div>

      <div className={styles.questionBlock}>
        <h3>3. Psychophysiological Stress Load</h3>
        <p className={styles.questionSubtext}>What is the current demand on your central nervous system?</p>
        <div className={styles.optionsGrid}>
          <button 
            className={`${styles.optionButton} ${scores.stress === 3 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('stress', 3)}
          >
            <strong>3 Points</strong>
            <span>My life stress is well-managed, and I feel mentally focused and ready to apply effort.</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.stress === 2 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('stress', 2)}
          >
            <strong>2 Points</strong>
            <span>I am dealing with moderate professional or family stress, feeling slightly overwhelmed but capable.</span>
          </button>
          <button 
            className={`${styles.optionButton} ${scores.stress === 1 ? styles.selectedOption : ''}`}
            onClick={() => handleSelect('stress', 1)}
          >
            <strong>1 Point</strong>
            <span>My stress load is exceptionally high (caregiving demands, work crisis, burnout), and my mental bandwidth is depleted.</span>
          </button>
        </div>
      </div>

      {result && (
        <div className={styles.resultContainer} style={{ borderTopColor: result.color }}>
          <div className={styles.resultScore}>
            Total Score: {totalScore} / 9
          </div>
          <h2 style={{ color: result.color }}>{result.light}: {result.title}</h2>
          <p className={styles.resultDescription}>{result.description}</p>
          <div className={styles.actionBox} style={{ backgroundColor: `${result.color}15`, borderLeft: `4px solid ${result.color}` }}>
            <strong style={{ color: result.color }}>Action:</strong> {result.action}
          </div>
          <button className={styles.resetButton} onClick={resetQuiz}>Start Over</button>
        </div>
      )}
    </div>
  );
}
