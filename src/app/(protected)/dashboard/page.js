import { createClient } from '@/utils/supabase/server';
import DashboardOverview from '@/components/DashboardOverview';
import WelcomeHeader from '@/components/WelcomeHeader';
import styles from './page.module.css';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isSubscribed = user?.user_metadata?.subscription_status === 'active';

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <WelcomeHeader initialName={user?.user_metadata?.first_name} />
        <div className={styles.dateDisplay}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <DashboardOverview isSubscribed={isSubscribed} />
    </div>
  );
}
