import Link from 'next/link';
import ReadinessAudit from '@/components/ReadinessAudit';
import WorkoutTabs from '@/components/WorkoutTabs';
import { getWorkoutsForWeek } from '@/lib/workoutData';
import styles from "./page.module.css";

export default function Home() {
  const checkoutUrl = "https://www.drrosannewoods.com/get-started";
  const sampleWorkouts = getWorkoutsForWeek(1);

  return (
    <div className={styles.pageWrapper}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.logo}>Strength for Life</div>
        <Link href="/login" className={styles.loginLink}>Member Login</Link>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Strength is your foundation for life.</h1>
          <p className={styles.heroSubtitle}>
            A comprehensive 12-week system designed to build muscle, metabolic resilience, explosive power, and lifelong vitality for men and women.
          </p>
          <div className={styles.ctaGroup} style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/trial" className={styles.primaryButton}>
              Start Your 7-Day Free Trial
            </Link>
            <a
              href={checkoutUrl}
              className={styles.primaryButton}
              style={{ background: 'transparent', color: '#ffffff', border: '2px solid var(--color-soft-gold)' }}
            >
              Get Full 12-Week Access ($297)
            </a>
          </div>
        </div>
      </header>

      {/* Inside the App (Mockup Section) */}
      <section className={styles.previewSection}>
        <h2 className={styles.sectionTitle}>Inside the App</h2>
        <p className={styles.sectionSubtitle}>Everything you need to stay consistent, right in your pocket. Experience a live preview below.</p>
        
        <div className={styles.interactiveDemoGrid}>
          
          <div className={styles.demoBlock}>
            <h3 className={styles.demoTitle}>The Daily Readiness Audit</h3>
            <p className={styles.demoDesc}>Before you train, log your sleep, stress, and joint health to get a dynamic recommendation on your optimal training intensity for the day.</p>
            <div className={styles.demoComponentWrapper}>
              <ReadinessAudit />
            </div>
          </div>

          <div className={styles.demoBlock}>
            <h3 className={styles.demoTitle}>Interactive Workouts</h3>
            <p className={styles.demoDesc}>Track your weights, watch video demos, and log your reps directly in the app. Here is a preview of Week 1:</p>
            <div className={styles.demoComponentWrapper}>
              <WorkoutTabs workouts={sampleWorkouts} weekNumber={1} />
            </div>
          </div>

          <div className={styles.demoBlock}>
            <h3 className={styles.demoTitle}>Progress Tracking</h3>
            <p className={styles.demoDesc}>Visualize your consistency across Strength, Cardiorespiratory Training, and Flexibility/Mobility Training.</p>
            <div className={styles.mockupCard}>
              <div className={styles.mockupHeader}>
                <span>Your Progress: Week 4 of 12</span>
              </div>
              <div className={styles.mockupBody}>
                <div className={styles.progressStats}>
                  <div className={styles.statMini}><strong>11</strong> Workouts Logged</div>
                  <div className={styles.statMini}><strong>9</strong> Cardio Sessions</div>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '33%' }}></div>
                </div>
                <div className={styles.modalityList}>
                  <div className={styles.modalityItem}>
                    <span>Strength (3x)</span>
                    <div className={styles.dots}>
                      <span className={`${styles.dot} ${styles.dotFilled}`}></span>
                      <span className={`${styles.dot} ${styles.dotFilled}`}></span>
                      <span className={styles.dot}></span>
                    </div>
                  </div>
                  <div className={styles.modalityItem}>
                    <span>Cardio (2-3x)</span>
                    <div className={styles.dots}>
                      <span className={`${styles.dot} ${styles.dotFilled}`}></span>
                      <span className={`${styles.dot} ${styles.dotFilled}`}></span>
                      <span className={styles.dot}></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Program Structure */}
      <section className={styles.phasesSection}>
        <h2 className={styles.sectionTitle}>The Reset Blueprint</h2>
        <div className={styles.phaseGrid}>
          <div className={styles.phaseCard}>
            <h3>Phase 1: Foundation</h3>
            <p>Weeks 1-4. Focus on neural adaptation and learning movement patterns safely.</p>
          </div>
          <div className={styles.phaseCard}>
            <h3>Phase 2: Strength</h3>
            <p>Weeks 5-8. Progressive overload to build lean muscle and metabolic resilience.</p>
          </div>
          <div className={styles.phaseCard}>
            <h3>Phase 3: Power</h3>
            <p>Weeks 9-12. Speed and explosive power development for bone density.</p>
          </div>
        </div>
      </section>

      <hr className={styles.goldDivider} />

      {/* Wellness Pillars */}
      <section className={styles.wellnessSection}>
        <h2 className={styles.sectionTitle}>Beyond the Weights</h2>
        <p className={styles.sectionSubtitle}>Strength training is only one piece of the puzzle. The Strength for Life system integrates the core lifestyle pillars essential for long-term performance and longevity.</p>
        
        <div className={styles.wellnessGrid}>
          <div className={styles.wellnessCard}>
            <div className={styles.wellnessIcon}>🧘</div>
            <h3>Stress Mitigation</h3>
            <p>High cortisol breaks down muscle and promotes visceral fat storage. We integrate the 10-Minute Connective Tissue Protocol and nervous system regulation techniques to protect your gains.</p>
          </div>
          <div className={styles.wellnessCard}>
            <div className={styles.wellnessIcon}>🥩</div>
            <h3>Metabolic Nutrition</h3>
            <p>As we age, anabolic resistance increases and protein needs rise. You'll learn how to structure your protein intake to stimulate muscle protein synthesis and optimize blood sugar control.</p>
          </div>
          <div className={styles.wellnessCard}>
            <div className={styles.wellnessIcon}>💤</div>
            <h3>Active Recovery</h3>
            <p>More is not better. You'll learn how to use the Daily Readiness Audit to autoregulate your training, prioritizing deep sleep and connective tissue recovery.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta}>
        <h2>Ready to build strength for life?</h2>
        <p>Start with a free 7-day trial of Week 1 (no card required), or unlock the full 12-week program right away.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/trial" className={styles.primaryButton}>
            Start Your 7-Day Free Trial
          </Link>
          <a
            href={checkoutUrl}
            className={styles.primaryButton}
            style={{ background: 'transparent', color: '#ffffff', border: '2px solid var(--color-soft-gold)' }}
          >
            Join Full 12-Week Program ($297)
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Dr. Rosanne Woods. All rights reserved.</p>
        <Link href="/login" className={styles.footerLink}>Existing Member Login</Link>
      </footer>
    </div>
  );
}
