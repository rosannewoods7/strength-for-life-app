import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { getAccessStatus } from '@/lib/access';
import { UnlockProgramButton } from '@/components/TrialStatusBanner';
import styles from './page.module.css';

export default async function ProgramOverviewPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const accessStatus = getAccessStatus(user);
  const isTrialOnly = !accessStatus.hasFullAccess;

  const weeks = [
    { id: 1, title: 'Establishing the Baseline', phase: 'Phase 1: Neural Adaptation', description: 'Master the core movement patterns and identify your true RPE.' },
    { id: 2, title: 'Volume Accumulation', phase: 'Phase 1: Neural Adaptation', description: 'Increasing total workload while maintaining strict technical execution.' },
    { id: 3, title: 'Intensity Introduction', phase: 'Phase 1: Neural Adaptation', description: 'Pushing closer to true failure to prime the CNS.' },
    { id: 4, title: 'The Deload', phase: 'Phase 1: Neural Adaptation', description: 'Strategic reduction in volume to allow for supercompensation.' },
    { id: 5, title: 'Hypertrophy Focus', phase: 'Phase 2: Muscle Accretion', description: 'Higher volume, moderate intensity to stimulate muscle growth.' },
    { id: 6, title: 'Metabolic Stress', phase: 'Phase 2: Muscle Accretion', description: 'Shorter rest periods and higher reps for cellular swelling.' },
    { id: 7, title: 'Mechanical Tension', phase: 'Phase 2: Muscle Accretion', description: 'Heavy loading on compound lifts to maximize fiber recruitment.' },
    { id: 8, title: 'The Deload', phase: 'Phase 2: Muscle Accretion', description: 'Active recovery and journaling reflection.' },
    { id: 9, title: 'Maximum Strength', phase: 'Phase 3: Peak Performance', description: 'Low reps, high intensity to build absolute strength.' },
    { id: 10, title: 'Power Expression', phase: 'Phase 3: Peak Performance', description: 'Moving loads with maximum velocity.' },
    { id: 11, title: 'The Crucible', phase: 'Phase 3: Peak Performance', description: 'Testing your new 1RM limits safely.' },
    { id: 12, title: 'The Finish Line', phase: 'Phase 3: Peak Performance', description: 'Celebration, final deload, and planning your next baseline.' },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Program</h1>
        <p className={styles.subtitle}>
          {isTrialOnly
            ? 'Your 7-Day Free Trial includes full access to Week 1. Unlock the complete 12-Week Strength for Life Program anytime to access Weeks 2–12!'
            : 'Select a week to access your workouts and daily non-negotiables.'}
        </p>
        {isTrialOnly && (
          <div style={{ marginTop: '1rem' }}>
            <UnlockProgramButton label="Unlock All 12 Weeks Now ($297 CAD) →" />
          </div>
        )}
      </header>

      <div className={styles.grid}>
        {weeks.map((week) => {
          const isLocked = isTrialOnly && week.id > 1;
          return (
            <Link
              href={`/program/week-${week.id}`}
              key={week.id}
              className={styles.card}
              style={isLocked ? { opacity: 0.78 } : undefined}
            >
              <div className={styles.cardHeader}>
                <span className={styles.weekNumber}>
                  Week {week.id} {isLocked ? '🔒' : ''}
                </span>
                <span className={styles.phaseLabel}>{week.phase}</span>
              </div>
              <h2 className={styles.cardTitle}>{week.title}</h2>
              <p className={styles.cardDescription}>{week.description}</p>
              <div className={styles.cardFooter}>
                <span className={styles.actionText}>
                  {isLocked ? '🔒 Unlock Full Program ($297 CAD) →' : 'Enter Module →'}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
