'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { getAccessStatus } from '@/lib/access';
import GlobalSearch from '@/components/GlobalSearch';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTrialOnly, setIsTrialOnly] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function checkSubscription() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.subscription_status === 'active') {
        setIsSubscribed(true);
      }
      const access = getAccessStatus(user);
      setIsTrialOnly(!access.hasFullAccess);
    }
    checkSubscription();
  }, [supabase.auth]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Getting Started', path: '/getting-started' },
    { name: 'My Program', path: '/program' },
    { name: isTrialOnly ? 'Cardiorespiratory 🔒' : 'Cardiorespiratory', path: '/jump-training' },
    { name: isTrialOnly ? 'Flexibility/Mobility 🔒' : 'Flexibility/Mobility', path: '/sit-training' },
    { name: 'My Progress', path: '/progress' },
    { name: 'The Framework', path: '/framework' },
    { name: isTrialOnly ? 'Recovery Vault 🔒' : 'Recovery Vault', path: '/vault' },
    { name: isSubscribed ? 'Month 4+ 🔓' : 'Month 4+ 🔒', path: '/ongoing' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <h2 className={styles.logo}>Strength for Life</h2>
        <span className={styles.logoSubtitle}>Strength &amp; Longevity</span>
      </div>

      <div style={{ padding: '0 1.5rem', marginBottom: '1.5rem' }}>
        <GlobalSearch />
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className={styles.sidebarFooter}>
        <form action="/auth/signout" method="POST">
          <button type="submit" className={styles.logoutButton}>Sign Out</button>
        </form>
      </div>
    </aside>
  );
}
