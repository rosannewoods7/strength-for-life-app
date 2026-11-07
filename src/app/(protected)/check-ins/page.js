'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function CheckInsPage() {
  const meetingLink = "https://meet.google.com/kzh-dqqi-rke";
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem('elevateHerCheckInNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    localStorage.setItem('elevateHerCheckInNotes', e.target.value);
  };
  
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Live Check-Ins</h1>
        <p className={styles.subtitle}>
          Join me for our live community coaching sessions. This is your time to ask questions, share wins, and get personalized support on your journey.
        </p>
      </header>

      <div className={styles.scheduleSection}>
        <h3>📅 Upcoming Schedule</h3>
        <div className={styles.scheduleList}>
          <div className={styles.scheduleItem}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className={styles.dateIcon}>✨</span>
              <div>
                <strong>Next Live Community Check-In: TBA</strong>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-muted-plum)', marginTop: '0.2rem' }}>
                  Upcoming dates will be announced inside the app and by email. In the meantime, use the chat bubble in the bottom corner anytime you have a question!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.notepadSection}>
        <h3>📝 My Questions & Notes</h3>
        <p>Jot down any questions you have here so you remember to ask them during our next live call!</p>
        <textarea 
          className={styles.notepad}
          placeholder="e.g., How do I know if I'm using the right weight for squats?"
          value={notes}
          onChange={handleNotesChange}
        />
      </div>
    </div>
  );
}
