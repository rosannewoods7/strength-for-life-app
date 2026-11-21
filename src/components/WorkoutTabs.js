'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProgress } from '@/hooks/useProgress';
import {
  getMachineWorkoutsForWeek,
  getHomeWorkoutsForWeek,
} from '@/lib/workoutData';
import styles from './WorkoutTabs.module.css';

export default function WorkoutTabs({
  workouts,
  machineWorkouts = null,
  homeWorkouts = null,
  weekNumber = 1,
  initialTab = 0,
  fullPage = false,
  isCustomized = false,
  defaultTrack = 'free_weights',
  trackMode = 'both', // 'both' | 'free_weights_only' | 'machines_only' | 'home_only'
}) {
  const resolvedMachineWorkouts =
    machineWorkouts || getMachineWorkoutsForWeek(weekNumber);
  const resolvedHomeWorkouts =
    homeWorkouts || getHomeWorkoutsForWeek(weekNumber);

  const initialTrackState =
    trackMode === 'machines_only'
      ? 'machines'
      : trackMode === 'home_only'
      ? 'home'
      : trackMode === 'free_weights_only'
      ? 'free_weights'
      : defaultTrack || 'free_weights';

  const [selectedTrack, setSelectedTrack] = useState(initialTrackState);

  useEffect(() => {
    if (trackMode === 'machines_only') {
      setSelectedTrack('machines');
      return;
    }
    if (trackMode === 'home_only') {
      setSelectedTrack('home');
      return;
    }
    if (trackMode === 'free_weights_only') {
      setSelectedTrack('free_weights');
      return;
    }
    try {
      const savedTrack = localStorage.getItem('sfl_workout_track');
      if (
        savedTrack === 'machines' ||
        savedTrack === 'home' ||
        savedTrack === 'free_weights'
      ) {
        setSelectedTrack(savedTrack);
      } else if (defaultTrack) {
        setSelectedTrack(defaultTrack);
      }
    } catch {
      // ignore localStorage errors
    }
  }, [trackMode, defaultTrack]);

  const handleTrackSwitch = (newTrack) => {
    setSelectedTrack(newTrack);
    try {
      localStorage.setItem('sfl_workout_track', newTrack);
    } catch {
      // ignore
    }
  };

  const activeWorkoutsList =
    selectedTrack === 'machines' && resolvedMachineWorkouts?.length > 0
      ? resolvedMachineWorkouts
      : selectedTrack === 'home' && resolvedHomeWorkouts?.length > 0
      ? resolvedHomeWorkouts
      : workouts;

  const safeInitialTab =
    initialTab >= 0 && initialTab < activeWorkoutsList.length ? initialTab : 0;
  const [activeTab, setActiveTab] = useState(safeInitialTab);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {
    progress,
    weights,
    exerciseNotes,
    isLoading,
    updateProgress,
    updateWeight,
    updateExerciseNote,
  } = useProgress();

  const openVideo = (url) => setSelectedVideo(url);
  const closeVideo = () => setSelectedVideo(null);

  const currentWorkout =
    activeWorkoutsList[activeTab] || activeWorkoutsList[0];

  return (
    <div className={`${styles.container} print-workout-container`}>
      {/* Track Toggle Bar (shown when trackMode === 'both') */}
      {trackMode === 'both' && resolvedMachineWorkouts?.length > 0 && (
        <div className={styles.trackToggleBar}>
          <span className={styles.trackToggleLabel}>
            Choose Workout Version:
          </span>
          <div className={styles.trackTogglePills}>
            <button
              type="button"
              className={`${styles.trackPill} ${
                selectedTrack === 'free_weights' ||
                (weekNumber <= 12 && selectedTrack === 'home')
                  ? styles.trackPillActive
                  : ''
              }`}
              onClick={() => handleTrackSwitch('free_weights')}
            >
              {weekNumber >= 13
                ? '🏋️ Gym Free Weights & Cables'
                : '🏋️🏠 Dumbbells & Free Weights (Home or Gym)'}
            </button>
            {weekNumber >= 13 && resolvedHomeWorkouts?.length > 0 && (
              <button
                type="button"
                className={`${styles.trackPill} ${
                  selectedTrack === 'home' ? styles.trackPillActive : ''
                }`}
                onClick={() => handleTrackSwitch('home')}
              >
                🏠 Home (Dumbbells &amp; Bench)
              </button>
            )}
            <button
              type="button"
              className={`${styles.trackPill} ${
                selectedTrack === 'machines' ? styles.trackPillActive : ''
              }`}
              onClick={() => handleTrackSwitch('machines')}
            >
              ⚙️ Gym Machines (Joint-Friendly)
            </button>
          </div>
        </div>
      )}

      <div className={styles.tabsHeader}>
        {activeWorkoutsList.map((workout, index) => (
          <button
            key={workout.id}
            className={`${styles.tabButton} ${
              activeTab === index ? styles.activeTab : ''
            }`}
            onClick={() => setActiveTab(index)}
          >
            {workout.title}
          </button>
        ))}
      </div>

      <div className={styles.tabContent}>
        <div className={styles.prescriptionTable}>
          <div className={styles.topActionBar}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                flexWrap: 'wrap',
              }}
            >
              <h3 style={{ margin: 0 }}>{currentWorkout?.title}</h3>
              {selectedTrack === 'machines' && (
                <span className={styles.machineModeBadge}>
                  ⚙️ Machine-Based Track (Straight Sets A, B, C...)
                </span>
              )}
              {selectedTrack === 'home' && weekNumber >= 13 && (
                <span className={styles.homeModeBadge}>
                  🏠 Home Track (Dumbbells &amp; Bench Only)
                </span>
              )}
              {isCustomized && (
                <span
                  style={{
                    backgroundColor: '#fef3c7',
                    color: '#92400e',
                    border: '1px solid #f59e0b',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '999px',
                  }}
                >
                  ✨ Personalized Plan
                </span>
              )}
            </div>
            {!isLoading && weekNumber && (
              <div className={styles.tableActions}>
                {!fullPage && (
                  <Link
                    href={`/program/week-${weekNumber}/workout?tab=${activeTab}`}
                    className={styles.openPageButton}
                  >
                    <span>📱</span> Open Workout View &rarr;
                  </Link>
                )}
                <button
                  onClick={() => window.print()}
                  className={styles.printButton}
                  title="Print or Save as PDF"
                >
                  <span style={{ marginRight: '6px' }}>🖨️</span>
                  Print
                </button>
                <label className={styles.logWorkoutLabel}>
                  <input
                    type="checkbox"
                    checked={progress[weekNumber]?.strength[activeTab] || false}
                    onChange={(e) =>
                      updateProgress(
                        weekNumber,
                        'strength',
                        activeTab,
                        e.target.checked
                      )
                    }
                    className={styles.logCheckbox}
                  />
                  <span className={styles.logCheckmark}></span>
                  Mark Complete
                </label>
              </div>
            )}
          </div>

          {selectedTrack === 'machines' && (
            <div className={styles.machineTrackNotice}>
              <strong>Gym Etiquette &amp; Flow:</strong> Complete all sets on each machine (<strong>A, B, C, D...</strong>) before moving to the next machine so you don&apos;t lose your spot.
            </div>
          )}

          {selectedTrack === 'home' && weekNumber >= 13 && (
            <div className={styles.homeTrackNotice}>
              <strong>🏠 Home Workout Version:</strong> All exercises in this track use only <strong>dumbbells and a bench</strong> — no cable machines, leg press, or cardio machines required.
            </div>
          )}

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
              {currentWorkout?.exercises?.map((ex, i) => {
                const workoutId = currentWorkout.id;
                const weightKey = `${weekNumber}-${workoutId}-${ex.name}`;
                const orderLetter = ex.label || String.fromCharCode(65 + i);
                return (
                  <tr key={i} className={styles.exerciseRow}>
                    <td
                      className={`${styles.demoCell} ${
                        !ex.videoUrl ? styles.demoCellEmpty : ''
                      }`}
                      data-label="Demo"
                    >
                      {ex.videoUrl ? (
                        <div
                          style={{
                            display: 'inline-flex',
                            gap: '4px',
                            alignItems: 'center',
                          }}
                        >
                          <button
                            className={styles.demoButton}
                            title="Watch exercise demo"
                            onClick={() => openVideo(ex.videoUrl)}
                          >
                            <span className={styles.demoIcon}>▶</span>
                          </button>
                          {ex.secondaryVideoUrl && (
                            <button
                              className={styles.demoButton}
                              title="Watch alternate variation demo"
                              onClick={() => openVideo(ex.secondaryVideoUrl)}
                            >
                              <span className={styles.demoIcon}>▶</span>
                            </button>
                          )}
                        </div>
                      ) : null}
                    </td>
                    <td className={styles.movementName} data-label="Movement">
                      <div className={styles.movementHeaderMobile}>
                        <span className={styles.movementTitleText}>
                          <span className={styles.exerciseOrderLetter}>
                            {orderLetter}
                          </span>
                          {ex.name}
                        </span>
                        <span className={styles.mobilePrescriptionBadge}>
                          {ex.sets} Sets &times; {ex.reps}
                          {/^\d+(?:-\d+)?$/.test(String(ex.reps).trim())
                            ? ' Reps'
                            : ''}
                        </span>
                      </div>
                    </td>
                    <td className={styles.setsCell} data-label="Sets">
                      {ex.sets}
                    </td>
                    <td className={styles.repsCell} data-label="Reps">
                      {ex.reps}
                    </td>
                    <td className={styles.weightCell} data-label="Weight">
                      <input
                        type="text"
                        className={styles.weightInput}
                        placeholder="e.g. 15 lbs"
                        value={weights?.[weightKey] || ''}
                        onChange={(e) =>
                          updateWeight(
                            weekNumber,
                            workoutId,
                            ex.name,
                            e.target.value
                          )
                        }
                        disabled={isLoading}
                      />
                    </td>
                    <td className={styles.notesCell} data-label="Notes">
                      {ex.notes ? (
                        <div className={styles.coachCueText}>
                          {ex.notes.split('\n').map((line, lineIdx) => {
                            const colonIdx = line.indexOf(':');
                            const hasTrackLabel =
                              colonIdx > -1 &&
                              /^(Foundational|Standard|Advanced)/i.test(
                                line.trim()
                              );
                            return (
                              <div
                                key={lineIdx}
                                style={{
                                  marginBottom:
                                    lineIdx < ex.notes.split('\n').length - 1
                                      ? '0.25rem'
                                      : 0,
                                }}
                              >
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
                          })}
                        </div>
                      ) : null}
                      <input
                        type="text"
                        className={styles.userNoteInput}
                        placeholder="+ Add personal note..."
                        value={exerciseNotes?.[weightKey] || ''}
                        onChange={(e) =>
                          updateExerciseNote(
                            weekNumber,
                            workoutId,
                            ex.name,
                            e.target.value
                          )
                        }
                        disabled={isLoading}
                      />
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
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={closeVideo}>
              &times;
            </button>
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
