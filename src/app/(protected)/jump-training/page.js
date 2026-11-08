import styles from './page.module.css';

export const metadata = {
  title: 'Cardiorespiratory Training | Strength for Life',
};

export default function CardiorespiratoryTrainingPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cardiorespiratory Training</h1>
        <p className={styles.subtitle}>For VO₂ Max, Heart Health, Metabolic Efficiency &amp; Longevity</p>
      </header>

      <section className={styles.fullWidthProtocol} style={{ marginTop: '1rem', paddingTop: '2rem' }}>
        <h2 className={styles.sectionTitle}>The Strength for Life Cardiorespiratory Protocol</h2>
        <p className={styles.protocolIntro}>
          Perform cardiorespiratory training <strong>2–3 times per week</strong> on non-lifting days or after strength sessions.<br/>
          Combine foundational aerobic conditioning (Zone 2) with targeted higher-intensity intervals to build both your aerobic base and peak cardiovascular capacity.
        </p>

        <div className={styles.protocolGrid}>
          <div className={styles.protocolCard}>
            <h4>Session 1 &amp; 2: Zone 2 Aerobic Base</h4>
            <ul>
              <li>Brisk incline walking or rucking</li>
              <li>Cycling or stationary bike</li>
              <li>Rowing or ski erg</li>
              <li>Swimming or elliptical</li>
              <li>Steady outdoor hiking or jogging</li>
            </ul>
            <div className={styles.setsReps}>30–45 minutes • Conversational Pace (RPE 6/10)</div>
          </div>

          <div className={styles.protocolCard}>
            <h4>Optional Session 3: VO₂ Max Intervals</h4>
            <ul>
              <li>Stationary bike or air bike intervals</li>
              <li>Incline treadmill or hill repeats</li>
              <li>Rowing ergometer intervals</li>
              <li>Kettlebell swings or battle ropes</li>
              <li>Low-impact full-body conditioning</li>
            </ul>
            <div className={styles.setsReps}>1–2 min hard effort (RPE 8–9/10) + 2 min easy recovery × 4–6 rounds</div>
          </div>

          <div className={styles.protocolCard}>
            <h4>12-Week Progression</h4>
            <ul>
              <li><strong>Weeks 1–4 (Foundation):</strong> 2x 25–30 min steady Zone 2 sessions</li>
              <li><strong>Weeks 5–8 (Build):</strong> 2x 35 min Zone 2 + 1 short interval finisher</li>
              <li><strong>Weeks 9–12 (Peak Capacity):</strong> 2x 35–45 min Zone 2 + 1 dedicated VO₂ Max session</li>
            </ul>
            <div className={styles.setsReps}>Target: 2–3 total sessions per week</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
          <div>
            <h4 className={styles.miniHeading}>How to Gauge Your Intensity</h4>
            <ul className={styles.cuesList}>
              <li><strong>Zone 2 (Steady Aerobic):</strong> You can speak in full sentences, but someone on the phone would know you are exercising. Nasal breathing should feel sustainable.</li>
              <li><strong>Intervals (VO₂ Max / Threshold):</strong> Breathing is deep and rapid; only a few words can be spoken at a time.</li>
              <li><strong>Recovery Matters:</strong> Cardiorespiratory work should support—not compete with—your 3 weekly strength workouts.</li>
            </ul>
          </div>
          <div>
            <div className={styles.highlightBox} style={{ margin: '0 0 1rem 0' }}>
              <p><strong>Choose Joint-Friendly Modalities:</strong> Your heart and mitochondria do not care whether you are walking uphill, cycling, rowing, swimming, or rucking. Choose the modalities that feel best on your joints and that you can perform consistently.</p>
            </div>
            <p className={styles.disclaimer}>*Disclaimer: If you have cardiovascular conditions, uncontrolled blood pressure, or are returning from medical treatment, consult your healthcare provider to establish appropriate heart-rate guidelines.</p>
          </div>
        </div>
      </section>

      <article className={styles.scienceSection} style={{ marginTop: '3rem' }}>
        <h2 className={styles.sectionTitle}>Why Cardiorespiratory Fitness Is Essential for Longevity</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          <div>
            <p>While progressive strength training is the foundation for preserving muscle and bone, <strong>cardiorespiratory fitness (measured by VO₂ max) is one of the single strongest predictors of lifespan and healthspan in both men and women.</strong></p>
            <p>Research consistently shows that moving from low cardiorespiratory fitness to even moderate-to-high fitness is associated with a dramatic reduction in all-cause mortality and cardiovascular disease risk.</p>
            <p>Better yet, cardiorespiratory training directly enhances your strength workouts: a stronger aerobic system helps you recover faster between heavy sets, clears metabolic byproducts more efficiently, and improves daily energy levels.</p>

            <h3 className={styles.subheading}>The Science of Zone 2 &amp; VO₂ Max</h3>
            <p>A complete cardiorespiratory strategy trains two complementary energy systems:</p>
            <ul className={styles.checkList}>
              <li><strong>Mitochondrial Density (Zone 2):</strong> Steady, moderate-intensity aerobic work stimulates mitochondrial biogenesis—creating more and healthier cellular powerhouses that burn fat efficiently and stabilize blood glucose.</li>
              <li><strong>Stroke Volume &amp; Oxygen Delivery (VO₂ Max):</strong> Brief bouts of higher-intensity effort challenge the heart muscle to pump more blood per beat and improve your muscles' capacity to extract and utilize oxygen.</li>
              <li><strong>Vascular Elasticity:</strong> Regular aerobic conditioning keeps arteries flexible, supporting healthy blood pressure and cerebral blood flow as we age.</li>
            </ul>
          </div>

          <div>
            <h3 className={styles.subheading} style={{ marginTop: 0 }}>Key Benefits of 2–3x Weekly Cardio</h3>
            <ul className={styles.benefitList}>
              <li>✓ Higher VO₂ max and cardiovascular reserve</li>
              <li>✓ Improved insulin sensitivity and blood sugar regulation</li>
              <li>✓ Enhanced mitochondrial health and metabolic flexibility</li>
              <li>✓ Faster recovery between strength training sets and sessions</li>
              <li>✓ Reduced resting heart rate and improved heart rate variability (HRV)</li>
              <li>✓ Improved cognitive health, mood, and deep sleep quality</li>
            </ul>

            <h3 className={styles.subheading}>Cardio Without Muscle Loss</h3>
            <p>A common mistake is performing excessive, grueling "gray-zone" cardio every day while under-eating protein—which elevates cortisol, increases fatigue, and compromises lean muscle mass.</p>
            <p>In <strong>Strength for Life</strong>, we pair 3 days of progressive resistance training with <strong>2–3 strategic cardiorespiratory sessions per week</strong>. This gives you the full cardiovascular and metabolic benefits of aerobic conditioning while protecting your recovery and muscle gains.</p>
          </div>
        </div>

        <div className={styles.coachNote} style={{ marginBottom: 0 }}>
          <strong>Coach's Note:</strong> We don't do cardio as punishment for what we ate, and we don't grind ourselves down with endless hours of exhaustion. We train our cardiorespiratory system to build a resilient heart, sharper energy, and the endurance to enjoy every decade of life.<br/><br/>
          <strong>Strength builds the chassis. Cardiorespiratory fitness builds the engine. Together, you are Built for Strength. Built for Life.</strong>
        </div>
      </article>
    </div>
  );
}
