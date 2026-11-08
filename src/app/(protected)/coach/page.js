'use client';

import { useState, useEffect } from 'react';
import { getWorkoutsForWeek, EXERCISE_VIDEO_LIBRARY } from '@/lib/workoutData';
import styles from './page.module.css';

function getPhaseWeeks(weekNum) {
  const phaseStart = Math.floor((weekNum - 1) / 4) * 4 + 1;
  return [phaseStart, phaseStart + 1, phaseStart + 2, phaseStart + 3];
}

export default function CoachPortalPage() {
  const [members, setMembers] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [editableWorkouts, setEditableWorkouts] = useState(() =>
    JSON.parse(JSON.stringify(getWorkoutsForWeek(1)))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Load initial roster of members
  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      try {
        const res = await fetch('/api/coach/member-workouts');
        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || 'Could not load members.');
        } else {
          setMembers(data.members || []);
        }
      } catch (err) {
        setErrorMsg('Network error loading Coach Portal.');
      } finally {
        setLoading(false);
      }
    }
    fetchMembers();
  }, []);

  // Sync editableWorkouts whenever selectedMember or selectedWeek changes
  useEffect(() => {
    const customForWeek = selectedMember?.customWorkouts?.[selectedWeek];
    const sourceWorkouts = getWorkoutsForWeek(
      selectedWeek,
      customForWeek ? { [selectedWeek]: customForWeek } : null
    );
    setEditableWorkouts(JSON.parse(JSON.stringify(sourceWorkouts)));
    setActiveTab(0);
  }, [selectedMember, selectedWeek]);

  const handleLookupByEmail = async (targetEmail) => {
    const emailToLoad = (targetEmail ?? emailInput).trim().toLowerCase();
    if (!emailToLoad) return;

    setLoading(true);
    setErrorMsg(null);
    setStatusMsg(null);
    try {
      const res = await fetch(
        `/api/coach/member-workouts?email=${encodeURIComponent(emailToLoad)}`
      );
      const data = await res.json();
      if (data.members) {
        setMembers(data.members);
      }
      if (!res.ok) {
        setErrorMsg(data.error || 'Member not found.');
      } else if (data.member) {
        setSelectedMember(data.member);
        setEmailInput(data.member.email);
      }
    } catch (err) {
      setErrorMsg('Network error looking up member.');
    } finally {
      setLoading(false);
    }
  };

  const handleWorkoutTitleChange = (value) => {
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeTab].title = value;
      return next;
    });
  };

  const handleExerciseFieldChange = (exIndex, field, value) => {
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeTab].exercises[exIndex][field] = value;
      return next;
    });
  };

  const handleSelectLibraryExercise = (exIndex, libraryName) => {
    if (!libraryName) return;
    const found = EXERCISE_VIDEO_LIBRARY.find((item) => item.name === libraryName);
    if (!found) return;
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeTab].exercises[exIndex].name = found.name;
      next[activeTab].exercises[exIndex].videoUrl = found.videoUrl;
      return next;
    });
  };

  const handleMoveExercise = (exIndex, direction) => {
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      const list = next[activeTab].exercises;
      const targetIndex = exIndex + direction;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const temp = list[exIndex];
      list[exIndex] = list[targetIndex];
      list[targetIndex] = temp;
      return next;
    });
  };

  const handleRemoveExercise = (exIndex) => {
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeTab].exercises.splice(exIndex, 1);
      return next;
    });
  };

  const handleAddExercise = () => {
    setEditableWorkouts((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeTab].exercises.push({
        name: 'New Custom Exercise',
        sets: '3',
        reps: '10-12',
        notes: 'Focus on controlled tempo and pain-free range of motion.',
        videoUrl: '',
      });
      return next;
    });
  };

  const handleSaveWorkouts = async (weeksToUpdate, resetToDefault = false) => {
    if (!selectedMember?.email) return;
    setSaving(true);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/coach/member-workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedMember.email,
          weeks: weeksToUpdate,
          workouts: editableWorkouts,
          reset: resetToDefault,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to save custom workouts.');
      } else {
        setSelectedMember(data.member);
        setMembers((prev) =>
          prev.map((m) => (m.id === data.member.id ? data.member : m))
        );
        if (resetToDefault) {
          setStatusMsg(
            `Reset Week ${weeksToUpdate.join(', ')} back to the standard program for ${data.member.email}.`
          );
        } else {
          setStatusMsg(
            `Saved custom workouts for Week${weeksToUpdate.length > 1 ? 's' : ''} ${weeksToUpdate.join(', ')} for ${data.member.email}!`
          );
        }
      }
    } catch (err) {
      setErrorMsg('Network error saving custom workouts.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFullAccess = async (grantFull) => {
    if (!selectedMember?.email) return;
    setSaving(true);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/coach/member-workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedMember.email,
          grantFullAccess: grantFull,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not update member access.');
      } else {
        setSelectedMember(data.member);
        setMembers((prev) =>
          prev.map((m) => (m.id === data.member.id ? data.member : m))
        );
        setStatusMsg(
          grantFull
            ? `Granted Full 12-Week Access to ${data.member.email}!`
            : `Switched ${data.member.email} to Trial access.`
        );
      }
    } catch (err) {
      setErrorMsg('Network error updating member access.');
    } finally {
      setSaving(false);
    }
  };

  const phaseWeeks = getPhaseWeeks(selectedWeek);
  const currentWorkout = editableWorkouts[activeTab] || editableWorkouts[0];
  const isCurrentWeekCustomized = Boolean(
    selectedMember?.customizedWeeks?.includes(selectedWeek)
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.adminBadge}>COACH PORTAL • ADMIN ONLY</div>
        <h1 className={styles.title}>Member Workout Customizer</h1>
        <p className={styles.subtitle}>
          Look up any member by email address to personalize their exercises, sets, reps, coaching cues, or demo videos for any week or phase.
        </p>
      </header>

      {errorMsg && <div className={styles.errorBanner}>{errorMsg}</div>}
      {statusMsg && <div className={styles.successBanner}>{statusMsg}</div>}

      {/* STEP 1: FIND OR SELECT MEMBER */}
      <section className={styles.card}>
        <h2 className={styles.cardTitle}>1. Select or Search Member by Email</h2>
        <form
          className={styles.searchRow}
          onSubmit={(e) => {
            e.preventDefault();
            handleLookupByEmail(emailInput);
          }}
        >
          <input
            type="email"
            className={styles.emailInput}
            placeholder="Enter member's email address (e.g. client@example.com)..."
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <button
            type="submit"
            className={styles.primaryBtn}
            disabled={loading || !emailInput.trim()}
          >
            {loading ? 'Loading...' : 'Load Member'}
          </button>
        </form>

        {members.length > 0 && (
          <div className={styles.rosterSection}>
            <div className={styles.rosterLabel}>
              Or click a registered member below ({members.length} total):
            </div>
            <div className={styles.memberPills}>
              {members.map((m) => {
                const isSelected = selectedMember?.email === m.email;
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`${styles.memberPill} ${
                      isSelected ? styles.memberPillActive : ''
                    }`}
                    onClick={() => handleLookupByEmail(m.email)}
                  >
                    <span className={styles.pillName}>
                      {m.firstName ? `${m.firstName} (${m.email})` : m.email}
                    </span>
                    <span
                      className={
                        m.hasFullAccess ? styles.badgeFull : styles.badgeTrial
                      }
                    >
                      {m.hasFullAccess ? 'Full Access' : '7-Day Trial'}
                    </span>
                    {m.customizedWeeks?.length > 0 && (
                      <span className={styles.badgeCustom}>
                        ✨ {m.customizedWeeks.length} wk
                        {m.customizedWeeks.length > 1 ? 's' : ''} custom
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* STEP 2 & 3: CUSTOMIZE WORKOUTS FOR SELECTED MEMBER */}
      {selectedMember && (
        <>
          <section className={styles.memberSummaryCard}>
            <div className={styles.memberSummaryInfo}>
              <h3>
                Editing Workouts For:{' '}
                <span>
                  {selectedMember.firstName
                    ? `${selectedMember.firstName} — `
                    : ''}
                  {selectedMember.email}
                </span>
              </h3>
              <p>
                Status:{' '}
                <strong>
                  {selectedMember.hasFullAccess
                    ? 'Full 12-Week Program Access'
                    : `7-Day Free Trial (${selectedMember.daysRemaining} days left)`}
                </strong>
                {selectedMember.customizedWeeks?.length > 0 && (
                  <>
                    {' '}
                    • Customized Weeks:{' '}
                    <strong>
                      Weeks {selectedMember.customizedWeeks.join(', ')}
                    </strong>
                  </>
                )}
              </p>
            </div>
            <div>
              {!selectedMember.hasFullAccess && (
                <button
                  type="button"
                  className={styles.grantAccessBtn}
                  onClick={() => handleToggleFullAccess(true)}
                  disabled={saving}
                >
                  🔓 Grant Full 12-Week Access
                </button>
              )}
            </div>
          </section>

          <section className={styles.card}>
            <div className={styles.weekSelectorHeader}>
              <div>
                <h2 className={styles.cardTitle}>2. Choose Week &amp; Workout</h2>
                <p className={styles.helperText}>
                  Weeks with a gold star (✨) have custom workouts saved for this member.
                </p>
              </div>
              {isCurrentWeekCustomized && (
                <span className={styles.customActiveTag}>
                  ✨ Week {selectedWeek} has custom modifications
                </span>
              )}
            </div>

            <div className={styles.weekGrid}>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((wk) => {
                const hasCustom = selectedMember.customizedWeeks?.includes(wk);
                return (
                  <button
                    key={wk}
                    type="button"
                    className={`${styles.weekBtn} ${
                      selectedWeek === wk ? styles.weekBtnActive : ''
                    } ${hasCustom ? styles.weekBtnCustom : ''}`}
                    onClick={() => setSelectedWeek(wk)}
                  >
                    Week {wk} {hasCustom ? '✨' : ''}
                  </button>
                );
              })}
            </div>

            {/* Workout A / B / C Tabs */}
            <div className={styles.workoutTabsRow}>
              {editableWorkouts.map((w, idx) => (
                <button
                  key={w.id}
                  type="button"
                  className={`${styles.workoutTabBtn} ${
                    activeTab === idx ? styles.workoutTabBtnActive : ''
                  }`}
                  onClick={() => setActiveTab(idx)}
                >
                  {w.title}
                </button>
              ))}
            </div>

            {/* Workout Title Input */}
            <div className={styles.workoutTitleEditRow}>
              <label>Workout Title:</label>
              <input
                type="text"
                className={styles.textInput}
                value={currentWorkout?.title || ''}
                onChange={(e) => handleWorkoutTitleChange(e.target.value)}
              />
            </div>

            {/* Exercises List Editor */}
            <div className={styles.exercisesList}>
              {currentWorkout?.exercises?.map((ex, idx) => {
                const logKey = `${selectedWeek}-${currentWorkout.id}-${ex.name}`;
                const memberWeight = selectedMember.weights?.[logKey];
                const memberNote = selectedMember.exerciseNotes?.[logKey];

                return (
                  <div key={idx} className={styles.exerciseEditorCard}>
                    <div className={styles.exerciseCardTop}>
                      <span className={styles.exerciseNumberBadge}>
                        Exercise #{idx + 1}
                      </span>
                      <div className={styles.exerciseOrderBtns}>
                        <button
                          type="button"
                          className={styles.smallIconBtn}
                          onClick={() => handleMoveExercise(idx, -1)}
                          disabled={idx === 0}
                          title="Move Up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className={styles.smallIconBtn}
                          onClick={() => handleMoveExercise(idx, 1)}
                          disabled={idx === currentWorkout.exercises.length - 1}
                          title="Move Down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          className={`${styles.smallIconBtn} ${styles.deleteBtn}`}
                          onClick={() => handleRemoveExercise(idx)}
                          title="Remove Exercise"
                        >
                          🗑️ Remove
                        </button>
                      </div>
                    </div>

                    <div className={styles.exerciseFieldsGrid}>
                      <div className={styles.fieldGroupWide}>
                        <label>Movement Name</label>
                        <input
                          type="text"
                          className={styles.textInput}
                          value={ex.name}
                          onChange={(e) =>
                            handleExerciseFieldChange(idx, 'name', e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label>Quick-Swap from Video Library</label>
                        <select
                          className={styles.selectInput}
                          value=""
                          onChange={(e) =>
                            handleSelectLibraryExercise(idx, e.target.value)
                          }
                        >
                          <option value="">-- Swap with library exercise --</option>
                          {EXERCISE_VIDEO_LIBRARY.map((libEx) => (
                            <option key={libEx.name} value={libEx.name}>
                              {libEx.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className={styles.fieldGroupSmall}>
                        <label>Sets</label>
                        <input
                          type="text"
                          className={styles.textInput}
                          value={ex.sets}
                          onChange={(e) =>
                            handleExerciseFieldChange(idx, 'sets', e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.fieldGroupSmall}>
                        <label>Reps / Time</label>
                        <input
                          type="text"
                          className={styles.textInput}
                          value={ex.reps}
                          onChange={(e) =>
                            handleExerciseFieldChange(idx, 'reps', e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.fieldGroupFull}>
                        <label>Coach Notes / Cues for Member</label>
                        <textarea
                          className={styles.textareaInput}
                          rows={2}
                          value={ex.notes || ''}
                          onChange={(e) =>
                            handleExerciseFieldChange(idx, 'notes', e.target.value)
                          }
                        />
                      </div>

                      <div className={styles.fieldGroupFull}>
                        <label>Demo Video URL (Vimeo Embed Link)</label>
                        <input
                          type="text"
                          className={styles.textInput}
                          placeholder="https://player.vimeo.com/video/..."
                          value={ex.videoUrl || ''}
                          onChange={(e) =>
                            handleExerciseFieldChange(
                              idx,
                              'videoUrl',
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>

                    {(memberWeight || memberNote) && (
                      <div className={styles.memberLoggedBox}>
                        <strong>Member&apos;s Logged Data (Week {selectedWeek}):</strong>
                        {memberWeight && <span>Weight Used: {memberWeight}</span>}
                        {memberNote && <span>Member Note: &ldquo;{memberNote}&rdquo;</span>}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.addExerciseBtn}
              onClick={handleAddExercise}
            >
              + Add Another Exercise to {currentWorkout?.title}
            </button>

            {/* SAVE & RESET BAR */}
            <div className={styles.saveActionBar}>
              <button
                type="button"
                className={styles.savePrimaryBtn}
                disabled={saving}
                onClick={() => handleSaveWorkouts([selectedWeek], false)}
              >
                {saving
                  ? 'Saving...'
                  : `💾 Save for Week ${selectedWeek} Only`}
              </button>

              <button
                type="button"
                className={styles.savePhaseBtn}
                disabled={saving}
                onClick={() => handleSaveWorkouts(phaseWeeks, false)}
              >
                {saving
                  ? 'Saving...'
                  : `💾 Save Across Entire Phase (Weeks ${phaseWeeks[0]}–${phaseWeeks[3]})`}
              </button>

              {isCurrentWeekCustomized && (
                <button
                  type="button"
                  className={styles.resetDefaultBtn}
                  disabled={saving}
                  onClick={() => handleSaveWorkouts([selectedWeek], true)}
                >
                  ↺ Reset Week {selectedWeek} to Default Program
                </button>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
