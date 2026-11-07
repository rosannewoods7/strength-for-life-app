'use client';

import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import styles from './WorkoutTabs.module.css';

export default function WorkoutTabs({ workouts, weekNumber }) {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const { progress, weights, isLoading, updateProgress, updateWeight } = useProgress();

  const openVideo = (url) => setSelectedVideo(url);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <div className={`${styles.container} print-workout-container`}>
      <div className={styles.tabsHeader}>
        {workouts.map((workout, index) => (
          <button
            key={workout.id}
            className={`${styles.tabButton} ${activeTab === index ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {workout.title}
          </button>
        ))}
      </div>
      
      <div className={styles.tabContent}>
        <div className={styles.prescriptionTable}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0 }}>Prescription</h3>
            {!isLoading && weekNumber && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className={styles.tableActions}>
                <button 
                  onClick={() => window.print()} 
                  className={styles.printButton}
                  title="Print or Save as PDF"
                >
                  <span style={{ marginRight: '6px' }}>🖨️</span>
                  Print Workout
                </button>
                <label className={styles.logWorkoutLabel}>
                  <input 
                    type="checkbox" 
                    checked={progress[weekNumber]?.strength[activeTab] || false}
                    onChange={(e) => updateProgress(weekNumber, 'strength', activeTab, e.target.checked)}
                    className={styles.logCheckbox}
                  />
                  <span className={styles.logCheckmark}></span>
                  Mark Complete
                </label>
              </div>
            )}
          </div>
          <table>
            <thead>
              <tr>
                <th>Demo</th>
                <th>Movement</th>
                <th>Sets</th>
                <th>Reps</th>
                <th>Weight Used</th>
                <th className={styles.notesCell}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {workouts[activeTab].exercises.map((ex, i) => {
                const workoutId = workouts[activeTab].id;
                const weightKey = `${weekNumber}-${workoutId}-${ex.name}`;
                return (
                  <tr key={i}>
                    <td className={styles.demoCell} data-label="Demo">
                      {ex.videoUrl ? (
                        <button 
                          className={styles.demoButton} 
                          title="Watch exercise demo"
                          onClick={() => openVideo(ex.videoUrl)}
                        >
                          <span className={styles.demoIcon}>▶</span>
                        </button>
                      ) : (
                        <span className={styles.demoPlaceholder} title="Demo coming soon">-</span>
                      )}
                    </td>
                    <td className={styles.movementName} data-label="Movement">{ex.name}</td>
                    <td data-label="Sets">{ex.sets}</td>
                    <td data-label="Reps">{ex.reps}</td>
                    <td data-label="Weight">
                      <input 
                        type="text" 
                        className={styles.weightInput} 
                        placeholder="e.g. 15 lbs"
                        value={weights?.[weightKey] || ''}
                        onChange={(e) => updateWeight(weekNumber, workoutId, ex.name, e.target.value)}
                        disabled={isLoading}
                      />
                    </td>
                    <td className={styles.notesCell} data-label="Notes">
                      {ex.notes
                        ? ex.notes.split('\n').map((line, lineIdx) => {
                            const colonIdx = line.indexOf(':');
                            const hasTrackLabel =
                              colonIdx > -1 &&
                              /^(Foundational|Standard|Advanced)/i.test(line.trim());
                            return (
                              <div key={lineIdx} style={{ marginBottom: lineIdx < ex.notes.split('\n').length - 1 ? '0.35rem' : 0 }}>
                                {hasTrackLabel ? (
                                  <>
                                    <strong>{line.slice(0, colonIdx + 1)}</strong>
                                    {line.slice(colonIdx + 1)}
                                  </>
                                ) : (
                                  line
                                )}
                              </div>
                            );
                          })
                        : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVideo && (
        <div className={styles.modalOverlay} onClick={closeVideo}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeVideo}>&times;</button>
            <div className={styles.iframeContainer}>
              <iframe 
                src={selectedVideo} 
                frameBorder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
