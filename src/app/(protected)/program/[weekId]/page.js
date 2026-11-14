import Link from 'next/link';
import WorkoutTabs from '@/components/WorkoutTabs';
import WeeklyChecklist from '@/components/WeeklyChecklist';
import SyncWeekTracker from '@/components/SyncWeekTracker';
import WeeklyChallengeCard from '@/components/WeeklyChallengeCard';
import PowerTrackChecklist from '@/components/PowerTrackChecklist';
import { LockedFeatureGate } from '@/components/TrialStatusBanner';
import { createClient } from '@/utils/supabase/server';
import { getAccessStatus } from '@/lib/access';
import { weeklyData } from '@/lib/weeklyData';
import { getWorkoutsForWeek } from '@/lib/workoutData';
import { getUserCustomWorkouts } from '@/lib/customWorkoutsStore';
import styles from './page.module.css';

export default async function WeeklyModulePage({ params }) {
  const { weekId } = await params;
  const weekNumber = parseInt(weekId.replace('week-', ''), 10);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const accessStatus = getAccessStatus(user);

  // Lookup data from the database, fallback to Week 1 if invalid
  const data = weeklyData[weekNumber] || weeklyData[1];

  if (!accessStatus.hasFullAccess && weekNumber > 1) {
    return (
      <div className={styles.container}>
        <Link href="/program" className={styles.backLink}>
          &larr; Back to My Program
        </Link>
        <LockedFeatureGate
          title={`Week ${weekNumber}: ${data.title} is Locked`}
          description={`Your 7-Day Free Trial gives you full access to Week 1 so you can experience the workouts, exercise video demos, and weight tracking firsthand. Unlock the complete 12-Week Strength for Life Program today to access Weeks 2–12!`}
        />
      </div>
    );
  }

  const customWorkouts = await getUserCustomWorkouts(user);
  const isCustomized = Boolean(
    customWorkouts &&
      Array.isArray(customWorkouts[weekNumber]) &&
      customWorkouts[weekNumber].length > 0
  );
  const workouts = getWorkoutsForWeek(weekNumber, customWorkouts);

  // Helper to format text with line breaks
  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((str, index) => (
      <span key={index}>
        {str}
        <br />
      </span>
    ));
  };

  // Helper for bold markdown
  const formatMarkdown = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const formatTextWithMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, index) => {
      const lines = paragraph.split('\n');
      return (
        <p key={index} style={{ marginBottom: '1rem' }}>
          {lines.map((line, lineIdx) => {
            const parts = line.split(/(\*\*.*?\*\*)/g);
            return (
              <span key={lineIdx} style={{ display: 'block', marginBottom: lineIdx < lines.length - 1 ? '0.35rem' : 0 }}>
                {parts.map((part, i) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={i}>{part.slice(2, -2)}</strong>;
                  }
                  return <span key={i}>{part}</span>;
                })}
              </span>
            );
          })}
        </p>
      );
    });
  };

  const isAdvancedPhase = weekNumber >= 13;

  return (
    <div className={styles.container}>
      <SyncWeekTracker weekNumber={weekNumber} />
      <Link href="/dashboard" className={styles.backLink}>
        &larr; Back to Dashboard
      </Link>

      {/* PHASE COMPLETE CHECKPOINT */}
      {isAdvancedPhase && data.phaseComplete && (
        <div className={styles.phaseCompleteCard}>
          <div className={styles.phaseCompleteIcon}>🏆</div>
          <h2>Phase {data.phase} Complete!</h2>
          <p>You have successfully completed this training cycle. Take a moment to acknowledge your consistency before previewing your next adaptation below.</p>
        </div>
      )}

      <header className={styles.header}>
        {isAdvancedPhase && <div className={styles.phaseTag}>MONTH {Math.ceil(weekNumber / 4)} — PHASE {data.phase}</div>}
        <h1 className={styles.title}>Week {weekNumber}: {data.title}</h1>
        {data.coachingIntro && <p className={styles.coachingIntro}>{data.coachingIntro}</p>}
        <div className={styles.quickWorkoutBar}>
          <Link href={`/program/week-${weekNumber}/workout`} className={styles.openWorkoutHeroBtn}>
            🏋️ Open Dedicated Workout Page (Workout A, B &amp; C) &rarr;
          </Link>
        </div>
      </header>

      {isAdvancedPhase ? (
        /* =========================================================
           MONTHS 4-6 LAYOUT (WEEKS 13-24)
           ========================================================= */
        <div className={styles.advancedLayout}>
          
          <div className={styles.contentBlock}>
            <h2 className={styles.sectionTitle}>THIS WEEK</h2>
            <div className={styles.educationalText}>
              {formatTextWithMarkdown(data.thisWeek)}
            </div>
          </div>

          <div className={styles.contentBlock}>
            <h2 className={styles.sectionTitle}>DO</h2>
            <div className={styles.doCard}>
              {(data.powerReadiness || data.phase === 6) && (
                <PowerTrackChecklist showChecklist={!!data.powerReadiness} />
              )}
              {formatTextWithMarkdown(data.doInstruction)}
            </div>
          </div>

          <div className={styles.contentBlock}>
            <h2 className={styles.sectionTitle}>REMEMBER</h2>
            <div className={styles.rememberCard}>
              {formatTextWithMarkdown(data.remember)}
            </div>
          </div>

          <div className={styles.contentBlock}>
            <h2 className={styles.sectionTitle}>REFLECT</h2>
            <div className={styles.reflectCard}>
              <p className={styles.reflectPrompt}>{data.reflectPrompt}</p>
              <textarea className={styles.reflectInput} placeholder="Type your reflections here..."></textarea>
            </div>
          </div>

          <div className={styles.progressFooter}>
            <div className={styles.progressIndicator}>
              WEEK {weekNumber} OF 24
              <div className={styles.dots}>
                {Array.from({ length: 24 }).map((_, i) => (
                  <span key={i} className={i < weekNumber ? styles.dotFilled : styles.dotEmpty}></span>
                ))}
              </div>
            </div>
            <Link href={`/program/week-${weekNumber}/workout`} className={styles.startTrainingBtn}>
              OPEN THIS WEEK'S WORKOUTS &rarr;
            </Link>
          </div>

          <div className={styles.contentBlock} id="train-section">
            <h2 className={styles.sectionTitle}>TRAIN</h2>
            <WorkoutTabs workouts={workouts} weekNumber={weekNumber} isCustomized={isCustomized} />
          </div>

        </div>
      ) : (
        /* =========================================================
           MONTHS 1-3 LAYOUT (WEEKS 1-12)
           ========================================================= */
        <>
          <h2 className={styles.sectionTitle}>This Week's Focus</h2>
          <div className={styles.pillarsGrid}>
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarIcon}>🥗</span>
                <h3>Nutrition: {data.nutritionFocus?.title}</h3>
              </div>
              <div className={styles.pillarBody}>{formatText(data.nutritionFocus?.content)}</div>
            </div>
            
            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarIcon}>💤</span>
                <h3>Sleep: {data.sleepFocus?.title}</h3>
              </div>
              <div className={styles.pillarBody}>{formatText(data.sleepFocus?.content)}</div>
            </div>

            <div className={styles.pillarCard}>
              <div className={styles.pillarHeader}>
                <span className={styles.pillarIcon}>🧘</span>
                <h3>Stress: {data.stressFocus?.title}</h3>
              </div>
              <div className={styles.pillarBody}>{formatText(data.stressFocus?.content)}</div>
            </div>
          </div>

          <div className={styles.grid}>
            <div className={styles.mainContent}>
              <div className={styles.coachCard}>
                <div className={styles.coachHeader}>
                  <span className={styles.coachIcon}>🗣️</span>
                  <h3>Coach's Corner</h3>
                </div>
                <p>{formatText(data.coachsCorner)}</p>
              </div>
              
              <WorkoutTabs workouts={workouts} weekNumber={weekNumber} isCustomized={isCustomized} />
            </div>
            
            <aside className={styles.sidebarContent}>
              <div className={styles.microLearningCard}>
                <h3>🔬 Science Nugget</h3>
                <p>{data.scienceNugget}</p>
              </div>
              
              <WeeklyChallengeCard challenges={data.weeklyChallenge} weekNumber={weekNumber} />
            </aside>
          </div>

          <div className={styles.hideOnPrint}>
            <WeeklyChecklist weekNumber={weekNumber} />
          </div>
        </>
      )}
    </div>
  );
}
