'use client';

import { useState, useEffect } from 'react';
import {
  getWorkoutsForWeek,
  getMachineWorkoutsForWeek,
  getHomeWorkoutsForWeek,
  EXERCISE_VIDEO_LIBRARY,
} from '@/lib/workoutData';
import styles from './page.module.css';

function getPhaseWeeks(weekNum) {
  const phaseStart = Math.floor((weekNum - 1) / 4) * 4 + 1;
  return [phaseStart, phaseStart + 1, phaseStart + 2, phaseStart + 3];
}

const ALL_PHASES = [
  { id: 1, label: 'Phase 1 (Weeks 1–4)', weeks: [1, 2, 3, 4] },
  { id: 2, label: 'Phase 2 (Weeks 5–8)', weeks: [5, 6, 7, 8] },
  { id: 3, label: 'Phase 3 (Weeks 9–12)', weeks: [9, 10, 11, 12] },
  { id: 4, label: 'Phase 4 (Weeks 13–16)', weeks: [13, 14, 15, 16] },
  { id: 5, label: 'Phase 5 (Weeks 17–20)', weeks: [17, 18, 19, 20] },
  { id: 6, label: 'Phase 6 (Weeks 21–24)', weeks: [21, 22, 23, 24] },
];

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

  // Copy Exercise Panel State
  const [copyingExIndex, setCopyingExIndex] = useState(null);
  const [copyTargetWorkouts, setCopyTargetWorkouts] = useState(['A']);
  const [copyTargetWeeks, setCopyTargetWeeks] = useState([1]);
  const [copyMode, setCopyMode] = useState('append'); // 'append' | 'replace_slot'

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
    setCopyingExIndex(null);
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

  const handleOpenCopyPanel = (exIndex) => {
    if (copyingExIndex === exIndex) {
      setCopyingExIndex(null);
      return;
    }
    const currWorkoutId = editableWorkouts[activeTab]?.id || 'A';
    setCopyingExIndex(exIndex);
    setCopyTargetWorkouts([currWorkoutId]);
    setCopyTargetWeeks(getPhaseWeeks(selectedWeek));
    setCopyMode('append');
  };

  const handleToggleCopyWorkout = (workoutId) => {
    setCopyTargetWorkouts((prev) =>
      prev.includes(workoutId)
        ? prev.filter((id) => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const handleToggleCopyWeeks = (weeksArr) => {
    setCopyTargetWeeks((prev) => {
      const allPresent = weeksArr.every((w) => prev.includes(w));
      if (allPresent) {
        return prev.filter((w) => !weeksArr.includes(w));
      }
      const merged = new Set([...prev, ...weeksArr]);
      return Array.from(merged).sort((a, b) => a - b);
    });
  };

  const getBaseWorkoutsForMemberWeek = (wk) => {
    if (wk === selectedWeek) {
      return JSON.parse(JSON.stringify(editableWorkouts));
    }
    const savedCustom = selectedMember?.customWorkouts?.[wk];
    if (Array.isArray(savedCustom) && savedCustom.length > 0) {
      return JSON.parse(JSON.stringify(savedCustom));
    }
    const track = selectedMember?.defaultTrack || 'free_weights';
    if (track === 'machines') {
      return JSON.parse(JSON.stringify(getMachineWorkoutsForWeek(wk)));
    }
    if (track === 'home') {
      return JSON.parse(JSON.stringify(getHomeWorkoutsForWeek(wk)));
    }
    return JSON.parse(JSON.stringify(getWorkoutsForWeek(wk)));
  };

  const handleApplyCopyExercise = async (exIndex) => {
    if (!selectedMember?.email) return;
    const sourceExercise = editableWorkouts[activeTab]?.exercises?.[exIndex];
    if (!sourceExercise) return;

    if (copyTargetWorkouts.length === 0) {
      setErrorMsg('Please select at least one target workout (A, B, or C).');
      return;
    }
    if (copyTargetWeeks.length === 0) {
      setErrorMsg('Please select at least one target week or phase.');
      return;
    }

    setSaving(true);
    setErrorMsg(null);
    setStatusMsg(null);

    try {
      const workoutsByWeek = {};
      const sortedWeeks = [...copyTargetWeeks].sort((a, b) => a - b);

      sortedWeeks.forEach((wk) => {
        const wkWorkouts = getBaseWorkoutsForMemberWeek(wk);
        wkWorkouts.forEach((w) => {
          if (!copyTargetWorkouts.includes(w.id)) return;
          const exerciseClone = JSON.parse(JSON.stringify(sourceExercise));
          if (!Array.isArray(w.exercises)) {
            w.exercises = [];
          }

          if (copyMode === 'replace_slot') {
            if (exIndex < w.exercises.length) {
              w.exercises[exIndex] = exerciseClone;
            } else {
              w.exercises.push(exerciseClone);
            }
          } else {
            // Check if an exercise with the exact same name already exists in that target workout
            const existingIdx = w.exercises.findIndex(
              (item) =>
                (item.name || '').trim().toLowerCase() ===
                (exerciseClone.name || '').trim().toLowerCase()
            );
            if (existingIdx > -1) {
              w.exercises[existingIdx] = exerciseClone;
            } else {
              w.exercises.push(exerciseClone);
            }
          }
        });
        workoutsByWeek[String(wk)] = wkWorkouts;
      });

      // If current week was among target weeks, also update the active editor immediately
      if (workoutsByWeek[String(selectedWeek)]) {
        setEditableWorkouts(
          JSON.parse(JSON.stringify(workoutsByWeek[String(selectedWeek)]))
        );
      }

      const res = await fetch('/api/coach/member-workouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: selectedMember.email,
          workoutsByWeek,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to copy exercise across weeks.');
      } else {
        setSelectedMember(data.member);
        setMembers((prev) =>
          prev.map((m) => (m.id === data.member.id ? data.member : m))
        );
        setCopyingExIndex(null);
        setStatusMsg(
          `Copied "${sourceExercise.name}" to Workout ${copyTargetWorkouts.join(', ')} across Week${sortedWeeks.length > 1 ? 's' : ''} ${sortedWeeks.join(', ')} for ${data.member.email}!`
        );
      }
    } catch (err) {
      setErrorMsg('Network error copying exercise.');
    } finally {
      setSaving(false);
    }
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

  const handleUpdateTrackSettings = async (newDefaultTrack, newTrackMode) => {
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
          defaultTrack: newDefaultTrack,
          trackMode: newTrackMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Could not update member track settings.');
      } else {
        setSelectedMember(data.member);
        setMembers((prev) =>
          prev.map((m) => (m.id === data.member.id ? data.member : m))
        );
        setStatusMsg(
          `Updated equipment track settings for ${data.member.email}!`
        );
      }
    } catch (err) {
      setErrorMsg('Network error updating track settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleLoadMachineTemplate = () => {
    const machineTemplate = getMachineWorkoutsForWeek(selectedWeek);
    setEditableWorkouts(JSON.parse(JSON.stringify(machineTemplate)));
    setStatusMsg(
      `Loaded Week ${selectedWeek} Gym Machines template into editor. Click "Save" below to assign it to ${selectedMember?.email}.`
    );
  };

  const handleLoadHomeTemplate = () => {
    const homeTemplate = getHomeWorkoutsForWeek(selectedWeek);
    setEditableWorkouts(JSON.parse(JSON.stringify(homeTemplate)));
    setStatusMsg(
      `Loaded Week ${selectedWeek} Home (Dumbbells & Bench) template into editor. Click "Save" below to assign it to ${selectedMember?.email}.`
    );
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

              <div className={styles.trackControlBox}>
                <div className={styles.trackControlItem}>
                  <label>Default Track:</label>
                  <select
                    className={styles.trackSelect}
                    value={selectedMember.defaultTrack || 'free_weights'}
                    disabled={saving}
                    onChange={(e) =>
                      handleUpdateTrackSettings(
                        e.target.value,
                        selectedMember.trackMode || 'both'
                      )
                    }
                  >
                    <option value="free_weights">
                      🏋️ Gym Free Weights &amp; Cables
                    </option>
                    <option value="home">
                      🏠 Home (Dumbbells &amp; Bench)
                    </option>
                    <option value="machines">
                      ⚙️ Gym Machines (Joint-Friendly)
                    </option>
                  </select>
                </div>

                <div className={styles.trackControlItem}>
                  <label>Workout Version Access:</label>
                  <select
                    className={styles.trackSelect}
                    value={selectedMember.trackMode || 'both'}
                    disabled={saving}
                    onChange={(e) =>
                      handleUpdateTrackSettings(
                        selectedMember.defaultTrack || 'free_weights',
                        e.target.value
                      )
                    }
                  >
                    <option value="both">
                      Show All Versions (Allow Member to Toggle)
                    </option>
                    <option value="home_only">
                      Lock to Home (Dumbbells &amp; Bench) Only
                    </option>
                    <option value="machines_only">
                      Lock to Gym Machines Only
                    </option>
                    <option value="free_weights_only">
                      Lock to Gym Free Weights &amp; Cables Only
                    </option>
                  </select>
                </div>
              </div>
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
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="button"
                  className={styles.loadTemplateBtn}
                  onClick={handleLoadHomeTemplate}
                >
                  🏠 Load Week {selectedWeek} Home (DBs &amp; Bench) Template
                </button>
                <button
                  type="button"
                  className={styles.loadTemplateBtn}
                  onClick={handleLoadMachineTemplate}
                >
                  ⚙️ Load Week {selectedWeek} Machine Template
                </button>
                {isCurrentWeekCustomized && (
                  <span className={styles.customActiveTag}>
                    ✨ Week {selectedWeek} has custom modifications
                  </span>
                )}
              </div>
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
                          className={`${styles.smallIconBtn} ${
                            copyingExIndex === idx ? styles.copyBtnActive : styles.copyBtn
                          }`}
                          onClick={() => handleOpenCopyPanel(idx)}
                          title="Copy this exercise to other workouts or phases"
                        >
                          📋 Copy Exercise to...
                        </button>
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

                    {copyingExIndex === idx && (
                      <div className={styles.copyExercisePanel}>
                        <div className={styles.copyPanelHeader}>
                          <strong>
                            📋 Copy &ldquo;{ex.name}&rdquo; ({ex.sets} &times; {ex.reps}) to:
                          </strong>
                          <button
                            type="button"
                            className={styles.copyPanelCloseBtn}
                            onClick={() => setCopyingExIndex(null)}
                          >
                            ✕ Close
                          </button>
                        </div>

                        <div className={styles.copySection}>
                          <label className={styles.copySectionLabel}>
                            1. Select Target Workout(s):
                          </label>
                          <div className={styles.copyCheckRow}>
                            {['A', 'B', 'C'].map((wId) => (
                              <label key={wId} className={styles.copyCheckLabel}>
                                <input
                                  type="checkbox"
                                  checked={copyTargetWorkouts.includes(wId)}
                                  onChange={() => handleToggleCopyWorkout(wId)}
                                />
                                Workout {wId}
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className={styles.copySection}>
                          <label className={styles.copySectionLabel}>
                            2. Select Target Week(s) / Phase(s):
                          </label>
                          <div className={styles.copyQuickBtns}>
                            <button
                              type="button"
                              className={`${styles.copyQuickPill} ${
                                copyTargetWeeks.length === 1 &&
                                copyTargetWeeks[0] === selectedWeek
                                  ? styles.copyQuickPillActive
                                  : ''
                              }`}
                              onClick={() => setCopyTargetWeeks([selectedWeek])}
                            >
                              Current Week Only (Week {selectedWeek})
                            </button>
                            <button
                              type="button"
                              className={`${styles.copyQuickPill} ${
                                phaseWeeks.every((w) =>
                                  copyTargetWeeks.includes(w)
                                ) && copyTargetWeeks.length === 4
                                  ? styles.copyQuickPillActive
                                  : ''
                              }`}
                              onClick={() => setCopyTargetWeeks([...phaseWeeks])}
                            >
                              Current Phase (Weeks {phaseWeeks[0]}–{phaseWeeks[3]})
                            </button>
                            <button
                              type="button"
                              className={styles.copyQuickPill}
                              onClick={() =>
                                setCopyTargetWeeks(
                                  Array.from({ length: 12 }, (_, i) => i + 1)
                                )
                              }
                            >
                              All Months 1–3 (Weeks 1–12)
                            </button>
                            <button
                              type="button"
                              className={styles.copyQuickPill}
                              onClick={() =>
                                setCopyTargetWeeks(
                                  Array.from({ length: 12 }, (_, i) => i + 13)
                                )
                              }
                            >
                              All Months 4–6 (Weeks 13–24)
                            </button>
                          </div>

                          <div className={styles.copyPhaseCheckGrid}>
                            {ALL_PHASES.map((ph) => {
                              const allChecked = ph.weeks.every((w) =>
                                copyTargetWeeks.includes(w)
                              );
                              return (
                                <label
                                  key={ph.id}
                                  className={styles.copyCheckLabel}
                                >
                                  <input
                                    type="checkbox"
                                    checked={allChecked}
                                    onChange={() =>
                                      handleToggleCopyWeeks(ph.weeks)
                                    }
                                  />
                                  {ph.label}
                                </label>
                              );
                            })}
                          </div>
                        </div>

                        <div className={styles.copySection}>
                          <label className={styles.copySectionLabel}>
                            3. Placement in Target Workout(s):
                          </label>
                          <div className={styles.copyCheckRow}>
                            <label className={styles.copyCheckLabel}>
                              <input
                                type="radio"
                                name={`copyMode-${idx}`}
                                checked={copyMode === 'append'}
                                onChange={() => setCopyMode('append')}
                              />
                              Add to end of workout (or update if same exercise name exists)
                            </label>
                            <label className={styles.copyCheckLabel}>
                              <input
                                type="radio"
                                name={`copyMode-${idx}`}
                                checked={copyMode === 'replace_slot'}
                                onChange={() => setCopyMode('replace_slot')}
                              />
                              Replace Exercise #{idx + 1} (same position slot)
                            </label>
                          </div>
                        </div>

                        <div className={styles.copyPanelActions}>
                          <button
                            type="button"
                            className={styles.copyApplyBtn}
                            disabled={
                              saving ||
                              copyTargetWorkouts.length === 0 ||
                              copyTargetWeeks.length === 0
                            }
                            onClick={() => handleApplyCopyExercise(idx)}
                          >
                            {saving
                              ? 'Copying & Saving...'
                              : `📋 Copy & Save to Workout ${copyTargetWorkouts.join(', ')} (${copyTargetWeeks.length} week${copyTargetWeeks.length > 1 ? 's' : ''})`}
                          </button>
                        </div>
                      </div>
                    )}

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
