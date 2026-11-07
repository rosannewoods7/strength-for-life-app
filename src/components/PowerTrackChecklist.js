'use client';

import { useState, useEffect } from 'react';
import styles from './PowerTrackChecklist.module.css';

const TRACKS = [
  {
    id: 'foundational',
    title: 'Start with Foundational if:',
    trackName: 'FOUNDATIONAL POWER',
    subtitle: 'Low-impact • controlled • confidence-building',
    items: [
      'I have little or no recent experience with jumping or explosive exercise.',
      'I am not yet confident landing from a jump.',
      'I prefer a lower-impact option.',
      'Moving quickly while maintaining control is still challenging.',
    ],
  },
  {
    id: 'standard',
    title: 'Consider Standard if:',
    trackName: 'STANDARD POWER',
    subtitle: 'Impact • acceleration • controlled landing',
    items: [
      'I can squat and hinge confidently.',
      'I can perform a small jump and land with control.',
      'I can maintain alignment when landing.',
      'I have no current reason to avoid impact exercise.',
    ],
  },
  {
    id: 'advanced',
    title: 'Consider Advanced if:',
    trackName: 'ADVANCED POWER',
    subtitle: 'Reactive • multidirectional • higher complexity',
    items: [
      'I already perform jumps or explosive exercises confidently.',
      'I can land and decelerate under control.',
      'I have good unilateral balance and control.',
      'I am comfortable with multidirectional movement.',
    ],
  },
];

const TRAFFIC_LIGHTS = [
  {
    id: 'green',
    icon: '🟢',
    label: 'GREEN — Continue',
    bullets: [
      'Movement feels strong and controlled.',
      'Landings are quiet and stable.',
      'Speed remains consistent.',
      'No concerning symptoms.',
    ],
    action: 'Continue your selected track.',
    colorClass: 'greenCard',
  },
  {
    id: 'yellow',
    icon: '🟡',
    label: 'YELLOW — Modify',
    bullets: [
      'Landing becomes noisy or unstable.',
      'Balance deteriorates.',
      'Movement speed drops substantially.',
      'Technique changes as fatigue increases.',
    ],
    action: 'Reduce the challenge, extend recovery or move down one variation.',
    colorClass: 'yellowCard',
  },
  {
    id: 'red',
    icon: '🔴',
    label: 'RED — Stop',
    bullets: [
      'Sharp or increasing pain.',
      'Dizziness/lightheadedness.',
      'Loss of control.',
      'New or concerning joint, core, or pelvic-floor symptoms, or other unexpected symptoms.',
    ],
    action: 'Stop the exercise rather than pushing through it.',
    colorClass: 'redCard',
  },
];

const STORAGE_KEY = 'eh_week21_power_track_checklist';

export default function PowerTrackChecklist({ showChecklist = true }) {
  const [checked, setChecked] = useState({
    foundational: [false, false, false, false],
    standard: [false, false, false, false],
    advanced: [false, false, false, false],
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setChecked(JSON.parse(saved));
      }
    } catch (e) {
      // ignore storage error
    }
  }, []);

  const toggleItem = (trackId, idx) => {
    setChecked((prev) => {
      const updatedTrack = [...(prev[trackId] || [false, false, false, false])];
      updatedTrack[idx] = !updatedTrack[idx];
      const next = { ...prev, [trackId]: updatedTrack };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const getCount = (trackId) =>
    (checked[trackId] || []).filter(Boolean).length;

  const qualifiedTracks = TRACKS.filter((t) => getCount(t.id) >= 3);

  return (
    <div className={styles.wrapper}>
      {showChecklist && (
        <>
          <div className={styles.headerBlock}>
            <h3 className={styles.heading}>⚡ Choose Your Power Track</h3>
            <p className={styles.instruction}>
              Check the statements below that apply to you right now.{' '}
              <strong>
                If you answer &ldquo;yes&rdquo; to at least 3 statements in a section, that is the right level for you!
              </strong>
            </p>
          </div>

          <div className={styles.tracksGrid}>
            {TRACKS.map((track) => {
              const count = getCount(track.id);
              const isMatch = count >= 3;
              return (
                <div
                  key={track.id}
                  className={`${styles.trackCard} ${isMatch ? styles.trackCardMatched : ''}`}
                >
                  <div className={styles.trackHeader}>
                    <div>
                      <h4 className={styles.trackTitle}>{track.title}</h4>
                      <span className={styles.trackSubtitle}>{track.subtitle}</span>
                    </div>
                    <span
                      className={`${styles.countBadge} ${
                        isMatch ? styles.countBadgeMatched : ''
                      }`}
                    >
                      {count} / 4 Yes
                    </span>
                  </div>

                  <ul className={styles.checkList}>
                    {track.items.map((itemText, idx) => {
                      const isChecked = !!checked[track.id]?.[idx];
                      return (
                        <li key={idx}>
                          <label className={styles.checkLabel}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItem(track.id, idx)}
                              className={styles.checkbox}
                            />
                            <span>{itemText}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>

                  {isMatch && (
                    <div className={styles.matchBanner}>
                      ✓ Recommended Level: <strong>{track.trackName}</strong> (3+ Yes)
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {qualifiedTracks.length > 0 && (
            <div className={styles.summaryResult}>
              🎯 Based on your selections (3+ Yes), your recommended starting track is:{' '}
              <strong>
                {qualifiedTracks.map((t) => t.trackName).join(' or ')}
              </strong>
              . (Remember, you can also mix levels for different exercises!)
            </div>
          )}

          <p className={styles.footerNote}>
            <em>
              Choose the variation that allows you to move quickly and confidently with excellent control. The goal is not to reach the Advanced track. The goal is to train power at the level that is right for you.
            </em>
          </p>

          <hr className={styles.sectionDivider} />
        </>
      )}

      {/* Traffic Light Self-Check System */}
      <div className={styles.trafficSection}>
        <h3 className={styles.heading}>🚦 Power Check-In: The Traffic Light System</h3>
        <p className={styles.instruction}>
          Use this simple check-in during your power sets to know when to continue, modify, or stop:
        </p>

        <div className={styles.trafficGrid}>
          {TRAFFIC_LIGHTS.map((light) => (
            <div
              key={light.id}
              className={`${styles.trafficCard} ${styles[light.colorClass]}`}
            >
              <div className={styles.trafficHeader}>
                <span className={styles.trafficIcon}>{light.icon}</span>
                <h4 className={styles.trafficTitle}>{light.label}</h4>
              </div>
              <ul className={styles.trafficList}>
                {light.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className={styles.trafficAction}>
                <strong>{light.action}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
