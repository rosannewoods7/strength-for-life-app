import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import styles from './layout.module.css';
import { createClient } from '@/utils/supabase/server';
import TawkIdentifier from '@/components/TawkIdentifier';
import TrialStatusBanner from '@/components/TrialStatusBanner';
import { getAccessStatus } from '@/lib/access';

export default async function DashboardLayout({ children }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const accessStatus = getAccessStatus(user);

  return (
    <div className={styles.layoutWrapper}>
      <TawkIdentifier userEmail={user?.email} />
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.taglineBanner}>
          <span className={styles.scriptTagline}>~ Built for Strength. Built for Life. ~</span>
        </div>
        <div className={styles.pagePanel}>
          <TrialStatusBanner accessStatus={accessStatus}>
            {children}
          </TrialStatusBanner>
        </div>
        <Footer />
      </main>
    </div>
  );
}
