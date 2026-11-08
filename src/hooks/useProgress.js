'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const DEFAULT_WEEK = {
  strength: [false, false, false],
  jump: [false, false, false],
  sit: [false, false]
};

const generateDefaultProgress = () => {
  const defaultProgress = {};
  for (let i = 1; i <= 24; i++) {
    defaultProgress[i] = JSON.parse(JSON.stringify(DEFAULT_WEEK));
  }
  return defaultProgress;
};

export function useProgress() {
  const [progress, setProgress] = useState(generateDefaultProgress());
  const [weights, setWeights] = useState({});
  const [exerciseNotes, setExerciseNotes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function loadProgress() {
      try {
        const localNotes = localStorage.getItem('sfl_exercise_notes');
        if (localNotes) {
          setExerciseNotes(JSON.parse(localNotes));
        }
      } catch (e) {
        // ignore localStorage parse error
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.user_metadata) {
        if (user.user_metadata.subscription_status === 'active') {
          setIsSubscribed(true);
        }
        
        if (user.user_metadata.progress) {
          // Deep clone the user's progress to avoid referencing the internal Supabase cache
          const userProgress = JSON.parse(JSON.stringify(user.user_metadata.progress));
          const merged = generateDefaultProgress();
          for (let i = 1; i <= 24; i++) {
            if (userProgress[i]) {
              merged[i] = { ...merged[i], ...userProgress[i] };
            }
          }
          setProgress(merged);
        }
        if (user.user_metadata.weights) {
          setWeights(JSON.parse(JSON.stringify(user.user_metadata.weights)));
        }
        if (user.user_metadata.exercise_notes) {
          const remoteNotes = JSON.parse(JSON.stringify(user.user_metadata.exercise_notes));
          setExerciseNotes((prev) => ({ ...prev, ...remoteNotes }));
        }
      }
      setIsLoading(false);
    }
    loadProgress();
  }, [supabase.auth]);

  const updateProgress = async (week, modality, index, value) => {
    // Deep clone to prevent mutating the Supabase client's internal cache
    const newProgress = JSON.parse(JSON.stringify(progress));
    newProgress[week][modality][index] = value;
    setProgress(newProgress);
    setIsSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { progress: newProgress }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error saving progress:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateWeight = async (week, workoutId, exerciseName, value) => {
    const key = `${week}-${workoutId}-${exerciseName}`;
    const newWeights = { ...weights, [key]: value };
    setWeights(newWeights);
    setIsSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { weights: newWeights }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error saving weights:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const updateExerciseNote = async (week, workoutId, exerciseName, value) => {
    const key = `${week}-${workoutId}-${exerciseName}`;
    const newNotes = { ...exerciseNotes, [key]: value };
    setExerciseNotes(newNotes);
    try {
      localStorage.setItem('sfl_exercise_notes', JSON.stringify(newNotes));
    } catch (e) {
      // ignore storage quota errors
    }
    setIsSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { exercise_notes: newNotes }
      });
      if (error) throw error;
    } catch (err) {
      console.error("Error saving exercise notes:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const resetWeek = async (week) => {
    const newProgress = { ...progress };
    newProgress[week] = JSON.parse(JSON.stringify(DEFAULT_WEEK));
    setProgress(newProgress);
    setIsSaving(true);

    try {
      await supabase.auth.updateUser({
        data: { progress: newProgress }
      });
    } catch (err) {
      console.error("Error resetting week:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    progress,
    weights,
    exerciseNotes,
    isLoading,
    isSaving,
    isSubscribed,
    updateProgress,
    updateWeight,
    updateExerciseNote,
    resetWeek
  };
}
