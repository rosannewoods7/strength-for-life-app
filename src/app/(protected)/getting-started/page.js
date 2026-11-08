import styles from './page.module.css'
import Link from 'next/link'

export const metadata = {
  title: 'Getting Started | Strength for Life',
  description: 'Introduction to the Strength for Life 12-Week Protocol.',
}

export default function GettingStartedPage() {
  return (
    <div className={styles.container} style={{ maxWidth: '1200px' }}>
      <div className={styles.header}>
        <h1 className={styles.title}>Getting Started</h1>
        <p className={styles.subtitle}>Welcome to Strength for Life.</p>
      </div>

      <div className={styles.content} style={{ marginBottom: '3rem' }}>
        <h2>Welcome to A Stronger You</h2>
        <p>
          I am so incredibly thrilled that you are here. Making the decision to prioritize your 
          strength and metabolic health is one of the most powerful 
          investments you can make in your future self. 
        </p>
        
        <p style={{ fontSize: '1.1rem', fontWeight: '600', marginTop: '2rem' }}>
          Before you dive in, follow this step-by-step plan to get set up for success:
        </p>
        
        <ol style={{ paddingLeft: '1.5rem', marginBottom: '2rem', lineHeight: '1.8', color: 'var(--color-deep-espresso)', fontSize: '1.05rem' }}>
          <li style={{ marginBottom: '0.75rem' }}><strong>Go to the Dashboard:</strong> This is your home base for tracking your progress throughout the 12 weeks.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>Take the Daily Readiness Audit:</strong> Complete this quick assessment before every workout to determine your optimal training intensity for the day.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>Visit the Recovery Vault:</strong> Review the "What is Active Recovery?" guidelines so you know exactly how to manage your non-lifting days without overtraining.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>Choose Your Weights:</strong> Head to the Recovery Vault to read the "How to Choose Your Weights Guide" to determine exactly where you should start.</li>
          <li style={{ marginBottom: '0.75rem' }}><strong>Go To Week 1:</strong> Select your first workout and begin building your strength for life!</li>
        </ol>

        <div style={{ backgroundColor: 'var(--color-sand)', padding: '1.5rem', borderRadius: '8px', marginBottom: '1.5rem', borderLeft: '4px solid var(--color-deep-espresso)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-espresso)', marginBottom: '0.5rem', marginTop: 0 }}>Equipment Note</h3>
          <p style={{ fontSize: '0.95rem', margin: 0, color: 'var(--color-deep-espresso)', lineHeight: '1.5' }}>
            All workouts in this program can be completed using only dumbbells (DBs). For optimal training progression, it is highly recommended that you have access to at least one lighter set and one heavier set of DBs.
          </p>
        </div>

        <div style={{ backgroundColor: 'var(--color-sand)', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem', borderLeft: '4px solid var(--color-deep-plum)' }}>
          <h3 style={{ fontSize: '1.1rem', color: 'var(--color-deep-espresso)', marginBottom: '0.75rem', marginTop: 0 }}>Install as an App</h3>
          <p style={{ fontSize: '0.95rem', margin: '0 0 1rem 0', color: 'var(--color-deep-espresso)', lineHeight: '1.5' }}>
            <strong>First, open this webpage on your phone's internet browser.</strong> For the best experience, save this dashboard directly to your phone's home screen so it functions exactly like a native app:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-deep-plum)', marginBottom: '0.25rem', marginTop: 0 }}>iPhone (Safari)</h4>
              <ol style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: 'var(--color-deep-espresso)', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '0.25rem' }}>Tap the <strong>Share</strong> icon (square with an arrow pointing up) at the bottom.</li>
                <li style={{ marginBottom: '0.25rem' }}>Scroll down and tap <strong>Add to Home Screen</strong>.</li>
                <li>Tap <strong>Add</strong> in the top right.</li>
              </ol>
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', color: 'var(--color-deep-plum)', marginBottom: '0.25rem', marginTop: 0 }}>Android (Chrome)</h4>
              <ol style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.9rem', color: 'var(--color-deep-espresso)', lineHeight: '1.5' }}>
                <li style={{ marginBottom: '0.25rem' }}>Tap the <strong>Menu</strong> icon (three dots) in the top right corner.</li>
                <li style={{ marginBottom: '0.25rem' }}>Tap <strong>Add to Home screen</strong> (or Install App).</li>
                <li>Tap <strong>Add</strong>.</li>
              </ol>
            </div>
          </div>
        </div>

        <p>
          Remember, this isn't about perfection—it's about adaptation, consistency, and 
          rebuilding your physical resilience from the ground up. You are entirely capable 
          of doing hard things, and I'll be right here with you every step of the way.
        </p>
      </div>

      <div className={styles.actionContainer}>
        <Link href="/dashboard" className={styles.primaryButton} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
