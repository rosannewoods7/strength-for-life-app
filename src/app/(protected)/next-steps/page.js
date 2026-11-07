import Link from 'next/link';
import VimeoFacade from '@/components/VimeoFacade';
import styles from './page.module.css';

export const metadata = {
  title: 'Next Steps | Strength for Life',
  description: 'Manage your Strength for Life Membership and continue your journey.',
};

export default function NextStepsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Your Next Chapter</h1>
        <p className={styles.subtitle}>
          The end of your 12-week Strength for Life foundation is just the beginning of your long-term transformation.
        </p>
      </header>

      <div className={styles.contentGrid}>
        <div className={styles.mainContent}>
          <div className={styles.videoSection}>
            <VimeoFacade 
              videoId="1203114484" 
              title="What Happens Now? Next Steps" 
            />
          </div>

          <div className={styles.textBlock}>
            <h2>The Strength for Life Membership</h2>
            <p>
              As you transition out of the foundational 12-week program, your body requires ongoing, progressive stimulus to continue building muscle density, protecting your metabolic health, and fostering deep resilience.
            </p>
            <p>
              The <strong>Strength for Life Membership</strong> is designed specifically to guide you through Months 4 and beyond. We provide fresh, strategically periodized monthly workout cycles, ongoing habit integration, and continuous community support.
            </p>
            
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <strong>New Monthly Programming</strong>
                  <p>Periodized strength blocks designed to break through plateaus and build upon your foundation.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <strong>Advanced Recovery Protocols</strong>
                  <p>Deep-dives into advanced stress management and longevity protocols.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <span className={styles.checkIcon}>✓</span>
                <div>
                  <strong>Live Q&A Sessions</strong>
                  <p>Direct access to coaching support to adapt the program to your changing life.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.manageCard}>
            <h3>Continuing Your Journey</h3>
            <p>
              As you near the end of your 12-week Strength for Life program, I will reach out to you directly via email with an exclusive invitation and instructions on how to seamlessly join the ongoing Strength for Life membership.
            </p>
            <p>
              <strong>A Note for Founding Members:</strong> You have been granted lifetime access to this platform! You will retain full access to your 12-week program materials and dashboard even after your initial 12 weeks conclude, regardless of whether you choose to join the ongoing membership.
            </p>
            <p>
              Keep an eye on your inbox during Week 11 for all the details on your next steps!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
