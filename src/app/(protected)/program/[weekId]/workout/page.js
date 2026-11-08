import Link from 'next/link';
import WorkoutTabs from '@/components/WorkoutTabs';
import SyncWeekTracker from '@/components/SyncWeekTracker';
import { LockedFeatureGate } from '@/components/TrialStatusBanner';
import { createClient } from '@/utils/supabase/server';
import { getAccessStatus } from '@/lib/access';
import { weeklyData } from '@/lib/weeklyData';
import { getWorkoutsForWeek } from '@/lib/workoutData';
import styles from '../page.module.css';

export default async function DedicatedWorkoutPage({ params, searchParams }) {
  const { weekId } = await params;
  const resolvedSearchParams = await searchParams;
  const weekNumber = parseInt(weekId.replace('week-', ''), 10) || 1;
  const initialTab = parseInt(resolvedSearchParams?.tab || '0', 10) || 0;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const accessStatus = getAccessStatus(user);

  const data = weeklyData[weekNumber] || weeklyData[1];

  if (!accessStatus.hasFullAccess && weekNumber > 1) {
    return (
      <div className={styles.container}>
        <Link href={`/program/week-${weekNumber}`} className={styles.backLink}>
          &larr; Back to Week {weekNumber}
        </Link>
        <LockedFeatureGate
          title={`Week ${weekNumber}: ${data.title} is Locked`}
          description="Your 7-Day Free Trial gives you full access to Week 1 so you can experience the workouts, exercise video demos, and weight tracking firsthand. Unlock the complete 12-Week Strength for Life Program today to access Weeks 2–12!"
        />
      </div>
    );
  }

  const workouts = getWorkoutsForWeek(weekNumber);

  return (
    <div className={styles.container} style={{ gap: '1rem' }}>
      <SyncWeekTracker weekNumber={weekNumber} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <Link href={`/program/week-${weekNumber}`} className={styles.backLink} style={{ marginBottom: 0 }}>
          &larr; Back to Week {weekNumber} Overview
        </Link>
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--color-soft-gold)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          Week {weekNumber}: {data.title}
        </span>
      </div>

      <WorkoutTabs
        workouts={workouts}
        weekNumber={weekNumber}
        initialTab={initialTab}
        fullPage={true}
      />
    </div>
  );
}
